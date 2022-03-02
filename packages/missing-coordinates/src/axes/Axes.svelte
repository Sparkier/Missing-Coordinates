<script lang="ts">
  import Axis from "./Axis.svelte";
  import { axes } from "../stores";
</script>

<g>
  {#each $axes as axis}
    <Axis {axis} />
  {/each}
</g>
