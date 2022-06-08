<script lang="ts">
  import Circle from "./Circle.svelte";
  import type { Coordinate } from "../types";
  import { colorScale, drawConfig, axes } from "../stores";
  import { getColorForCoordinate } from "../color";

  export let coordinate: Coordinate;

  $: color = getColorForCoordinate(
    coordinate,
    $colorScale,
    $drawConfig.coloring.coloringAxis
  );
</script>

{#each $axes as axis}
  <Circle {coordinate} {axis} {color} />
{/each}
