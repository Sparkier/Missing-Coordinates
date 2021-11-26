import PCDemo from "./PCDemo.svelte"

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
