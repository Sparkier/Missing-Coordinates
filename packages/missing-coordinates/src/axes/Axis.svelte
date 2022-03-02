<script lang="ts">
  import type { AxisDescriptor } from "../types";
  import { drawConfig } from "../stores";

  export let axis: AxisDescriptor;
</script>

<line
  x1={axis.offset}
  x2={axis.offset}
  y1="0"
  y2={$drawConfig.axisHeight}
  stroke="black"
/>
