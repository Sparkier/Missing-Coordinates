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
      gradientFalloff: 0.25,
    },
  },
};

export const Sample = SampleTemplate.bind({});
Sample.args = {
  data: sample,
  ...{
    drawConfiguration: {
      ...defaultArgs.drawConfiguration,
      coloring: {
        ...defaultArgs.drawConfiguration.coloring,
        coloringAxis: "dim 1",
      },
    },
  },
};

export const AirlineComplete = AirlineCompleteTemplate.bind({});
AirlineComplete.args = {
  data: airlineSafetyComplete,
  ...{
    drawConfiguration: {
      ...defaultArgs.drawConfiguration,
      axesSpacing: 150,
      axisHeight: 300,
      margin: { ...defaultArgs.drawConfiguration.margin, left: 80, right: 80 },
      coloring: {
        ...defaultArgs.drawConfiguration.coloring,
        coloringAxis: "fatalities_00_14",
      },
    },
  },
};

export const DriverComplete = DriverCompleteTemplate.bind({});
DriverComplete.args = {
  data: badDriverComplete,
  ...{
    drawConfiguration: {
      ...defaultArgs.drawConfiguration,
      axesSpacing: 150,
      axisHeight: 300,
      margin: { ...defaultArgs.drawConfiguration.margin, left: 50, right: 50 },
      coloring: {
        ...defaultArgs.drawConfiguration.coloring,
        coloringAxis: "Alc. Impaired",
      },
    },
  },
};

export const IrisComplete = IrisCompleteTemplate.bind({});
IrisComplete.args = {
  data: irisComplete,
  ...{
    drawConfiguration: {
      ...defaultArgs.drawConfiguration,
      axesSpacing: 150,
      axisHeight: 200,
      margin: { ...defaultArgs.drawConfiguration.margin, left: 50, right: 50 },
    },
  },
};

export const MpgComplete = MpgCompleteTemplate.bind({});
MpgComplete.args = {
  data: mpgComplete,
  ...{
    drawConfiguration: {
      ...defaultArgs.drawConfiguration,
      axesSpacing: 150,
      axisHeight: 300,
      coloring: {
        ...defaultArgs.drawConfiguration.coloring,
        coloringAxis: "origin",
      },
    },
  },
};

export const PenguinComplete = PenguinCompleteTemplate.bind({});
PenguinComplete.args = {
  data: penguinsComplete,
  ...{
    drawConfiguration: {
      ...defaultArgs.drawConfiguration,
      axesSpacing: 150,
      axisHeight: 350,
      margin: { ...defaultArgs.drawConfiguration.margin, left: 30, right: 30 },
    },
  },
};
