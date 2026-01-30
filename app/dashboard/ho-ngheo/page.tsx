'use client';

import { ModulePageTemplate } from '@/components/module-page-template';
import { Heart, Users, Award, TrendingDown } from 'lucide-react';

export default function HoNgheoPage() {
  return (
    <ModulePageTemplate
      title="Quản lý Hộ nghèo - Cận nghèo"
      description="Rà soát, quản lý hộ nghèo, hộ cận nghèo"
      gradientColors="from-pink-600 via-rose-500 to-red-500"
      icon={Heart}
      stats={[
        { label: 'Hộ nghèo', value: 45, color: 'text-red-600', icon: Users },
        { label: 'Hộ cận nghèo', value: 32, color: 'text-amber-600', icon: Users },
        { label: 'Đã thoát nghèo', value: 18, color: 'text-green-600', icon: Award },
        { label: 'Giảm so với năm trước', value: '12%', color: 'text-green-600', icon: TrendingDown },
      ]}
      sampleData={[
        { id: 'HN001', title: 'Hộ Nguyễn Văn A', status: 'Hộ nghèo', date: '2024-01-01' },
        { id: 'CN001', title: 'Hộ Trần Thị B', status: 'Cận nghèo', date: '2024-01-01' },
      ]}
    />
  );
}
