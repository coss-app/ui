import type { Meta, StoryObj } from "@storybook/react-vite";
import { InboxIcon, SearchXIcon, PlusIcon } from "lucide-react";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@coss-app/ui/components/empty";
import { Button } from "@coss-app/ui/components/button";
import { Avatar, AvatarFallback, AvatarGroup } from "@coss-app/ui/components/avatar";

const meta = {
  title: "Data Display/Empty",
  component: Empty,
} satisfies Meta<typeof Empty>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <InboxIcon />
        </EmptyMedia>
        <EmptyTitle>目前沒有工單</EmptyTitle>
        <EmptyDescription>客戶送出的問題會出現在這裡。你也可以手動建立一張工單。</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button>
          <PlusIcon data-icon="inline-start" />
          建立工單
        </Button>
      </EmptyContent>
    </Empty>
  ),
};

export const MediaDefault: Story = {
  render: () => (
    <Empty className="border">
      <EmptyHeader>
        <EmptyMedia>
          <AvatarGroup>
            <Avatar size="lg">
              <AvatarFallback>雅</AvatarFallback>
            </Avatar>
            <Avatar size="lg">
              <AvatarFallback>建</AvatarFallback>
            </Avatar>
          </AvatarGroup>
        </EmptyMedia>
        <EmptyTitle>尚未指派客服人員</EmptyTitle>
        <EmptyDescription>
          邀請同事加入客服團隊，<a href="#invite">了解權限設定</a>。
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <div className="flex gap-2">
          <Button variant="outline">邀請同事</Button>
          <Button variant="ghost">稍後再說</Button>
        </div>
      </EmptyContent>
    </Empty>
  ),
};

export const NoSearchResult: Story = {
  render: () => (
    <Empty className="border">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <SearchXIcon />
        </EmptyMedia>
        <EmptyTitle>找不到符合「退款」的工單</EmptyTitle>
        <EmptyDescription>請嘗試其他關鍵字，或清除篩選條件。</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button variant="link">清除篩選</Button>
      </EmptyContent>
    </Empty>
  ),
};
