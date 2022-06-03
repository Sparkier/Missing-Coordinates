<script lang="ts">
  import CoordinateSegment from "./CoordinateSegment.svelte";
  import type { Coordinate } from "../types";
  import { axes, drawConfig, colorScale } from "../stores";
  import type { ColorScale } from "../color/scales";

  export let coordinate: Coordinate;

  $: color = getColor(coordinate, $colorScale, $drawConfig.coloring.coloringAxis);

  function getColor(coord: Coordinate, scale: ColorScale | null, coloringAxis: string): string {
    const value = coord.values[coloringAxis];
    if (scale === null || value === null) {
      return "black";
    }
    const color = scale.valueAt(value);
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
      color={color}
    />
  {/if}
{/each}
