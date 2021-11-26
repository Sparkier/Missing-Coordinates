<script lang="ts">
  import type { AxisDescriptor, DrawConfiguration } from "./types";

  export let axis: AxisDescriptor;
  export let drawConfiguration: DrawConfiguration;
</script>

<g>
  <text
    x={axis.offset}
    y="0"
    style={`text-anchor: ${drawConfiguration.axisLabelConfiguration.textAnchor}; font-size: ${drawConfiguration.fontSize}px;`}
    >{axis.name}</text
  >
</g>
