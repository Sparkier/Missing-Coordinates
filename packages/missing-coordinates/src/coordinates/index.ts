import type {
  Coordinate,
  AxisDescriptor,
  DrawConfiguration,
  Data,
} from "../types";
import { Concept } from "../types";
import { imputeValueForAxis } from "./imputation";

export function getCoordinatePosition(
  axis: AxisDescriptor,
  coordinate: Coordinate,
  drawConfig: DrawConfiguration,
  data: Data,
  axes: AxisDescriptor[]
): number {
  const value = coordinate.values[axis.name];

  if (value === null) {
    return Math.round(
      getPostionForMissingValue(axis, coordinate, drawConfig, data, axes)
    );
  }

  if (
    axis.categorical &&
    axis.categoricalItems !== undefined &&
    typeof value === "string"
  ) {
    return Math.round(
      getCategoricalAxisPosition(axis.categoricalItems, value, drawConfig)
    );
  } else if (axis.extremes !== undefined && typeof value === "number") {
    return Math.round(
      getNumericalAxisPosition(axis.extremes, value, drawConfig)
    );
  }
  return -1;
}

function getPostionForMissingValue(
  axis: AxisDescriptor,
  coordinate: Coordinate,
  drawConfig: DrawConfiguration,
  data: Data,
  axes: AxisDescriptor[]
): number {
  if (drawConfig.concept === Concept.MISSING_VALUES_AXIS) {
    return (
      drawConfig.axisHeight +
      drawConfig.missingValuesConfiguration.missingValuesAxisSpacing
    );
  } else if (drawConfig.concept === Concept.IMPUTATION) {
    const value = imputeValueForAxis(
      data,
      axis,
      coordinate,
      drawConfig.missingValuesConfiguration.imputationNeighbors,
      axes
    );
    if (axis.categorical && axis.categoricalItems !== undefined) {
      return getCategoricalAxisPosition(
        axis.categoricalItems,
        value as string,
        drawConfig
      );
    } else if (!axis.categorical && axis.extremes !== undefined) {
      return getNumericalAxisPosition(
        axis.extremes,
        value as number,
        drawConfig
      );
    }
  }
  // default case (Information Removal)
  return -1;
}

function getCategoricalAxisPosition(
  categoricalItems: string[],
  value: string,
  drawConfig: DrawConfiguration
): number {
  if (categoricalItems.length === 1) {
    return drawConfig.axisHeight / 2;
  }
  return (
    (categoricalItems.indexOf(value) / (categoricalItems.length - 1)) *
    drawConfig.axisHeight
  );
}

function getNumericalAxisPosition(
  axisExtremes: { min: number; max: number },
  value: number,
  drawConfig: DrawConfiguration
): number {
  return (
    ((value - axisExtremes.min) / (axisExtremes.max - axisExtremes.min)) *
    drawConfig.axisHeight
  );
}
