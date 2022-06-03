<script lang="ts">
  export let color: string;
</script>

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
