<script lang="ts">
  import { AxisDescriptor, Coordinate, Variation } from "../types";
  import { Concept } from "../types";
  import { axes, data, drawConfig } from "../stores";
  import { getCoordinatePosition } from "./index";

  export let coordinate: Coordinate;
  export let axis1: AxisDescriptor;
  export let axis2: AxisDescriptor;
  export let color: string;

  $: axis1Y = getCoordinatePosition(
    axis1,
    coordinate,
    $drawConfig,
    $data,
    $axes
  );
  $: axis2Y = getCoordinatePosition(
    axis2,
    coordinate,
    $drawConfig,
    $data,
    $axes
  );
  $: isAxis1Null = coordinate.values[axis1.name] === null;
  $: isAxis2Null = coordinate.values[axis2.name] === null;
  // Check whether the opacity of the line segment should be reduced.
  $: shouldReduceOpacity =
    $drawConfig.variation === Variation.OPACITY && (isAxis1Null || isAxis2Null);
  // Check whether the line segment should be dashed.
  $: shouldDashStroke =
    $drawConfig.variation === Variation.DASHED && (isAxis1Null || isAxis2Null);
  // Set the stroke to the appropriate color/gradient.
  $: stroke = getStroke($drawConfig.variation, isAxis1Null, isAxis2Null);
  // Horizontal gradient lines are invisible in SVG.
  // (https://stackoverflow.com/questions/13223636/svg-gradient-for-perfectly-horizontal-path)
  // Therefore, we replace the line with a rect if that is the case.
  $: lineShouldBeRect =
    axis1Y === axis2Y &&
    $drawConfig.variation === Variation.GRADIENT &&
    $drawConfig.concept === Concept.IMPUTATION &&
    (isAxis1Null || isAxis2Null);

  function getStroke(
    variation: Variation,
    axis1Null: boolean,
    axis2Null: boolean
  ) {
    // If the gradient variant is used, apply gradients.
    if (variation === Variation.GRADIENT) {
      // Completely transparent
      if (axis1Null && axis2Null) {
        return `url(#missingGradientNull-${color})`;
      }
      // Increasing opacity
      if (axis1Null) {
        return `url(#missingGradientIncreasing-${color})`;
      }
      // Decreasing opacity
      if (axis2Null) {
        return `url(#missingGradientDecreasing-${color})`;
      }
    }
    // Apply plain color.
    return color;
  }
</script>

{#if axis1Y >= 0 && axis2Y >= 0}
  {#if lineShouldBeRect}
    <rect
      x={axis1.offset}
      y={axis1Y - 0.5}
      height={1}
      width={axis2.offset - axis1.offset}
      fill={stroke}
    />
  {:else}
    <line
      x1={axis1.offset}
      x2={axis2.offset}
      y1={axis1Y}
      y2={axis2Y}
      {stroke}
      opacity={$drawConfig.lineOpacity *
        (shouldReduceOpacity
          ? $drawConfig.missingValuesConfiguration.missingValueOpacity
          : 1)}
      stroke-dasharray={shouldDashStroke
        ? $drawConfig.missingValuesConfiguration.strokeDasharray
        : ""}
    />
  {/if}
{/if}
