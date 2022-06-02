export default function (): (value: string | number) => string {
  // mapping from domain values to index.
  let domainIndex = new Map();
  // domain of possible values
  let domain: string[] = [];
  // range to be projected to
  let range: string[] = [];

  const scale = (value: string | number) => {
    const index = domainIndex.get(value.toString());
    if (index === undefined) {
      return null;
    }
    return range[index % range.length];
  };

  scale.domain = (newDomain: string[] | number[]) => {
    domain = [];
    domainIndex = new Map();

    newDomain.forEach((value) => {
      const stringValue = value.toString();
      if (!domainIndex.has(stringValue)) {
        domainIndex.set(stringValue, domain.length);
        domain.push(stringValue);
      }
    });

    return scale;
  };

  scale.range = (newRange: string[]) => {
    range = newRange;
    return scale;
  };

  return scale;
}
