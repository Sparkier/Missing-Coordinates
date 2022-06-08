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

import { flatten, unflatten } from 'flat';

const delimiter = ' > ';

export default {
  title: "missing-coordinates/PC",
  component: PCDemo,
  argTypes: {
    "drawConfiguration > concept": {
      options: [0, 1, 2],
      control: { type: 'radio', labels: ["Default", "Axis", "Imputation"] },
    },
    "drawConfiguration > variation": {
      options: [0, 1, 2, 3, 4],
      control: { type: 'radio', labels: ["Default", "Opacity", "Gradient", "Dashed", "Glyph"] },
    },
    "drawConfiguration > coloring > sequentialColorTheme": {
      options: ['cool', 'warm'],
      control: { type: 'radio' },
    },
    "drawConfiguration > coloring > ordinalColorTheme": {
      options: ['Category10', 'Tableau10'],
      control: { type: 'radio' },
    },
    "drawConfiguration > lineOpacity": {
      control: { type: 'range', min: 0, max: 1, step: 0.01 },
    },
    "drawConfiguration > missingValuesConfiguration > missingValueOpacity": {
      control: { type: 'range', min: 0, max: 1, step: 0.01 },
    },
    "drawConfiguration > missingValuesConfiguration > gradientFalloff": {
      control: { type: 'range', min: 0, max: 1, step: 0.01 },
    },
    "drawConfiguration > axisAnnotationConfiguration > textAnchor": {
      options: ['start', 'middle', 'end'],
      control: { type: 'inline-radio' },
    },
    "drawConfiguration > axisLabelConfiguration > textAnchor": {
      options: ['start', 'middle', 'end'],
      control: { type: 'inline-radio' },
    },
    "data": {
      table: {
        disable: true,
      },
    }
  },
};

const SampleTemplate = ({ ...args }) => ({
  Component: PCDemo,
  props: unflatten(args, { delimiter }),
});

const AirlineCompleteTemplate = ({ ...args }) => ({
  Component: PCDemo,
  props: unflatten(args, { delimiter }),
});

const DriverCompleteTemplate = ({ ...args }) => ({
  Component: PCDemo,
  props: unflatten(args, { delimiter }),
});

const IrisCompleteTemplate = ({ ...args }) => ({
  Component: PCDemo,
  props: unflatten(args, { delimiter }),
});

const MpgCompleteTemplate = ({ ...args }) => ({
  Component: PCDemo,
  props: unflatten(args, { delimiter }),
});

const PenguinCompleteTemplate = ({ ...args }) => ({
  Component: PCDemo,
  props: unflatten(args, { delimiter }),
});

const defaultArgs = {
  drawConfiguration: {
    concept: Concept.INFORMATION_REMOVAL,
    variation: Variation.DEFAULT,
    axesSpacing: 120,
    axisHeight: 200,
    coloring: {
      coloringAxis: "species",
      ordinalColorTheme: "Category10",
      sequentialColorTheme: "cool",
    },
    lineOpacity: 0.5,
    fontSize: 12,
    drawingOrder: DrawingOrder.RANDOM,
    missingValuesConfiguration: {
      missingValuesAxisSpacing: 35,
      imputationNeighbors: 2,
      glyphRadius: 4,
      missingValueOpacity: 0.1,
      strokeDasharray: "5 5",
      gradientFalloff: 0.25,
    },
    axisAnnotationConfiguration: {
      show: true,
      textAnchor: "middle",
      margin: 5,
    },
    axisLabelConfiguration: {
      show: true,
      textAnchor: "middle",
      axisLabelPosition: TopBottomPosition.ABOVE,
      margin: 5,
    },
    margin: { left: 20, right: 20, top: 20, bottom: 20 },
  },
};

export const Sample = SampleTemplate.bind({});
Sample.args = {
  ...flatten({
    drawConfiguration: {
      ...defaultArgs.drawConfiguration,
      coloring: {
        ...defaultArgs.drawConfiguration.coloring,
        coloringAxis: "dim 1",
      },
    },
  }, { delimiter }),
  data: sample,
};

export const AirlineComplete = AirlineCompleteTemplate.bind({});
AirlineComplete.args = {
  ...flatten({
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
  }, { delimiter }),
  data: airlineSafetyComplete,
};

export const DriverComplete = DriverCompleteTemplate.bind({});
DriverComplete.args = {
  ...flatten({
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
  }, { delimiter }),
  data: badDriverComplete,
};

export const IrisComplete = IrisCompleteTemplate.bind({});
IrisComplete.args = {
  ...flatten({
    drawConfiguration: {
      ...defaultArgs.drawConfiguration,
      axesSpacing: 150,
      axisHeight: 200,
      margin: { ...defaultArgs.drawConfiguration.margin, left: 50, right: 50 },
    },
  }, { delimiter }),
  data: irisComplete,
};

export const MpgComplete = MpgCompleteTemplate.bind({});
MpgComplete.args = {
  ...flatten({
    drawConfiguration: {
      ...defaultArgs.drawConfiguration,
      axesSpacing: 150,
      axisHeight: 300,
      coloring: {
        ...defaultArgs.drawConfiguration.coloring,
        coloringAxis: "origin",
      },
    },
  }, { delimiter }),
  data: mpgComplete,
};

export const PenguinComplete = PenguinCompleteTemplate.bind({});
PenguinComplete.args = {
  ...flatten({
    drawConfiguration: {
      ...defaultArgs.drawConfiguration,
      axesSpacing: 150,
      axisHeight: 350,
      margin: { ...defaultArgs.drawConfiguration.margin, left: 30, right: 30 },
    },
  }, { delimiter }),
  data: penguinsComplete,
};
