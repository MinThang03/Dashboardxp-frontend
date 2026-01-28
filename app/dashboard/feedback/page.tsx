'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MapPin, Plus } from 'lucide-react';

export default function FeedbackPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">
          Gửi phản ánh
        </h1>
        <p className="text-muted-foreground mt-1">
          Báo cáo sự cố, vấn đề và gửi phản ánh về dịch vụ công
        </p>
      </div>

      <div className="flex justify-end">
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
          <Plus className="w-4 h-4 mr-2" />
          Phản ánh mới
        </Button>
      </div>

      <Card className="bg-card border-border p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Hướng dẫn gửi phản ánh
        </h3>
        <div className="space-y-3 text-sm text-foreground">
          <div className="flex gap-3">
            <span className="text-primary font-bold">1</span>
            <span>Chọn loại phản ánh (Sự cố, Vấn đề, Đề xuất)</span>
          </div>
          <div className="flex gap-3">
            <span className="text-primary font-bold">2</span>
            <span>Mô tả chi tiết vấn đề hoặc đề xuất</span>
          </div>
          <div className="flex gap-3">
            <span className="text-primary font-bold">3</span>
            <span>Cung cấp vị trí bằng bản đồ hoặc tọa độ</span>
          </div>
          <div className="flex gap-3">
            <span className="text-primary font-bold">4</span>
            <span>Đính kèm hình ảnh minh chứng (nếu có)</span>
          </div>
          <div className="flex gap-3">
            <span className="text-primary font-bold">5</span>
            <span>Gửi phản ánh và theo dõi trạng thái</span>
          </div>
        </div>
      </Card>

      <Card className="bg-card border-border p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Biểu mẫu phản ánh
        </h3>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-foreground block mb-2">
              Loại phản ánh
            </label>
            <select className="w-full px-3 py-2 bg-input border border-border rounded-md text-foreground focus:outline-none focus:ring-2 focus:ring-primary">
              <option>Chọn loại phản ánh</option>
              <option>Sự cố</option>
              <option>Vấn đề</option>
              <option>Đề xuất</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-medium text-foreground block mb-2">
              Tiêu đề
            </label>
            <Input
              placeholder="Tiêu đề phản ánh"
              className="bg-input border-border"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-foreground block mb-2">
              Mô tả chi tiết
            </label>
            <textarea
              placeholder="Mô tả chi tiết vấn đề hoặc đề xuất..."
              rows={5}
              className="w-full p-3 bg-input border border-border rounded-md text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-foreground block mb-2 flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Vị trí
            </label>
            <Input
              placeholder="Nhập địa chỉ hoặc chọn trên bản đồ"
              className="bg-input border-border"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-foreground block mb-2">
              Tải lên hình ảnh
            </label>
            <div className="border-2 border-dashed border-border rounded-lg p-6 text-center cursor-pointer hover:border-primary/50 transition">
              <p className="text-muted-foreground text-sm">
                Kéo thả hình ảnh hoặc nhấp để chọn
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <Button className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90">
              Gửi phản ánh
            </Button>
            <Button variant="outline" className="flex-1 border-border bg-transparent">
              Hủy
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
