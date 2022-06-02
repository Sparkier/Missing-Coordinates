<script lang="ts">
  import Coordinate from "./Coordinate.svelte";
  import { coordinates, drawConfig } from "../stores";
  import { DrawingOrder, Coordinate as Coord } from "../types";

  // Get coordinates with appropriate order.
  $: orderedCoordinates =
    $drawConfig.drawingOrder === DrawingOrder.RANDOM
      ? shuffleCoordinates($coordinates)
      : $coordinates;

  /**
   * Shuffle coordinate order.
   *
   * @param coordinates the coordinates to be shuffled.
   * @returns shuffled veresion of the coordinates as new array.
   */
  function shuffleCoordinates(coordinates: Coord[]): Coord[] {
    const coords = [...coordinates];
    for (let index = coords.length - 1; index > 0; index--) {
      const newIndex = Math.floor(Math.random() * (index + 1));
      [coords[index], coords[newIndex]] = [coords[newIndex], coords[index]];
    }

    return coords;
  }
</script>

<g>
  {#each orderedCoordinates as coordinate}
    <Coordinate {coordinate} />
  {/each}
</g>
