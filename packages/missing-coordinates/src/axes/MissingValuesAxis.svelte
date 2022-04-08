<script lang="ts">
  import { drawConfig, axes } from "../stores";

  $: offsets = $axes.map(axis => axis.offset);
  $: axisExtremes = {
    min: Math.min(...offsets),
    max: Math.max(...offsets)
  }
</script>

<line
  id="missing-values-axis"
  x1={axisExtremes.min}
  x2={axisExtremes.max}
  y1={$drawConfig.axisHeight + $drawConfig.missingValuesAxisSpacing}
  y2={$drawConfig.axisHeight + $drawConfig.missingValuesAxisSpacing}
  stroke="black"
/>
