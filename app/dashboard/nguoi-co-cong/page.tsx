'use client';

import { ModulePageTemplate } from '@/components/module-page-template';
import { Award, Users, TrendingUp, Heart } from 'lucide-react';

export default function NguoiCoCongPage() {
  return (
    <ModulePageTemplate
      title="Người có Công"
      description="Quản lý chính sách ưu đãi người có công"
      gradientColors="from-yellow-600 via-amber-500 to-orange-500"
      icon={Award}
      stats={[
        { label: 'Người có công', value: 89, color: 'text-yellow-600', icon: Award },
        { label: 'Thương binh', value: 23, color: 'text-red-600', icon: Heart },
        { label: 'Gia đình liệt sĩ', value: 15, color: 'text-blue-600', icon: Users },
        { label: 'Tăng so năm trước', value: '+3%', color: 'text-green-600', icon: TrendingUp },
      ]}
      tableHeaders={['Mã', 'Họ tên', 'Danh hiệu', 'Chế độ', 'Trạng thái']}
      sampleData={[
        { id: 'NCC001', title: 'Nguyễn Văn A', name: 'Thương binh 1/4', status: '3.5M/tháng', date: 'Đang hưởng' },
        { id: 'NCC002', title: 'Trần Thị B', name: 'Mẹ Việt Nam anh hùng', status: '4M/tháng', date: 'Đang hưởng' },
        { id: 'NCC003', title: 'Lê Văn C', name: 'Thương binh 2/4', status: '2.8M/tháng', date: 'Đang hưởng' },
      ]}
    />
  );
}
