# 客服情境範本

整頁範本，可複製改名。每段為完整檔案（含 import），已通過 TypeScript 型別檢查。範例為繁體中文客服工單情境；套用時保留結構，替換文案與資料。

直接依賴：`lucide-react`。第一個範本另需專案自行安裝 `react-hook-form`、`zod`、`@hookform/resolvers`。

## 1. 建立工單：桌面彈窗＋手機整頁＋驗證表單（Form）

建立工單有 `Textarea`，屬長表單（判斷見 [ux-rules.md](ux-rules.md)「短彈窗或長表單」）：桌面開彈窗，手機換到獨立頁面 `/tickets/new`。

重點：
- 表單本體 `TicketForm` 只寫一份，用 `variant="dialog" | "page"` 切換外框；`CreateTicketPage` 是路由頁（標題列返回鈕、送出鈕黏底並補 safe area）。
- 入口 `CreateTicketEntry` 是指向 `/tickets/new` 的真連結：`≥ md` 攔截一般點擊改開彈窗，手機與 ⌘／中鍵照連結換頁。專案用框架路由時，把 `<a>` 換成框架的 `Link`（`render={<Link href="/tickets/new" />}`）。
- `onDone`／`onBack` 由路由層提供：送出成功用 `replace` 回列表，返回依規則用 `router.back()` 或 `replace`（見 [ux-rules.md](ux-rules.md)「長表單的路由與行為」）。
- 問題類別用 `NativeSelect`，避免範本再包一層手機 `Drawer` 選擇器；專案已封裝 `Select` 的手機 `Drawer` 時改用 `Select`（Root 傳 `items`）。
- `Form` 系列自動把 zod 錯誤帶到 `FormMessage` 並設 `aria-invalid`；送出中按鈕立即停用，Spinner 與進行式文字延遲顯示（`useDelayedFlag`，時機見 [ux-rules.md](ux-rules.md)「9」）。

```tsx
"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowLeftIcon, PlusIcon } from "lucide-react";
import { Button } from "@coss-app/ui/components/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@coss-app/ui/components/dialog";
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
import { NativeSelect, NativeSelectOption } from "@coss-app/ui/components/native-select";
import { Spinner } from "@coss-app/ui/components/spinner";
import { Textarea } from "@coss-app/ui/components/textarea";
import { toast } from "@coss-app/ui/components/toast";
import { useIsMobile } from "@coss-app/ui/hooks/use-mobile";

const schema = z.object({
  customer: z.string().min(2, "請輸入客戶姓名（至少 2 個字）"),
  email: z.email("請輸入有效的電子郵件"),
  category: z.string().min(1, "請選擇問題類別"),
  description: z.string().min(10, "問題描述至少需 10 個字"),
});

type Values = z.infer<typeof schema>;

/** active 持續超過 delay 才回傳 true；變成 true 後至少維持 minVisible，避免一閃即逝 */
function useDelayedFlag(active: boolean, delay = 300, minVisible = 400) {
  const [shown, setShown] = React.useState(false);
  const shownAt = React.useRef(0);
  React.useEffect(() => {
    if (active) {
      if (shown) return;
      const timer = setTimeout(() => {
        shownAt.current = Date.now();
        setShown(true);
      }, delay);
      return () => clearTimeout(timer);
    }
    if (!shown) return;
    const remaining = minVisible - (Date.now() - shownAt.current);
    const timer = setTimeout(() => setShown(false), Math.max(0, remaining));
    return () => clearTimeout(timer);
  }, [active, shown, delay, minVisible]);
  return shown;
}

/** 表單本體：欄位與驗證只寫這一份，彈窗與整頁共用 */
function TicketForm({
  variant,
  onDone,
  onCancel,
}: {
  variant: "dialog" | "page";
  onDone: () => void;
  onCancel: () => void;
}) {
  const form = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: { customer: "", email: "", category: "", description: "" },
  });
  const submitting = form.formState.isSubmitting;
  const showSpinner = useDelayedFlag(submitting);

  async function onSubmit(values: Values) {
    await new Promise((resolve) => setTimeout(resolve, 800)); // 換成實際 API
    toast.add({ title: "工單已建立", description: `已通知 ${values.customer}`, type: "success" });
    form.reset();
    onDone();
  }

  const submit = (
    <Button type="submit" disabled={submitting} className={variant === "page" ? "w-full" : undefined}>
      {showSpinner && <Spinner data-icon="inline-start" />}
      {showSpinner ? "建立中" : "建立工單"}
    </Button>
  );

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={variant === "page" ? "flex flex-1 flex-col gap-4" : "flex flex-col gap-4"}
      >
        <FormField
          control={form.control}
          name="customer"
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
        {variant === "dialog" ? (
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onCancel}>
              取消
            </Button>
            {submit}
          </DialogFooter>
        ) : (
          <div
            className="sticky bottom-0 mt-auto -mx-4 border-t bg-card px-4 pt-3 pb-(--submit-bar-pb)"
            // safe area 沒有對應 token：用 CSS 變數傳值（lint 不允許任意值 class 與 inline 樣式屬性）
            style={{ "--submit-bar-pb": "max(0.75rem, env(safe-area-inset-bottom))" } as React.CSSProperties}
          >
            {submit}
          </div>
        )}
      </form>
    </Form>
  );
}

/** 路由頁 /tickets/new：手機入口，也是 PC 直接開網址時的頁面版 */
export function CreateTicketPage({ onBack, onDone }: { onBack: () => void; onDone: () => void }) {
  return (
    <div className="flex min-h-svh flex-col bg-card">
      <header className="flex h-14 items-center gap-2 border-b px-2">
        <Button variant="ghost" size="icon" aria-label="返回" onClick={onBack}>
          <ArrowLeftIcon />
        </Button>
        <h1 className="text-lg font-semibold">建立工單</h1>
      </header>
      <div className="flex flex-1 flex-col px-4 pt-4">
        <TicketForm variant="page" onDone={onDone} onCancel={onBack} />
      </div>
    </div>
  );
}

/** 列表頁的入口：真連結；≥ md 攔截一般點擊改開彈窗 */
export function CreateTicketEntry() {
  const isMobile = useIsMobile();
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Button
        render={<a href="/tickets/new" />}
        onClick={(event) => {
          // 手機、⌘／Ctrl／Shift 點擊、中鍵：照連結換頁
          if (isMobile || event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return;
          event.preventDefault();
          setOpen(true);
        }}
      >
        <PlusIcon data-icon="inline-start" />
        建立工單
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>建立工單</DialogTitle>
            <DialogDescription>填寫問題內容，客服人員會在 1 個工作天內回覆。</DialogDescription>
          </DialogHeader>
          <TicketForm variant="dialog" onDone={() => setOpen(false)} onCancel={() => setOpen(false)} />
        </DialogContent>
      </Dialog>
    </>
  );
}
```

`toast` 需要外層有 `<Toaster>`（見 [setup.md](setup.md) 的 layout）。不需要驗證的簡單表單改用 `Field` 系列：`FieldSet`＞`FieldGroup`＞`Field`＞`FieldLabel`＋`Input`＋`FieldDescription`。

## 2. 工單列表：篩選＋表格＋空狀態＋分頁

重點：面板是白色 `bg-card`、10px 圓角、無陰影；狀態用 Badge variant 對應；無資料用 `Empty`；列上動作用 `neutral`／`ghost` 按鈕，不放第二個主要按鈕。

```tsx
import * as React from "react";
import { InboxIcon, SearchIcon } from "lucide-react";
import { Badge } from "@coss-app/ui/components/badge";
import { Button } from "@coss-app/ui/components/button";
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@coss-app/ui/components/empty";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@coss-app/ui/components/input-group";
import {
  Pagination,
  PaginationContent,
  PaginationInfo,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@coss-app/ui/components/pagination";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@coss-app/ui/components/table";
import { Tabs, TabsList, TabsTrigger } from "@coss-app/ui/components/tabs";

type Status = "pending" | "processing" | "closed" | "overdue";

type Ticket = { id: string; subject: string; customer: string; status: Status; updated: string };

const statusLabel: Record<Status, string> = {
  pending: "待受理",
  processing: "處理中",
  closed: "已結案",
  overdue: "逾期",
};

const statusVariant: Record<Status, "warning" | "info" | "success" | "destructive"> = {
  pending: "warning",
  processing: "info",
  closed: "success",
  overdue: "destructive",
};

const PAGE_SIZE = 10;

export function TicketList({ tickets }: { tickets: Ticket[] }) {
  const [tab, setTab] = React.useState<"all" | Status>("all");
  const [query, setQuery] = React.useState("");
  const [page, setPage] = React.useState(1);

  const filtered = tickets.filter(
    (t) => (tab === "all" || t.status === tab) && (t.subject + t.customer + t.id).includes(query),
  );
  const pages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const current = Math.min(page, pages);
  const rows = filtered.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE);
  const go = (p: number) => (e: React.MouseEvent) => {
    e.preventDefault();
    setPage(Math.min(pages, Math.max(1, p)));
  };

  return (
    <section className="flex flex-col gap-4 rounded-lg bg-card p-5">
      <h2 className="text-lg font-semibold text-heading">客服工單</h2>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <Tabs
          value={tab}
          onValueChange={(value) => {
            setTab(value as "all" | Status);
            setPage(1);
          }}
        >
          <TabsList>
            <TabsTrigger value="all">全部</TabsTrigger>
            <TabsTrigger value="pending">待受理</TabsTrigger>
            <TabsTrigger value="processing">處理中</TabsTrigger>
            <TabsTrigger value="closed">已結案</TabsTrigger>
          </TabsList>
        </Tabs>
        <InputGroup className="w-full sm:w-72">
          <InputGroupInput
            placeholder="搜尋工單、客戶"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setPage(1);
            }}
          />
          <InputGroupAddon>
            <SearchIcon />
          </InputGroupAddon>
        </InputGroup>
      </div>

      {rows.length === 0 ? (
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <InboxIcon />
            </EmptyMedia>
            <EmptyTitle>沒有符合條件的工單</EmptyTitle>
            <EmptyDescription>換個關鍵字或狀態再試試看。</EmptyDescription>
          </EmptyHeader>
        </Empty>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>工單編號</TableHead>
              <TableHead>主旨</TableHead>
              <TableHead>客戶</TableHead>
              <TableHead>狀態</TableHead>
              <TableHead className="text-right">更新時間</TableHead>
              <TableHead className="w-24" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((t) => (
              <TableRow key={t.id}>
                <TableCell className="font-semibold">{t.id}</TableCell>
                <TableCell>{t.subject}</TableCell>
                <TableCell>{t.customer}</TableCell>
                <TableCell>
                  <Badge variant={statusVariant[t.status]}>{statusLabel[t.status]}</Badge>
                </TableCell>
                <TableCell className="text-right text-placeholder">{t.updated}</TableCell>
                <TableCell className="text-right">
                  <Button variant="neutral" render={<a href={`/tickets/${t.id}`} />}>
                    查看
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      <div className="flex flex-wrap items-center justify-between gap-3">
        <PaginationInfo>
          共 {filtered.length} 張，第 {current} / {pages} 頁
        </PaginationInfo>
        <Pagination className="mx-0 w-auto">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" text="上一頁" onClick={go(current - 1)} aria-disabled={current === 1} />
            </PaginationItem>
            {Array.from({ length: pages }, (_, i) => i + 1).map((p) => (
              <PaginationItem key={p}>
                <PaginationLink href="#" isActive={p === current} onClick={go(p)}>
                  {p}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext href="#" text="下一頁" onClick={go(current + 1)} aria-disabled={current === pages} />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </section>
  );
}
```

手機（< 768）改成卡片列表：同一份資料 `md:hidden` 渲染 `Item`（標題＋Badge＋兩行次要資訊），`Table` 用 `hidden md:table`；篩選收進 `Drawer`。

## 3. 客服對話：訊息串＋輸入區

重點：`MessageScrollerProvider`＞`MessageScroller`＞`Viewport`＞`Content`＞`Item` 的結構；客戶與客服用 `align` 與 `Bubble variant` 區分；`autoScroll` 讓新訊息自動到底；`scrollAnchor` 標在使用者剛送出的那則。

```tsx
"use client";

import * as React from "react";
import { SendIcon } from "lucide-react";
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
import { Textarea } from "@coss-app/ui/components/textarea";

type ChatMessage = { id: string; from: "customer" | "agent"; name: string; text: string; time: string };

export function TicketChat({
  initial,
  onSend,
}: {
  initial: ChatMessage[];
  onSend: (text: string) => Promise<void>;
}) {
  const [messages, setMessages] = React.useState(initial);
  const [draft, setDraft] = React.useState("");
  const [sending, setSending] = React.useState(false);

  async function send() {
    const text = draft.trim();
    if (!text || sending) return;
    setSending(true);
    try {
      await onSend(text);
      setMessages((prev) => [
        ...prev,
        { id: `local-${prev.length}`, from: "agent", name: "我", text, time: "剛剛" },
      ]);
      setDraft("");
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="flex h-130 flex-col rounded-lg bg-card">
      <div className="min-h-0 flex-1">
        <MessageScrollerProvider autoScroll>
          <MessageScroller>
            <MessageScrollerViewport aria-label="客服對話紀錄">
              <MessageScrollerContent className="p-4">
                {messages.length === 0 && (
                  <p className="text-center text-sm text-muted-foreground">尚無對話，客戶傳訊後會顯示在這裡。</p>
                )}
                {messages.map((m) => {
                  const align = m.from === "agent" ? "end" : "start";
                  return (
                    <MessageScrollerItem key={m.id} messageId={m.id} scrollAnchor={m.from === "agent"}>
                      <Message align={align}>
                        <MessageContent>
                          <MessageHeader>{m.name}</MessageHeader>
                          <Bubble align={align} variant={m.from === "agent" ? "default" : "secondary"}>
                            <BubbleContent>{m.text}</BubbleContent>
                          </Bubble>
                          <MessageFooter>{m.time}</MessageFooter>
                        </MessageContent>
                      </Message>
                    </MessageScrollerItem>
                  );
                })}
              </MessageScrollerContent>
            </MessageScrollerViewport>
            <MessageScrollerButton />
          </MessageScroller>
        </MessageScrollerProvider>
      </div>
      <div className="flex items-end gap-2 border-t p-3">
        <Textarea
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="輸入回覆內容"
          aria-label="回覆內容"
          className="min-h-10 flex-1"
        />
        <Button onClick={send} disabled={sending || draft.trim() === ""} aria-label="送出回覆">
          <SendIcon data-icon="inline-start" />
          送出
        </Button>
      </div>
    </div>
  );
}
```

附件（上傳中、失敗、完成）用 `Attachment`＋`AttachmentMedia`＋`AttachmentContent`＋`AttachmentTitle`＋`AttachmentDescription`，上傳中的 media 放 `<Spinner />`。日期分隔用 `<Marker variant="separator">11 月 5 日</Marker>`（import 自 `components/marker`）。

## 4. 後台外框：側欄＋內容

重點：`SidebarProvider` 包住 `Sidebar` 與 `SidebarInset`；目前頁面用 `isActive`（淡綠底）；手機自動變抽屜，由 `SidebarTrigger` 開啟。

```tsx
import * as React from "react";
import { BarChart3Icon, InboxIcon, TicketIcon, UsersIcon } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@coss-app/ui/components/sidebar";

const nav = [
  { href: "/inbox", label: "收件匣", icon: InboxIcon, badge: "12" },
  { href: "/analytics", label: "即時統計", icon: BarChart3Icon },
  { href: "/customers", label: "客戶", icon: UsersIcon },
];

export function AppShell({ pathname, children }: { pathname: string; children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-2 px-2 py-1">
            <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <TicketIcon />
            </div>
            <span className="font-semibold">coss 客服</span>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>工作區</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {nav.map(({ href, label, icon: Icon, badge }) => (
                  <SidebarMenuItem key={href}>
                    <SidebarMenuButton isActive={pathname.startsWith(href)} render={<a href={href} />}>
                      <Icon />
                      <span>{label}</span>
                    </SidebarMenuButton>
                    {badge && <SidebarMenuBadge>{badge}</SidebarMenuBadge>}
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <header className="flex h-15 items-center gap-2 px-4">
          <SidebarTrigger />
        </header>
        <main className="flex-1 p-4 md:p-5">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
```

框架路由要用自家的 `Link`：`render={<Link href={href} />}`。

## 5. 非同步操作回饋

重點：按鈕送出中停用，Spinner 延遲顯示（同範本 1 的 `useDelayedFlag`）；結果用 Toast，失敗要給原因；`toast.promise` 一次涵蓋 loading → 成功／失敗。

```tsx
"use client";

import { SendIcon } from "lucide-react";
import { Button } from "@coss-app/ui/components/button";
import { toast } from "@coss-app/ui/components/toast";

export function SendReplyButton({ send }: { send: () => Promise<void> }) {
  return (
    <Button
      onClick={() =>
        toast
          .promise(send(), {
            loading: { title: "寄送回覆中…", type: "loading" },
            success: { title: "回覆已寄出", description: "客戶將收到 Email 通知。", type: "success" },
            error: { title: "寄送失敗", description: "郵件伺服器逾時，請稍後再試。", type: "error" },
          })
          .catch(() => {}) // Toast 已顯示錯誤；避免 unhandled rejection
      }
    >
      <SendIcon data-icon="inline-start" />
      送出回覆
    </Button>
  );
}
```
