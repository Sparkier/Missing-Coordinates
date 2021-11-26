<script lang="ts">
  import AxisLabel from "./AxisLabel.svelte";
  import type { AxisDescriptor, Data, DrawConfiguration } from "./types";
  import { TopBottomPosition } from "./types";

  export let drawConfiguration: DrawConfiguration;
  export let data: Data;
  export let totalHeight: number;

  $: axes = data.axes.map((value, index) => {
    return {
      name: value.name,
      offset: index * drawConfiguration.axesSpacing,
    } as AxisDescriptor;
  });
</script>

<g
  id="label-group"
  transform={`translate(0, ${
    drawConfiguration.axisLabelConfiguration.axisLabelPosition ===
    TopBottomPosition.ABOVE
      ? drawConfiguration.axisLabelConfiguration.margin +
        drawConfiguration.fontSize
      : totalHeight -
        drawConfiguration.axisLabelConfiguration.margin -
        drawConfiguration.margin.bottom -
        drawConfiguration.margin.top
  })`}
>
  {#each axes as axis}
    <AxisLabel {axis} {drawConfiguration} />
  {/each}
</g>
