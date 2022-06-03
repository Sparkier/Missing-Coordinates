<script lang="ts">
  import { AxisDescriptor, Coordinate, Variation } from "../types";
  import { Concept } from "../types";
  import { axes, data, drawConfig, colorScale } from "../stores";
  import { imputeValueForAxis } from "./imputation";

  export let coordinate: Coordinate;
  export let axis1: AxisDescriptor;
  export let axis2: AxisDescriptor;
  export let axis1Index: number;

  $: axis1Pos = getCoordinatePosition(axis1);
  $: axis2Pos = getCoordinatePosition(axis2);
  $: isAxis1Null = coordinate.values[axis1.name] === null;
  $: isAxis2Null = coordinate.values[axis2.name] === null;
  // Check if a glyph should be drawn for the end of the segment.
  $: shouldDrawGlyph = $drawConfig.variation === Variation.GLYPH && isAxis2Null;
  // Special case if we need to draw a glyph for the first axis.
  $: shouldDrawGlyphFirstAxis =
    axis1Index === 0 &&
    $drawConfig.variation === Variation.GLYPH &&
    isAxis1Null;
  // Check whether the opacity of the line segment should be reduced.
  $: shouldReduceOpacity =
    $drawConfig.variation === Variation.OPACITY && (isAxis1Null || isAxis2Null);
  // Check whether the line segment should be dashed.
  $: shouldDashStroke =
    $drawConfig.variation === Variation.DASHED && (isAxis1Null || isAxis2Null);
  // Set the stroke to the appropriate color/gradient.
  $: stroke = getStroke($drawConfig.variation, isAxis1Null, isAxis2Null);

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
      return (
        $drawConfig.axisHeight +
        $drawConfig.missingValuesConfiguration.missingValuesAxisSpacing
      );
    } else if ($drawConfig.concept === Concept.IMPUTATION) {
      const value = imputeValueForAxis(
        $data,
        axis,
        coordinate,
        $drawConfig.missingValuesConfiguration.imputationNeighbors,
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

  function getColor(): string {
    const value = coordinate.values[$drawConfig.coloring.coloringAxis];
    if ($colorScale === null || value === null) {
      return "black";
    }
    // TODO: value can be string or number. 
    // Scales should be rewritten to be generic and parse values themself.
    const color = $colorScale.valueAt(value);
    if (color === null) {
      return "black";
    }
    return color;
  }

  function getStroke(
    variation: Variation,
    axis1Null: boolean,
    axis2Null: boolean
  ) {
    // If the gradient variant is used, apply gradients.
    if (variation === Variation.GRADIENT) {
      // Completely transparent
      if (axis1Null && axis2Null) {
        return "url(#missingGradientNull)";
      }
      // Increasing opacity
      if (axis1Null) {
        return "url(#missingGradientIncreasing)";
      }
      // Decreasing opacity
      if (axis2Null) {
        return "url(#missingGradientDecreasing)";
      }
    }
    // Apply plain color.
    return getColor();
  }
</script>

{#if axis1Pos !== undefined && axis2Pos !== undefined}
  <line
    x1={axis1.offset}
    x2={axis2.offset}
    y1={axis1Pos}
    y2={axis2Pos}
    {stroke}
    opacity={shouldReduceOpacity
      ? $drawConfig.missingValuesConfiguration.missingValueOpacity
      : 1}
    stroke-dasharray={shouldDashStroke
      ? $drawConfig.missingValuesConfiguration.strokeDasharray
      : ""}
  />
  {#if shouldDrawGlyph}
    <circle
      cx={axis2.offset}
      cy={axis2Pos}
      r={$drawConfig.missingValuesConfiguration.glyphRadius}
      fill="white"
      stroke={getColor()}
    />
  {/if}
  {#if shouldDrawGlyphFirstAxis}
    <circle
      cx={axis1.offset}
      cy={axis1Pos}
      r={$drawConfig.missingValuesConfiguration.glyphRadius}
      fill="white"
      stroke={getColor()}
    />
  {/if}
{/if}
