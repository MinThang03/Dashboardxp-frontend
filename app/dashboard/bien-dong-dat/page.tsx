'use client';

import { ModulePageTemplate } from '@/components/module-page-template';
import { Activity, TrendingUp, AlertCircle, BarChart3 } from 'lucide-react';

export default function BienDongDatPage() {
  return (
    <ModulePageTemplate
      title="Theo dõi Biến động Sử dụng Đất"
      description="Quản lý chuyển đổi mục đích sử dụng đất"
      gradientColors="from-emerald-600 via-teal-500 to-cyan-500"
      icon={Activity}
      stats={[
        { label: 'Biến động tháng', value: 45, color: 'text-teal-600', icon: Activity },
        { label: 'Chuyển đổi MPSD', value: 23, color: 'text-blue-600', icon: TrendingUp },
        { label: 'Chờ phê duyệt', value: 12, color: 'text-amber-600', icon: AlertCircle },
        { label: 'Đã phê duyệt', value: 33, color: 'text-green-600', icon: BarChart3 },
      ]}
      tableHeaders={['Mã', 'Thửa đất', 'Loại biến động', 'Diện tích', 'Trạng thái']}
      sampleData={[
        { id: 'BD001', title: 'Thửa 123, tờ 45', name: 'Chuyển thổ cư', status: '250m²', date: 'Đã duyệt' },
        { id: 'BD002', title: 'Thửa 456, tờ 67', name: 'Tách thửa', status: '180m²', date: 'Chờ duyệt' },
        { id: 'BD003', title: 'Thửa 789, tờ 89', name: 'Gộp thửa', status: '500m²', date: 'Đang xử lý' },
      ]}
    />
  );
}
