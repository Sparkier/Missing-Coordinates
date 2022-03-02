<script lang="ts">
  import { drawConfig } from "../stores";

  export let annotation: {
    show: boolean;
    min: number;
    max: number;
    offset: number;
  };

  $: bottomLabelOffset =
    $drawConfig.axisAnnotationConfiguration.margin * 2 +
    $drawConfig.axisHeight +
    $drawConfig.fontSize;
</script>

<g id="annotation-group">
  <text
    x={annotation.offset}
    y="0"
    style={`text-anchor: ${$drawConfig.axisAnnotationConfiguration.textAnchor}; font-size: ${$drawConfig.fontSize}px;`}
    >{annotation.max}</text
  >
  <text
    x={annotation.offset}
    y={bottomLabelOffset}
    style={`text-anchor: ${$drawConfig.axisAnnotationConfiguration.textAnchor}; font-size: ${$drawConfig.fontSize}px;`}
    >{annotation.min}</text
  >
</g>
