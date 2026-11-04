import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Bubble, BubbleContent } from "@coss-app/ui/components/bubble";
import { Button } from "@coss-app/ui/components/button";
import { Message, MessageContent, MessageFooter, MessageHeader } from "@coss-app/ui/components/message";
import {
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerProvider,
  MessageScrollerViewport,
} from "@coss-app/ui/components/message-scroller";

type ChatMessage = { id: string; from: "customer" | "agent"; text: string; time: string };

const customerLines = [
  "您好，我家的冷氣從昨天開始一直滴水。",
  "型號是 RAC-50JP，去年 8 月安裝的。",
  "請問還在保固期內嗎？",
  "好的，那最快什麼時候可以來看？",
  "下午我都在家，謝謝。",
];
const agentLines = [
  "您好，很抱歉造成您的不便，我是客服王小明。",
  "已查到您的安裝紀錄，目前仍在 3 年保固期內，維修免費。",
  "最快可安排明天（11/5）下午 2–5 點到府檢修。",
  "已為您預約，師傅出發前會先致電給您。",
  "不客氣，祝您有美好的一天！",
];

function seed(): ChatMessage[] {
  const list: ChatMessage[] = [];
  for (let round = 0; round < 3; round++) {
    customerLines.forEach((text, i) => {
      list.push({ id: `c-${round}-${i}`, from: "customer", text, time: `1${round}:${String(i * 4).padStart(2, "0")}` });
      list.push({
        id: `a-${round}-${i}`,
        from: "agent",
        text: agentLines[i]!,
        time: `1${round}:${String(i * 4 + 2).padStart(2, "0")}`,
      });
    });
  }
  return list;
}

function ChatItem({ message }: { message: ChatMessage }) {
  const align = message.from === "agent" ? "end" : "start";
  return (
    <Message align={align}>
      <MessageContent>
        <MessageHeader>{message.from === "agent" ? "王小明 · 客服" : "陳先生"}</MessageHeader>
        <Bubble align={align} variant={message.from === "agent" ? "default" : "secondary"}>
          <BubbleContent>{message.text}</BubbleContent>
        </Bubble>
        <MessageFooter>{message.time}</MessageFooter>
      </MessageContent>
    </Message>
  );
}

function ChatDemo({ autoScroll = true }: { autoScroll?: boolean }) {
  const [messages, setMessages] = React.useState<ChatMessage[]>(seed);
  const add = (from: ChatMessage["from"]) =>
    setMessages((prev) => [
      ...prev,
      {
        id: `new-${prev.length}`,
        from,
        text: from === "agent" ? "已收到，正在為您確認中，請稍候。" : "請問師傅大概幾點會到？",
        time: "15:00",
      },
    ]);

  return (
    <div className="flex max-w-xl flex-col gap-3">
      <div className="h-[420px] rounded-xl border bg-card">
        <MessageScrollerProvider autoScroll={autoScroll}>
          <MessageScroller>
            <MessageScrollerViewport aria-label="客服對話紀錄">
              <MessageScrollerContent className="p-4">
                {messages.map((m) => (
                  <MessageScrollerItem key={m.id} messageId={m.id} scrollAnchor={m.from === "customer"}>
                    <ChatItem message={m} />
                  </MessageScrollerItem>
                ))}
              </MessageScrollerContent>
            </MessageScrollerViewport>
            <MessageScrollerButton direction="start" />
            <MessageScrollerButton />
          </MessageScroller>
        </MessageScrollerProvider>
      </div>
      <div className="flex gap-2">
        <Button variant="secondary" size="sm" onClick={() => add("customer")}>
          新增客戶訊息
        </Button>
        <Button size="sm" onClick={() => add("agent")}>
          新增客服回覆
        </Button>
      </div>
    </div>
  );
}

const meta = {
  title: "Messaging/MessageScroller",
  component: MessageScroller,
} satisfies Meta<typeof MessageScroller>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <ChatDemo />,
};

export const WithoutAutoScroll: Story = {
  name: "不自動捲到底",
  render: () => <ChatDemo autoScroll={false} />,
};

export const Empty: Story = {
  render: () => (
    <div className="h-64 max-w-xl rounded-xl border bg-card">
      <MessageScrollerProvider>
        <MessageScroller>
          <MessageScrollerViewport aria-label="客服對話紀錄">
            <MessageScrollerContent className="items-center justify-center p-4 text-sm text-muted-foreground">
              尚無對話，客戶傳訊後會顯示在這裡。
            </MessageScrollerContent>
          </MessageScrollerViewport>
        </MessageScroller>
      </MessageScrollerProvider>
    </div>
  ),
};
