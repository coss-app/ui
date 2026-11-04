import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Questionnaire,
  QuestionnaireActions,
  QuestionnaireChoice,
  QuestionnaireChoiceDescription,
  QuestionnaireChoices,
  QuestionnaireDescription,
  QuestionnaireError,
  QuestionnaireInput,
  QuestionnaireItem,
  QuestionnaireNext,
  QuestionnairePrevious,
  QuestionnaireProgress,
  QuestionnaireSkip,
  QuestionnaireSubmit,
  QuestionnaireTitle,
} from "@coss-app/ui/components/questionnaire";

const items = [
  {
    name: "satisfaction",
    required: true,
    choices: [{ value: "5" }, { value: "4" }, { value: "3" }, { value: "2" }, { value: "1", disabled: true }],
  },
  {
    name: "channels",
    choices: [{ value: "phone" }, { value: "email" }, { value: "line" }, { value: "chat" }],
  },
  { name: "comment" },
] as const;

function SatisfactionSurvey({ shortcuts }: { shortcuts?: "letters" | "numbers" }) {
  const [result, setResult] = React.useState<Record<string, string[]> | null>(null);

  return (
    <div className="max-w-lg rounded-xl border bg-card p-6">
      <Questionnaire
        items={items}
        shortcuts={shortcuts}
        onSubmit={(e) => {
          e.preventDefault();
          const data = new FormData(e.currentTarget);
          const out: Record<string, string[]> = {};
          for (const [k, v] of data.entries()) (out[k] ??= []).push(String(v));
          setResult(out);
        }}
      >
        <QuestionnaireProgress
          render={(props, state) => (
            <div {...props}>
              第 {String(state.current)} / {String(state.total)} 題
            </div>
          )}
        />

        <QuestionnaireItem name="satisfaction" required>
          <QuestionnaireTitle>這次客服處理的整體滿意度？</QuestionnaireTitle>
          <QuestionnaireDescription>工單 #T-20261104-001：無法登入會員中心</QuestionnaireDescription>
          <QuestionnaireChoices>
            <QuestionnaireChoice value="5">非常滿意</QuestionnaireChoice>
            <QuestionnaireChoice value="4">滿意</QuestionnaireChoice>
            <QuestionnaireChoice value="3">普通</QuestionnaireChoice>
            <QuestionnaireChoice value="2">不滿意</QuestionnaireChoice>
            <QuestionnaireChoice value="1" disabled>
              非常不滿意
              <QuestionnaireChoiceDescription>（停用選項示範）</QuestionnaireChoiceDescription>
            </QuestionnaireChoice>
          </QuestionnaireChoices>
          <QuestionnaireError>請選擇一個滿意度後再繼續。</QuestionnaireError>
        </QuestionnaireItem>

        <QuestionnaireItem name="channels" multiple>
          <QuestionnaireTitle>您希望之後透過哪些管道聯繫？（可複選）</QuestionnaireTitle>
          <QuestionnaireChoices>
            <QuestionnaireChoice value="phone">
              電話
              <QuestionnaireChoiceDescription>上班時間 09:00–18:00</QuestionnaireChoiceDescription>
            </QuestionnaireChoice>
            <QuestionnaireChoice value="email">電子郵件</QuestionnaireChoice>
            <QuestionnaireChoice value="line">LINE 官方帳號</QuestionnaireChoice>
            <QuestionnaireChoice value="chat">網站線上客服</QuestionnaireChoice>
          </QuestionnaireChoices>
          <QuestionnaireError>請至少選一個管道，或按「略過」。</QuestionnaireError>
        </QuestionnaireItem>

        <QuestionnaireItem name="comment">
          <QuestionnaireTitle>還有其他建議嗎？</QuestionnaireTitle>
          <QuestionnaireDescription>選填，最多 200 字。</QuestionnaireDescription>
          <QuestionnaireInput placeholder="例如：希望縮短等待時間" />
        </QuestionnaireItem>

        <QuestionnaireActions>
          <QuestionnairePrevious>上一題</QuestionnairePrevious>
          <QuestionnaireSkip>略過</QuestionnaireSkip>
          <QuestionnaireNext>下一題</QuestionnaireNext>
          <QuestionnaireSubmit>送出問卷</QuestionnaireSubmit>
        </QuestionnaireActions>
      </Questionnaire>
      {result && (
        <pre className="mt-4 rounded-lg bg-muted p-3 text-xs">{JSON.stringify(result, null, 2)}</pre>
      )}
    </div>
  );
}

const meta = {
  title: "Inputs/Questionnaire",
  component: SatisfactionSurvey,
  argTypes: {
    shortcuts: { control: "select", options: [undefined, "letters", "numbers"] },
  },
} satisfies Meta<typeof SatisfactionSurvey>;

export default meta;
type Story = StoryObj<typeof meta>;

/** 必填單選 → 可複選（可略過）→ 文字輸入；未選直接按「下一題」會顯示錯誤 */
export const Default: Story = {};

/** 以字母快捷鍵（A、B、C…）選答 */
export const LetterShortcuts: Story = {
  args: { shortcuts: "letters" },
};

/** 以數字快捷鍵（1、2、3…）選答 */
export const NumberShortcuts: Story = {
  args: { shortcuts: "numbers" },
};
