const A = -0.14861;
const B = +1.78277;
const C = -0.29227;
const D = -0.90649;
const E = +1.97294;

const constant = (x: number) => () => x;

export const scaleLinear: (a: number, b: number) => (t: number) => number = (
  a,
  b
) => {
  return (t: number) => a + t * b;
};

const hueInterpolator = (a: number, b: number) => {
  const d = b - a;
  return d
    ? scaleLinear(a, d > 180 || d < -180 ? d - 360 * Math.round(d / 360) : d)
    : constant(isNaN(a) ? b : a);
};

const colorInterpolator = (a: number, b: number) => {
  const d = b - a;
  return d ? scaleLinear(a, d) : constant(isNaN(a) ? b : a);
};

export class HSL {
  h = 0;
  s = 0;
  l = 0;
  opacity: number;

  constructor(h: number, s: number, l: number, opacity = 1.0) {
    this.h = +h;
    this.s = +s;
    this.l = +l;
    this.opacity = +opacity;
  }

  rgb(): [number, number, number, number] {
    const clamp = (value: number): number => {
      return Math.max(0, Math.min(255, Math.round(value) || 0));
    };
    const h = isNaN(this.h) ? 0 : (this.h + 120) * (Math.PI / 180);
    const l = +this.l;
    const a = isNaN(this.s) ? 0 : this.s * l * (1 - l);
    const cosh = Math.cos(h);
    const sinh = Math.sin(h);
    return [
      clamp(255 * (l + a * (A * cosh + B * sinh))),
      clamp(255 * (l + a * (C * cosh + D * sinh))),
      clamp(255 * (l + a * (E * cosh))),
      this.opacity,
    ];
  }

  hex(): string {
    const componentToHex = (c: number) => {
      const hexString = c.toString(16);
      return hexString.length === 1 ? "0" + hexString : hexString;
    };
    const rgb = this.rgb();
    return `#${rgb.slice(0, 3).reduce((a, b) => a + componentToHex(b), "")}`;
  }
}

export type interpolateFunction = (t: number) => HSL;
type hslInterpolatorFn = (start: HSL, end: HSL) => interpolateFunction;

const hslInterpolator: hslInterpolatorFn = (start: HSL, end: HSL) => {
  const h = hueInterpolator(start.h, end.h);
  const s = colorInterpolator(start.s, end.s);
  const l = colorInterpolator(start.l, end.l);
  const opacity = colorInterpolator(start.opacity, end.opacity);

  return (t: number) => {
    start.h = h(t);
    start.s = s(t);
    start.l = l(t);
    start.opacity = opacity(t);
    return start;
  };
};

export const interpolators = new Map([
  ["warm", hslInterpolator(new HSL(-100, 0.75, 0.35), new HSL(80, 1.5, 0.8))],
  ["cool", hslInterpolator(new HSL(260, 0.75, 0.35), new HSL(80, 1.5, 0.8))],
]);
