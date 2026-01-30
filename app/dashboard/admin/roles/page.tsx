'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import { ChevronDown, ChevronRight, Save, X, AlertTriangle, Search } from 'lucide-react';

interface Permission {
  id: string;
  label: string;
  isSensitive?: boolean;
}

interface Screen {
  name: string;
  permissions: Permission[];
}

interface Module {
  id: string;
  name: string;
  screens: Screen[];
}

// Sensitive permissions that need warning
const SENSITIVE_PERMISSIONS = new Set([
  'ai_full_data',
  'digital_signature',
  'manage_roles',
  'system_config',
  'system_logs',
  'approve_dossier',
  'reject_dossier',
]);

const permissionModules: Module[] = [
  {
    id: 'admin',
    name: 'Quản trị hệ thống',
    screens: [
      {
        name: 'Xác thực & Phiên',
        permissions: [
          { id: 'login', label: 'Đăng nhập / Đăng xuất' },
          { id: 'manage_session', label: 'Quản lý phiên đăng nhập' },
        ],
      },
      {
        name: 'Quản lý Người dùng',
        permissions: [
          { id: 'view_users', label: 'Xem danh sách người dùng' },
          { id: 'manage_users', label: 'Tạo/Sửa/Xóa người dùng' },
          { id: 'user_import', label: 'Nhập khẩu người dùng' },
        ],
      },
      {
        name: 'Quản lý Vai trò',
        permissions: [
          { id: 'view_roles', label: 'Xem vai trò' },
          { id: 'manage_roles', label: 'Quản lý vai trò & phân quyền', isSensitive: true },
          { id: 'role_templates', label: 'Quản lý mẫu vai trò' },
        ],
      },
      {
        name: 'Cấu hình Hệ thống',
        permissions: [
          { id: 'view_config', label: 'Xem cấu hình hệ thống' },
          { id: 'system_config', label: 'Cấu hình hệ thống', isSensitive: true },
          { id: 'system_logs', label: 'Xem nhật ký hệ thống', isSensitive: true },
          { id: 'audit_logs', label: 'Xem nhật ký kiểm toán' },
        ],
      },
    ],
  },
  {
    id: 'dashboard',
    name: 'BDashboard & KPI',
    screens: [
      {
        name: 'Dashboard',
        permissions: [
          { id: 'view_dashboard', label: 'Xem dashboard tổng hợp' },
          { id: 'export_dashboard', label: 'Xuất báo cáo dashboard' },
        ],
      },
      {
        name: 'KPI & Chỉ số',
        permissions: [
          { id: 'view_kpi', label: 'Xem KPI' },
          { id: 'manage_kpi', label: 'Quản lý KPI' },
          { id: 'kpi_alerts', label: 'Nhận cảnh báo KPI' },
        ],
      },
    ],
  },
  {
    id: 'ai',
    name: 'Trợ lý ảo AI',
    screens: [
      {
        name: 'Tương tác AI',
        permissions: [
          { id: 'ai_ask', label: 'Hỏi đáp AI' },
          { id: 'ai_conversation', label: 'Lưu cuộc trò chuyện' },
        ],
      },
      {
        name: 'Quyền truy cập',
        permissions: [
          { id: 'ai_domain_data', label: 'AI truy cập dữ liệu theo lĩnh vực' },
          { id: 'ai_full_data', label: 'AI truy cập toàn bộ dữ liệu', isSensitive: true },
          { id: 'ai_analytics', label: 'AI phân tích dữ liệu' },
        ],
      },
    ],
  },
  {
    id: 'dossier',
    name: 'Một cửa điện tử',
    screens: [
      {
        name: 'Tiếp nhận Hồ sơ',
        permissions: [
          { id: 'receive_dossier', label: 'Tiếp nhận hồ sơ' },
          { id: 'dossier_triage', label: 'Phân luồng hồ sơ' },
          { id: 'dossier_assign', label: 'Phân công xử lý' },
        ],
      },
      {
        name: 'Theo dõi Hồ sơ',
        permissions: [
          { id: 'track_dossier', label: 'Theo dõi hồ sơ' },
          { id: 'dossier_search', label: 'Tìm kiếm hồ sơ' },
          { id: 'dossier_history', label: 'Xem lịch sử hồ sơ' },
        ],
      },
      {
        name: 'Trả Kết quả',
        permissions: [
          { id: 'return_result', label: 'Trả kết quả hồ sơ' },
          { id: 'notification', label: 'Gửi thông báo kết quả' },
        ],
      },
    ],
  },
  {
    id: 'approval',
    name: 'Phê duyệt & Ký số',
    screens: [
      {
        name: 'Phê duyệt',
        permissions: [
          { id: 'approve_dossier', label: 'Phê duyệt hồ sơ', isSensitive: true },
          { id: 'reject_dossier', label: 'Từ chối hồ sơ', isSensitive: true },
          { id: 'approval_history', label: 'Xem lịch sử phê duyệt' },
        ],
      },
      {
        name: 'Ký số Điện tử',
        permissions: [
          { id: 'digital_signature', label: 'Ký số điện tử', isSensitive: true },
          { id: 'signature_verify', label: 'Xác minh chữ ký số' },
          { id: 'signature_template', label: 'Quản lý mẫu ký' },
        ],
      },
    ],
  },
  {
    id: 'business',
    name: 'Nghiệp vụ Chuyên ngành',
    screens: [
      {
        name: 'Quản lý Hồ sơ',
        permissions: [
          { id: 'view_dossier', label: 'Xem hồ sơ' },
          { id: 'create_dossier', label: 'Tạo hồ sơ' },
          { id: 'update_dossier', label: 'Cập nhật hồ sơ' },
          { id: 'delete_dossier', label: 'Xóa hồ sơ' },
        ],
      },
      {
        name: 'Xử lý & Ký duyệt',
        permissions: [
          { id: 'submit_dossier', label: 'Trình ký duyệt' },
          { id: 'dossier_workflow', label: 'Quản lý quy trình xử lý' },
        ],
      },
      {
        name: 'Báo cáo',
        permissions: [
          { id: 'view_report', label: 'Xem báo cáo' },
          { id: 'export_report', label: 'Xuất báo cáo' },
          { id: 'schedule_report', label: 'Lên lịch báo cáo' },
        ],
      },
    ],
  },
  {
    id: 'feedback',
    name: 'Phản ánh Hiện trường',
    screens: [
      {
        name: 'Gửi & Xem Phản ánh',
        permissions: [
          { id: 'send_feedback', label: 'Gửi phản ánh' },
          { id: 'view_feedback', label: 'Xem phản ánh' },
          { id: 'feedback_search', label: 'Tìm kiếm phản ánh' },
        ],
      },
      {
        name: 'Xử lý Phản ánh',
        permissions: [
          { id: 'process_feedback', label: 'Xử lý phản ánh' },
          { id: 'feedback_close', label: 'Đóng phản ánh' },
          { id: 'public_result', label: 'Công khai kết quả xử lý' },
        ],
      },
    ],
  },
  {
    id: 'reporting',
    name: 'Báo cáo – Thống kê',
    screens: [
      {
        name: 'Báo cáo',
        permissions: [
          { id: 'view_report_stat', label: 'Xem báo cáo' },
          { id: 'export_report_stat', label: 'Xuất PDF / Excel' },
          { id: 'report_builder', label: 'Tạo báo cáo tự định nghĩa' },
        ],
      },
      {
        name: 'Thống kê',
        permissions: [
          { id: 'statistics', label: 'Xem thống kê' },
          { id: 'statistics_export', label: 'Xuất thống kê' },
        ],
      },
    ],
  },
  {
    id: 'citizen',
    name: 'Cổng Công dân',
    screens: [
      {
        name: 'Tài khoản',
        permissions: [
          { id: 'register', label: 'Đăng ký tài khoản' },
          { id: 'profile', label: 'Quản lý hồ sơ cá nhân' },
          { id: 'change_password', label: 'Thay đổi mật khẩu' },
        ],
      },
      {
        name: 'Nộp & Theo dõi Hồ sơ',
        permissions: [
          { id: 'submit_dossier_citizen', label: 'Nộp hồ sơ' },
          { id: 'track_dossier_citizen', label: 'Theo dõi hồ sơ' },
          { id: 'download_result', label: 'Tải kết quả' },
        ],
      },
    ],
  },
];

const roles = [
  { id: 1, label: 'Quản trị viên' },
  { id: 2, label: 'Lãnh đạo' },
  { id: 3, label: 'Cán bộ' },
  { id: 4, label: 'Công dân' },
];

export default function RolesPage() {
  const [selectedRole, setSelectedRole] = useState<string>('1');
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(
    new Set(permissionModules.map((m) => m.id))
  );
  const [selectedPermissions, setSelectedPermissions] = useState<Set<string>>(
    new Set()
  );
  const [hasChanges, setHasChanges] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Permission presets for quick assignment
  const presets = {
    '1': new Set(['login', 'manage_users', 'manage_roles', 'system_config', 'system_logs', 'view_dashboard', 'view_kpi', 'kpi_alerts', 'ai_ask', 'ai_full_data', 'ai_domain_data', 'receive_dossier', 'route_dossier', 'track_dossier', 'return_result', 'approve_dossier', 'reject_dossier', 'digital_signature', 'view_dossier', 'create_dossier', 'update_dossier', 'submit_dossier', 'view_report', 'send_feedback', 'view_feedback', 'process_feedback', 'public_result', 'view_report_stat', 'export_report', 'register', 'submit_dossier_citizen', 'track_dossier_citizen']),
    '2': new Set(['login', 'view_dashboard', 'view_kpi', 'kpi_alerts', 'ai_ask', 'receive_dossier', 'track_dossier', 'approve_dossier', 'reject_dossier', 'view_dossier', 'view_report', 'view_feedback', 'process_feedback', 'view_report_stat', 'export_report']),
    '3': new Set(['login', 'view_dashboard', 'view_kpi', 'ai_ask', 'receive_dossier', 'track_dossier', 'view_dossier', 'create_dossier', 'update_dossier', 'submit_dossier', 'view_report', 'view_feedback', 'view_report_stat']),
    '4': new Set(['login', 'register', 'submit_dossier_citizen', 'track_dossier_citizen', 'ai_ask']),
  };

  // Get all permissions
  const allPermissions = permissionModules.flatMap(m => 
    m.screens.flatMap(s => s.permissions)
  );

  // Filter modules based on search
  const getVisibleModules = () => {
    if (!searchQuery.trim()) return permissionModules;
    
    const query = searchQuery.toLowerCase();
    return permissionModules
      .map(module => ({
        ...module,
        screens: module.screens
          .map(screen => ({
            ...screen,
            permissions: screen.permissions.filter(perm =>
              perm.label.toLowerCase().includes(query) ||
              perm.id.toLowerCase().includes(query)
            ),
          }))
          .filter(screen => screen.permissions.length > 0),
      }))
      .filter(module => module.screens.length > 0);
  };

  // Calculate permission level
  const getPermissionLevel = (roleId: string) => {
    const preset = presets[roleId as keyof typeof presets];
    if (!preset) return 0;
    const percentage = (preset.size / allPermissions.length) * 100;
    return Math.round(percentage / 20); // 0-5 level
  };

  const toggleGroup = (moduleId: string) => {
    const newExpanded = new Set(expandedGroups);
    if (newExpanded.has(moduleId)) {
      newExpanded.delete(moduleId);
    } else {
      newExpanded.add(moduleId);
    }
    setExpandedGroups(newExpanded);
  };

  const togglePermission = (permissionId: string) => {
    const newPermissions = new Set(selectedPermissions);
    if (newPermissions.has(permissionId)) {
      newPermissions.delete(permissionId);
    } else {
      newPermissions.add(permissionId);
    }
    setSelectedPermissions(newPermissions);
    setHasChanges(true);
  };

  const toggleGroupPermissions = (moduleId: string, allow: boolean) => {
    const module = permissionModules.find((m) => m.id === moduleId);
    if (!module) return;

    const newPermissions = new Set(selectedPermissions);
    module.screens.forEach((screen) => {
      screen.permissions.forEach((perm) => {
        if (allow) {
          newPermissions.add(perm.id);
        } else {
          newPermissions.delete(perm.id);
        }
      });
    });
    setSelectedPermissions(newPermissions);
    setHasChanges(true);
  };

  const handleSave = () => {
    console.log('Lưu quyền cho vai trò', selectedRole, Array.from(selectedPermissions));
    setHasChanges(false);
  };

  const handleReset = () => {
    setSelectedPermissions(new Set());
    setHasChanges(false);
  };

  const applyPreset = (presetName: 'standard' | 'view' | 'full') => {
    const presetMap = {
      'standard': presets[selectedRole as keyof typeof presets] || new Set(),
      'view': new Set(['login', 'view_dashboard', 'view_kpi', 'view_dossier', 'view_feedback', 'view_report_stat', 'view_report']),
      'full': new Set(allPermissions.map(p => p.id)),
    };
    setSelectedPermissions(presetMap[presetName]);
    setHasChanges(true);
  };

  return (
    <div className="space-y-3 flex flex-col min-h-screen">
      {/* Page Header */}
      <div className="rounded-lg bg-[var(--banner)] px-3 py-2">
        <h1 className="text-2xl font-bold text-foreground">Vai trò & Quyền</h1>
        <p className="text-muted-foreground mt-0.5 text-sm">
          Quản lý vai trò và phân quyền cho người dùng hệ thống
        </p>
      </div>

      {/* 2-Column Layout */}
      <div className="flex-1 flex gap-3 overflow-hidden">
        
        {/* Left Sidebar - Role List */}
        <Card className="bg-card border-border p-3 w-72 overflow-y-auto flex flex-col gap-2">
          <div>
            <h3 className="font-bold text-sm text-foreground mb-2">Danh sách vai trò</h3>
          </div>
          
          {roles.map((role) => (
            <button
              key={role.id}
              onClick={() => setSelectedRole(role.id.toString())}
              className={`px-3 py-2 rounded text-sm text-left transition-colors ${
                selectedRole === role.id.toString()
                  ? 'bg-primary text-primary-foreground font-medium'
                  : 'bg-input hover:bg-secondary text-foreground'
              }`}
            >
              {role.label}
            </button>
          ))}
        </Card>

        {/* Right Content - Role Details */}
        <div className="flex-1 flex flex-col gap-3 overflow-hidden">
          
          {/* Role Details Header */}
          <Card className="bg-card border-border p-3 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-foreground">
                {roles.find(r => r.id.toString() === selectedRole)?.label}
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">Mức quyền:</span>
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-3 h-3 rounded-sm ${
                      i < getPermissionLevel(selectedRole)
                        ? 'bg-amber-500'
                        : 'bg-border'
                    }`}
                  />
                ))}
              </div>
            </div>
          </Card>

          {/* Quick Presets */}
          <Card className="bg-card border-border p-3">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs text-muted-foreground">Áp dụng mẫu nhanh:</span>
              <Button
                onClick={() => applyPreset('standard')}
                variant="outline"
                size="sm"
                className="h-7 text-xs bg-transparent border-border hover:bg-secondary"
              >
                Chuẩn {roles.find(r => r.id.toString() === selectedRole)?.label}
              </Button>
              <Button
                onClick={() => applyPreset('view')}
                variant="outline"
                size="sm"
                className="h-7 text-xs bg-transparent border-border hover:bg-secondary"
              >
                Chỉ xem
              </Button>
              <Button
                onClick={() => applyPreset('full')}
                variant="outline"
                size="sm"
                className="h-7 text-xs bg-transparent border-border hover:bg-secondary"
              >
                Toàn quyền
              </Button>
              <Button
                onClick={() => setSelectedPermissions(new Set())}
                variant="outline"
                size="sm"
                className="h-7 text-xs bg-transparent border-border hover:bg-secondary ml-auto"
              >
                Xóa tất cả
              </Button>
            </div>
          </Card>

          {/* Permissions Container */}
          <Card className="bg-card border-border p-3 flex-1 overflow-y-auto flex flex-col gap-3">
            {/* Search Permissions */}
            <div className="flex items-center gap-2 px-1 py-1 bg-input rounded border border-border flex-shrink-0">
              <Search className="w-4 h-4 text-muted-foreground flex-shrink-0" />
              <input
                type="text"
                placeholder="Tìm quyền... (ví dụ: ký, AI, báo cáo)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-transparent text-sm text-foreground placeholder-muted-foreground outline-none"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="text-muted-foreground hover:text-foreground"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Permissions Tree */}
            <div className="space-y-2">
              {getVisibleModules().map((module) => {
                const isExpanded = expandedGroups.has(module.id);
                const allModulePermissions = module.screens.flatMap(s => s.permissions);
                const modulePermissions = allModulePermissions.filter((p) =>
                  selectedPermissions.has(p.id)
                );
                const allSelected = modulePermissions.length === allModulePermissions.length;

                return (
                  <div key={module.id} className="border border-border/50 rounded bg-background/50 overflow-hidden">
                    {/* Module Header */}
                    <div className="flex items-center gap-2 cursor-pointer px-3 py-2 hover:bg-background/80 transition-colors border-b border-border/30">
                      <button
                        onClick={() => toggleGroup(module.id)}
                        className="text-foreground hover:text-primary flex-shrink-0"
                      >
                        {isExpanded ? (
                          <ChevronDown className="w-4 h-4" />
                        ) : (
                          <ChevronRight className="w-4 h-4" />
                        )}
                      </button>

                      <Checkbox
                        checked={allSelected && allModulePermissions.length > 0}
                        onCheckedChange={(checked) =>
                          toggleGroupPermissions(module.id, checked as boolean)
                        }
                        className="border-border flex-shrink-0 w-5 h-5"
                      />

                      <label
                        onClick={() => toggleGroup(module.id)}
                        className="flex-1 font-bold text-foreground cursor-pointer text-sm"
                      >
                        📦 {module.name}
                      </label>

                      <span className="text-xs text-muted-foreground flex-shrink-0">
                        {modulePermissions.length}/{allModulePermissions.length}
                      </span>
                    </div>

                    {/* Screens & Permissions */}
                    {isExpanded && (
                      <div className="space-y-0">
                        {module.screens.map((screen, screenIdx) => {
                          const screenPermissions = screen.permissions.filter(p => 
                            selectedPermissions.has(p.id)
                          );
                          const screenAllSelected = screenPermissions.length === screen.permissions.length;

                          return (
                            <div key={screen.name} className={`px-3 py-2 ${screenIdx > 0 ? 'border-t border-border/20' : ''}`}>
                              {/* Screen Header */}
                              <div className="flex items-center gap-2 mb-2">
                                <Checkbox
                                  checked={screenAllSelected && screen.permissions.length > 0}
                                  onCheckedChange={(checked) => {
                                    const newPerms = new Set(selectedPermissions);
                                    screen.permissions.forEach(p => {
                                      if (checked) newPerms.add(p.id);
                                      else newPerms.delete(p.id);
                                    });
                                    setSelectedPermissions(newPerms);
                                    setHasChanges(true);
                                  }}
                                  className="border-border flex-shrink-0"
                                />
                                <span className="text-xs font-semibold text-foreground/80">
                                  🖥️ {screen.name}
                                </span>
                                <span className="text-xs text-muted-foreground ml-auto">
                                  {screenPermissions.length}/{screen.permissions.length}
                                </span>
                              </div>

                              {/* Functions */}
                              <div className="ml-6 space-y-1">
                                {screen.permissions.map((permission) => (
                                  <div key={permission.id} className="flex items-start gap-2 py-1">
                                    <Checkbox
                                      checked={selectedPermissions.has(permission.id)}
                                      onCheckedChange={() => togglePermission(permission.id)}
                                      className="border-border flex-shrink-0 mt-0.5"
                                    />
                                    <div className="flex items-start gap-1.5 flex-1 min-w-0">
                                      <Label className="text-xs text-foreground cursor-pointer leading-tight">
                                        {permission.label}
                                      </Label>
                                      {permission.isSensitive && (
                                        <div title="Quyền nhạy cảm - ảnh hưởng toàn hệ thống" className="flex items-center cursor-help">
                                          <AlertTriangle className="w-3 h-3 text-amber-500 flex-shrink-0 mt-0.5" />
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Action Buttons - Sticky Footer */}
            <div className="flex gap-3 items-center mt-4 pt-4 border-t border-border sticky bottom-0 bg-card/95 backdrop-blur z-20 px-3 py-3 flex-shrink-0" style={{display: hasChanges ? 'flex' : 'none'}}>
              <Button
                onClick={handleSave}
                disabled={!hasChanges}
                className="bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 text-sm h-9 px-4 font-medium"
              >
                <Save className="w-4 h-4 mr-2" />
                Lưu thay đổi
              </Button>
              <Button
                onClick={handleReset}
                variant="outline"
                className="border-border bg-transparent text-foreground hover:bg-secondary text-sm h-9 px-4"
              >
                <X className="w-4 h-4 mr-2" />
                Hủy
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
