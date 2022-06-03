<script lang="ts">
  import Axes from "./axes/Axes.svelte";
  import AxisAnnotations from "./axes/AxisAnnotations.svelte";
  import AxisLabels from "./axes/AxisLabels.svelte";
  import Coordinates from "./coordinates/Coordinates.svelte";
  import MissingValuesAxis from "./axes/MissingValuesAxis.svelte";
  import Gradients from "./gradients/Gradients.svelte";
  import type { ColorScale } from "./color/scales";

  import {
    width,
    height,
    drawConfig,
    axisLabelTopOffset,
    axisAnnotationHeight,
    colorScale,
    data as storeData,
  } from "./stores";
  import type { Data, AxisData } from "./types";
  import { DrawConfiguration, Concept, Variation } from "./types";

  export let drawConfiguration: DrawConfiguration = new DrawConfiguration();
  export let data: Data;

  $: drawConfig.set(drawConfiguration);
  $: storeData.set(data);
  $: usedColors = getUsedColors(data, drawConfiguration, $colorScale);

  function getUsedColors(data: Data, drawConfig: DrawConfiguration, scale: ColorScale | null): string[] {
    if (scale === null) {
      return [];
    }

    const getUniqueValues = (data: AxisData[], colorAxis: string): (string | number)[] => {
      const axis = data.find((axis) => axis.name === colorAxis);
      if (!axis) {
        return [];
      }
      return [...new Set(axis.data)].filter((e) => e !== null) as (string | number)[];
    }

    const coloringAxis = drawConfig.coloring.coloringAxis;
    const uniqueValues = getUniqueValues(data.axes, coloringAxis)
    return uniqueValues.map((value: string | number) => {
      return scale.valueAt(value);
    }).filter((e) => e !== null) as string[];
  }

</script>

<main>
  <svg width={$width} height={$height}>
    {#if $drawConfig.variation === Variation.GRADIENT}
      <defs>
        {#each usedColors as c}
          <Gradients color={c} />
        {/each}
      </defs>
    {/if}
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
