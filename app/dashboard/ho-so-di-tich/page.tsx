'use client';

import { ModulePageTemplate } from '@/components/module-page-template';
import { Landmark, FileText, Clock, CheckCircle2 } from 'lucide-react';

export default function HoSoDiTichPage() {
  return (
    <ModulePageTemplate
      title="Hồ sơ Di tích"
      description="Quản lý di tích lịch sử văn hóa"
      gradientColors="from-amber-600 via-yellow-500 to-orange-500"
      icon={Landmark}
      stats={[
        { label: 'Di tích', value: 12, color: 'text-amber-600', icon: Landmark },
        { label: 'Cấp quốc gia', value: 2, color: 'text-red-600', icon: Landmark },
        { label: 'Cấp tỉnh', value: 5, color: 'text-blue-600', icon: Landmark },
        { label: 'Đang bảo tồn', value: 8, color: 'text-green-600', icon: CheckCircle2 },
      ]}
      tableHeaders={['Mã', 'Tên di tích', 'Cấp', 'Tình trạng', 'Ghi chú']}
      sampleData={[
        { id: 'DT001', title: 'Đình làng', name: 'Cấp tỉnh', status: 'Tốt', date: 'Đang bảo tồn' },
        { id: 'DT002', title: 'Chùa cổ ABC', name: 'Cấp quốc gia', status: 'Tốt', date: 'Tu bổ định kỳ' },
        { id: 'DT003', title: 'Nhà thờ họ XYZ', name: 'Cấp tỉnh', status: 'Cần sửa', date: 'Lập dự án' },
      ]}
    />
  );
}
