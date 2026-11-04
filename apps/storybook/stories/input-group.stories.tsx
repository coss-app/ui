import type { Meta, StoryObj } from "@storybook/react-vite";
import { AtSignIcon, CopyIcon, InfoIcon, SearchIcon, SendIcon, PaperclipIcon } from "lucide-react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "@coss-app/ui/components/input-group";
import { Kbd } from "@coss-app/ui/components/kbd";
import { Spinner } from "@coss-app/ui/components/spinner";

const meta = {
  title: "Inputs/InputGroup",
  component: InputGroupAddon,
  argTypes: {
    align: { control: "select", options: ["inline-start", "inline-end", "block-start", "block-end"] },
  },
  args: { align: "inline-start" },
  render: (args) => (
    <InputGroup className="max-w-sm">
      <InputGroupInput placeholder="搜尋工單、客戶或電話" />
      <InputGroupAddon {...args}>
        <SearchIcon />
      </InputGroupAddon>
    </InputGroup>
  ),
  decorators: [(Story) => <div className="max-w-md"><Story /></div>],
} satisfies Meta<typeof InputGroupAddon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Addons: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <InputGroup>
        <InputGroupInput placeholder="搜尋工單" />
        <InputGroupAddon>
          <SearchIcon />
        </InputGroupAddon>
        <InputGroupAddon align="inline-end">
          <Kbd>⌘K</Kbd>
        </InputGroupAddon>
      </InputGroup>
      <InputGroup>
        <InputGroupAddon>
          <InputGroupText>https://</InputGroupText>
        </InputGroupAddon>
        <InputGroupInput placeholder="support.example.com" />
        <InputGroupAddon align="inline-end">
          <InputGroupText>.tw</InputGroupText>
        </InputGroupAddon>
      </InputGroup>
      <InputGroup>
        <InputGroupAddon>
          <AtSignIcon />
        </InputGroupAddon>
        <InputGroupInput placeholder="客戶電子郵件" />
        <InputGroupAddon align="inline-end">
          <InfoIcon />
        </InputGroupAddon>
      </InputGroup>
    </div>
  ),
};

export const Buttons: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <InputGroup>
        <InputGroupInput readOnly defaultValue="https://support.example.com/t/1024" />
        <InputGroupAddon align="inline-end">
          <InputGroupButton size="icon-xs" aria-label="複製連結">
            <CopyIcon />
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
      <InputGroup>
        <InputGroupInput placeholder="輸入優惠代碼" />
        <InputGroupAddon align="inline-end">
          <InputGroupButton size="xs" variant="secondary">
            套用
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
      <InputGroup>
        <InputGroupInput placeholder="搜尋中…" defaultValue="退款" />
        <InputGroupAddon align="inline-end">
          <Spinner />
        </InputGroupAddon>
      </InputGroup>
    </div>
  ),
};

export const WithTextarea: Story = {
  render: () => (
    <InputGroup>
      <InputGroupTextarea placeholder="輸入回覆內容，Enter 送出" />
      <InputGroupAddon align="block-end" className="border-t">
        <InputGroupButton size="icon-xs" aria-label="附加檔案">
          <PaperclipIcon />
        </InputGroupButton>
        <InputGroupText className="ml-auto">還可輸入 500 字</InputGroupText>
        <InputGroupButton size="icon-sm" variant="default" aria-label="送出">
          <SendIcon />
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  ),
};

export const BlockStart: Story = {
  render: () => (
    <InputGroup>
      <InputGroupAddon align="block-start" className="border-b">
        <InputGroupText className="font-semibold text-foreground">工單標題</InputGroupText>
      </InputGroupAddon>
      <InputGroupInput placeholder="例如：無法登入會員中心" />
    </InputGroup>
  ),
};

export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <InputGroup>
        <InputGroupAddon>
          <AtSignIcon />
        </InputGroupAddon>
        <InputGroupInput aria-invalid defaultValue="service@" />
      </InputGroup>
      <InputGroup data-disabled="true">
        <InputGroupAddon>
          <SearchIcon />
        </InputGroupAddon>
        <InputGroupInput disabled placeholder="搜尋已停用" />
      </InputGroup>
    </div>
  ),
};
