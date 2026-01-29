'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, MapPin, Zap, Clock } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';

const alertsList = [
  {
    id: 1,
    type: 'overdue',
    title: 'Hồ sơ sắp/quá hạn',
    count: 3,
    items: [
      {
        id: 'HS-DC-001',
        name: 'Cấp phép xây dựng nhà ở riêng lẻ',
        citizenName: 'Nguyễn Văn A',
        department: 'Địa chính - Xây dựng',
        status: 'Đang xử lý',
        submittedAt: '2024-01-05',
        deadline: '2024-01-18',
        daysLeft: 1,
        handler: 'Trần Văn Bình (Cán bộ địa chính)',
      },
      {
        id: 'HS-DC-014',
        name: 'Bổ sung hồ sơ thửa đất số 123',
        citizenName: 'Phạm Thị B',
        department: 'Địa chính - Xây dựng',
        status: 'Thiếu bổ sung giấy tờ',
        submittedAt: '2024-01-03',
        deadline: '2024-01-19',
        daysLeft: 2,
        handler: 'Nguyễn Thị Lan (Chuyên viên tiếp nhận)',
      },
      {
        id: 'HS-TT-007',
        name: 'Xác nhận thông tin cư trú',
        citizenName: 'Lê Văn C',
        department: 'Tư pháp - Hộ tịch',
        status: 'Chờ ký duyệt',
        submittedAt: '2024-01-02',
        deadline: '2024-01-20',
        daysLeft: 3,
        handler: 'Thượng úy Phạm Minh Dũng (Công an xã)',
      },
    ],
  },
  {
    id: 2,
    type: 'budget',
    title: 'Vượt ngân sách',
    count: 2,
    items: [
      { name: 'Y tế - Giáo dục', over: 20, percentage: 102 },
      { name: 'An ninh - Quốc phòng', over: 50, percentage: 98 },
    ],
  },
  {
    id: 3,
    type: 'feedback',
    title: 'Phản ánh nghiêm trọng',
    count: 5,
    items: [
      {
        id: 'PA-MT-A-01',
        name: 'Ô nhiễm môi trường Khu A',
        area: 'Khu A, Thôn 1',
        category: 'Môi trường',
        channel: 'Cổng dịch vụ công / Tổng đài',
        severity: 'high',
        date: '2024-01-15',
        status: 'Đang xử lý',
        department: 'Tài nguyên & Môi trường / UBND xã',
        handler: 'Nguyễn Văn Hùng (Cán bộ môi trường)',
        description:
          'Người dân phản ánh mùi hôi thối, xả thải trực tiếp ra suối gần khu dân cư, ảnh hưởng sức khỏe.',
      },
      {
        id: 'PA-DD-B-01',
        name: 'Tranh chấp đất đai Khu B',
        area: 'Khu B, Thôn 2',
        category: 'Đất đai',
        channel: 'Tiếp dân trực tiếp',
        severity: 'high',
        date: '2024-01-14',
        status: 'Đang hoà giải',
        department: 'Địa chính - Tư pháp',
        handler: 'Trần Thị Lan (Cán bộ địa chính)',
        description:
          'Hai hộ dân tranh chấp ranh giới thửa đất sản xuất, đã phát sinh cự cãi, nguy cơ mất ANTT.',
      },
      {
        id: 'PA-NC-C-01',
        name: 'Cấp nước không đủ',
        area: 'Khu dân cư C',
        category: 'Hạ tầng - Nước sạch',
        channel: 'Ứng dụng di động',
        severity: 'medium',
        date: '2024-01-13',
        status: 'Đang kiểm tra',
        department: 'Hạ tầng đô thị',
        handler: 'Phạm Minh Đức (Cán bộ phụ trách cấp nước)',
        description:
          'Nhiều hộ dân phản ánh nước yếu, mất nước vào giờ cao điểm, ảnh hưởng sinh hoạt gia đình.',
      },
    ],
  },
];

const hotspots = [
  {
    id: 1,
    name: 'Tranh chấp đất đai - Khu A',
    type: 'Tranh chấp đất',
    severity: 'high',
    lat: 10.7769,
    lng: 106.6869,
    complaints: 5,
    date: '2024-01-15',
    description: 'Nhiều hộ dân phản ánh tranh chấp ranh giới đất vườn, đất sản xuất. Đã có 2 vụ phát sinh cự cãi, nguy cơ mất ANTT.',
    department: 'Địa chính - Tư pháp',
    handler: 'Trần Thị Lan (Cán bộ địa chính)',
    status: 'Đang hoà giải',
    relatedCases: [
      { id: 'TC-DD-A-01', subject: 'Tranh chấp ranh giới đất vườn', date: '2024-01-05' },
      { id: 'TC-DD-A-02', subject: 'Lấn chiếm hành lang giao thông', date: '2024-01-12' },
    ],
  },
  {
    id: 2,
    name: 'Ô nhiễm môi trường - Khu B',
    type: 'Ô nhiễm',
    severity: 'high',
    lat: 10.7849,
    lng: 106.6949,
    complaints: 3,
    date: '2024-01-14',
    description: 'Người dân phản ánh mùi hôi thối, xả thải trực tiếp ra suối gần khu dân cư, ảnh hưởng sức khỏe cộng đồng.',
    department: 'Tài nguyên & Môi trường',
    handler: 'Nguyễn Văn Hùng (Cán bộ môi trường)',
    status: 'Đang xử lý',
    relatedCases: [
      { id: 'PA-MT-B-01', subject: 'Xả thải ra suối', date: '2024-01-10' },
      { id: 'PA-MT-B-02', subject: 'Mùi hôi thối từ cơ sở sản xuất', date: '2024-01-12' },
    ],
  },
  {
    id: 3,
    name: 'ANTT - Khu C',
    type: 'An ninh trật tự',
    severity: 'medium',
    lat: 10.7749,
    lng: 106.6749,
    complaints: 2,
    date: '2024-01-13',
    description: 'Tình trạng tụ tập thanh niên gây ồn ào, có dấu hiệu đánh bạc ăn tiền vào ban đêm.',
    department: 'Công an xã',
    handler: 'Thượng úy Phạm Minh Dũng',
    status: 'Đang theo dõi',
    relatedCases: [
      { id: 'ANTT-C-01', subject: 'Tụ tập gây ồn ào', date: '2024-01-08' },
    ],
  },
  {
    id: 4,
    name: 'Cấp nước - Khu D',
    type: 'Cấp nước',
    severity: 'low',
    lat: 10.7869,
    lng: 106.6849,
    complaints: 1,
    date: '2024-01-12',
    description: 'Nhiều hộ dân phản ánh nước yếu, mất nước vào giờ cao điểm, ảnh hưởng sinh hoạt gia đình.',
    department: 'Hạ tầng đô thị',
    handler: 'Phạm Minh Đức (Cán bộ phụ trách cấp nước)',
    status: 'Đang kiểm tra',
    relatedCases: [
      { id: 'NC-D-01', subject: 'Nước yếu vào giờ cao điểm', date: '2024-01-10' },
    ],
  },
];

export default function AlertsPage() {
  const [selectedOverdue, setSelectedOverdue] = useState<(typeof alertsList[0]['items'][number]) | null>(null);
  const [isOverdueOpen, setIsOverdueOpen] = useState(false);
  const [selectedFeedback, setSelectedFeedback] = useState<(typeof alertsList[2]['items'][number]) | null>(null);
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const [currentLocation, setCurrentLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [locationStatus, setLocationStatus] = useState<string | null>(null);
  const [selectedHotspot, setSelectedHotspot] = useState<(typeof hotspots)[number] | null>(null);

  const handleGetCurrentLocation = () => {
    if (!navigator.geolocation) {
      setLocationStatus('Trình duyệt không hỗ trợ định vị GPS.');
      return;
    }
    setLocationStatus('Đang lấy vị trí hiện tại...');
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCurrentLocation({
          lat: Number(pos.coords.latitude.toFixed(5)),
          lng: Number(pos.coords.longitude.toFixed(5)),
        });
        setLocationStatus('Đã lấy vị trí hiện tại của bạn.');
      },
      () => {
        setLocationStatus('Không lấy được vị trí. Vui lòng kiểm tra quyền truy cập vị trí.');
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
      },
    );
  };

  const defaultMapCenter = { lat: hotspots[0].lat, lng: hotspots[0].lng };
  const mapCenter = currentLocation ?? defaultMapCenter;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">
          Cảnh báo & Điểm nóng
        </h1>
        <p className="text-muted-foreground mt-1">
          Theo dõi các vấn đề cần chú ý và bản đồ GIS phản ánh
        </p>
      </div>

      {/* Alert Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {alertsList.map((alert) => (
          <Card
            key={alert.id}
            className="bg-card border-border p-6 cursor-pointer hover:border-primary/50 transition"
          >
            <div className="flex items-start justify-between mb-3">
              <h3 className="font-semibold text-foreground">{alert.title}</h3>
              <Badge
                className={
                  alert.type === 'overdue'
                    ? 'bg-status-warning text-black'
                    : alert.type === 'budget'
                      ? 'bg-status-danger text-white'
                      : 'bg-red-500 text-white'
                }
              >
                {alert.count}
              </Badge>
            </div>
            <div className="space-y-2">
              {alert.items.slice(0, 2).map((item, i) => (
                <div key={i} className="text-xs text-muted-foreground">
                  {'name' in item && <span>• {item.name}</span>}
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>

      {/* Detailed Alerts */}
      <div className="space-y-4">
        {alertsList.map((alert) => (
          <Card key={alert.id} className="bg-card border-border p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">
              {alert.title}
            </h3>

            {alert.type === 'overdue' && (
              <div className="space-y-2">
                {alert.items.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-3 rounded-lg bg-status-warning/10 border border-status-warning/30 cursor-pointer hover:bg-status-warning/20 transition"
                    onClick={() => {
                      setSelectedOverdue(item);
                      setIsOverdueOpen(true);
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-status-warning" />
                      <div>
                        <p className="text-sm font-medium text-foreground">
                          {item.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {item.daysLeft === 1
                            ? 'Quá hạn ngày mai'
                            : `Quá hạn trong ${item.daysLeft} ngày • Mã HS: ${'id' in item ? item.id : '—'}`}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-1 text-right">
                      <Badge className="bg-status-warning text-black">
                        {item.deadline}
                      </Badge>
                      {'citizenName' in item && (
                        <span className="text-[11px] text-muted-foreground">
                          Người gửi: {item.citizenName}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {alert.type === 'budget' && (
              <div className="space-y-2">
                {alert.items.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-3 rounded-lg bg-status-danger/10 border border-status-danger/30"
                  >
                    <div className="flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-status-danger" />
                      <div>
                        <p className="text-sm font-medium text-foreground">
                          {item.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Vượt {item.over}M ({item.percentage}% dự toán)
                        </p>
                      </div>
                    </div>
                    <Badge className="bg-status-danger text-white">
                      Cảnh báo
                    </Badge>
                  </div>
                ))}
              </div>
            )}

            {alert.type === 'feedback' && (
              <div className="space-y-2">
                {alert.items.map((item, i) => (
                  <div
                    key={i}
                    className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer hover:opacity-90 transition ${
                      item.severity === 'high'
                        ? 'bg-red-500/10 border-red-500/30'
                        : 'bg-orange-500/10 border-orange-500/30'
                    }`}
                    onClick={() => {
                      setSelectedFeedback(item);
                      setIsFeedbackOpen(true);
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <Zap
                        className={`w-4 h-4 ${
                          item.severity === 'high'
                            ? 'text-red-500'
                            : 'text-orange-500'
                        }`}
                      />
                      <div>
                        <p className="text-sm font-medium text-foreground">
                          {item.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {item.date}
                        </p>
                      </div>
                    </div>
                    <Badge
                      className={
                        item.severity === 'high'
                          ? 'bg-red-500 text-white'
                          : 'bg-orange-500 text-white'
                      }
                    >
                      {item.severity === 'high' ? 'Nghiêm trọng' : 'Trung bình'}
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </Card>
        ))}
      </div>

      {/* Hotspot Map */}
      <Card className="bg-card border-border p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Bản đồ GIS - Điểm nóng
        </h3>

        {/* Simple map placeholder + vị trí hiện tại */}
        <div className="bg-secondary/30 rounded-lg p-4 mb-4 text-muted-foreground">
          <div className="flex items-center justify-between mb-3">
            <div className="text-sm">
              <p className="font-semibold text-foreground">Bản đồ GIS (mô phỏng)</p>
              <p className="text-xs text-muted-foreground">
                Tích hợp Google Maps trong môi trường triển khai thực tế.
              </p>
            </div>
            <Button
              size="sm"
              variant="outline"
              className="border-border bg-background/60"
              onClick={handleGetCurrentLocation}
            >
              <MapPin className="w-4 h-4 mr-1" />
              Lấy vị trí hiện tại
            </Button>
          </div>
          <div className="relative h-64 md:h-72 rounded-md overflow-hidden border border-border/60 bg-slate-200">
            <iframe
              title="Bản đồ GIS – Điểm nóng"
              src={`https://www.google.com/maps?q=${mapCenter.lat},${mapCenter.lng}&z=14&output=embed`}
              className="w-full h-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <div className="mt-3 text-xs">
            {currentLocation ? (
              <p className="text-foreground">
                Toạ độ hiện tại: <span className="font-semibold">{currentLocation.lat}</span>,{' '}
                <span className="font-semibold">{currentLocation.lng}</span>
              </p>
            ) : (
              <p className="text-muted-foreground">
                Bấm nút <span className="font-semibold">Lấy vị trí hiện tại</span> để xác định toạ độ GPS của bạn.
              </p>
            )}
            {locationStatus && (
              <p className="mt-1 text-[11px] text-muted-foreground">
                {locationStatus}
              </p>
            )}
          </div>
        </div>

        {/* Hotspot List */}
        <div className="space-y-2">
          <h4 className="text-sm font-semibold text-foreground mb-3">
            Danh sách điểm nóng
          </h4>
          {hotspots.map((spot) => (
            <div
              key={spot.id}
              className={`p-4 rounded-lg border cursor-pointer hover:opacity-90 transition ${
                spot.severity === 'high'
                  ? 'bg-red-500/10 border-red-500/30'
                  : spot.severity === 'medium'
                    ? 'bg-orange-500/10 border-orange-500/30'
                    : 'bg-blue-500/10 border-blue-500/30'
              }`}
              onClick={() => setSelectedHotspot(spot)}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3 flex-1">
                  <MapPin
                    className={`w-5 h-5 mt-1 flex-shrink-0 ${
                      spot.severity === 'high'
                        ? 'text-red-500'
                        : spot.severity === 'medium'
                          ? 'text-orange-500'
                          : 'text-blue-500'
                    }`}
                  />
                  <div>
                    <p className="font-medium text-foreground">
                      {spot.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {spot.type} • Tọa độ: {spot.lat}, {spot.lng}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {spot.complaints} phản ánh • {spot.date}
                    </p>
                  </div>
                </div>

                <Badge
                  className={
                    spot.severity === 'high'
                      ? 'bg-red-500 text-white'
                      : spot.severity === 'medium'
                        ? 'bg-orange-500 text-white'
                        : 'bg-blue-500 text-white'
                  }
                >
                  {spot.severity === 'high'
                    ? 'Nghiêm trọng'
                    : spot.severity === 'medium'
                      ? 'Trung bình'
                      : 'Thấp'}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Actions */}
      <Card className="bg-card border-border p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Hành động nhanh
        </h3>
        <div className="flex flex-wrap gap-3">
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
            Xem chi tiết bản đồ
          </Button>
          <Button variant="outline" className="border-border bg-transparent">
            Gửi thông báo cán bộ
          </Button>
          <Button variant="outline" className="border-border bg-transparent">
            Xuất báo cáo
          </Button>
        </div>
      </Card>

      {/* Overdue case detail dialog */}
      <Dialog open={isOverdueOpen} onOpenChange={(open) => {
        setIsOverdueOpen(open);
        if (!open) setSelectedOverdue(null);
      }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Chi tiết hồ sơ sắp/quá hạn</DialogTitle>
            <DialogDescription>
              Thông tin chi tiết để lãnh đạo nắm rõ hồ sơ và người chịu trách nhiệm.
            </DialogDescription>
          </DialogHeader>

          {selectedOverdue && (
            <div className="space-y-3 text-sm">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-xs font-medium text-muted-foreground">Mã hồ sơ</p>
                  <p className="font-semibold">{'id' in selectedOverdue ? selectedOverdue.id : '—'}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground">Trạng thái</p>
                  <p className="font-semibold">
                    {'status' in selectedOverdue ? selectedOverdue.status : 'Sắp quá hạn'}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground">Người gửi</p>
                  <p className="font-semibold">
                    {'citizenName' in selectedOverdue ? selectedOverdue.citizenName : '—'}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground">Phòng ban phụ trách</p>
                  <p className="font-semibold">
                    {'department' in selectedOverdue ? selectedOverdue.department : '—'}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground">Ngày tiếp nhận</p>
                  <p className="font-semibold">
                    {'submittedAt' in selectedOverdue ? selectedOverdue.submittedAt : '—'}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground">Hạn giải quyết</p>
                  <p className="font-semibold">{selectedOverdue.deadline}</p>
                </div>
              </div>

              <div className="mt-2 rounded-md bg-status-warning/10 border border-status-warning/30 p-3 text-xs text-muted-foreground">
                <p>
                  <strong>{selectedOverdue.daysLeft}</strong> ngày nữa sẽ quá hạn xử lý.{' '}
                  {'handler' in selectedOverdue && (
                    <>
                      Hồ sơ đang do <strong>{selectedOverdue.handler}</strong> phụ trách.
                    </>
                  )}
                </p>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsOverdueOpen(false)}>
              Đóng
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Serious feedback detail dialog */}
      <Dialog
        open={isFeedbackOpen}
        onOpenChange={(open) => {
          setIsFeedbackOpen(open);
          if (!open) setSelectedFeedback(null);
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Chi tiết phản ánh nghiêm trọng</DialogTitle>
            <DialogDescription>
              Thông tin chi tiết từng phản ánh để lãnh đạo nắm rõ bối cảnh và đơn vị xử lý.
            </DialogDescription>
          </DialogHeader>

          {selectedFeedback && (
            <div className="space-y-3 text-sm">
              <div>
                <p className="text-xs font-medium text-muted-foreground">Tiêu đề phản ánh</p>
                <p className="font-semibold text-foreground">{selectedFeedback.name}</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-xs font-medium text-muted-foreground">Mã phản ánh</p>
                  <p className="font-semibold">{'id' in selectedFeedback ? selectedFeedback.id : '—'}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground">Ngày tiếp nhận</p>
                  <p className="font-semibold">{selectedFeedback.date}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground">Khu vực</p>
                  <p className="font-semibold">
                    {'area' in selectedFeedback ? selectedFeedback.area : '—'}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground">Lĩnh vực</p>
                  <p className="font-semibold">
                    {'category' in selectedFeedback ? selectedFeedback.category : '—'}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground">Kênh tiếp nhận</p>
                  <p className="font-semibold">
                    {'channel' in selectedFeedback ? selectedFeedback.channel : '—'}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground">Mức độ</p>
                  <p className="font-semibold">
                    {selectedFeedback.severity === 'high' ? 'Nghiêm trọng' : 'Trung bình'}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-xs font-medium text-muted-foreground">Đơn vị phụ trách</p>
                  <p className="font-semibold">
                    {'department' in selectedFeedback ? selectedFeedback.department : '—'}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground">Cán bộ xử lý</p>
                  <p className="font-semibold">
                    {'handler' in selectedFeedback ? selectedFeedback.handler : '—'}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-xs font-medium text-muted-foreground">Tình trạng xử lý</p>
                <p className="font-semibold">
                  {'status' in selectedFeedback ? selectedFeedback.status : '—'}
                </p>
              </div>

              {'description' in selectedFeedback && (
                <div className="rounded-md bg-muted/40 border border-border/60 p-3 text-xs text-muted-foreground">
                  {selectedFeedback.description}
                </div>
              )}
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsFeedbackOpen(false)}>
              Đóng
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Hotspot detail dialog */}
      <Dialog
        open={!!selectedHotspot}
        onOpenChange={(open) => {
          if (!open) setSelectedHotspot(null);
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Chi tiết điểm nóng</DialogTitle>
            <DialogDescription>
              Thông tin chi tiết về điểm nóng trên bản đồ GIS để lãnh đạo nắm rõ tình hình.
            </DialogDescription>
          </DialogHeader>

          {selectedHotspot && (
            <div className="space-y-4 text-sm">
              <div>
                <p className="text-xs font-medium text-muted-foreground">Tên điểm nóng</p>
                <p className="font-semibold text-lg text-foreground">{selectedHotspot.name}</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-xs font-medium text-muted-foreground">Loại</p>
                  <p className="font-semibold">{selectedHotspot.type}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground">Mức độ</p>
                  <Badge
                    className={
                      selectedHotspot.severity === 'high'
                        ? 'bg-red-500 text-white'
                        : selectedHotspot.severity === 'medium'
                          ? 'bg-orange-500 text-white'
                          : 'bg-blue-500 text-white'
                    }
                  >
                    {selectedHotspot.severity === 'high'
                      ? 'Nghiêm trọng'
                      : selectedHotspot.severity === 'medium'
                        ? 'Trung bình'
                        : 'Thấp'}
                  </Badge>
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground">Tọa độ GPS</p>
                  <p className="font-semibold text-xs">
                    {selectedHotspot.lat}, {selectedHotspot.lng}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground">Số phản ánh</p>
                  <p className="font-semibold">{selectedHotspot.complaints} phản ánh</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground">Ngày ghi nhận</p>
                  <p className="font-semibold">{selectedHotspot.date}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground">Tình trạng</p>
                  <p className="font-semibold">
                    {'status' in selectedHotspot ? selectedHotspot.status : 'Đang xử lý'}
                  </p>
                </div>
              </div>

              {'description' in selectedHotspot && (
                <div className="rounded-md bg-muted/40 border border-border/60 p-3">
                  <p className="text-xs font-medium text-muted-foreground mb-1">Mô tả tình hình</p>
                  <p className="text-sm text-foreground">{selectedHotspot.description}</p>
                </div>
              )}

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-xs font-medium text-muted-foreground">Đơn vị phụ trách</p>
                  <p className="font-semibold text-xs">
                    {'department' in selectedHotspot ? selectedHotspot.department : '—'}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground">Cán bộ xử lý</p>
                  <p className="font-semibold text-xs">
                    {'handler' in selectedHotspot ? selectedHotspot.handler : '—'}
                  </p>
                </div>
              </div>

              {'relatedCases' in selectedHotspot && selectedHotspot.relatedCases && selectedHotspot.relatedCases.length > 0 && (
                <div className="rounded-md bg-muted/40 border border-border/60 p-3">
                  <p className="text-xs font-medium text-muted-foreground mb-2">Các vụ việc liên quan</p>
                  <div className="space-y-1.5">
                    {selectedHotspot.relatedCases.map((caseItem: any) => (
                      <div key={caseItem.id} className="flex items-center justify-between text-xs">
                        <span className="text-foreground">{caseItem.subject}</span>
                        <span className="text-muted-foreground">{caseItem.date}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="rounded-md bg-muted/40 border border-border/60 p-3">
                <p className="text-xs font-medium text-muted-foreground mb-2">Vị trí trên bản đồ</p>
                <div className="relative h-40 rounded-md overflow-hidden border border-border/60 bg-slate-200">
                  <iframe
                    title={`Bản đồ ${selectedHotspot.name}`}
                    src={`https://www.google.com/maps?q=${selectedHotspot.lat},${selectedHotspot.lng}&z=15&output=embed`}
                    className="w-full h-full border-0"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setSelectedHotspot(null)}>
              Đóng
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
