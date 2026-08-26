export type Locale = 'en' | 'ar';

export type LocalizedText = {
  en: string;
  ar: string;
};

export type PackageOffer = {
  id: string;
  name: LocalizedText;
  eyebrow: LocalizedText;
  price: number;
  unit: LocalizedText;
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

export const copy = {
  nav: {
    services: { en: 'Services', ar: 'الخدمات' },
    pricing: { en: 'Pricing', ar: 'الأسعار' },
    approach: { en: 'Approach', ar: 'منهجيتنا' },
    booking: { en: 'Book a shoot', ar: 'احجز جلسة تصوير' },
  },
  language: {
    switchToArabic: 'العربية / EN',
    switchToEnglish: 'EN / العربية',
    label: { en: 'Switch to Arabic', ar: 'التبديل إلى الإنجليزية' },
  },
  hero: {
    eyebrow: { en: 'Spatial media / Beirut & beyond', ar: 'إعلام مكاني / بيروت وما بعد' },
    viewPricing: { en: 'View pricing', ar: 'عرض الأسعار' },
    playReel: { en: 'Play studio reel', ar: 'تشغيل عرض الاستوديو' },
    scroll: { en: 'Scroll to explore', ar: 'مرّر للاستكشاف' },
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
    titleAccent: { en: 'altitude.', ar: 'مستواك.' },
    description: { en: 'Simple packages, transparent extras, and a finish worthy of the listing.', ar: 'باقات واضحة، إضافات شفافة، ونتيجة تليق بعقارك.' },
    mostRequested: { en: 'Most requested', ar: 'الأكثر طلباً' },
    select: { en: 'Select', ar: 'اختيار' },
    currencyLabel: { en: 'Display currency', ar: 'العملة المعروضة' },
    localCurrency: { en: 'Lebanese pound', ar: 'الليرة اللبنانية' },
    quickOptions: { en: 'Quick options', ar: 'خيارات سريعة' },
    estimate: { en: 'Estimated total', ar: 'الإجمالي التقديري' },
  },
  estimator: {
    eyebrow: { en: 'Build your brief', ar: 'صمّم طلبك' },
    titleLead: { en: 'Add the', ar: 'أضف' },
    titleAccent: { en: 'finishing moves.', ar: 'اللمسات الأخيرة.' },
    description: { en: 'Start from {package}, then tune the coverage to match the property.', ar: 'ابدأ من {package}، ثم عدّل التغطية بما يناسب العقار.' },
    estimateLabel: { en: 'Your estimate', ar: 'تقديرك' },
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
      package: { en: 'Package', ar: 'الباقة' },
    },
    placeholders: {
      name: { en: 'Full name', ar: 'الاسم الكامل' },
      email: { en: 'you@studio.com', ar: 'you@studio.com' },
      phone: { en: '+961 ...', ar: '+961 ...' },
      address: { en: 'Street, city, country', ar: 'الشارع، المدينة، البلد' },
      squareFootage: { en: 'e.g. 2400', ar: 'مثال: 2400' },
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
    date: { en: 'Choose a preferred date', ar: 'اختر التاريخ المفضل' },
    package: { en: 'Choose a package', ar: 'اختر الباقة' },
  },
} as const;

export const packages: PackageOffer[] = [
  {
    id: 'standard',
    name: { en: 'Standard Listing', ar: 'الباقة الأساسية' },
    eyebrow: { en: 'Essential coverage', ar: 'تغطية أساسية' },
    price: 77,
    unit: { en: 'per property', ar: 'للعقار الواحد' },
    description: { en: 'A precise visual foundation for apartments, villas, and smaller spaces.', ar: 'أساس بصري دقيق للشقق والفلل والمساحات الصغيرة.' },
    features: [
      { en: 'Aerial drone photos', ar: 'صور جوية بالدرون' },
      { en: '2D floor plan', ar: 'مخطط طوابق ثنائي الأبعاد' },
      { en: '360° virtual tour', ar: 'جولة افتراضية 360°' },
    ],
    tone: 'light',
  },
  {
    id: 'pro',
    name: { en: 'Pro Interactive', ar: 'الباقة الاحترافية' },
    eyebrow: { en: 'Most requested', ar: 'الأكثر طلباً' },
    price: 129,
    unit: { en: 'per property', ar: 'للعقار الواحد' },
    description: { en: 'The complete listing story, designed to make a scroll stop.', ar: 'قصة عقار متكاملة مصممة لإيقاف التمرير.' },
    features: [
      { en: 'Interior + exterior photos', ar: 'صور داخلية وخارجية' },
      { en: 'Aerial video up to 30 seconds', ar: 'فيديو جوي حتى 30 ثانية' },
      { en: '5 interactive points', ar: '5 نقاط تفاعلية' },
    ],
    tone: 'gold',
  },
  {
    id: 'ultimate',
    name: { en: 'Ultimate Drone & 360', ar: 'باقة الدرون و360 الشاملة' },
    eyebrow: { en: 'Full command', ar: 'تغطية شاملة' },
    price: 207,
    unit: { en: 'per property', ar: 'للعقار الواحد' },
    description: { en: 'Every angle, every detail, and a tour buyers can inhabit.', ar: 'كل زاوية وكل تفصيل وجولة يعيشها المشتري.' },
    features: [
      { en: 'All Pro Interactive services', ar: 'جميع خدمات الباقة الاحترافية' },
      { en: 'Aerial video up to 60 seconds', ar: 'فيديو جوي حتى 60 ثانية' },
      { en: '10 interactive points', ar: '10 نقاط تفاعلية' },
      { en: 'Virtual furnishing up to 5 rooms', ar: 'تأثيث افتراضي حتى 5 غرف' },
    ],
    tone: 'dark',
  },
];

export const addOns: AddOn[] = [
  { id: 'drone', name: { en: 'Add Aerial Drone Coverage', ar: 'إضافة تغطية جوية بالدرون' }, price: 100, note: { en: 'Per flight', ar: 'لكل رحلة طيران' } },
  { id: 'dusk', name: { en: 'Add Evening / Twilight Shoot', ar: 'إضافة تصوير مسائي / غروب' }, price: 75, note: { en: 'Golden-hour timing', ar: 'توقيت الساعة الذهبية' } },
  { id: 'floorplan', name: { en: 'Add 3D Floor Plan', ar: 'إضافة مخطط طوابق ثلاثي الأبعاد' }, price: 35, note: { en: 'Per property', ar: 'للعقار الواحد' } },
  { id: 'removal', name: { en: 'Advanced AI Object Removal', ar: 'إزالة متقدمة للعناصر بالذكاء الاصطناعي' }, price: 50, note: { en: 'Per property', ar: 'للعقار الواحد' } },
];

export const quickAddOnIds = ['drone', 'dusk', 'floorplan'] as const;

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