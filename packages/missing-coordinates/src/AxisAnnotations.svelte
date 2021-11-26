<script lang="ts">
  import AxisAnnotation from "./AxisAnnotation.svelte";
  import type { Data, DrawConfiguration } from "./types";

  export let drawConfiguration: DrawConfiguration;
  export let data: Data;
  export let topOffset: number;

  $: annotations = data.axes.map((value, index) => {
    if (value.data.length > 0 && typeof value.data[0] !== "string") {
      const numberData = value.data as number[];
      return {
        show: true,
        min: Math.min(...numberData),
        max: Math.max(...numberData),
        offset: index * drawConfiguration.axesSpacing,
      };
    } else {
      return {
        show: false,
        min: 0,
        max: 0,
        offset: index * drawConfiguration.axesSpacing,
      };
    }
  });
</script>

<g
  id="annotation-group"
  transform={`translate(0, ${
    topOffset +
    drawConfiguration.axisAnnotationConfiguration.margin +
    drawConfiguration.fontSize
  })`}
>
  {#each annotations as annotation}
    {#if annotation.show}
      <AxisAnnotation {annotation} {drawConfiguration} />
    {/if}
  {/each}
</g>
