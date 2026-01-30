'use client';

import { ModulePageTemplate } from '@/components/module-page-template';
import { Activity, TrendingUp, Clock, CheckCircle2 } from 'lucide-react';

export default function GiaiNganPage() {
  return (
    <ModulePageTemplate
      title="Giám sát Tiến độ Giải ngân"
      description="Theo dõi tiến độ giải ngân các dự án và khoản mục chi"
      gradientColors="from-cyan-600 via-blue-500 to-indigo-500"
      icon={Activity}
      stats={[
        { label: 'Tổng kế hoạch', value: '5.2 tỷ', color: 'text-blue-600', icon: Activity },
        { label: 'Đã giải ngân', value: '3.8 tỷ', color: 'text-green-600', icon: TrendingUp },
        { label: 'Tỷ lệ giải ngân', value: '73%', color: 'text-purple-600', icon: TrendingUp },
        { label: 'Đang xử lý', value: 23, color: 'text-amber-600', icon: Clock },
      ]}
      tableHeaders={['Mã', 'Dự án/Khoản mục', 'Kế hoạch', 'Đã giải ngân', '% Hoàn thành']}
      sampleData={[
        { id: 'GN001', title: 'Dự án nâng cấp đường', name: '1.2 tỷ', status: '950M', date: '79%' },
        { id: 'GN002', title: 'Xây trường học', name: '800M', status: '600M', date: '75%' },
        { id: 'GN003', title: 'Hệ thống cấp nước', name: '500M', status: '250M', date: '50%' },
      ]}
    />
  );
}
