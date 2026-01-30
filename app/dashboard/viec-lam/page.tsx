'use client';

import { ModulePageTemplate } from '@/components/module-page-template';
import { Briefcase, Users, TrendingUp, CheckCircle2 } from 'lucide-react';

export default function ViecLamPage() {
  return (
    <ModulePageTemplate
      title="Việc làm - Dạy nghề"
      description="Giới thiệu việc làm, tư vấn nghề nghiệp"
      gradientColors="from-blue-600 via-cyan-500 to-teal-500"
      icon={Briefcase}
      stats={[
        { label: 'Người tìm việc', value: 145, color: 'text-blue-600', icon: Users },
        { label: 'Đã có việc', value: 89, color: 'text-green-600', icon: CheckCircle2 },
        { label: 'Lớp dạy nghề', value: 12, color: 'text-purple-600', icon: Briefcase },
        { label: 'Tỷ lệ thành công', value: '61%', color: 'text-green-600', icon: TrendingUp },
      ]}
      tableHeaders={['Mã', 'Họ tên', 'Ngành nghề', 'Trình độ', 'Trạng thái']}
      sampleData={[
        { id: 'VL001', title: 'Nguyễn Văn A', name: 'Xây dựng', status: 'Phổ thông', date: 'Đã có việc' },
        { id: 'VL002', title: 'Trần Thị B', name: 'May mặc', status: 'Trung cấp', date: 'Đang tìm' },
        { id: 'VL003', title: 'Lê Văn C', name: 'Điện tử', status: 'Cao đẳng', date: 'Đã có việc' },
      ]}
    />
  );
}
