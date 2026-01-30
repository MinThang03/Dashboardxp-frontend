'use client';

import { ModulePageTemplate } from '@/components/module-page-template';
import { ShieldCheck, Users, AlertTriangle, TrendingUp } from 'lucide-react';

export default function TamTruVangPage() {
  return (
    <ModulePageTemplate
      title="Quản lý Tạm trú - Tạm vắng"
      description="Đăng ký tạm trú, tạm vắng người dân"
      gradientColors="from-red-600 via-orange-500 to-amber-500"
      icon={ShieldCheck}
      stats={[
        { label: 'Tạm trú', value: 85, color: 'text-blue-600', icon: Users },
        { label: 'Tạm vắng', value: 23, color: 'text-amber-600', icon: AlertTriangle },
        { label: 'Đăng ký mới', value: 12, color: 'text-green-600', icon: TrendingUp },
        { label: 'Hết hạn', value: 5, color: 'text-red-600', icon: AlertTriangle },
      ]}
      sampleData={[
        { id: 'TT001', title: 'Nguyễn Văn A - Tạm trú', status: 'Còn hạn', date: '2024-01-10' },
        { id: 'TV001', title: 'Trần Thị B - Tạm vắng', status: 'Còn hạn', date: '2024-01-12' },
      ]}
    />
  );
}
