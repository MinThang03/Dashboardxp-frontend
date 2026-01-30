'use client';

import { ModulePageTemplate } from '@/components/module-page-template';
import { AlertTriangle, Users, MapPin, TrendingDown } from 'lucide-react';

export default function DichBenhPage() {
  return (
    <ModulePageTemplate
      title="Theo dõi Dịch bệnh"
      description="Giám sát và cảnh báo dịch bệnh trên địa bàn"
      gradientColors="from-red-600 via-orange-500 to-amber-500"
      icon={AlertTriangle}
      stats={[
        { label: 'Ca mắc mới', value: 5, color: 'text-red-600', icon: Users },
        { label: 'Đang điều trị', value: 12, color: 'text-amber-600', icon: AlertTriangle },
        { label: 'Đã khỏi', value: 145, color: 'text-green-600', icon: Users },
        { label: 'Khu vực dịch', value: 2, color: 'text-red-600', icon: MapPin },
      ]}
      tableHeaders={['Mã ca', 'Tên bệnh', 'Bệnh nhân', 'Khu vực', 'Trạng thái']}
      sampleData={[
        { id: 'DB001', title: 'Sốt xuất huyết', name: 'Nguyễn Văn A', status: 'Điều trị', date: 'Phường 1' },
        { id: 'DB002', title: 'Cúm A', name: 'Trần Thị B', status: 'Khỏi', date: 'Phường 2' },
      ]}
    />
  );
}
