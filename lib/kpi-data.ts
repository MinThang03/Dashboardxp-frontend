// KPI Data - Central Command Center & Department Tracking

// 1. Budget Revenue KPI
export const budgetRevenueKPI = {
  title: 'Tiến độ thu ngân sách xã/phường năm 2025-2026',
  period: '2025-2026',
  unit: 'Tỷ đồng',
  target: 150,
  current: 98.5,
  percentage: 65.7,
  trend: 'up' as const,
  monthlyData: [
    { month: 'T1', value: 12.5 },
    { month: 'T2', value: 15.3 },
    { month: 'T3', value: 18.7 },
    { month: 'T4', value: 22.1 },
    { month: 'T5', value: 30.9 },
  ],
  priority: 3,
  department: 'Kế toán trưởng / Phòng Tài chính - Kế hoạch',
};

// 2. Investment Capital Disbursement
export const investmentDisbursementKPI = {
  title: 'Tiến độ giải ngân vốn đầu tư công',
  unit: 'Tỷ đồng',
  target: 80,
  current: 52.4,
  percentage: 65.5,
  trend: 'up' as const,
  monthlyData: [
    { month: 'T1', value: 5.2 },
    { month: 'T2', value: 8.9 },
    { month: 'T3', value: 12.3 },
    { month: 'T4', value: 15.7 },
    { month: 'T5', value: 10.3 },
  ],
  priority: 3,
  department: 'Kế toán trưởng / Phòng Tài chính - Kế hoạch',
};

// 3. Administrative Dossier Statistics
export const dossierStatisticsKPI = {
  title: 'Thống kê hồ sơ hành chính (6-12 tháng)',
  period: '6 tháng',
  stats: {
    total: 2450,
    online: 1680,
    onTime: 2205,
    overdue: 245,
  },
  percentages: {
    onlineRate: 68.6,
    onTimeRate: 90,
    overdueRate: 10,
  },
  monthlyTrend: [
    { month: 'T1', total: 380, online: 245, onTime: 358, overdue: 22 },
    { month: 'T2', total: 395, online: 268, onTime: 366, overdue: 29 },
    { month: 'T3', total: 410, online: 295, onTime: 390, overdue: 20 },
    { month: 'T4', total: 425, online: 312, onTime: 401, overdue: 24 },
    { month: 'T5', total: 440, online: 340, onTime: 420, overdue: 20 },
  ],
  priority: 3,
  department: 'Văn phòng UBND xã / Bộ phận Một cửa',
};

// 4. Citizen Satisfaction Level
export const citizenSatisfactionKPI = {
  title: 'Mức độ hài lòng người dân',
  overall: 8.2,
  maxScore: 10,
  categories: [
    { name: 'Chất lượng dịch vụ', score: 8.5 },
    { name: 'Tốc độ giải quyết', score: 7.8 },
    { name: 'Thái độ nhân viên', score: 8.4 },
    { name: 'Minh bạch, công khai', score: 8.1 },
  ],
  trend: 'stable' as const,
  priority: 2,
  department: 'Văn phòng UBND xã / Bộ phận Một cửa',
};

// 5. Criminal Violations & Social Evils
export const crimeStatisticsKPI = {
  title: 'Số vụ phạm pháp hình sự, tệ nạn xã hội (6-12 tháng)',
  period: '6 tháng',
  categories: [
    { name: 'Trộm cắp', count: 12, trend: 'down' as const },
    { name: 'Cướp giật', count: 3, trend: 'down' as const },
    { name: 'Tệ nạn ma tuý', count: 5, trend: 'up' as const },
    { name: 'Đánh bạc', count: 7, trend: 'stable' as const },
    { name: 'Tranh chấp dân sự', count: 18, trend: 'up' as const },
  ],
  totalViolations: 45,
  trend: 'stable' as const,
  monthlyData: [
    { month: 'T1', violations: 6 },
    { month: 'T2', violations: 8 },
    { month: 'T3', violations: 7 },
    { month: 'T4', violations: 8 },
    { month: 'T5', violations: 16 },
  ],
  priority: 3,
  department: 'Công an xã',
};

// 6. Petition & Complaint Statistics
export const petitionStatisticsKPI = {
  title: 'Số lượng đơn thư khiếu nại, tố cáo',
  pending: 8,
  resolved: 42,
  resolutionRate: 84,
  categories: [
    { name: 'Khiếu nại hành chính', count: 15 },
    { name: 'Tố cáo tham nhũng', count: 5 },
    { name: 'Khiếu nại lao động', count: 18 },
    { name: 'Khác', count: 12 },
  ],
  averageResolutionDays: 28,
  priority: 3,
  department: 'Ban Tiếp dân / Văn phòng UBND xã',
};

// 7-10. Land Management Data
export const landManagementKPI = {
  landUsageMap: {
    title: 'Bản đồ sử dụng đất hiện trạng',
    lastUpdated: '2025-01-15',
    totalArea: 8527, // hectares
    categories: [
      { name: 'Nông nghiệp', area: 6200, percentage: 72.7 },
      { name: 'Xây dựng', area: 1250, percentage: 14.7 },
      { name: 'Rừng', area: 450, percentage: 5.3 },
      { name: 'Nước', area: 320, percentage: 3.8 },
      { name: 'Khác', area: 307, percentage: 3.6 },
    ],
    priority: 3,
  },
  certificateIssued: {
    title: 'Danh sách cấp Giấy chứng nhận QSDĐ',
    totalIssued: 3456,
    thisYear: 456,
    pending: 34,
    rejectedCases: 8,
    priority: 3,
  },
  disputes: {
    title: 'Danh sách tranh chấp đất đai đang xử lý',
    active: 12,
    resolved: 87,
    pending: 6,
    complexCases: 2,
    priority: 3,
  },
  landPlan: {
    title: 'Quy hoạch sử dụng đất hàng năm',
    lastUpdated: '2025-01-01',
    approved: true,
    priority: 3,
  },
};

// 11-12. Environment & Urban
export const environmentKPI = {
  wasteManagement: {
    title: 'Báo cáo thu gom, xử lý rác thải sinh hoạt',
    totalWaste: 2850, // tons
    unit: 'tấn/năm',
    collectionRate: 96.5,
    processingRate: 85.2,
    monthlyData: [
      { month: 'T1', collected: 445, processed: 380 },
      { month: 'T2', collected: 468, processed: 405 },
      { month: 'T3', collected: 490, processed: 425 },
      { month: 'T4', collected: 512, processed: 445 },
      { month: 'T5', collected: 528, processed: 460 },
    ],
    priority: 2,
  },
  urbanDevelopment: {
    title: 'Danh sách & tiến độ dự án chỉnh trang đô thị',
    totalProjects: 8,
    completedProjects: 3,
    inProgressProjects: 4,
    plannedProjects: 1,
    projects: [
      { name: 'Mở rộng đường Quốc lộ 1', status: 'completed', progress: 100 },
      { name: 'Xây dựng công viên sinh thái', status: 'in-progress', progress: 65 },
      { name: 'Trồng cây xanh các phố chính', status: 'in-progress', progress: 80 },
      { name: 'Cải tạo chợ truyền thống', status: 'in-progress', progress: 45 },
    ],
    priority: 2,
  },
};

// 13-15. Culture & Social
export const cultureAndSocialKPI = {
  heritageAndTourism: {
    title: 'Danh sách di tích lịch sử, danh lam thắng cảnh',
    totalHeritage: 23,
    categories: {
      nationalLevel: 2,
      provinceLevel: 5,
      districtLevel: 8,
      communeLevel: 8,
    },
    underfunding: 3,
    priority: 2,
  },
  socialWelfare: {
    title: 'Số lượng người nhận chi trả an sinh xã hội không dùng tiền mặt',
    total: 4250,
    monthlyTransfer: 1850000, // thousands of VND
    trends: [
      { month: 'T1', beneficiaries: 4100 },
      { month: 'T2', beneficiaries: 4150 },
      { month: 'T3', beneficiaries: 4200 },
      { month: 'T4', beneficiaries: 4225 },
      { month: 'T5', beneficiaries: 4250 },
    ],
    priority: 3,
  },
  healthcareInsurance: {
    title: 'Tỷ lệ dân có hồ sơ sức khỏe điện tử & tham gia BHYT',
    ehealthProfile: 78.5, // percentage
    healthInsuranceParticipation: 92.3, // percentage
    targetEhealth: 85,
    targetInsurance: 95,
    priority: 3,
  },
};

// 16-20. AI Knowledge Base
export const knowledgeBase = {
  laws: {
    title: 'Luật Tổ chức chính quyền địa phương',
    version: 'Luật năm 2019 (sửa đổi 2023)',
    lastUpdated: '2024-12-01',
    totalArticles: 145,
    priority: 3,
  },
  regulations: {
    title: 'Nghị quyết HĐND tỉnh & Quyết định phân cấp thẩm quyền',
    resolutions: 28,
    decisions: 15,
    lastUpdated: '2025-01-10',
    priority: 3,
  },
  buildingProcess: {
    title: 'Quy trình cấp phép xây dựng nhà ở riêng lẻ',
    steps: 8,
    avgProcessingDays: 45,
    documents: 12,
    priority: 3,
  },
  landCertificateProcess: {
    title: 'Quy trình cấp Giấy chứng nhận QSDĐ',
    steps: 7,
    avgProcessingDays: 30,
    documents: 10,
    priority: 3,
  },
  singleWindowProcess: {
    title: 'Quy trình ISO hoặc quy trình một cửa liên thông',
    certifications: 3,
    linkedServices: 45,
    priority: 2,
  },
};

// 21-23. GIS & Digital Maps
export const gisData = {
  administrativeMap: {
    title: 'Bản đồ địa giới hành chính phường/xã',
    scale: '1:5000',
    lastUpdated: '2025-01-01',
    boundaries: 12,
    priority: 3,
  },
  planningMap: {
    title: 'Bản đồ chỉ giới đường đỏ, quy hoạch chi tiết',
    zones: 18,
    buildingPermits: 234,
    developmentAreas: 8,
    priority: 3,
  },
  constructionPermitMap: {
    title: 'Bản đồ cấp phép xây dựng + danh sách',
    permits: 156,
    underConstruction: 45,
    completed: 111,
    priority: 3,
  },
};

// 24-26. System Integration
export const systemIntegration = {
  lgsp: {
    title: 'Tài khoản truy cập LGSP tỉnh',
    status: 'connected' as const,
    lastSync: '2025-01-28 09:30',
    dataExchanged: 1250,
    priority: 3,
  },
  tabmis: {
    title: 'API hoặc cách xuất dữ liệu từ TABMIS',
    status: 'connected' as const,
    lastSync: '2025-01-28 08:15',
    lastExport: '2025-01-25',
    priority: 3,
  },
  populationDatabase: {
    title: 'API tra cứu dân cư (Đề án 06)',
    status: 'pending' as const,
    requestDate: '2025-01-20',
    expectedDate: '2025-02-15',
    priority: 3,
  },
};

// All KPIs grouped by category
export const allKPIs = {
  'command-center': [
    { ...budgetRevenueKPI, id: 1 },
    { ...investmentDisbursementKPI, id: 2 },
    { ...dossierStatisticsKPI, id: 3 },
    { ...citizenSatisfactionKPI, id: 4 },
    { ...crimeStatisticsKPI, id: 5 },
    { ...petitionStatisticsKPI, id: 6 },
  ],
  'land-management': [
    { ...landManagementKPI.landUsageMap, id: 7 },
    { ...landManagementKPI.certificateIssued, id: 8 },
    { ...landManagementKPI.disputes, id: 9 },
    { ...landManagementKPI.landPlan, id: 10 },
  ],
  'environment-urban': [
    { ...environmentKPI.wasteManagement, id: 11 },
    { ...environmentKPI.urbanDevelopment, id: 12 },
  ],
  'culture-social': [
    { ...cultureAndSocialKPI.heritageAndTourism, id: 13 },
    { ...cultureAndSocialKPI.socialWelfare, id: 14 },
    { ...cultureAndSocialKPI.healthcareInsurance, id: 15 },
  ],
  'knowledge-base': [
    { ...knowledgeBase.laws, id: 16 },
    { ...knowledgeBase.regulations, id: 17 },
    { ...knowledgeBase.buildingProcess, id: 18 },
    { ...knowledgeBase.landCertificateProcess, id: 19 },
    { ...knowledgeBase.singleWindowProcess, id: 20 },
  ],
  'gis-maps': [
    { ...gisData.administrativeMap, id: 21 },
    { ...gisData.planningMap, id: 22 },
    { ...gisData.constructionPermitMap, id: 23 },
  ],
  'system-integration': [
    { ...systemIntegration.lgsp, id: 24 },
    { ...systemIntegration.tabmis, id: 25 },
    { ...systemIntegration.populationDatabase, id: 26 },
  ],
};
