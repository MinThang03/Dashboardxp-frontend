'use client';

import { ModulePageTemplate } from '@/components/module-page-template';
import { FileSearch, MapPin, Users, CheckCircle2 } from 'lucide-react';

export default function TraCuuDatPage() {
  return (
    <ModulePageTemplate
      title="Tra cứu Hồ sơ Địa chính"
      description="Tra cứu thông tin đất đai, sổ đỏ, chủ sở hữu"
      gradientColors="from-teal-600 via-cyan-500 to-blue-500"
      icon={FileSearch}
      stats={[
        { label: 'Tổng hồ sơ', value: 3245, color: 'text-teal-600', icon: FileSearch },
        { label: 'Đã có sổ đỏ', value: 2856, color: 'text-green-600', icon: CheckCircle2 },
        { label: 'Chủ sở hữu', value: 2134, color: 'text-blue-600', icon: Users },
        { label: 'Tỷ lệ số hóa', value: '94%', color: 'text-purple-600', icon: MapPin },
      ]}
      tableHeaders={['Mã HS', 'Địa chỉ thửa đất', 'Chủ sở hữu', 'Diện tích', 'Trạng thái']}
      sampleData={[
        { id: 'DC001', title: 'Thửa 123, tờ bản đồ 45', name: 'Nguyễn Văn A', status: '250m²', date: 'Đã có sổ' },
        { id: 'DC002', title: 'Thửa 456, tờ bản đồ 67', name: 'Trần Thị B', status: '180m²', date: 'Đã có sổ' },
        { id: 'DC003', title: 'Thửa 789, tờ bản đồ 89', name: 'Lê Văn C', status: '320m²', date: 'Chưa có sổ' },
      ]}
    />
  );
}
