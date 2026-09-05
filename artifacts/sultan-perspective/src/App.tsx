import { useEffect, useMemo, useState, type FormEvent, type ReactNode } from 'react';
import {
  ArrowUpRight,
  Check,
  ChevronDown,
  CircleCheck,
  Instagram,
  MapPin,
  Menu,
  Phone,
  Send,
  X,
} from 'lucide-react';
import {
  addOns,
  brand,
  copy,
  currencies,
  droneVideoAddOnIds,
  packages,
  promotions,
  quickAddOnIds,
  type CurrencyCode,
  type Locale,
  type LocalizedText,
  type PackageOffer,
} from '@/constants';

type FormValues = {
  name: string;
  email: string;
  phone: string;
  address: string;
  squareFootage: string;
  propertyCount: string;
  date: string;
  packageId: string;
};

const initialForm: FormValues = {
  name: '',
  email: '',
  phone: '',
  address: '',
  squareFootage: '',
  propertyCount: '1',
  date: '',
  packageId: 'premium',
};

const emptySelections = () => ({
  basic: [],
  premium: [],
  ultimate: [],
  land: [],
  commercial: [],
  standalone: [],
});

const getText = (value: LocalizedText, locale: Locale) => value[locale];

const interpolate = (value: string, replacements: Record<string, string>) =>
  Object.entries(replacements).reduce((result, [key, replacement]) => result.replace(`{${key}}`, replacement), value);

const formatMoney = (amountInUsd: number, currency: CurrencyCode, locale: Locale) => {
  const formatted = new Intl.NumberFormat(locale === 'ar' ? 'ar-LB' : 'en-US', {
    maximumFractionDigits: 0,
  }).format(Math.round(amountInUsd * currencies[currency].rate));
  return currency === 'usd' ? `${currencies[currency].symbol}${formatted}` : `${currencies[currency].symbol} ${formatted}`;
};

function Logo() {
  return (
    <a href="#top" className="group flex items-center gap-3" data-testid="link-brand-home">
      <span className="relative grid size-10 place-items-center border border-[#d29a38] bg-[#d29a38] text-[#1d2027]">
        <span className="absolute inset-1 border border-[#1d2027]/50" />
        <span className="display-font text-xl font-bold leading-none">S</span>
      </span>
      <span className="block">
        <span className="display-font block text-[15px] font-bold uppercase leading-none tracking-[.2em] text-[#f5eee3] group-hover:text-[#d29a38]">
          Sultan
        </span>
        <span className="mt-1 block text-[8px] uppercase leading-none tracking-[.42em] text-[#d29a38]">
          Perspective
        </span>
      </span>
    </a>
  );
}

function LanguageToggle({ locale, onToggle }: { locale: Locale; onToggle: () => void }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={getText(copy.language.label, locale)}
      className="inline-flex items-center gap-1.5 border border-[#f5eee3]/25 px-3 py-2 text-[10px] font-semibold tracking-[.12em] text-[#f5eee3]/80 transition-colors hover:border-[#d29a38] hover:text-[#d29a38]"
      data-testid="button-language-toggle"
    >
      <span className={locale === 'ar' ? 'text-[#d29a38]' : ''}>العربية</span>
      <span className="text-[#f5eee3]/35">/</span>
      <span className={locale === 'en' ? 'text-[#d29a38]' : ''}>EN</span>
    </button>
  );
}

function ArrowButton({
  children,
  href,
  onClick,
  light = false,
  testId,
}: {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  light?: boolean;
  testId: string;
}) {
  const classes = `group inline-flex items-center gap-3 border px-5 py-3 text-[11px] font-semibold uppercase tracking-[.16em] transition-all ${
    light
      ? 'border-[#f5eee3]/35 text-[#f5eee3] hover:border-[#d29a38] hover:bg-[#d29a38] hover:text-[#1d2027]'
      : 'border-[#1d2027] bg-[#1d2027] text-[#f5eee3] hover:bg-[#d29a38] hover:text-[#1d2027]'
  }`;
  const content = (
    <>
      <span>{children}</span>
      <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
    </>
  );
  if (href) {
    return <a href={href} onClick={onClick} className={classes} data-testid={testId}>{content}</a>;
  }
  return <button type="button" onClick={onClick} className={classes} data-testid={testId}>{content}</button>;
}

function CurrencyToggle({
  currency,
  locale,
  onChange,
}: {
  currency: CurrencyCode;
  locale: Locale;
  onChange: (value: CurrencyCode) => void;
}) {
  return (
    <div className="flex items-center gap-2" aria-label={getText(copy.pricing.currencyLabel, locale)}>
      <span className="mono-label hidden text-[9px] text-[#8d887f] sm:block">{getText(copy.pricing.currencyLabel, locale)}</span>
      <div className="flex border border-[#cfc7ba] bg-[#f1ece3] p-1">
        {(Object.keys(currencies) as CurrencyCode[]).map((code) => (
          <button
            type="button"
            key={code}
            onClick={() => onChange(code)}
            className={`px-3 py-2 text-[10px] font-bold tracking-[.08em] transition-colors ${
              currency === code ? 'bg-[#1d2027] text-[#f5eee3]' : 'text-[#68676a] hover:text-[#1d2027]'
            }`}
            aria-pressed={currency === code}
            data-testid={`button-currency-${code}`}
          >
            {code === 'usd' ? '$ USD' : 'ل.ل. LBP'}
          </button>
        ))}
      </div>
    </div>
  );
}

function App() {
  const [locale, setLocale] = useState<Locale>('en');
  const [currency, setCurrency] = useState<CurrencyCode>('usd');
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState('premium');
  const [packageAddOns, setPackageAddOns] = useState<Record<string, string[]>>(emptySelections);
  const [form, setForm] = useState<FormValues>(initialForm);
  const [errors, setErrors] = useState<Partial<Record<keyof FormValues, string>>>({});
  const [submitted, setSubmitted] = useState(false);
  const isArabic = locale === 'ar';

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = isArabic ? 'rtl' : 'ltr';
    document.title = isArabic
      ? 'سلطان برسبكتيف | إعلام مكاني للعقارات'
      : 'Sultan Perspective | Spatial media for property';
  }, [isArabic, locale]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const chosenPackage = packages.find((item) => item.id === selectedPackage);
  const isStandalone = selectedPackage === 'standalone';
  const selectedOptions = packageAddOns[selectedPackage] ?? [];
  const rawPropertyCount = Number(form.propertyCount);
  const propertyCount = Math.min(50, Math.max(1, Number.isFinite(rawPropertyCount) ? Math.floor(rawPropertyCount) : 1));

  const addOnTotal = (ids: string[]) =>
    ids.reduce((sum, id) => sum + (addOns.find((item) => item.id === id)?.price ?? 0), 0);

  const packageIncludesDroneVideo = (packageId: string) =>
    packages.find((item) => item.id === packageId)?.features.some((feature) => feature.en.toLowerCase().includes('drone video')) ?? false;

  const availableAddOnsFor = (packageId: string) =>
    addOns.filter((addon) => {
      if (packageId !== 'standalone' && addon.id === 'floorplan2d') return false;
      if (droneVideoAddOnIds.includes(addon.id as (typeof droneVideoAddOnIds)[number]) && packageIncludesDroneVideo(packageId)) return false;
      return true;
    });

  const calculateEstimate = (packageId: string) => {
    const packageOffer = packages.find((item) => item.id === packageId);
    const selectedForEstimate = (packageAddOns[packageId] ?? []).filter((id) => availableAddOnsFor(packageId).some((addon) => addon.id === id));
    const perPropertyUsd = (packageOffer?.price ?? 0) + addOnTotal(selectedForEstimate);
    const grossUsd = perPropertyUsd * propertyCount;
    const pairCount = Math.floor(propertyCount / promotions.bundle.minimumProperties);
    const bundleSavingsUsd = pairCount * perPropertyUsd * (promotions.bundle.percent / 100);
    const loyaltyFreeCount = Math.floor(propertyCount / (promotions.loyalty.freeProperty));
    const loyaltySavingsUsd = loyaltyFreeCount * perPropertyUsd;
    const savingsUsd = Math.max(bundleSavingsUsd, loyaltySavingsUsd);
    const offer = loyaltySavingsUsd > bundleSavingsUsd ? 'loyalty' : bundleSavingsUsd > 0 ? 'bundle' : 'none';
    return {
      grossUsd,
      savingsUsd,
      totalUsd: Math.max(0, grossUsd - savingsUsd),
      offer,
      perPropertyUsd,
    };
  };

  const currentEstimate = useMemo(
    () => calculateEstimate(selectedPackage),
    [currency, packageAddOns, propertyCount, selectedPackage],
  );

  const scrollToBooking = (packageId?: string) => {
    if (packageId) {
      setSelectedPackage(packageId);
      setForm((current) => ({ ...current, packageId }));
    }
    setMenuOpen(false);
    window.setTimeout(() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' }), 20);
  };

  const togglePackageAddOn = (packageId: string, addOnId: string) => {
    setSelectedPackage(packageId);
    setForm((current) => ({ ...current, packageId }));
    setPackageAddOns((current) => {
      const selected = current[packageId] ?? [];
      const next = selected.includes(addOnId)
        ? selected.filter((item) => item !== addOnId)
        : packageId === 'standalone' ? [addOnId] : [...selected, addOnId];
      return { ...current, [packageId]: next };
    });
  };

  const updateField = (field: keyof FormValues, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
    if (errors[field]) setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const changePropertyCount = (nextValue: number) => {
    const next = Math.min(50, Math.max(1, Math.floor(nextValue) || 1));
    updateField('propertyCount', String(next));
  };

  const submitBooking = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors: Partial<Record<keyof FormValues, string>> = {};
    if (!form.name.trim()) nextErrors.name = getText(copy.errors.name, locale);
    if (!/^\S+@\S+\.\S+$/.test(form.email)) nextErrors.email = getText(copy.errors.email, locale);
    if (!form.phone.trim()) nextErrors.phone = getText(copy.errors.phone, locale);
    if (!form.address.trim()) nextErrors.address = getText(copy.errors.address, locale);
    if (!form.squareFootage || Number(form.squareFootage) <= 0) nextErrors.squareFootage = getText(copy.errors.squareFootage, locale);
    if (!form.propertyCount || propertyCount < 1) nextErrors.propertyCount = getText(copy.errors.propertyCount, locale);
    if (!form.date) nextErrors.date = getText(copy.errors.date, locale);
    if (!form.packageId) nextErrors.packageId = getText(copy.errors.package, locale);
    if (form.packageId === 'standalone' && selectedOptions.length !== 1) nextErrors.packageId = getText(copy.errors.standalone, locale);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length === 0) {
      const selectedServiceNames = selectedOptions
        .filter((id) => availableAddOns.some((addon) => addon.id === id))
        .map((id) => addOns.find((addon) => addon.id === id))
        .filter((addon): addon is (typeof addOns)[number] => Boolean(addon))
        .map((addon) => getText(addon.name, locale));
      const packageName = isStandalone
        ? getText(copy.pricing.standalone, locale)
        : getText(chosenPackage?.name ?? packages[1].name, locale);
      const labels = isArabic
        ? {
            name: 'الاسم',
            email: 'البريد الإلكتروني',
            phone: 'رقم الهاتف',
            date: 'التاريخ المفضل',
            address: 'عنوان العقار',
            size: 'المساحة التقريبية',
            properties: 'عدد العقارات',
            package: 'الباقة',
            services: 'الخدمات المختارة',
            estimate: 'التقدير الحالي',
          }
        : {
            name: 'Name',
            email: 'Email',
            phone: 'Phone',
            date: 'Preferred date',
            address: 'Property address',
            size: 'Approx. square footage',
            properties: 'Number of properties',
            package: 'Package',
            services: 'Selected services',
            estimate: 'Current estimate',
          };
      const services = selectedServiceNames.length
        ? selectedServiceNames.join(', ')
        : isStandalone
          ? isArabic ? 'لم يتم اختيار خدمة' : 'No standalone service selected'
          : isArabic ? 'الخدمات الأساسية ضمن الباقة' : 'Included package services';
      const message = [
        isArabic ? 'مرحباً سلطان برسبكتيف، أود طلب التوافر والتسعير لهذا المشروع:' : 'Hello Sultan Perspective, I would like to request availability and pricing for this project:',
        '',
        `${labels.name}: ${form.name}`,
        `${labels.email}: ${form.email}`,
        `${labels.phone}: ${form.phone}`,
        `${labels.date}: ${form.date}`,
        `${labels.address}: ${form.address}`,
        `${labels.size}: ${form.squareFootage}m²`,
        `${labels.properties}: ${propertyCount}`,
        `${labels.package}: ${packageName}`,
        `${labels.services}: ${services}`,
        `${labels.estimate}: ${formatMoney(currentEstimate.totalUsd, currency, locale)}`,
        '',
        isArabic ? 'يرجى تأكيد السعر النهائي بعد مراجعة العنوان والمسافة.' : 'Please confirm the final price after reviewing the address and distance.',
      ].join('\n');
      setSubmitted(true);
      window.location.assign(`https://wa.me/${brand.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`);
    }
  };

  const navItems = [
    { href: '#pricing', label: getText(copy.nav.pricing, locale) },
    { href: '#booking', label: getText(copy.nav.booking, locale) },
  ];
  const quickAddOnsForPackage = (packageId: string) =>
    availableAddOnsFor(packageId).filter(({ id }) => quickAddOnIds.some((quickId) => quickId === id));
  const availableAddOns = availableAddOnsFor(selectedPackage);
  const activePackageName = isStandalone ? getText(copy.pricing.standalone, locale) : getText(chosenPackage?.name ?? packages[1].name, locale);

  const renderPackageCard = (item: PackageOffer, index: number) => {
    const selectedForCard = packageAddOns[item.id] ?? [];
    const estimate = calculateEstimate(item.id);
    return (
      <article key={item.id} className={`package-card relative flex flex-col border p-7 sm:p-8 ${item.tone === 'gold' ? 'border-[#b9791d] bg-[#d29a38]' : item.tone === 'dark' ? 'border-[#1d2027] bg-[#1d2027] text-[#f5eee3]' : 'border-[#d5cfc4] bg-[#ebe5da]'}`} data-testid={`card-package-${item.id}`}>
        {item.id === 'premium' && <div className="absolute -top-3 start-7 bg-[#1d2027] px-3 py-1 text-[9px] font-bold uppercase tracking-[.16em] text-[#d29a38]">{getText(copy.pricing.mostRequested, locale)}</div>}
        <div className="flex items-start justify-between">
          <span className={`mono-label text-[9px] ${item.tone === 'dark' ? 'text-[#d29a38]' : item.tone === 'gold' ? 'text-[#1d2027]/65' : 'text-[#8d671e]'}`}>{getText(item.eyebrow, locale)}</span>
          <span className={`text-[10px] ${item.tone === 'dark' ? 'text-[#f5eee3]/40' : 'text-[#1d2027]/40'}`}>0{index + 1}</span>
        </div>
        <h3 className="display-font mt-12 text-3xl tracking-[-.04em]">{getText(item.name, locale)}</h3>
        <p className={`mt-3 min-h-[48px] text-sm leading-6 ${item.tone === 'dark' ? 'text-[#f5eee3]/60' : 'text-[#1d2027]/60'}`}>{getText(item.description, locale)}</p>
        <div className={`mt-7 flex flex-wrap items-center gap-2 border-b pb-5 ${item.tone === 'dark' ? 'border-white/15' : 'border-[#1d2027]/20'}`}>
          <span className={`border px-2.5 py-1.5 text-[10px] font-bold ${item.tone === 'dark' ? 'border-[#d29a38]/50 text-[#d29a38]' : 'border-[#1d2027]/25 text-[#8d671e]'}`}>{getText(item.measurement, locale)}</span>
        </div>
        <div className={`mt-5 flex items-end gap-2 border-b pb-6 ${item.tone === 'dark' ? 'border-white/15' : 'border-[#1d2027]/20'}`}>
          <span className="display-font text-5xl leading-none sm:text-6xl">{formatMoney(item.price, currency, locale)}</span>
          <span className={`pb-1 text-[10px] ${item.tone === 'dark' ? 'text-[#f5eee3]/50' : 'text-[#1d2027]/50'}`}>{getText(item.measurement, locale)}</span>
        </div>
        <ul className="mt-6 flex-1 space-y-3">
          {item.features.map((feature) => (
            <li key={feature.en} className="flex items-start gap-3 text-sm">
              <Check className={`mt-0.5 size-4 shrink-0 ${item.tone === 'dark' ? 'text-[#d29a38]' : 'text-[#8d671e]'}`} />
              <span>{getText(feature, locale)}</span>
            </li>
          ))}
        </ul>
        <div className={`mt-7 border-t pt-5 ${item.tone === 'dark' ? 'border-white/15' : 'border-[#1d2027]/20'}`}>
          <div className={`mono-label mb-3 text-[9px] ${item.tone === 'dark' ? 'text-[#f5eee3]/55' : 'text-[#68676a]'}`}>{getText(copy.pricing.quickOptions, locale)}</div>
          <div className="space-y-2">
            {quickAddOnsForPackage(item.id).map((addon) => {
              const checked = selectedForCard.includes(addon.id);
              return (
                <label key={addon.id} className={`flex cursor-pointer items-center gap-3 text-xs ${item.tone === 'dark' ? 'text-[#f5eee3]/75' : 'text-[#1d2027]/75'}`}>
                  <input type="checkbox" className="sr-only" checked={checked} onChange={() => togglePackageAddOn(item.id, addon.id)} data-testid={`checkbox-${item.id}-${addon.id}`} />
                  <span className={`grid size-4 shrink-0 place-items-center border ${checked ? 'border-[#1d2027] bg-[#1d2027] text-[#d29a38]' : item.tone === 'dark' ? 'border-white/35' : 'border-[#9e9588]'}`}>{checked && <Check className="size-3" />}</span>
                  <span className="leading-5">{getText(addon.name, locale)}</span>
                  <span className="ms-auto shrink-0 text-[10px] opacity-70">+{formatMoney(addon.price, currency, locale)}</span>
                </label>
              );
            })}
          </div>
          <div className={`mt-5 flex items-baseline justify-between gap-3 border-t pt-4 ${item.tone === 'dark' ? 'border-white/15' : 'border-[#1d2027]/15'}`}>
            <span className="text-[10px] uppercase tracking-[.12em] opacity-60">{getText(copy.pricing.estimate, locale)}</span>
            <span className="display-font text-2xl">{formatMoney(estimate.totalUsd, currency, locale)}</span>
          </div>
        </div>
        <button type="button" onClick={() => scrollToBooking(item.id)} className={`group mt-6 flex items-center justify-between border-t pt-5 text-start text-[10px] font-bold uppercase tracking-[.16em] ${item.tone === 'dark' ? 'border-white/15 text-[#f5eee3]' : 'border-[#1d2027]/20 text-[#1d2027]'}`} data-testid={`button-select-package-${item.id}`}>
          {getText(copy.pricing.select, locale)} {getText(item.name, locale)} <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
        </button>
        <p className={`mt-4 text-[10px] leading-4 ${item.tone === 'dark' ? 'text-[#f5eee3]/55' : 'text-[#68676a]'}`}>
          {getText(copy.pricing.priceDisclaimer, locale)}
        </p>
      </article>
    );
  };

  return (
    <div id="top" dir={isArabic ? 'rtl' : 'ltr'} className={`noise locale-${locale} min-h-[100dvh] bg-[#f1ece3] text-[#1d2027]`}>
      <header className="absolute inset-x-0 top-0 z-40 border-b border-white/10">
        <div className="mx-auto flex h-[76px] max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:px-12">
          <Logo />
          <nav className="hidden items-center gap-8 lg:flex" aria-label={getText(copy.nav.pricing, locale)}>
            {navItems.map((item) => (
              <a key={item.href} href={item.href} className="text-[10px] font-semibold uppercase tracking-[.17em] text-[#f5eee3]/65 transition-colors hover:text-[#d29a38]">{item.label}</a>
            ))}
          </nav>
          <div className="hidden items-center gap-4 sm:flex">
            <LanguageToggle locale={locale} onToggle={() => setLocale((current) => (current === 'en' ? 'ar' : 'en'))} />
            <a href={`tel:${brand.whatsapp}`} className="text-[11px] text-[#f5eee3]/55 hover:text-[#d29a38]">{brand.phone}</a>
            <ArrowButton href="#booking" light testId="button-header-book">{getText(copy.nav.booking, locale)}</ArrowButton>
          </div>
          <div className="flex items-center gap-2 sm:hidden">
            <LanguageToggle locale={locale} onToggle={() => setLocale((current) => (current === 'en' ? 'ar' : 'en'))} />
            <button type="button" aria-label={getText(copy.menu[menuOpen ? 'close' : 'open'], locale)} onClick={() => setMenuOpen((current) => !current)} className="grid size-11 place-items-center border border-white/20 text-[#f5eee3]" data-testid="button-mobile-menu">
              {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>
        {menuOpen && (
          <div className="border-t border-white/10 bg-[#1d2027] px-5 py-6 lg:hidden">
            <nav className="flex flex-col gap-5" aria-label={getText(copy.nav.pricing, locale)}>
              {navItems.map((item) => <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)} className="text-sm font-semibold uppercase tracking-[.16em] text-[#f5eee3]">{item.label}</a>)}
              <a href={`tel:${brand.whatsapp}`} className="border-t border-white/10 pt-5 text-xs text-[#d29a38]">{brand.phone}</a>
            </nav>
          </div>
        )}
      </header>

      <main>
        <section className="relative min-h-[760px] overflow-hidden bg-[#1d2027] text-[#f5eee3] sm:min-h-[820px]">
          <img src="/assets/sultan-hero-villa.jpg" alt="" className="absolute inset-0 h-full w-full object-cover opacity-35 mix-blend-luminosity" />
          <div className={`absolute inset-0 ${isArabic ? 'bg-gradient-to-l from-[#1d2027] via-[#1d2027]/90 to-[#1d2027]/35' : 'bg-gradient-to-r from-[#1d2027] via-[#1d2027]/90 to-[#1d2027]/35'}`} />
          <div className="hero-grid absolute inset-0 opacity-40" />
          <div className={`absolute -right-32 top-24 h-[560px] w-[560px] rounded-full border border-[#d29a38]/30 sm:right-[-80px] ${isArabic ? 'right-auto left-[-128px] sm:left-[-80px]' : ''}`}>
            <div className="absolute inset-[14%] rounded-full border border-[#d29a38]/20" />
            <div className="absolute inset-[29%] rounded-full border border-[#d29a38]/20" />
          </div>
          <div className="absolute right-[12%] top-[34%] hidden h-px w-[420px] origin-right rotate-[-29deg] bg-[#d29a38]/70 lg:block" />
          <div className="absolute bottom-0 left-0 h-[42%] w-[60%] bg-gradient-to-t from-[#1d2027] to-transparent" />
          <div className="relative mx-auto flex min-h-[760px] max-w-[1440px] flex-col justify-end px-5 pb-12 pt-36 sm:min-h-[820px] sm:px-8 sm:pb-16 lg:px-12 lg:pb-20">
            <div className="max-w-[960px]">
              <div className="reveal mb-7 flex items-center gap-3">
                <span className="h-px w-10 bg-[#d29a38]" />
                <span className="mono-label text-[10px] text-[#d29a38]">{getText(copy.hero.eyebrow, locale)}</span>
              </div>
              <h1 className="display-font reveal reveal-delay-1 max-w-[1020px] text-[clamp(3rem,7.1vw,7.2rem)] font-medium leading-[.91] tracking-[-.075em]">
                {isArabic ? (
                  <>ارفع قيمة عقاراتك <span className="block text-[#d29a38]">بإعلام مكاني متطور.</span></>
                ) : (
                  <>Elevate Your Listings <span className="block text-[#d29a38]">with Next-Gen Spatial Media.</span></>
                )}
              </h1>
              <div className="reveal reveal-delay-2 mt-8 flex max-w-[660px] flex-col items-start gap-7">
                <p className="max-w-[560px] text-base leading-7 text-[#f5eee3]/65 sm:text-lg">{getText(copy.hero.subheadline, locale)}</p>
                <ArrowButton href="#booking" light testId="button-hero-book">{getText(copy.nav.booking, locale)}</ArrowButton>
              </div>
            </div>
          </div>
        </section>

         <section id="demo-tour" className="border-y border-[#d5cfc4] bg-[#1d2027] text-[#f5eee3]">
           <div className="mx-auto grid max-w-[1440px] items-center gap-10 px-5 py-16 sm:px-8 lg:grid-cols-[.7fr_1.3fr] lg:gap-16 lg:px-12 lg:py-24">
             <div>
               <div className="mono-label flex items-center gap-3 text-[10px] text-[#d29a38]"><span className="h-px w-8 bg-[#d29a38]" /> {getText(copy.demoTour.eyebrow, locale)}</div>
               <h2 className="display-font mt-6 text-5xl leading-[.95] tracking-[-.06em] sm:text-6xl">{getText(copy.demoTour.titleLead, locale)} <span className="text-[#d29a38]">{getText(copy.demoTour.titleAccent, locale)}</span></h2>
               <p className="mt-6 max-w-[420px] text-sm leading-7 text-[#f5eee3]/65 sm:text-base">{getText(copy.demoTour.description, locale)}</p>
             </div>
             <div className="overflow-hidden border border-[#d29a38]/35 bg-black shadow-2xl">
               <div className="flex items-center justify-between gap-4 border-b border-[#f5eee3]/10 px-4 py-3">
                 <span className="mono-label text-[9px] text-[#f5eee3]/55">{getText(copy.demoTour.frameLabel, locale)}</span>
                 <span className="text-[9px] uppercase tracking-[.16em] text-[#d29a38]">Matterport / 360°</span>
               </div>
               <div className="aspect-[4/3] sm:aspect-video">
                 <iframe
                   src="https://my.matterport.com/show?play=0&playsInline=1&lang=en-US&m=d4tQBtLFUWu"
                   title={getText(copy.demoTour.frameLabel, locale)}
                   className="h-full w-full border-0"
                   allow="fullscreen; autoplay; xr-spatial-tracking"
                   allowFullScreen
                   loading="lazy"
                 />
               </div>
             </div>
           </div>
         </section>

        <section id="pricing" className="mx-auto max-w-[1440px] px-5 py-24 sm:px-8 lg:px-12 lg:py-36">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div><div className="mono-label flex items-center gap-3 text-[10px] text-[#ad6f18]"><span className="size-2 bg-[#d29a38]" /> {getText(copy.pricing.eyebrow, locale)}</div><h2 className="display-font mt-5 text-5xl tracking-[-.06em] sm:text-7xl">{getText(copy.pricing.titleLead, locale)} <span className="text-[#b9791d]">{getText(copy.pricing.titleAccent, locale)}</span></h2></div>
            <CurrencyToggle currency={currency} locale={locale} onChange={setCurrency} />
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 border-y border-[#d5cfc4] py-3 text-xs text-[#68676a]">
            <span className="font-semibold text-[#8d671e]">{getText(copy.promotions.bundle, locale)}</span>
            <span>{getText(copy.promotions.loyalty, locale)}</span>
            <span className="text-[10px]">{getText(copy.promotions.note, locale)}</span>
          </div>

          <div className="mt-12">
            <div className="flex flex-col justify-between gap-2 border-b border-[#d5cfc4] pb-5 sm:flex-row sm:items-end"><div><div className="mono-label text-[10px] text-[#ad6f18]">01 / {getText(copy.pricing.residential, locale)}</div><h3 className="display-font mt-3 text-3xl tracking-[-.04em] sm:text-4xl">{getText(copy.pricing.residential, locale)}</h3></div><p className="text-sm text-[#68676a] sm:text-end">{getText(copy.pricing.residentialNote, locale)}</p></div>
            <div className="mt-8 grid items-stretch gap-4 lg:grid-cols-3">{packages.filter((item) => item.category === 'residential').map((item, index) => renderPackageCard(item, index))}</div>
          </div>

          <div className="mt-20">
            <div className="flex flex-col justify-between gap-2 border-b border-[#d5cfc4] pb-5 sm:flex-row sm:items-end"><div><div className="mono-label text-[10px] text-[#ad6f18]">02 / {getText(copy.pricing.commercialLand, locale)}</div><h3 className="display-font mt-3 text-3xl tracking-[-.04em] sm:text-4xl">{getText(copy.pricing.commercialLand, locale)}</h3></div><p className="text-sm text-[#68676a] sm:text-end">{getText(copy.pricing.commercialLandNote, locale)}</p></div>
            <div className="mt-8 grid items-stretch gap-4 sm:grid-cols-2">{packages.filter((item) => item.category === 'land-commercial').map((item, index) => renderPackageCard(item, index))}</div>
          </div>
        </section>

        <section id="addons" className="border-y border-[#d5cfc4] bg-[#e8e1d6]">
          <div className="mx-auto grid max-w-[1440px] gap-10 px-5 py-16 sm:px-8 lg:grid-cols-[.75fr_1.25fr] lg:px-12">
            <div>
              <div className="mono-label text-[10px] text-[#ad6f18]">{getText(copy.estimator.addOnsTitle, locale)}</div>
              <h2 className="display-font mt-5 text-4xl tracking-[-.05em] sm:text-5xl">{getText(copy.estimator.titleLead, locale)} <span className="text-[#b9791d]">{getText(copy.estimator.titleAccent, locale)}</span></h2>
              <button
                type="button"
                onClick={() => {
                  setSelectedPackage('standalone');
                  updateField('packageId', 'standalone');
                }}
                className={`mt-8 w-full border p-5 text-start transition-colors ${isStandalone ? 'border-[#1d2027] bg-[#1d2027] text-[#f5eee3]' : 'border-[#cfc7ba] bg-[#f1ece3] hover:border-[#b9791d]'}`}
                aria-pressed={isStandalone}
                data-testid="button-standalone-service"
              >
                <span className={`mono-label text-[9px] ${isStandalone ? 'text-[#d29a38]' : 'text-[#8d671e]'}`}>{getText(copy.pricing.standaloneNote, locale)}</span>
                <span className="mt-2 flex items-center justify-between gap-3 text-sm font-semibold">
                  {getText(copy.pricing.standalone, locale)}
                  <ArrowUpRight className="size-4 text-[#b9791d]" />
                </span>
              </button>
            </div>
            <div className="border border-[#cfc7ba] bg-[#f1ece3]">
              <div className="flex flex-col gap-5 border-b border-[#d5cfc4] px-5 py-5 sm:flex-row sm:items-center sm:justify-between">
                <div><span className="mono-label text-[9px] text-[#68676a]">{getText(copy.estimator.estimateLabel, locale)} · {activePackageName}</span><div className="mt-2 flex items-center gap-2"><button type="button" onClick={() => changePropertyCount(propertyCount - 1)} className="grid size-8 place-items-center border border-[#cfc7ba] text-lg hover:border-[#b9791d]" aria-label={getText(copy.estimator.propertyMinus, locale)} data-testid="button-property-minus">−</button><input type="number" min="1" max="50" value={propertyCount} onChange={(event) => changePropertyCount(Number(event.target.value))} className="!w-16 !px-2 !py-1 text-center text-lg font-semibold" aria-label={getText(copy.estimator.propertyCount, locale)} data-testid="input-property-count" /><button type="button" onClick={() => changePropertyCount(propertyCount + 1)} className="grid size-8 place-items-center border border-[#cfc7ba] text-lg hover:border-[#b9791d]" aria-label={getText(copy.estimator.propertyPlus, locale)} data-testid="button-property-plus">+</button><span className="ms-2 text-xs text-[#68676a]">{getText(copy.estimator.propertyCount, locale)}</span></div></div>
                <span className="display-font text-3xl">{formatMoney(currentEstimate.totalUsd, currency, locale)}</span>
              </div>
              <div className="divide-y divide-[#d5cfc4]">
                <div className="flex items-center justify-between gap-4 px-5 py-4 text-sm"><span className="text-[#68676a]">{getText(isStandalone ? copy.estimator.standaloneBase : copy.estimator.base, locale)} × {propertyCount}</span><span className="font-semibold">{formatMoney(currentEstimate.grossUsd, currency, locale)}</span></div>
                {currentEstimate.offer !== 'none' ? <div className="flex items-center justify-between gap-4 px-5 py-4 text-sm text-[#8d671e]"><span>{getText(currentEstimate.offer === 'loyalty' ? copy.estimator.loyaltySavings : copy.estimator.bundleSavings, locale)}</span><span className="font-semibold">−{formatMoney(currentEstimate.savingsUsd, currency, locale)}</span></div> : <div className="px-5 py-4 text-xs text-[#7e7b78]">{getText(copy.estimator.noSavings, locale)}</div>}
                {isStandalone && <div className="border-b border-[#d5cfc4] px-5 py-3 text-xs text-[#8d671e]">{getText(copy.estimator.standalonePrompt, locale)}</div>}
                {availableAddOns.map((addon) => {
                  const checked = selectedOptions.includes(addon.id);
                  return <label key={addon.id} className="flex w-full cursor-pointer items-center gap-4 px-5 py-4 text-start transition-colors hover:bg-[#e8e1d6]"><input type="checkbox" className="sr-only" checked={checked} onChange={() => togglePackageAddOn(selectedPackage, addon.id)} data-testid={`checkbox-estimator-${addon.id}`} /><span className={`grid size-5 place-items-center border ${checked ? 'border-[#1d2027] bg-[#1d2027] text-[#d29a38]' : 'border-[#ada69c]'}`}>{checked && <Check className="size-3.5" />}</span><span className="flex-1"><span className="block text-sm font-semibold">{getText(addon.name, locale)}</span><span className="mt-1 block text-xs text-[#7e7b78]">{getText(addon.note, locale)}</span></span><span className="text-sm font-semibold">+{formatMoney(addon.price * propertyCount, currency, locale)}</span></label>;
                })}
              </div>
              <div className="flex flex-col gap-4 border-t border-[#d5cfc4] px-5 py-5 sm:flex-row sm:items-center sm:justify-between"><span className="text-xs leading-5 text-[#68676a]">{getText(copy.estimator.notStacked, locale)} {getText(copy.estimator.confirmation, locale)}</span><button type="button" onClick={() => scrollToBooking()} className="group inline-flex items-center gap-2 text-start text-[10px] font-bold uppercase tracking-[.16em]" data-testid="button-estimator-book">{getText(copy.estimator.continue, locale)} <ArrowUpRight className="size-4 text-[#ad6f18] transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" /></button></div>
            </div>
          </div>
        </section>

        <section id="booking" className="bg-[#d29a38]">
          <div className="mx-auto grid max-w-[1440px] gap-14 px-5 py-24 sm:px-8 lg:grid-cols-[.8fr_1.2fr] lg:gap-24 lg:px-12 lg:py-32">
            <div><div className="mono-label text-[10px] text-[#1d2027]/60">{getText(copy.booking.eyebrow, locale)}</div><h2 className="display-font mt-6 max-w-[530px] text-5xl leading-[.92] tracking-[-.065em] sm:text-7xl">{getText(copy.booking.titleLead, locale)} <span className="text-[#f1ece3]">{getText(copy.booking.titleAccent, locale)}</span></h2><div className="mt-10 space-y-4 border-t border-[#1d2027]/20 pt-6"><a href={`tel:${brand.whatsapp}`} className="flex items-center gap-3 text-sm font-semibold"><Phone className="size-4" /> {brand.phone}</a><a href={`https://instagram.com/${brand.instagram.replace('@', '')}`} target="_blank" rel="noreferrer" className="flex items-center gap-3 text-sm font-semibold"><Instagram className="size-4" /> {brand.instagram}</a><div className="flex items-center gap-3 text-sm font-semibold"><MapPin className="size-4" /> {getText(brand.location, locale)}</div></div></div>
            <div className="bg-[#f1ece3] p-6 sm:p-9">
              {submitted ? <div className="flex min-h-[500px] flex-col items-center justify-center text-center"><span className="grid size-16 place-items-center rounded-full bg-[#1d2027] text-[#d29a38]"><CircleCheck className="size-8" /></span><div className="mono-label mt-7 text-[10px] text-[#ad6f18]">{getText(copy.booking.received, locale)}</div><h3 className="display-font mt-4 text-4xl tracking-[-.05em]">{getText(copy.booking.receivedTitle, locale)}</h3><p className="mt-4 max-w-[360px] text-sm leading-6 text-[#68676a]">{interpolate(getText(copy.booking.receivedText, locale), { name: form.name.split(' ')[0] || (isArabic ? 'صديقي' : 'there') })}</p><p className="mt-4 text-sm font-semibold text-[#8d671e]">{formatMoney(currentEstimate.totalUsd, currency, locale)} · {propertyCount} {getText(copy.estimator.propertyCount, locale)}</p><button type="button" onClick={() => { setSubmitted(false); setForm(initialForm); setPackageAddOns(emptySelections()); }} className="mt-8 border-b border-[#1d2027] pb-2 text-[10px] font-bold uppercase tracking-[.15em]">{getText(copy.booking.another, locale)}</button></div> : <form onSubmit={submitBooking} noValidate><div className="mb-8 flex items-center justify-between border-b border-[#d5cfc4] pb-5"><span className="mono-label text-[10px] text-[#68676a]">{getText(copy.booking.projectDetails, locale)}</span><span className="text-xs text-[#8a8781]">{getText(copy.booking.step, locale)}</span></div><div className="grid gap-5 sm:grid-cols-2"><Field label={getText(copy.booking.fields.name, locale)} error={errors.name}><input value={form.name} onChange={(event) => updateField('name', event.target.value)} placeholder={getText(copy.booking.placeholders.name, locale)} /></Field><Field label={getText(copy.booking.fields.email, locale)} error={errors.email}><input type="email" value={form.email} onChange={(event) => updateField('email', event.target.value)} placeholder={getText(copy.booking.placeholders.email, locale)} /></Field><Field label={getText(copy.booking.fields.phone, locale)} error={errors.phone}><input type="tel" value={form.phone} onChange={(event) => updateField('phone', event.target.value)} placeholder={getText(copy.booking.placeholders.phone, locale)} /></Field><Field label={getText(copy.booking.fields.date, locale)} error={errors.date}><input type="date" value={form.date} onChange={(event) => updateField('date', event.target.value)} /></Field><div className="sm:col-span-2"><Field label={getText(copy.booking.fields.address, locale)} error={errors.address}><input value={form.address} onChange={(event) => updateField('address', event.target.value)} placeholder={getText(copy.booking.placeholders.address, locale)} /></Field></div><Field label={getText(copy.booking.fields.squareFootage, locale)} error={errors.squareFootage}><input type="number" min="1" value={form.squareFootage} onChange={(event) => updateField('squareFootage', event.target.value)} placeholder={getText(copy.booking.placeholders.squareFootage, locale)} /></Field><Field label={getText(copy.booking.fields.propertyCount, locale)} error={errors.propertyCount}><input type="number" min="1" max="50" value={form.propertyCount} onChange={(event) => updateField('propertyCount', event.target.value)} placeholder={getText(copy.booking.placeholders.propertyCount, locale)} /></Field><div className="sm:col-span-2"><Field label={getText(copy.booking.fields.package, locale)} error={errors.packageId}><div className="relative"><select value={form.packageId} onChange={(event) => { updateField('packageId', event.target.value); setSelectedPackage(event.target.value); }}>{packages.map((item) => <option value={item.id} key={item.id}>{getText(item.name, locale)} — {formatMoney(item.price, currency, locale)} · {getText(item.measurement, locale)}</option>)}</select><ChevronDown className={`pointer-events-none absolute top-1/2 size-4 -translate-y-1/2 text-[#8a8781] ${isArabic ? 'left-3' : 'right-3'}`} /></div></Field></div></div><div className="mt-8 flex flex-col justify-between gap-5 border-t border-[#d5cfc4] pt-6 sm:flex-row sm:items-center"><p className="max-w-[260px] text-xs leading-5 text-[#8a8781]">{getText(copy.booking.disclaimer, locale)}</p><button type="submit" className="group inline-flex items-center justify-center gap-3 bg-[#1d2027] px-6 py-4 text-[10px] font-bold uppercase tracking-[.16em] text-[#f5eee3] transition-colors hover:bg-[#ad6f18]">{getText(copy.booking.submit, locale)} <Send className="size-4 transition-transform group-hover:translate-x-1" /></button></div></form>}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 bg-[#1d2027] text-[#f5eee3]"><div className="mx-auto flex max-w-[1440px] flex-col gap-3 px-5 py-6 text-xs text-[#f5eee3]/55 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-12"><Logo /><div className="flex flex-wrap items-center gap-x-5 gap-y-2"><a href={`tel:${brand.whatsapp}`}>{brand.phone}</a><a href={`https://instagram.com/${brand.instagram.replace('@', '')}`} target="_blank" rel="noreferrer">{brand.instagram}</a><span>{getText(brand.location, locale)}</span></div></div></footer>
    </div>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: ReactNode }) {
  return <label className="block"><span className="mono-label mb-2 block text-[9px] text-[#68676a]">{label}</span>{children}{error && <span className="mt-1 block text-[10px] text-[#b43c2e]">{error}</span>}</label>;
}

export default App;