'use client';

import { ModulePageTemplate } from '@/components/module-page-template';
import { BarChart3, TrendingUp, TrendingDown, AlertCircle } from 'lucide-react';

export default function SoSanhDuToanPage() {
  return (
    <ModulePageTemplate
      title="So sánh Thu Chi với Dự toán"
      description="Phân tích và so sánh thu chi thực tế với dự toán đã lập"
      gradientColors="from-purple-600 via-indigo-500 to-blue-500"
      icon={BarChart3}
      stats={[
        { label: 'Dự toán thu', value: '5.2 tỷ', color: 'text-blue-600', icon: BarChart3 },
        { label: 'Thực tế thu', value: '4.8 tỷ', color: 'text-green-600', icon: TrendingUp },
        { label: 'Dự toán chi', value: '4.8 tỷ', color: 'text-purple-600', icon: BarChart3 },
        { label: 'Thực tế chi', value: '4.2 tỷ', color: 'text-red-600', icon: TrendingDown },
      ]}
      tableHeaders={['Khoản mục', 'Dự toán', 'Thực tế', 'Chênh lệch', '% Thực hiện']}
      sampleData={[
        { id: 'SS001', title: 'Thu phí hành chính', name: '180M', status: '165M', date: '-15M (91.7%)' },
        { id: 'SS002', title: 'Chi lương cán bộ', name: '1.5 tỷ', status: '1.5 tỷ', date: '0đ (100%)' },
        { id: 'SS003', title: 'Chi hạ tầng', name: '800M', status: '650M', date: '-150M (81.3%)' },
      ]}
    />
  );
}
