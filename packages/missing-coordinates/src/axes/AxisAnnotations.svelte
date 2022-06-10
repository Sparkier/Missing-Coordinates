<script lang="ts">
  import AxisAnnotation from "./AxisAnnotation.svelte";
  import { drawConfig, axisLabelTopOffset, axes } from "../stores";

  $: annotations = $axes.map((axis, index) => {
    if (axis.categorical) {
      return {
        show: false,
        min: 0,
        max: 0,
        offset: index * $drawConfig.axesSpacing,
      };
    }
    return {
      show: true,
      min: axis.extremes !== undefined ? axis.extremes.min : 0,
      max: axis.extremes !== undefined ? axis.extremes.max : 0,
      offset: index * $drawConfig.axesSpacing,
    };
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
