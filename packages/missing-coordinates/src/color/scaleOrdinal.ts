import type { ColorScale } from "./scales";

export default class ScaleOrdinal implements ColorScale {
  // mapping from domain values to index.
  private domainIndex = new Map();
  // domain of possible values
  private domainItems: string[] = [];
  // range to be projected to
  private rangeItems: string[] = [];

  public valueAt(value: string | number): string | null {
    const index = this.domainIndex.get(value.toString());
    if (index === undefined) {
      return null;
    }
    return this.rangeItems[index % this.rangeItems.length];
  }

  public domain(newDomain: string[] | number[]): ScaleOrdinal {
    this.domainItems = [];
    this.domainIndex = new Map();

    newDomain.forEach((value) => {
      const stringValue = value.toString();
      if (!this.domainIndex.has(stringValue)) {
        this.domainIndex.set(stringValue, this.domainItems.length);
        this.domainItems.push(stringValue);
      }
    });

    return this;
  }

  public range(newRange: string[]): ScaleOrdinal {
    this.rangeItems = newRange;
    return this;
  }
}
