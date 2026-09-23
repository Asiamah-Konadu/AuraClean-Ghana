export const SERVICES_DATA = [
  {
    id: 'standard-clean',
    name: 'Standard Home Cleaning',
    tagline: 'Regular maintenance for pristine, sanitized living spaces',
    basePrice: 250,
    priceUnit: 'per visit',
    iconName: 'Sparkles',
    badge: 'Popular for Homes',
    heroImage: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80',
    description: 'Perfect for busy professionals and families in Accra & Kumasi who want their apartment or house sparkling fresh on a regular basis.',
    features: [
      'Comprehensive dusting of all surfaces & skirting boards',
      'Vacuuming & scrubbing tile / terrazzo / hardwood floors',
      'Kitchen countertops, stovetop exterior & sinks sanitized',
      'Full bathroom scrubbing, shower glass & mirror polish',
      'Linen change, bed making & living room tidy-up',
      'Waste bin emptying & fresh Ghanaian trash liners'
    ],
    duration: '2 - 3.5 Hours',
    recommended: 'Weekly or Bi-Weekly',
    popular: false
  },
  {
    id: 'deep-clean',
    name: 'Luxury Deep Cleaning',
    tagline: 'Intensive top-to-bottom scrub tackling hidden grime & buildup',
    basePrice: 480,
    priceUnit: 'per session',
    iconName: 'ShieldCheck',
    badge: 'Most Requested',
    heroImage: 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=800&q=80',
    description: 'Our most comprehensive residential service. Ideal before holidays, after parties, or seasonal deep refreshment.',
    features: [
      'Everything in Standard Cleaning PLUS:',
      'Interior oven, microwave & stove deep degreasing',
      'Inside refrigerator scrubbing & antibacterial deodorizing',
      'Heavy tile grout descaling & limescale removal',
      'Cleaning behind and under heavy furniture & appliances',
      'Window sills, tracks, door frames, baseboards & ceiling fans',
      'High-touch hospital-grade antimicrobial disinfection'
    ],
    duration: '4 - 6 Hours',
    recommended: 'Monthly or Seasonal',
    popular: true
  },
  {
    id: 'post-construction',
    name: 'Post-Construction & Move-In',
    tagline: 'Heavy cement dust, plaster, paint splatter & debris removal',
    basePrice: 750,
    priceUnit: 'per property',
    iconName: 'Building2',
    badge: 'Heavy Duty',
    heroImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    description: 'Specialized heavy equipment clean for newly built houses, renovations, or tenant changeovers in East Legon, Cantonments, and beyond.',
    features: [
      'Drywall dust, cement plaster & paint splatter scraping',
      'Full interior/exterior window scraping & crystal finish',
      'Deep cabinet interiors, wardrobes & shelf wiping',
      'Polishing of all bathroom and electrical fixtures',
      'Industrial wet/dry extraction vacuuming',
      'Compound, balcony & porch pressure wash finish'
    ],
    duration: '6 - 10 Hours',
    recommended: 'One-Time Project',
    popular: false
  },
  {
    id: 'commercial-office',
    name: 'Commercial & Office Cleaning',
    tagline: 'Corporate hygiene, reception shine & productive work environments',
    basePrice: 600,
    priceUnit: 'per visit',
    iconName: 'Briefcase',
    badge: 'Corporate Choice',
    heroImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
    description: 'Tailored for tech hubs, financial institutions, embassies, and retail spaces in Ridge, Airport City, Osu, and Tema.',
    features: [
      'Workstations, monitors & conference room sanitization',
      'Lobby glass doors & high-traffic reception floor buffing',
      'Staff restrooms deep sterilization & consumables restock',
      'Pantry, microwave & coffee station cleaning',
      'Quiet after-hours or early morning scheduling',
      'Dedicated supervisor & background-vetted personnel'
    ],
    duration: 'Flexible Shifts',
    recommended: 'Contract (Daily / Weekly)',
    popular: false
  },
  {
    id: 'upholstery-carpet',
    name: 'Carpet & Upholstery Steam Wash',
    tagline: 'Deep injection steam extraction for couches, mattresses & rugs',
    basePrice: 350,
    priceUnit: 'per set',
    iconName: 'Armchair',
    badge: 'Specialist Care',
    heroImage: 'https://images.unsplash.com/photo-1558882224-dda166733046?auto=format&fit=crop&w=800&q=80',
    description: 'High-temperature industrial steam extraction that removes years of deep dust, food spills, pet stains, and dust mites.',
    features: [
      'Hot water extraction reaching deep fiber layers',
      'Targeted stain extraction (wine, tea, food, grease)',
      'Allergen, dust mite & odor neutralizing treatment',
      'Fabric conditioner infusion for vibrant color restoration',
      'Fast 3-4 hour rapid dry technology',
      'Leather sofa moisture restoration & conditioning'
    ],
    duration: '2 - 3 Hours',
    recommended: 'Every 3 - 6 Months',
    popular: false
  },
  {
    id: 'fumigation-pest',
    name: 'Fumigation & Pest Control',
    tagline: 'Certified safe pest eradication for mosquitoes, roaches & termites',
    basePrice: 400,
    priceUnit: 'per treatment',
    iconName: 'Bug',
    badge: 'Guaranteed 90 Days',
    heroImage: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?auto=format&fit=crop&w=800&q=80',
    description: 'EPA Ghana approved odorless and low-toxicity pest control for residential compounds, gardens, restaurants, and warehouses.',
    features: [
      'Targeted misting for mosquitoes, bedbugs & roaches',
      'Termite perimeter defense barrier injection',
      'Compound garden perimeter & drain larvicide spray',
      'Odorless, pet-safe and eco-conscious formulations',
      'Free follow-up inspection & 90-day warranty'
    ],
    duration: '2 - 4 Hours',
    recommended: 'Bi-Annual Protection',
    popular: false
  }
];

export const ADDONS_DATA = [
  { id: 'oven_fridge', name: 'Inside Fridge & Oven Scrub', price: 120, icon: 'Flame' },
  { id: 'windows_exterior', name: 'Exterior High Window Wash', price: 100, icon: 'Maximize' },
  { id: 'laundry_ironing', name: 'Laundry Wash & Steam Ironing', price: 150, icon: 'Shirt' },
  { id: 'pressure_wash', name: 'Compound & Driveway Pressure Wash', price: 200, icon: 'Droplets' },
  { id: 'water_tank', name: 'Overhead Poly-Tank Disinfection', price: 180, icon: 'Container' },
  { id: 'closet_org', name: 'Wardrobe & Closet Decluttering', price: 90, icon: 'Layers' }
];
