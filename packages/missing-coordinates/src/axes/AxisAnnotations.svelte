<script lang="ts">
  import AxisAnnotation from "./AxisAnnotation.svelte";
  import { drawConfig, data, axisLabelTopOffset } from "../stores";

  $: annotations = $data.axes.map((value, index) => {
    if (value.data.length > 0 && typeof value.data[0] !== "string") {
      const numberData = value.data as number[];
      return {
        show: true,
        min: Math.min(...numberData),
        max: Math.max(...numberData),
        offset: index * $drawConfig.axesSpacing,
      };
    } else {
      return {
        show: false,
        min: 0,
        max: 0,
        offset: index * $drawConfig.axesSpacing,
      };
    }
  });
</script>

<g
  id="annotation-group"
  transform={`translate(0, ${
    $axisLabelTopOffset +
    $drawConfig.axisAnnotationConfiguration.margin +
    $drawConfig.fontSize
  })`}
>
  {#each annotations as annotation}
    {#if annotation.show}
      <AxisAnnotation {annotation} />
    {/if}
  {/each}
</g>
