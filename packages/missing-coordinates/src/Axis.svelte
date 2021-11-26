<script lang="ts">
  import type { AxisDescriptor, DrawConfiguration } from "./types";

  export let axis: AxisDescriptor;
  export let drawConfiguration: DrawConfiguration;
</script>

<line
  x1={axis.offset}
  x2={axis.offset}
  y1="0"
  y2={drawConfiguration.axisHeight}
  stroke="black"
/>
