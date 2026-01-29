'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useState } from 'react';
import { CheckCircle2, XCircle, Eye, FileText } from 'lucide-react';

const pendingApprovals = [
  {
    id: 1,
    title: 'Báo cáo tài chính quý I',
    department: 'Tài chính - Kế toán',
    submittedBy: 'Nguyễn Văn A',
    submittedDate: '2024-01-17',
    priority: 'critical',
    status: 'pending',
    fileName: 'bao-cao-tai-chinh-Q1.pdf',
    fileType: 'PDF',
    fileSize: '2.4 MB',
    summary: 'Báo cáo chi tiết thu chi ngân sách quý I, so sánh với cùng kỳ và dự toán năm.',
  },
  {
    id: 2,
    title: 'Kế hoạch phát triển năm 2024',
    department: 'Chủ tịch UBND',
    submittedBy: 'Trần Thị B',
    submittedDate: '2024-01-16',
    priority: 'high',
    status: 'pending',
    fileName: 'ke-hoach-phat-trien-2024.docx',
    fileType: 'Word',
    fileSize: '1.2 MB',
    summary: 'Đề xuất mục tiêu, chỉ tiêu phát triển KT-XH năm 2024 của toàn xã.',
  },
  {
    id: 3,
    title: 'Quy hoạch xây dựng khu A',
    department: 'Địa chính - Xây dựng',
    submittedBy: 'Lê Văn C',
    submittedDate: '2024-01-15',
    priority: 'high',
    status: 'pending',
    fileName: 'quy-hoach-xay-dung-khu-A.zip',
    fileType: 'Bản vẽ + Thuyết minh',
    fileSize: '8.9 MB',
    summary: 'Hồ sơ quy hoạch chi tiết tỷ lệ 1/500 khu A, kèm bản vẽ và thuyết minh kỹ thuật.',
  },
];

const recentlyApproved = [
  {
    id: 101,
    title: 'Báo cáo hoạt động tháng 12',
    department: 'Tư pháp - Hộ tịch',
    approvedDate: '2024-01-10',
    approvedBy: 'Trần Thị Lãnh Đạo',
    signed: true,
    fileName: 'bao-cao-hoat-dong-12-2023.pdf',
    fileType: 'PDF',
    fileSize: '1.8 MB',
  },
  {
    id: 102,
    title: 'Kế hoạch cơ cấu lại bộ máy',
    department: 'Hành chính - Nhân sự',
    approvedDate: '2024-01-09',
    approvedBy: 'Trần Thị Lãnh Đạo',
    signed: true,
    fileName: 'ke-hoach-co-cau-bo-may.docx',
    fileType: 'Word',
    fileSize: '950 KB',
  },
];

export default function ApprovalsPage() {
  const [selectedApproval, setSelectedApproval] = useState<typeof pendingApprovals[0] | null>(null);
  const [approvalAction, setApprovalAction] = useState<'approve' | 'reject' | null>(null);
  const [selectedHistory, setSelectedHistory] = useState<(typeof recentlyApproved)[0] | null>(null);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical':
        return 'bg-red-500 text-white';
      case 'high':
        return 'bg-orange-500 text-white';
      default:
        return 'bg-blue-500 text-white';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">
          Phê duyệt & Ký số
        </h1>
        <p className="text-muted-foreground mt-1">
          Xem xét và phê duyệt các tài liệu, báo cáo cần ký số
        </p>
      </div>

      {/* Pending Approvals */}
      <div>
        <h2 className="text-xl font-semibold text-foreground mb-4">
          Chờ phê duyệt ({pendingApprovals.length})
        </h2>
        <div className="space-y-3">
          {pendingApprovals.map((approval) => (
            <Card
              key={approval.id}
              className="bg-card border-border p-6 cursor-pointer hover:border-primary/50 transition"
              onClick={() => setSelectedApproval(approval)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-foreground text-lg">
                      {approval.title}
                    </h3>
                    <Badge className={getPriorityColor(approval.priority)}>
                      {approval.priority === 'critical'
                        ? 'Khẩn cấp'
                        : 'Cao'}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {approval.department} • Nộp bởi {approval.submittedBy} • {approval.submittedDate}
                  </p>
                </div>

                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-border bg-transparent"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedApproval(approval);
                    }}
                  >
                    <Eye className="w-4 h-4 mr-1" />
                    Xem
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Recently Approved */}
      <div>
        <h2 className="text-xl font-semibold text-foreground mb-4">
          Đã phê duyệt gần đây
        </h2>
        <div className="space-y-3">
          {recentlyApproved.map((approval) => (
            <Card
              key={approval.id}
              className="bg-secondary/20 border-border p-6"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <CheckCircle2 className="w-5 h-5 text-status-success flex-shrink-0" />
                    <h3 className="font-semibold text-foreground">
                      {approval.title}
                    </h3>
                    {approval.signed && (
                      <Badge className="bg-blue-500 text-white">Đã ký</Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {approval.department} • Phê duyệt bởi {approval.approvedBy} • {approval.approvedDate}
                  </p>
                </div>

                <Button
                  size="sm"
                  variant="outline"
                  className="border-border bg-transparent"
                  onClick={() => setSelectedHistory(approval)}
                >
                  <FileText className="w-4 h-4 mr-1" />
                  Xem
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Approval Modal & Action - dialog giữa màn hình, nền tối */}
      <Dialog
        open={!!selectedApproval}
        onOpenChange={(open) => {
          if (!open) {
            setSelectedApproval(null);
            setApprovalAction(null);
          }
        }}
      >
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Phê duyệt & ký số</DialogTitle>
            <DialogDescription>
              Xem chi tiết tài liệu và xác nhận phê duyệt / từ chối.
            </DialogDescription>
          </DialogHeader>

          {selectedApproval && (
            <div className="space-y-4 text-sm">
              <div className="grid grid-cols-1 gap-3">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Tiêu đề</p>
                  <p className="font-semibold text-foreground">{selectedApproval.title}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Bộ phận</p>
                  <p className="text-foreground">
                    {selectedApproval.department}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Người nộp</p>
                  <p className="text-foreground">
                    {selectedApproval.submittedBy} • {selectedApproval.submittedDate}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Mức ưu tiên</p>
                  <Badge className={getPriorityColor(selectedApproval.priority)}>
                    {selectedApproval.priority === 'critical' ? 'Khẩn cấp' : 'Cao'}
                  </Badge>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3 rounded-md bg-secondary/20 border border-border/60 p-3">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Tệp tài liệu</p>
                  <p className="text-foreground text-sm font-medium">
                    {selectedApproval.fileName} ({selectedApproval.fileType})
                  </p>
                </div>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>Kích thước: {selectedApproval.fileSize}</span>
                  <button className="text-primary text-xs font-semibold flex items-center gap-1">
                    <FileText className="w-3 h-3" />
                    Xem bản xem nhanh
                  </button>
                </div>
                {selectedApproval.summary && (
                  <p className="text-xs text-muted-foreground">
                    {selectedApproval.summary}
                  </p>
                )}
              </div>

              {approvalAction === null && (
                <div className="pt-2 flex gap-2">
                  <Button
                    className="flex-1 bg-status-success text-white hover:bg-status-success/90"
                    onClick={() => setApprovalAction('approve')}
                  >
                    <CheckCircle2 className="w-4 h-4 mr-1" />
                    Phê duyệt & ký số
                  </Button>
                  <Button
                    className="flex-1 bg-status-danger text-white hover:bg-status-danger/90"
                    onClick={() => setApprovalAction('reject')}
                  >
                    <XCircle className="w-4 h-4 mr-1" />
                    Từ chối
                  </Button>
                </div>
              )}

              {approvalAction === 'approve' && (
                <div className="space-y-3">
                  <p className="text-sm text-foreground">
                    Bạn sắp <span className="font-semibold">phê duyệt và ký số</span> tài liệu này. Vui lòng
                    kiểm tra thông tin lần cuối trước khi xác nhận.
                  </p>
                  <div className="bg-secondary/20 rounded p-3 text-xs text-muted-foreground">
                    <p className="mb-1 font-medium text-foreground">{selectedApproval.title}</p>
                    <p>{selectedApproval.department}</p>
                    <p>Nộp bởi {selectedApproval.submittedBy} • {selectedApproval.submittedDate}</p>
                  </div>
                </div>
              )}

              {approvalAction === 'reject' && (
                <div className="space-y-3">
                  <p className="text-sm text-foreground">
                    Bạn sắp <span className="font-semibold">từ chối</span> tài liệu này. Có thể ghi chú lý do để
                    đơn vị biết và chỉnh sửa.
                  </p>
                  <textarea
                    placeholder="Lý do từ chối..."
                    rows={3}
                    className="w-full p-3 bg-input border border-border rounded-md text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              )}
            </div>
          )}

          <DialogFooter>
            {approvalAction && (
              <Button
                className={`text-white ${
                  approvalAction === 'approve'
                    ? 'bg-status-success hover:bg-status-success/90'
                    : 'bg-status-danger hover:bg-status-danger/90'
                }`}
                onClick={() => {
                  setSelectedApproval(null);
                  setApprovalAction(null);
                }}
              >
                {approvalAction === 'approve' ? 'Xác nhận phê duyệt' : 'Xác nhận từ chối'}
              </Button>
            )}
            <Button
              variant="outline"
              onClick={() => {
                setSelectedApproval(null);
                setApprovalAction(null);
              }}
            >
              Đóng
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Recently approved detail dialog */}
      <Dialog
        open={!!selectedHistory}
        onOpenChange={(open) => {
          if (!open) {
            setSelectedHistory(null);
          }
        }}
      >
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Chi tiết tài liệu đã phê duyệt</DialogTitle>
            <DialogDescription>
              Thông tin tài liệu, bộ phận và cán bộ đã ký duyệt.
            </DialogDescription>
          </DialogHeader>

          {selectedHistory && (
            <div className="space-y-3 text-sm">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Tiêu đề</p>
                <p className="font-semibold text-foreground">{selectedHistory.title}</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Bộ phận</p>
                  <p className="text-foreground">{selectedHistory.department}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Ngày phê duyệt</p>
                  <p className="text-foreground">{selectedHistory.approvedDate}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Cán bộ phê duyệt</p>
                  <p className="text-foreground font-medium">{selectedHistory.approvedBy}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Tình trạng</p>
                  <Badge className="bg-status-success text-white">Đã ký số</Badge>
                </div>
              </div>

              <div className="rounded-md bg-secondary/20 border border-border/60 p-3">
                <p className="text-xs text-muted-foreground mb-1">Tệp tài liệu</p>
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-foreground">
                    {selectedHistory.fileName} ({selectedHistory.fileType}) • {selectedHistory.fileSize}
                  </p>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-primary text-primary hover:bg-primary/10"
                    onClick={() => {
                      // Mở tài liệu trong tab mới (giả lập)
                      window.open(`/api/documents/${selectedHistory.fileName}`, '_blank');
                    }}
                  >
                    <FileText className="w-4 h-4 mr-1" />
                    Xem tài liệu
                  </Button>
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setSelectedHistory(null)}>
              Đóng
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
