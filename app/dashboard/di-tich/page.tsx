'use client';

import { ModulePageTemplate } from '@/components/module-page-template';
import { Landmark, FileText, Calendar, Users } from 'lucide-react';

export default function DiTichPage() {
  return (
    <ModulePageTemplate
      title="Quản lý Di tích"
      description="Bảo tồn và quản lý di tích văn hóa"
      gradientColors="from-amber-600 via-yellow-500 to-orange-500"
      icon={Landmark}
      stats={[
        { label: 'Tổng di tích', value: 8, color: 'text-amber-600', icon: Landmark },
        { label: 'Cấp quốc gia', value: 2, color: 'text-red-600', icon: FileText },
        { label: 'Cấp tỉnh', value: 6, color: 'text-blue-600', icon: FileText },
        { label: 'Lượt khách/tháng', value: '1.2K', color: 'text-green-600', icon: Users },
      ]}
      sampleData={[
        { id: 'DT001', title: 'Đền thờ XYZ', status: 'Cấp quốc gia', date: '1850' },
        { id: 'DT002', title: 'Chùa ABC', status: 'Cấp tỉnh', date: '1920' },
      ]}
    />
  );
}
