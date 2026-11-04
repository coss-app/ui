import type { Meta, StoryObj } from "@storybook/react-vite";
import { CalendarIcon, InfoIcon, UserPlusIcon } from "lucide-react";
import { Marker, MarkerContent, MarkerIcon } from "@coss-app/ui/components/marker";

const variants = ["default", "separator", "border"] as const;

const meta = {
  title: "Data Display/Marker",
  component: Marker,
  argTypes: {
    variant: { control: "select", options: variants },
  },
  args: { variant: "default" },
  render: (args) => (
    <div className="max-w-md">
      <Marker {...args}>
        <MarkerIcon>
          <UserPlusIcon />
        </MarkerIcon>
        <MarkerContent>林雅婷 已受理此工單</MarkerContent>
      </Marker>
    </div>
  ),
} satisfies Meta<typeof Marker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Variants: Story = {
  render: () => (
    <div className="flex max-w-md flex-col gap-6">
      <Marker>
        <MarkerIcon>
          <InfoIcon />
        </MarkerIcon>
        <MarkerContent>客戶已離開對話</MarkerContent>
      </Marker>
      <Marker variant="separator">
        <MarkerContent>2026 年 11 月 4 日</MarkerContent>
      </Marker>
      <Marker variant="separator">
        <MarkerIcon>
          <CalendarIcon />
        </MarkerIcon>
        <MarkerContent>今天</MarkerContent>
      </Marker>
      <Marker variant="border">
        <MarkerContent>以下為新訊息</MarkerContent>
      </Marker>
    </div>
  ),
};

export const WithLink: Story = {
  render: () => (
    <div className="max-w-md">
      <Marker>
        <MarkerIcon>
          <InfoIcon />
        </MarkerIcon>
        <MarkerContent>
          此工單已合併至 <a href="#ticket-1020">#1020</a>
        </MarkerContent>
      </Marker>
    </div>
  ),
};
