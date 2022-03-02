import { writable, derived } from "svelte/store";
import type { Data, AxisDescriptor } from "./types";
import { TopBottomPosition, DrawConfiguration, Coordinate } from "./types";

export const drawConfig = writable<DrawConfiguration>(new DrawConfiguration());
export const data = writable<Data>({ name: "", axes: [] });

// Height of the labels we draw.
export const axisLabelHeight = derived(drawConfig, ($drawConfiguration) =>
  $drawConfiguration.axisLabelConfiguration.show
    ? $drawConfiguration.axisLabelConfiguration.margin * 2 +
      $drawConfiguration.fontSize
    : 0
);
// Offset we need for the labels above the visualization.
export const axisLabelTopOffset = derived(
  [drawConfig, axisLabelHeight],
  ([$drawConfiguration, $axisLabelHeight]) =>
    $drawConfiguration.axisLabelConfiguration.axisLabelPosition ===
    TopBottomPosition.ABOVE
      ? $axisLabelHeight
      : 0
);
// Height of the value annotations.
export const axisAnnotationHeight = derived(drawConfig, ($drawConfiguration) =>
  $drawConfiguration.axisAnnotationConfiguration.show
    ? $drawConfiguration.axisAnnotationConfiguration.margin * 4 +
      $drawConfiguration.fontSize * 2
    : 0
);
// Total width of the SVG element.
export const width = derived(
  [data, drawConfig],
  ([$data, $drawConfiguration]) =>
    ($data.axes.length - 1) * $drawConfiguration.axesSpacing +
    $drawConfiguration.margin.left +
    $drawConfiguration.margin.right
);
// Total height of the SVG element.
export const height = derived(
  [drawConfig, axisLabelHeight, axisAnnotationHeight],
  ([$drawConfiguration, $axisLabelHeight, $axisAnnotationHeight]) =>
    $drawConfiguration.axisHeight +
    $drawConfiguration.margin.top +
    $drawConfiguration.margin.bottom +
    $axisLabelHeight +
    $axisAnnotationHeight
);
// All axis information.
export const axes = derived([data, drawConfig], ([$data, $drawConfig]) =>
  $data.axes.map((value, index) => {
    const stringData = value.data.every(
      (val) => val === null || typeof val === "string"
    );
    const numberValues = stringData
      ? undefined
      : (value.data.filter((val) => val !== null) as number[]);
    return {
      name: value.name,
      offset: index * $drawConfig.axesSpacing,
      categorical: stringData,
      categoricalItems: stringData
        ? [...new Set(value.data.filter((val) => val !== null))]
        : undefined,
      extremes:
        numberValues !== undefined
          ? { max: Math.max(...numberValues), min: Math.min(...numberValues) }
          : undefined,
    } as AxisDescriptor;
  })
);
// Data reordered by row.
export const coordinates = derived(data, ($data) => {
  const maxLength = Math.max(...$data.axes.map((axis) => axis.data.length));
  const coords: Coordinate[] = [];
  for (let i = 0; i < maxLength; i++) {
    const values: Record<string, number | string | null> = {};
    $data.axes.forEach(
      (axis) => (values[axis.name] = axis.data.length > i ? axis.data[i] : null)
    );
    coords.push({ values: values });
  }
  return coords;
});
