'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
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
  },
  {
    id: 2,
    title: 'Kế hoạch phát triển năm 2024',
    department: 'Chủ tịch UBND',
    submittedBy: 'Trần Thị B',
    submittedDate: '2024-01-16',
    priority: 'high',
    status: 'pending',
  },
  {
    id: 3,
    title: 'Quy hoạch xây dựng khu A',
    department: 'Địa chính - Xây dựng',
    submittedBy: 'Lê Văn C',
    submittedDate: '2024-01-15',
    priority: 'high',
    status: 'pending',
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
  },
  {
    id: 102,
    title: 'Kế hoạch cơ cấu lại bộ máy',
    department: 'Hành chính - Nhân sự',
    approvedDate: '2024-01-09',
    approvedBy: 'Trần Thị Lãnh Đạo',
    signed: true,
  },
];

export default function ApprovalsPage() {
  const [selectedApproval, setSelectedApproval] = useState<typeof pendingApprovals[0] | null>(null);
  const [approvalAction, setApprovalAction] = useState<'approve' | 'reject' | null>(null);

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
                >
                  <FileText className="w-4 h-4 mr-1" />
                  Xem
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Approval Modal */}
      {selectedApproval && !approvalAction && (
        <Card className="bg-card border-border p-6 fixed bottom-6 right-6 w-96 shadow-lg z-50 max-h-96 overflow-y-auto">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">
              Chi tiết phê duyệt
            </h3>

            <div>
              <p className="text-xs text-muted-foreground mb-1">Tiêu đề</p>
              <p className="font-medium text-foreground">
                {selectedApproval.title}
              </p>
            </div>

            <div>
              <p className="text-xs text-muted-foreground mb-1">Bộ phận</p>
              <p className="text-foreground text-sm">
                {selectedApproval.department}
              </p>
            </div>

            <div>
              <p className="text-xs text-muted-foreground mb-1">
                Người nộp
              </p>
              <p className="text-foreground text-sm">
                {selectedApproval.submittedBy} ({selectedApproval.submittedDate})
              </p>
            </div>

            <div className="pt-4 flex gap-2">
              <Button
                className="flex-1 bg-status-success text-white hover:bg-status-success/90"
                onClick={() => setApprovalAction('approve')}
              >
                <CheckCircle2 className="w-4 h-4 mr-1" />
                Phê duyệt
              </Button>
              <Button
                className="flex-1 bg-status-danger text-white hover:bg-status-danger/90"
                onClick={() => setApprovalAction('reject')}
              >
                <XCircle className="w-4 h-4 mr-1" />
                Từ chối
              </Button>
            </div>

            <Button
              variant="outline"
              className="w-full border-border bg-transparent"
              onClick={() => setSelectedApproval(null)}
            >
              Đóng
            </Button>
          </div>
        </Card>
      )}

      {/* Approval Action */}
      {selectedApproval && approvalAction && (
        <Card className="bg-card border-border p-6 fixed bottom-6 right-6 w-96 shadow-lg z-50">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            {approvalAction === 'approve'
              ? 'Xác nhận phê duyệt'
              : 'Xác nhận từ chối'}
          </h3>

          {approvalAction === 'approve' && (
            <div className="space-y-4">
              <p className="text-sm text-foreground">
                Bạn sắp phê duyệt và ký số tài liệu này. Vui lòng xác nhận.
              </p>
              <div className="bg-secondary/20 rounded p-3">
                <p className="text-xs text-muted-foreground mb-1">
                  Tài liệu
                </p>
                <p className="font-medium text-foreground">
                  {selectedApproval.title}
                </p>
              </div>
            </div>
          )}

          {approvalAction === 'reject' && (
            <div className="space-y-4">
              <p className="text-sm text-foreground">
                Vui lòng nhập lý do từ chối:
              </p>
              <textarea
                placeholder="Lý do từ chối..."
                rows={3}
                className="w-full p-3 bg-input border border-border rounded-md text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          )}

          <div className="mt-4 flex gap-2">
            <Button
              className={`flex-1 text-white ${
                approvalAction === 'approve'
                  ? 'bg-status-success hover:bg-status-success/90'
                  : 'bg-status-danger hover:bg-status-danger/90'
              }`}
            >
              {approvalAction === 'approve' ? 'Xác nhận phê duyệt' : 'Xác nhận từ chối'}
            </Button>
            <Button
              variant="outline"
              className="flex-1 border-border bg-transparent"
              onClick={() => setApprovalAction(null)}
            >
              Hủy
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
}
