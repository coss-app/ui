import type { Meta, StoryObj } from "@storybook/react-vite";
import { Skeleton } from "@coss-app/ui/components/skeleton";

const meta = {
  title: "Feedback/Skeleton",
  component: Skeleton,
  args: {
    className: "h-4 w-48",
  },
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Shapes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Skeleton className="size-10 rounded-full" />
      <Skeleton className="h-10 w-28 rounded-full" />
      <Skeleton className="h-10 w-48 rounded-lg" />
      <Skeleton className="h-4 w-32" />
    </div>
  ),
};

export const TicketCard: Story = {
  render: () => (
    <div className="flex max-w-md flex-col gap-4 rounded-xl border bg-card p-4">
      <div className="flex items-center gap-3">
        <Skeleton className="size-10 rounded-full" />
        <div className="flex flex-1 flex-col gap-2">
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-3 w-1/3" />
        </div>
      </div>
      <Skeleton className="h-3 w-full" />
      <Skeleton className="h-3 w-5/6" />
      <Skeleton className="h-3 w-2/3" />
    </div>
  ),
};

export const TableRows: Story = {
  render: () => (
    <div className="flex max-w-2xl flex-col gap-3">
      {Array.from({ length: 5 }, (_, i) => (
        <div key={i} className="flex items-center gap-4">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 flex-1" />
          <Skeleton className="h-5 w-14 rounded-full" />
          <Skeleton className="h-4 w-20" />
        </div>
      ))}
    </div>
  ),
};
