export { default as ScaleOrdinal } from "./scaleOrdinal";
export { default as ScaleSequential } from "./scaleSequential";

export interface ColorScale {
  valueAt: (value: string | number) => string | null;
}
