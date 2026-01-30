'use client';

import { ModulePageTemplate } from '@/components/module-page-template';
import { MessageSquare, Clock, CheckCircle2, AlertCircle } from 'lucide-react';

export default function PhanAnhPage() {
  return (
    <ModulePageTemplate
      title="Phản ánh - Kiến nghị"
      description="Tiếp nhận và xử lý phản ánh từ nhân dân"
      gradientColors="from-blue-600 via-cyan-500 to-teal-500"
      icon={MessageSquare}
      stats={[
        { label: 'Tổng phản ánh', value: 145, color: 'text-blue-600', icon: MessageSquare },
        { label: 'Chờ xử lý', value: 28, color: 'text-amber-600', icon: Clock },
        { label: 'Đã xử lý', value: 117, color: 'text-green-600', icon: CheckCircle2 },
        { label: 'Khẩn cấp', value: 5, color: 'text-red-600', icon: AlertCircle },
      ]}
      tableHeaders={['Mã', 'Nội dung', 'Người gửi', 'Độ ưu tiên', 'Trạng thái']}
      sampleData={[
        { id: 'PA001', title: 'Đường xuống cấp cần sửa', name: 'Nguyễn Văn A', status: 'Cao', date: 'Đang xử lý' },
        { id: 'PA002', title: 'Ô nhiễm tiếng ồn', name: 'Trần Thị B', status: 'Trung bình', date: 'Chờ xử lý' },
        { id: 'PA003', title: 'Cảm ơn bác sĩ tận tâm', name: 'Lê Văn C', status: 'Thấp', date: 'Đã xử lý' },
      ]}
    />
  );
}
