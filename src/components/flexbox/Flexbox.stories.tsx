import React from "react";
import { StoryObj } from "@storybook/react";
import Flexbox from "./Flexbox";

export default {
  title: "Flexbox",
  component: Flexbox,
};

type Story = StoryObj<typeof Flexbox>;

export const Default: Story = {
  render: (args) => (
    <Flexbox width="100%" height="100%" {...args}>
      <Flexbox>Flexbox 1</Flexbox>
      <Flexbox>Flexbox 2</Flexbox>
    </Flexbox>
  ),
  args: {
    justify: "space-between",
  },
};
