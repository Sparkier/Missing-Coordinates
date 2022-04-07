import PCDemo from "./PCDemo.svelte";
import { TopBottomPosition, Variation, Concept } from "missing-coordinates";
import penguins from "./penguins.json";
import sample from "./sample.json";
export default {
  title: "missing-coordinates/PC",
  component: PCDemo,
  argTypes: {},
};

const PenguinsTemplate = ({ ...args }) => ({
  Component: PCDemo,
  props: args,
});

const SampleTemplate = ({ ...args }) => ({
  Component: PCDemo,
  props: args,
});

const defaultArgs = {
  drawConfiguration: {
    axesSpacing: 120,
    axisHeight: 200,
    axisLabelConfiguration: {
      show: true,
      textAnchor: "middle",
      axisLabelPosition: TopBottomPosition.ABOVE,
      margin: 5,
    },
    axisAnnotationConfiguration: {
      show: true,
      textAnchor: "middle",
      margin: 5,
    },
    margin: { left: 20, right: 20, top: 20, bottom: 20 },
    fontSize: 12,
    variation: Variation.DEFAULT,
    concept: Concept.INFORMATION_REMOVAL,
    missingValuesAxisSpacing: 35,
  },
};

export const PenguinsDemo = PenguinsTemplate.bind({});
PenguinsDemo.args = {
  data: penguins,
  ...defaultArgs,
};

export const SampleDemo = SampleTemplate.bind({});
SampleDemo.args = {
  data: sample,
  ...defaultArgs,
};
