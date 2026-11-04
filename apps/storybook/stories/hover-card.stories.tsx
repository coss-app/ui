import type { Meta, StoryObj } from "@storybook/react-vite";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@coss-app/ui/components/hover-card";

type Side = "top" | "right" | "bottom" | "left";
type Align = "start" | "center" | "end";
const sides: Side[] = ["top", "right", "bottom", "left"];

function CustomerHoverCard({
  side = "bottom",
  align = "center",
  defaultOpen,
  label = "陳美玲",
}: {
  side?: Side;
  align?: Align;
  defaultOpen?: boolean;
  label?: string;
}) {
  return (
    <HoverCard defaultOpen={defaultOpen}>
      <HoverCardTrigger href="#customer-88" className="font-semibold text-info underline-offset-4 hover:underline">
        {label}
      </HoverCardTrigger>
      <HoverCardContent side={side} align={align}>
        <div className="grid gap-1.5">
          <p className="font-semibold text-heading">陳美玲</p>
          <p className="text-muted-foreground">VIP 會員・客戶編號 C-0088</p>
          <p className="text-xs text-placeholder">累計工單 12 筆，最近一次聯繫：2026/11/03</p>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}

const meta = {
  title: "Overlays/HoverCard",
  component: CustomerHoverCard,
  argTypes: {
    side: { control: "select", options: sides },
    align: { control: "select", options: ["start", "center", "end"] },
  },
  args: { side: "bottom", align: "center" },
} satisfies Meta<typeof CustomerHoverCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => (
    <p className="text-sm">
      工單提出人：<CustomerHoverCard {...args} />
    </p>
  ),
};

export const Open: Story = {
  args: { defaultOpen: true },
};

export const Sides: Story = {
  render: () => (
    <div className="flex flex-wrap items-center justify-center gap-8 py-40">
      {sides.map((side) => (
        <CustomerHoverCard key={side} side={side} label={`客戶（${side}）`} />
      ))}
    </div>
  ),
};
