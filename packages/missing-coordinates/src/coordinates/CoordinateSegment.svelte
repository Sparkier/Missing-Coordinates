<script lang="ts">
  import type { AxisDescriptor, Coordinate } from "../types";
  import { Concept } from "../types";
  import { axes, data, drawConfig } from "../stores";
  import { imputeValueForAxis } from "./imputation";

  export let coordinate: Coordinate;
  export let axis1: AxisDescriptor;
  export let axis2: AxisDescriptor;

  $: axis1Pos = getCoordinatePosition(axis1);
  $: axis2Pos = getCoordinatePosition(axis2);

  function getCoordinatePosition(axis: AxisDescriptor): number | undefined {
    const value = coordinate.values[axis.name];

    if (value === null) {
      return getPostionForMissingValue(axis);
    }

    if (
      axis.categorical &&
      axis.categoricalItems !== undefined &&
      typeof value === "string"
    ) {
      return getCategoricalAxisPosition(axis.categoricalItems, value);
    } else if (axis.extremes !== undefined && typeof value === "number") {
      return getNumericalAxisPosition(axis.extremes, value);
    }
  }

  function getPostionForMissingValue(axis: AxisDescriptor): number | undefined {
    if ($drawConfig.concept === Concept.MISSING_VALUES_AXIS) {
      return $drawConfig.axisHeight + $drawConfig.missingValuesAxisSpacing;
    } else if ($drawConfig.concept === Concept.IMPUTATION) {
      const value = imputeValueForAxis(
        $data,
        axis,
        coordinate,
        $drawConfig.imputationNeighbors,
        $axes
      );
      if (axis.categorical && axis.categoricalItems !== undefined) {
        return getCategoricalAxisPosition(
          axis.categoricalItems,
          value as string
        );
      } else if (!axis.categorical && axis.extremes !== undefined) {
        return getNumericalAxisPosition(axis.extremes, value as number);
      }
    }
    // default case (Information Removal)
    return;
  }

  function getCategoricalAxisPosition(
    categoricalItems: string[],
    value: string
  ): number {
    if (categoricalItems.length === 1) {
      return $drawConfig.axisHeight / 2;
    }
    return (
      (categoricalItems.indexOf(value) / (categoricalItems.length - 1)) *
      $drawConfig.axisHeight
    );
  }

  function getNumericalAxisPosition(
    axisExtremes: { min: number; max: number },
    value: number
  ): number {
    return (
      ((value - axisExtremes.min) / (axisExtremes.max - axisExtremes.min)) *
      $drawConfig.axisHeight
    );
  }
</script>

{#if axis1Pos !== undefined && axis2Pos !== undefined}
  <line
    x1={axis1.offset}
    x2={axis2.offset}
    y1={axis1Pos}
    y2={axis2Pos}
    stroke="black"
  />
{/if}
