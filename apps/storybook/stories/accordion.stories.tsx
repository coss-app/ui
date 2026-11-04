import type { Meta, StoryObj } from "@storybook/react-vite";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@coss-app/ui/components/accordion";

const faqs = [
  {
    value: "refund",
    q: "退款申請需要多久才會處理？",
    a: "客服收到申請後會在 1 個工作天內受理，退款約 7–14 個工作天退回原付款方式。",
  },
  {
    value: "invoice",
    q: "如何修改發票抬頭？",
    a: "請在工單中附上統一編號與公司名稱，客服會協助作廢並重新開立。",
  },
  {
    value: "sla",
    q: "緊急工單的回覆時限是多少？",
    a: "緊急工單 30 分鐘內回覆，一般工單 4 小時內回覆（皆以上班時間計）。",
  },
  {
    value: "legacy",
    q: "舊版客服系統的資料（已停用）",
    a: "舊系統資料已全部移轉。",
    disabled: true,
  },
];

function FaqAccordion(props: { multiple?: boolean; defaultValue?: string[] }) {
  return (
    <Accordion className="max-w-lg" {...props}>
      {faqs.map((f) => (
        <AccordionItem key={f.value} value={f.value} disabled={f.disabled}>
          <AccordionTrigger>{f.q}</AccordionTrigger>
          <AccordionContent>
            <p>{f.a}</p>
            {f.value === "refund" && (
              <p>
                詳細規範請見 <a href="#">退款政策</a>。
              </p>
            )}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

const meta = {
  title: "Navigation/Accordion",
  component: FaqAccordion,
  argTypes: { multiple: { control: "boolean" } },
  args: { multiple: false, defaultValue: ["refund"] },
} satisfies Meta<typeof FaqAccordion>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Multiple: Story = {
  args: { multiple: true, defaultValue: ["refund", "sla"] },
};

export const AllClosed: Story = {
  args: { defaultValue: [] },
};
