'use client';

import { ModulePageTemplate } from '@/components/module-page-template';
import { BarChart3, TrendingUp, Coins, Store } from 'lucide-react';

export default function ThongKeKinhTePage() {
  return (
    <ModulePageTemplate
      title="Thống kê Kinh tế"
      description="Báo cáo hoạt động kinh tế định kỳ"
      gradientColors="from-purple-600 via-indigo-500 to-blue-500"
      icon={BarChart3}
      stats={[
        { label: 'Tổng doanh thu', value: '125 tỷ', color: 'text-green-600', icon: Coins },
        { label: 'Hộ KD', value: 156, color: 'text-blue-600', icon: Store },
        { label: 'Tăng trưởng', value: '+12.5%', color: 'text-green-600', icon: TrendingUp },
        { label: 'Báo cáo tháng', value: 12, color: 'text-purple-600', icon: BarChart3 },
      ]}
      tableHeaders={['Kỳ', 'Loại báo cáo', 'Giá trị', 'So sánh', 'Ngày BC']}
      sampleData={[
        { id: 'TK001', title: 'Tháng 1/2024', name: 'Doanh thu', status: '10.2 tỷ', date: '+8%' },
        { id: 'TK002', title: 'Quý I/2024', name: 'Tổng hợp', status: '28.5 tỷ', date: '+12%' },
      ]}
    />
  );
}
