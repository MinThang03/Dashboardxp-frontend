'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, MapPin, Zap, Clock } from 'lucide-react';

const alertsList = [
  {
    id: 1,
    type: 'overdue',
    title: 'Hồ sơ sắp quá hạn',
    count: 3,
    items: [
      { name: 'Cấp phép xây dựng', deadline: '2024-01-18', daysLeft: 1 },
      { name: 'Bổ sung thửa đất', deadline: '2024-01-19', daysLeft: 2 },
      { name: 'Xác nhận thông tin', deadline: '2024-01-20', daysLeft: 3 },
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
      { name: 'Ô nhiễm môi trường Khu A', severity: 'high', date: '2024-01-15' },
      { name: 'Tranh chấp đất đai Khu B', severity: 'high', date: '2024-01-14' },
      { name: 'Cấp nước không đủ', severity: 'medium', date: '2024-01-13' },
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
  },
];

export default function AlertsPage() {
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
                    className="flex items-center justify-between p-3 rounded-lg bg-status-warning/10 border border-status-warning/30"
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
                            : `Quá hạn trong ${item.daysLeft} ngày`}
                        </p>
                      </div>
                    </div>
                    <Badge className="bg-status-warning text-black">
                      {item.deadline}
                    </Badge>
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
                    className={`flex items-center justify-between p-3 rounded-lg border ${
                      item.severity === 'high'
                        ? 'bg-red-500/10 border-red-500/30'
                        : 'bg-orange-500/10 border-orange-500/30'
                    }`}
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

        {/* Simple text representation of map */}
        <div className="bg-secondary/30 rounded-lg p-6 mb-4 text-center text-muted-foreground">
          <MapPin className="w-8 h-8 mx-auto mb-2 opacity-50" />
          <p className="text-sm">
            Bản đồ GIS (tích hợp với Google Maps trong production)
          </p>
        </div>

        {/* Hotspot List */}
        <div className="space-y-2">
          <h4 className="text-sm font-semibold text-foreground mb-3">
            Danh sách điểm nóng
          </h4>
          {hotspots.map((spot) => (
            <div
              key={spot.id}
              className={`p-4 rounded-lg border ${
                spot.severity === 'high'
                  ? 'bg-red-500/10 border-red-500/30'
                  : spot.severity === 'medium'
                    ? 'bg-orange-500/10 border-orange-500/30'
                    : 'bg-blue-500/10 border-blue-500/30'
              }`}
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
    </div>
  );
}
