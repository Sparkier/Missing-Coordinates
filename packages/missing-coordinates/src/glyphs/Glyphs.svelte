<script lang="ts">
  import Circles from "./Circles.svelte";
  import { coordinates } from "../stores";
</script>

<g>
  {#each $coordinates as coordinate}
    <Circles {coordinate} />
  {/each}
</g>
