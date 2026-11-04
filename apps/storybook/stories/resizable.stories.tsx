import type { Meta, StoryObj } from "@storybook/react-vite";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@coss-app/ui/components/resizable";

const meta = {
  title: "Layout/Resizable",
  component: ResizablePanelGroup,
  argTypes: {
    orientation: { control: "inline-radio", options: ["horizontal", "vertical"] },
  },
  args: { orientation: "horizontal" },
} satisfies Meta<typeof ResizablePanelGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Horizontal: Story = {
  render: (args) => (
    <ResizablePanelGroup {...args} className="max-w-2xl rounded-lg border" style={{ height: 320 }}>
      <ResizablePanel defaultSize="30%" minSize="20%">
        <div className="flex h-full items-center justify-center p-6 text-sm">工單列表</div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize="70%">
        <div className="flex h-full items-center justify-center p-6 text-sm">工單 #1024 對話內容</div>
      </ResizablePanel>
    </ResizablePanelGroup>
  ),
};

export const WithHandle: Story = {
  render: () => (
    <ResizablePanelGroup orientation="horizontal" className="max-w-2xl rounded-lg border" style={{ height: 320 }}>
      <ResizablePanel defaultSize="25%">
        <div className="flex h-full items-center justify-center p-6 text-sm">收件匣</div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize="50%">
        <div className="flex h-full items-center justify-center p-6 text-sm">對話</div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize="25%">
        <div className="flex h-full items-center justify-center p-6 text-sm">客戶資料</div>
      </ResizablePanel>
    </ResizablePanelGroup>
  ),
};

export const Vertical: Story = {
  render: () => (
    <ResizablePanelGroup orientation="vertical" className="max-w-md rounded-lg border" style={{ height: 360 }}>
      <ResizablePanel defaultSize="40%">
        <div className="flex h-full items-center justify-center p-6 text-sm">訊息紀錄</div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize="60%">
        <div className="flex h-full items-center justify-center p-6 text-sm">回覆編輯區</div>
      </ResizablePanel>
    </ResizablePanelGroup>
  ),
};

export const Nested: Story = {
  render: () => (
    <ResizablePanelGroup orientation="horizontal" className="max-w-2xl rounded-lg border" style={{ height: 360 }}>
      <ResizablePanel defaultSize="40%">
        <div className="flex h-full items-center justify-center p-6 text-sm">工單列表</div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize="60%">
        <ResizablePanelGroup orientation="vertical">
          <ResizablePanel defaultSize="50%">
            <div className="flex h-full items-center justify-center p-6 text-sm">對話</div>
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel defaultSize="50%">
            <div className="flex h-full items-center justify-center p-6 text-sm">內部備註</div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel>
    </ResizablePanelGroup>
  ),
};
