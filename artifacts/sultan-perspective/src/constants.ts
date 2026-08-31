export type Locale = 'en' | 'ar';

export type LocalizedText = {
  en: string;
  ar: string;
};

export type PackageCategory = 'residential' | 'land-commercial' | 'standalone';

export type PackageOffer = {
  id: string;
  category: PackageCategory;
  name: LocalizedText;
  eyebrow: LocalizedText;
  price: number;
  measurement: LocalizedText;
  description: LocalizedText;
  features: LocalizedText[];
  tone: 'dark' | 'gold' | 'light';
};

export type AddOn = {
  id: string;
  name: LocalizedText;
  price: number;
  note: LocalizedText;
};

export const brand = {
  name: 'Sultan Perspective',
  shortName: 'SP',
  phone: '+961 70 942 188',
  whatsapp: '+96170942188',
  instagram: '@sultanperspective',
  location: { en: 'Lebanon · On location', ar: 'لبنان · في موقعك' } satisfies LocalizedText,
  headline: {
    en: 'Elevate Your Listings with Next-Gen Spatial Media',
    ar: 'ارفع قيمة عقاراتك بإعلام مكاني من الجيل الجديد',
  } satisfies LocalizedText,
  support: {
    en: 'Give buyers a reason to lean in. From immersive 360° virtual tours and ultra-wide interior photography to high-altitude drone shots, we turn space into proof of value.',
    ar: 'امنح المشترين سبباً للتوقف. من الجولات الافتراضية الغامرة بزاوية 360° والتصوير الداخلي فائق الاتساع، إلى لقطات الدرون من الارتفاعات العالية، نحوّل المساحة إلى دليل على القيمة.',
  } satisfies LocalizedText,
};

export const promotions = {
  bundle: { percent: 30, minimumProperties: 2 },
  loyalty: { bookedProperties: 5, freeProperty: 6 },
} as const;

export const copy = {
  nav: {
    services: { en: 'Services', ar: 'الخدمات' },
    pricing: { en: 'Pricing', ar: 'الأسعار' },
    approach: { en: 'Approach', ar: 'منهجيتنا' },
    booking: { en: 'Book a shoot', ar: 'احجز جلسة تصوير' },
  },
  menu: {
    open: { en: 'Open menu', ar: 'فتح القائمة' },
    close: { en: 'Close menu', ar: 'إغلاق القائمة' },
  },
  language: {
    switchToArabic: 'العربية / EN',
    switchToEnglish: 'EN / العربية',
    label: { en: 'Switch to Arabic', ar: 'التبديل إلى الإنجليزية' },
  },
  hero: {
    eyebrow: { en: 'Spatial media / Beirut & beyond', ar: 'إعلام مكاني / بيروت وما بعد' },
    subheadline: {
      en: 'Photography, drone, 360° tours and floor plans that help properties stand out.',
      ar: 'تصوير فوتوغرافي ودرون وجولات 360° ومخططات تساعد عقارك على التميز.',
    },
    viewPricing: { en: 'View pricing', ar: 'عرض الأسعار' },
    playReel: { en: 'Play studio reel', ar: 'تشغيل عرض الاستوديو' },
    scroll: { en: 'Scroll to explore', ar: 'مرّر للاستكشاف' },
  },
  promotions: {
    eyebrow: { en: 'Special offer / Book more, save more', ar: 'عرض خاص / احجز أكثر، ووفر أكثر' },
    bundle: { en: '30% discount for every 2 properties booked together', ar: 'خصم 30٪ لكل عقارين يتم حجزهما معاً' },
    loyalty: { en: 'Book 5 properties and get the 6th property shoot completely FREE', ar: 'احجز 5 عقارات واحصل على تصوير العقار السادس مجاناً بالكامل' },
    note: { en: 'The best available offer is applied automatically in your estimate.', ar: 'يتم تطبيق العرض الأفضل تلقائياً في تقديرك.' },
  },
  services: {
    eyebrow: { en: 'What we capture', ar: 'ما نوثّقه' },
    titleLead: { en: 'Space, seen with', ar: 'مساحتك، تُرى' },
    titleAccent: { en: 'intent.', ar: 'بنية.' },
    description: {
      en: 'A listing is more than its rooms. It is the light, the approach, the view, and the feeling of arriving home. We make each one impossible to miss.',
      ar: 'العقار أكثر من مجرد غرف. إنه الضوء، والمدخل، والإطلالة، وشعور الوصول إلى المنزل. نحن نجعل كل تفصيل يستحق أن يُرى.',
    },
    link: { en: 'Our approach', ar: 'منهجيتنا' },
  },
  approach: {
    eyebrow: { en: 'The Sultan perspective', ar: 'منظور سلطان' },
    titleLead: { en: 'Precision at every', ar: 'دقة في كل' },
    titleAccent: { en: 'altitude.', ar: 'ارتفاع.' },
    description: {
      en: 'We pair a pilot’s eye for line and light with a buyer’s need for clarity. The result is not just beautiful media. It is a more confident next step.',
      ar: 'نمزج عين الطيار للخط والضوء مع حاجة المشتري إلى الوضوح. النتيجة ليست صوراً جميلة فحسب، بل خطوة تالية أكثر ثقة.',
    },
    steps: [
      {
        number: '01',
        title: { en: 'Brief the address', ar: 'نفهم العنوان' },
        text: { en: 'We learn what makes the property valuable before we ever unpack a case.', ar: 'نتعرّف إلى ما يمنح العقار قيمته قبل أن نبدأ العمل.' },
      },
      {
        number: '02',
        title: { en: 'Capture the proof', ar: 'نوثّق الدليل' },
        text: { en: 'Our team composes every frame, orbit, and plan for how buyers actually decide.', ar: 'نصمم كل لقطة وجولة ومخطط وفق الطريقة التي يتخذ بها المشترون قراراتهم.' },
      },
      {
        number: '03',
        title: { en: 'Deliver the advantage', ar: 'نمنحك الأفضلية' },
        text: { en: 'A clean, ready-to-publish media kit arrives fast, organized, and made to perform.', ar: 'تصلك حزمة إعلامية منظمة وجاهزة للنشر بسرعة، ومصممة لتحقيق النتائج.' },
      },
    ],
  },
  pricing: {
    eyebrow: { en: '2026 price list', ar: 'قائمة أسعار 2026' },
    titleLead: { en: 'Choose your', ar: 'اختر' },
    titleAccent: { en: 'coverage.', ar: 'تغطيتك.' },
    description: { en: 'Clear property limits, transparent extras, and a finish worthy of the listing.', ar: 'حدود مساحة واضحة، إضافات شفافة، ونتيجة تليق بعقارك.' },
    residential: { en: 'Residential packages', ar: 'الباقات السكنية' },
    residentialNote: { en: 'For apartments, villas, and homes up to 150m².', ar: 'للشقق والفلل والمنازل حتى 150 متر مربع.' },
    commercialLand: { en: 'Commercial & land packages', ar: 'باقات الأراضي والمنشآت التجارية' },
    commercialLandNote: { en: 'Purpose-built coverage for sites and facilities with larger footprints.', ar: 'تغطية مصممة للأراضي والمنشآت ذات المساحات الأكبر.' },
    mostRequested: { en: 'Popular', ar: 'الأكثر طلباً' },
    select: { en: 'Select', ar: 'اختيار' },
    priceDisclaimer: {
      en: 'Final price is confirmed after address and distance review.',
      ar: 'يتم تأكيد السعر النهائي بعد مراجعة العنوان والمسافة.',
    },
    standalone: { en: 'Standalone service request', ar: 'طلب خدمة منفردة' },
    standaloneNote: { en: 'A la carte · choose one service', ar: 'حسب الطلب · اختر خدمة واحدة' },
    currencyLabel: { en: 'Display currency', ar: 'العملة المعروضة' },
    localCurrency: { en: 'Lebanese pound', ar: 'الليرة اللبنانية' },
    quickOptions: { en: 'Quick options', ar: 'خيارات سريعة' },
    estimate: { en: 'Estimated total', ar: 'الإجمالي التقديري' },
  },
  estimator: {
    eyebrow: { en: 'Build your brief', ar: 'صمّم طلبك' },
    titleLead: { en: 'Add the', ar: 'أضف' },
    titleAccent: { en: 'finishing moves.', ar: 'اللمسات الأخيرة.' },
    description: { en: 'Start from {package}, add more properties or services, and see the best offer applied live.', ar: 'ابدأ من {package}، أضف عقارات أو خدمات، وشاهد العرض الأفضل يُطبّق فوراً.' },
    estimateLabel: { en: 'Your estimate', ar: 'تقديرك' },
    propertyCount: { en: 'Number of properties', ar: 'عدد العقارات' },
    propertyHelp: { en: 'All selected services are priced per property.', ar: 'تُحتسب جميع الخدمات المختارة لكل عقار.' },
    propertyMinus: { en: 'Remove one property', ar: 'إزالة عقار واحد' },
    propertyPlus: { en: 'Add one property', ar: 'إضافة عقار واحد' },
    base: { en: 'Package + selected services', ar: 'الباقة + الخدمات المختارة' },
    standaloneBase: { en: 'Standalone service', ar: 'الخدمة المنفردة' },
    addOnsTitle: { en: 'Add-on services / select with or without a package', ar: 'خدمات إضافية / اخترها مع الباقة أو بدونها' },
    standalonePrompt: { en: 'Select one service for an a-la-carte request.', ar: 'اختر خدمة واحدة لطلب منفرد حسب الطلب.' },
    bundleSavings: { en: 'Bundle offer · 30% off every pair', ar: 'عرض الحجز المزدوج · خصم 30٪ لكل عقارين' },
    loyaltySavings: { en: 'Loyalty offer · 6th property free', ar: 'عرض الوفاء · العقار السادس مجاناً' },
    savings: { en: 'Savings applied', ar: 'التوفير المطبق' },
    noSavings: { en: 'Add a second property to unlock an offer.', ar: 'أضف عقاراً ثانياً للاستفادة من العرض.' },
    notStacked: { en: 'Offers do not stack; the best value is applied.', ar: 'لا يمكن جمع العروض؛ يتم تطبيق القيمة الأفضل.' },
    confirmation: { en: 'Final quote confirmed after address review.', ar: 'يتم تأكيد السعر النهائي بعد مراجعة العنوان.' },
    continue: { en: 'Continue to booking', ar: 'متابعة إلى الحجز' },
  },
  reference: {
    eyebrow: { en: 'The source of truth', ar: 'المصدر الأساسي' },
    language: { en: 'EN', ar: 'AR' },
    titleLead: { en: 'Built from a real-world price list. Refined for', ar: 'مبني على قائمة أسعار واقعية. ومصمم من أجل' },
    titleAccent: { en: 'real decisions.', ar: 'قرارات حقيقية.' },
    description: { en: 'The same essentials from our field pricing, presented with room to compare, customize, and book.', ar: 'نفس الأساسيات من أسعارنا الميدانية، مقدمة بطريقة تتيح لك المقارنة والتخصيص والحجز.' },
    alt: { en: 'Sultan Perspective 2026 English price list reference', ar: 'مرجع قائمة أسعار سلطان برسبكتيف 2026 بالعربية' },
    proof: [
      { label: { en: 'Aerial', ar: 'جوي' }, title: { en: 'The address in context', ar: 'العقار ضمن محيطه' }, icon: 'plane' },
      { label: { en: 'Interior', ar: 'داخلي' }, title: { en: 'Light, line, and feeling', ar: 'ضوء وخط وشعور' }, icon: 'camera' },
      { label: { en: '360 tour', ar: 'جولة 360' }, title: { en: 'A buyer can linger', ar: 'المشتري يتجوّل' }, icon: 'orbit' },
      { label: { en: 'Mapping', ar: 'خرائط' }, title: { en: 'Clarity beyond the frame', ar: 'وضوح يتجاوز الصورة' }, icon: 'grid' },
    ],
  },
  booking: {
    eyebrow: { en: 'Start a conversation', ar: 'ابدأ محادثة' },
    titleLead: { en: 'Make the next listing the', ar: 'اجعل عقارك القادم' },
    titleAccent: { en: 'one they remember.', ar: 'هو الذي لا يُنسى.' },
    description: { en: 'Tell us where to land. We will reply with availability, a tailored quote, and the clearest route to showing the property at its best.', ar: 'أخبرنا أين نهبط. سنردّ عليك بالتوافر وسعر مخصص وأوضح طريقة لإظهار العقار بأفضل صورة.' },
    projectDetails: { en: 'Project details', ar: 'تفاصيل المشروع' },
    step: { en: '01 / 01', ar: '01 / 01' },
    fields: {
      name: { en: 'Your name', ar: 'الاسم الكامل' },
      email: { en: 'Email address', ar: 'البريد الإلكتروني' },
      phone: { en: 'Phone number', ar: 'رقم الهاتف' },
      date: { en: 'Preferred date', ar: 'التاريخ المفضل' },
      address: { en: 'Property address', ar: 'عنوان العقار' },
      squareFootage: { en: 'Approx. square footage', ar: 'المساحة التقريبية' },
      propertyCount: { en: 'Number of properties', ar: 'عدد العقارات' },
      package: { en: 'Package', ar: 'الباقة' },
    },
    placeholders: {
      name: { en: 'Full name', ar: 'الاسم الكامل' },
      email: { en: 'you@studio.com', ar: 'you@studio.com' },
      phone: { en: '+961 ...', ar: '+961 ...' },
      address: { en: 'Street, city, country', ar: 'الشارع، المدينة، البلد' },
      squareFootage: { en: 'e.g. 2400', ar: 'مثال: 2400' },
      propertyCount: { en: 'e.g. 2', ar: 'مثال: 2' },
    },
    disclaimer: { en: 'By sending this request, you are asking for availability, not confirming a booking.', ar: 'بإرسال هذا الطلب، أنت تستفسر عن التوافر ولا تؤكد الحجز.' },
    submit: { en: 'Request availability', ar: 'اطلب التوافر' },
    received: { en: 'Request received', ar: 'تم استلام الطلب' },
    receivedTitle: { en: 'We have your coordinates.', ar: 'وصلتنا تفاصيلك.' },
    receivedText: { en: 'Thank you, {name}. Sultan Perspective will be in touch shortly to confirm your shoot details.', ar: 'شكراً لك، {name}. سيتواصل معك سلطان برسبكتيف قريباً لتأكيد تفاصيل الجلسة.' },
    another: { en: 'Submit another request', ar: 'إرسال طلب آخر' },
  },
  footer: {
    description: { en: 'Precision, altitude, and cinematic proof of value for properties that deserve a second look.', ar: 'دقة وارتفاع ودليل سينمائي على قيمة العقارات التي تستحق نظرة ثانية.' },
    explore: { en: 'Explore', ar: 'استكشف' },
    contact: { en: 'Contact', ar: 'تواصل' },
    follow: { en: 'Follow the frame', ar: 'تابع الإطار' },
    reserved: { en: '© 2026 Sultan Perspective. All coordinates reserved.', ar: '© 2026 سلطان برسبكتيف. جميع الإحداثيات محفوظة.' },
    tagline: { en: 'See more. Feel more. Move sooner.', ar: 'رؤية أوسع. شعور أقوى. قرار أسرع.' },
  },
  reel: {
    label: { en: 'A 30-second studio reel / coming in hot', ar: 'عرض استوديو لمدة 30 ثانية / قريباً' },
    titleLead: { en: 'Every angle', ar: 'كل زاوية' },
    titleAccent: { en: 'counts.', ar: 'تُحدث فرقاً.' },
    close: { en: 'Close reel', ar: 'إغلاق العرض' },
  },
  errors: {
    name: { en: 'Add your name', ar: 'أدخل اسمك' },
    email: { en: 'Enter a valid email', ar: 'أدخل بريداً إلكترونياً صحيحاً' },
    phone: { en: 'Add a phone number', ar: 'أدخل رقم الهاتف' },
    address: { en: 'Add the property address', ar: 'أدخل عنوان العقار' },
    squareFootage: { en: 'Add the approximate size', ar: 'أدخل المساحة التقريبية' },
    propertyCount: { en: 'Enter at least one property', ar: 'أدخل عقاراً واحداً على الأقل' },
    date: { en: 'Choose a preferred date', ar: 'اختر التاريخ المفضل' },
    package: { en: 'Choose a package', ar: 'اختر الباقة' },
    standalone: { en: 'Choose one standalone service above', ar: 'اختر خدمة منفردة واحدة أعلاه' },
  },
} as const;

export const packages: PackageOffer[] = [
  {
    id: 'basic',
    category: 'residential',
    name: { en: 'Basic', ar: 'أساسية' },
    eyebrow: { en: 'Residential / 01', ar: 'سكنية / 01' },
    price: 50,
    measurement: { en: 'Up to 150m²', ar: 'حتى 150 متر مربع' },
    description: { en: 'A precise visual foundation for apartments, villas, and smaller homes.', ar: 'أساس بصري دقيق للشقق والفلل والمنازل الصغيرة.' },
    features: [
      { en: 'Aerial drone photos', ar: 'صور جوية بالدرون' },
      { en: '2D floor plan', ar: 'مخطط طوابق ثنائي الأبعاد' },
      { en: '360° virtual tour', ar: 'جولة افتراضية 360°' },
    ],
    tone: 'light',
  },
  {
    id: 'premium',
    category: 'residential',
    name: { en: 'Premium', ar: 'بريميوم' },
    eyebrow: { en: 'Residential / 02', ar: 'سكنية / 02' },
    price: 120,
    measurement: { en: 'Up to 150m²', ar: 'حتى 150 متر مربع' },
    description: { en: 'A complete listing story, designed to make a scroll stop.', ar: 'قصة عقار متكاملة مصممة لإيقاف التمرير.' },
    features: [
      { en: 'Interior + exterior photos (up to 10)', ar: 'صور داخلية وخارجية (حتى 10)' },
      { en: 'Drone video up to 30s', ar: 'فيديو درون حتى 30 ثانية' },
      { en: '5 interactive tour points (up to 5 photos or short video)', ar: '5 نقاط تفاعلية (حتى 5 صور أو فيديو قصير)' },
    ],
    tone: 'gold',
  },
  {
    id: 'ultimate',
    category: 'residential',
    name: { en: 'Ultimate', ar: 'شاملة' },
    eyebrow: { en: 'Residential / 03', ar: 'سكنية / 03' },
    price: 200,
    measurement: { en: 'Up to 150m²', ar: 'حتى 150 متر مربع' },
    description: { en: 'Every angle, every detail, and a tour buyers can inhabit.', ar: 'كل زاوية وكل تفصيل وجولة يعيشها المشتري.' },
    features: [
      { en: 'All Premium services', ar: 'جميع خدمات بريميوم' },
      { en: 'Drone video up to 60s', ar: 'فيديو درون حتى 60 ثانية' },
      { en: '10 interactive tour points (up to 10 photos or 60s video)', ar: '10 نقاط تفاعلية (حتى 10 صور أو فيديو 60 ثانية)' },
      { en: 'Virtual staging up to 5 rooms', ar: 'تأثيث افتراضي حتى 5 غرف' },
    ],
    tone: 'dark',
  },
  {
    id: 'land',
    category: 'land-commercial',
    name: { en: 'Land Package', ar: 'باقة الأراضي' },
    eyebrow: { en: 'Land / 01', ar: 'أراضٍ / 01' },
    price: 60,
    measurement: { en: 'Up to 3000m²', ar: 'حتى 3000 متر مربع' },
    description: { en: 'Make the full footprint visible, from boundary to approach.', ar: 'أظهر كامل مساحة الأرض، من الحدود إلى المدخل.' },
    features: [
      { en: '360° aerial shot', ar: 'لقطة جوية 360°' },
      { en: 'Boundary mapping', ar: 'تحديد الحدود' },
      { en: '360° site scan', ar: 'مسح للموقع 360°' },
    ],
    tone: 'light',
  },
  {
    id: 'commercial',
    category: 'land-commercial',
    name: { en: 'Commercial Package', ar: 'باقة المنشآت التجارية' },
    eyebrow: { en: 'Commercial / 02', ar: 'تجارية / 02' },
    price: 120,
    measurement: { en: 'Up to 500m²', ar: 'حتى 500 متر مربع' },
    description: { en: 'A clear, publish-ready view of commercial and industrial facilities.', ar: 'صورة واضحة وجاهزة للنشر للمنشآت التجارية والصناعية.' },
    features: [
      { en: 'Interior + exterior photos (up to 10)', ar: 'صور داخلية وخارجية (حتى 10)' },
      { en: 'Drone video up to 30s', ar: 'فيديو درون حتى 30 ثانية' },
      { en: '2D floor plan', ar: 'مخطط طوابق ثنائي الأبعاد' },
      { en: '360° virtual tour', ar: 'جولة افتراضية 360°' },
    ],
    tone: 'gold',
  },
  {
    id: 'standalone',
    category: 'standalone',
    name: { en: 'Standalone Service Request', ar: 'طلب خدمة منفردة' },
    eyebrow: { en: 'A la carte', ar: 'حسب الطلب' },
    price: 0,
    measurement: { en: 'Choose one service', ar: 'اختر خدمة واحدة' },
    description: { en: 'Request one service without a preset package.', ar: 'اطلب خدمة واحدة بدون باقة جاهزة.' },
    features: [],
    tone: 'light',
  },
];

export const addOns: AddOn[] = [
  { id: 'drone30', name: { en: '30-Second Aerial Drone Video', ar: 'فيديو جوي بالدرون لمدة 30 ثانية' }, price: 40, note: { en: 'Per property', ar: 'لكل عقار' } },
  { id: 'sunset', name: { en: 'Sunset or Night Shoot', ar: 'تصوير عند الغروب أو ليلاً' }, price: 50, note: { en: 'Golden-hour or night timing', ar: 'توقيت الغروب أو الليل' } },
  { id: 'aerial360', name: { en: '360° Aerial Shot (Single Shot)', ar: 'لقطة جوية 360° (لقطة واحدة)' }, price: 39, note: { en: 'Single aerial shot', ar: 'لقطة جوية واحدة' } },
  { id: 'droneVideo30', name: { en: 'Aerial Drone Video (Up to 30s)', ar: 'فيديو جوي بالدرون (حتى 30 ثانية)' }, price: 39, note: { en: 'Up to 30 seconds', ar: 'حتى 30 ثانية' } },
  { id: 'siteScan', name: { en: '360° Site Scan (Up to 150m)', ar: 'مسح للموقع 360° (حتى 150 متراً)' }, price: 39, note: { en: 'Up to 150m', ar: 'حتى 150 متراً' } },
  { id: 'boundary', name: { en: 'Boundary Mapping (Single Aerial Shot)', ar: 'تحديد الحدود (لقطة جوية واحدة)' }, price: 19, note: { en: 'Single aerial shot', ar: 'لقطة جوية واحدة' } },
  { id: 'floorplan2d', name: { en: '2D Floor Plan', ar: 'مخطط طوابق ثنائي الأبعاد' }, price: 26, note: { en: 'Publish-ready plan', ar: 'مخطط جاهز للنشر' } },
  { id: 'staging', name: { en: 'Virtual Staging (Per Room)', ar: 'تأثيث افتراضي (لكل غرفة)' }, price: 19, note: { en: 'Per room', ar: 'لكل غرفة' } },
  { id: 'interactive', name: { en: 'Interactive Points for Tour (up to 5 photos or short video)', ar: 'نقاط تفاعلية للجولة (حتى 5 صور أو فيديو قصير)' }, price: 13, note: { en: 'Up to 5 points', ar: 'حتى 5 نقاط' } },
  { id: 'aerialPhotos', name: { en: 'Aerial Drone Photos (5 Photos)', ar: 'صور جوية بالدرون (5 صور)' }, price: 19, note: { en: 'Five edited photos', ar: 'خمس صور معدّلة' } },
];

export const quickAddOnIds = ['drone30', 'sunset'] as const;
export const droneVideoAddOnIds = ['drone30', 'droneVideo30'] as const;

export const currencies = {
  usd: { code: 'USD', symbol: '$', label: { en: 'USD', ar: 'دولار' }, rate: 1 },
  lbp: { code: 'LBP', symbol: 'ل.ل.', label: { en: 'LBP', ar: 'ليرة لبنانية' }, rate: 89500 },
} as const;

export type CurrencyCode = keyof typeof currencies;

export const services = [
  {
    number: '01',
    title: { en: 'Aerial intelligence', ar: 'ذكاء جوي' },
    text: { en: 'Show the address in context: boundaries, approach, view, and the story around the property.', ar: 'أظهر العقار ضمن محيطه: الحدود والمدخل والإطلالة والقصة المحيطة به.' },
    mark: 'ALT / 01',
  },
  {
    number: '02',
    title: { en: 'Cinematic stills', ar: 'صور سينمائية' },
    text: { en: 'Ultra-wide interior photography that holds the room together without losing its character.', ar: 'تصوير داخلي فائق الاتساع يحافظ على تماسك المكان وشخصيته.' },
    mark: 'FRAME / 02',
  },
  {
    number: '03',
    title: { en: 'Walk-through worlds', ar: 'عوالم تفاعلية' },
    text: { en: '360° tours and interactive points that let a buyer self-qualify before the first call.', ar: 'جولات 360° ونقاط تفاعلية تساعد المشتري على اتخاذ قرار أولي قبل الاتصال.' },
    mark: 'ORBIT / 03',
  },
  {
    number: '04',
    title: { en: 'Plans that sell', ar: 'مخططات تقنع' },
    text: { en: 'Readable 2D floor plans and property mapping that make the invisible instantly legible.', ar: 'مخططات ثنائية الأبعاد وخرائط عقارية تجعل التفاصيل غير المرئية واضحة فوراً.' },
    mark: 'GRID / 04',
  },
];

export const proofPoints = [
  { value: '360°', label: { en: 'spatial capture', ar: 'التقاط مكاني' } },
  { value: '01 day', label: { en: 'typical delivery', ar: 'تسليم معتاد' } },
  { value: '4K', label: { en: 'aerial video', ar: 'فيديو جوي' } },
  { value: '2026', label: { en: 'price list', ar: 'قائمة الأسعار' } },
];