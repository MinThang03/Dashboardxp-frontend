'use client';

import { ModulePageTemplate } from '@/components/module-page-template';
import { FileText, Clock, CheckCircle2, AlertCircle } from 'lucide-react';

export default function HoSoTTHCPage() {
  return (
    <ModulePageTemplate
      title="Hồ sơ Thủ tục Hành chính"
      description="Tiếp nhận và xử lý hồ sơ thủ tục hành chính"
      gradientColors="from-blue-600 via-indigo-500 to-purple-500"
      icon={FileText}
      stats={[
        { label: 'Chờ xử lý', value: 18, color: 'text-yellow-600', icon: Clock },
        { label: 'Đang xử lý', value: 45, color: 'text-blue-600', icon: Clock },
        { label: 'Hoàn thành', value: 892, color: 'text-green-600', icon: CheckCircle2 },
        { label: 'Quá hạn', value: 3, color: 'text-red-600', icon: AlertCircle },
      ]}
      tableHeaders={['Mã hồ sơ', 'Loại TTHC', 'Công dân', 'Trạng thái', 'Hạn xử lý']}
      sampleData={[
        { id: 'HS001', title: 'Cấp CCCD', name: 'Nguyễn Văn A', status: 'Đang xử lý', date: '2024-01-25' },
        { id: 'HS002', title: 'Đăng ký KT', name: 'Trần Thị B', status: 'Chờ duyệt', date: '2024-01-26' },
        { id: 'HS003', title: 'Chứng thực', name: 'Lê Văn C', status: 'Hoàn thành', date: '2024-01-20' },
      ]}
    />
  );
}
