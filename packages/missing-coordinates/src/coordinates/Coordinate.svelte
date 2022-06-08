<script lang="ts">
  import CoordinateSegment from "./CoordinateSegment.svelte";
  import type { Coordinate } from "../types";
  import { axes, drawConfig, colorScale } from "../stores";
  import { getColorForCoordinate } from "../color";

  export let coordinate: Coordinate;

  $: color = getColorForCoordinate(
    coordinate,
    $colorScale,
    $drawConfig.coloring.coloringAxis
  );
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
