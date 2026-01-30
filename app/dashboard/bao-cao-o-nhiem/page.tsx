'use client';

import { ModulePageTemplate } from '@/components/module-page-template';
import { AlertTriangle, AlertCircle, Clock, CheckCircle2 } from 'lucide-react';

export default function BaoCaoONhiemPage() {
  return (
    <ModulePageTemplate
      title="Báo cáo Ô nhiễm"
      description="Tiếp nhận và xử lý báo cáo ô nhiễm môi trường"
      gradientColors="from-red-600 via-orange-500 to-amber-500"
      icon={AlertTriangle}
      stats={[
        { label: 'Báo cáo tháng', value: 34, color: 'text-red-600', icon: AlertTriangle },
        { label: 'Đang xử lý', value: 12, color: 'text-amber-600', icon: Clock },
        { label: 'Đã xử lý', value: 22, color: 'text-green-600', icon: CheckCircle2 },
        { label: 'Nghiêm trọng', value: 3, color: 'text-red-600', icon: AlertCircle },
      ]}
      tableHeaders={['Mã', 'Loại ô nhiễm', 'Địa điểm', 'Mức độ', 'Trạng thái']}
      sampleData={[
        { id: 'ON001', title: 'Ô nhiễm không khí', name: 'Khu công nghiệp', status: 'Nghiêm trọng', date: 'Đang XL' },
        { id: 'ON002', title: 'Ô nhiễm nước', name: 'Sông ABC', status: 'Trung bình', date: 'Đã XL' },
        { id: 'ON003', title: 'Ô nhiễm tiếng ồn', name: 'Quán karaoke', status: 'Nhẹ', date: 'Đang XL' },
      ]}
    />
  );
}
