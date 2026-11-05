<!-- 由 scripts/build-manifest.mjs 產生，請勿手改。改組件、story、globals.css 或 component-notes.json 後執行 npm run manifest。 -->

# coss UI 組件索引

對應 `@coss-app/ui` **0.1.2**，共 65 個組件。每個組件的 props 與互動範例以文件站為準（連結在各組件下方）。

引用一律走 `@coss-app/ui/components/<檔名>`；以下 import 為可直接複製的完整匯出清單，只留用到的名稱。

## Inputs（20）

### Button · `button`

按鈕。default＝主要動作（綠、膠囊，一個畫面只放一個）、outline＝次要、secondary＝輔助、neutral＝列表列上的動作、ghost＝圖示鈕、destructive＝刪除、link＝文字連結。

```tsx
import { Button, buttonVariants } from "@coss-app/ui/components/button";
```

`buttonVariants` — variant：**default** · outline · secondary · neutral · ghost · destructive · link；size：**default** · xs · sm · lg · block · icon · icon-xs · icon-sm · icon-lg（粗體為預設）

[文件](https://ui.coss.com.tw/?path=/docs/inputs-button--docs)

### ButtonGroup · `button-group`

把相關按鈕黏成一組（分段操作、輸入框加按鈕）。

```tsx
import {
  ButtonGroup,
  ButtonGroupSeparator,
  ButtonGroupText,
  buttonGroupVariants,
} from "@coss-app/ui/components/button-group";
```

`buttonGroupVariants` — orientation：**horizontal** · vertical（粗體為預設）

[文件](https://ui.coss.com.tw/?path=/docs/inputs-buttongroup--docs)

### Calendar · `calendar`

月曆選日期（單日、區間），日期選中用資訊藍；放在 Popover 內做日期欄位。

```tsx
import { Calendar, CalendarDayButton } from "@coss-app/ui/components/calendar";
```

[文件](https://ui.coss.com.tw/?path=/docs/inputs-calendar--docs)

### Checkbox · `checkbox`

勾選框（資訊藍）；單一選項或多選清單。

```tsx
import { Checkbox } from "@coss-app/ui/components/checkbox";
```

[文件](https://ui.coss.com.tw/?path=/docs/inputs-checkbox--docs)

### Combobox · `combobox`

可輸入搜尋的下拉選單，支援多選晶片；選項很多或需要搜尋時用，取代 Select。

```tsx
import {
  Combobox,
  ComboboxInput,
  ComboboxContent,
  ComboboxList,
  ComboboxItem,
  ComboboxGroup,
  ComboboxLabel,
  ComboboxCollection,
  ComboboxEmpty,
  ComboboxSeparator,
  ComboboxChips,
  ComboboxChip,
  ComboboxChipsInput,
  ComboboxTrigger,
  ComboboxValue,
  useComboboxAnchor,
} from "@coss-app/ui/components/combobox";
```

[文件](https://ui.coss.com.tw/?path=/docs/inputs-combobox--docs)

### Field · `field`

表單欄位排版（Label／Description／Error／FieldSet／FieldGroup），不綁表單函式庫；簡單表單用它。

```tsx
import {
  Field,
  FieldLabel,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldContent,
  FieldTitle,
} from "@coss-app/ui/components/field";
```

`fieldVariants` — orientation：**vertical** · horizontal · responsive（粗體為預設）

[文件](https://ui.coss.com.tw/?path=/docs/inputs-field--docs)

### Form · `form`

react-hook-form 整合（FormField／FormItem／FormControl／FormMessage）；需要 zod 驗證與錯誤顯示時用它。

```tsx
import {
  useFormField,
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormField,
} from "@coss-app/ui/components/form";
```

[文件](https://ui.coss.com.tw/?path=/docs/inputs-form--docs)

### Input · `input`

單行文字輸入框，高 40，淡霧灰底。

```tsx
import { Input } from "@coss-app/ui/components/input";
```

[文件](https://ui.coss.com.tw/?path=/docs/inputs-input--docs)

### InputGroup · `input-group`

輸入框加前後綴（圖示、文字、按鈕）的組合，如搜尋框、金額。

```tsx
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupText,
  InputGroupInput,
  InputGroupTextarea,
} from "@coss-app/ui/components/input-group";
```

`inputGroupAddonVariants` — align：**inline-start** · inline-end · block-start · block-end（粗體為預設）

`inputGroupButtonVariants` — size：**xs** · sm · icon-xs · icon-sm（粗體為預設）

[文件](https://ui.coss.com.tw/?path=/docs/inputs-inputgroup--docs)

### InputOtp · `input-otp`

一次性驗證碼輸入（分格、自動跳格）。

```tsx
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from "@coss-app/ui/components/input-otp";
```

[文件](https://ui.coss.com.tw/?path=/docs/inputs-inputotp--docs)

### Label · `label`

表單標籤，點擊聚焦對應控制項。

```tsx
import { Label } from "@coss-app/ui/components/label";
```

[文件](https://ui.coss.com.tw/?path=/docs/inputs-label--docs)

### NativeSelect · `native-select`

原生 <select>，行動裝置體驗最好且最輕；選項少、不需搜尋時優先。

```tsx
import {
  NativeSelect,
  NativeSelectOptGroup,
  NativeSelectOption,
} from "@coss-app/ui/components/native-select";
```

[文件](https://ui.coss.com.tw/?path=/docs/inputs-nativeselect--docs)

### Questionnaire · `questionnaire`

分步問卷／引導式問答（單選、複選、文字、略過、進度）；滿意度調查。

```tsx
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
```

[文件](https://ui.coss.com.tw/?path=/docs/inputs-questionnaire--docs)

### RadioGroup · `radio-group`

單選群組；選項少且需全部可見時用。

```tsx
import {
  RadioGroup,
  RadioGroupItem,
} from "@coss-app/ui/components/radio-group";
```

[文件](https://ui.coss.com.tw/?path=/docs/inputs-radiogroup--docs)

### Select · `select`

自訂樣式的下拉選單（Base UI）；Root 帶 items（value／label 陣列）才能在 Trigger 顯示標籤；選項多或要搜尋改用 Combobox。

```tsx
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@coss-app/ui/components/select";
```

[文件](https://ui.coss.com.tw/?path=/docs/inputs-select--docs)

### Slider · `slider`

滑桿，單值或區間。

```tsx
import { Slider } from "@coss-app/ui/components/slider";
```

[文件](https://ui.coss.com.tw/?path=/docs/inputs-slider--docs)

### Switch · `switch`

開關，立即生效的設定（啟用、通知）。

```tsx
import { Switch } from "@coss-app/ui/components/switch";
```

[文件](https://ui.coss.com.tw/?path=/docs/inputs-switch--docs)

### Textarea · `textarea`

多行文字輸入框。

```tsx
import { Textarea } from "@coss-app/ui/components/textarea";
```

[文件](https://ui.coss.com.tw/?path=/docs/inputs-textarea--docs)

### Toggle · `toggle`

單一切換按鈕（按下／彈起）。

```tsx
import { Toggle, toggleVariants } from "@coss-app/ui/components/toggle";
```

`toggleVariants` — variant：**default** · outline；size：**default** · sm · lg（粗體為預設）

[文件](https://ui.coss.com.tw/?path=/docs/inputs-toggle--docs)

### ToggleGroup · `toggle-group`

一組可單選或多選的切換按鈕（檢視模式、篩選）。

```tsx
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@coss-app/ui/components/toggle-group";
```

[文件](https://ui.coss.com.tw/?path=/docs/inputs-togglegroup--docs)

## Overlays（11）

### AlertDialog · `alert-dialog`

需要使用者明確確認的中斷式對話框（刪除、結案等不可逆動作）；點遮罩不會關閉。

```tsx
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogOverlay,
  AlertDialogPortal,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@coss-app/ui/components/alert-dialog";
```

[文件](https://ui.coss.com.tw/?path=/docs/overlays-alertdialog--docs)

### Command · `command`

命令面板／搜尋清單（cmdk），可用 CommandDialog 做全域搜尋。

```tsx
import {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
} from "@coss-app/ui/components/command";
```

[文件](https://ui.coss.com.tw/?path=/docs/overlays-command--docs)

### ContextMenu · `context-menu`

右鍵選單；列表列、訊息的快速動作。

```tsx
import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuCheckboxItem,
  ContextMenuRadioItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuGroup,
  ContextMenuPortal,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuRadioGroup,
} from "@coss-app/ui/components/context-menu";
```

[文件](https://ui.coss.com.tw/?path=/docs/overlays-contextmenu--docs)

### Dialog · `dialog`

置中對話框，可含表單（轉派、編輯）；一般任務用，需強制確認用 AlertDialog。

```tsx
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from "@coss-app/ui/components/dialog";
```

[文件](https://ui.coss.com.tw/?path=/docs/overlays-dialog--docs)

### Drawer · `drawer`

可手勢拖曳關閉的底部／側邊抽屜，行動裝置優先；桌面側欄面板用 Sheet。

```tsx
import {
  Drawer,
  DrawerPortal,
  DrawerOverlay,
  DrawerSwipeHandle,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
} from "@coss-app/ui/components/drawer";
```

[文件](https://ui.coss.com.tw/?path=/docs/overlays-drawer--docs)

### DropdownMenu · `dropdown-menu`

點擊觸發的動作選單（含勾選、單選、子選單、快捷鍵）；「更多動作」按鈕。

```tsx
import {
  DropdownMenu,
  DropdownMenuPortal,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from "@coss-app/ui/components/dropdown-menu";
```

[文件](https://ui.coss.com.tw/?path=/docs/overlays-dropdownmenu--docs)

### HoverCard · `hover-card`

滑過連結時浮出的預覽卡（客戶資料摘要）；僅限有滑鼠的裝置，行動裝置看不到。

```tsx
import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from "@coss-app/ui/components/hover-card";
```

[文件](https://ui.coss.com.tw/?path=/docs/overlays-hovercard--docs)

### Menubar · `menubar`

桌面應用風格的橫向選單列。

```tsx
import {
  Menubar,
  MenubarPortal,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarGroup,
  MenubarSeparator,
  MenubarLabel,
  MenubarItem,
  MenubarShortcut,
  MenubarCheckboxItem,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSub,
  MenubarSubTrigger,
  MenubarSubContent,
} from "@coss-app/ui/components/menubar";
```

[文件](https://ui.coss.com.tw/?path=/docs/overlays-menubar--docs)

### Popover · `popover`

點擊觸發的浮動面板，可放表單、日期選擇、篩選條件。

```tsx
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@coss-app/ui/components/popover";
```

[文件](https://ui.coss.com.tw/?path=/docs/overlays-popover--docs)

### Sheet · `sheet`

從螢幕邊緣滑入的側邊面板（編輯、篩選、詳情）；桌面優先，行動手勢用 Drawer。

```tsx
import {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
} from "@coss-app/ui/components/sheet";
```

[文件](https://ui.coss.com.tw/?path=/docs/overlays-sheet--docs)

### Tooltip · `tooltip`

滑過或聚焦時的簡短提示；僅補充說明，不放必要資訊；App 根部建議包一層 TooltipProvider 統一延遲。

```tsx
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@coss-app/ui/components/tooltip";
```

[文件](https://ui.coss.com.tw/?path=/docs/overlays-tooltip--docs)

## Navigation（7）

### Accordion · `accordion`

可展開收合的多段內容，一次只開一段或可多開；用於 FAQ、工單詳情分區。

```tsx
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@coss-app/ui/components/accordion";
```

[文件](https://ui.coss.com.tw/?path=/docs/navigation-accordion--docs)

### Breadcrumb · `breadcrumb`

麵包屑導覽，顯示目前頁面在階層中的位置。

```tsx
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
} from "@coss-app/ui/components/breadcrumb";
```

[文件](https://ui.coss.com.tw/?path=/docs/navigation-breadcrumb--docs)

### Collapsible · `collapsible`

單一區塊的展開／收合，無預設樣式；Accordion 與 Trace 的基礎。

```tsx
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@coss-app/ui/components/collapsible";
```

[文件](https://ui.coss.com.tw/?path=/docs/navigation-collapsible--docs)

### NavigationMenu · `navigation-menu`

網站頂部導覽，含展開的巨型選單。

```tsx
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
  NavigationMenuPositioner,
} from "@coss-app/ui/components/navigation-menu";
```

[文件](https://ui.coss.com.tw/?path=/docs/navigation-navigationmenu--docs)

### Pagination · `pagination`

分頁導覽（上一頁／頁碼／下一頁／省略號／PaginationInfo）。

```tsx
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationInfo,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@coss-app/ui/components/pagination";
```

[文件](https://ui.coss.com.tw/?path=/docs/navigation-pagination--docs)

### Sidebar · `sidebar`

應用程式側邊欄（Provider／Menu／Group／Inset／Trigger／Rail），目前頁面用淡綠底；可收合、行動裝置自動變抽屜。

```tsx
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
  useSidebar,
} from "@coss-app/ui/components/sidebar";
```

`sidebarMenuButtonVariants` — variant：**default** · outline；size：**default** · sm · lg（粗體為預設）

[文件](https://ui.coss.com.tw/?path=/docs/navigation-sidebar--docs)

### Tabs · `tabs`

分頁籤切換同層級內容（line／default 樣式）。

```tsx
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  tabsListVariants,
} from "@coss-app/ui/components/tabs";
```

`tabsListVariants` — variant：**default** · line（粗體為預設）

[文件](https://ui.coss.com.tw/?path=/docs/navigation-tabs--docs)

## Data Display（13）

### AspectRatio · `aspect-ratio`

固定寬高比的容器，用於圖片、影片預覽。

```tsx
import { AspectRatio } from "@coss-app/ui/components/aspect-ratio";
```

[文件](https://ui.coss.com.tw/?path=/docs/data-display-aspectratio--docs)

### Avatar · `avatar`

使用者頭像（圖片或文字後備），含頭像群組、數量與狀態徽章。

```tsx
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarBadge,
} from "@coss-app/ui/components/avatar";
```

[文件](https://ui.coss.com.tw/?path=/docs/data-display-avatar--docs)

### Badge · `badge`

小標籤，表示狀態或分類；variant 對應工單狀態色（待受理＝warning、處理中＝info、已結案＝success、逾期＝destructive）。

```tsx
import { Badge, badgeVariants } from "@coss-app/ui/components/badge";
```

`badgeVariants` — variant：**default** · secondary · info · success · warning · destructive · outline · ghost · link（粗體為預設）

[文件](https://ui.coss.com.tw/?path=/docs/data-display-badge--docs)

### Card · `card`

白色面板容器（Header／Title／Description／Action／Content／Footer）；靠底色差分層，不用陰影。

```tsx
import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
} from "@coss-app/ui/components/card";
```

[文件](https://ui.coss.com.tw/?path=/docs/data-display-card--docs)

### Carousel · `carousel`

可滑動的輪播（Embla），含上一張／下一張按鈕。

```tsx
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  useCarousel,
} from "@coss-app/ui/components/carousel";
```

[文件](https://ui.coss.com.tw/?path=/docs/data-display-carousel--docs)

### Chart · `chart`

Recharts 圖表外殼：套用色票 --chart-1～5、Tooltip 與 Legend 樣式。

```tsx
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  ChartStyle,
} from "@coss-app/ui/components/chart";
```

[文件](https://ui.coss.com.tw/?path=/docs/data-display-chart--docs)

### CodeBlock · `code-block`

程式碼區塊，含標題列、複製按鈕、行號與高亮（Shiki）；錯誤輸出可用 destructive。

```tsx
import {
  CodeBlock,
  CodeBlockHeader,
  CodeBlockTitle,
  CodeBlockActions,
  CodeBlockCopyButton,
  CodeBlockContent,
  CodeBlockLine,
  CodeBlockFooter,
} from "@coss-app/ui/components/code-block";
```

`codeBlockVariants` — variant：**default** · destructive（粗體為預設）

`codeBlockLineVariants` — variant：**default** · added · removed · highlighted（粗體為預設）

[文件](https://ui.coss.com.tw/?path=/docs/data-display-codeblock--docs)

### Empty · `empty`

空狀態：圖示或頭像、標題、說明與行動按鈕（無工單、搜尋無結果）。

```tsx
import {
  Empty,
  EmptyHeader,
  EmptyTitle,
  EmptyDescription,
  EmptyContent,
  EmptyMedia,
} from "@coss-app/ui/components/empty";
```

`emptyMediaVariants` — variant：**default** · icon（粗體為預設）

[文件](https://ui.coss.com.tw/?path=/docs/data-display-empty--docs)

### Item · `item`

通用列表項目（Media／Content／Title／Description／Actions），比 Card 輕量；設定列、清單。

```tsx
import {
  Item,
  ItemMedia,
  ItemContent,
  ItemActions,
  ItemGroup,
  ItemSeparator,
  ItemTitle,
  ItemDescription,
  ItemHeader,
  ItemFooter,
} from "@coss-app/ui/components/item";
```

`itemVariants` — variant：**default** · outline · muted；size：**default** · sm · xs（粗體為預設）

`itemMediaVariants` — variant：**default** · icon · image（粗體為預設）

[文件](https://ui.coss.com.tw/?path=/docs/data-display-item--docs)

### Kbd · `kbd`

鍵盤按鍵標示（Kbd、KbdGroup）。

```tsx
import { Kbd, KbdGroup } from "@coss-app/ui/components/kbd";
```

[文件](https://ui.coss.com.tw/?path=/docs/data-display-kbd--docs)

### Marker · `marker`

對話中的分隔標記（日期分隔、「以下為新訊息」）。

```tsx
import {
  Marker,
  MarkerIcon,
  MarkerContent,
  markerVariants,
} from "@coss-app/ui/components/marker";
```

`markerVariants` — variant：default · separator · border（粗體為預設）

[文件](https://ui.coss.com.tw/?path=/docs/data-display-marker--docs)

### Table · `table`

資料表格（Header／Body／Footer／Caption／Row／Head／Cell）；選取列用 data-state="selected"。

```tsx
import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
} from "@coss-app/ui/components/table";
```

[文件](https://ui.coss.com.tw/?path=/docs/data-display-table--docs)

### Trace · `trace`

可展開的處理紀錄（時間軸式步驟與細節），如工單處理歷程、AI 思考過程。

```tsx
import {
  Trace,
  TraceLine,
  TraceIcon,
  TraceTitle,
  TraceDescription,
  TraceCollapsible,
  TraceCollapsibleTrigger,
  TraceCollapsibleContent,
} from "@coss-app/ui/components/trace";
```

[文件](https://ui.coss.com.tw/?path=/docs/data-display-trace--docs)

## Feedback（6）

### Alert · `alert`

頁面內的提示列（資訊／成功／警示／錯誤），不會浮起；可附標題、說明與動作按鈕。

```tsx
import {
  Alert,
  AlertTitle,
  AlertDescription,
  AlertAction,
} from "@coss-app/ui/components/alert";
```

`alertVariants` — variant：**default** · success · warning · destructive（粗體為預設）

[文件](https://ui.coss.com.tw/?path=/docs/feedback-alert--docs)

### Progress · `progress`

進度條（品牌綠），可附標籤與數值。

```tsx
import {
  Progress,
  ProgressTrack,
  ProgressIndicator,
  ProgressLabel,
  ProgressValue,
} from "@coss-app/ui/components/progress";
```

[文件](https://ui.coss.com.tw/?path=/docs/feedback-progress--docs)

### Skeleton · `skeleton`

載入中的骨架佔位。

```tsx
import { Skeleton } from "@coss-app/ui/components/skeleton";
```

[文件](https://ui.coss.com.tw/?path=/docs/feedback-skeleton--docs)

### Sonner · `sonner`

Sonner 版 Toast（命令式 toast.success(...)）；與 toast.tsx 二擇一，不要同時掛兩個 Toaster。

```tsx
import { Toaster } from "@coss-app/ui/components/sonner";
```

[文件](https://ui.coss.com.tw/?path=/docs/feedback-sonner--docs)

### Spinner · `spinner`

載入旋轉圖示；按鈕內用 data-icon="inline-start"。

```tsx
import { Spinner } from "@coss-app/ui/components/spinner";
```

[文件](https://ui.coss.com.tw/?path=/docs/feedback-spinner--docs)

### Toast · `toast`

Base UI 版 Toast：外層包 <Toaster>，以 toast.add({ title, type }) 觸發，支援 loading／promise；與 sonner.tsx 二擇一。

```tsx
import {
  Toaster,
  Toast,
  ToastAction,
  ToastClose,
  ToastContent,
  ToastDescription,
  ToastPortal,
  ToastProvider,
  ToastTitle,
  ToastViewport,
  createToastManager,
  toast,
  useToastManager,
} from "@coss-app/ui/components/toast";
```

[文件](https://ui.coss.com.tw/?path=/docs/feedback-toast--docs)

## Messaging（4）

### Attachment · `attachment`

附件卡片（檔名、大小、上傳狀態、重試／移除動作）；對話與表單的檔案列。

```tsx
import {
  Attachment,
  AttachmentGroup,
  AttachmentMedia,
  AttachmentContent,
  AttachmentTitle,
  AttachmentDescription,
  AttachmentActions,
  AttachmentAction,
  AttachmentTrigger,
} from "@coss-app/ui/components/attachment";
```

`attachmentVariants` — size：default · sm · xs；orientation：horizontal · vertical（粗體為預設）

`attachmentMediaVariants` — variant：**icon** · image（粗體為預設）

[文件](https://ui.coss.com.tw/?path=/docs/messaging-attachment--docs)

### Bubble · `bubble`

對話氣泡（default／secondary／ghost），可附表情反應；搭配 Message 使用。

```tsx
import {
  BubbleGroup,
  Bubble,
  BubbleContent,
  BubbleReactions,
} from "@coss-app/ui/components/bubble";
```

`bubbleVariants` — variant：**default** · secondary · muted · tinted · outline · ghost · destructive（粗體為預設）

`bubbleReactionsVariants` — side：top · **bottom**；align：start · **end**（粗體為預設）

[文件](https://ui.coss.com.tw/?path=/docs/messaging-bubble--docs)

### Message · `message`

對話訊息排版（頭像、標頭、內容、頁尾），align 決定左右；內容放 Bubble。

```tsx
import {
  MessageGroup,
  Message,
  MessageAvatar,
  MessageContent,
  MessageFooter,
  MessageHeader,
} from "@coss-app/ui/components/message";
```

[文件](https://ui.coss.com.tw/?path=/docs/messaging-message--docs)

### MessageScroller · `message-scroller`

對話捲動容器：新訊息自動捲到底、回到底部／頂部按鈕、錨點；聊天室核心。

```tsx
import {
  MessageScrollerProvider,
  MessageScroller,
  MessageScrollerViewport,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerButton,
  useMessageScroller,
  useMessageScrollerScrollable,
  useMessageScrollerVisibility,
} from "@coss-app/ui/components/message-scroller";
```

[文件](https://ui.coss.com.tw/?path=/docs/messaging-messagescroller--docs)

## Layout（4）

### Direction · `direction`

設定 LTR／RTL 方向的 Provider 與 hook（useDirection）。

```tsx
import {
  DirectionProvider,
  useDirection,
} from "@coss-app/ui/components/direction";
```

[文件](https://ui.coss.com.tw/?path=/docs/layout-direction--docs)

### Resizable · `resizable`

可拖曳調整寬度或高度的分割面板。

```tsx
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@coss-app/ui/components/resizable";
```

[文件](https://ui.coss.com.tw/?path=/docs/layout-resizable--docs)

### ScrollArea · `scroll-area`

自訂捲軸的捲動區域。

```tsx
import { ScrollArea, ScrollBar } from "@coss-app/ui/components/scroll-area";
```

[文件](https://ui.coss.com.tw/?path=/docs/layout-scrollarea--docs)

### Separator · `separator`

分隔線，水平或垂直。

```tsx
import { Separator } from "@coss-app/ui/components/separator";
```

[文件](https://ui.coss.com.tw/?path=/docs/layout-separator--docs)
