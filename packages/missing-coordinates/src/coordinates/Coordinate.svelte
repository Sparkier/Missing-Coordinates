<script lang="ts">
  import CoordinateSegment from "./CoordinateSegment.svelte";
  import type { Coordinate } from "../types";
  import { axes } from "../stores";

  export let coordinate: Coordinate;
</script>

{#each $axes as axis, index}
  {#if index < $axes.length - 1}
    <CoordinateSegment {coordinate} axis1={axis} axis2={$axes[index + 1]} />
  {/if}
{/each}
