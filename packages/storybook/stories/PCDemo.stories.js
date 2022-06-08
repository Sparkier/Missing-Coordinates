import PCDemo from "./PCDemo.svelte";
import {
  TopBottomPosition,
  Variation,
  Concept,
  DrawingOrder,
} from "missing-coordinates";

import sample from "./datasets/sample.json";
import airlineSafetyComplete from "./datasets/airline-safety.json";
import badDriverComplete from "./datasets/bad-drivers.json";
import irisComplete from "./datasets/iris.json";
import mpgComplete from "./datasets/mpg.json";
import penguinsComplete from "./datasets/penguins.json";

export default {
  title: "missing-coordinates/PC",
  component: PCDemo,
  argTypes: {},
};

const SampleTemplate = ({ ...args }) => ({
  Component: PCDemo,
  props: args,
});

const AirlineCompleteTemplate = ({ ...args }) => ({
  Component: PCDemo,
  props: args,
});

const DriverCompleteTemplate = ({ ...args }) => ({
  Component: PCDemo,
  props: args,
});

const IrisCompleteTemplate = ({ ...args }) => ({
  Component: PCDemo,
  props: args,
});

const MpgCompleteTemplate = ({ ...args }) => ({
  Component: PCDemo,
  props: args,
});

const PenguinCompleteTemplate = ({ ...args }) => ({
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
    drawingOrder: DrawingOrder.RANDOM,
    lineOpacity: 0.5,
    coloring: {
      coloringAxis: "species",
      ordinalColorTheme: "Category10",
      sequentialColorTheme: "cool",
    },
    missingValuesConfiguration: {
      missingValuesAxisSpacing: 35,
      imputationNeighbors: 2,
      glyphRadius: 4,
      missingValueOpacity: 0.1,
      strokeDasharray: "5 5",
    },
  },
};

export const Sample = SampleTemplate.bind({});
Sample.args = {
  data: sample,
  ...defaultArgs,
};

export const AirlineComplete = AirlineCompleteTemplate.bind({});
AirlineComplete.args = {
  data: airlineSafetyComplete,
  ...defaultArgs,
};

export const DriverComplete = DriverCompleteTemplate.bind({});
DriverComplete.args = {
  data: badDriverComplete,
  ...defaultArgs,
};

export const IrisComplete = IrisCompleteTemplate.bind({});
IrisComplete.args = {
  data: irisComplete,
  ...defaultArgs,
};

export const MpgComplete = MpgCompleteTemplate.bind({});
MpgComplete.args = {
  data: mpgComplete,
  ...defaultArgs,
};

export const PenguinComplete = PenguinCompleteTemplate.bind({});
PenguinComplete.args = {
  data: penguinsComplete,
  ...defaultArgs,
};
