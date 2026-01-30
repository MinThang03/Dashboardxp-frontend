'use client';

import { ModulePageTemplate } from '@/components/module-page-template';
import { Truck, Trash2, TrendingUp, CheckCircle2 } from 'lucide-react';

export default function RacThaiPage() {
  return (
    <ModulePageTemplate
      title="Quản lý Rác thải"
      description="Thu gom, vận chuyển và xử lý rác thải"
      gradientColors="from-amber-600 via-orange-500 to-yellow-500"
      icon={Trash2}
      stats={[
        { label: 'Rác thu/ngày', value: '2.5 tấn', color: 'text-amber-600', icon: Trash2 },
        { label: 'Điểm thu gom', value: 45, color: 'text-blue-600', icon: Truck },
        { label: 'Tỷ lệ phân loại', value: '68%', color: 'text-green-600', icon: CheckCircle2 },
        { label: 'Tăng phân loại', value: '+15%', color: 'text-green-600', icon: TrendingUp },
      ]}
      tableHeaders={['Mã', 'Điểm thu gom', 'Khối lượng', 'Loại rác', 'Trạng thái']}
      sampleData={[
        { id: 'RT001', title: 'Khu phố 1', name: '150kg', status: 'Hữu cơ', date: 'Đã thu' },
        { id: 'RT002', title: 'Khu phố 2', name: '85kg', status: 'Tái chế', date: 'Đã thu' },
        { id: 'RT003', title: 'Chợ trung tâm', name: '320kg', status: 'Hỗn hợp', date: 'Chờ thu' },
      ]}
    />
  );
}
