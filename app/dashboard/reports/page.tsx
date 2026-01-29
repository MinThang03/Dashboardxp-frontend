'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, Calendar } from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

const reportData = [
  { month: 'T1', completed: 240, pending: 60, overdue: 30 },
  { month: 'T2', completed: 280, pending: 50, overdue: 25 },
  { month: 'T3', completed: 320, pending: 40, overdue: 20 },
  { month: 'T4', completed: 310, pending: 45, overdue: 22 },
  { month: 'T5', completed: 350, pending: 35, overdue: 18 },
  { month: 'T6', completed: 380, pending: 30, overdue: 15 },
];

// Dữ liệu so sánh cùng kỳ các năm
const yearComparisonData = [
  { period: 'T1', '2022': 210, '2023': 225, '2024': 240 },
  { period: 'T2', '2022': 250, '2023': 265, '2024': 280 },
  { period: 'T3', '2022': 290, '2023': 305, '2024': 320 },
  { period: 'T4', '2022': 280, '2023': 295, '2024': 310 },
  { period: 'T5', '2022': 320, '2023': 335, '2024': 350 },
  { period: 'T6', '2022': 350, '2023': 365, '2024': 380 },
];

const detailedReportData = {
  totalCases: {
    current: 1880,
    previous: 1730,
    change: 8.7,
  },
  completed: {
    current: 1880,
    previous: 1730,
    change: 8.7,
  },
  averageProcessingDays: {
    current: 12.5,
    previous: 14.2,
    change: -12.0,
  },
  satisfactionRate: {
    current: 94.5,
    previous: 92.1,
    change: 2.6,
  },
};

const departmentData = [
  { name: 'Tư pháp', value: 450, color: '#5544aa' },
  { name: 'Địa chính', value: 580, color: '#a4b9d4' },
  { name: 'An ninh', value: 320, color: '#ff6b6b' },
  { name: 'Lao động', value: 280, color: '#4ecdc4' },
  { name: 'Tài chính', value: 240, color: '#95e1d3' },
];

export default function ReportsPage() {
  const [isCustomReportOpen, setIsCustomReportOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">
          Báo cáo & Phân tích
        </h1>
        <p className="text-muted-foreground mt-1">
          Báo cáo tổng hợp, BI dashboards và xuất dữ liệu
        </p>
      </div>

      {/* Report Selection */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { title: 'Báo cáo tháng', period: 'Tháng này' },
          { title: 'Báo cáo quý', period: 'Quý này' },
          { title: 'Báo cáo năm', period: 'Năm này' },
        ].map((report, i) => (
          <Card key={i} className="bg-card border-border p-6 cursor-pointer hover:border-primary/50 transition">
            <h3 className="font-semibold text-foreground mb-2">{report.title}</h3>
            <p className="text-sm text-muted-foreground mb-4">{report.period}</p>
            <Button variant="outline" className="w-full border-border bg-transparent" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Xuất PDF
            </Button>
          </Card>
        ))}
      </div>

      {/* Detailed Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {Object.entries(detailedReportData).map(([key, data]) => (
          <Card key={key} className="bg-card border-border p-4">
            <p className="text-xs text-muted-foreground mb-1">
              {key === 'totalCases'
                ? 'Tổng số hồ sơ'
                : key === 'completed'
                  ? 'Đã hoàn thành'
                  : key === 'averageProcessingDays'
                    ? 'Thời gian xử lý TB (ngày)'
                    : 'Tỷ lệ hài lòng (%)'}
            </p>
            <div className="flex items-baseline justify-between">
              <p className="text-2xl font-bold text-foreground">{data.current}</p>
              <span
                className={`text-xs font-semibold ${
                  data.change >= 0 ? 'text-status-success' : 'text-status-danger'
                }`}
              >
                {data.change >= 0 ? '+' : ''}
                {data.change}%
              </span>
            </div>
            <p className="text-[11px] text-muted-foreground mt-1">
              Cùng kỳ năm trước: {data.previous}
            </p>
          </Card>
        ))}
      </div>

      {/* Case Processing Chart */}
      <Card className="bg-card border-border p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Tổng quan xử lý hồ sơ (6 tháng đầu năm)
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={reportData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="month" stroke="#6b7280" />
            <YAxis stroke="#6b7280" />
            <Tooltip
              contentStyle={{
                backgroundColor: '#ffffff',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
              }}
              labelStyle={{ color: '#1f2937' }}
            />
            <Legend />
            <Bar dataKey="completed" fill="#4ade80" name="Hoàn thành" radius={[4, 4, 0, 0]} />
            <Bar dataKey="pending" fill="#f97316" name="Chờ xử lý" radius={[4, 4, 0, 0]} />
            <Bar dataKey="overdue" fill="#ef4444" name="Trễ hạn" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      {/* Year Comparison Chart */}
      <Card className="bg-card border-border p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          So sánh cùng kỳ các năm (Hồ sơ hoàn thành)
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={yearComparisonData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="period" stroke="#6b7280" />
            <YAxis stroke="#6b7280" />
            <Tooltip
              contentStyle={{
                backgroundColor: '#ffffff',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
              }}
              labelStyle={{ color: '#1f2937' }}
            />
            <Legend />
            <Bar dataKey="2022" fill="#94a3b8" name="Năm 2022" radius={[4, 4, 0, 0]} />
            <Bar dataKey="2023" fill="#64748b" name="Năm 2023" radius={[4, 4, 0, 0]} />
            <Bar dataKey="2024" fill="#0ea5e9" name="Năm 2024" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      {/* Department Distribution */}
      <Card className="bg-card border-border p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Phân bố hồ sơ theo bộ phận
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={departmentData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={(entry) => `${entry.name} (${entry.value})`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {departmentData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: '#1a1a2e',
                border: '1px solid #2a2a3e',
                borderRadius: '8px',
              }}
              labelStyle={{ color: '#f3f4f6' }}
            />
          </PieChart>
        </ResponsiveContainer>
      </Card>

      {/* Export Options */}
      <div className="sticky top-[72px] z-20">
        <div className="ml-auto w-fit rounded-full border border-primary/30 bg-card/95 backdrop-blur px-2 py-2 shadow-lg">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-primary px-2">
              Xuất nhanh
            </span>
            <div className="h-5 w-px bg-border" />
            <Button size="sm" variant="ghost" className="h-8 px-2 text-xs hover:bg-primary/10">
              <Download className="w-3 h-3 mr-1" />
              PDF
            </Button>
            <Button size="sm" variant="ghost" className="h-8 px-2 text-xs hover:bg-primary/10">
              <Download className="w-3 h-3 mr-1" />
              Excel
            </Button>
            <Button size="sm" variant="ghost" className="h-8 px-2 text-xs hover:bg-primary/10">
              <Download className="w-3 h-3 mr-1" />
              CSV
            </Button>
          </div>
        </div>
      </div>

      {/* Date Range Picker */}
      <Card className="bg-card border-border p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Báo cáo tùy chỉnh
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-foreground block mb-2 flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Từ ngày
            </label>
            <input
              type="date"
              className="w-full px-3 py-2 bg-input border border-border rounded-md text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground block mb-2 flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Đến ngày
            </label>
            <input
              type="date"
              className="w-full px-3 py-2 bg-input border border-border rounded-md text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>
        <div className="mt-4 flex gap-3">
          <Button
            className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
            onClick={() => setIsCustomReportOpen(true)}
          >
            Tạo báo cáo
          </Button>
          <Button variant="outline" className="flex-1 border-border bg-transparent">
            Hủy
          </Button>
        </div>
      </Card>

      {/* Custom report form dialog */}
      <Dialog open={isCustomReportOpen} onOpenChange={setIsCustomReportOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Tạo báo cáo tùy chỉnh</DialogTitle>
            <DialogDescription>
              Nhập thông tin chi tiết báo cáo để gửi cho lãnh đạo hoặc xuất file.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3 text-sm">
            <div>
              <p className="text-xs font-medium text-muted-foreground mb-1">Tiêu đề báo cáo</p>
              <input
                className="w-full px-3 py-2 bg-input border border-border rounded-md text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Ví dụ: Báo cáo tổng hợp tình hình giải quyết hồ sơ tháng 1/2024"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-xs font-medium text-muted-foreground mb-1">Kỳ báo cáo</p>
                <select className="w-full px-3 py-2 bg-input border border-border rounded-md text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary">
                  <option>Tháng</option>
                  <option>Quý</option>
                  <option>Năm</option>
                  <option>Tuỳ chỉnh</option>
                </select>
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground mb-1">Định dạng</p>
                <select className="w-full px-3 py-2 bg-input border border-border rounded-md text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary">
                  <option>PDF</option>
                  <option>Excel</option>
                  <option>CSV</option>
                </select>
              </div>
            </div>
            <div>
              <p className="text-xs font-medium text-muted-foreground mb-1">Ghi chú / Nội dung tóm tắt</p>
              <textarea
                rows={3}
                className="w-full px-3 py-2 bg-input border border-border rounded-md text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Mô tả ngắn mục đích, nội dung chính của báo cáo..."
              />
            </div>
            <div>
              <p className="text-xs font-medium text-muted-foreground mb-1">Tệp tài liệu đính kèm</p>
              <input
                type="file"
                multiple
                className="block w-full text-xs text-muted-foreground file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:bg-primary/10 file:text-primary hover:file:bg-primary/20 cursor-pointer"
              />
              <p className="mt-1 text-[11px] text-muted-foreground">
                Có thể chọn nhiều tệp (PDF, Word, Excel...) để gửi kèm báo cáo.
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button
              className="bg-primary text-primary-foreground hover:bg-primary/90"
              onClick={() => setIsCustomReportOpen(false)}
            >
              Lưu & tạo báo cáo
            </Button>
            <Button variant="outline" onClick={() => setIsCustomReportOpen(false)}>
              Hủy
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
