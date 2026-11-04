import type { Meta, StoryObj } from "@storybook/react-vite";

/** DESIGN.md 第 3 節字級表 */
const SCALE = [
  { level: "Hero", size: 40, weight: 600, usage: "歡迎頁超大標（少用）", sample: "歡迎使用 ServOps" },
  { level: "Display", size: 30, weight: 600, usage: "登入頁品牌名", sample: "JC ServOps", className: "text-heading" },
  { level: "Heading L", size: 25, weight: 600, usage: "大型數字、區塊大標", sample: "今日待處理 128 件" },
  { level: "Title", size: 20, weight: 600, usage: "彈窗標題、詳情頁標題", sample: "工單 #20241104-0012" },
  {
    level: "Brand Subtitle",
    size: 20,
    weight: 500,
    usage: "品牌副標，字距 6px",
    sample: "智慧客服營運平台",
    className: "text-muted-foreground",
    style: { letterSpacing: 6 },
  },
  { level: "Section", size: 18, weight: 600, usage: "面板標題", sample: "處理紀錄" },
  { level: "Body L", size: 16, weight: 400, usage: "對話內文、空狀態說明、驗證說明", sample: "您好，我的訂單一直顯示配送中，請問何時會到？" },
  { level: "Body L Toast", size: 16, weight: 600, usage: "Toast 文字", sample: "工單已成功指派" },
  { level: "Body", size: 14, weight: 400, usage: "一般內文、輸入文字、表格內容、選單項目", sample: "客戶反映 App 無法登入，已請其清除快取後重試。" },
  { level: "Button / Emphasis", size: 14, weight: 600, usage: "按鈕、選中選單、表格第一欄、錯誤訊息、分頁資訊", sample: "建立工單" },
  { level: "Date Cell", size: 14, weight: 500, usage: "日期選擇器的星期與日期", sample: "一 二 三 四 五 六 日　12 13 14" },
  { level: "Label", size: 13, weight: 600, usage: "表單 label、標籤（Tag）、側欄分組標題", sample: "負責人員" },
  { level: "Meta", size: 13, weight: 400, usage: "中繼資料、日期分隔膠囊、訊息時間", sample: "2024/11/04 下午 3:20" },
  { level: "Caption", size: 12, weight: 400, usage: "表頭、時間戳記、輔助說明", sample: "最後更新：5 分鐘前" },
] as const;

function TypeScale() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-[25px] font-semibold text-heading">字級 Typography</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          字體 Inter，中文走系統字（PingFang TC、Microsoft JhengHei）。字重只用 400 / 500 / 600；單行行高 100%、多行 1.5；字距 0。
        </p>
        <p className="mt-1 font-mono text-xs text-muted-foreground" data-testid="font-family">
          目前 html font-family：<FontFamilyProbe />
        </p>
      </div>
      <div className="overflow-x-auto rounded-lg border bg-card">
        <table className="w-full min-w-[640px] text-left">
          <thead>
            <tr className="border-b text-xs text-muted-foreground">
              <th className="px-4 py-3 font-normal">層級</th>
              <th className="px-4 py-3 font-normal">大小 / 字重</th>
              <th className="px-4 py-3 font-normal">範例</th>
            </tr>
          </thead>
          <tbody>
            {SCALE.map((row) => (
              <tr key={row.level} className="border-b last:border-b-0 align-middle">
                <td className="px-4 py-4 text-sm font-semibold whitespace-nowrap">
                  {row.level}
                  <div className="text-xs font-normal text-muted-foreground">{row.usage}</div>
                </td>
                <td className="px-4 py-4 font-mono text-xs whitespace-nowrap text-muted-foreground">
                  {row.size} / {row.weight}
                </td>
                <td
                  className={"px-4 py-4 leading-none " + ("className" in row ? row.className : "")}
                  style={{ fontSize: row.size, fontWeight: row.weight, ...("style" in row ? row.style : {}) }}
                >
                  {row.sample}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <section className="flex flex-col gap-2">
        <h2 className="text-lg font-semibold text-heading">字重</h2>
        {[400, 500, 600].map((w) => (
          <p key={w} className="text-base" style={{ fontWeight: w }}>
            {w} — The quick brown fox jumps over the lazy dog 0123456789 客服工單處理中
          </p>
        ))}
      </section>
      <section className="flex flex-col gap-2">
        <h2 className="text-lg font-semibold text-heading">字色</h2>
        <p className="text-sm text-heading">大標 text-heading</p>
        <p className="text-sm text-foreground">內文 text-foreground</p>
        <p className="text-sm text-muted-foreground">次要 text-muted-foreground</p>
        <p className="text-sm text-placeholder">placeholder／表頭／時間 text-placeholder</p>
      </section>
    </div>
  );
}

function FontFamilyProbe() {
  return (
    <span
      ref={(el) => {
        if (el) el.textContent = getComputedStyle(document.documentElement).fontFamily;
      }}
    />
  );
}

const meta = {
  title: "Foundations/Typography",
  component: TypeScale,
  parameters: { controls: { disable: true } },
} satisfies Meta<typeof TypeScale>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Scale: Story = {};
