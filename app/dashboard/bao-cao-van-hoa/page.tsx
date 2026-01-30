'use client';

import { ModulePageTemplate } from '@/components/module-page-template';
import { FileText, Calendar, CheckCircle2, Clock } from 'lucide-react';

export default function BaoCaoVanHoaPage() {
  return (
    <ModulePageTemplate
      title="Báo cáo Văn hóa"
      description="Báo cáo hoạt động văn hóa văn nghệ định kỳ"
      gradientColors="from-indigo-600 via-purple-500 to-pink-500"
      icon={FileText}
      stats={[
        { label: 'Báo cáo tháng', value: 12, color: 'text-blue-600', icon: FileText },
        { label: 'Báo cáo quý', value: 4, color: 'text-purple-600', icon: Calendar },
        { label: 'Đã hoàn thành', value: 16, color: 'text-green-600', icon: CheckCircle2 },
        { label: 'Đang xử lý', value: 2, color: 'text-amber-600', icon: Clock },
      ]}
      tableHeaders={['Mã', 'Loại báo cáo', 'Kỳ', 'Nội dung', 'Trạng thái']}
      sampleData={[
        { id: 'BC001', title: 'BC tháng 1/2024', name: 'Hoạt động văn hóa', status: 'Tổng hợp', date: 'Hoàn thành' },
        { id: 'BC002', title: 'BC Quý I/2024', name: 'Tổng hợp', status: 'Chi tiết', date: 'Hoàn thành' },
        { id: 'BC003', title: 'BC tháng 2/2024', name: 'Hoạt động văn hóa', status: 'Tổng hợp', date: 'Đang xử lý' },
      ]}
    />
  );
}
