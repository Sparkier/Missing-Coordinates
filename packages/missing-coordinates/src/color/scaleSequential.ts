import type { Cubehelix } from "./sequentialColorInterpolators";
import type { ColorScale } from "./scales";

export default class ScaleSequential implements ColorScale {
  private domainExtrema: {
    start: number;
    end: number;
  } = { start: 0, end: 0 };

  private interpolateFn: ((t: number) => Cubehelix) | null = null;

  public valueAt(value: number | string): string | null {
    if (this.interpolateFn === null) {
      return null;
    }

    if (value === null || typeof value === "string") {
      return null;
    }

    value = value as number;

    const min = Math.min(this.domainExtrema.start, this.domainExtrema.end);
    const max = Math.max(this.domainExtrema.start, this.domainExtrema.end);
    const isWithinDomain = value >= min && value <= max;

    // ensure t is within the domain
    if (!isWithinDomain) {
      if (value < min) {
        value = min;
      }
      if (value > max) {
        value = max;
      }
    }

    let normalizedT = (value - min) / (max - min);
    if (this.domainExtrema.start > this.domainExtrema.end) {
      normalizedT = 1 - normalizedT;
    }

    return this.interpolateFn(normalizedT).hex();
  }

  public domain(newDomain: [number, number]): ScaleSequential {
    const [start, end] = newDomain;
    this.domainExtrema = { start, end };
    return this;
  }

  public interpolator(
    interpolateFn: (t: number) => Cubehelix
  ): ScaleSequential {
    this.interpolateFn = interpolateFn;
    return this;
  }
}
