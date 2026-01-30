'use client';

import { ModulePageTemplate } from '@/components/module-page-template';
import { BarChart3, FileText, Calendar, TrendingUp } from 'lucide-react';

export default function ThongKeMoiTruongPage() {
  return (
    <ModulePageTemplate
      title="Thống kê Môi trường"
      description="Báo cáo và thống kê môi trường định kỳ"
      gradientColors="from-lime-600 via-green-500 to-emerald-500"
      icon={BarChart3}
      stats={[
        { label: 'Báo cáo tháng', value: 12, color: 'text-blue-600', icon: FileText },
        { label: 'Báo cáo quý', value: 4, color: 'text-purple-600', icon: Calendar },
        { label: 'Chỉ số cải thiện', value: '+12%', color: 'text-green-600', icon: TrendingUp },
        { label: 'Điểm quan trắc', value: 12, color: 'text-amber-600', icon: BarChart3 },
      ]}
      tableHeaders={['Mã BC', 'Loại báo cáo', 'Kỳ', 'Ngày tạo', 'Trạng thái']}
      sampleData={[
        { id: 'BC001', title: 'BC Chất lượng KK', name: 'Tháng 01/2024', status: '05/02/2024', date: 'Đã duyệt' },
        { id: 'BC002', title: 'BC Rác thải Quý I', name: 'Quý I/2024', status: '10/04/2024', date: 'Đã duyệt' },
        { id: 'BC003', title: 'BC Ô nhiễm tháng 2', name: 'Tháng 02/2024', status: '05/03/2024', date: 'Chờ duyệt' },
      ]}
    />
  );
}
