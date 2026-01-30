'use client';

import { ModulePageTemplate } from '@/components/module-page-template';
import { TrendingUp, Coins, Calendar, CheckCircle2 } from 'lucide-react';

export default function ThuNganSachPage() {
  return (
    <ModulePageTemplate
      title="Theo dõi Thu ngân sách"
      description="Quản lý và theo dõi các khoản thu ngân sách địa phương"
      gradientColors="from-green-600 via-emerald-500 to-teal-500"
      icon={TrendingUp}
      stats={[
        { label: 'Tổng thu tháng', value: '450M', color: 'text-green-600', icon: Coins },
        { label: 'Đạt kế hoạch', value: '85%', color: 'text-blue-600', icon: TrendingUp },
        { label: 'Số khoản thu', value: 156, color: 'text-purple-600', icon: Calendar },
        { label: 'Đã xác nhận', value: 142, color: 'text-green-600', icon: CheckCircle2 },
      ]}
      tableHeaders={['Mã', 'Nguồn thu', 'Số tiền', 'Ngày thu', 'Trạng thái']}
      sampleData={[
        { id: 'THU001', title: 'Phí hành chính', name: '15.500.000đ', status: 'Đã xác nhận', date: '15/01/2024' },
        { id: 'THU002', title: 'Phí chợ tháng 1', name: '8.200.000đ', status: 'Đã xác nhận', date: '20/01/2024' },
        { id: 'THU003', title: 'Thu phí môi trường', name: '12.800.000đ', status: 'Chờ xác nhận', date: '25/01/2024' },
      ]}
    />
  );
}
