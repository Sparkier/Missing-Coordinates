<script lang="ts">
  import Axis from "./Axis.svelte";
  import type { AxisDescriptor, Data, DrawConfiguration } from "./types";

  export let drawConfiguration: DrawConfiguration;
  export let data: Data;

  $: axes = data.axes.map((value, index) => {
    return {
      name: value.name,
      offset: index * drawConfiguration.axesSpacing,
    } as AxisDescriptor;
  });
</script>

<g>
  {#each axes as axis}
    <Axis {axis} {drawConfiguration} />
  {/each}
</g>
