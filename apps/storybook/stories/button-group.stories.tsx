import type { Meta, StoryObj } from "@storybook/react-vite";
import { ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon, SearchIcon } from "lucide-react";
import {
  ButtonGroup,
  ButtonGroupSeparator,
  ButtonGroupText,
} from "@coss-app/ui/components/button-group";
import { Button } from "@coss-app/ui/components/button";
import { Input } from "@coss-app/ui/components/input";

const meta = {
  title: "Inputs/ButtonGroup",
  component: ButtonGroup,
  argTypes: {
    orientation: { control: "select", options: ["horizontal", "vertical"] },
  },
  args: { orientation: "horizontal" },
  render: (args) => (
    <ButtonGroup {...args}>
      <Button variant="neutral">待受理</Button>
      <Button variant="neutral">處理中</Button>
      <Button variant="neutral">已結案</Button>
    </ButtonGroup>
  ),
} satisfies Meta<typeof ButtonGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Orientations: Story = {
  render: () => (
    <div className="flex flex-wrap items-start gap-8">
      <ButtonGroup>
        <Button variant="neutral">今天</Button>
        <Button variant="neutral">本週</Button>
        <Button variant="neutral">本月</Button>
      </ButtonGroup>
      <ButtonGroup orientation="vertical">
        <Button variant="neutral">指派給我</Button>
        <Button variant="neutral">轉交主管</Button>
        <Button variant="neutral">標記為垃圾</Button>
      </ButtonGroup>
    </div>
  ),
};

export const WithSeparatorAndText: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <ButtonGroup>
        <Button variant="secondary">回覆客戶</Button>
        <ButtonGroupSeparator />
        <Button variant="secondary" size="icon" aria-label="更多回覆選項">
          <ChevronDownIcon />
        </Button>
      </ButtonGroup>
      <ButtonGroup>
        <Button variant="neutral" size="icon" aria-label="上一張工單">
          <ChevronLeftIcon />
        </Button>
        <ButtonGroupText>第 3 / 12 張</ButtonGroupText>
        <Button variant="neutral" size="icon" aria-label="下一張工單">
          <ChevronRightIcon />
        </Button>
      </ButtonGroup>
      <ButtonGroup className="w-full max-w-md">
        <ButtonGroupText>工單編號</ButtonGroupText>
        <Input placeholder="例如 #1024" />
        <Button aria-label="搜尋">
          <SearchIcon />
        </Button>
      </ButtonGroup>
    </div>
  ),
};

export const Nested: Story = {
  render: () => (
    <ButtonGroup>
      <ButtonGroup>
        <Button variant="neutral">全部</Button>
        <Button variant="neutral">未讀</Button>
      </ButtonGroup>
      <ButtonGroup>
        <Button variant="neutral" disabled>
          批次結案
        </Button>
      </ButtonGroup>
    </ButtonGroup>
  ),
};
