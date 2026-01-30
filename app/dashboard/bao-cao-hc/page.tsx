'use client';

import { ModulePageTemplate } from '@/components/module-page-template';
import { BarChart3, TrendingUp, FileText, Calendar } from 'lucide-react';

export default function BaoCaoHCPage() {
  return (
    <ModulePageTemplate
      title="Báo cáo Hành chính"
      description="Thống kê và báo cáo định kỳ hoạt động hành chính"
      gradientColors="from-purple-600 via-indigo-500 to-blue-500"
      icon={BarChart3}
      stats={[
        { label: 'Báo cáo tháng', value: 12, color: 'text-blue-600', icon: FileText },
        { label: 'Báo cáo quý', value: 4, color: 'text-green-600', icon: Calendar },
        { label: 'Báo cáo năm', value: 1, color: 'text-purple-600', icon: BarChart3 },
        { label: 'Tăng trưởng', value: '+8.5%', color: 'text-green-600', icon: TrendingUp },
      ]}
      tableHeaders={['Mã BC', 'Tên báo cáo', 'Loại', 'Kỳ báo cáo', 'Ngày nộp']}
      sampleData={[
        { id: 'BC001', title: 'Báo cáo TTHC tháng 1', name: 'Báo cáo tháng', status: 'Đã nộp', date: '2024-01-31' },
        { id: 'BC002', title: 'Tổng hợp hộ tịch Q1', name: 'Báo cáo quý', status: 'Đang soạn', date: '2024-03-31' },
      ]}
    />
  );
}
