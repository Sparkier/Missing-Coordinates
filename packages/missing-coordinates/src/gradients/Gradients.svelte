<script lang="ts">
  import type { Data, DrawConfiguration } from "../types";
  import type { ColorScale } from "../color/scales";
  import { drawConfig, data, colorScale } from "../stores";

  $: usedColors = getUsedColors($data, $drawConfig, $colorScale);

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

<defs>
  {#each usedColors as color}
    <linearGradient id={`missingGradientDecreasing-${color}`}>
      <stop offset="0%" stop-opacity="1" stop-color={color} />
      <stop offset="50%" stop-opacity="0.75" stop-color={color} />
      <stop offset="100%" stop-opacity="0" stop-color={color} />
    </linearGradient>
    
    <linearGradient id={`missingGradientIncreasing-${color}`}>
      <stop offset="0%" stop-opacity="0" stop-color={color} />
      <stop offset="50%" stop-opacity="0.75" stop-color={color} />
      <stop offset="100%" stop-opacity="1" stop-color={color} />
    </linearGradient>
    
    <linearGradient id={`missingGradientNull-${color}`}>
      <stop offset="0%" stop-opacity="0" stop-color={color} />
      <stop offset="50%" stop-opacity="0" stop-color={color} />
      <stop offset="100%" stop-opacity="0" stop-color={color} />
    </linearGradient>
  {/each}
</defs>
