// src/lib/mockData.ts

export interface Property {
  id: string;
  slug: string;
  title: string;
  type: 'apartment' | 'villa' | 'annex' | 'penthouse' | 'duplex';
  status: 'available' | 'reserved' | 'sold' | 'coming_soon';
  project: { id: string; name: string; slug: string };
  location: {
    city: string;
    district: string;
    coordinates: { lat: number; lng: number };
    address: string;
  };
  specs: {
    area: number;
    bedrooms: number;
    bathrooms: number;
    livingRooms?: number;
    kitchen: boolean;
    parking?: number;
    floor?: number;
    totalFloors?: number;
    view?: string;
    direction?: 'north' | 'south' | 'east' | 'west' | 'corner';
    features?: string[];
  };
  pricing: {
    price: number;
    pricePerMeter: number;
    currency: 'SAR';
    isNegotiable: boolean;
    downPaymentPct?: number;
    monthlyInstallment?: number;
  };
  media: {
    images: string[];
    thumbnail: string;
    videos?: string[];
    floorPlan?: string;
    virtualTour?: string;
  };
  description: string;
  publishedAt: string;
  featured: boolean;
}

export interface Project {
  id: string;
  slug: string;
  name: string;
  tagline?: string;
  status: 'under_construction' | 'completed' | 'upcoming';
  location: {
    city: string;
    district: string;
    address: string;
  };
  description: string;
  media: {
    hero: string;
    gallery: string[];
  };
  priceRange: { min: number; max: number; currency: 'SAR' };
  specs: {
    totalUnits: number;
    availableUnits: number;
    completionDate: string;
  };
  featured: boolean;
}

export const PROJECTS: Project[] = [
  {
    id: "proj-1",
    slug: "amal-stars",
    name: "مشروع أمل ستارز",
    tagline: "رفاهية سكنية متكاملة الخدمات في أرقى أحياء جدة",
    status: "completed",
    location: {
      city: "جدة",
      district: "السلامة",
      address: "حي السلامة، جدة"
    },
    description: "مجمع سكني معاصر يوفر مساحات خضراء شاسعة، ومسابح خاصة، ومواقف سيارات آمنة، بالإضافة إلى نظام أمني ذكي على مدار الساعة. صُمم المشروع ليمنح العائلات خصوصية مطلقة وجودة حياة لا تضاهى.",
    media: {
      hero: "/projects/amal-stars-hero.jpg",
      gallery: []
    },
    priceRange: { min: 730000, max: 980000, currency: "SAR" },
    specs: {
      totalUnits: 45,
      availableUnits: 12,
      completionDate: "ديسمبر 2025"
    },
    featured: true
  },
  {
    id: "proj-2",
    slug: "abu-hail-avenue",
    name: "مجمع أبو هايل أفينيو",
    tagline: "شقق فخمة وتصاميم عصرية تناسب أسلوب حياتك",
    status: "under_construction",
    location: {
      city: "جدة",
      district: "الروضة",
      address: "حي الروضة، جدة"
    },
    description: "بموقعه الاستراتيجي وتصميمه الهندسي الفاخر، يُعد مشروع أبو هايل أفينيو الخيار الأول للمستثمرين والعائلات الباحثة عن توازن مثالي بين الفخامة والعملية.",
    media: {
      hero: "/projects/abu-hail-hero.jpg",
      gallery: []
    },
    priceRange: { min: 650000, max: 2200000, currency: "SAR" },
    specs: {
      totalUnits: 60,
      availableUnits: 18,
      completionDate: "يونيو 2027"
    },
    featured: true
  },
  {
    id: "proj-3",
    slug: "salama-114",
    name: "مشروع 114 السلامة",
    tagline: "تصميم عصري وجودة بناء تتخطى التوقعات",
    status: "completed",
    location: {
      city: "جدة",
      district: "السلامة",
      address: "حي السلامة، جدة"
    },
    description: "يتميز المشروع بجودة البناء والتشطيبات الفاخرة باستخدام أحدث تقنيات العزل الحراري والمائي، وبجوار كافة الخدمات والمرافق الأساسية لضمان راحة العائلة.",
    media: {
      hero: "/projects/salama-114-hero.jpg",
      gallery: []
    },
    priceRange: { min: 620000, max: 900000, currency: "SAR" },
    specs: {
      totalUnits: 30,
      availableUnits: 5,
      completionDate: "أكتوبر 2025"
    },
    featured: false
  }
];

export const PROPERTIES: Property[] = [
  {
    id: "prop-1",
    slug: "penthouse-4-rooms-amal-stars",
    title: "ملحق فاخر 4 غرف - مشروع أمل ستارز",
    type: "annex",
    status: "available",
    project: { id: "proj-1", name: "مشروع أمل ستارز", slug: "amal-stars" },
    location: {
      city: "جدة",
      district: "السلامة",
      coordinates: { lat: 21.5833, lng: 39.1667 },
      address: "حي السلامة، جدة، المملكة العربية السعودية"
    },
    specs: {
      area: 215,
      bedrooms: 4,
      bathrooms: 4,
      parking: 1,
      floor: 5,
      kitchen: true,
      view: "مفتوح على واجهة الحي الرئيسي",
      features: ["غرفة خادمة", "غرفة سائق", "موقف خاص", "مصعد مستقل", "عزل حراري مائي"]
    },
    pricing: {
      price: 730000,
      pricePerMeter: 3395,
      currency: "SAR",
      isNegotiable: false,
      downPaymentPct: 10,
      monthlyInstallment: 4770
    },
    media: {
      images: ["/properties/prop-1-1.jpg"],
      thumbnail: "/properties/prop-1-thumb.jpg"
    },
    description: "ملحق رائع يحتوي على 4 غرف نوم واسعة و4 دورات مياه مجهزة بالكامل. يتضمن موقف سيارات خاص ومصعد مستقل، بالإضافة إلى غرفة مخصصة للسائق وأخرى للخادمة. تشطيبات الترا سوبر لوكس تناسب معايير الفخامة العائلية.",
    publishedAt: "2026-05-10",
    featured: true
  },
  {
    id: "prop-2",
    slug: "abu-hail-north-luxury-villa",
    title: "فيلا أبو هايل نورث الفاخرة مع مسبح خاص",
    type: "villa",
    status: "available",
    project: { id: "proj-2", name: "مجمع أبو هايل أفينيو", slug: "abu-hail-avenue" },
    location: {
      city: "جدة",
      district: "الروضة",
      coordinates: { lat: 21.5667, lng: 39.15 },
      address: "حي الروضة، جدة، المملكة العربية السعودية"
    },
    specs: {
      area: 320,
      bedrooms: 5,
      bathrooms: 6,
      parking: 2,
      kitchen: true,
      direction: "north",
      view: "إطلالة بحرية جزئية ومسبح داخلي",
      features: ["مسبح خاص", "جراج يتسع لسيارتين", "مصعد داخلي", "نظام تكييف مركزي VRF", "أمن وحراسة"]
    },
    pricing: {
      price: 17000000,
      pricePerMeter: 53125,
      currency: "SAR",
      isNegotiable: true,
      downPaymentPct: 20,
      monthlyInstallment: 111150
    },
    media: {
      images: ["/properties/prop-2-1.jpg"],
      thumbnail: "/properties/prop-2-thumb.jpg"
    },
    description: "فيلا قمة في الفخامة والرقي بحي الروضة بجدة. تمتد على مساحة 320 متر مربع وتضم 5 أجنحة نوم رئيسية بمصعد داخلي ومسبح خاص دافئ وجناح متكامل للخدم والحراسة وموقف آمن مغطى لسيارتين.",
    publishedAt: "2026-05-15",
    featured: true
  },
  {
    id: "prop-3",
    slug: "saeed-plan-premium-villa",
    title: "فيلا راقية - مخطط السعيد",
    type: "villa",
    status: "available",
    project: { id: "none", name: "فلل مخطط السعيد المستقلة", slug: "independent" },
    location: {
      city: "جدة",
      district: "مخطط السعيد",
      coordinates: { lat: 21.65, lng: 39.22 },
      address: "مخطط السعيد، جدة، المملكة العربية السعودية"
    },
    specs: {
      area: 350,
      bedrooms: 5,
      bathrooms: 5,
      parking: 2,
      kitchen: true,
      features: ["مسبح", "فناء خلفي واسع", "مجلس رجال مستقل", "موقف سيارات خاص"]
    },
    pricing: {
      price: 1500000,
      pricePerMeter: 4285,
      currency: "SAR",
      isNegotiable: false,
      downPaymentPct: 15,
      monthlyInstallment: 9812
    },
    media: {
      images: ["/properties/prop-3-1.jpg"],
      thumbnail: "/properties/prop-3-thumb.jpg"
    },
    description: "فيلا مستقلة بمساحة 350 متر مربع في منطقة هادئة بمخطط السعيد بجدة. تمتاز الفيلا بوجود مجلس رجال خارجي مستقل وفناء خلفي مع مسبح خاص لضمان أعلى مستويات الرفاهية العائلية.",
    publishedAt: "2026-05-20",
    featured: true
  },
  {
    id: "prop-4",
    slug: "apartment-5-rooms-salama-114",
    title: "شقة 5 غرف نموذجية - مشروع 114 السلامة",
    type: "apartment",
    status: "available",
    project: { id: "proj-3", name: "مشروع 114 السلامة", slug: "salama-114" },
    location: {
      city: "جدة",
      district: "السلامة",
      coordinates: { lat: 21.5833, lng: 39.1667 },
      address: "حي السلامة، جدة، المملكة العربية السعودية"
    },
    specs: {
      area: 171.49,
      bedrooms: 5,
      bathrooms: 3,
      parking: 1,
      floor: 2,
      kitchen: true,
      features: ["غرفة خادمة", "موقف خاص مغطى", "مصعد متطور", "خزان مياه مستقل"]
    },
    pricing: {
      price: 790000,
      pricePerMeter: 4606,
      currency: "SAR",
      isNegotiable: false,
      downPaymentPct: 10,
      monthlyInstallment: 5167
    },
    media: {
      images: ["/properties/prop-4-1.jpg"],
      thumbnail: "/properties/prop-4-thumb.jpg"
    },
    description: "شقة عائلية فاخرة تضم 5 غرف نوم وتوزيع هندسي مريح جداً. الشقة مجهزة بغرفة للخادمة وموقف خاص مستقل وخزانات مياه أرضية وعلوية مستقلة مع عداد كهرباء خاص.",
    publishedAt: "2026-05-22",
    featured: false
  },
  {
    id: "prop-5",
    slug: "apartment-4-rooms-front-salama-114",
    title: "شقة 4 غرف أمامية - مشروع 114 السلامة",
    type: "apartment",
    status: "available",
    project: { id: "proj-3", name: "مشروع 114 السلامة", slug: "salama-114" },
    location: {
      city: "جدة",
      district: "السلامة",
      coordinates: { lat: 21.5833, lng: 39.1667 },
      address: "حي السلامة، جدة، المملكة العربية السعودية"
    },
    specs: {
      area: 125.05,
      bedrooms: 4,
      bathrooms: 3,
      parking: 1,
      floor: 3,
      kitchen: true,
      features: ["موقف خاص", "مصعد مستقل", "إضاءة ليد ذكية"]
    },
    pricing: {
      price: 620000,
      pricePerMeter: 4958,
      currency: "SAR",
      isNegotiable: false,
      downPaymentPct: 10,
      monthlyInstallment: 4055
    },
    media: {
      images: ["/properties/prop-5-1.jpg"],
      thumbnail: "/properties/prop-5-thumb.jpg"
    },
    description: "شقة أمامية تطل مباشرة على الشارع الرئيسي وتتمتع بإضاءة شمس ممتازة وتوزيع داخلي ذكي يربط المطبخ وغرفة المعيشة وغرف النوم.",
    publishedAt: "2026-05-25",
    featured: false
  },
  {
    id: "prop-6",
    slug: "apartment-4-rooms-back-safaa",
    title: "شقة 4 غرف خلفية مميزة - جدة الصفا",
    type: "apartment",
    status: "available",
    project: { id: "none", name: "عمارات الصفا السكنية", slug: "independent" },
    location: {
      city: "جدة",
      district: "الصفا",
      coordinates: { lat: 21.59, lng: 39.20 },
      address: "حي الصفا، جدة، المملكة العربية السعودية"
    },
    specs: {
      area: 134.23,
      bedrooms: 4,
      bathrooms: 3,
      parking: 1,
      floor: 1,
      kitchen: true,
      features: ["موقف خاص", "مصعد عمارة", "خزانات مياه مستقلة"]
    },
    pricing: {
      price: 550000,
      pricePerMeter: 4097,
      currency: "SAR",
      isNegotiable: false,
      downPaymentPct: 10,
      monthlyInstallment: 3597
    },
    media: {
      images: ["/properties/prop-6-1.jpg"],
      thumbnail: "/properties/prop-6-thumb.jpg"
    },
    description: "شقة 4 غرف خلفية هادئة بحي الصفا بجدة بأسعار ممتازة جداً ومناسبة للتمويل العقاري. تشطيب متكامل وضمانات إنشائية شاملة.",
    publishedAt: "2026-05-26",
    featured: false
  },
  {
    id: "prop-7",
    slug: "apartment-4-rooms-rowdah-luxury",
    title: "شقة 4 غرف فاخرة - حي الروضة",
    type: "apartment",
    status: "available",
    project: { id: "proj-2", name: "مجمع أبو هايل أفينيو", slug: "abu-hail-avenue" },
    location: {
      city: "جدة",
      district: "الروضة",
      coordinates: { lat: 21.5667, lng: 39.15 },
      address: "حي الروضة، جدة، المملكة العربية السعودية"
    },
    specs: {
      area: 149.96,
      bedrooms: 4,
      bathrooms: 3,
      parking: 1,
      floor: 4,
      kitchen: true,
      features: ["موقف خاص", "مصعد ذكي", "تشطيبات فاخرة"]
    },
    pricing: {
      price: 1500000,
      pricePerMeter: 10002,
      currency: "SAR",
      isNegotiable: false,
      downPaymentPct: 10,
      monthlyInstallment: 9812
    },
    media: {
      images: ["/properties/prop-7-1.jpg"],
      thumbnail: "/properties/prop-7-thumb.jpg"
    },
    description: "شقة فخمة جداً في مجمع أبو هايل أفينيو بحي الروضة بجدة. تشطيبات فاخرة بالرخام والخشب الطبيعي وأنظمة إضاءة حديثة متوافقة بالكامل مع الكود السعودي.",
    publishedAt: "2026-05-28",
    featured: true
  },
  {
    id: "prop-8",
    slug: "penthouse-6-rooms-rowdah-large",
    title: "بنتهاوس 6 غرف كبير - حي الروضة",
    type: "penthouse",
    status: "available",
    project: { id: "proj-2", name: "مجمع أبو هايل أفينيو", slug: "abu-hail-avenue" },
    location: {
      city: "جدة",
      district: "الروضة",
      coordinates: { lat: 21.5667, lng: 39.15 },
      address: "حي الروضة، جدة، المملكة العربية السعودية"
    },
    specs: {
      area: 290,
      bedrooms: 6,
      bathrooms: 6,
      parking: 2,
      floor: 5,
      kitchen: true,
      features: ["غرفة خادمة", "مسبح خاص بالسطح", "جراج يتسع لسيارتين", "مصعد مستقل"]
    },
    pricing: {
      price: 2200000,
      pricePerMeter: 7586,
      currency: "SAR",
      isNegotiable: true,
      downPaymentPct: 15,
      monthlyInstallment: 14391
    },
    media: {
      images: ["/properties/prop-8-1.jpg"],
      thumbnail: "/properties/prop-8-thumb.jpg"
    },
    description: "بنتهاوس (روف سكني) استثنائي يمتد على مساحة 290 متر مربع ويحتوي على مسبح خاص بالسطح وفناء خارجي واسع مطل على الروضة بجدة. مجهز بـ 6 غرف نوم وجناح متكامل للخدم والطبخ.",
    publishedAt: "2026-05-30",
    featured: true
  },
  {
    id: "prop-9",
    slug: "penthouse-5-rooms-salama-114",
    title: "ملحق 5 غرف فاخر - مشروع 114 السلامة",
    type: "annex",
    status: "available",
    project: { id: "proj-3", name: "مشروع 114 السلامة", slug: "salama-114" },
    location: {
      city: "جدة",
      district: "السلامة",
      coordinates: { lat: 21.5833, lng: 39.1667 },
      address: "حي السلامة، جدة، المملكة العربية السعودية"
    },
    specs: {
      area: 243.3,
      bedrooms: 6,
      bathrooms: 5,
      parking: 1,
      floor: 4,
      kitchen: true,
      features: ["غرفة خادمة", "غرفة سائق", "موقف مستقل", "خزانات خاصة مجهّزة"]
    },
    pricing: {
      price: 900000,
      pricePerMeter: 3700,
      currency: "SAR",
      isNegotiable: false,
      downPaymentPct: 10,
      monthlyInstallment: 5887
    },
    media: {
      images: ["/properties/prop-9-1.jpg"],
      thumbnail: "/properties/prop-9-thumb.jpg"
    },
    description: "ملحق روف واسع ومميز يحتوي على 6 غرف نوم و5 حمامات ومساحات جلوس عائلية واسعة مع إطلالات رائعة على حي السلامة وضمانات كاملة للمبنى.",
    publishedAt: "2026-06-01",
    featured: false
  }
];
