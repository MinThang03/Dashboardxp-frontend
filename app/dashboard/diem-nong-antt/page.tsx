'use client';

import { ModulePageTemplate } from '@/components/module-page-template';
import { MapPin, AlertCircle, Users, TrendingDown } from 'lucide-react';

export default function DiemNongANTTPage() {
  return (
    <ModulePageTemplate
      title="Điểm nóng ANTT"
      description="Theo dõi các địa điểm phức tạp về ANTT"
      gradientColors="from-orange-600 via-red-500 to-rose-500"
      icon={MapPin}
      stats={[
        { label: 'Điểm nóng', value: 8, color: 'text-red-600', icon: MapPin },
        { label: 'Cảnh báo', value: 3, color: 'text-amber-600', icon: AlertCircle },
        { label: 'Đối tượng theo dõi', value: 15, color: 'text-blue-600', icon: Users },
        { label: 'Giảm so tháng trước', value: '-25%', color: 'text-green-600', icon: TrendingDown },
      ]}
      tableHeaders={['Mã', 'Địa điểm', 'Loại', 'Mức độ', 'Ghi chú']}
      sampleData={[
        { id: 'DN001', title: 'Quán karaoke ABC', name: 'Khu phố 1', status: 'Cao', date: 'Ma túy' },
        { id: 'DN002', title: 'Khu nhà trọ XYZ', name: 'Khu phố 4', status: 'Trung bình', date: 'Trộm cắp' },
        { id: 'DN003', title: 'Ngã tư đường 3', name: 'Khu phố 2', status: 'Cao', date: 'TNGT' },
      ]}
    />
  );
}
