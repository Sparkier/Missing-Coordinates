<p align="center">
  <a href="https://github.com/Sparkier/Missing-Coordinates/actions/workflows/ci.yml">
    <img src="https://github.com/Sparkier/Missing-Coordinates/actions/workflows/ci.yml/badge.svg" alt="Current build status">
  </a>
  <a href="https://www.npmjs.com/package/missing-coordinates">
    <img src="https://img.shields.io/npm/v/missing-coordinates.svg" alt="Current NPM version">
  </a>
</p>

# Missing Coordinates

![Teaser Image](https://github.com/Sparkier/Missing-Coordinates/blob/70e6d731444b108e6bff597dac0cbbb15271d211/.github/readme_pictures/teaser.png)

Implementation of a novel extension to Parallel Coordinates, introduced in the Paper:

> [Where did my Lines go? Visualizing Missing Data in Parallel Coordinates](https://onlinelibrary.wiley.com/doi/pdf/10.1111/cgf.14536)

presented at [EuroVis 2022](https://conferences.eg.org/eurovis2022/). Created by [Alex Bäuerle](https://a13x.io/), [Christian van Onzenoodt](https://onze.io/), Simon der Kinderen, [Jimmy Johansson Westberg](https://liu.se/en/employee/jimjo94), [Daniel Jönsson](https://liu.se/en/employee/danjo37), and [Timo Ropinski](https://viscom.uni-ulm.de/members/timo-ropinski/).

## Demo

For a demo of missing-coordinates, check out our [storybook example](http://a13x.io/Missing-Coordinates/).

## Usage 

First install:

`npm install --save missing-coordinates`

Using our Parallel Coordinates implementation is as simple as:

### Plain JS

script.js

```javascript
import { PC } from "./node_modules/missing-coordinates/dist/index.mjs";
// if you are using a bundler, this would be import { PC } from "missing-coordinates";

new PC({
  target: document.body,
  props: {
    data: {
      name: "sample",
      axes: [
        { name: "A", data: ["A", "A", "A", "A", "B", "B"] },
        { name: "B", data: [0.0, null, 0.4, null, 0.8, 1.0] },
        { name: "C", data: [0.0, 0.2, 0.4, 0.6, 0.8, 1.0] },
      ],
    },
  },
});
```

index.html

```html
<!DOCTYPE html>
<html lang="en">
  <style></style>
  <body>
    <script src="script.js" type="module"></script>
  </body>
</html>
```

### Svelte

```javascript
<script>
  import { PC } from "missing-coordinates";
</script>

<main>
  <PC
    data={{
      name: "sample",
      axes: [
        { name: "A", data: ["A", "A", "A", "A", "B", "B"] },
        { name: "B", data: [0.0, null, 0.4, null, 0.8, 1.0] },
        { name: "C", data: [0.0, 0.2, 0.4, 0.6, 0.8, 1.0] },
      ],
    }}
  />
</main>
```

For detailed usage instructions, see [packages/missing-coordinates](https://github.com/Sparkier/missing-coordinates/tree/main/packages/missing-coordinates).

## Packages

### missing-coordinates

The main package including the implementation for parallel coordinates with missing data.

### Storybook

An interactive web demo of missing-coordinates with examples of data sets, editable configurations, and configurable removal amounts.

## Contributing

You can find detailed informations on how to contribute to this project in our [contribution guide](https://github.com/Sparkier/Missing-Coordinates/blob/main/CONTRIBUTING.md).

## Citation

If you find this work or code useful please consider citing us:

    @inproceedings{bauerle2022did,
      title={Where did my Lines go? Visualizing Missing Data in Parallel Coordinates},
      author={B{\"a}uerle, Alex and van Onzenoodt, C and der Kinderen, S and Westberg, J Johansson and J{\"o}nsson, Daniel and Ropinski, Timo},
      booktitle={Computer Graphics Forum},
      volume={41},
      number={3},
      pages={235--246},
      year={2022},
      organization={Wiley Online Library}
    }
