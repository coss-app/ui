import type { Meta, StoryObj } from "@storybook/react-vite";
import { CheckIcon, CircleDashedIcon, LoaderIcon, SearchIcon, XCircleIcon } from "lucide-react";
import {
  Trace,
  TraceCollapsible,
  TraceCollapsibleContent,
  TraceCollapsibleTrigger,
  TraceDescription,
  TraceIcon,
  TraceLine,
  TraceTitle,
} from "@coss-app/ui/components/trace";

const meta = {
  title: "Data Display/Trace",
  component: Trace,
} satisfies Meta<typeof Trace>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Statuses: Story = {
  render: () => (
    <Trace className="max-w-md">
      <TraceLine>
        <TraceIcon>
          <CheckIcon />
        </TraceIcon>
        <TraceTitle>查詢訂單 #A20261104</TraceTitle>
        <TraceDescription>0.8 秒</TraceDescription>
      </TraceLine>
      <TraceLine status="running">
        <TraceIcon>
          <LoaderIcon className="animate-spin" />
        </TraceIcon>
        <TraceTitle>比對物流狀態中…</TraceTitle>
      </TraceLine>
      <TraceLine status="error">
        <TraceIcon>
          <XCircleIcon />
        </TraceIcon>
        <TraceTitle>呼叫金流 API 失敗</TraceTitle>
        <TraceDescription>逾時</TraceDescription>
      </TraceLine>
      <TraceLine status="pending">
        <TraceIcon>
          <CircleDashedIcon />
        </TraceIcon>
        <TraceTitle>產生回覆草稿</TraceTitle>
      </TraceLine>
    </Trace>
  ),
};

export const Collapsible: Story = {
  render: () => (
    <Trace className="max-w-md">
      <TraceCollapsible defaultOpen>
        <TraceCollapsibleTrigger>
          <TraceLine>
            <TraceIcon>
              <SearchIcon />
            </TraceIcon>
            <TraceTitle>搜尋知識庫：退款流程</TraceTitle>
            <TraceDescription>3 筆結果</TraceDescription>
          </TraceLine>
        </TraceCollapsibleTrigger>
        <TraceCollapsibleContent>
          <ul className="list-disc pl-4 text-sm">
            <li>如何申請退款？</li>
            <li>退款入帳需要多久？</li>
            <li>信用卡退款注意事項</li>
          </ul>
        </TraceCollapsibleContent>
      </TraceCollapsible>
      <TraceCollapsible>
        <TraceCollapsibleTrigger>
          <TraceLine status="error">
            <TraceIcon>
              <XCircleIcon />
            </TraceIcon>
            <TraceTitle>呼叫金流 API 失敗</TraceTitle>
          </TraceLine>
        </TraceCollapsibleTrigger>
        <TraceCollapsibleContent>
          <p className="text-sm">錯誤代碼 504：閘道逾時，請稍後再試或改由人工處理。</p>
        </TraceCollapsibleContent>
      </TraceCollapsible>
    </Trace>
  ),
};

export const AsButtons: Story = {
  render: () => (
    <Trace className="max-w-md">
      <button type="button">
        <TraceLine>
          <TraceIcon>
            <CheckIcon />
          </TraceIcon>
          <TraceTitle>已寄送退款通知信</TraceTitle>
          <TraceDescription>10:24</TraceDescription>
        </TraceLine>
      </button>
      <a href="#log">
        <TraceLine>
          <TraceIcon>
            <CheckIcon />
          </TraceIcon>
          <TraceTitle>查看完整處理紀錄</TraceTitle>
        </TraceLine>
      </a>
    </Trace>
  ),
};
