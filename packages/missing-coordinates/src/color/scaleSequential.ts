import type { HSL } from "./sequentialColorInterpolators";

export default class ScaleSequential {
  private domainExtrema: {
    start: number;
    end: number;
  } = { start: 0, end: 0 };

  private interpolateFn: ((t: number) => HSL) | null = null;

  public valueAt(value: number): string | null {
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

    if (this.interpolateFn !== null) {
      return this.interpolateFn(normalizedT).hex();
    }
    return null;
  }

  public domain(newDomain: [number, number]): ScaleSequential {
    const [start, end] = newDomain;
    this.domainExtrema = { start, end };
    return this;
  }

  public interpolator(interpolateFn: (t: number) => HSL): ScaleSequential {
    this.interpolateFn = interpolateFn;
    return this;
  }
}
