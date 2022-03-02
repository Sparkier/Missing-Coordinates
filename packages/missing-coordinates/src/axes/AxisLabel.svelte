<script lang="ts">
  import type { AxisDescriptor } from "../types";
  import { drawConfig } from "../stores";

  export let axis: AxisDescriptor;
</script>

<g>
  <text
    x={axis.offset}
    y="0"
    style={`text-anchor: ${$drawConfig.axisLabelConfiguration.textAnchor}; font-size: ${$drawConfig.fontSize}px;`}
    >{axis.name}</text
  >
</g>
