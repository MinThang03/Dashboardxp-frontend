'use client';

import { ModulePageTemplate } from '@/components/module-page-template';
import { TrendingUp, Zap, AlertCircle, BarChart3 } from 'lucide-react';

export default function RuiRoQuyHoachPage() {
  return (
    <ModulePageTemplate
      title="Đánh giá Rủi ro Quy hoạch (AI)"
      description="Phân tích rủi ro quy hoạch sử dụng đất bằng AI"
      gradientColors="from-violet-600 via-purple-500 to-fuchsia-500"
      icon={Zap}
      stats={[
        { label: 'Độ chính xác AI', value: '91%', color: 'text-purple-600', icon: Zap },
        { label: 'Khu vực rủi ro cao', value: 8, color: 'text-red-600', icon: AlertCircle },
        { label: 'Cảnh báo trung bình', value: 23, color: 'text-amber-600', icon: TrendingUp },
        { label: 'Báo cáo phân tích', value: 45, color: 'text-blue-600', icon: BarChart3 },
      ]}
      tableHeaders={['Khu vực', 'Loại rủi ro', 'Mức độ', 'Khuyến nghị AI', 'Xác suất']}
      sampleData={[
        { id: 'RR001', title: 'Khu A - Phường 1', name: 'Ngập lụt', status: 'Cao', date: '87%' },
        { id: 'RR002', title: 'Khu B - Phường 2', name: 'Sạt lở', status: 'Trung bình', date: '65%' },
        { id: 'RR003', title: 'Khu C - Phường 3', name: 'Tranh chấp', status: 'Thấp', date: '32%' },
      ]}
    />
  );
}
