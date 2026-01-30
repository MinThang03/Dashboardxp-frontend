'use client';

import { ModulePageTemplate } from '@/components/module-page-template';
import { FileCheck, Clock, CheckCircle2, TrendingUp } from 'lucide-react';

export default function CapSoDoPage() {
  return (
    <ModulePageTemplate
      title="Quản lý Tình trạng Cấp Sổ đỏ"
      description="Theo dõi tiến độ cấp giấy chứng nhận quyền sử dụng đất"
      gradientColors="from-red-600 via-rose-500 to-pink-500"
      icon={FileCheck}
      stats={[
        { label: 'Hồ sơ chờ cấp', value: 89, color: 'text-amber-600', icon: Clock },
        { label: 'Đang xử lý', value: 34, color: 'text-blue-600', icon: Clock },
        { label: 'Đã cấp', value: 2856, color: 'text-green-600', icon: CheckCircle2 },
        { label: 'Tỷ lệ hoàn thành', value: '88%', color: 'text-green-600', icon: TrendingUp },
      ]}
      tableHeaders={['Mã HS', 'Chủ sở hữu', 'Địa chỉ', 'Ngày nộp', 'Trạng thái']}
      sampleData={[
        { id: 'SO001', title: 'Nguyễn Văn A', name: 'Thửa 123, tờ 45', status: '15/01/2024', date: 'Đã cấp' },
        { id: 'SO002', title: 'Trần Thị B', name: 'Thửa 456, tờ 67', status: '20/01/2024', date: 'Đang xử lý' },
        { id: 'SO003', title: 'Lê Văn C', name: 'Thửa 789, tờ 89', status: '25/01/2024', date: 'Chờ thẩm định' },
      ]}
    />
  );
}
