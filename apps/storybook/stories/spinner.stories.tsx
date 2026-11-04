import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "@coss-app/ui/components/button";
import { Spinner } from "@coss-app/ui/components/spinner";

const meta = {
  title: "Feedback/Spinner",
  component: Spinner,
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Spinner className="size-3" />
      <Spinner />
      <Spinner className="size-6" />
      <Spinner className="size-8" />
    </div>
  ),
};

export const Colors: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Spinner className="size-6 text-primary" />
      <Spinner className="size-6 text-info" />
      <Spinner className="size-6 text-warning" />
      <Spinner className="size-6 text-destructive" />
      <Spinner className="size-6 text-muted-foreground" />
    </div>
  ),
};

export const InContext: Story = {
  render: () => (
    <div className="flex flex-col items-start gap-4">
      <Button disabled>
        <Spinner data-icon="inline-start" />
        寄送中
      </Button>
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Spinner />
        正在載入工單紀錄…
      </div>
    </div>
  ),
};
