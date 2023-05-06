import React from "react";
import Splitter from "./Splitter";
import { Meta, StoryObj } from "@storybook/react";
import Flexbox from "../flexbox/Flexbox";

export default {
  title: "Splitter",
  component: Splitter,
} as Meta<typeof Splitter>;

type Story = StoryObj<typeof Splitter>;
export const Default: Story = {
  render: () => (
    <Flexbox layout="vertical" gap={12}>
      privet
    </Flexbox>
  ),
};
