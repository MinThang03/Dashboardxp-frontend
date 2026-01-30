'use client';

import { ModulePageTemplate } from '@/components/module-page-template';
import { FileText, Download, Calendar, CheckCircle2 } from 'lucide-react';

export default function BaoCaoDatDaiPage() {
  return (
    <ModulePageTemplate
      title="Xuất Báo cáo Đất đai"
      description="Tạo và xuất báo cáo đất đai định kỳ"
      gradientColors="from-teal-600 via-cyan-500 to-blue-500"
      icon={FileText}
      stats={[
        { label: 'Báo cáo tháng', value: 12, color: 'text-blue-600', icon: FileText },
        { label: 'Báo cáo quý', value: 4, color: 'text-purple-600', icon: Calendar },
        { label: 'Đã phê duyệt', value: 16, color: 'text-green-600', icon: CheckCircle2 },
        { label: 'Lượt tải xuống', value: 234, color: 'text-amber-600', icon: Download },
      ]}
      tableHeaders={['Mã BC', 'Loại báo cáo', 'Kỳ báo cáo', 'Ngày tạo', 'Trạng thái']}
      sampleData={[
        { id: 'BC001', title: 'BC Biến động đất tháng 1', name: 'Tháng 01/2024', status: 'Đã duyệt', date: '05/02/2024' },
        { id: 'BC002', title: 'BC Cấp sổ Quý I', name: 'Quý I/2024', status: 'Đã duyệt', date: '10/04/2024' },
        { id: 'BC003', title: 'BC Tranh chấp tháng 2', name: 'Tháng 02/2024', status: 'Chờ duyệt', date: '05/03/2024' },
      ]}
    />
  );
}
