import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldTitle,
} from "@coss-app/ui/components/field";
import { Input } from "@coss-app/ui/components/input";
import { Textarea } from "@coss-app/ui/components/textarea";
import { Checkbox } from "@coss-app/ui/components/checkbox";
import { RadioGroup, RadioGroupItem } from "@coss-app/ui/components/radio-group";
import { Switch } from "@coss-app/ui/components/switch";
import { NativeSelect, NativeSelectOption } from "@coss-app/ui/components/native-select";
import { Button } from "@coss-app/ui/components/button";

const meta = {
  title: "Inputs/Field",
  component: Field,
  argTypes: {
    orientation: { control: "select", options: ["vertical", "horizontal", "responsive"] },
  },
  args: {
    orientation: "vertical",
  },
  render: (args) => (
    <div className="max-w-md">
      <Field {...args}>
        <FieldLabel htmlFor="pg-email">聯絡信箱</FieldLabel>
        <Input id="pg-email" type="email" placeholder="name@example.com" />
        <FieldDescription>工單進度會寄到這個信箱。</FieldDescription>
      </Field>
    </div>
  ),
} satisfies Meta<typeof Field>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const TicketForm: Story = {
  render: () => (
    <form className="max-w-lg" onSubmit={(e) => e.preventDefault()}>
      <FieldSet>
        <FieldLegend>建立客服工單</FieldLegend>
        <FieldDescription>填寫問題內容，客服人員會在 1 個工作天內回覆。</FieldDescription>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="tf-name">客戶姓名</FieldLabel>
            <Input id="tf-name" placeholder="王小明" />
          </Field>
          <Field>
            <FieldLabel htmlFor="tf-category">問題類別</FieldLabel>
            <NativeSelect id="tf-category" defaultValue="">
              <NativeSelectOption value="" disabled>
                請選擇
              </NativeSelectOption>
              <NativeSelectOption value="account">帳號與登入</NativeSelectOption>
              <NativeSelectOption value="billing">帳單與付款</NativeSelectOption>
              <NativeSelectOption value="other">其他</NativeSelectOption>
            </NativeSelect>
          </Field>
          <Field>
            <FieldLabel htmlFor="tf-desc">問題描述</FieldLabel>
            <Textarea id="tf-desc" placeholder="請描述發生的狀況與時間" />
            <FieldDescription>至少 20 個字，可附上錯誤畫面截圖。</FieldDescription>
          </Field>
          <FieldSeparator>或</FieldSeparator>
          <Field orientation="horizontal">
            <Checkbox id="tf-urgent" />
            <FieldLabel htmlFor="tf-urgent">標記為緊急</FieldLabel>
          </Field>
          <Field orientation="horizontal">
            <Button type="submit">送出工單</Button>
            <Button type="button" variant="ghost">
              取消
            </Button>
          </Field>
        </FieldGroup>
      </FieldSet>
    </form>
  ),
};

export const Orientations: Story = {
  render: () => (
    <FieldGroup className="max-w-2xl">
      <Field orientation="vertical">
        <FieldLabel htmlFor="o-v">垂直（vertical）</FieldLabel>
        <Input id="o-v" placeholder="工單主旨" />
      </Field>
      <Field orientation="horizontal">
        <FieldLabel htmlFor="o-h">水平（horizontal）</FieldLabel>
        <Input id="o-h" placeholder="工單主旨" />
      </Field>
      <Field orientation="responsive">
        <FieldContent>
          <FieldLabel htmlFor="o-r">響應式（responsive）</FieldLabel>
          <FieldDescription>容器寬度足夠時轉為水平排列。</FieldDescription>
        </FieldContent>
        <Input id="o-r" placeholder="工單主旨" />
      </Field>
    </FieldGroup>
  ),
};

export const ErrorAndDisabled: Story = {
  render: () => (
    <FieldGroup className="max-w-md">
      <Field data-invalid="true">
        <FieldLabel htmlFor="e-phone">聯絡電話</FieldLabel>
        <Input id="e-phone" aria-invalid defaultValue="09123" />
        <FieldError>電話格式不正確，請輸入 10 碼手機號碼。</FieldError>
      </Field>
      <Field data-invalid="true">
        <FieldLabel htmlFor="e-multi">備註</FieldLabel>
        <Textarea id="e-multi" aria-invalid />
        <FieldError
          errors={[{ message: "備註為必填" }, { message: "至少需 20 個字" }, { message: "備註為必填" }]}
        />
      </Field>
      <Field data-disabled="true">
        <FieldLabel htmlFor="d-id">工單編號</FieldLabel>
        <Input id="d-id" disabled defaultValue="T-20261104-001" />
        <FieldDescription>系統自動產生，無法修改。</FieldDescription>
      </Field>
    </FieldGroup>
  ),
};

export const ChoiceCards: Story = {
  render: () => (
    <FieldSet className="max-w-md">
      <FieldLegend variant="label">回覆方式</FieldLegend>
      <RadioGroup defaultValue="email">
        {[
          { value: "email", title: "電子郵件", desc: "回覆內容寄到聯絡信箱" },
          { value: "phone", title: "電話回撥", desc: "客服於上班時間來電" },
          { value: "sms", title: "簡訊", desc: "僅通知處理進度", disabled: true },
        ].map((o) => (
          <FieldLabel key={o.value} htmlFor={`cc-${o.value}`}>
            <Field orientation="horizontal" data-disabled={o.disabled ? "true" : undefined}>
              <FieldContent>
                <FieldTitle>{o.title}</FieldTitle>
                <FieldDescription>{o.desc}</FieldDescription>
              </FieldContent>
              <RadioGroupItem id={`cc-${o.value}`} value={o.value} disabled={o.disabled} />
            </Field>
          </FieldLabel>
        ))}
      </RadioGroup>
    </FieldSet>
  ),
};

export const Checkboxes: Story = {
  render: () => (
    <FieldSet className="max-w-md">
      <FieldLegend variant="label">通知設定</FieldLegend>
      <FieldDescription>選擇要接收的工單事件。</FieldDescription>
      <FieldGroup data-slot="checkbox-group">
        <Field orientation="horizontal">
          <Checkbox id="n-new" defaultChecked />
          <FieldLabel htmlFor="n-new" className="font-normal">
            新工單指派給我
          </FieldLabel>
        </Field>
        <Field orientation="horizontal">
          <Checkbox id="n-reply" />
          <FieldLabel htmlFor="n-reply" className="font-normal">
            客戶回覆
          </FieldLabel>
        </Field>
        <Field orientation="horizontal" data-disabled="true">
          <Checkbox id="n-sla" disabled />
          <FieldLabel htmlFor="n-sla" className="font-normal">
            SLA 即將逾期（管理員設定）
          </FieldLabel>
        </Field>
      </FieldGroup>
      <FieldSeparator />
      <Field orientation="horizontal">
        <FieldContent>
          <FieldLabel htmlFor="n-digest">每日摘要</FieldLabel>
          <FieldDescription>每天早上 9 點寄送前一日統計。</FieldDescription>
        </FieldContent>
        <Switch id="n-digest" defaultChecked />
      </Field>
    </FieldSet>
  ),
};
