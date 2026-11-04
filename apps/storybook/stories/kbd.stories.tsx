import type { Meta, StoryObj } from "@storybook/react-vite";
import { CommandIcon, CornerDownLeftIcon } from "lucide-react";
import { Kbd, KbdGroup } from "@coss-app/ui/components/kbd";
import { Button } from "@coss-app/ui/components/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@coss-app/ui/components/tooltip";

const meta = {
  title: "Data Display/Kbd",
  component: Kbd,
  args: { children: "Esc" },
} satisfies Meta<typeof Kbd>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Group: Story = {
  render: () => (
    <div className="flex flex-col gap-3 text-sm">
      <p className="flex items-center gap-2">
        搜尋工單：
        <KbdGroup>
          <Kbd>
            <CommandIcon />
          </Kbd>
          <Kbd>K</Kbd>
        </KbdGroup>
      </p>
      <p className="flex items-center gap-2">
        送出回覆：
        <KbdGroup>
          <Kbd>Ctrl</Kbd>
          <span>+</span>
          <Kbd>
            <CornerDownLeftIcon />
          </Kbd>
        </KbdGroup>
      </p>
      <p className="flex items-center gap-2">
        切換工單：<Kbd>↑</Kbd>
        <Kbd>↓</Kbd>
      </p>
    </div>
  ),
};

export const InTooltip: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger render={<Button variant="outline" />}>儲存草稿</TooltipTrigger>
      <TooltipContent>
        儲存草稿
        <KbdGroup>
          <Kbd>Ctrl</Kbd>
          <Kbd>S</Kbd>
        </KbdGroup>
      </TooltipContent>
    </Tooltip>
  ),
};
