'use client';

import { ModulePageTemplate } from '@/components/module-page-template';
import { Stethoscope, Users, TrendingUp, Clock } from 'lucide-react';

export default function KhamBenhPage() {
  return (
    <ModulePageTemplate
      title="Khám chữa bệnh"
      description="Quản lý khám chữa bệnh ban đầu tại trạm y tế"
      gradientColors="from-blue-600 via-cyan-500 to-teal-500"
      icon={Stethoscope}
      stats={[
        { label: 'Lượt khám hôm nay', value: 28, color: 'text-blue-600', icon: Users },
        { label: 'Đang chờ', value: 5, color: 'text-amber-600', icon: Clock },
        { label: 'Tổng tháng', value: 892, color: 'text-green-600', icon: TrendingUp },
        { label: 'TB/ngày', value: 32, color: 'text-purple-600', icon: Users },
      ]}
      tableHeaders={['STT', 'Bệnh nhân', 'Triệu chứng', 'Bác sĩ', 'Giờ khám']}
      sampleData={[
        { id: 'KB001', title: 'Nguyễn Văn A', name: 'Sốt, ho', status: 'BS. Trần B', date: '08:30' },
        { id: 'KB002', title: 'Trần Thị C', name: 'Đau bụng', status: 'BS. Lê D', date: '09:15' },
        { id: 'KB003', title: 'Lê Văn E', name: 'Khám định kỳ', status: 'BS. Trần B', date: '10:00' },
      ]}
    />
  );
}
