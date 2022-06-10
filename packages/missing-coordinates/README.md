# Missing Coordinates

![Teaser Image](https://github.com/Sparkier/Missing-Coordinates/blob/70e6d731444b108e6bff597dac0cbbb15271d211/.github/readme_pictures/teaser.png)

Implementation of a novel extension to Parallel Coordinates, introcuded in the Paper:

> Where did my Lines go? Visualizing Missing Data in Parallel Coordinates

presented at [EuroVis 2022](https://conferences.eg.org/eurovis2022/). Created by [Alex Bäuerle](https://a13x.io/), [Christian van Onzenoodt](https://onze.io/), Simon der Kinderen, [Jimmy Johansson Westberg](https://liu.se/en/employee/jimjo94), [Daniel Jönsson](https://liu.se/en/employee/danjo37), and [Timo Ropinski](https://viscom.uni-ulm.de/members/timo-ropinski/).

For a demo of missing-coordinates, check out our [storybook example](http://a13x.io/Missing-Coordinates/).

## Usage

After installing the package from npm via:

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
