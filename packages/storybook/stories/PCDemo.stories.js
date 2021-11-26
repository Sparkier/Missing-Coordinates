import PCDemo from "./PCDemo.svelte";
import { TopBottomPosition } from "missing-coordinates";

export default {
  title: "missing-coordinates/PC",
  component: PCDemo,
  argTypes: {},
};

const Template = ({ ...args }) => ({
  Component: PCDemo,
  props: args,
});

export const Demo = Template.bind({});
Demo.args = {
  drawConfiguration: {
    axesSpacing: 100,
    axisHeight: 100,
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
  },
};
