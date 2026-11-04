import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@coss-app/ui/components/input-otp";

const meta = {
  title: "Inputs/InputOTP",
  component: InputOTP,
  argTypes: {
    disabled: { control: "boolean" },
  },
  args: {
    maxLength: 6,
    disabled: false,
    pattern: REGEXP_ONLY_DIGITS,
    render: undefined,
    children: (
      <InputOTPGroup>
        {Array.from({ length: 6 }, (_, i) => (
          <InputOTPSlot key={i} index={i} />
        ))}
      </InputOTPGroup>
    ),
  },
  // input-otp 內部一律受控：defaultValue 轉成 state 再以 value 傳入，避免 React 的 value + defaultValue 警告
  render: function Render({ defaultValue, ...args }) {
    const [value, setValue] = React.useState(String(defaultValue ?? ""));
    return <InputOTP {...args} value={value} onChange={setValue} />;
  },
} satisfies Meta<typeof InputOTP>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const WithSeparator: Story = {
  args: {
    children: (
      <>
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
        </InputOTPGroup>
        <InputOTPSeparator />
        <InputOTPGroup>
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </>
    ),
  },
};

export const Filled: Story = {
  args: { defaultValue: "123456" },
};

export const Invalid: Story = {
  args: {
    defaultValue: "987654",
    children: (
      <InputOTPGroup>
        {Array.from({ length: 6 }, (_, i) => (
          <InputOTPSlot key={i} index={i} aria-invalid />
        ))}
      </InputOTPGroup>
    ),
  },
  decorators: [
    (Story) => (
      <div className="flex flex-col gap-2">
        <Story />
        <p className="text-sm font-semibold text-destructive-foreground">驗證碼錯誤，請重新輸入</p>
      </div>
    ),
  ],
};

export const Disabled: Story = {
  args: { disabled: true, defaultValue: "12" },
};
