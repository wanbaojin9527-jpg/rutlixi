
export const APP_CONFIG = {
  // 1. THÔNG TIN THƯƠNG HIỆU
  brand: {
    name: "Concung",
    subName: "Mẹ & Bé",
    logoText: "C",
    primaryColor: "#ff4d94", // Màu hồng Concung
    secondaryColor: "#d61a65", // Hồng đậm cho hiệu ứng
  },

  // 2. NỘI TRUNG TRANG CHỦ
  home: {
    eventTag: "Sự kiện Tết 2026",
    mainTitle: "🎁 RÚT LÌ XÌ MAY MẮN",
    subTitle: "Vì bạn tham gia khảo sát VIP nên ConCung tặng bạn 1 lượt rút lì xì đầu năm may mắn 100% có quà tặng !",
    thankYouMessage: "Bạn đã tham gia chương trình. Cảm ơn bạn đã đồng hành cùng Concung!",
    participantText: "Hiện có {count} người đang rút lì xì",
    footerNote: "* Mỗi khách hàng VIP chỉ được tham gia rút 01 lần duy nhất trong suốt chương trình. Vui lòng hoàn thành khảo sát VIP để hệ thống gửi quà về địa chỉ của bạn.",
  },

  // 3. CẤU HÌNH QUÀ TẶNG & TỶ LỆ TRÚNG (%)
  prizes: [
    { 
      id: 1, 
      name: "Xe SH 150i", 
      percentage: 0.1, 
      imageUrl: "https://muaxemay.vn/wp-content/uploads/2016/12/1_White-3.png" 
    },
    { 
      id: 2, 
      name: "iPhone 17 Pro Max", 
      percentage: 19.9, 
      imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwqsMiTgV_vcL2htjwtTT-8MkxMDl-5RV1LA&s" 
    },
    { 
      id: 3, 
      name: "TV LG 65 inch", 
      percentage: 19.9, 
      imageUrl: "https://cdn.mediamart.vn/images/product/smart-tivi-lg-4k-65-inch-65uq7550psf-thinq-ai_ae9d5ffb.jpg" 
    },
    { 
      id: 4, 
      name: "1 chỉ vàng 9999", 
      percentage: 19.9, 
      imageUrl: "https://sjc.com.vn/Data/Sites/1/Product/10759/1-chi_1474808161.jpg" 
    },
    { 
      id: 5, 
      name: "10.000.000 VNĐ", 
      percentage: 19.9, 
      imageUrl: "https://png.pngtree.com/png-clipart/20250714/original/pngtree-falling-gold-coins-dollar-symbol-clipart-for-transparent-background-and-wealth-png-image_21272251.png" 
    },
    { 
      id: 6, 
      name: "5.000.000 VNĐ", 
      percentage: 19.9, 
      imageUrl: "https://png.pngtree.com/png-clipart/20250714/original/pngtree-falling-gold-coins-dollar-symbol-clipart-for-transparent-background-and-wealth-png-image_21272251.png" 
    }
  ],

  // 4. NỘI DUNG POPUP TRÚNG THƯỞNG
  modal: {
    congratsText: "🎉 CHÚC MỪNG BẠN 🎉",
    prizeLabel: "Bạn đã may mắn trúng giải:",
    instructionText: "Để nhận được phần quà giá trị này, vui lòng HOÀN THÀNH KHẢO SÁT VIP theo hướng dẫn của LÊ MINH TUẤN.",
    surveyButtonText: "HOÀN THÀNH KHẢO SÁT VIP",
    confirmMessage: "Vui lòng chụp ảnh màn hình và gửi vô nhóm khảo sát vip để xác nhận phần quà !",
    closeButtonText: "Đóng thông báo",
    viewResultButtonText: "🏆 XEM KẾT QUẢ CỦA BẠN"
  },

  // 5. CẤU HÌNH HÌNH ẢNH BAO LÌ XÌ
  envelope: {
    imageUrl: "https://inchi.vn/data/cms_upload/files/Linh-boy/bao-li-xi-tet-2026/mau-bao-li-xi-tet-2026/li-xi-binh-ngo/li-xi-binh-ngo-10.jpg",
    backColor: "#ee1c24",
    frontText: "LÌ XÌ MAY MẮN",
    subText: "Cung Chúc Tân Xuân"
  }
};
