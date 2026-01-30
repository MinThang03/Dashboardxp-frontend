'use client';

import { ModulePageTemplate } from '@/components/module-page-template';
import { Store, Users, TrendingUp, BarChart3 } from 'lucide-react';

export default function HoKinhDoanhPage() {
  return (
    <ModulePageTemplate
      title="Quản lý Hộ kinh doanh"
      description="Đăng ký, quản lý hộ kinh doanh cá thể"
      gradientColors="from-green-600 via-emerald-500 to-teal-500"
      icon={Store}
      stats={[
        { label: 'Tổng hộ KD', value: 156, color: 'text-green-600', icon: Store },
        { label: 'Hoạt động', value: 142, color: 'text-blue-600', icon: Users },
        { label: 'Mới đăng ký', value: 12, color: 'text-amber-600', icon: TrendingUp },
        { label: 'Tổng doanh thu', value: '2.5 tỷ', color: 'text-purple-600', icon: BarChart3 },
      ]}
      sampleData={[
        { id: 'HKD001', title: 'Tạp hóa Bà Hương', status: 'Hoạt động', date: '2024-01-10' },
        { id: 'HKD002', title: 'Quán cơm Anh Tuấn', status: 'Hoạt động', date: '2024-01-15' },
      ]}
    />
  );
}
