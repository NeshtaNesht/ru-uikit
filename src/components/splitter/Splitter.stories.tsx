import React from "react";
import Splitter from "./Splitter";
import { Meta, StoryObj } from "@storybook/react";
import Flexbox from "../flexbox/Flexbox";

const { Panel } = Splitter;

export default {
  title: "Splitter",
  component: Splitter,
} as Meta<typeof Splitter>;

type Story = StoryObj<typeof Splitter>;
export const Default: Story = {
  render: () => (
    <div style={{ width: "100%", height: "350px" }}>
      <Splitter layout="horizontal" style={{ height: "100%" }}>
        <Panel>
          <Flexbox width="100%" height="100%" justify="center" align="center">
            Panel 1
          </Flexbox>
        </Panel>
        <Panel>
          <Flexbox width="100%" height="100%" justify="center" align="center">
            Panel 2
          </Flexbox>
        </Panel>
      </Splitter>
    </div>
  ),
};
