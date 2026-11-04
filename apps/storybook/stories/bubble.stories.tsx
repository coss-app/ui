import type { Meta, StoryObj } from "@storybook/react-vite";
import { Bubble, BubbleContent, BubbleGroup, BubbleReactions } from "@coss-app/ui/components/bubble";

const variants = ["default", "secondary", "muted", "tinted", "outline", "ghost", "destructive"] as const;

const meta = {
  title: "Messaging/Bubble",
  component: Bubble,
  argTypes: {
    variant: { control: "select", options: variants },
    align: { control: "inline-radio", options: ["start", "end"] },
  },
  args: {
    variant: "default",
    align: "start",
  },
  render: (args) => (
    <div className="flex max-w-xl flex-col">
      <Bubble {...args}>
        <BubbleContent>您好，請問工單 #1024 目前處理到哪個階段了？</BubbleContent>
      </Bubble>
    </div>
  ),
} satisfies Meta<typeof Bubble>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Variants: Story = {
  render: () => (
    <div className="flex max-w-xl flex-col gap-3">
      {variants.map((variant) => (
        <Bubble key={variant} variant={variant}>
          <BubbleContent>
            {variant}：已收到您的報修，師傅預計明天下午到府。
          </BubbleContent>
        </Bubble>
      ))}
    </div>
  ),
};

export const Alignment: Story = {
  render: () => (
    <div className="flex max-w-xl flex-col gap-3">
      <Bubble variant="secondary">
        <BubbleContent>我的發票還沒收到。</BubbleContent>
      </Bubble>
      <Bubble align="end">
        <BubbleContent>已為您重新寄送電子發票，請查收 Email。</BubbleContent>
      </Bubble>
    </div>
  ),
};

export const Group: Story = {
  render: () => (
    <div className="flex max-w-xl flex-col gap-4">
      <BubbleGroup>
        <Bubble variant="secondary">
          <BubbleContent>你好</BubbleContent>
        </Bubble>
        <Bubble variant="secondary">
          <BubbleContent>我想更改收件地址</BubbleContent>
        </Bubble>
        <Bubble variant="secondary">
          <BubbleContent>新地址是台北市信義區松仁路 100 號 12 樓，麻煩幫我更新，謝謝！</BubbleContent>
        </Bubble>
      </BubbleGroup>
      <BubbleGroup>
        <Bubble align="end">
          <BubbleContent>好的，已幫您更新。</BubbleContent>
        </Bubble>
        <Bubble align="end">
          <BubbleContent>還有其他需要協助的地方嗎？</BubbleContent>
        </Bubble>
      </BubbleGroup>
    </div>
  ),
};

export const WithReactions: Story = {
  render: () => (
    <div className="flex max-w-xl flex-col gap-8 py-4">
      <Bubble variant="secondary">
        <BubbleContent>問題已經解決了，謝謝你們！</BubbleContent>
        <BubbleReactions>👍 2</BubbleReactions>
      </Bubble>
      <Bubble align="end">
        <BubbleContent>不客氣，有任何問題歡迎再聯繫我們。</BubbleContent>
        <BubbleReactions side="top" align="start">
          ❤️
        </BubbleReactions>
      </Bubble>
    </div>
  ),
};

export const Interactive: Story = {
  name: "可點擊（render 為 button／a）",
  render: () => (
    <div className="flex max-w-xl flex-col gap-3">
      <Bubble variant="outline">
        <BubbleContent render={<button type="button" />}>查詢訂單進度</BubbleContent>
      </Bubble>
      <Bubble variant="outline">
        <BubbleContent render={<a href="#faq" />}>常見問題：如何申請退貨？</BubbleContent>
      </Bubble>
      <Bubble variant="destructive">
        <BubbleContent>訊息傳送失敗，點擊重試</BubbleContent>
      </Bubble>
    </div>
  ),
};
