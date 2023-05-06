import React from "react";
import Button from "./Button";
import { Meta, StoryObj } from "@storybook/react";
import Flexbox from "../flexbox/Flexbox";

export default {
  title: "Button",
  component: Button,
  args: {
    type: "default",
    loading: false,
  },
  argTypes: {
    type: {
      options: ["default", "primary", "ghost", "dashed", "link", "text"],
      control: {
        type: "radio",
      },
    },
  },
} as Meta<typeof Button>;

type Story = StoryObj<typeof Button>;
export const Default: Story = {
  render: (args) => (
    <Flexbox layout="vertical" gap={12}>
      <Button size="small" {...args}>
        Small
      </Button>
      <Button size="middle" {...args}>
        Middle
      </Button>
      <Button size="large" {...args}>
        Large
      </Button>
    </Flexbox>
  ),
};
