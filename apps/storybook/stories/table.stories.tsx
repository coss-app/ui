import type { Meta, StoryObj } from "@storybook/react-vite";
import { MoreHorizontalIcon } from "lucide-react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@coss-app/ui/components/table";
import { Badge } from "@coss-app/ui/components/badge";
import { Button } from "@coss-app/ui/components/button";
import { Checkbox } from "@coss-app/ui/components/checkbox";

type Status = "待受理" | "處理中" | "已結案" | "逾期";

const tickets: { id: string; subject: string; customer: string; status: Status; agent: string; updated: string }[] = [
  { id: "#1024", subject: "無法登入會員帳號", customer: "王小明", status: "處理中", agent: "林雅婷", updated: "10:24" },
  { id: "#1025", subject: "訂單重複扣款", customer: "陳怡君", status: "待受理", agent: "—", updated: "09:58" },
  { id: "#1026", subject: "發票抬頭需更正", customer: "張志豪", status: "已結案", agent: "黃建宏", updated: "昨天" },
  { id: "#1027", subject: "商品到貨破損", customer: "李佳穎", status: "逾期", agent: "林雅婷", updated: "11/01" },
  { id: "#1028", subject: "修改配送地址", customer: "吳宗翰", status: "處理中", agent: "黃建宏", updated: "08:12" },
];

const statusVariant: Record<Status, "info" | "warning" | "success" | "destructive"> = {
  待受理: "warning",
  處理中: "info",
  已結案: "success",
  逾期: "destructive",
};

const meta = {
  title: "Data Display/Table",
  component: Table,
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Table>
      <TableCaption>最近更新的 5 筆客服工單</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>工單編號</TableHead>
          <TableHead>主旨</TableHead>
          <TableHead>客戶</TableHead>
          <TableHead>狀態</TableHead>
          <TableHead>負責人</TableHead>
          <TableHead className="text-right">更新時間</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tickets.map((t) => (
          <TableRow key={t.id}>
            <TableCell className="font-semibold">{t.id}</TableCell>
            <TableCell>{t.subject}</TableCell>
            <TableCell>{t.customer}</TableCell>
            <TableCell>
              <Badge variant={statusVariant[t.status]}>{t.status}</Badge>
            </TableCell>
            <TableCell>{t.agent}</TableCell>
            <TableCell className="text-right text-placeholder">{t.updated}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
};

export const WithFooter: Story = {
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>客服人員</TableHead>
          <TableHead className="text-right">受理</TableHead>
          <TableHead className="text-right">結案</TableHead>
          <TableHead className="text-right">平均回覆</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="font-semibold">林雅婷</TableCell>
          <TableCell className="text-right">42</TableCell>
          <TableCell className="text-right">38</TableCell>
          <TableCell className="text-right">12 分鐘</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-semibold">黃建宏</TableCell>
          <TableCell className="text-right">35</TableCell>
          <TableCell className="text-right">33</TableCell>
          <TableCell className="text-right">9 分鐘</TableCell>
        </TableRow>
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell>合計</TableCell>
          <TableCell className="text-right">77</TableCell>
          <TableCell className="text-right">71</TableCell>
          <TableCell className="text-right">10.6 分鐘</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  ),
};

export const SelectableRows: Story = {
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-10">
            <Checkbox aria-label="全選" />
          </TableHead>
          <TableHead>工單編號</TableHead>
          <TableHead>主旨</TableHead>
          <TableHead>狀態</TableHead>
          <TableHead className="w-12" />
        </TableRow>
      </TableHeader>
      <TableBody>
        {tickets.map((t, i) => (
          <TableRow key={t.id} data-state={i === 1 ? "selected" : undefined}>
            <TableCell>
              <Checkbox aria-label={`選取 ${t.id}`} defaultChecked={i === 1} />
            </TableCell>
            <TableCell className="font-semibold">{t.id}</TableCell>
            <TableCell>{t.subject}</TableCell>
            <TableCell>
              <Badge variant={statusVariant[t.status]}>{t.status}</Badge>
            </TableCell>
            <TableCell>
              <Button variant="ghost" size="icon-sm" aria-label="更多動作">
                <MoreHorizontalIcon />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
};

export const Empty: Story = {
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>工單編號</TableHead>
          <TableHead>主旨</TableHead>
          <TableHead>狀態</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell colSpan={3} className="h-24 text-center text-muted-foreground">
            目前沒有符合條件的工單
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
};
