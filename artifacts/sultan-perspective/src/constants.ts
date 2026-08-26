export type PackageOffer = {
  id: string;
  name: string;
  eyebrow: string;
  price: number;
  unit: string;
  description: string;
  features: string[];
  tone: 'dark' | 'gold' | 'light';
};

export const brand = {
  name: 'Sultan Perspective',
  shortName: 'SP',
  phone: '+961 70 942 188',
  whatsapp: '+96170942188',
  instagram: '@sultanperspective',
  location: 'Lebanon · On location',
  headline: 'Elevate Your Listings with Next-Gen Spatial Media',
  support:
    'Give buyers a reason to lean in. From immersive 360° virtual tours and ultra-wide interior photography to high-altitude drone shots, we turn space into proof of value.',
};

export const packages: PackageOffer[] = [
  {
    id: 'standard',
    name: 'Standard Listing',
    eyebrow: 'Essential coverage',
    price: 77,
    unit: 'per property',
    description: 'A precise visual foundation for apartments, villas, and smaller spaces.',
    features: ['Aerial drone photos', '2D floor plan', '360° virtual tour'],
    tone: 'light',
  },
  {
    id: 'pro',
    name: 'Pro Interactive',
    eyebrow: 'Most requested',
    price: 129,
    unit: 'per property',
    description: 'The complete listing story, designed to make a scroll stop.',
    features: ['Interior + exterior photos', 'Aerial video up to 30 seconds', '5 interactive points'],
    tone: 'gold',
  },
  {
    id: 'ultimate',
    name: 'Ultimate Drone & 360',
    eyebrow: 'Full command',
    price: 207,
    unit: 'per property',
    description: 'Every angle, every detail, and a tour buyers can inhabit.',
    features: ['All Pro Interactive services', 'Aerial video up to 60 seconds', '10 interactive points', 'Virtual furnishing up to 5 rooms'],
    tone: 'dark',
  },
];

export const addOns = [
  { id: 'drone', name: 'Aerial Drone Shot', price: 100, note: 'Per flight' },
  { id: 'dusk', name: 'Dusk / Twilight Shooting', price: 75, note: 'Golden-hour timing' },
  { id: 'removal', name: 'Advanced AI Object Removal', price: 50, note: 'Per property' },
];

export const services = [
  {
    number: '01',
    title: 'Aerial intelligence',
    text: 'Show the address in context: boundaries, approach, view, and the story around the property.',
    mark: 'ALT / 01',
  },
  {
    number: '02',
    title: 'Cinematic stills',
    text: 'Ultra-wide interior photography that holds the room together without losing its character.',
    mark: 'FRAME / 02',
  },
  {
    number: '03',
    title: 'Walk-through worlds',
    text: '360° tours and interactive points that let a buyer self-qualify before the first call.',
    mark: 'ORBIT / 03',
  },
  {
    number: '04',
    title: 'Plans that sell',
    text: 'Readable 2D floor plans and property mapping that make the invisible instantly legible.',
    mark: 'GRID / 04',
  },
];

export const proofPoints = [
  { value: '360°', label: 'spatial capture' },
  { value: '01 day', label: 'typical delivery' },
  { value: '4K', label: 'aerial video' },
  { value: '2026', label: 'price list' },
];