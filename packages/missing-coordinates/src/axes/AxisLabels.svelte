<script lang="ts">
  import AxisLabel from "./AxisLabel.svelte";
  import { drawConfig, height, axes } from "../stores";
  import { TopBottomPosition } from "../types";
</script>

<g
  id="label-group"
  transform={`translate(0, ${
    $drawConfig.axisLabelConfiguration.axisLabelPosition ===
    TopBottomPosition.ABOVE
      ? $drawConfig.axisLabelConfiguration.margin + $drawConfig.fontSize
      : $height -
        $drawConfig.axisLabelConfiguration.margin -
        $drawConfig.margin.bottom -
        $drawConfig.margin.top
  })`}
>
  {#each $axes as axis}
    <AxisLabel {axis} />
  {/each}
</g>
