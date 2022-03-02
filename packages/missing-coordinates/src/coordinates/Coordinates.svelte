<script lang="ts">
  import Coordinate from "./Coordinate.svelte";
  import { coordinates } from "../stores";
</script>

<g>
  {#each $coordinates as coordinate}
    <Coordinate {coordinate} />
  {/each}
</g>
