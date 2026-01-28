'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useState } from 'react';
import {
  Download,
  Filter,
  RefreshCw,
  TrendingUp,
  BarChart3,
  MapPin,
  Users,
  AlertCircle,
  CheckCircle2,
  FileText,
  DollarSign,
  Leaf,
  Heart,
  Music,
  BookOpen,
  Map,
  Zap,
} from 'lucide-react';
import {
  BudgetRevenueCard,
  DossierStatisticsCard,
  CitizenSatisfactionCard,
  CrimeStatisticsCard,
  PetitionStatisticsCard,
} from '@/components/kpi-cards';
import {
  budgetRevenueKPI,
  investmentDisbursementKPI,
  dossierStatisticsKPI,
  citizenSatisfactionKPI,
  crimeStatisticsKPI,
  petitionStatisticsKPI,
  landManagementKPI,
  environmentKPI,
  cultureAndSocialKPI,
  knowledgeBase,
  gisData,
  systemIntegration,
} from '@/lib/kpi-data';

export default function LeaderDashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedDepartment, setSelectedDepartment] = useState('all');

  return (
    <div className="space-y-6 pb-8">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-primary">
            Bảng Điều Khiển Lãnh Đạo
          </h1>
          <p className="text-muted-foreground mt-1">Theo dõi KPI các phòng ban và dự án</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <RefreshCw className="w-4 h-4" />
            Làm mới
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <Download className="w-4 h-4" />
            Xuất báo cáo
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-4 md:flex-row md:items-end">
        <div className="space-y-2">
          <label className="text-sm font-medium">Khoảng thời gian</label>
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white"
          >
            <option value="week">Tuần này</option>
            <option value="month">Tháng này</option>
            <option value="quarter">Quý này</option>
            <option value="year">Năm nay</option>
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Phòng ban</label>
          <select
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white"
          >
            <option value="all">Tất cả phòng ban</option>
            <option value="finance">Tài chính - Kế toán</option>
            <option value="land">Địa chính - Xây dựng</option>
            <option value="security">An ninh - Quốc phòng</option>
            <option value="labor">Lao động - An sinh</option>
            <option value="health">Y tế</option>
            <option value="culture">Văn hóa - Thể thao</option>
            <option value="environment">Môi trường</option>
          </select>
        </div>
      </div>

      {/* KPI Tabs */}
      <Tabs defaultValue="command-center" className="w-full">
        <TabsList className="grid w-full grid-cols-4 md:grid-cols-7 gap-2">
          <TabsTrigger value="command-center" className="text-xs md:text-sm">
            Chỉ huy
          </TabsTrigger>
          <TabsTrigger value="land" className="text-xs md:text-sm">
            Đất đai
          </TabsTrigger>
          <TabsTrigger value="environment" className="text-xs md:text-sm">
            Môi trường
          </TabsTrigger>
          <TabsTrigger value="culture" className="text-xs md:text-sm">
            Văn hóa
          </TabsTrigger>
          <TabsTrigger value="knowledge" className="text-xs md:text-sm">
            CSDL
          </TabsTrigger>
          <TabsTrigger value="gis" className="text-xs md:text-sm">
            Bản đồ
          </TabsTrigger>
          <TabsTrigger value="integration" className="text-xs md:text-sm">
            Tích hợp
          </TabsTrigger>
        </TabsList>

        {/* Command Center Tab */}
        <TabsContent value="command-center" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <BudgetRevenueCard />
            <DossierStatisticsCard />
            <CitizenSatisfactionCard />
            <CrimeStatisticsCard />
            <PetitionStatisticsCard />

            {/* Investment Disbursement */}
            <Card className="hover-lift animate-fade-in-scale" style={{ animationDelay: '0.5s' }}>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{investmentDisbursementKPI.title}</CardTitle>
                    <CardDescription>Giải ngân vốn công</CardDescription>
                  </div>
                  <Badge className="bg-green-100 text-green-800">Cao</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">{investmentDisbursementKPI.percentage}%</span>
                    <span className="text-sm text-muted-foreground">
                      {investmentDisbursementKPI.current}/{investmentDisbursementKPI.target}T
                    </span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-green-500 to-green-600"
                      style={{ width: `${investmentDisbursementKPI.percentage}%` }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Land Management Tab */}
        <TabsContent value="land" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="hover-lift">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  {landManagementKPI.landUsageMap.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Tổng diện tích: {landManagementKPI.landUsageMap.totalArea} ha</p>
                  {landManagementKPI.landUsageMap.categories.map((cat, i) => (
                    <div key={i} className="flex justify-between items-center">
                      <span className="text-sm">{cat.name}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-2 bg-gray-200 rounded-full">
                          <div className="h-full bg-blue-500 rounded-full" style={{ width: `${cat.percentage}%` }} />
                        </div>
                        <span className="text-xs text-muted-foreground">{cat.percentage}%</span>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground border-t pt-2">
                  Cập nhật: {landManagementKPI.landUsageMap.lastUpdated}
                </p>
              </CardContent>
            </Card>

            <Card className="hover-lift">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  {landManagementKPI.certificateIssued.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-lg bg-blue-50 p-3">
                    <p className="text-xs text-muted-foreground">Tổng cấp</p>
                    <p className="text-2xl font-bold text-blue-600">{landManagementKPI.certificateIssued.totalIssued}</p>
                  </div>
                  <div className="rounded-lg bg-green-50 p-3">
                    <p className="text-xs text-muted-foreground">Năm nay</p>
                    <p className="text-2xl font-bold text-green-600">{landManagementKPI.certificateIssued.thisYear}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-lg bg-yellow-50 p-3">
                    <p className="text-xs text-muted-foreground">Đang xử lý</p>
                    <p className="text-2xl font-bold text-yellow-600">{landManagementKPI.certificateIssued.pending}</p>
                  </div>
                  <div className="rounded-lg bg-red-50 p-3">
                    <p className="text-xs text-muted-foreground">Từ chối</p>
                    <p className="text-2xl font-bold text-red-600">{landManagementKPI.certificateIssued.rejectedCases}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover-lift">
              <CardHeader>
                <CardTitle className="text-lg">{landManagementKPI.disputes.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Đang xử lý</p>
                    <p className="text-3xl font-bold text-orange-600">{landManagementKPI.disputes.active}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Đã giải quyết</p>
                    <p className="text-3xl font-bold text-green-600">{landManagementKPI.disputes.resolved}</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground border-t pt-2">
                  <AlertCircle className="w-3 h-3 inline mr-1" />
                  {landManagementKPI.disputes.complexCases} vụ phức tạp cần hỗ trợ
                </p>
              </CardContent>
            </Card>

            <Card className="hover-lift">
              <CardHeader>
                <CardTitle className="text-lg">{landManagementKPI.landPlan.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {landManagementKPI.landPlan.approved && (
                  <div className="flex items-center gap-3 rounded-lg bg-green-50 p-3 border border-green-200">
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-semibold text-green-900">Đã được phê duyệt</p>
                      <p className="text-xs text-green-700">Cập nhật: {landManagementKPI.landPlan.lastUpdated}</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Environment Tab */}
        <TabsContent value="environment" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="hover-lift">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Leaf className="w-5 h-5" />
                  {environmentKPI.wasteManagement.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-lg bg-blue-50 p-3">
                    <p className="text-xs text-muted-foreground">Thu gom</p>
                    <p className="text-2xl font-bold">{environmentKPI.wasteManagement.collectionRate}%</p>
                  </div>
                  <div className="rounded-lg bg-green-50 p-3">
                    <p className="text-xs text-muted-foreground">Xử lý</p>
                    <p className="text-2xl font-bold">{environmentKPI.wasteManagement.processingRate}%</p>
                  </div>
                </div>
                <p className="text-sm font-semibold">{environmentKPI.wasteManagement.totalWaste} tấn/năm</p>
              </CardContent>
            </Card>

            <Card className="hover-lift">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  {environmentKPI.urbanDevelopment.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  <div className="text-center rounded-lg bg-blue-50 p-2">
                    <p className="text-2xl font-bold text-blue-600">{environmentKPI.urbanDevelopment.completedProjects}</p>
                    <p className="text-xs text-muted-foreground">Hoàn thành</p>
                  </div>
                  <div className="text-center rounded-lg bg-yellow-50 p-2">
                    <p className="text-2xl font-bold text-yellow-600">{environmentKPI.urbanDevelopment.inProgressProjects}</p>
                    <p className="text-xs text-muted-foreground">Đang thực hiện</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Culture Tab */}
        <TabsContent value="culture" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-3">
            <Card className="hover-lift">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Music className="w-5 h-5" />
                  Di tích & Du lịch
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="text-3xl font-bold text-blue-600">{cultureAndSocialKPI.heritageAndTourism.totalHeritage}</div>
                <p className="text-sm text-muted-foreground">Di tích lịch sử</p>
              </CardContent>
            </Card>

            <Card className="hover-lift">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Heart className="w-5 h-5" />
                  An sinh xã hội
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-600">{cultureAndSocialKPI.socialWelfare.total}</div>
                <p className="text-sm text-muted-foreground">Người nhận chi trả</p>
              </CardContent>
            </Card>

            <Card className="hover-lift">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Heart className="w-5 h-5" />
                  Sức khỏe
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">E-health</span>
                  <span className="font-bold">{cultureAndSocialKPI.healthcareInsurance.ehealthProfile}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">BHYT</span>
                  <span className="font-bold">{cultureAndSocialKPI.healthcareInsurance.healthInsuranceParticipation}%</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Knowledge Base Tab */}
        <TabsContent value="knowledge" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            {[knowledgeBase.laws, knowledgeBase.regulations, knowledgeBase.buildingProcess, knowledgeBase.landCertificateProcess].map(
              (item, i) => (
                <Card key={i} className="hover-lift">
                  <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2">
                      <BookOpen className="w-4 h-4" />
                      {item.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground">
                    <p>Cập nhật: {item.lastUpdated || 'N/A'}</p>
                    {item.steps && <p>Bước: {item.steps}</p>}
                    {item.articles && <p>Điều: {item.articles}</p>}
                  </CardContent>
                </Card>
              )
            )}
          </div>
        </TabsContent>

        {/* GIS Tab */}
        <TabsContent value="gis" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-3">
            <Card className="hover-lift">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Map className="w-4 h-4" />
                  {gisData.administrativeMap.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                <p>Tỷ lệ: {gisData.administrativeMap.scale}</p>
                <p>Cập nhật: {gisData.administrativeMap.lastUpdated}</p>
              </CardContent>
            </Card>

            <Card className="hover-lift">
              <CardHeader>
                <CardTitle className="text-base">{gisData.planningMap.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                <p>{gisData.planningMap.zones} khu vực quy hoạch</p>
              </CardContent>
            </Card>

            <Card className="hover-lift">
              <CardHeader>
                <CardTitle className="text-base">{gisData.constructionPermitMap.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                <p>{gisData.constructionPermitMap.permits} giấy phép</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* System Integration Tab */}
        <TabsContent value="integration" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-3">
            <Card className="hover-lift">
              <CardHeader>
                <CardTitle className="text-base">{systemIntegration.lgsp.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Badge className={systemIntegration.lgsp.status === 'connected' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                  {systemIntegration.lgsp.status === 'connected' ? 'Kết nối' : 'Mất kết nối'}
                </Badge>
                <p className="text-xs text-muted-foreground">Cập nhật: {systemIntegration.lgsp.lastSync}</p>
              </CardContent>
            </Card>

            <Card className="hover-lift">
              <CardHeader>
                <CardTitle className="text-base">{systemIntegration.tabmis.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Badge className="bg-green-100 text-green-800">Kết nối</Badge>
                <p className="text-xs text-muted-foreground">Cập nhật: {systemIntegration.tabmis.lastSync}</p>
              </CardContent>
            </Card>

            <Card className="hover-lift">
              <CardHeader>
                <CardTitle className="text-base">{systemIntegration.populationDatabase.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Badge className="bg-yellow-100 text-yellow-800">Đang xin</Badge>
                <p className="text-xs text-muted-foreground">Dự kiến: {systemIntegration.populationDatabase.expectedDate}</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
