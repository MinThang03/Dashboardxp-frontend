'use client';

import { ModulePageTemplate } from '@/components/module-page-template';
import { Users, TrendingUp, TrendingDown, BarChart3 } from 'lucide-react';

export default function SiSoHocSinhPage() {
  return (
    <ModulePageTemplate
      title="Sĩ số Học sinh"
      description="Theo dõi sĩ số, tỷ lệ đến lớp học sinh"
      gradientColors="from-blue-600 via-indigo-500 to-purple-500"
      icon={Users}
      stats={[
        { label: 'Tổng học sinh', value: 2845, color: 'text-blue-600', icon: Users },
        { label: 'Có mặt hôm nay', value: 2801, color: 'text-green-600', icon: TrendingUp },
        { label: 'Vắng mặt', value: 44, color: 'text-red-600', icon: TrendingDown },
        { label: 'Tỷ lệ đi học', value: '98.5%', color: 'text-green-600', icon: BarChart3 },
      ]}
      tableHeaders={['Lớp', 'Sĩ số', 'Có mặt', 'Vắng', 'Tỷ lệ %']}
      sampleData={[
        { id: 'L1A', title: 'Lớp 1A - TH Nguyễn Trãi', name: '35', status: '34', date: '97.1%' },
        { id: 'L2B', title: 'Lớp 2B - TH Nguyễn Trãi', name: '38', status: '38', date: '100%' },
        { id: 'MN1', title: 'Lớp Chồi - MN Hoa Mai', name: '25', status: '24', date: '96%' },
      ]}
    />
  );
}
