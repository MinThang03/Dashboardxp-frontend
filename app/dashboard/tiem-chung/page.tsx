'use client';

import { ModulePageTemplate } from '@/components/module-page-template';
import { Activity, Users, Calendar, CheckCircle2 } from 'lucide-react';

export default function TiemChungPage() {
  return (
    <ModulePageTemplate
      title="Theo dõi Tiêm chủng"
      description="Quản lý lịch tiêm, đối tượng tiêm chủng"
      gradientColors="from-green-600 via-emerald-500 to-teal-500"
      icon={Activity}
      stats={[
        { label: 'Đã tiêm tháng này', value: 245, color: 'text-green-600', icon: CheckCircle2 },
        { label: 'Chờ tiêm', value: 58, color: 'text-blue-600', icon: Users },
        { label: 'Lịch sắp tới', value: 3, color: 'text-amber-600', icon: Calendar },
        { label: 'Tỷ lệ tiêm', value: '92%', color: 'text-green-600', icon: Activity },
      ]}
      tableHeaders={['Mã ĐT', 'Họ tên', 'Loại vắc xin', 'Ngày tiêm', 'Trạng thái']}
      sampleData={[
        { id: 'TC001', title: 'Nguyễn Văn A', name: 'COVID-19', status: 'Đã tiêm', date: '2024-01-15' },
        { id: 'TC002', title: 'Trần Thị B', name: 'Cúm', status: 'Đã đặt lịch', date: '2024-01-25' },
        { id: 'TC003', title: 'Lê Văn C', name: 'Viêm gan B', status: 'Đã tiêm', date: '2024-01-10' },
      ]}
    />
  );
}
