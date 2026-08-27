import { useEffect, useMemo, useState, type FormEvent, type ReactNode } from 'react';
import {
  ArrowDownRight,
  ArrowUpRight,
  Camera,
  Check,
  ChevronDown,
  ChevronRight,
  CircleCheck,
  Grid3X3,
  Instagram,
  MapPin,
  Menu,
  Orbit,
  Phone,
  Plane,
  Plus,
  Send,
  X,
} from 'lucide-react';
import {
  addOns,
  brand,
  copy,
  currencies,
  packages,
  promotions,
  proofPoints,
  quickAddOnIds,
  services,
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
  const [activeService, setActiveService] = useState(0);
  const [selectedPackage, setSelectedPackage] = useState('premium');
  const [packageAddOns, setPackageAddOns] = useState<Record<string, string[]>>(emptySelections);
  const [storyOpen, setStoryOpen] = useState(false);
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
        setStoryOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const chosenPackage = packages.find((item) => item.id === selectedPackage) ?? packages[1];
  const selectedOptions = packageAddOns[selectedPackage] ?? [];
  const rawPropertyCount = Number(form.propertyCount);
  const propertyCount = Math.min(50, Math.max(1, Number.isFinite(rawPropertyCount) ? Math.floor(rawPropertyCount) : 1));

  const addOnTotal = (ids: string[]) =>
    ids.reduce((sum, id) => sum + (addOns.find((item) => item.id === id)?.price ?? 0), 0);

  const calculateEstimate = (packageId: string) => {
    const packageOffer = packages.find((item) => item.id === packageId) ?? packages[1];
    const perPropertyUsd = packageOffer.price + addOnTotal(packageAddOns[packageId] ?? []);
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
      const next = selected.includes(addOnId) ? selected.filter((item) => item !== addOnId) : [...selected, addOnId];
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
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length === 0) setSubmitted(true);
  };

  const navItems = [
    { href: '#services', label: getText(copy.nav.services, locale) },
    { href: '#pricing', label: getText(copy.nav.pricing, locale) },
    { href: '#approach', label: getText(copy.nav.approach, locale) },
    { href: '#booking', label: getText(copy.nav.booking, locale) },
  ];
  const quickAddOns = addOns.filter(({ id }) => quickAddOnIds.some((quickId) => quickId === id));
  const activePackageName = getText(chosenPackage.name, locale);

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
            {quickAddOns.map((addon) => {
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
      </article>
    );
  };

  return (
    <div id="top" dir={isArabic ? 'rtl' : 'ltr'} className={`noise locale-${locale} min-h-[100dvh] bg-[#f1ece3] text-[#1d2027]`}>
      <header className="absolute inset-x-0 top-0 z-40 border-b border-white/10">
        <div className="mx-auto flex h-[76px] max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:px-12">
          <Logo />
          <nav className="hidden items-center gap-8 lg:flex" aria-label={getText(copy.nav.services, locale)}>
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
            <nav className="flex flex-col gap-5" aria-label={getText(copy.nav.services, locale)}>
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
              <div className="reveal reveal-delay-2 mt-8 grid max-w-[850px] gap-8 sm:grid-cols-[1fr_auto] sm:items-end">
                <p className="max-w-[590px] text-base leading-7 text-[#f5eee3]/65 sm:text-lg">{getText(brand.support, locale)}</p>
                <div className="flex items-center gap-3">
                  <ArrowButton href="#pricing" light testId="button-hero-pricing">{getText(copy.hero.viewPricing, locale)}</ArrowButton>
                  <button type="button" onClick={() => setStoryOpen(true)} className="grid size-12 place-items-center rounded-full border border-[#d29a38] text-[#d29a38] transition-colors hover:bg-[#d29a38] hover:text-[#1d2027]" aria-label={getText(copy.hero.playReel, locale)} data-testid="button-play-reel"><ChevronRight className="size-5" /></button>
                </div>
              </div>
            </div>
            <div className="reveal reveal-delay-3 mt-14 grid grid-cols-2 gap-px border border-white/10 bg-white/10 sm:grid-cols-4">
              {proofPoints.map((point) => (
                <div className="bg-[#1d2027]/80 px-4 py-4 sm:px-5" key={point.label.en}>
                  <div className="display-font text-2xl text-[#f5eee3]">{point.value}</div>
                  <div className="mono-label mt-1 text-[8px] text-[#f5eee3]/45">{getText(point.label, locale)}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="absolute bottom-8 end-6 hidden items-center gap-3 lg:flex">
            <span className="mono-label text-[9px] text-[#f5eee3]/35">{getText(copy.hero.scroll, locale)}</span>
            <ArrowDownRight className="size-4 text-[#d29a38]" />
          </div>
        </section>

        <section className="border-y border-[#1d2027]/20 bg-[#d29a38]">
          <div className="mx-auto grid max-w-[1440px] gap-6 px-5 py-7 sm:px-8 lg:grid-cols-[.8fr_1.2fr] lg:items-center lg:px-12">
            <div className="flex items-center gap-4">
              <span className="grid size-12 shrink-0 place-items-center border border-[#1d2027]/30 text-xl font-bold">%</span>
              <div>
                <div className="mono-label text-[9px] text-[#1d2027]/60">{getText(copy.promotions.eyebrow, locale)}</div>
                <p className="mt-1 text-lg font-semibold leading-snug">{getText(copy.promotions.bundle, locale)}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 border-t border-[#1d2027]/20 pt-5 lg:border-s lg:border-t-0 lg:ps-8 lg:pt-0">
              <span className="display-font shrink-0 text-3xl">5→6</span>
              <div>
                <p className="text-base font-semibold leading-snug">{getText(copy.promotions.loyalty, locale)}</p>
                <p className="mt-1 text-xs text-[#1d2027]/60">{getText(copy.promotions.note, locale)}</p>
              </div>
            </div>
          </div>
        </section>

        <section id="services" className="mx-auto max-w-[1440px] px-5 py-24 sm:px-8 lg:px-12 lg:py-36">
          <div className="grid gap-14 lg:grid-cols-[.75fr_1.25fr] lg:gap-24">
            <div>
              <div className="mono-label flex items-center gap-3 text-[10px] text-[#ad6f18]"><span className="size-2 bg-[#d29a38]" /> {getText(copy.services.eyebrow, locale)}</div>
              <h2 className="display-font mt-6 max-w-[480px] text-5xl leading-[.98] tracking-[-.06em] sm:text-7xl">{getText(copy.services.titleLead, locale)} <span className="text-[#b9791d]">{getText(copy.services.titleAccent, locale)}</span></h2>
              <p className="mt-7 max-w-[430px] text-[15px] leading-7 text-[#53545a]">{getText(copy.services.description, locale)}</p>
              <a href="#approach" className="group mt-8 inline-flex items-center gap-2 border-b border-[#1d2027] pb-2 text-[11px] font-bold uppercase tracking-[.15em]">{getText(copy.services.link, locale)} <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" /></a>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {services.map((service, index) => (
                <button key={service.number} type="button" onClick={() => setActiveService(index)} className={`service-card group min-h-[230px] border p-6 text-start sm:p-7 ${activeService === index ? 'border-[#1d2027] bg-[#1d2027] text-[#f5eee3]' : 'border-[#d5cfc4] bg-[#ebe5da] hover:border-[#b9791d]'}`} aria-pressed={activeService === index}>
                  <div className="flex items-start justify-between"><span className={`display-font text-4xl ${activeService === index ? 'text-[#d29a38]' : 'text-[#bdb5a8]'}`}>{service.number}</span><span className={`mono-label text-[8px] ${activeService === index ? 'text-[#d29a38]' : 'text-[#8f8a83]'}`}>{service.mark}</span></div>
                  <div className="mt-12 flex items-end justify-between gap-4"><div><h3 className="display-font text-2xl leading-none">{getText(service.title, locale)}</h3><p className={`mt-3 text-xs leading-5 ${activeService === index ? 'text-[#f5eee3]/60' : 'text-[#68676a]'}`}>{getText(service.text, locale)}</p></div><span className={`grid size-9 shrink-0 place-items-center border ${activeService === index ? 'border-[#d29a38] text-[#d29a38]' : 'border-[#c4bbae] text-[#1d2027]'}`}>{activeService === index ? <Check className="size-4" /> : <Plus className="size-4" />}</span></div>
                </button>
              ))}
            </div>
          </div>
        </section>

        <section id="approach" className="relative overflow-hidden bg-[#20242c] text-[#f5eee3]">
          <div className="hero-grid absolute inset-0 opacity-30" />
          <div className="relative mx-auto grid max-w-[1440px] gap-14 px-5 py-24 sm:px-8 lg:grid-cols-[1fr_1fr] lg:gap-24 lg:px-12 lg:py-32">
            <div><div className="mono-label text-[10px] text-[#d29a38]">{getText(copy.approach.eyebrow, locale)}</div><h2 className="display-font mt-6 max-w-[590px] text-5xl leading-[.95] tracking-[-.06em] sm:text-7xl">{getText(copy.approach.titleLead, locale)} <span className="text-[#d29a38]">{getText(copy.approach.titleAccent, locale)}</span></h2><div className="gold-rule mt-9 max-w-[320px]" /><p className="mt-8 max-w-[500px] text-[15px] leading-7 text-[#f5eee3]/60">{getText(copy.approach.description, locale)}</p></div>
            <div className="grid gap-0 border-s border-white/15 ps-6 sm:ps-10">
              {copy.approach.steps.map((step) => <div key={step.number} className="group border-b border-white/15 py-7 first:pt-0 last:border-0"><div className="flex items-start gap-6"><span className="mono-label pt-1 text-[10px] text-[#d29a38]">{step.number}</span><div><h3 className="display-font text-2xl">{getText(step.title, locale)}</h3><p className="mt-2 max-w-[360px] text-sm leading-6 text-[#f5eee3]/50">{getText(step.text, locale)}</p></div><ArrowUpRight className="ms-auto size-4 text-[#d29a38] opacity-0 transition-opacity group-hover:opacity-100" /></div></div>)}
            </div>
          </div>
        </section>

        <section id="pricing" className="mx-auto max-w-[1440px] px-5 py-24 sm:px-8 lg:px-12 lg:py-36">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div><div className="mono-label flex items-center gap-3 text-[10px] text-[#ad6f18]"><span className="size-2 bg-[#d29a38]" /> {getText(copy.pricing.eyebrow, locale)}</div><h2 className="display-font mt-5 text-5xl tracking-[-.06em] sm:text-7xl">{getText(copy.pricing.titleLead, locale)} <span className="text-[#b9791d]">{getText(copy.pricing.titleAccent, locale)}</span></h2></div>
            <div className="flex flex-col items-start gap-4 sm:items-end"><p className="max-w-[260px] text-sm leading-6 text-[#68676a] sm:text-end">{getText(copy.pricing.description, locale)}</p><CurrencyToggle currency={currency} locale={locale} onChange={setCurrency} /></div>
          </div>

          <div className="mt-14">
            <div className="flex flex-col justify-between gap-2 border-b border-[#d5cfc4] pb-5 sm:flex-row sm:items-end"><div><div className="mono-label text-[10px] text-[#ad6f18]">01 / {getText(copy.pricing.residential, locale)}</div><h3 className="display-font mt-3 text-3xl tracking-[-.04em] sm:text-4xl">{getText(copy.pricing.residential, locale)}</h3></div><p className="text-sm text-[#68676a] sm:text-end">{getText(copy.pricing.residentialNote, locale)}</p></div>
            <div className="mt-8 grid items-stretch gap-4 lg:grid-cols-3">{packages.filter((item) => item.category === 'residential').map((item, index) => renderPackageCard(item, index))}</div>
          </div>

          <div className="mt-24">
            <div className="flex flex-col justify-between gap-2 border-b border-[#d5cfc4] pb-5 sm:flex-row sm:items-end"><div><div className="mono-label text-[10px] text-[#ad6f18]">02 / {getText(copy.pricing.commercialLand, locale)}</div><h3 className="display-font mt-3 text-3xl tracking-[-.04em] sm:text-4xl">{getText(copy.pricing.commercialLand, locale)}</h3></div><p className="text-sm text-[#68676a] sm:text-end">{getText(copy.pricing.commercialLandNote, locale)}</p></div>
            <div className="mt-8 grid gap-4 lg:grid-cols-[.72fr_1.28fr]">
              <div className="relative min-h-[390px] overflow-hidden bg-[#1d2027] text-[#f5eee3]">
                <img src="/assets/sultan-commercial.jpg" alt="" className="absolute inset-0 h-full w-full object-cover opacity-60 mix-blend-luminosity" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1d2027] via-[#1d2027]/45 to-transparent" />
                <div className="relative flex h-full flex-col justify-between p-7 sm:p-9"><div className="mono-label text-[9px] text-[#d29a38]">LAND / COMMERCIAL / INDUSTRIAL</div><div><div className="display-font text-4xl leading-none sm:text-5xl">{isArabic ? 'المساحة،' : 'The footprint,'}<br /><span className="text-[#d29a38]">{isArabic ? 'بوضوح.' : 'made clear.'}</span></div><p className="mt-4 max-w-[270px] text-sm leading-6 text-[#f5eee3]/60">{getText(copy.pricing.commercialLandNote, locale)}</p></div></div>
              </div>
              <div className="grid items-stretch gap-4 sm:grid-cols-2">{packages.filter((item) => item.category === 'land-commercial').map((item, index) => renderPackageCard(item, index))}</div>
            </div>
          </div>
        </section>

        <section id="addons" className="border-y border-[#d5cfc4] bg-[#e8e1d6]">
          <div className="mx-auto grid max-w-[1440px] gap-10 px-5 py-16 sm:px-8 lg:grid-cols-[.75fr_1.25fr] lg:px-12">
            <div><div className="mono-label text-[10px] text-[#ad6f18]">{getText(copy.estimator.addOnsTitle, locale)}</div><h2 className="display-font mt-5 text-4xl tracking-[-.05em] sm:text-5xl">{getText(copy.estimator.titleLead, locale)} <span className="text-[#b9791d]">{getText(copy.estimator.titleAccent, locale)}</span></h2><p className="mt-4 max-w-[390px] text-sm leading-6 text-[#68676a]">{interpolate(getText(copy.estimator.description, locale), { package: activePackageName })}</p></div>
            <div className="border border-[#cfc7ba] bg-[#f1ece3]">
              <div className="flex flex-col gap-5 border-b border-[#d5cfc4] px-5 py-5 sm:flex-row sm:items-center sm:justify-between">
                <div><span className="mono-label text-[9px] text-[#68676a]">{getText(copy.estimator.estimateLabel, locale)} · {activePackageName}</span><div className="mt-2 flex items-center gap-2"><button type="button" onClick={() => changePropertyCount(propertyCount - 1)} className="grid size-8 place-items-center border border-[#cfc7ba] text-lg hover:border-[#b9791d]" aria-label={getText(copy.estimator.propertyMinus, locale)} data-testid="button-property-minus">−</button><input type="number" min="1" max="50" value={propertyCount} onChange={(event) => changePropertyCount(Number(event.target.value))} className="!w-16 !px-2 !py-1 text-center text-lg font-semibold" aria-label={getText(copy.estimator.propertyCount, locale)} data-testid="input-property-count" /><button type="button" onClick={() => changePropertyCount(propertyCount + 1)} className="grid size-8 place-items-center border border-[#cfc7ba] text-lg hover:border-[#b9791d]" aria-label={getText(copy.estimator.propertyPlus, locale)} data-testid="button-property-plus">+</button><span className="ms-2 text-xs text-[#68676a]">{getText(copy.estimator.propertyCount, locale)}</span></div></div>
                <span className="display-font text-3xl">{formatMoney(currentEstimate.totalUsd, currency, locale)}</span>
              </div>
              <div className="divide-y divide-[#d5cfc4]">
                <div className="flex items-center justify-between gap-4 px-5 py-4 text-sm"><span className="text-[#68676a]">{getText(copy.estimator.base, locale)} × {propertyCount}</span><span className="font-semibold">{formatMoney(currentEstimate.grossUsd, currency, locale)}</span></div>
                {currentEstimate.offer !== 'none' ? <div className="flex items-center justify-between gap-4 px-5 py-4 text-sm text-[#8d671e]"><span>{getText(currentEstimate.offer === 'loyalty' ? copy.estimator.loyaltySavings : copy.estimator.bundleSavings, locale)}</span><span className="font-semibold">−{formatMoney(currentEstimate.savingsUsd, currency, locale)}</span></div> : <div className="px-5 py-4 text-xs text-[#7e7b78]">{getText(copy.estimator.noSavings, locale)}</div>}
                {addOns.map((addon) => {
                  const checked = selectedOptions.includes(addon.id);
                  return <label key={addon.id} className="flex w-full cursor-pointer items-center gap-4 px-5 py-4 text-start transition-colors hover:bg-[#e8e1d6]"><input type="checkbox" className="sr-only" checked={checked} onChange={() => togglePackageAddOn(selectedPackage, addon.id)} data-testid={`checkbox-estimator-${addon.id}`} /><span className={`grid size-5 place-items-center border ${checked ? 'border-[#1d2027] bg-[#1d2027] text-[#d29a38]' : 'border-[#ada69c]'}`}>{checked && <Check className="size-3.5" />}</span><span className="flex-1"><span className="block text-sm font-semibold">{getText(addon.name, locale)}</span><span className="mt-1 block text-xs text-[#7e7b78]">{getText(addon.note, locale)}</span></span><span className="text-sm font-semibold">+{formatMoney(addon.price * propertyCount, currency, locale)}</span></label>;
                })}
              </div>
              <div className="flex flex-col gap-4 border-t border-[#d5cfc4] px-5 py-5 sm:flex-row sm:items-center sm:justify-between"><span className="text-xs leading-5 text-[#68676a]">{getText(copy.estimator.notStacked, locale)} {getText(copy.estimator.confirmation, locale)}</span><button type="button" onClick={() => scrollToBooking()} className="group inline-flex items-center gap-2 text-start text-[10px] font-bold uppercase tracking-[.16em]" data-testid="button-estimator-book">{getText(copy.estimator.continue, locale)} <ArrowUpRight className="size-4 text-[#ad6f18] transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" /></button></div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[1440px] px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_.9fr]">
            <div className="relative min-h-[420px] overflow-hidden bg-[#1d2027] p-7 text-[#f5eee3] sm:p-10"><img src={isArabic ? '/assets/price-list-ar.png' : '/assets/price-list-en.png'} alt={getText(copy.reference.alt, locale)} className="absolute inset-0 h-full w-full object-cover opacity-25 mix-blend-screen" /><div className="absolute inset-0 bg-gradient-to-tr from-[#1d2027] via-[#1d2027]/75 to-transparent" /><div className="relative flex h-full flex-col justify-between"><div className="flex items-center justify-between"><span className="mono-label text-[9px] text-[#d29a38]">{getText(copy.reference.eyebrow, locale)}</span><span className="border border-[#f5eee3]/25 px-2 py-1 text-[9px] text-[#f5eee3]/50">2026 / {getText(copy.reference.language, locale)}</span></div><div><h2 className="display-font max-w-[490px] text-4xl leading-[.98] tracking-[-.05em] sm:text-6xl">{getText(copy.reference.titleLead, locale)} <span className="text-[#d29a38]">{getText(copy.reference.titleAccent, locale)}</span></h2><p className="mt-5 max-w-[420px] text-sm leading-6 text-[#f5eee3]/60">{getText(copy.reference.description, locale)}</p></div></div></div>
            <div className="grid grid-cols-2 gap-3">{copy.reference.proof.map((item) => { const Icon = item.icon === 'plane' ? Plane : item.icon === 'camera' ? Camera : item.icon === 'orbit' ? Orbit : Grid3X3; return <div key={item.label.en} className="group flex min-h-[200px] flex-col justify-between border border-[#d5cfc4] bg-[#ebe5da] p-5 transition-colors hover:border-[#b9791d] sm:p-7"><Icon className="size-7 text-[#b9791d] transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" strokeWidth={1.25} /><div><div className="mono-label text-[9px] text-[#8e887f]">{getText(item.label, locale)}</div><div className="display-font mt-2 text-xl leading-tight">{getText(item.title, locale)}</div></div></div>; })}</div>
          </div>
        </section>

        <section id="booking" className="bg-[#d29a38]">
          <div className="mx-auto grid max-w-[1440px] gap-14 px-5 py-24 sm:px-8 lg:grid-cols-[.8fr_1.2fr] lg:gap-24 lg:px-12 lg:py-32">
            <div><div className="mono-label text-[10px] text-[#1d2027]/60">{getText(copy.booking.eyebrow, locale)}</div><h2 className="display-font mt-6 max-w-[530px] text-5xl leading-[.92] tracking-[-.065em] sm:text-7xl">{getText(copy.booking.titleLead, locale)} <span className="text-[#f1ece3]">{getText(copy.booking.titleAccent, locale)}</span></h2><p className="mt-7 max-w-[420px] text-sm leading-6 text-[#1d2027]/70">{getText(copy.booking.description, locale)}</p><div className="mt-12 space-y-4 border-t border-[#1d2027]/20 pt-6"><a href={`tel:${brand.whatsapp}`} className="flex items-center gap-3 text-sm font-semibold"><Phone className="size-4" /> {brand.phone}</a><a href={`https://instagram.com/${brand.instagram.replace('@', '')}`} target="_blank" rel="noreferrer" className="flex items-center gap-3 text-sm font-semibold"><Instagram className="size-4" /> {brand.instagram}</a><div className="flex items-center gap-3 text-sm font-semibold"><MapPin className="size-4" /> {getText(brand.location, locale)}</div></div></div>
            <div className="bg-[#f1ece3] p-6 sm:p-9">
              {submitted ? <div className="flex min-h-[500px] flex-col items-center justify-center text-center"><span className="grid size-16 place-items-center rounded-full bg-[#1d2027] text-[#d29a38]"><CircleCheck className="size-8" /></span><div className="mono-label mt-7 text-[10px] text-[#ad6f18]">{getText(copy.booking.received, locale)}</div><h3 className="display-font mt-4 text-4xl tracking-[-.05em]">{getText(copy.booking.receivedTitle, locale)}</h3><p className="mt-4 max-w-[360px] text-sm leading-6 text-[#68676a]">{interpolate(getText(copy.booking.receivedText, locale), { name: form.name.split(' ')[0] || (isArabic ? 'صديقي' : 'there') })}</p><p className="mt-4 text-sm font-semibold text-[#8d671e]">{formatMoney(currentEstimate.totalUsd, currency, locale)} · {propertyCount} {getText(copy.estimator.propertyCount, locale)}</p><button type="button" onClick={() => { setSubmitted(false); setForm(initialForm); setPackageAddOns(emptySelections()); }} className="mt-8 border-b border-[#1d2027] pb-2 text-[10px] font-bold uppercase tracking-[.15em]">{getText(copy.booking.another, locale)}</button></div> : <form onSubmit={submitBooking} noValidate><div className="mb-8 flex items-center justify-between border-b border-[#d5cfc4] pb-5"><span className="mono-label text-[10px] text-[#68676a]">{getText(copy.booking.projectDetails, locale)}</span><span className="text-xs text-[#8a8781]">{getText(copy.booking.step, locale)}</span></div><div className="grid gap-5 sm:grid-cols-2"><Field label={getText(copy.booking.fields.name, locale)} error={errors.name}><input value={form.name} onChange={(event) => updateField('name', event.target.value)} placeholder={getText(copy.booking.placeholders.name, locale)} /></Field><Field label={getText(copy.booking.fields.email, locale)} error={errors.email}><input type="email" value={form.email} onChange={(event) => updateField('email', event.target.value)} placeholder={getText(copy.booking.placeholders.email, locale)} /></Field><Field label={getText(copy.booking.fields.phone, locale)} error={errors.phone}><input type="tel" value={form.phone} onChange={(event) => updateField('phone', event.target.value)} placeholder={getText(copy.booking.placeholders.phone, locale)} /></Field><Field label={getText(copy.booking.fields.date, locale)} error={errors.date}><input type="date" value={form.date} onChange={(event) => updateField('date', event.target.value)} /></Field><div className="sm:col-span-2"><Field label={getText(copy.booking.fields.address, locale)} error={errors.address}><input value={form.address} onChange={(event) => updateField('address', event.target.value)} placeholder={getText(copy.booking.placeholders.address, locale)} /></Field></div><Field label={getText(copy.booking.fields.squareFootage, locale)} error={errors.squareFootage}><input type="number" min="1" value={form.squareFootage} onChange={(event) => updateField('squareFootage', event.target.value)} placeholder={getText(copy.booking.placeholders.squareFootage, locale)} /></Field><Field label={getText(copy.booking.fields.propertyCount, locale)} error={errors.propertyCount}><input type="number" min="1" max="50" value={form.propertyCount} onChange={(event) => updateField('propertyCount', event.target.value)} placeholder={getText(copy.booking.placeholders.propertyCount, locale)} /></Field><div className="sm:col-span-2"><Field label={getText(copy.booking.fields.package, locale)} error={errors.packageId}><div className="relative"><select value={form.packageId} onChange={(event) => { updateField('packageId', event.target.value); setSelectedPackage(event.target.value); }}>{packages.map((item) => <option value={item.id} key={item.id}>{getText(item.name, locale)} — {formatMoney(item.price, currency, locale)} · {getText(item.measurement, locale)}</option>)}</select><ChevronDown className={`pointer-events-none absolute top-1/2 size-4 -translate-y-1/2 text-[#8a8781] ${isArabic ? 'left-3' : 'right-3'}`} /></div></Field></div></div><div className="mt-8 flex flex-col justify-between gap-5 border-t border-[#d5cfc4] pt-6 sm:flex-row sm:items-center"><p className="max-w-[260px] text-xs leading-5 text-[#8a8781]">{getText(copy.booking.disclaimer, locale)}</p><button type="submit" className="group inline-flex items-center justify-center gap-3 bg-[#1d2027] px-6 py-4 text-[10px] font-bold uppercase tracking-[.16em] text-[#f5eee3] transition-colors hover:bg-[#ad6f18]">{getText(copy.booking.submit, locale)} <Send className="size-4 transition-transform group-hover:translate-x-1" /></button></div></form>}
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-[#1d2027] text-[#f5eee3]"><div className="mx-auto max-w-[1440px] px-5 py-12 sm:px-8 lg:px-12"><div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1fr]"><div><Logo /><p className="mt-6 max-w-[250px] text-sm leading-6 text-[#f5eee3]/45">{getText(copy.footer.description, locale)}</p></div><div><div className="mono-label text-[9px] text-[#d29a38]">{getText(copy.footer.explore, locale)}</div><div className="mt-5 flex flex-col gap-3 text-sm text-[#f5eee3]/65"><a href="#services">{getText(copy.nav.services, locale)}</a><a href="#pricing">{getText(copy.nav.pricing, locale)}</a><a href="#approach">{getText(copy.nav.approach, locale)}</a></div></div><div><div className="mono-label text-[9px] text-[#d29a38]">{getText(copy.footer.contact, locale)}</div><div className="mt-5 flex flex-col gap-3 text-sm text-[#f5eee3]/65"><a href={`tel:${brand.whatsapp}`}>{brand.phone}</a><a href="#booking">{getText(copy.nav.booking, locale)}</a><span>{getText(brand.location, locale)}</span></div></div><div><div className="mono-label text-[9px] text-[#d29a38]">{getText(copy.footer.follow, locale)}</div><a href={`https://instagram.com/${brand.instagram.replace('@', '')}`} target="_blank" rel="noreferrer" className="mt-5 inline-flex items-center gap-2 text-sm text-[#f5eee3]/65"><Instagram className="size-4" /> {brand.instagram}</a></div></div><div className="mt-14 flex flex-col justify-between gap-3 border-t border-white/10 pt-5 text-[10px] text-[#f5eee3]/30 sm:flex-row"><span>{getText(copy.footer.reserved, locale)}</span><span className="mono-label text-[8px]">{getText(copy.footer.tagline, locale)}</span></div></div></footer>

      {storyOpen && <div className="fixed inset-0 z-50 grid place-items-center bg-[#1d2027]/90 p-5" role="dialog" aria-modal="true" aria-label={getText(copy.hero.playReel, locale)}><button type="button" className="absolute inset-0 cursor-default" onClick={() => setStoryOpen(false)} aria-label={getText(copy.reel.close, locale)} /><div className="relative z-10 w-full max-w-3xl border border-[#d29a38]/50 bg-[#20242c] p-6 text-[#f5eee3] sm:p-10"><button type="button" onClick={() => setStoryOpen(false)} className="absolute end-4 top-4 text-[#f5eee3]/60 hover:text-[#d29a38]" aria-label={getText(copy.reel.close, locale)}><X className="size-5" /></button><div className="hero-grid relative flex min-h-[360px] items-center justify-center overflow-hidden border border-white/10"><div className="absolute size-64 rounded-full border border-[#d29a38]/40 sm:size-80" /><div className="absolute size-44 rounded-full border border-[#d29a38]/30 sm:size-56" /><div className="relative text-center"><Plane className="mx-auto size-9 text-[#d29a38]" strokeWidth={1.2} /><div className="display-font mt-5 text-4xl tracking-[-.05em]">{getText(copy.reel.titleLead, locale)} <span className="text-[#d29a38]">{getText(copy.reel.titleAccent, locale)}</span></div><div className="mono-label mt-4 text-[9px] text-[#f5eee3]/45">{getText(copy.reel.label, locale)}</div></div></div></div></div>}
    </div>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: ReactNode }) {
  return <label className="block"><span className="mono-label mb-2 block text-[9px] text-[#68676a]">{label}</span>{children}{error && <span className="mt-1 block text-[10px] text-[#b43c2e]">{error}</span>}</label>;
}

export default App;