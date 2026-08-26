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
import { addOns, brand, packages, proofPoints, services } from '@/constants';

type FormValues = {
  name: string;
  email: string;
  phone: string;
  address: string;
  squareFootage: string;
  date: string;
  packageId: string;
};

const initialForm: FormValues = {
  name: '',
  email: '',
  phone: '',
  address: '',
  squareFootage: '',
  date: '',
  packageId: 'pro',
};

function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <a href="#top" className="group flex items-center gap-3" data-testid="link-brand-home">
      <span className="relative grid size-10 place-items-center border border-[#d29a38] bg-[#d29a38] text-[#1d2027]">
        <span className="absolute inset-1 border border-[#1d2027]/50" />
        <span className="display-font text-xl font-bold leading-none">S</span>
      </span>
      <span className={compact ? 'hidden sm:block' : 'block'}>
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

function ArrowButton({
  children,
  href,
  onClick,
  light = false,
  testId,
}: {
  children: string;
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
    return (
      <a href={href} onClick={onClick} className={classes} data-testid={testId}>
        {content}
      </a>
    );
  }
  return (
    <button type="button" onClick={onClick} className={classes} data-testid={testId}>
      {content}
    </button>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeService, setActiveService] = useState(0);
  const [selectedPackage, setSelectedPackage] = useState('pro');
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [storyOpen, setStoryOpen] = useState(false);
  const [form, setForm] = useState<FormValues>(initialForm);
  const [errors, setErrors] = useState<Partial<Record<keyof FormValues, string>>>({});
  const [submitted, setSubmitted] = useState(false);

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
  const total = useMemo(
    () => chosenPackage.price + selectedAddOns.reduce((sum, id) => sum + (addOns.find((item) => item.id === id)?.price ?? 0), 0),
    [chosenPackage.price, selectedAddOns],
  );

  const scrollToBooking = (packageId?: string) => {
    if (packageId) {
      setSelectedPackage(packageId);
      setForm((current) => ({ ...current, packageId }));
    }
    setMenuOpen(false);
    window.setTimeout(() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' }), 20);
  };

  const toggleAddOn = (id: string) => {
    setSelectedAddOns((current) => (current.includes(id) ? current.filter((item) => item !== id) : [...current, id]));
  };

  const updateField = (field: keyof FormValues, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
    if (errors[field]) setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const submitBooking = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors: Partial<Record<keyof FormValues, string>> = {};
    if (!form.name.trim()) nextErrors.name = 'Add your name';
    if (!/^\S+@\S+\.\S+$/.test(form.email)) nextErrors.email = 'Enter a valid email';
    if (!form.phone.trim()) nextErrors.phone = 'Add a phone number';
    if (!form.address.trim()) nextErrors.address = 'Add the property address';
    if (!form.squareFootage || Number(form.squareFootage) <= 0) nextErrors.squareFootage = 'Add the approximate size';
    if (!form.date) nextErrors.date = 'Choose a preferred date';
    if (!form.packageId) nextErrors.packageId = 'Choose a package';
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length === 0) setSubmitted(true);
  };

  const navItems = [
    { href: '#services', label: 'Services' },
    { href: '#pricing', label: 'Pricing' },
    { href: '#approach', label: 'Approach' },
    { href: '#booking', label: 'Book a shoot' },
  ];

  return (
    <div id="top" className="noise min-h-[100dvh] bg-[#f1ece3] text-[#1d2027]">
      <header className="absolute inset-x-0 top-0 z-40 border-b border-white/10">
        <div className="mx-auto flex h-[76px] max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:px-12">
          <Logo />
          <nav className="hidden items-center gap-8 lg:flex" aria-label="Main navigation">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-[10px] font-semibold uppercase tracking-[.17em] text-[#f5eee3]/65 transition-colors hover:text-[#d29a38]"
                data-testid={`link-nav-${item.label.toLowerCase().replaceAll(' ', '-')}`}
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="hidden items-center gap-4 sm:flex">
            <a href="tel:+96170942188" className="text-[11px] text-[#f5eee3]/55 hover:text-[#d29a38]" data-testid="link-header-phone">
              {brand.phone}
            </a>
            <ArrowButton href="#booking" light testId="button-header-book">Book a shoot</ArrowButton>
          </div>
          <button
            type="button"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMenuOpen((current) => !current)}
            className="grid size-11 place-items-center border border-white/20 text-[#f5eee3] lg:hidden"
            data-testid="button-mobile-menu"
          >
            {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
        {menuOpen && (
          <div className="border-t border-white/10 bg-[#1d2027] px-5 py-6 lg:hidden">
            <nav className="flex flex-col gap-5" aria-label="Mobile navigation">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-sm font-semibold uppercase tracking-[.16em] text-[#f5eee3]"
                  data-testid={`link-mobile-${item.label.toLowerCase().replaceAll(' ', '-')}`}
                >
                  {item.label}
                </a>
              ))}
              <a href="tel:+96170942188" className="border-t border-white/10 pt-5 text-xs text-[#d29a38]" data-testid="link-mobile-phone">
                {brand.phone}
              </a>
            </nav>
          </div>
        )}
      </header>

      <main>
        <section className="relative min-h-[760px] overflow-hidden bg-[#1d2027] text-[#f5eee3] sm:min-h-[820px]">
          <div className="hero-grid absolute inset-0 opacity-60" />
          <div className="absolute -right-32 top-24 h-[560px] w-[560px] rounded-full border border-[#d29a38]/30 sm:right-[-80px]">
            <div className="absolute inset-[14%] rounded-full border border-[#d29a38]/20" />
            <div className="absolute inset-[29%] rounded-full border border-[#d29a38]/20" />
          </div>
          <div className="absolute right-[12%] top-[34%] hidden h-px w-[420px] origin-right rotate-[-29deg] bg-[#d29a38]/70 lg:block" />
          <div className="absolute bottom-0 left-0 h-[42%] w-[60%] bg-gradient-to-t from-[#1d2027] to-transparent" />
          <div className="relative mx-auto flex min-h-[760px] max-w-[1440px] flex-col justify-end px-5 pb-12 pt-36 sm:min-h-[820px] sm:px-8 sm:pb-16 lg:px-12 lg:pb-20">
            <div className="max-w-[960px]">
              <div className="reveal mb-7 flex items-center gap-3">
                <span className="h-px w-10 bg-[#d29a38]" />
                <span className="mono-label text-[10px] text-[#d29a38]">Spatial media / Beirut & beyond</span>
              </div>
              <h1 className="display-font reveal reveal-delay-1 max-w-[920px] text-[clamp(3.2rem,8.4vw,8.3rem)] font-medium leading-[.9] tracking-[-.075em]">
                Elevate Your
                <span className="block text-[#d29a38]">Listings.</span>
              </h1>
              <div className="reveal reveal-delay-2 mt-8 grid max-w-[850px] gap-8 sm:grid-cols-[1fr_auto] sm:items-end">
                <p className="max-w-[590px] text-base leading-7 text-[#f5eee3]/65 sm:text-lg">
                  {brand.support}
                </p>
                <div className="flex items-center gap-3">
                  <ArrowButton href="#pricing" light testId="button-hero-pricing">View pricing</ArrowButton>
                  <button
                    type="button"
                    onClick={() => setStoryOpen(true)}
                    className="grid size-12 place-items-center rounded-full border border-[#d29a38] text-[#d29a38] transition-colors hover:bg-[#d29a38] hover:text-[#1d2027]"
                    aria-label="Play studio reel"
                    data-testid="button-play-reel"
                  >
                    <ChevronRight className="ml-0.5 size-5" />
                  </button>
                </div>
              </div>
            </div>
            <div className="reveal reveal-delay-3 mt-14 grid grid-cols-2 gap-px border border-white/10 bg-white/10 sm:grid-cols-4">
              {proofPoints.map((point) => (
                <div className="bg-[#1d2027]/80 px-4 py-4 sm:px-5" key={point.label} data-testid={`stat-proof-${point.label.replaceAll(' ', '-')}`}>
                  <div className="display-font text-2xl text-[#f5eee3]">{point.value}</div>
                  <div className="mono-label mt-1 text-[8px] text-[#f5eee3]/45">{point.label}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="absolute bottom-8 right-6 hidden items-center gap-3 lg:flex">
            <span className="mono-label text-[9px] text-[#f5eee3]/35">Scroll to explore</span>
            <ArrowDownRight className="size-4 text-[#d29a38]" />
          </div>
        </section>

        <section id="services" className="mx-auto max-w-[1440px] px-5 py-24 sm:px-8 lg:px-12 lg:py-36">
          <div className="grid gap-14 lg:grid-cols-[.75fr_1.25fr] lg:gap-24">
            <div>
              <div className="mono-label flex items-center gap-3 text-[10px] text-[#ad6f18]">
                <span className="size-2 bg-[#d29a38]" /> What we capture
              </div>
              <h2 className="display-font mt-6 max-w-[480px] text-5xl leading-[.98] tracking-[-.06em] sm:text-7xl">
                Space, seen with <span className="text-[#b9791d]">intent.</span>
              </h2>
              <p className="mt-7 max-w-[430px] text-[15px] leading-7 text-[#53545a]">
                A listing is more than its rooms. It is the light, the approach, the view, and the feeling of arriving home. We make each one impossible to miss.
              </p>
              <a href="#approach" className="group mt-8 inline-flex items-center gap-2 border-b border-[#1d2027] pb-2 text-[11px] font-bold uppercase tracking-[.15em]" data-testid="link-services-approach">
                Our approach <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </a>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {services.map((service, index) => (
                <button
                  key={service.number}
                  type="button"
                  onClick={() => setActiveService(index)}
                  className={`service-card group min-h-[230px] border p-6 text-left sm:p-7 ${
                    activeService === index ? 'border-[#1d2027] bg-[#1d2027] text-[#f5eee3]' : 'border-[#d5cfc4] bg-[#ebe5da] hover:border-[#b9791d]'
                  }`}
                  data-testid={`card-service-${service.number}`}
                  aria-pressed={activeService === index}
                >
                  <div className="flex items-start justify-between">
                    <span className={`display-font text-4xl ${activeService === index ? 'text-[#d29a38]' : 'text-[#bdb5a8]'}`}>{service.number}</span>
                    <span className={`mono-label text-[8px] ${activeService === index ? 'text-[#d29a38]' : 'text-[#8f8a83]'}`}>{service.mark}</span>
                  </div>
                  <div className="mt-12 flex items-end justify-between gap-4">
                    <div>
                      <h3 className="display-font text-2xl leading-none">{service.title}</h3>
                      <p className={`mt-3 text-xs leading-5 ${activeService === index ? 'text-[#f5eee3]/60' : 'text-[#68676a]'}`}>{service.text}</p>
                    </div>
                    <span className={`grid size-9 shrink-0 place-items-center border ${activeService === index ? 'border-[#d29a38] text-[#d29a38]' : 'border-[#c4bbae] text-[#1d2027]'}`}>
                      {activeService === index ? <Check className="size-4" /> : <Plus className="size-4" />}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>

        <section id="approach" className="relative overflow-hidden bg-[#20242c] text-[#f5eee3]">
          <div className="hero-grid absolute inset-0 opacity-30" />
          <div className="relative mx-auto grid max-w-[1440px] gap-14 px-5 py-24 sm:px-8 lg:grid-cols-[1fr_1fr] lg:gap-24 lg:px-12 lg:py-32">
            <div>
              <div className="mono-label text-[10px] text-[#d29a38]">The Sultan perspective</div>
              <h2 className="display-font mt-6 max-w-[590px] text-5xl leading-[.95] tracking-[-.06em] sm:text-7xl">
                Precision at every <span className="text-[#d29a38]">altitude.</span>
              </h2>
              <div className="gold-rule mt-9 max-w-[320px]" />
              <p className="mt-8 max-w-[500px] text-[15px] leading-7 text-[#f5eee3]/60">
                We pair a pilot’s eye for line and light with a buyer’s need for clarity. The result is not just beautiful media. It is a more confident next step.
              </p>
            </div>
            <div className="grid gap-0 border-l border-white/15 pl-6 sm:pl-10">
              {[
                ['01', 'Brief the address', 'We learn what makes the property valuable before we ever unpack a case.'],
                ['02', 'Capture the proof', 'Our team composes every frame, orbit, and plan for how buyers actually decide.'],
                ['03', 'Deliver the advantage', 'A clean, ready-to-publish media kit arrives fast, organized, and made to perform.'],
              ].map(([number, title, text]) => (
                <div key={number} className="group border-b border-white/15 py-7 first:pt-0 last:border-0">
                  <div className="flex items-start gap-6">
                    <span className="mono-label pt-1 text-[10px] text-[#d29a38]">{number}</span>
                    <div>
                      <h3 className="display-font text-2xl">{title}</h3>
                      <p className="mt-2 max-w-[360px] text-sm leading-6 text-[#f5eee3]/50">{text}</p>
                    </div>
                    <ArrowUpRight className="ml-auto size-4 text-[#d29a38] opacity-0 transition-opacity group-hover:opacity-100" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="pricing" className="mx-auto max-w-[1440px] px-5 py-24 sm:px-8 lg:px-12 lg:py-36">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <div className="mono-label flex items-center gap-3 text-[10px] text-[#ad6f18]"><span className="size-2 bg-[#d29a38]" /> 2026 price list</div>
              <h2 className="display-font mt-5 text-5xl tracking-[-.06em] sm:text-7xl">Choose your <span className="text-[#b9791d]">altitude.</span></h2>
            </div>
            <p className="max-w-[260px] text-sm leading-6 text-[#68676a]">Simple packages, transparent extras, and a finish worthy of the listing.</p>
          </div>
          <div className="mt-12 grid items-stretch gap-4 lg:grid-cols-3">
            {packages.map((item) => (
              <article key={item.id} className={`package-card relative flex flex-col border p-7 sm:p-8 ${item.tone === 'gold' ? 'border-[#b9791d] bg-[#d29a38]' : item.tone === 'dark' ? 'border-[#1d2027] bg-[#1d2027] text-[#f5eee3]' : 'border-[#d5cfc4] bg-[#ebe5da]'}`} data-testid={`card-package-${item.id}`}>
                {item.id === 'pro' && <div className="absolute -top-3 left-7 bg-[#1d2027] px-3 py-1 text-[9px] font-bold uppercase tracking-[.16em] text-[#d29a38]">Most requested</div>}
                <div className="flex items-start justify-between">
                  <span className={`mono-label text-[9px] ${item.tone === 'dark' ? 'text-[#d29a38]' : item.tone === 'gold' ? 'text-[#1d2027]/65' : 'text-[#8d671e]'}`}>{item.eyebrow}</span>
                  <span className={`text-[10px] ${item.tone === 'dark' ? 'text-[#f5eee3]/40' : 'text-[#1d2027]/40'}`}>0{packages.indexOf(item) + 1}</span>
                </div>
                <h3 className="display-font mt-12 text-3xl tracking-[-.04em]">{item.name}</h3>
                <p className={`mt-3 min-h-[48px] text-sm leading-6 ${item.tone === 'dark' ? 'text-[#f5eee3]/60' : 'text-[#1d2027]/60'}`}>{item.description}</p>
                <div className={`mt-8 flex items-end gap-2 border-b pb-6 ${item.tone === 'dark' ? 'border-white/15' : 'border-[#1d2027]/20'}`}>
                  <span className="display-font text-6xl leading-none">${item.price}</span>
                  <span className={`pb-1 text-[10px] ${item.tone === 'dark' ? 'text-[#f5eee3]/50' : 'text-[#1d2027]/50'}`}>{item.unit}</span>
                </div>
                <ul className="mt-6 flex-1 space-y-3">
                  {item.features.map((feature) => <li key={feature} className="flex items-start gap-3 text-sm"><Check className={`mt-0.5 size-4 shrink-0 ${item.tone === 'dark' ? 'text-[#d29a38]' : 'text-[#8d671e]'}`} /> <span>{feature}</span></li>)}
                </ul>
                <button type="button" onClick={() => scrollToBooking(item.id)} className={`group mt-8 flex items-center justify-between border-t pt-5 text-left text-[10px] font-bold uppercase tracking-[.16em] ${item.tone === 'dark' ? 'border-white/15 text-[#f5eee3]' : 'border-[#1d2027]/20 text-[#1d2027]'}`} data-testid={`button-select-package-${item.id}`}>
                  Select {item.name} <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </button>
              </article>
            ))}
          </div>
        </section>

        <section className="border-y border-[#d5cfc4] bg-[#e8e1d6]">
          <div className="mx-auto grid max-w-[1440px] gap-10 px-5 py-16 sm:px-8 lg:grid-cols-[.75fr_1.25fr] lg:px-12">
            <div>
              <div className="mono-label text-[10px] text-[#ad6f18]">Build your brief</div>
              <h2 className="display-font mt-5 text-4xl tracking-[-.05em] sm:text-5xl">Add the <span className="text-[#b9791d]">finishing moves.</span></h2>
              <p className="mt-4 max-w-[390px] text-sm leading-6 text-[#68676a]">Start from {chosenPackage.name}, then tune the coverage to match the property.</p>
            </div>
            <div className="border border-[#cfc7ba] bg-[#f1ece3]">
              <div className="flex items-center justify-between border-b border-[#d5cfc4] px-5 py-4">
                <span className="mono-label text-[9px] text-[#68676a]">Your estimate</span>
                <span className="display-font text-2xl">${total}</span>
              </div>
              <div className="divide-y divide-[#d5cfc4]">
                {addOns.map((addon) => {
                  const checked = selectedAddOns.includes(addon.id);
                  return (
                    <button type="button" key={addon.id} onClick={() => toggleAddOn(addon.id)} className="flex w-full items-center gap-4 px-5 py-5 text-left transition-colors hover:bg-[#e8e1d6]" data-testid={`button-addon-${addon.id}`} aria-pressed={checked}>
                      <span className={`grid size-5 place-items-center border ${checked ? 'border-[#1d2027] bg-[#1d2027] text-[#d29a38]' : 'border-[#ada69c]'}`}>{checked && <Check className="size-3.5" />}</span>
                      <span className="flex-1"><span className="block text-sm font-semibold">{addon.name}</span><span className="mt-1 block text-xs text-[#7e7b78]">{addon.note}</span></span>
                      <span className="text-sm font-semibold">+${addon.price}</span>
                    </button>
                  );
                })}
              </div>
              <div className="flex flex-col gap-4 border-t border-[#d5cfc4] px-5 py-5 sm:flex-row sm:items-center sm:justify-between">
                <span className="text-xs text-[#68676a]">Final quote confirmed after address review.</span>
                <button type="button" onClick={() => scrollToBooking()} className="group inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[.16em]" data-testid="button-estimator-book">Continue to booking <ArrowUpRight className="size-4 text-[#ad6f18] transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" /></button>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[1440px] px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_.9fr]">
            <div className="relative min-h-[420px] overflow-hidden bg-[#1d2027] p-7 text-[#f5eee3] sm:p-10">
              <img src="/assets/price-list-en.png" alt="Sultan Perspective 2026 English price list reference" className="absolute inset-0 h-full w-full object-cover opacity-25 mix-blend-screen" data-testid="img-price-reference" />
              <div className="absolute inset-0 bg-gradient-to-tr from-[#1d2027] via-[#1d2027]/75 to-transparent" />
              <div className="relative flex h-full flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="mono-label text-[9px] text-[#d29a38]">The source of truth</span>
                  <span className="border border-[#f5eee3]/25 px-2 py-1 text-[9px] text-[#f5eee3]/50">2026 / EN</span>
                </div>
                <div>
                  <h2 className="display-font max-w-[490px] text-4xl leading-[.98] tracking-[-.05em] sm:text-6xl">Built from a real-world price list. Refined for <span className="text-[#d29a38]">real decisions.</span></h2>
                  <p className="mt-5 max-w-[420px] text-sm leading-6 text-[#f5eee3]/60">The same essentials from our field pricing, presented with room to compare, customize, and book.</p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: Plane, label: 'Aerial', title: 'The address in context' },
                { icon: Camera, label: 'Interior', title: 'Light, line, and feeling' },
                { icon: Orbit, label: '360 tour', title: 'A buyer can linger' },
                { icon: Grid3X3, label: 'Mapping', title: 'Clarity beyond the frame' },
              ].map(({ icon: Icon, label, title }) => (
                <div key={label} className="group flex min-h-[200px] flex-col justify-between border border-[#d5cfc4] bg-[#ebe5da] p-5 transition-colors hover:border-[#b9791d] sm:p-7" data-testid={`card-proof-${label.replace(' ', '-')}`}>
                  <Icon className="size-7 text-[#b9791d] transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" strokeWidth={1.25} />
                  <div><div className="mono-label text-[9px] text-[#8e887f]">{label}</div><div className="display-font mt-2 text-xl leading-tight">{title}</div></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="booking" className="bg-[#d29a38]">
          <div className="mx-auto grid max-w-[1440px] gap-14 px-5 py-24 sm:px-8 lg:grid-cols-[.8fr_1.2fr] lg:gap-24 lg:px-12 lg:py-32">
            <div>
              <div className="mono-label text-[10px] text-[#1d2027]/60">Start a conversation</div>
              <h2 className="display-font mt-6 max-w-[530px] text-5xl leading-[.92] tracking-[-.065em] sm:text-7xl">Make the next listing the <span className="text-[#f1ece3]">one they remember.</span></h2>
              <p className="mt-7 max-w-[420px] text-sm leading-6 text-[#1d2027]/70">Tell us where to land. We will reply with availability, a tailored quote, and the clearest route to showing the property at its best.</p>
              <div className="mt-12 space-y-4 border-t border-[#1d2027]/20 pt-6">
                <a href={`tel:${brand.whatsapp}`} className="flex items-center gap-3 text-sm font-semibold" data-testid="link-booking-phone"><Phone className="size-4" /> {brand.phone}</a>
                <a href={`https://instagram.com/${brand.instagram.replace('@', '')}`} target="_blank" rel="noreferrer" className="flex items-center gap-3 text-sm font-semibold" data-testid="link-booking-instagram"><Instagram className="size-4" /> {brand.instagram}</a>
                <div className="flex items-center gap-3 text-sm font-semibold"><MapPin className="size-4" /> {brand.location}</div>
              </div>
            </div>
            <div className="bg-[#f1ece3] p-6 sm:p-9">
              {submitted ? (
                <div className="flex min-h-[480px] flex-col items-center justify-center text-center">
                  <span className="grid size-16 place-items-center rounded-full bg-[#1d2027] text-[#d29a38]"><CircleCheck className="size-8" /></span>
                  <div className="mono-label mt-7 text-[10px] text-[#ad6f18]">Request received</div>
                  <h3 className="display-font mt-4 text-4xl tracking-[-.05em]">We have your coordinates.</h3>
                  <p className="mt-4 max-w-[360px] text-sm leading-6 text-[#68676a]">Thank you, {form.name.split(' ')[0] || 'there'}. Sultan Perspective will be in touch shortly to confirm your shoot details.</p>
                  <button type="button" onClick={() => { setSubmitted(false); setForm(initialForm); setSelectedAddOns([]); }} className="mt-8 border-b border-[#1d2027] pb-2 text-[10px] font-bold uppercase tracking-[.15em]" data-testid="button-submit-another">Submit another request</button>
                </div>
              ) : (
                <form onSubmit={submitBooking} noValidate>
                  <div className="mb-8 flex items-center justify-between border-b border-[#d5cfc4] pb-5">
                    <span className="mono-label text-[10px] text-[#68676a]">Project details</span>
                    <span className="text-xs text-[#8a8781]">01 / 01</span>
                  </div>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label="Your name" error={errors.name}><input value={form.name} onChange={(event) => updateField('name', event.target.value)} placeholder="Full name" data-testid="input-name" /></Field>
                    <Field label="Email address" error={errors.email}><input type="email" value={form.email} onChange={(event) => updateField('email', event.target.value)} placeholder="you@studio.com" data-testid="input-email" /></Field>
                    <Field label="Phone number" error={errors.phone}><input type="tel" value={form.phone} onChange={(event) => updateField('phone', event.target.value)} placeholder="+961 ..." data-testid="input-phone" /></Field>
                    <Field label="Preferred date" error={errors.date}><input type="date" value={form.date} onChange={(event) => updateField('date', event.target.value)} data-testid="input-date" /></Field>
                    <div className="sm:col-span-2"><Field label="Property address" error={errors.address}><input value={form.address} onChange={(event) => updateField('address', event.target.value)} placeholder="Street, city, country" data-testid="input-address" /></Field></div>
                    <Field label="Approx. square footage" error={errors.squareFootage}><input type="number" min="1" value={form.squareFootage} onChange={(event) => updateField('squareFootage', event.target.value)} placeholder="e.g. 2400" data-testid="input-square-footage" /></Field>
                    <Field label="Package" error={errors.packageId}>
                      <div className="relative"><select value={form.packageId} onChange={(event) => { updateField('packageId', event.target.value); setSelectedPackage(event.target.value); }} data-testid="select-package">{packages.map((item) => <option value={item.id} key={item.id}>{item.name} — ${item.price}</option>)}</select><ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-[#8a8781]" /></div>
                    </Field>
                  </div>
                  <div className="mt-8 flex flex-col justify-between gap-5 border-t border-[#d5cfc4] pt-6 sm:flex-row sm:items-center">
                    <p className="max-w-[260px] text-xs leading-5 text-[#8a8781]">By sending this request, you are asking for availability, not confirming a booking.</p>
                    <button type="submit" className="group inline-flex items-center justify-center gap-3 bg-[#1d2027] px-6 py-4 text-[10px] font-bold uppercase tracking-[.16em] text-[#f5eee3] transition-colors hover:bg-[#ad6f18]" data-testid="button-submit-booking">Request availability <Send className="size-4 transition-transform group-hover:translate-x-1" /></button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-[#1d2027] text-[#f5eee3]">
        <div className="mx-auto max-w-[1440px] px-5 py-12 sm:px-8 lg:px-12">
          <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
            <div><Logo /><p className="mt-6 max-w-[250px] text-sm leading-6 text-[#f5eee3]/45">Precision, altitude, and cinematic proof of value for properties that deserve a second look.</p></div>
            <div><div className="mono-label text-[9px] text-[#d29a38]">Explore</div><div className="mt-5 flex flex-col gap-3 text-sm text-[#f5eee3]/65"><a href="#services" className="hover:text-[#d29a38]" data-testid="link-footer-services">Services</a><a href="#pricing" className="hover:text-[#d29a38]" data-testid="link-footer-pricing">Pricing</a><a href="#approach" className="hover:text-[#d29a38]" data-testid="link-footer-approach">Approach</a></div></div>
            <div><div className="mono-label text-[9px] text-[#d29a38]">Contact</div><div className="mt-5 flex flex-col gap-3 text-sm text-[#f5eee3]/65"><a href={`tel:${brand.whatsapp}`} className="hover:text-[#d29a38]" data-testid="link-footer-phone">{brand.phone}</a><a href="#booking" className="hover:text-[#d29a38]" data-testid="link-footer-book">Book a shoot</a><span>{brand.location}</span></div></div>
            <div><div className="mono-label text-[9px] text-[#d29a38]">Follow the frame</div><a href={`https://instagram.com/${brand.instagram.replace('@', '')}`} target="_blank" rel="noreferrer" className="mt-5 inline-flex items-center gap-2 text-sm text-[#f5eee3]/65 hover:text-[#d29a38]" data-testid="link-footer-instagram"><Instagram className="size-4" /> {brand.instagram}</a></div>
          </div>
          <div className="mt-14 flex flex-col justify-between gap-3 border-t border-white/10 pt-5 text-[10px] text-[#f5eee3]/30 sm:flex-row"><span>© 2026 Sultan Perspective. All coordinates reserved.</span><span className="mono-label text-[8px]">See more. Feel more. Move sooner.</span></div>
        </div>
      </footer>

      {storyOpen && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-[#1d2027]/90 p-5" role="dialog" aria-modal="true" aria-label="Sultan Perspective studio reel">
          <button type="button" className="absolute inset-0 cursor-default" onClick={() => setStoryOpen(false)} aria-label="Close reel" data-testid="button-close-reel-backdrop" />
          <div className="relative z-10 w-full max-w-3xl border border-[#d29a38]/50 bg-[#20242c] p-6 text-[#f5eee3] sm:p-10">
            <button type="button" onClick={() => setStoryOpen(false)} className="absolute right-4 top-4 text-[#f5eee3]/60 hover:text-[#d29a38]" aria-label="Close reel" data-testid="button-close-reel"><X className="size-5" /></button>
            <div className="hero-grid relative flex min-h-[360px] items-center justify-center overflow-hidden border border-white/10">
              <div className="absolute size-64 rounded-full border border-[#d29a38]/40 sm:size-80" />
              <div className="absolute size-44 rounded-full border border-[#d29a38]/30 sm:size-56" />
              <div className="relative text-center"><Plane className="mx-auto size-9 text-[#d29a38]" strokeWidth={1.2} /><div className="display-font mt-5 text-4xl tracking-[-.05em]">Every angle <span className="text-[#d29a38]">counts.</span></div><div className="mono-label mt-4 text-[9px] text-[#f5eee3]/45">A 30-second studio reel / coming in hot</div></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="mono-label mb-2 block text-[9px] text-[#68676a]">{label}</span>
      {children}
      {error && <span className="mt-1 block text-[10px] text-[#b43c2e]" data-testid={`error-${label.toLowerCase().replaceAll(' ', '-')}`}>{error}</span>}
    </label>
  );
}

export default App;