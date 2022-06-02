import type { HSL } from "./sequentialColorInterpolators";

export default class ScaleSequential {
  private domainExtrema: {
    start: number;
    end: number;
  } = { start: 0, end: 0 };

  private interpolateFn: ((t: number) => HSL) | null = null;

  public valueAt(t: number): string | null {
    const min = Math.min(this.domainExtrema.start, this.domainExtrema.end);
    const max = Math.max(this.domainExtrema.start, this.domainExtrema.end);
    const isWithinDomain = t >= min && t <= max;

    // ensure t is within the domain
    if (!isWithinDomain) {
      if (t < min) {
        t = min;
      }
      if (t > max) {
        t = max;
      }
    }

    let normalizedT = (t - min) / (max - min);
    console.log(normalizedT);
    if (this.domainExtrema.start > this.domainExtrema.end) {
      normalizedT = 1 - normalizedT;
    }

    if (this.interpolateFn !== null) {
      const hsl = this.interpolateFn(normalizedT);
      console.log(hsl.h, hsl.s, hsl.l);
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
