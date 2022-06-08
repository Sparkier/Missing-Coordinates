import type { Coordinate } from "../types";
import type { ColorScale } from "./scales";

export function getColorForCoordinate(
  coord: Coordinate,
  scale: ColorScale | null,
  coloringAxis: string
): string {
  const value = coord.values[coloringAxis];
  if (scale === null || value === null) {
    return "black";
  }
  const color = scale.valueAt(value);
  if (color === null) {
    return "black";
  }
  return color;
}
