import type { Meta, StoryObj } from "@storybook/react-vite";
import { AspectRatio } from "@coss-app/ui/components/aspect-ratio";

const img =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="450"><defs><linearGradient id="g" x1="0" x2="1"><stop offset="0" stop-color="#0032b1"/><stop offset="1" stop-color="#07ce6f"/></linearGradient></defs><rect width="800" height="450" fill="url(#g)"/><text x="400" y="240" font-family="sans-serif" font-size="40" fill="#fff" text-anchor="middle">客戶上傳截圖</text></svg>`
  );

const meta = {
  title: "Data Display/AspectRatio",
  component: AspectRatio,
  argTypes: {
    ratio: { control: { type: "number", step: 0.1 } },
  },
  args: { ratio: 16 / 9 },
  render: (args) => (
    <div className="w-full max-w-md">
      <AspectRatio {...args} className="overflow-hidden rounded-lg bg-muted">
        <img src={img} alt="客戶上傳截圖" className="size-full object-cover" />
      </AspectRatio>
    </div>
  ),
} satisfies Meta<typeof AspectRatio>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Ratios: Story = {
  render: () => (
    <div className="grid max-w-3xl grid-cols-2 gap-4 md:grid-cols-4">
      {[
        { label: "16 / 9", ratio: 16 / 9 },
        { label: "4 / 3", ratio: 4 / 3 },
        { label: "1 / 1", ratio: 1 },
        { label: "9 / 16", ratio: 9 / 16 },
      ].map((r) => (
        <div key={r.label} className="flex flex-col gap-2">
          <AspectRatio ratio={r.ratio} className="overflow-hidden rounded-lg bg-muted">
            <img src={img} alt="" className="size-full object-cover" />
          </AspectRatio>
          <span className="text-xs text-muted-foreground">{r.label}</span>
        </div>
      ))}
    </div>
  ),
};
