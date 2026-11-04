import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@coss-app/ui/components/form";
import { Input } from "@coss-app/ui/components/input";
import { Textarea } from "@coss-app/ui/components/textarea";
import { NativeSelect, NativeSelectOption } from "@coss-app/ui/components/native-select";
import { Checkbox } from "@coss-app/ui/components/checkbox";
import { Button } from "@coss-app/ui/components/button";
import { Spinner } from "@coss-app/ui/components/spinner";

const schema = z.object({
  name: z.string().min(2, "請輸入客戶姓名（至少 2 個字）"),
  email: z.email("請輸入有效的電子郵件"),
  category: z.string().min(1, "請選擇問題類別"),
  description: z.string().min(20, "問題描述至少需 20 個字"),
  agree: z.boolean().refine((v) => v, "請同意個資使用聲明"),
});

type Values = z.infer<typeof schema>;

function TicketForm({ validateOnMount = false }: { validateOnMount?: boolean }) {
  const [submitted, setSubmitted] = React.useState<Values | null>(null);
  const form = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", email: "", category: "", description: "", agree: false },
  });

  React.useEffect(() => {
    if (validateOnMount) void form.trigger();
  }, [validateOnMount, form]);

  async function onSubmit(values: Values) {
    await new Promise((r) => setTimeout(r, 1200));
    setSubmitted(values);
  }

  const submitting = form.formState.isSubmitting;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex max-w-lg flex-col gap-5">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>客戶姓名</FormLabel>
              <FormControl>
                <Input placeholder="王小明" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>聯絡信箱</FormLabel>
              <FormControl>
                <Input type="email" placeholder="name@example.com" {...field} />
              </FormControl>
              <FormDescription>處理進度會寄到這個信箱。</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>問題類別</FormLabel>
              <FormControl>
                <NativeSelect {...field}>
                  <NativeSelectOption value="">請選擇</NativeSelectOption>
                  <NativeSelectOption value="account">帳號與登入</NativeSelectOption>
                  <NativeSelectOption value="billing">帳單與付款</NativeSelectOption>
                  <NativeSelectOption value="device">設備故障</NativeSelectOption>
                </NativeSelect>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>問題描述</FormLabel>
              <FormControl>
                <Textarea placeholder="請描述發生的狀況與時間" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="agree"
          render={({ field }) => (
            <FormItem className="flex items-center gap-2">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={(checked) => field.onChange(checked)}
                  onBlur={field.onBlur}
                />
              </FormControl>
              <FormLabel className="font-normal">我同意客服使用上述資料聯絡我</FormLabel>
              <FormMessage className="basis-full" />
            </FormItem>
          )}
        />
        <div className="flex gap-3">
          <Button type="submit" disabled={submitting}>
            {submitting && <Spinner data-icon="inline-start" />}
            {submitting ? "送出中" : "送出工單"}
          </Button>
          <Button type="button" variant="ghost" onClick={() => form.reset()}>
            清除
          </Button>
        </div>
        {submitted && (
          <pre className="rounded-lg bg-muted p-3 text-xs">{JSON.stringify(submitted, null, 2)}</pre>
        )}
      </form>
    </Form>
  );
}

const meta = {
  title: "Inputs/Form",
  component: TicketForm,
} satisfies Meta<typeof TicketForm>;

export default meta;
type Story = StoryObj<typeof meta>;

/** 送出時以 zod 驗證；通過後模擬 1.2 秒的寄送（loading 狀態） */
export const Default: Story = {};

/** 載入即觸發驗證，展示所有錯誤訊息與 aria-invalid 樣式 */
export const WithErrors: Story = {
  args: { validateOnMount: true },
};
