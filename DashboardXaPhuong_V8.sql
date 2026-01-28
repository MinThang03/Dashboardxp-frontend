-- ================================================================
-- 🧩 DATABASE DASHBOARD XÃ/PHƯỜNG – V8.1 (CẢI TIẾN TOÀN DIỆN)
-- Cập nhật: Dựa trên V8, bổ sung đầy đủ tính năng theo sơ đồ hệ thống
-- Chuyển đổi sang MySQL/MariaDB cho phpMyAdmin
-- ================================================================

-- Uncomment 2 dòng dưới nếu muốn tạo database mới
-- CREATE DATABASE IF NOT EXISTS DashboardXaPhuong_V8 CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
-- USE DashboardXaPhuong_V8;

SET FOREIGN_KEY_CHECKS = 0;
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

-- ================================================================
-- 1️⃣ QUẢN TRỊ ĐỊNH DANH & PHÂN QUYỀN CỐT LÕI
-- ================================================================

-- Bảng Vai trò
CREATE TABLE VaiTro (
    MaVaiTro INT AUTO_INCREMENT PRIMARY KEY,
    TenVaiTro VARCHAR(50) UNIQUE NOT NULL,
    MaCode VARCHAR(20) UNIQUE NOT NULL,
    MoTa VARCHAR(255),
    ThuTuHienThi INT DEFAULT 0,
    TrangThai TINYINT(1) DEFAULT 1,
    NgayTao DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Seed data Vai trò
INSERT INTO VaiTro (TenVaiTro, MaCode, ThuTuHienThi) VALUES 
('Quản trị hệ thống', 'ADMIN', 1),
('Lãnh đạo', 'LANHDAO', 2),
('Cán bộ chuyên môn', 'CANBO', 3),
('Công dân', 'CONGDAN', 4);

-- Bảng Cấp độ quyền (Cải tiến)
CREATE TABLE CapDoQuyen (
    MaCapDo INT PRIMARY KEY,
    TenCapDo VARCHAR(50) UNIQUE NOT NULL,
    MoTa TEXT,
    TrangThai TINYINT(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Seed data Cấp độ quyền
INSERT INTO CapDoQuyen (MaCapDo, TenCapDo, MoTa) VALUES 
(1, 'Siêu quản trị', 'Toàn quyền hệ thống'),
(2, 'Quản trị', 'Quản trị cơ bản'),
(3, 'Quản lý', 'Quản lý nghiệp vụ');

-- Bảng Người dùng (Cải tiến)
CREATE TABLE NguoiDung (
    MaNguoiDung INT AUTO_INCREMENT PRIMARY KEY,
    TenDangNhap VARCHAR(50) UNIQUE NOT NULL,
    MatKhau VARCHAR(255) NOT NULL,
    HoVaTen VARCHAR(100) NOT NULL,
    Email VARCHAR(100),
    SoDienThoai VARCHAR(20),
    AnhDaiDien VARCHAR(500),
    MaVaiTro INT NOT NULL,
    TrangThai TINYINT(1) DEFAULT 1,
    NgayTao DATETIME DEFAULT CURRENT_TIMESTAMP,
    NgayCapNhat DATETIME DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
    NguoiTao INT,
    IsDeleted TINYINT(1) DEFAULT 0,
    FOREIGN KEY (MaVaiTro) REFERENCES VaiTro(MaVaiTro),
    FOREIGN KEY (NguoiTao) REFERENCES NguoiDung(MaNguoiDung),
    CONSTRAINT CK_Email CHECK (Email IS NULL OR Email LIKE '%@%.%'),
    CONSTRAINT CK_SoDienThoai CHECK (SoDienThoai IS NULL OR CHAR_LENGTH(SoDienThoai) >= 10)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Bảng Quản trị viên
CREATE TABLE QuanTriVien (
    MaAdmin INT AUTO_INCREMENT PRIMARY KEY,
    MaNguoiDung INT UNIQUE NOT NULL,
    MaCapDo INT,
    NgayNhanViec DATETIME DEFAULT CURRENT_TIMESTAMP,
    GhiChu TEXT,
    FOREIGN KEY (MaNguoiDung) REFERENCES NguoiDung(MaNguoiDung),
    FOREIGN KEY (MaCapDo) REFERENCES CapDoQuyen(MaCapDo)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Bảng Công dân (Mở rộng)
CREATE TABLE CongDan (
    MaCongDan INT AUTO_INCREMENT PRIMARY KEY,
    MaNguoiDung INT UNIQUE,
    SoCCCD VARCHAR(20) UNIQUE NOT NULL,
    HoTen VARCHAR(100) NOT NULL,
    NgaySinh DATE,
    GioiTinh VARCHAR(10),
    DiaChiThuongTru VARCHAR(255),
    DiaChiTamTru VARCHAR(255),
    ToaDoNha VARCHAR(50), -- GPS coordinates
    NgayDangKy DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (MaNguoiDung) REFERENCES NguoiDung(MaNguoiDung),
    CONSTRAINT CK_GioiTinh CHECK (GioiTinh IS NULL OR GioiTinh IN ('Nam', 'Nữ', 'Khác'))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ================================================================
-- 2️⃣ CƠ CẤU TỔ CHỨC
-- ================================================================

-- Bảng Lĩnh vực
CREATE TABLE LinhVuc (
    MaLinhVuc INT AUTO_INCREMENT PRIMARY KEY,
    TenLinhVuc VARCHAR(100) UNIQUE NOT NULL,
    MoTa TEXT,
    MaCode VARCHAR(20) UNIQUE, -- VD: TU_PHAP, Y_TE_GD
    ThuTuHienThi INT DEFAULT 0,
    TrangThai TINYINT(1) DEFAULT 1,
    NgayTao DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Seed data 10 Lĩnh vực
INSERT INTO LinhVuc (TenLinhVuc, MaCode, ThuTuHienThi) VALUES 
('Hành chính Tư pháp', 'TU_PHAP', 1),
('Y tế - Giáo dục', 'Y_TE_GD', 2),
('Kinh tế - Thương mại', 'KINH_TE', 3),
('Quốc phòng - An ninh', 'AN_NINH', 4),
('Xây dựng - Hạ tầng', 'XAY_DUNG', 5),
('Dân cư - Lao động', 'LAO_DONG', 6),
('Quản lý Tài chính', 'TAI_CHINH', 7),
('Địa chính', 'DIA_CHINH', 8),
('Quản lý Môi trường', 'MOI_TRUONG', 9),
('Văn hóa - Du lịch', 'VAN_HOA', 10);

-- Bảng Phòng ban
CREATE TABLE PhongBan (
    MaPhongBan INT AUTO_INCREMENT PRIMARY KEY,
    TenPhongBan VARCHAR(100) UNIQUE NOT NULL,
    MoTa TEXT,
    MaLinhVuc INT,
    TruongPhong INT,
    NgayThanhLap DATETIME DEFAULT CURRENT_TIMESTAMP,
    TrangThai TINYINT(1) DEFAULT 1,
    FOREIGN KEY (MaLinhVuc) REFERENCES LinhVuc(MaLinhVuc),
    FOREIGN KEY (TruongPhong) REFERENCES NguoiDung(MaNguoiDung)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Bảng Lãnh đạo
CREATE TABLE LanhDao (
    MaLanhDao INT AUTO_INCREMENT PRIMARY KEY,
    MaNguoiDung INT UNIQUE NOT NULL,
    MaPhongBan INT,
    ChucVu VARCHAR(50) NOT NULL,
    NhiemKy VARCHAR(50),
    NgayBatDau DATE DEFAULT (CURDATE()),
    NgayKetThuc DATE,
    DuocDuyetNganSach TINYINT(1) DEFAULT 0,
    DuocKyQuyetDinh TINYINT(1) DEFAULT 1,
    IsDeleted TINYINT(1) DEFAULT 0,
    FOREIGN KEY (MaNguoiDung) REFERENCES NguoiDung(MaNguoiDung),
    FOREIGN KEY (MaPhongBan) REFERENCES PhongBan(MaPhongBan)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Bảng Cán bộ
CREATE TABLE CanBo (
    MaCanBo INT AUTO_INCREMENT PRIMARY KEY,
    MaNguoiDung INT UNIQUE NOT NULL,
    MaPhongBan INT,
    MaLinhVuc INT,
    ChucDanh VARCHAR(50),
    DiemKPI FLOAT DEFAULT 0 CHECK (DiemKPI BETWEEN 0 AND 100),
    NgayBatDau DATE DEFAULT (CURDATE()),
    IsDeleted TINYINT(1) DEFAULT 0,
    FOREIGN KEY (MaNguoiDung) REFERENCES NguoiDung(MaNguoiDung),
    FOREIGN KEY (MaPhongBan) REFERENCES PhongBan(MaPhongBan),
    FOREIGN KEY (MaLinhVuc) REFERENCES LinhVuc(MaLinhVuc)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ================================================================
-- 3️⃣ HỒ SƠ NGHIỆP VỤ TRUNG TÂM
-- ================================================================

-- Bảng Trạng thái hồ sơ
CREATE TABLE TrangThaiHoSo (
    MaTrangThai VARCHAR(20) PRIMARY KEY,
    TenTrangThai VARCHAR(50) UNIQUE NOT NULL,
    MauSac VARCHAR(20),
    ThuTuHienThi INT DEFAULT 0,
    MoTa VARCHAR(255)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Seed data Trạng thái
INSERT INTO TrangThaiHoSo (MaTrangThai, TenTrangThai, MauSac, ThuTuHienThi) VALUES 
('MOI_TAO', 'Mới tạo', '#3498db', 1),
('DANG_XU_LY', 'Đang xử lý', '#f39c12', 2),
('CHO_DUYET', 'Chờ duyệt', '#9b59b6', 3),
('DA_DUYET', 'Đã duyệt', '#2ecc71', 4),
('DA_TU_CHOI', 'Đã từ chối', '#e74c3c', 5),
('HOAN_THANH', 'Hoàn thành', '#27ae60', 6),
('DA_HUY', 'Đã hủy', '#95a5a6', 7);

-- Bảng Loại nghiệp vụ
CREATE TABLE LoaiNghiepVu (
    MaLoaiNghiepVu INT AUTO_INCREMENT PRIMARY KEY,
    TenLoai VARCHAR(100) NOT NULL,
    MaLinhVuc INT NOT NULL,
    ThoiHanXuLy INT, -- Số ngày xử lý
    MoTa TEXT,
    TrangThai TINYINT(1) DEFAULT 1,
    FOREIGN KEY (MaLinhVuc) REFERENCES LinhVuc(MaLinhVuc)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Bảng Hồ sơ nghiệp vụ (Cải tiến)
CREATE TABLE HoSoNghiepVu (
    MaHoSo VARCHAR(20) PRIMARY KEY, -- Format: HS-YYYYMMDD-XXXX
    TenNghiepVu VARCHAR(200) NOT NULL,
    MaCongDan INT NOT NULL,
    MaLinhVuc INT NOT NULL,
    MaLoaiNghiepVu INT,
    MaCanBoXuLy INT,
    MaLanhDaoDuyet INT,
    MaTrangThai VARCHAR(20) NOT NULL DEFAULT 'MOI_TAO',
    NgayTao DATETIME DEFAULT CURRENT_TIMESTAMP,
    HanXuLy DATETIME NOT NULL,
    NgayHoanThanh DATETIME,
    LyDoTuChoi TEXT,
    GhiChuXuLy TEXT,
    MucDoUuTien INT DEFAULT 2 CHECK (MucDoUuTien BETWEEN 1 AND 5), -- 1=Cao nhất, 5=Thấp nhất
    FOREIGN KEY (MaCongDan) REFERENCES CongDan(MaCongDan),
    FOREIGN KEY (MaLinhVuc) REFERENCES LinhVuc(MaLinhVuc),
    FOREIGN KEY (MaLoaiNghiepVu) REFERENCES LoaiNghiepVu(MaLoaiNghiepVu),
    FOREIGN KEY (MaCanBoXuLy) REFERENCES CanBo(MaCanBo),
    FOREIGN KEY (MaLanhDaoDuyet) REFERENCES LanhDao(MaLanhDao),
    FOREIGN KEY (MaTrangThai) REFERENCES TrangThaiHoSo(MaTrangThai),
    CONSTRAINT CK_NgayHoanThanh CHECK (NgayHoanThanh IS NULL OR NgayHoanThanh >= NgayTao),
    CONSTRAINT CK_HanXuLy CHECK (HanXuLy >= NgayTao)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Bảng Lịch sử xử lý hồ sơ (Cải tiến)
CREATE TABLE LichSuXuLyHoSo (
    MaLichSu INT AUTO_INCREMENT PRIMARY KEY,
    MaHoSo VARCHAR(20) NOT NULL,
    TrangThaiCu VARCHAR(20),
    TrangThaiMoi VARCHAR(20) NOT NULL,
    NguoiThucHien INT NOT NULL,
    ThoiGian DATETIME DEFAULT CURRENT_TIMESTAMP,
    GhiChu TEXT,
    IPTruyCap VARCHAR(50),
    FOREIGN KEY (MaHoSo) REFERENCES HoSoNghiepVu(MaHoSo),
    FOREIGN KEY (NguoiThucHien) REFERENCES NguoiDung(MaNguoiDung)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Bảng Tài liệu hồ sơ
CREATE TABLE TaiLieuHoSo (
    MaTaiLieu INT AUTO_INCREMENT PRIMARY KEY,
    MaHoSo VARCHAR(20) NOT NULL,
    TenTaiLieu VARCHAR(200) NOT NULL,
    DuongDanFile VARCHAR(500) NOT NULL,
    LoaiFile VARCHAR(20), -- PDF, DOCX, JPG, PNG
    DungLuong BIGINT, -- Bytes
    NgayTai DATETIME DEFAULT CURRENT_TIMESTAMP,
    NguoiTai INT,
    TrangThai TINYINT(1) DEFAULT 1,
    FOREIGN KEY (MaHoSo) REFERENCES HoSoNghiepVu(MaHoSo),
    FOREIGN KEY (NguoiTai) REFERENCES NguoiDung(MaNguoiDung),
    CONSTRAINT CK_DungLuong CHECK (DungLuong > 0)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Bảng Yêu cầu bổ sung tài liệu
CREATE TABLE YeuCauBoSungTaiLieu (
    MaYeuCau INT AUTO_INCREMENT PRIMARY KEY,
    MaHoSo VARCHAR(20) NOT NULL,
    NoiDungYeuCau TEXT NOT NULL,
    TrangThai VARCHAR(50) DEFAULT 'Chờ bổ sung',
    NgayYeuCau DATETIME DEFAULT CURRENT_TIMESTAMP,
    NguoiYeuCau INT NOT NULL,
    NgayHoanThanh DATETIME,
    FOREIGN KEY (MaHoSo) REFERENCES HoSoNghiepVu(MaHoSo),
    FOREIGN KEY (NguoiYeuCau) REFERENCES NguoiDung(MaNguoiDung),
    CONSTRAINT CK_TrangThaiYeuCau CHECK (TrangThai IN ('Chờ bổ sung', 'Đã bổ sung', 'Đã hủy'))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Bảng Đánh giá hồ sơ
CREATE TABLE DanhGiaHoSo (
    MaDanhGia INT AUTO_INCREMENT PRIMARY KEY,
    MaHoSo VARCHAR(20),
    MaLanhDao INT,
    DiemDanhGia INT CHECK (DiemDanhGia BETWEEN 1 AND 5),
    NhanXet TEXT,
    NgayDanhGia DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (MaHoSo) REFERENCES HoSoNghiepVu(MaHoSo),
    FOREIGN KEY (MaLanhDao) REFERENCES LanhDao(MaLanhDao)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ================================================================
-- 4️⃣ HỆ THỐNG PHẢN ÁNH & ĐÁNH GIÁ (MỚI)
-- ================================================================

CREATE TABLE PhanAnh (
    MaPhanAnh INT AUTO_INCREMENT PRIMARY KEY,
    MaCongDan INT NOT NULL,
    TieuDe VARCHAR(200) NOT NULL,
    NoiDung TEXT NOT NULL,
    MaLinhVuc INT,
    TrangThai VARCHAR(50) DEFAULT 'Mới',
    MaCanBoXuLy INT,
    NgayTao DATETIME DEFAULT CURRENT_TIMESTAMP,
    NgayXuLy DATETIME,
    KetQuaXuLy TEXT,
    DiemDanhGia INT CHECK (DiemDanhGia IS NULL OR DiemDanhGia BETWEEN 1 AND 5),
    FOREIGN KEY (MaCongDan) REFERENCES CongDan(MaCongDan),
    FOREIGN KEY (MaLinhVuc) REFERENCES LinhVuc(MaLinhVuc),
    FOREIGN KEY (MaCanBoXuLy) REFERENCES CanBo(MaCanBo),
    CONSTRAINT CK_TrangThaiPhanAnh CHECK (TrangThai IN ('Mới', 'Đang xử lý', 'Đã xử lý', 'Đã đóng'))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE DanhGiaDichVu (
    MaDanhGia INT AUTO_INCREMENT PRIMARY KEY,
    MaHoSo VARCHAR(20),
    MaCongDan INT NOT NULL,
    DiemDichVu INT NOT NULL CHECK (DiemDichVu BETWEEN 1 AND 5),
    DiemThoiGian INT CHECK (DiemThoiGian BETWEEN 1 AND 5),
    DiemThaiDo INT CHECK (DiemThaiDo BETWEEN 1 AND 5),
    YKienKhac TEXT,
    NgayDanhGia DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (MaHoSo) REFERENCES HoSoNghiepVu(MaHoSo),
    FOREIGN KEY (MaCongDan) REFERENCES CongDan(MaCongDan)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ================================================================
-- 5️⃣ HỆ THỐNG AI & TRÍ TUỆ NHÂN TẠO (MỚI)
-- ================================================================

CREATE TABLE KhoTriThuc (
    MaTriThuc INT AUTO_INCREMENT PRIMARY KEY,
    TieuDe VARCHAR(200) NOT NULL,
    NoiDung TEXT NOT NULL,
    MaLinhVuc INT,
    LoaiTriThuc VARCHAR(50), -- Văn bản pháp lý, Quy trình, Hướng dẫn
    NguonTaiLieu VARCHAR(255),
    NgayTao DATETIME DEFAULT CURRENT_TIMESTAMP,
    NgayCapNhat DATETIME DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
    NguoiCapNhat INT,
    TrangThai TINYINT(1) DEFAULT 1,
    DoChinhXac FLOAT CHECK (DoChinhXac IS NULL OR (DoChinhXac BETWEEN 0 AND 1)),
    FOREIGN KEY (MaLinhVuc) REFERENCES LinhVuc(MaLinhVuc),
    FOREIGN KEY (NguoiCapNhat) REFERENCES NguoiDung(MaNguoiDung)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE LichSuTraCuuAI (
    MaTraCuu INT AUTO_INCREMENT PRIMARY KEY,
    MaNguoiDung INT NOT NULL,
    CauHoi TEXT NOT NULL,
    KetQua TEXT,
    MaLinhVuc INT,
    ThoiGian DATETIME DEFAULT CURRENT_TIMESTAMP,
    DoHaiLong INT CHECK (DoHaiLong IS NULL OR DoHaiLong BETWEEN 1 AND 5),
    FOREIGN KEY (MaNguoiDung) REFERENCES NguoiDung(MaNguoiDung),
    FOREIGN KEY (MaLinhVuc) REFERENCES LinhVuc(MaLinhVuc)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE PhanTichPhanAnh (
    MaPhanTich INT AUTO_INCREMENT PRIMARY KEY,
    MaPhanAnh INT NOT NULL,
    KetQuaPhanTich TEXT,
    MucDoUuTien VARCHAR(20), -- Cao, Trung bình, Thấp
    DeXuatXuLy TEXT,
    ThoiGianPhanTich DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (MaPhanAnh) REFERENCES PhanAnh(MaPhanAnh),
    CONSTRAINT CK_MucDoUuTien CHECK (MucDoUuTien IS NULL OR MucDoUuTien IN ('Cao', 'Trung bình', 'Thấp'))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ================================================================
-- 6️⃣ 10 BẢNG CHI TIẾT NGHIỆP VỤ
-- ================================================================

-- 1. HÀNH CHÍNH TƯ PHÁP
CREATE TABLE ChiTiet_TuPhap (
    MaHoSo VARCHAR(20) PRIMARY KEY,
    LoaiGiayTo VARCHAR(100) NOT NULL,
    HoTenDoiTuong VARCHAR(100) NOT NULL,
    NgaySinh DATE,
    SoGiayTo VARCHAR(50),
    NoiDungTrichYeu TEXT,
    LoaiThucHien VARCHAR(50), -- Cấp mới, Gia hạn, Cấp lại
    FOREIGN KEY (MaHoSo) REFERENCES HoSoNghiepVu(MaHoSo)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 2. Y TẾ – GIÁO DỤC
CREATE TABLE ChiTiet_YTeGiaoDuc (
    MaHoSo VARCHAR(20) PRIMARY KEY,
    PhanHe VARCHAR(20) NOT NULL CHECK (PhanHe IN ('Y tế', 'Giáo dục')),
    LoaiDichVu VARCHAR(100),
    KetQuaKham TEXT,
    TenTruong VARCHAR(150),
    LopHoc VARCHAR(50),
    HinhThucMienGiam VARCHAR(100),
    SoLuongBenhNhan INT,
    SoLuongHocSinh INT,
    FOREIGN KEY (MaHoSo) REFERENCES HoSoNghiepVu(MaHoSo)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 3. KINH TẾ – THƯƠNG MẠI
CREATE TABLE ChiTiet_KinhTe (
    MaHoSo VARCHAR(20) PRIMARY KEY,
    TenHoKinhDoanh VARCHAR(150) NOT NULL,
    MaSoThue VARCHAR(50),
    LinhVucKinhDoanh VARCHAR(100),
    DoanhThuKhaiBao DECIMAL(18,0),
    TrangThaiNopThue TINYINT(1) DEFAULT 1,
    DiaChiKinhDoanh VARCHAR(255),
    SoDienThoaiLienHe VARCHAR(20),
    FOREIGN KEY (MaHoSo) REFERENCES HoSoNghiepVu(MaHoSo)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 4. QUỐC PHÒNG – AN NINH
CREATE TABLE ChiTiet_AnNinhQP (
    MaHoSo VARCHAR(20) PRIMARY KEY,
    LoaiHoSo VARCHAR(100) NOT NULL,
    DiaChiLuuTru VARCHAR(200),
    HanhViViPham TEXT,
    MucPhatTien DECIMAL(18,0),
    TrangThaiNghiaVu VARCHAR(50),
    LoaiTamTru VARCHAR(50), -- Tạm trú, Tạm vắng
    ThoiHanTamTru DATE,
    FOREIGN KEY (MaHoSo) REFERENCES HoSoNghiepVu(MaHoSo)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 5. XÂY DỰNG – HẠ TẦNG
CREATE TABLE ChiTiet_XayDung (
    MaHoSo VARCHAR(20) PRIMARY KEY,
    LoaiCongTrinh VARCHAR(100) NOT NULL,
    ViTriXayDung VARCHAR(200) NOT NULL,
    ToaDoXayDung VARCHAR(50), -- GPS
    DienTichSan DECIMAL(10,2),
    SoTang INT CHECK (SoTang IS NULL OR SoTang >= 0),
    GiayPhepSo VARCHAR(50),
    TrangThaiXayDung VARCHAR(50), -- Đang xây, Hoàn thành, Vi phạm
    FOREIGN KEY (MaHoSo) REFERENCES HoSoNghiepVu(MaHoSo)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 6. DÂN CƯ – LAO ĐỘNG
CREATE TABLE ChiTiet_LaoDong (
    MaHoSo VARCHAR(20) PRIMARY KEY,
    LoaiDoiTuong VARCHAR(50) NOT NULL, -- Hộ nghèo, Cận nghèo, Người có công
    TinhTrangViecLam TINYINT(1),
    NoiLamViec VARCHAR(150),
    MucTroCap DECIMAL(18,0),
    LoaiTroCap VARCHAR(100),
    ThoiHanTroCap DATE,
    FOREIGN KEY (MaHoSo) REFERENCES HoSoNghiepVu(MaHoSo)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 7. QUẢN LÝ TÀI CHÍNH
CREATE TABLE ChiTiet_TaiChinh (
    MaHoSo VARCHAR(20) PRIMARY KEY,
    LoaiGiaoDich VARCHAR(50) NOT NULL CHECK (LoaiGiaoDich IN ('Thu', 'Chi')),
    NoiDungChi TEXT,
    SoTien DECIMAL(18,0) NOT NULL CHECK (SoTien >= 0),
    NguonVon VARCHAR(100),
    MaLanhDaoDuyetChi INT,
    MaDuToan INT, -- Link với dự toán ngân sách
    NgayThucHien DATE DEFAULT (CURDATE()),
    FOREIGN KEY (MaHoSo) REFERENCES HoSoNghiepVu(MaHoSo),
    FOREIGN KEY (MaLanhDaoDuyetChi) REFERENCES LanhDao(MaLanhDao)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 8. ĐỊA CHÍNH
CREATE TABLE ChiTiet_DiaChinh (
    MaHoSo VARCHAR(20) PRIMARY KEY,
    SoToBanDo INT,
    SoThuaDat INT,
    DienTich DECIMAL(10,2) NOT NULL,
    LoaiDat VARCHAR(50) NOT NULL,
    NoiDungBienDong TEXT,
    ToaDoThuaDat VARCHAR(50), -- GPS
    LoaiBienDong VARCHAR(50), -- Chuyển nhượng, Thừa kế, Tách thửa
    FOREIGN KEY (MaHoSo) REFERENCES HoSoNghiepVu(MaHoSo)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 9. QUẢN LÝ MÔI TRƯỜNG
CREATE TABLE ChiTiet_MoiTruong (
    MaHoSo VARCHAR(20) PRIMARY KEY,
    KhuVuc VARCHAR(150) NOT NULL,
    ChiSoAQI INT CHECK (ChiSoAQI IS NULL OR ChiSoAQI BETWEEN 0 AND 500),
    TinhTrangRacThai VARCHAR(100),
    DonViThuGom VARCHAR(100),
    LoaiViPham VARCHAR(100), -- Xả thải, Đốt rác, Ô nhiễm không khí
    MucDoViPham VARCHAR(20), -- Nghiêm trọng, Trung bình, Nhẹ
    FOREIGN KEY (MaHoSo) REFERENCES HoSoNghiepVu(MaHoSo)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 10. VĂN HÓA – DU LỊCH
CREATE TABLE ChiTiet_VanHoa (
    MaHoSo VARCHAR(20) PRIMARY KEY,
    TenDiTich_LeHoi VARCHAR(150) NOT NULL,
    LoaiHinh VARCHAR(50) NOT NULL CHECK (LoaiHinh IN ('Di tích', 'Lễ hội', 'Điểm du lịch', 'Sự kiện')),
    DoanhThuDuLich DECIMAL(18,0),
    SoLuongKhach INT,
    ThoiGianToChuc DATE,
    DiaDiem VARCHAR(255),
    FOREIGN KEY (MaHoSo) REFERENCES HoSoNghiepVu(MaHoSo)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ================================================================
-- 7️⃣ BI – KPI – BÁO CÁO
-- ================================================================

-- KPI Cán bộ tháng (Sửa format ThangNam)
CREATE TABLE KPI_CanBo_Thang (
    ThangNam VARCHAR(7) NOT NULL CHECK (ThangNam LIKE '____-__'), -- Format: YYYY-MM
    MaCanBo INT NOT NULL,
    TongHoSoXuLy INT DEFAULT 0,
    HoSoDungHan INT DEFAULT 0,
    HoSoTreHan INT DEFAULT 0,
    TyLeDungHan FLOAT DEFAULT 0 CHECK (TyLeDungHan BETWEEN 0 AND 1),
    DiemDanhGia FLOAT DEFAULT 0 CHECK (DiemDanhGia >= 0 AND DiemDanhGia <= 100),
    SoPhanAnh INT DEFAULT 0,
    SoPhanAnhDaXuLy INT DEFAULT 0,
    PRIMARY KEY (ThangNam, MaCanBo),
    FOREIGN KEY (MaCanBo) REFERENCES CanBo(MaCanBo)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Fact Hồ sơ theo ngày (Cải tiến constraint)
CREATE TABLE Fact_HoSo_TheoNgay (
    Ngay DATE NOT NULL,
    MaLinhVuc INT NOT NULL,
    TongHoSo INT DEFAULT 0,
    HoSoDungHan INT DEFAULT 0,
    HoSoTreHan INT DEFAULT 0,
    HoSoHoanThanh INT DEFAULT 0,
    TongDoanhThu DECIMAL(18,0) DEFAULT 0,
    PRIMARY KEY (Ngay, MaLinhVuc),
    FOREIGN KEY (MaLinhVuc) REFERENCES LinhVuc(MaLinhVuc),
    CONSTRAINT CK_TongHoSo CHECK (HoSoDungHan + HoSoTreHan <= TongHoSo)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Cảnh báo Lãnh đạo (Cải tiến)
CREATE TABLE CanhBaoLanhDao (
    MaCanhBao INT AUTO_INCREMENT PRIMARY KEY,
    MaLanhDao INT NOT NULL,
    TieuDe VARCHAR(200) NOT NULL,
    NoiDung TEXT NOT NULL,
    MucDo VARCHAR(20) NOT NULL CHECK (MucDo IN ('Cao', 'Trung bình', 'Thấp')),
    LoaiCanhBao VARCHAR(50), -- Ngân sách, Hồ sơ trễ, Phản ánh
    DaXem TINYINT(1) DEFAULT 0,
    ThoiGianGui DATETIME DEFAULT CURRENT_TIMESTAMP,
    ThoiGianXem DATETIME,
    MaHoSo VARCHAR(20),
    FOREIGN KEY (MaLanhDao) REFERENCES LanhDao(MaLanhDao),
    FOREIGN KEY (MaHoSo) REFERENCES HoSoNghiepVu(MaHoSo)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Bảng Giám sát ngân sách (MỚI)
CREATE TABLE GiamSatNganSach (
    MaGiamSat INT AUTO_INCREMENT PRIMARY KEY,
    ThangNam VARCHAR(7) NOT NULL CHECK (ThangNam LIKE '____-__'),
    LoaiNganSach VARCHAR(20) NOT NULL CHECK (LoaiNganSach IN ('Thu', 'Chi')),
    DuToan DECIMAL(18,0) NOT NULL,
    ThucTe DECIMAL(18,0) DEFAULT 0,
    ChenhLech DECIMAL(18,0),
    TyLeThucHien FLOAT,
    CanhBao TINYINT(1) DEFAULT 0,
    NgayCapNhat DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Bảng Báo cáo AI (MỚI)
CREATE TABLE BaoCaoAI (
    MaBaoCao INT AUTO_INCREMENT PRIMARY KEY,
    LoaiBaoCao VARCHAR(50) NOT NULL, -- Xếp hạng cán bộ, Xếp hạng đơn vị, Đánh giá hài lòng
    ThangNam VARCHAR(7) CHECK (ThangNam LIKE '____-__'),
    NoiDungBaoCao TEXT,
    DuLieuJSON TEXT, -- Lưu dữ liệu chi tiết dạng JSON
    NgayTao DATETIME DEFAULT CURRENT_TIMESTAMP,
    NguoiTao INT,
    FOREIGN KEY (NguoiTao) REFERENCES NguoiDung(MaNguoiDung)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ================================================================
-- 8️⃣ HỆ THỐNG PHÂN QUYỀN NÂNG CAO
-- ================================================================

CREATE TABLE DanhMucChucNang (
    MaChucNang VARCHAR(50) PRIMARY KEY,
    TenChucNang VARCHAR(100) NOT NULL,
    NhomChucNang VARCHAR(50),
    MoTa VARCHAR(255),
    Icon VARCHAR(50),
    ThuTuHienThi INT DEFAULT 0,
    TrangThai TINYINT(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE PhanQuyen (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    MaVaiTro INT NOT NULL,
    MaChucNang VARCHAR(50) NOT NULL,
    DuocPhep TINYINT(1) DEFAULT 1,
    GhiChu VARCHAR(255),
    FOREIGN KEY (MaVaiTro) REFERENCES VaiTro(MaVaiTro),
    FOREIGN KEY (MaChucNang) REFERENCES DanhMucChucNang(MaChucNang),
    CONSTRAINT UQ_PhanQuyen UNIQUE (MaVaiTro, MaChucNang)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Seed data Chức năng
INSERT INTO DanhMucChucNang (MaChucNang, TenChucNang, NhomChucNang, ThuTuHienThi) VALUES 
('SYS_ADMIN', 'Quản trị hệ thống', 'Hệ thống', 1),
('SYS_CONFIG', 'Cấu hình hệ thống', 'Hệ thống', 2),
('SYS_USER_MANAGE', 'Quản lý người dùng', 'Hệ thống', 3),
('SYS_AI_MANAGE', 'Quản trị trí tuệ AI', 'Hệ thống', 4),
('APPROVE', 'Phê duyệt hồ sơ', 'Nghiệp vụ', 10),
('APPROVE_BUDGET', 'Duyệt ngân sách', 'Nghiệp vụ', 11),
('PROCESS', 'Xử lý hồ sơ', 'Nghiệp vụ', 12),
('VIEW_REPORT', 'Xem báo cáo', 'Nghiệp vụ', 13),
('VIEW_KPI', 'Xem KPI', 'Nghiệp vụ', 14),
('SUBMIT', 'Nộp hồ sơ', 'Công dân', 20),
('TRACK', 'Theo dõi hồ sơ', 'Công dân', 21),
('FEEDBACK', 'Phản ánh', 'Công dân', 22),
('EVALUATE', 'Đánh giá dịch vụ', 'Công dân', 23),
('AI_LOOKUP', 'Tra cứu AI', 'AI', 30),
('AI_ANALYZE', 'Phân tích phản ánh', 'AI', 31);

-- Cấp quyền mặc định
INSERT INTO PhanQuyen (MaVaiTro, MaChucNang, DuocPhep) VALUES 
-- Admin
(1, 'SYS_ADMIN', 1), (1, 'SYS_CONFIG', 1), (1, 'SYS_USER_MANAGE', 1), (1, 'SYS_AI_MANAGE', 1),
(1, 'VIEW_REPORT', 1), (1, 'VIEW_KPI', 1),
-- Lãnh đạo
(2, 'APPROVE', 1), (2, 'APPROVE_BUDGET', 1), (2, 'VIEW_REPORT', 1), (2, 'VIEW_KPI', 1), (2, 'AI_LOOKUP', 1),
-- Cán bộ
(3, 'PROCESS', 1), (3, 'VIEW_REPORT', 1), (3, 'AI_LOOKUP', 1), (3, 'AI_ANALYZE', 1),
-- Công dân
(4, 'SUBMIT', 1), (4, 'TRACK', 1), (4, 'FEEDBACK', 1), (4, 'EVALUATE', 1), (4, 'AI_LOOKUP', 1);

-- ================================================================
-- 9️⃣ BẢNG BỔ SUNG THEO SƠ ĐỒ
-- ================================================================

-- Đề xuất & Kiến nghị
CREATE TABLE DeXuatKienNghi (
    MaDeXuat INT AUTO_INCREMENT PRIMARY KEY,
    TieuDe VARCHAR(200) NOT NULL,
    NoiDung TEXT NOT NULL,
    MaNguoiGui INT NOT NULL,
    MaLinhVuc INT,
    TrangThai VARCHAR(50) DEFAULT 'Mới',
    YKienXuLy TEXT,
    NguoiXuLy INT,
    NgayTao DATETIME DEFAULT CURRENT_TIMESTAMP,
    NgayXuLy DATETIME,
    FOREIGN KEY (MaNguoiGui) REFERENCES NguoiDung(MaNguoiDung),
    FOREIGN KEY (MaLinhVuc) REFERENCES LinhVuc(MaLinhVuc),
    FOREIGN KEY (NguoiXuLy) REFERENCES NguoiDung(MaNguoiDung)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Thiết bị IoT
CREATE TABLE ThietBiIoT (
    MaThietBi INT AUTO_INCREMENT PRIMARY KEY,
    TenThietBi VARCHAR(100) NOT NULL,
    LoaiThietBi VARCHAR(50), -- Cảm biến môi trường, Camera, GPS
    ViTri VARCHAR(255),
    ToaDo VARCHAR(50),
    TrangThai TINYINT(1) DEFAULT 1,
    NgayLapDat DATETIME DEFAULT CURRENT_TIMESTAMP,
    ThongSoKyThuat TEXT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE DuLieuIoT (
    MaDuLieu BIGINT AUTO_INCREMENT PRIMARY KEY,
    MaThietBi INT NOT NULL,
    GiaTri VARCHAR(100),
    DonVi VARCHAR(20),
    ThoiGian DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (MaThietBi) REFERENCES ThietBiIoT(MaThietBi)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Bản đồ cảnh báo
CREATE TABLE BanDoCanhBao (
    MaCanhBao INT AUTO_INCREMENT PRIMARY KEY,
    LoaiCanhBao VARCHAR(50) NOT NULL, -- Điểm nóng ANTT, Tranh chấp đất đai, Xây dựng trái phép
    TieuDe VARCHAR(200) NOT NULL,
    ToaDo VARCHAR(50) NOT NULL, -- GPS coordinates
    MucDo VARCHAR(20) CHECK (MucDo IN ('Cao', 'Trung bình', 'Thấp')),
    NoiDung TEXT,
    TrangThai VARCHAR(50) DEFAULT 'Đang hoạt động',
    NgayTao DATETIME DEFAULT CURRENT_TIMESTAMP,
    NgayKetThuc DATETIME
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ================================================================
-- 🔟 LOG & NHẬT KÝ HỆ THỐNG
-- ================================================================

CREATE TABLE NhatKyHeThong (
    MaLog BIGINT AUTO_INCREMENT PRIMARY KEY,
    NguoiThucHien INT,
    HanhDong VARCHAR(100) NOT NULL,
    NoiDungChiTiet TEXT,
    LoaiLog VARCHAR(50), -- INFO, WARNING, ERROR
    IPTruyCap VARCHAR(50),
    UserAgent VARCHAR(255),
    ThoiGian DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (NguoiThucHien) REFERENCES NguoiDung(MaNguoiDung)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ================================================================
-- 1️⃣1️⃣ INDEXES & PERFORMANCE
-- ================================================================

CREATE INDEX IX_NguoiDung_TenDangNhap ON NguoiDung(TenDangNhap);
CREATE INDEX IX_NguoiDung_MaVaiTro ON NguoiDung(MaVaiTro);
CREATE INDEX IX_NguoiDung_TrangThai ON NguoiDung(TrangThai);
CREATE INDEX IX_HoSoNghiepVu_MaLinhVuc ON HoSoNghiepVu(MaLinhVuc);
CREATE INDEX IX_HoSoNghiepVu_MaTrangThai ON HoSoNghiepVu(MaTrangThai);
CREATE INDEX IX_HoSoNghiepVu_NgayTao ON HoSoNghiepVu(NgayTao);
CREATE INDEX IX_HoSoNghiepVu_MaCanBoXuLy ON HoSoNghiepVu(MaCanBoXuLy);
CREATE INDEX IX_LichSuXuLyHoSo_MaHoSo ON LichSuXuLyHoSo(MaHoSo);
CREATE INDEX IX_LichSuXuLyHoSo_ThoiGian ON LichSuXuLyHoSo(ThoiGian);
CREATE INDEX IX_NhatKyHeThong_NguoiThucHien ON NhatKyHeThong(NguoiThucHien);
CREATE INDEX IX_NhatKyHeThong_ThoiGian ON NhatKyHeThong(ThoiGian);
CREATE INDEX IX_PhanAnh_MaLinhVuc ON PhanAnh(MaLinhVuc);
CREATE INDEX IX_PhanAnh_TrangThai ON PhanAnh(TrangThai);
CREATE INDEX IX_KPI_CanBo_Thang_MaCanBo ON KPI_CanBo_Thang(MaCanBo);
CREATE INDEX IX_TaiLieuHoSo_MaHoSo ON TaiLieuHoSo(MaHoSo);

-- ================================================================
-- 1️⃣2️⃣ VIEWS HỮU ÍCH
-- ================================================================

-- View với tính toán SoNgayTreHan động
CREATE OR REPLACE VIEW vw_HoSoNghiepVu_Full AS
SELECT 
    hs.*,
    CASE 
        WHEN hs.NgayHoanThanh IS NULL AND NOW() > hs.HanXuLy THEN DATEDIFF(NOW(), hs.HanXuLy)
        WHEN hs.NgayHoanThanh IS NOT NULL AND hs.NgayHoanThanh > hs.HanXuLy THEN DATEDIFF(hs.NgayHoanThanh, hs.HanXuLy)
        ELSE 0
    END AS SoNgayTreHan
FROM HoSoNghiepVu hs;

CREATE OR REPLACE VIEW vw_NguoiDung_ChiTiet AS
SELECT 
    nd.MaNguoiDung,
    nd.TenDangNhap,
    nd.HoVaTen,
    nd.Email,
    nd.SoDienThoai,
    vt.TenVaiTro,
    vt.MaCode AS MaCodeVaiTro,
    nd.TrangThai,
    nd.IsDeleted
FROM NguoiDung nd
INNER JOIN VaiTro vt ON nd.MaVaiTro = vt.MaVaiTro;

CREATE OR REPLACE VIEW vw_ThongKeHoSo_LinhVuc AS
SELECT 
    lv.MaLinhVuc,
    lv.TenLinhVuc,
    COUNT(hs.MaHoSo) AS TongHoSo,
    SUM(CASE WHEN hs.MaTrangThai = 'HOAN_THANH' THEN 1 ELSE 0 END) AS HoSoHoanThanh,
    SUM(CASE 
        WHEN hs.NgayHoanThanh IS NULL AND NOW() > hs.HanXuLy THEN 1
        WHEN hs.NgayHoanThanh IS NOT NULL AND hs.NgayHoanThanh > hs.HanXuLy THEN 1
        ELSE 0
    END) AS HoSoTreHan,
    SUM(CASE WHEN hs.MaTrangThai = 'DANG_XU_LY' THEN 1 ELSE 0 END) AS HoSoDangXuLy
FROM LinhVuc lv
LEFT JOIN HoSoNghiepVu hs ON lv.MaLinhVuc = hs.MaLinhVuc
GROUP BY lv.MaLinhVuc, lv.TenLinhVuc;

CREATE OR REPLACE VIEW vw_KPI_CanBo_ChiTiet AS
SELECT 
    cb.MaCanBo,
    nd.HoVaTen,
    lv.TenLinhVuc,
    pb.TenPhongBan,
    kpi.ThangNam,
    kpi.TongHoSoXuLy,
    kpi.TyLeDungHan,
    kpi.DiemDanhGia,
    kpi.SoPhanAnh,
    kpi.SoPhanAnhDaXuLy
FROM CanBo cb
INNER JOIN NguoiDung nd ON cb.MaNguoiDung = nd.MaNguoiDung
LEFT JOIN LinhVuc lv ON cb.MaLinhVuc = lv.MaLinhVuc
LEFT JOIN PhongBan pb ON cb.MaPhongBan = pb.MaPhongBan
LEFT JOIN KPI_CanBo_Thang kpi ON cb.MaCanBo = kpi.MaCanBo;

-- ================================================================
-- 1️⃣3️⃣ STORED PROCEDURES (MySQL)
-- ================================================================

DELIMITER $$

CREATE PROCEDURE sp_TaoHoSoMoi(
    IN p_MaHoSo VARCHAR(20),
    IN p_TenNghiepVu VARCHAR(200),
    IN p_MaCongDan INT,
    IN p_MaLinhVuc INT,
    IN p_HanXuLy DATETIME,
    IN p_MaLoaiNghiepVu INT,
    IN p_MucDoUuTien INT
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        SELECT 0 AS KetQua, 'Có lỗi xảy ra' AS ThongBao;
    END;
    
    START TRANSACTION;
    
    SET p_MaLoaiNghiepVu = IFNULL(p_MaLoaiNghiepVu, NULL);
    SET p_MucDoUuTien = IFNULL(p_MucDoUuTien, 2);
    
    INSERT INTO HoSoNghiepVu (MaHoSo, TenNghiepVu, MaCongDan, MaLinhVuc, HanXuLy, MaLoaiNghiepVu, MucDoUuTien, MaTrangThai)
    VALUES (p_MaHoSo, p_TenNghiepVu, p_MaCongDan, p_MaLinhVuc, p_HanXuLy, p_MaLoaiNghiepVu, p_MucDoUuTien, 'MOI_TAO');
    
    INSERT INTO LichSuXuLyHoSo (MaHoSo, TrangThaiCu, TrangThaiMoi, NguoiThucHien, GhiChu)
    VALUES (p_MaHoSo, NULL, 'MOI_TAO', p_MaCongDan, 'Hồ sơ được tạo mới');
    
    COMMIT;
    SELECT 1 AS KetQua, 'Thành công' AS ThongBao;
END$$

CREATE PROCEDURE sp_CapNhatKPI_CanBo(
    IN p_ThangNam VARCHAR(7),
    IN p_MaCanBo INT
)
BEGIN
    DECLARE v_TongHoSo INT DEFAULT 0;
    DECLARE v_HoSoDungHan INT DEFAULT 0;
    DECLARE v_HoSoTreHan INT DEFAULT 0;
    DECLARE v_TyLeDungHan FLOAT DEFAULT 0;
    DECLARE v_DiemDanhGia FLOAT DEFAULT 0;
    
    SELECT 
        COUNT(*),
        SUM(CASE 
            WHEN (NgayHoanThanh IS NULL AND NOW() <= HanXuLy) OR 
                 (NgayHoanThanh IS NOT NULL AND NgayHoanThanh <= HanXuLy) THEN 1 
            ELSE 0 
        END),
        SUM(CASE 
            WHEN (NgayHoanThanh IS NULL AND NOW() > HanXuLy) OR 
                 (NgayHoanThanh IS NOT NULL AND NgayHoanThanh > HanXuLy) THEN 1 
            ELSE 0 
        END)
    INTO v_TongHoSo, v_HoSoDungHan, v_HoSoTreHan
    FROM HoSoNghiepVu
    WHERE MaCanBoXuLy = p_MaCanBo
    AND DATE_FORMAT(NgayTao, '%Y-%m') = p_ThangNam;
    
    IF v_TongHoSo > 0 THEN
        SET v_TyLeDungHan = (v_HoSoDungHan * 1.0) / v_TongHoSo;
    ELSE
        SET v_TyLeDungHan = 0;
    END IF;
    
    SET v_DiemDanhGia = v_TyLeDungHan * 100;
    
    IF EXISTS (SELECT 1 FROM KPI_CanBo_Thang WHERE ThangNam = p_ThangNam AND MaCanBo = p_MaCanBo) THEN
        UPDATE KPI_CanBo_Thang
        SET TongHoSoXuLy = v_TongHoSo,
            HoSoDungHan = v_HoSoDungHan,
            HoSoTreHan = v_HoSoTreHan,
            TyLeDungHan = v_TyLeDungHan,
            DiemDanhGia = v_DiemDanhGia
        WHERE ThangNam = p_ThangNam AND MaCanBo = p_MaCanBo;
    ELSE
        INSERT INTO KPI_CanBo_Thang (ThangNam, MaCanBo, TongHoSoXuLy, HoSoDungHan, HoSoTreHan, TyLeDungHan, DiemDanhGia)
        VALUES (p_ThangNam, p_MaCanBo, v_TongHoSo, v_HoSoDungHan, v_HoSoTreHan, v_TyLeDungHan, v_DiemDanhGia);
    END IF;
END$$

DELIMITER ;

-- Bật lại foreign key checks
SET FOREIGN_KEY_CHECKS = 1;

-- ================================================================
-- ✅ HOÀN TẤT - DATABASE ĐÃ SẴN SÀNG CHO phpMyAdmin
-- ================================================================

