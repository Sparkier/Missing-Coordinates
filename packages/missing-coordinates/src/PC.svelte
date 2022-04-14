<script lang="ts">
  import Axes from "./axes/Axes.svelte";
  import AxisAnnotations from "./axes/AxisAnnotations.svelte";
  import AxisLabels from "./axes/AxisLabels.svelte";
  import Coordinates from "./coordinates/Coordinates.svelte";
  import MissingValuesAxis from "./axes/MissingValuesAxis.svelte";
  import {
    width,
    height,
    drawConfig,
    axisLabelTopOffset,
    axisAnnotationHeight,
    data as storeData,
  } from "./stores";
  import type { Data } from "./types";
  import { DrawConfiguration, Concept } from "./types";

  export let drawConfiguration: DrawConfiguration = new DrawConfiguration();
  export let data: Data;

  $: drawConfig.set(drawConfiguration);
  $: storeData.set(data);
</script>

<main>
  <svg width={$width} height={$height}>
    <g
      id="main-group"
      transform={`translate(${$drawConfig.margin.left}, ${$drawConfig.margin.top})`}
    >
      {#if $drawConfig.axisLabelConfiguration.show}
        <AxisLabels />
      {/if}
      {#if $drawConfig.axisAnnotationConfiguration.show}
        <AxisAnnotations />
      {/if}
      <g
        id="chart-group"
        transform={`translate(0, ${
          $axisLabelTopOffset + $axisAnnotationHeight / 2
        })`}
      >
        <Axes />
        <Coordinates />
        {#if $drawConfig.concept === Concept.MISSING_VALUES_AXIS}
          <MissingValuesAxis />
        {/if}
      </g>
    </g>
  </svg>
</main>
