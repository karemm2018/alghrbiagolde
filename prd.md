# وثيقة متطلبات المنتج — PRD
## المنصة العقارية الاحترافية | الجيل الجديد

---

```
الإصدار  : 2.0
التاريخ  : يونيو 2026
الحالة   : نهائي — جاهز للتطوير
التقنية  : Next.js 14+ · Tailwind CSS v4 · Framer Motion · TypeScript
```

---

## 📋 جدول المحتويات

1. [نظرة عامة على المشروع](#1-نظرة-عامة-على-المشروع)
2. [هوية العلامة التجارية](#2-هوية-العلامة-التجارية)
3. [نظام الألوان الكامل](#3-نظام-الألوان-الكامل)
4. [نظام الطباعة](#4-نظام-الطباعة)
5. [هيكل الموقع وخريطة الصفحات](#5-هيكل-الموقع-وخريطة-الصفحات)
6. [تفاصيل الصفحات والأقسام](#6-تفاصيل-الصفحات-والأقسام)
7. [مكتبة المكونات](#7-مكتبة-المكونات)
8. [استراتيجية الحركة والتأثيرات](#8-استراتيجية-الحركة-والتأثيرات)
9. [البنية التقنية](#9-البنية-التقنية)
10. [نموذج البيانات](#10-نموذج-البيانات)
11. [الأداء والـ SEO](#11-الأداء-والـ-seo)
12. [إمكانية الوصول والتدويل](#12-إمكانية-الوصول-والتدويل)
13. [مراحل التطوير والجداول الزمنية](#13-مراحل-التطوير-والجداول-الزمنية)
14. [التكاليف التشغيلية](#14-التكاليف-التشغيلية)

---

## 1. نظرة عامة على المشروع

### 1.1 تعريف المشروع

بناء منصة عقارية رقمية من الجيل الجديد لشركة عقارية رائدة في السوق السعودي. المنصة ليست مجرد موقع، بل هي تجربة رقمية فاخرة تعكس حجم الشركة ومكانتها، وتُجسّد معادلة الثقة والجودة والحداثة في كل تفاصيلها.

الانتقال من WordPress/Elementor إلى Next.js App Router هو انتقال من موقع عرض إلى **منصة ذكية** بأداء استثنائي، تجربة مستخدم لا تُنسى، وهوية بصرية تنافس أكبر شركات العقار في الخليج.

### 1.2 الهدف الاستراتيجي

| البُعد | الهدف |
|--------|-------|
| **الصورة الذهنية** | تصبح المرجع الأول في الفخامة العقارية رقمياً في المنطقة |
| **الأداء التقني** | Lighthouse Score > 90 على جميع المحاور |
| **التحويل** | +40% في طلبات الاستفسار خلال أول 6 أشهر |
| **الانتشار** | تصدر الصفحة الأولى في Google للكلمات المستهدفة |
| **الاحتفاظ** | تقليل معدل الارتداد (Bounce Rate) إلى أقل من 35% |

### 1.3 المشكلات الحالية (Pain Points)

- الموقع الحالي يفتقر لهوية بصرية تعكس حجم الشركة
- أداء ضعيف على الموبايل — WordPress ثقيل
- لا توجد تجربة بحث متطورة
- لا يعكس مستوى فخامة الوحدات المطروحة
- غياب محتوى تفاعلي (حاسبة تمويل، خريطة، معرض ثلاثي الأبعاد)

### 1.4 الجمهور المستهدف

| الشريحة | الوصف | الأولوية |
|---------|-------|----------|
| **المستثمرون الثروات** | High Net Worth — يبحثون عن عائد استثماري | عالية جداً |
| **عائلات التملك الأول** | تبحث عن منزل العمر بثقة وشفافية | عالية |
| **المغتربون والسعوديون خارج المملكة** | يتصفحون الفرص عن بُعد | متوسطة |
| **المطورون العقاريون والشركات** | يبحثون عن شراكات ومشاريع ضخمة | متوسطة |

---

## 2. هوية العلامة التجارية

### 2.1 الفلسفة التصميمية

**الكلمة المحورية: الرسوخ**

تصميم الشركات العملاقة لا يصرخ بالفخامة — بل تشعر به. الفخامة الحقيقية هي الهدوء الواثق، النسب المتوازنة، المسافات السخية، والتفاصيل الدقيقة التي يلاحظها العين دون أن يدرك صاحبها سببها.

المرجع البصري: شركات أرامكو، ROSHN، مجموعة صافولا، والعلامات العقارية الكبرى في دبي وأبوظبي.

### 2.2 ثوابت الهوية البصرية

- **الأزرق الملكي العميق** — من لون شعار الشركة — هو لون الهوية الرئيسي
- **الذهب الدافئ** — ليس ذهباً صارخاً بل شامبين راقٍ — لعناصر القيمة
- **المسافات البيضاء** — عنصر تصميمي لا فراغ
- **التناسق والنظام** — كل عنصر يعرف مكانه بدقة
- **لا مؤثرات بصرية مشتتة** — لا جسيمات عائمة، لا فقاعات، لا تأثيرات مبالغ فيها

### 2.3 الصوت البصري (Visual Voice)

```
محظور                          مسموح
──────────────────────────────────────────
جسيمات عائمة                   خطوط ذهبية دقيقة
فقاعات متحركة                  كشف تدريجي عند التمرير
ألوان نيون أو زاهية            تدرجات هادئة وعميقة
تأثيرات ثلاثية مبهرة           حركة هادفة ومحسوبة
حركة مستمرة بلا توقف          انتقالات ناعمة وانسيابية
خلفيات سوداء خالصة             أزرق ليلي عميق
```

---

## 3. نظام الألوان الكامل

### 3.1 المنطق اللوني — "أزرق الرسوخ وذهب القيمة"

اللون الأزرق العميق هو لون الثقة والمؤسسات والرسوخ في كل ثقافات العالم. حين يُزاوج مع الذهب الشامبيني الهادئ — تنتج هوية تقول: **ضخامة بلا ادعاء، فخامة بلا مبالغة**.

### 3.2 ألوان الخلفيات (Backgrounds)

```css
/* التراتبية الزرقاء — من الأعمق للأفتح */
--bg-midnight    : #060D1A;   /* أعمق نقطة — للـ Hero ولخلفية الموقع الكاملة */
--bg-deep        : #0A1628;   /* الخلفية الرئيسية للصفحات */
--bg-navy        : #0F2040;   /* الأقسام المتناوبة */
--bg-royal       : #152A54;   /* خلفية الكروت والـ Containers */
--bg-surface     : #1C3566;   /* سطح العناصر التفاعلية */

/* تأثير الـ Glass على هذه الخلفيات */
--bg-glass       : rgba(15, 32, 64, 0.82);   /* مع backdrop-blur: 24px */
--bg-overlay     : rgba(6, 13, 26, 0.75);    /* للـ Hero Overlay فوق الصور */
```

### 3.3 ألوان الهوية الأزرق (Brand Blues)

```css
--brand-deep     : #0A2A6E;   /* أزرق العلامة الكامل الغامق */
--brand-primary  : #1A5BA5;   /* الأزرق الأساسي — مستخرج من اللوجو */
--brand-royal    : #2470C2;   /* للتفاعلات والـ hover */
--brand-bright   : #3D8EE8;   /* تأكيدات، أيقونات نشطة */
--brand-light    : #7BB8F5;   /* نصوص ثانوية على الخلفيات الداكنة */
--brand-pale     : #C5DDF8;   /* تلميحات وبيانات خافتة */
```

### 3.4 ألوان الذهب (Gold Palette)

```css
--gold-pale      : #F5EDD8;   /* كريم ذهبي — أفتح درجة */
--gold-light     : #E8C98A;   /* ذهب فاتح — للـ Hover على الأزرار */
--gold-primary   : #C9A96E;   /* الذهب الأساسي — CTAs والتمييز */
--gold-warm      : #B8945A;   /* ذهب دافئ — للحدود والفواصل */
--gold-deep      : #9A7A40;   /* ذهب عميق — للظلال والتدرجات */
--gold-dark      : #7A5E2A;   /* أغمق درجة — نادر الاستخدام */
```

### 3.5 ألوان النصوص (Typography)

```css
--text-primary   : #FFFFFF;   /* الأبيض النقي — العناوين الرئيسية */
--text-secondary : #D4E3F5;   /* أبيض مزرق — النصوص الفرعية */
--text-muted     : #8AAED4;   /* رمادي مزرق — التفاصيل والبيانات */
--text-subtle    : #4E7AAF;   /* خافت جداً — البيانات الثانوية */
--text-gold      : #C9A96E;   /* ذهبي — للتمييز والأسعار */
--text-gold-pale : #E8C98A;   /* ذهبي فاتح — للـ Hover */
```

### 3.6 الحدود والفواصل (Borders)

```css
--border-gold    : rgba(201, 169, 110, 0.30);  /* حدود ذهبية خفيفة */
--border-gold-md : rgba(201, 169, 110, 0.55);  /* حدود ذهبية عند التفاعل */
--border-blue    : rgba(61, 142, 232, 0.20);   /* حدود زرقاء خفيفة */
--border-blue-md : rgba(61, 142, 232, 0.40);   /* حدود زرقاء عند التفاعل */
--border-white   : rgba(255, 255, 255, 0.08);  /* فواصل بيضاء شفافة */
```

### 3.7 حالات الوحدات (Property Status)

```css
--status-available : #22A96E;   /* متاح — أخضر عميق */
--status-reserved  : #D4883A;   /* محجوز — برتقالي ذهبي */
--status-sold      : #C0392B;   /* مباع — أحمر عميق */
--status-soon      : #2470C2;   /* قريباً — أزرق الهوية */
```

### 3.8 التدرجات الرئيسية (Gradients)

```css
/* تدرج الذهب — الأزرار والـ CTAs */
--grad-gold: linear-gradient(135deg, #B8945A 0%, #E8C98A 45%, #C9A96E 70%, #9A7A40 100%);

/* تدرج الأزرق العميق — خلفيات الأقسام */
--grad-navy: linear-gradient(180deg, #060D1A 0%, #0A1628 50%, #0F2040 100%);

/* تدرج الـ Hero فوق الصورة */
--grad-hero: linear-gradient(
  to bottom,
  rgba(6,13,26,0.20)  0%,
  rgba(6,13,26,0.55)  50%,
  rgba(6,13,26,0.95)  85%,
  #060D1A             100%
);

/* تدرج تمييز الكروت — حد علوي ذهبي */
--grad-card-top: linear-gradient(90deg, transparent 0%, #C9A96E 50%, transparent 100%);

/* Shimmer للأزرار عند Hover */
--grad-shimmer: linear-gradient(
  105deg,
  transparent 40%,
  rgba(255,255,255,0.18) 50%,
  transparent 60%
);
```

### 3.9 التوهج والظلال (Glows & Shadows)

```css
/* لا نيون — فقط توهج ناعم يُعمّق الإحساس بالعمق */
--shadow-card     : 0 4px 24px rgba(6, 13, 26, 0.60);
--shadow-card-hover: 0 12px 48px rgba(6, 13, 26, 0.80), 0 0 0 1px rgba(201,169,110,0.30);
--shadow-btn-gold : 0 4px 20px rgba(201, 169, 110, 0.25);
--shadow-btn-hover: 0 6px 28px rgba(201, 169, 110, 0.40);
--shadow-inset    : inset 0 1px 0 rgba(255,255,255,0.06);
```

---

## 4. نظام الطباعة

### 4.1 أزواج الخطوط

| الاستخدام | اللاتيني | العربي | الوزن |
|-----------|---------|--------|-------|
| عنوان Hero الضخم | Playfair Display | Amiri / Cairo Display | 700 |
| العناوين الرئيسية | Cormorant Garamond | Tajawal | 600 |
| العناوين الثانوية | DM Serif Display | Tajawal | 500 |
| نصوص الواجهة | DM Sans | Noto Sans Arabic | 400 / 500 |
| الأرقام الكبيرة (أسعار) | Bebas Neue | Cairo | 400 |
| الكود والمواصفات التقنية | JetBrains Mono | — | 400 |

### 4.2 Scale الطباعي

```css
/* Mobile First — Desktop يُضاف فوقه */
--text-xs   :  11px;   /* تسميات صغيرة، badges */
--text-sm   :  13px;   /* نصوص ثانوية */
--text-base :  16px;   /* نص أساسي */
--text-md   :  18px;   /* فقرات مميزة */
--text-lg   :  22px;   /* عناوين أقسام صغيرة */
--text-xl   :  28px;   /* عناوين أقسام */
--text-2xl  :  36px;   /* عناوين صفحات */
--text-3xl  :  48px;   /* Hero subtitle */
--text-4xl  :  64px;   /* Hero title */
--text-5xl  :  80px;   /* Hero display — Desktop فقط */

/* line-height */
--leading-tight : 1.15;
--leading-snug  : 1.35;
--leading-normal: 1.60;
--leading-loose : 1.85;

/* letter-spacing للعناوين */
--tracking-tight : -0.03em;
--tracking-normal:  0.00em;
--tracking-wide  :  0.08em;
--tracking-wider :  0.15em;   /* للـ Labels والـ Badges */
```

---

## 5. هيكل الموقع وخريطة الصفحات

### 5.1 Sitemap الكامل

```
/  (الرئيسية)
├── /projects  (مشاريعنا)
│   └── /projects/[slug]  (تفاصيل مشروع)
│       └── /projects/[slug]/units  (وحدات المشروع)
│
├── /properties  (الوحدات)
│   └── /properties/[slug]  (تفاصيل وحدة)
│
├── /about  (من نحن)
├── /services  (خدماتنا)
├── /blog  (المدونة)
│   └── /blog/[slug]  (مقالة)
│
├── /contact  (تواصل معنا)
├── /inquiry  (احجز وحدتك — Landing)
│
└── /api  (Route Handlers)
    ├── /api/properties
    ├── /api/projects
    ├── /api/contact
    └── /api/mortgage-calc
```

### 5.2 نموذج التوجيه والـ Rendering

| الصفحة | Strategy | Revalidate |
|--------|----------|------------|
| الرئيسية | `ISR` | 300s |
| قائمة الوحدات | `SSR` | — |
| تفاصيل الوحدة | `ISR` | 1800s |
| تفاصيل المشروع | `ISR` | 3600s |
| المدونة | `ISR` | 3600s |
| الصفحات الثابتة | `SSG` | — |

---

## 6. تفاصيل الصفحات والأقسام

### 6.1 الصفحة الرئيسية

---

#### ◆ Section 1 — Hero (100vh)

**المفهوم:** الشاشة الأولى تقول كل شيء في الثواني الثلاث الأولى. صورة بانورامية ضخمة لأرقى وحدات الشركة، مع نص راسخ وزر واحد واضح.

```
التكوين البصري:
┌─────────────────────────────────────────┐
│  NAVBAR (transparent → solid on scroll) │
│                                         │
│                                         │
│        [صورة/فيديو fullscreen]          │
│        [overlay gradient 30%→95%]       │
│                                         │
│  نعتمد أحدث التقنيات               │
│  تربط العملاء بأفضل الفرص السكنية  │
│                                         │
│  حرفية تشييد وتميّز عقاري          │
│                                         │
│  [ استعرض المشاريع ]  [ تواصل معنا ] │
│                                         │
│  ─────────────────────────────────────  │
│  [شريط البحث المدمج]                    │
└─────────────────────────────────────────┘

الخلفية: صورة high-res لأفخم مشروع (أو فيديو Autoplay مكتوم)
Overlay: --grad-hero (أزرق ليلي عميق)
لا يوجد: جسيمات / فقاعات / أي عنصر يتحرك باستمرار
```

**المحتوى:**
- العنوان الرئيسي (H1): نص الشركة الحالي
- العنوان الفرعي: "حرفية تشييد وتميّز عقاري"
- CTA أساسي: "استعرض مشاريعنا" ← زر ذهبي كبير
- CTA ثانوي: "تواصل معنا" ← زر Outline أزرق فاتح

**الـ Scroll Indicator:**
خط رأسي بسيط متحرك (يتمدد ويتقلص تدريجياً) — لا أيقونة فأس ولا فقاعة — مجرد خط ذهبي دقيق ينبض.

---

#### ◆ Section 2 — شريط البحث المتقدم

```
التكوين:
┌─────────────────────────────────────────────────────────┐
│  [نوع العقار ▾]  [المدينة ▾]  [المساحة ▾]  [الغرف ▾]  [السعر ▾]  [بحث] │
└─────────────────────────────────────────────────────────┘
خلفية: Glass Morphism — rgba(15,32,64,0.82) + blur(24px)
حد: 1px solid rgba(201,169,110,0.30)
```

**الحقول:**
| الحقل | النوع | القيم |
|-------|-------|-------|
| نوع العقار | Dropdown | شقة / فيلا / ملحق / أرض / بنتهاوس |
| المدينة/الحي | Searchable Dropdown | مع Autocomplete |
| المساحة (م²) | Range Slider | 50 ← 2000+ |
| عدد الغرف | Button Group | 1، 2، 3، 4، 5+ |
| نطاق السعر | Dual Range Slider | بتنسيق SAR |
| زر البحث | Primary Button | ذهبي — "البحث" |

---

#### ◆ Section 3 — أرقامنا تتحدث (Stats)

```
تصميم: 4 أعمدة مع فاصل ذهبي عمودي بينها
خلفية: --bg-navy مع حد علوي وسفلي من --border-gold
```

| الرقم | الوصف |
|-------|-------|
| +500 | وحدة سُلِّمت بنجاح |
| +25 | مشروع مكتمل |
| +1200 | عميل راضٍ |
| +15 | سنة خبرة في السوق |

**Animation:** CountUp فقط — يبدأ حين يدخل القسم للشاشة (Intersection Observer). الأرقام تصعد بسلاسة مع ease-out. لا شيء آخر يتحرك.

---

#### ◆ Section 4 — أحدث العروض

```
Layout: Grid — 3 أعمدة Desktop، 2 Tablet، 1 Mobile
Heading: "أحدث العروض"  (تكشّف بـ clip-path عند الدخول)
Sub: "نحقق حلمك في التملُّك العقاري..."
CTA Section Footer: "عرض جميع الوحدات →"
```

**Property Card — المواصفات الكاملة:**

```
┌────────────────────────────────┐
│  [صورة الوحدة — aspect 4:3]   │
│  ┌──────────────────────────┐  │
│  │ BADGE: متاح / محجوز / مباع│ │
│  └──────────────────────────┘  │
├────────────────────────────────┤
│  نوع الوحدة              المشروع │
│  اسم الوحدة                      │
│  📍 الحي، المدينة                │
│  ─────────────────────────────  │
│  🛏 4    🚿 3    📐 215م²        │
│  ─────────────────────────────  │
│  السعر                          │
│  ٧٣٠,٠٠٠ ر.س                    │
│  ─────────────────────────────  │
│  [تفاصيل]           [📞 اتصال]  │
└────────────────────────────────┘

Hover:
  - الكارت يرتفع قليلاً: translateY(-4px)
  - الحد يصبح ذهبياً: --border-gold-md
  - الظل يتسع: --shadow-card-hover
  - لا أي تحول مبالغ فيه
```

---

#### ◆ Section 5 — مشاريعنا المميزة

**Layout:** Alternating — صورة يمين / محتوى يسار ثم العكس

```
المشروع الأول:
┌──────────────────────┬──────────────────────┐
│                      │  اسم المشروع         │
│   [صورة المشروع]    │  الموقع              │
│   الكاملة           │  الوصف (3 سطور)      │
│                      │  ✦ ميزة 1            │
│                      │  ✦ ميزة 2            │
│                      │  ✦ ميزة 3            │
│                      │  [X] وحدة متاحة       │
│                      │  [استعرض المشروع →]   │
└──────────────────────┴──────────────────────┘

المشروع الثاني: (الصورة على اليسار)
```

**Animation:** الصورة والمحتوى يدخلان من الجهتين عند الـ Scroll — حركة بسيطة وهادفة.

---

#### ◆ Section 6 — لماذا نحن؟

**Layout:** Grid — 3 أعمدة Desktop

```
كل عنصر:
┌────────────────────────────┐
│  ┌────┐                    │
│  │ ✦  │  العنوان           │
│  └────┘                    │
│  الوصف (3-4 جمل)           │
└────────────────────────────┘
الأيقونة: SVG مخصصة — دائرة زرقاء داكنة + رمز ذهبي
```

**المحتوى المقترح:**

| الأيقونة | العنوان | الوصف |
|---------|---------|-------|
| 🏗 | جودة البناء | نلتزم بمعايير تتجاوز مواصفات الكود السعودي لنضمن لك بناء يدوم |
| 🔒 | الشفافية الكاملة | لا رسوم خفية ولا مفاجآت — كل شيء مكتوب وموثق قبل التوقيع |
| 🏆 | خبرة 15 عاماً | ثلاثة عشر مشروعاً ناجحاً وأكثر من ألف عائلة في منازلها الجديدة |
| 🤝 | خدمة ما بعد البيع | صيانة ودعم فني متواصل حتى بعد تسلّمك مفاتيح منزلك |
| 💰 | تمويل ميسّر | نتعاون مع كبرى البنوك لتقديم خطط سداد تناسب جميع الفئات |
| 📋 | توثيق رسمي | كل وحدة مسجلة رسمياً بضمانات نظامية ووثائق قانونية معتمدة |

---

#### ◆ Section 7 — شهادات العملاء

**Layout:** Marquee Carousel — شريط يتمرر أفقياً بشكل تلقائي وناعم

```
بطاقة الشهادة:
┌──────────────────────────────────────┐
│  ❝                                   │
│  "نص تجربة العميل الحقيقية..."       │
│  "سطران أو ثلاثة على الأكثر"         │
│                                      │
│  ┌───┐  اسم العميل                   │
│  │صورة│  المدينة · نوع الوحدة        │
│  └───┘  ★ ★ ★ ★ ★                   │
└──────────────────────────────────────┘
خلفية الكارت: --bg-royal مع حد --border-gold
```

**ملاحظة تقنية:** Marquee بـ CSS animation فقط — `animation: marquee linear infinite` — لا JavaScript إلا لإيقافه عند Hover.

---

#### ◆ Section 8 — CTA الختامي

```
تصميم: Full-width Section
خلفية: صورة ضبابية Blurred لإحدى المشاريع + --bg-overlay
محتوى:
  "هل أنت جاهز لامتلاك منزل أحلامك؟"
  "فريقنا جاهز لمساعدتك في اتخاذ القرار الصحيح"
  [احجز استشارة مجانية]   WhatsApp: +966XXXXXXXXX
```

---

### 6.2 صفحة الوحدات `/properties`

```
Layout:
┌─────────────────────────────────────────────────────┐
│  HERO صغير: "جميع الوحدات" + Breadcrumb            │
├─────────────────┬───────────────────────────────────┤
│  SIDEBAR        │  GRID                             │
│  فلاتر متقدمة  │  Property Cards (12 per page)     │
│                 │                                   │
│  نوع العقار    │  [Sort: الأحدث / السعر / المساحة] │
│  المدينة       │                                   │
│  الحي          │  Pagination                       │
│  المساحة       │                                   │
│  الغرف         │                                   │
│  الحمامات      │                                   │
│  السعر         │                                   │
│  الحالة        │                                   │
│                 │                                   │
│  [تطبيق] [مسح] │                                   │
└─────────────────┴───────────────────────────────────┘
الفلاتر تعمل بـ URL Search Params لدعم الـ Share و Back button
```

---

### 6.3 صفحة تفاصيل الوحدة `/properties/[slug]`

```
الهيكل:
1. BREADCRUMB  (الرئيسية > الوحدات > اسم الوحدة)
2. GALLERY     (Masonry Grid 3 أعمدة + زر عرض الكل → Lightbox)
3. HEADER      (الاسم + السعر + Badge الحالة + الموقع)
4. SPECS BAR   (الغرف · الحمامات · المساحة · الطابق)
5. TABS:
   ├── الوصف والمميزات
   ├── المواصفات الكاملة (جدول مفصل)
   ├── خطة الطابق (Floor Plan) + زر التكبير
   ├── الموقع (Google Maps Embed)
   └── حاسبة التمويل (Mortgage Calculator)
6. STICKY CTA  (زر ثابت من الأسفل على الموبايل)
7. وحدات مشابهة (Related Properties)
```

**حاسبة التمويل:**

```
مدخلات:
├── سعر الوحدة (auto-filled من الصفحة)
├── الدفعة الأولى (Slider % أو رقم)
├── مدة القرض (5 - 30 سنة)
└── نسبة الفائدة (مبدئياً 3.5%)

مخرجات (تتحدث فورياً):
├── القسط الشهري  ← الرقم الأكبر والأهم
├── إجمالي الفائدة
├── إجمالي المبلغ المدفوع
└── [عرض جدول السداد] (Accordion)
```

---

### 6.4 صفحة مشاريعنا `/projects`

```
Hero: اسم القسم + وصف قصير
Grid: كروت المشاريع — أكبر وأفخم من كروت الوحدات
الكارت:
  - صورة كبيرة aspect 16:9
  - اسم المشروع + الموقع
  - عدد الوحدات المتاحة
  - حالة المشروع (تحت الإنشاء / مكتمل)
  - [استعرض المشروع →]
```

---

### 6.5 صفحة من نحن `/about`

```
Sections:
1. Hero: صورة الفريق + العنوان
2. قصتنا: نص + صورة (Alternating)
3. قيمنا: Grid 3×2 مع أيقونات
4. أرقامنا: Stats مع CountUp
5. شهادات الجودة (Certifications): Logos
6. فريق القيادة: Cards مع صور + المسمى
```

---

### 6.6 صفحة تواصل معنا `/contact`

```
Layout: 2 أعمدة
┌──────────────────┬──────────────────────┐
│  معلومات التواصل │  نموذج التواصل       │
│                  │                      │
│  📍 العنوان      │  الاسم               │
│  📞 الهاتف       │  رقم الجوال          │
│  📧 البريد       │  موضوع الاستفسار     │
│  💬 واتساب       │  الرسالة             │
│                  │  [إرسال] ← Server Action │
│  Google Maps     │                      │
│  (Embed)         │                      │
└──────────────────┴──────────────────────┘
```

---

### 6.7 صفحة الاستفسار `/inquiry` (Landing Page)

صفحة تحويل مخصصة — لا Navbar ولا Footer (كما هو سائد في Landing Pages):

```
1. الشعار فقط في الأعلى
2. العنوان: "احجز وحدتك الآن"
3. نموذج موسع:
   - الاسم الكامل
   - رقم الجوال
   - المدينة
   - نوع الوحدة المطلوبة
   - الميزانية التقريبية
   - وقت التواصل المفضل
   - ملاحظات إضافية
4. Trust Signals: أرقام الشركة + شهادات
5. Footer بسيط: حقوق الملكية فقط
```

---

## 7. مكتبة المكونات

### 7.1 شجرة المكونات

```
components/
├── ui/                          # Atomic Components
│   ├── Button.tsx               # variants: primary | outline | ghost
│   ├── Badge.tsx                # status: available | reserved | sold | soon
│   ├── Input.tsx                # text | select | range | textarea
│   ├── RangeSlider.tsx          # Dual handle slider
│   ├── Skeleton.tsx             # Loading state
│   ├── Modal.tsx                # Lightbox & Dialogs
│   ├── Tabs.tsx                 # Property detail tabs
│   └── Breadcrumb.tsx
│
├── property/                    # Property Domain
│   ├── PropertyCard.tsx
│   ├── PropertyGrid.tsx
│   ├── PropertySearch.tsx
│   ├── PropertyGallery.tsx      # Masonry + Lightbox
│   ├── PropertySpecs.tsx
│   ├── FloorPlan.tsx
│   ├── MortgageCalculator.tsx
│   └── RelatedProperties.tsx
│
├── project/                     # Project Domain
│   ├── ProjectCard.tsx
│   ├── ProjectHero.tsx
│   └── ProjectUnits.tsx
│
├── sections/                    # Page Sections
│   ├── HeroSection.tsx
│   ├── SearchBar.tsx
│   ├── StatsSection.tsx
│   ├── LatestListings.tsx
│   ├── FeaturedProjects.tsx
│   ├── WhyUs.tsx
│   ├── Testimonials.tsx
│   └── CTASection.tsx
│
├── layout/                      # Layout Components
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── PageHero.tsx             # Hero صغير للصفحات الداخلية
│   └── Preloader.tsx
│
└── motion/                      # Animation Wrappers
    ├── FadeIn.tsx
    ├── SlideIn.tsx
    ├── CountUp.tsx
    └── RevealText.tsx
```

### 7.2 Button Component Spec

```tsx
// variants
type ButtonVariant = 'primary' | 'outline' | 'ghost' | 'danger'
type ButtonSize = 'sm' | 'md' | 'lg' | 'xl'

// primary: ذهبي كامل + نص داكن + shimmer عند Hover
// outline: حد ذهبي + نص ذهبي + يملأ بالذهبي عند Hover
// ghost:   شفاف + نص أبيض + خلفية شفافة عند Hover
// danger:  أحمر — للإجراءات الحساسة فقط

// Shimmer Animation (CSS فقط):
// ::after pseudo-element يتحرك من اليسار لليمين
// overflow: hidden على الزر
// لا JavaScript
```

### 7.3 Navbar Behavior

```
Initial State (على الـ Hero):
  - خلفية: شفافة تماماً
  - النص: أبيض
  - Logo: النسخة البيضاء

Scrolled State (بعد 80px من الـ Hero):
  - خلفية: rgba(10,22,40,0.92) + backdrop-blur(24px)
  - حد سفلي: 1px solid rgba(201,169,110,0.20)
  - Transition: ناعمة 300ms ease

الـ Transition يعمل بـ CSS class toggle عبر scroll event listener
لا Framer Motion هنا (لا حاجة لثقل المكتبة على عنصر بسيط)
```

---

## 8. استراتيجية الحركة والتأثيرات

### 8.1 المبادئ الأساسية — قواعد صارمة

```
✅ مسموح                          ❌ محظور تماماً
───────────────────────────────────────────────────
حركة عند Scroll (Intersection)    جسيمات عائمة
CountUp للأرقام                   فقاعات أو كرات متحركة
Shimmer على الأزرار               أي عنصر يتحرك باستمرار
Reveal للنصوص (clip-path)        تأثيرات نيون أو Glow مبالغة
Parallax هادئ (10-15%)           موشن ثلاثي مبالغ فيه
Smooth Scroll                    ماوس cursor مخصص
Skeleton Loading                 اهتزازات أو Bounce
Marquee بطيء للشهادات            تدوير عناصر بشكل مستمر
Transition الـ Navbar             رسوم متحركة تشتت الانتباه
```

### 8.2 قائمة التأثيرات المعتمدة

#### ① Preloader (اختياري — يُقرر في مرحلة التنفيذ)
```
المدة: 1.5 ثانية
الإجراء:
  - شعار الشركة يظهر بـ fadeIn (600ms)
  - خط ذهبي أفقي يمتد تحت الشعار (400ms)
  - الكل يتلاشى بـ fadeOut (400ms)
  - الصفحة تظهر
المنطق: يظهر مرة واحدة لكل session (sessionStorage flag)
```

#### ② Hero Text Reveal
```
الإجراء:
  - العنوان الرئيسي: السطر الأول يدخل بـ translateY(20px) → 0 + fadeIn
  - العنوان الفرعي: مع delay 200ms
  - الأزرار: مع delay 400ms
المكتبة: Framer Motion
الإعداد: initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
```

#### ③ CountUp للإحصائيات
```
الإجراء:
  - Intersection Observer يرصد دخول القسم
  - عند الدخول: الأرقام تصعد من 0 → القيمة الكاملة
  - المدة: 2.5 ثانية مع ease-out
المكتبة: react-countup مع enableScrollSpy
لا Framer Motion هنا — react-countup كافية
```

#### ④ Section Reveal (عام)
```
التطبيق: على كل section title و Feature Card
الإجراء: opacity 0→1 + translateY(16px→0)
الـ Stagger: 0.1s بين العناصر المتعددة
Threshold: 0.15 (يبدأ حين 15% من العنصر مرئي)
المكتبة: Framer Motion مع whileInView
```

#### ⑤ Property Card Hover
```
الإجراء:
  - translateY: 0 → -4px
  - box-shadow: --shadow-card → --shadow-card-hover
  - border-color: شفاف → --border-gold-md
  - الصورة: scale(1) → scale(1.04) مع overflow hidden
المدة: 300ms ease-out
المكتبة: Tailwind transition + CSS
لا Framer Motion — CSS كافية
```

#### ⑥ Button Shimmer
```
الإجراء:
  - ::after pseudo element يتحرك من right-100% → left-100%
  - لون: rgba(255,255,255,0.18) في خلفية شفافة
  - يحدث مرة عند كل hover
المكتبة: CSS animation فقط
@keyframes shimmer { from { transform: translateX(-100%) } to { transform: translateX(200%) } }
```

#### ⑦ Testimonials Marquee
```
الإجراء: شريط الكروت يتحرك من اليمين لليسار بشكل لا نهائي
المدة: 40 ثانية (بطيء وهادئ)
Pause on Hover: نعم — animation-play-state: paused
المكتبة: CSS animation فقط
```

#### ⑧ Smooth Scroll (Lenis)
```
المكتبة: Lenis
الإعداد: friction: 0.10, lerp: 0.10
التأثير: التمرير يبدو أثقل وأكثر فخامة
لا يؤثر على أداء الـ scroll events
```

#### ⑨ Image Gallery Lightbox
```
عند الضغط على صورة:
  - Overlay يظهر بـ fadeIn (200ms)
  - الصورة تدخل بـ scale(0.95) → scale(1) + fadeIn
  - تنقل بين الصور بـ slide
المكتبة: yet-another-react-lightbox
```

#### ⑩ Page Transitions (اختياري)
```
الإجراء: عند التنقل بين الصفحات
  - الصفحة الحالية: fadeOut (200ms)
  - الصفحة الجديدة: fadeIn (300ms)
المكتبة: Framer Motion AnimatePresence
يُفعّل فقط إذا لم يؤثر على Core Web Vitals
```

### 8.3 prefers-reduced-motion

```css
/* في globals.css — إلزامي */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

```tsx
// في الـ Hook
const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)')
const motionConfig = prefersReducedMotion
  ? { initial: false, animate: false }
  : { initial: { y: 20, opacity: 0 }, animate: { y: 0, opacity: 1 } }
```

---

## 9. البنية التقنية

### 9.1 Stack التقني الكامل

| الطبقة | التقنية | الإصدار | الاستخدام |
|--------|---------|---------|----------|
| **Framework** | Next.js | 14+ App Router | هيكل المشروع، SSR/SSG/ISR |
| **Language** | TypeScript | 5+ | Type Safety |
| **Styling** | Tailwind CSS | v4 | Utility Classes + Design Tokens |
| **Animation** | Framer Motion | v11 | Page & Scroll Animations |
| **Smooth Scroll** | Lenis | v1 | Smooth scroll فاخر |
| **State** | Zustand | v5 | Global state (search filters) |
| **Data Fetching** | TanStack Query | v5 | Server state + caching |
| **Forms** | React Hook Form | v7 | Form management |
| **Validation** | Zod | v3 | Schema validation |
| **Carousel** | Swiper | v11 | Property sliders |
| **Lightbox** | YALB | v3 | Image gallery |
| **Maps** | Google Maps JS | Latest | Property locations |
| **Images** | Cloudinary + next/image | — | Optimization |
| **CMS** | Sanity.io | v3 | Content management |
| **Database** | Supabase (PostgreSQL) | — | Properties data |
| **Deployment** | Vercel | — | Hosting + CI/CD |
| **Analytics** | Vercel Analytics + GA4 | — | Traffic analysis |

### 9.2 هيكل مجلدات المشروع

```
src/
│
├── app/                              # Next.js App Router
│   ├── layout.tsx                    # Root Layout (RTL + fonts + providers)
│   ├── page.tsx                      # الرئيسية
│   ├── loading.tsx                   # Global loading
│   ├── not-found.tsx                 # 404
│   │
│   ├── (main)/                       # Route Group للصفحات الرئيسية
│   │   ├── properties/
│   │   │   ├── page.tsx
│   │   │   ├── loading.tsx           # Skeleton للقائمة
│   │   │   └── [slug]/
│   │   │       ├── page.tsx
│   │   │       └── loading.tsx
│   │   │
│   │   ├── projects/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/
│   │   │       ├── page.tsx
│   │   │       └── units/page.tsx
│   │   │
│   │   ├── about/page.tsx
│   │   ├── services/page.tsx
│   │   ├── blog/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/page.tsx
│   │   └── contact/page.tsx
│   │
│   ├── (landing)/                    # Route Group بدون Navbar
│   │   └── inquiry/page.tsx
│   │
│   └── api/                          # Route Handlers
│       ├── properties/route.ts
│       ├── projects/route.ts
│       ├── contact/route.ts
│       └── mortgage/route.ts
│
├── components/                       # (راجع Section 7.1)
│
├── lib/
│   ├── sanity.ts                     # Sanity client + queries
│   ├── supabase.ts                   # Supabase client
│   ├── utils.ts                      # formatPrice, formatArea, etc.
│   ├── constants.ts                  # CITIES, PROPERTY_TYPES, etc.
│   └── validations.ts                # Zod schemas
│
├── hooks/
│   ├── useScrollProgress.ts
│   ├── useIntersection.ts
│   ├── useMediaQuery.ts
│   └── useMortgageCalc.ts
│
├── store/
│   └── useSearchStore.ts             # Zustand — فلاتر البحث
│
├── types/
│   └── index.ts                      # TypeScript interfaces
│
└── styles/
    └── globals.css                   # CSS Variables + Tailwind directives
```

### 9.3 Root Layout (RTL + Fonts)

```tsx
// app/layout.tsx
import type { Metadata } from 'next'
import { Cairo, Tajawal } from 'next/font/google'
import { Providers } from './providers'
import './globals.css'

const cairo = Cairo({
  subsets: ['arabic', 'latin'],
  variable: '--font-cairo',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
})

const tajawal = Tajawal({
  subsets: ['arabic'],
  variable: '--font-tajawal',
  display: 'swap',
  weight: ['400', '500', '700'],
})

export const metadata: Metadata = {
  title: { default: 'اسم الشركة | عقارات فاخرة', template: '%s | اسم الشركة' },
  description: 'حرفية تشييد وتميّز عقاري — نربط العملاء بأفضل الفرص السكنية',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body className={`${cairo.variable} ${tajawal.variable} font-cairo`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
```

### 9.4 Tailwind Config (CSS Variables Integration)

```ts
// tailwind.config.ts
import type { Config } from 'tailwindcss'

export default {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        /* يقرأ من CSS Variables — يدعم Dark Mode مستقبلاً */
        'bg-midnight'  : 'var(--bg-midnight)',
        'bg-deep'      : 'var(--bg-deep)',
        'bg-navy'      : 'var(--bg-navy)',
        'bg-royal'     : 'var(--bg-royal)',
        'brand-primary': 'var(--brand-primary)',
        'brand-royal'  : 'var(--brand-royal)',
        'gold'         : 'var(--gold-primary)',
        'gold-light'   : 'var(--gold-light)',
        'text-gold'    : 'var(--text-gold)',
        'status-available': 'var(--status-available)',
        'status-reserved' : 'var(--status-reserved)',
        'status-sold'     : 'var(--status-sold)',
      },
      fontFamily: {
        cairo   : ['var(--font-cairo)', 'sans-serif'],
        tajawal : ['var(--font-tajawal)', 'sans-serif'],
      },
      transitionTimingFunction: {
        'luxury': 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
} satisfies Config
```

---

## 10. نموذج البيانات

### 10.1 Property (الوحدة العقارية)

```typescript
interface Property {
  id          : string
  slug        : string
  title       : string
  type        : 'apartment' | 'villa' | 'annex' | 'land' | 'penthouse' | 'duplex'
  status      : 'available' | 'reserved' | 'sold' | 'coming_soon'
  project     : { id: string; name: string; slug: string }
  location    : {
    city       : string
    district   : string
    coordinates: { lat: number; lng: number }
    address    : string
  }
  specs       : {
    area        : number    // م²
    bedrooms    : number
    bathrooms   : number
    livingRooms?: number
    kitchen     : boolean
    parking    ?: number
    floor      ?: number
    totalFloors?: number
    view       ?: string
    direction  ?: 'north' | 'south' | 'east' | 'west' | 'corner'
  }
  pricing     : {
    price          : number
    pricePerMeter  : number
    currency       : 'SAR'
    isNegotiable   : boolean
    downPayment   ?: number     // % دفعة أولى مقترحة
    monthlyInstall?: number     // قسط شهري مقترح
    paymentPlans  ?: PaymentPlan[]
  }
  media       : {
    images      : string[]     // Cloudinary URLs
    thumbnail   : string
    videos     ?: string[]
    floorPlan  ?: string
    virtualTour?: string
  }
  features    : string[]         // مميزات نصية
  description : string           // Rich text من الـ CMS
  amenities  ?: string[]         // مرافق: مسبح، صالة، إلخ
  publishedAt : string
  updatedAt   : string
  featured    : boolean
  seoTitle   ?: string
  seoDesc    ?: string
}

interface PaymentPlan {
  id        : string
  name      : string           // مثال: "خطة 5 سنوات"
  downPct   : number           // % الدفعة الأولى
  years     : number
  rate      : number           // % الفائدة السنوية
  monthly   : number           // القسط الشهري المحسوب
}
```

### 10.2 Project (المشروع)

```typescript
interface Project {
  id          : string
  slug        : string
  name        : string
  tagline    ?: string
  status      : 'under_construction' | 'completed' | 'upcoming'
  location    : {
    city        : string
    district    : string
    address     : string
    coordinates : { lat: number; lng: number }
  }
  description : string
  features    : string[]
  amenities   : string[]
  specs       : {
    totalUnits    : number
    availableUnits: number
    floors        : number
    startDate    ?: string
    completionDate: string
    landArea     ?: number
    builtArea    ?: number
  }
  media       : {
    hero         : string
    gallery      : string[]
    masterPlan  ?: string
    video       ?: string
  }
  priceRange  : { min: number; max: number; currency: 'SAR' }
  unitTypes   : Array<'apartment' | 'villa' | 'annex' | 'penthouse'>
  publishedAt : string
  featured    : boolean
}
```

### 10.3 Contact Submission

```typescript
interface ContactSubmission {
  id        : string
  name      : string
  phone     : string           // E.164 format
  email    ?: string
  subject   : string
  message   : string
  source    : 'contact' | 'inquiry' | 'property' | 'whatsapp'
  propertyId?: string          // إن كان من صفحة وحدة
  createdAt : string
  status    : 'new' | 'contacted' | 'closed'
}
```

---

## 11. الأداء والـ SEO

### 11.1 أهداف Core Web Vitals

| المقياس | الهدف | الأداة |
|---------|-------|--------|
| **LCP** (Largest Contentful Paint) | < 2.5s | next/image Priority |
| **FID** (First Input Delay) | < 100ms | Code Splitting |
| **CLS** (Cumulative Layout Shift) | < 0.1 | Fixed dimensions |
| **FCP** (First Contentful Paint) | < 1.2s | SSG + CDN |
| **TTI** (Time to Interactive) | < 3.5s | Dynamic imports |
| **Lighthouse Overall** | > 90 | Vercel CI |

### 11.2 استراتيجية تحسين الصور

```tsx
// كل صورة عقارية — مثال على الاستخدام الصحيح
<Image
  src={property.media.thumbnail}
  alt={`${property.title} — ${property.location.city}`}
  width={800}
  height={600}
  quality={85}
  placeholder="blur"
  blurDataURL={property.media.blurHash}  // Cloudinary blurhash
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  className="object-cover w-full h-full"
  // Priority فقط للصور فوق الـ fold
  priority={featured}
/>

// صور الـ Hero دائماً priority
<Image priority={true} ... />
```

### 11.3 Code Splitting (Dynamic Imports)

```tsx
// مكونات ثقيلة — لا تُحمَّل إلا عند الحاجة
const Lightbox      = dynamic(() => import('@/components/property/PropertyGallery'), { ssr: false })
const MapEmbed      = dynamic(() => import('@/components/ui/MapEmbed'), { ssr: false })
const MortgageCalc  = dynamic(() => import('@/components/property/MortgageCalculator'), { ssr: false })
const Lenis         = dynamic(() => import('@/components/layout/LenisProvider'), { ssr: false })

// Framer Motion — تُحمَّل lazily
const { motion } = await import('framer-motion')
```

### 11.4 SEO — Metadata وهيكل البيانات

```tsx
// app/properties/[slug]/page.tsx
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const property = await getProperty(params.slug)

  return {
    title       : `${property.title} | ${property.location.city}`,
    description : `${property.type} ${property.specs.area}م² — ${property.specs.bedrooms} غرف — ${formatPrice(property.pricing.price)} ر.س`,
    openGraph   : {
      title    : property.title,
      description: property.description.substring(0, 160),
      images   : [{ url: property.media.thumbnail, width: 1200, height: 630 }],
      type     : 'website',
      locale   : 'ar_SA',
    },
    alternates  : { canonical: `https://domain.sa/properties/${params.slug}` },
  }
}
```

```tsx
// Schema.org — Structured Data
const propertySchema = {
  "@context"      : "https://schema.org",
  "@type"         : "RealEstateListing",
  "name"          : property.title,
  "description"   : property.description,
  "url"           : `https://domain.sa/properties/${property.slug}`,
  "image"         : property.media.images[0],
  "offers"        : {
    "@type"        : "Offer",
    "price"        : property.pricing.price,
    "priceCurrency": "SAR",
    "availability" : property.status === 'available'
                     ? "https://schema.org/InStock"
                     : "https://schema.org/SoldOut",
  },
  "address"       : {
    "@type"          : "PostalAddress",
    "addressLocality": property.location.district,
    "addressRegion"  : property.location.city,
    "addressCountry" : "SA",
  },
}
```

---

## 12. إمكانية الوصول والتدويل

### 12.1 Accessibility (a11y) — المتطلبات

| المعيار | التطبيق |
|---------|---------|
| **Semantic HTML** | استخدام `<main>`, `<nav>`, `<section>`, `<article>` بشكل صحيح |
| **ARIA Labels** | على كل عنصر تفاعلي بدون نص ظاهر |
| **Focus Management** | Trap Focus في الـ Modals، Restore Focus عند الإغلاق |
| **Keyboard Navigation** | Tab, Enter, Escape تعمل على كل شيء |
| **Color Contrast** | WCAG AA — نسبة 4.5:1 على الأقل |
| **Alt Text** | وصفي وذو معنى على كل صورة |
| **Skip Link** | "انتقل للمحتوى" — أول عنصر في الـ Navbar |
| **Reduced Motion** | إيقاف كل Animations عند تفضيل المستخدم |
| **Screen Reader** | اختبار بـ NVDA (Windows) وـ VoiceOver (Mac) |

### 12.2 RTL — الاتجاه العربي

```css
/* globals.css */
:root { direction: rtl; }

/* Tailwind — استخدام المنطقي بدل المكاني */
/* ✅ ms-4 (margin-start)    بدل ml-4 (margin-left) */
/* ✅ pe-6 (padding-end)     بدل pr-6 (padding-right) */
/* ✅ border-s               بدل border-l */
/* ✅ start-0                بدل left-0 */
```

### 12.3 تنسيق البيانات العربية

```typescript
// utils/format.ts

// تنسيق السعر بالريال السعودي
export const formatPrice = (price: number): string =>
  new Intl.NumberFormat('ar-SA', {
    style    : 'currency',
    currency : 'SAR',
    maximumFractionDigits: 0,
  }).format(price)
// النتيجة: ٧٣٠,٠٠٠ ر.س

// تنسيق المساحة
export const formatArea = (area: number): string =>
  `${new Intl.NumberFormat('ar-SA').format(area)} م²`

// تنسيق التاريخ
export const formatDate = (date: string): string =>
  new Intl.DateTimeFormat('ar-SA-u-ca-islamic', {
    year: 'numeric', month: 'long', day: 'numeric'
  }).format(new Date(date))
```

---

## 13. مراحل التطوير والجداول الزمنية

### 13.1 خطة التطوير (10 أسابيع)

---

#### 🔵 المرحلة 1 — الأساس والبنية التحتية (الأسبوع 1-2)

```
الأسبوع 1:
  ✦ إعداد مشروع Next.js 14 + TypeScript + Tailwind v4
  ✦ CSS Variables — نظام الألوان الكامل في globals.css
  ✦ إعداد الخطوط العربية (Cairo, Tajawal) مع RTL
  ✦ Lenis Smooth Scroll Provider
  ✦ إعداد Sanity CMS + schemas الأولية
  ✦ إعداد Supabase + جداول قاعدة البيانات

الأسبوع 2:
  ✦ Navbar Component (Transparent → Solid on Scroll)
  ✦ Footer Component
  ✦ Preloader (اختياري)
  ✦ مكونات UI الأساسية: Button، Badge، Input، Skeleton
  ✦ Motion Wrapper Components (FadeIn, SlideIn, RevealText)
  ✦ TypeScript Interfaces الكاملة
```

---

#### 🔵 المرحلة 2 — الصفحة الرئيسية (الأسبوع 3-4)

```
الأسبوع 3:
  ✦ Hero Section (صورة + Overlay + نص + أزرار)
  ✦ Hero Scroll Indicator (خط ذهبي نابض)
  ✦ Search Bar Component (Glass Morphism)
  ✦ جميع فلاتر البحث مع URL Params
  ✦ Stats Section مع CountUp

الأسبوع 4:
  ✦ Property Card Component
  ✦ Latest Listings Section
  ✦ Featured Projects Section (Alternating Layout)
  ✦ Why Us Section (Grid + Icons)
  ✦ Testimonials Marquee
  ✦ CTA Section الختامي
```

---

#### 🔵 المرحلة 3 — صفحات العقارات (الأسبوع 5-6)

```
الأسبوع 5:
  ✦ Properties Listing Page (Grid + Sidebar Filters)
  ✦ Filter Sidebar مع URL Params
  ✦ Sorting (الأحدث، السعر، المساحة)
  ✦ Pagination (Server-side)
  ✦ Skeleton Loading للكروت

الأسبوع 6:
  ✦ Property Detail Page
  ✦ Image Gallery (Masonry + Lightbox)
  ✦ Property Specs Bar
  ✦ Tabs (الوصف، المواصفات، خطة الطابق، الموقع، التمويل)
  ✦ Mortgage Calculator
  ✦ Google Maps Embed
  ✦ Related Properties
  ✦ Sticky CTA (Moبايل)
```

---

#### 🔵 المرحلة 4 — صفحات المشاريع وباقي الصفحات (الأسبوع 7-8)

```
الأسبوع 7:
  ✦ Projects Listing Page
  ✦ Project Detail Page
  ✦ Project Units Section
  ✦ About Page (كاملة)
  ✦ Services Page

الأسبوع 8:
  ✦ Blog Listing + Post Detail
  ✦ Contact Page + Server Action
  ✦ Inquiry Landing Page
  ✦ 404 Page
  ✦ Loading states كاملة
  ✦ Error Boundaries
```

---

#### 🔵 المرحلة 5 — الأداء، SEO، والإطلاق (الأسبوع 9-10)

```
الأسبوع 9:
  ✦ SEO: generateMetadata لكل صفحة
  ✦ Schema.org Structured Data
  ✦ Sitemap.xml التلقائي (next-sitemap)
  ✦ robots.txt
  ✦ Open Graph Images
  ✦ Lighthouse Audit — اصلاح المشاكل
  ✦ Accessibility Audit — WCAG AA

الأسبوع 10:
  ✦ Cross-browser Testing (Chrome, Safari, Firefox, Edge)
  ✦ Mobile Testing (iOS Safari, Android Chrome)
  ✦ Performance Optimization (bundle analysis)
  ✦ Vercel Deployment + Environment Variables
  ✦ Domain Setup + SSL
  ✦ Google Analytics 4 + Vercel Analytics
  ✦ توثيق نهائي + تسليم
```

---

### 13.2 ملاحظات على الجداول الزمنية

> الجدول يفترض مطوراً متفرغاً بخبرة جيدة في Next.js.  
> إذا كان الفريق يضم مطورين اثنين — يمكن الانتهاء في 6-7 أسابيع.  
> التواصل المستمر مع صاحب المشروع ضروري لاعتماد المحتوى والصور.

---

## 14. التكاليف التشغيلية

### 14.1 الخدمات المطلوبة شهرياً

| الخدمة | الخطة | التكلفة (USD/شهر) |
|--------|-------|-------------------|
| Vercel | Pro | $20 |
| Sanity CMS | Growth | $15 |
| Supabase | Pro | $25 |
| Cloudinary | Plus | $89 |
| Google Maps API | Pay-as-you-go | ~$10-30 |
| Google Analytics | مجاناً | $0 |
| **الإجمالي** | | **~$159-179** |

### 14.2 تكاليف سنوية إضافية

| البند | التكلفة التقريبية |
|-------|-----------------|
| اسم النطاق (.sa) | 300 ر.س / سنة |
| شهادة SSL | مجاناً (Vercel) |
| النسخ الاحتياطية | مُدمج في Supabase Pro |

### 14.3 تكاليف التطوير (مرة واحدة)

> التقدير يعتمد على حجم المشروع والجدول الزمني المتفق عليه.  
> يُوصى بتخصيص ميزانية للصيانة الدورية (10-15% من تكلفة التطوير سنوياً).

---

## ملاحظات ختامية للمطور

```
① RTL أولاً دائماً — لا افتراض أي اتجاه في CSS أو JS
② CSS Variables لكل قيمة — لا hardcoded colors في الكود
③ next/image حصرياً — لا <img> عادي في أي مكان
④ prefers-reduced-motion — إلزامي وليس اختيارياً
⑤ Server Components بشكل افتراضي — 'use client' فقط حين الضرورة
⑥ Framer Motion lazy-loaded — dynamic import
⑦ Lenis يُشغَّل Client-side فقط (ssr: false)
⑧ كل نموذج يستخدم Server Action — لا fetch مباشر
⑨ Error Boundaries لكل Section منفصلة
⑩ اختبار Mobile أولاً — قبل Desktop
```

---

```
وثيقة متطلبات المنتج (PRD) — الإصدار 2.0
تاريخ آخر تحديث: يونيو 2026
```