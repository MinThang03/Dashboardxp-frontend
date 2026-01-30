'use client';

import { ModulePageTemplate } from '@/components/module-page-template';
import { Map, MapPin, CheckCircle2, Clock } from 'lucide-react';

export default function ThamDinhThucDiaPage() {
  return (
    <ModulePageTemplate
      title="Cập nhật Hồ sơ Thẩm định Thực địa"
      description="Cập nhật thông tin thực tế khi thẩm định tại hiện trường"
      gradientColors="from-blue-600 via-indigo-500 to-purple-500"
      icon={Map}
      stats={[
        { label: 'Chờ thẩm định', value: 45, color: 'text-amber-600', icon: Clock },
        { label: 'Đang thẩm định', value: 12, color: 'text-blue-600', icon: MapPin },
        { label: 'Hoàn thành', value: 234, color: 'text-green-600', icon: CheckCircle2 },
        { label: 'Phát hiện sai lệch', value: 8, color: 'text-red-600', icon: Map },
      ]}
      tableHeaders={['Mã HS', 'Địa chỉ', 'Ngày thẩm định', 'Cán bộ', 'Kết quả']}
      sampleData={[
        { id: 'TD001', title: 'Thửa 123, tờ 45', name: '15/01/2024', status: 'Nguyễn Văn X', date: 'Đúng hồ sơ' },
        { id: 'TD002', title: 'Thửa 456, tờ 67', name: '20/01/2024', status: 'Trần Thị Y', date: 'Sai diện tích' },
        { id: 'TD003', title: 'Thửa 789, tờ 89', name: '25/01/2024', status: 'Lê Văn Z', date: 'Chờ thẩm định' },
      ]}
    />
  );
}
