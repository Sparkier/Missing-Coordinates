<script lang="ts">
  import type { AxisDescriptor, Coordinate } from "../types";
  import { axes, data, drawConfig } from "../stores";
  import { getCoordinatePosition } from "../coordinates";

  export let coordinate: Coordinate;
  export let axis: AxisDescriptor;
  export let color: string;

  $: isAxisNull = coordinate.values[axis.name] === null;
  $: axisY = getCoordinatePosition(axis, coordinate, $drawConfig, $data, $axes);
</script>

{#if isAxisNull}
  <circle
    cx={axis.offset}
    cy={axisY}
    r={$drawConfig.missingValuesConfiguration.glyphRadius}
    fill="white"
    stroke={color}
    stroke-opacity={$drawConfig.lineOpacity}
  />
{/if}
