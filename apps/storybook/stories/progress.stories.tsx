import type { Meta, StoryObj } from "@storybook/react-vite";
import { Progress, ProgressLabel, ProgressValue } from "@coss-app/ui/components/progress";

const meta = {
  title: "Feedback/Progress",
  component: Progress,
  argTypes: {
    value: { control: { type: "range", min: 0, max: 100, step: 1 } },
  },
  args: {
    value: 60,
  },
  render: (args) => (
    <Progress {...args} className="max-w-md">
      <ProgressLabel>本月工單完成率</ProgressLabel>
      <ProgressValue />
    </Progress>
  ),
} satisfies Meta<typeof Progress>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Values: Story = {
  render: () => (
    <div className="flex max-w-md flex-col gap-6">
      {[0, 25, 60, 100].map((value) => (
        <Progress key={value} value={value}>
          <ProgressLabel>附件上傳</ProgressLabel>
          <ProgressValue />
        </Progress>
      ))}
    </div>
  ),
};

export const BarOnly: Story = {
  render: () => (
    <div className="flex max-w-md flex-col gap-4">
      <Progress value={33} aria-label="處理進度" />
      <Progress value={80} aria-label="處理進度" />
    </div>
  ),
};

export const Indeterminate: Story = {
  render: () => (
    <Progress value={null} className="max-w-md">
      <ProgressLabel>正在同步客戶資料…</ProgressLabel>
    </Progress>
  ),
};
