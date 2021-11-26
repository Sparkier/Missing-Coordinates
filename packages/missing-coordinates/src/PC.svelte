<script lang="ts">
  import Axes from "./Axes.svelte";
  import AxisAnnotations from "./AxisAnnotations.svelte";
  import AxisLabels from "./AxisLabels.svelte";
  import { Data, TopBottomPosition } from "./types";
  import { DrawConfiguration } from "./types";

  export let drawConfiguration: DrawConfiguration = new DrawConfiguration();
  export let data: Data;

  // Height of the labels we draw.
  $: axisLabelHeight = drawConfiguration.axisLabelConfiguration.show
    ? drawConfiguration.axisLabelConfiguration.margin * 2 +
      drawConfiguration.fontSize
    : 0;
  // Offset we need for the labels above the visualization.
  $: axisLabelTopOffset =
    drawConfiguration.axisLabelConfiguration.axisLabelPosition ===
    TopBottomPosition.ABOVE
      ? axisLabelHeight
      : 0;
  // Height of the value annotations.
  $: axisAnnotationHeight = drawConfiguration.axisAnnotationConfiguration.show
    ? drawConfiguration.axisAnnotationConfiguration.margin * 4 +
      drawConfiguration.fontSize * 2
    : 0;
  // Total width of the SVG element.
  $: width =
    (data.axes.length - 1) * drawConfiguration.axesSpacing +
    drawConfiguration.margin.left +
    drawConfiguration.margin.right;
  // Total height of the SVG element.
  $: height =
    drawConfiguration.axisHeight +
    drawConfiguration.margin.top +
    drawConfiguration.margin.bottom +
    axisLabelHeight +
    axisAnnotationHeight;
</script>

<main>
  <svg {width} {height}>
    <g
      id="main-group"
      transform={`translate(${drawConfiguration.margin.left}, ${drawConfiguration.margin.top})`}
    >
      {#if drawConfiguration.axisLabelConfiguration.show}
        <AxisLabels {data} {drawConfiguration} totalHeight={height} />
      {/if}
      {#if drawConfiguration.axisAnnotationConfiguration.show}
        <AxisAnnotations
          {data}
          {drawConfiguration}
          topOffset={axisLabelTopOffset}
        />
      {/if}
      <g
        id="chart-group"
        transform={`translate(0, ${
          axisLabelTopOffset + axisAnnotationHeight / 2
        })`}
      >
        <Axes {drawConfiguration} {data} />
      </g>
    </g>
  </svg>
</main>
