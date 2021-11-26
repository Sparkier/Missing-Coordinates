<script lang="ts">
  import type { DrawConfiguration } from "./types";

  export let annotation: {
    show: boolean;
    min: number;
    max: number;
    offset: number;
  };
  export let drawConfiguration: DrawConfiguration;

  $: bottomLabelOffset =
    drawConfiguration.axisAnnotationConfiguration.margin * 2 +
    drawConfiguration.axisHeight +
    drawConfiguration.fontSize;
</script>

<g id="annotation-group">
  <text
    x={annotation.offset}
    y="0"
    style={`text-anchor: ${drawConfiguration.axisAnnotationConfiguration.textAnchor}; font-size: ${drawConfiguration.fontSize}px;`}
    >{annotation.max}</text
  >
  <text
    x={annotation.offset}
    y={bottomLabelOffset}
    style={`text-anchor: ${drawConfiguration.axisAnnotationConfiguration.textAnchor}; font-size: ${drawConfiguration.fontSize}px;`}
    >{annotation.min}</text
  >
</g>
