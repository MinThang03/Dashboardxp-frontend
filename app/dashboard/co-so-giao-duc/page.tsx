'use client';

import { ModulePageTemplate } from '@/components/module-page-template';
import { Building2, CheckCircle2, AlertTriangle, TrendingUp } from 'lucide-react';

export default function CoSoGiaoDucPage() {
  return (
    <ModulePageTemplate
      title="Cơ sở vật chất Giáo dục"
      description="Quản lý phòng học, thiết bị dạy học"
      gradientColors="from-cyan-600 via-blue-500 to-indigo-500"
      icon={Building2}
      stats={[
        { label: 'Phòng học', value: 148, color: 'text-blue-600', icon: Building2 },
        { label: 'Tốt', value: 132, color: 'text-green-600', icon: CheckCircle2 },
        { label: 'Cần sửa chữa', value: 16, color: 'text-amber-600', icon: AlertTriangle },
        { label: 'Tỷ lệ đạt chuẩn', value: '89%', color: 'text-green-600', icon: TrendingUp },
      ]}
      tableHeaders={['Trường', 'Số phòng', 'Tình trạng', 'Thiết bị', 'Ghi chú']}
      sampleData={[
        { id: 'CS001', title: 'TH Nguyễn Trãi', name: '24 phòng', status: 'Tốt', date: 'Đầy đủ' },
        { id: 'CS002', title: 'MN Hoa Mai', name: '12 phòng', status: 'Cần sửa', date: 'Thiếu' },
        { id: 'CS003', title: 'TH Lê Quý Đôn', name: '28 phòng', status: 'Tốt', date: 'Đầy đủ' },
      ]}
    />
  );
}
