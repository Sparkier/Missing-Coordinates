import { writable, derived } from "svelte/store";
import { Data, AxisDescriptor, Concept } from "./types";
import { TopBottomPosition, DrawConfiguration, Coordinate } from "./types";
import { ScaleOrdinal, ScaleSequential } from "./color/scales";
import { schemeCategorical } from "./color/schemes";
import { interpolators } from "./color/sequentialColorInterpolators";

export const drawConfig = writable<DrawConfiguration>(new DrawConfiguration());
export const data = writable<Data>({ name: "", axes: [] });

const isCategorical = (data: (number | string | null)[]) =>
  data.every((val) => val === null || typeof val === "string");

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
  ([$drawConfiguration, $axisLabelHeight, $axisAnnotationHeight]) => {
    // If we have the missing axis concept active, we need to add that to the height
    // and remove half the height of the labels, since they are above.
    const missingAxisHeight =
      $drawConfiguration.concept === Concept.MISSING_VALUES_AXIS
        ? $drawConfiguration.missingValuesConfiguration
            .missingValuesAxisSpacing -
          $axisAnnotationHeight / 2
        : 0;
    return (
      $drawConfiguration.axisHeight +
      $drawConfiguration.margin.top +
      $drawConfiguration.margin.bottom +
      $axisLabelHeight +
      $axisAnnotationHeight +
      missingAxisHeight
    );
  }
);
export const colorScale = derived(
  [data, drawConfig],
  ([$data, $drawConfig]) => {
    const { coloringAxis } = $drawConfig.coloring;
    const axis = $data.axes.find((axis) => axis.name === coloringAxis);
    if (!axis) {
      return null;
    }

    if (isCategorical(axis.data)) {
      return new ScaleOrdinal()
        .domain(axis.data as string[])
        .range(schemeCategorical.Category10);
    } else {
      const numberValues = axis.data.filter((val) => val !== null) as number[];
      const min = Math.min(...numberValues);
      const max = Math.max(...numberValues);
      return new ScaleSequential()
        .domain([min, max])
        .interpolator(interpolators.interpolateWarm);
    }
  }
);
// All axis information.
export const axes = derived([data, drawConfig], ([$data, $drawConfig]) =>
  $data.axes.map((value, index) => {
    const isCat = isCategorical(value.data);
    const numberValues = isCat
      ? undefined
      : (value.data.filter((val) => val !== null) as number[]);
    return {
      name: value.name,
      offset: index * $drawConfig.axesSpacing,
      categorical: isCat,
      categoricalItems: isCat
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
