<script lang="ts">
  import CoordinateSegment from "./CoordinateSegment.svelte";
  import type { Coordinate } from "../types";
  import { axes, drawConfig, colorScale } from "../stores";

  export let coordinate: Coordinate;

  function getColor(): string {
    const value = coordinate.values[$drawConfig.coloring.coloringAxis];
    if ($colorScale === null || value === null) {
      return "black";
    }
    const color = $colorScale.valueAt(value);
    if (color === null) {
      return "black";
    }
    return color;
  }
</script>

{#each $axes as axis, index}
  {#if index < $axes.length - 1}
    <CoordinateSegment
      {coordinate}
      axis1={axis}
      axis2={$axes[index + 1]}
      axis1Index={index}
      color={getColor()}
    />
  {/if}
{/each}
