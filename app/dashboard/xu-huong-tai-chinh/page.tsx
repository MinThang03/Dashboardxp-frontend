'use client';

import { ModulePageTemplate } from '@/components/module-page-template';
import { TrendingUp, BarChart3, Zap, AlertCircle } from 'lucide-react';

export default function XuHuongTaiChinhPage() {
  return (
    <ModulePageTemplate
      title="Phân tích Xu hướng Tài chính (AI)"
      description="Dự báo xu hướng tài chính bằng trí tuệ nhân tạo"
      gradientColors="from-violet-600 via-purple-500 to-fuchsia-500"
      icon={Zap}
      stats={[
        { label: 'Độ chính xác dự báo', value: '92%', color: 'text-purple-600', icon: Zap },
        { label: 'Xu hướng tháng tới', value: '+8%', color: 'text-green-600', icon: TrendingUp },
        { label: 'Cảnh báo rủi ro', value: 2, color: 'text-amber-600', icon: AlertCircle },
        { label: 'Báo cáo AI', value: 15, color: 'text-blue-600', icon: BarChart3 },
      ]}
      tableHeaders={['Thời gian', 'Chỉ số', 'Dự báo', 'Xu hướng', 'Độ tin cậy']}
      sampleData={[
        { id: 'AI001', title: 'Tháng 2/2024', name: 'Thu ngân sách', status: '480M', date: '92%' },
        { id: 'AI002', title: 'Tháng 3/2024', name: 'Chi ngân sách', status: '420M', date: '89%' },
        { id: 'AI003', title: 'Quý II/2024', name: 'Cân đối NS', status: '+12%', date: '85%' },
      ]}
    />
  );
}
