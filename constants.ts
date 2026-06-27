
import { Project, Event, Testimonial, NavLink } from './types';

// New interface for Blog Content
export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string; // Markdown supported
  author: string;
  date: string;
  image: string;
  category: string;
  slug: string;
}

export const navLinks: NavLink[] = [
    { name: 'Services', path: '/services' },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'FANN Studio', path: '/fann-studio' },
    { 
        name: 'Resources', 
        children: [
            { name: 'Cost Calculator', path: '/resources/cost-calculator' },
            { name: 'Exhibition Guide', path: '/resources/exhibition-guide' },
            { name: '2026 Trends Report', path: '/resources/trends-2026' },
            { name: 'Events Calendar', path: '/events-calendar' },
            { name: 'ROI Calculator', path: '/roi-calculator' },
            { name: 'Intelligence Hub', path: '/insights' },
        ] 
    },
    { 
        name: 'About Us', 
        children: [
            { name: 'About FANN', path: '/about' },
            { name: 'Contact Us', path: '/contact' },
        ] 
    },
];

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    slug: 'how-to-choose-exhibition-stand-builder-dubai',
    title: 'How to Choose the Right Exhibition Stand Builder in Dubai',
    author: 'FANN Editorial',
    date: 'Oct 24, 2025',
    category: 'Guides',
    image: 'https://images.pexels.com/photos/2608517/pexels-photo-2608517.jpeg?auto=compress&cs=tinysrgb&w=800',
    excerpt: 'Finding a reliable contractor for GITEX or Gulfood can be daunting. We break down the top 5 things to look for in a Dubai partner.',
    content: `
      ## Why Experience in Dubai Venues Matters
      Dubai World Trade Centre (DWTC) and ADNEC have specific regulations. A local builder understands the paperwork...
      
      ## Key Checklist for Your Builder
      1. **In-house production:** Do they have their own workshop?
      2. **Portfolio:** Check their recent work at major shows.
      3. **Logistics:** How do they handle transport and installation?
    `
  }
];

export const supportedLanguages = [
  { code: 'en', name: 'English' },
  { code: 'ar', name: 'Arabic' },
  { code: 'zh-CN', name: 'Chinese (Simp.)' },
  { code: 'hi', name: 'Hindi' },
  { code: 'es', name: 'Spanish' },
  { code: 'fr', name: 'French' },
  { code: 'ru', name: 'Russian' },
  { code: 'de', name: 'German' },
  { code: 'ja', name: 'Japanese' },
  { code: 'pt', name: 'Portuguese' },
  { code: 'tr', name: 'Turkish' },
];

export const projects: Project[] = [
  // --- EXHIBITIONS: TECHNOLOGY ---
  {
    id: 1,
    slug: "deloitte-gitex-2024-enterprise-ai",
    title: "GITEX Global 2024 - Enterprise AI",
    subtitle: "Premium double-decker stand showcasing AI consulting services.",
    client: "Deloitte Middle East",
    category: "exhibition",
    size: "120 sqm",
    configuration: "Island",
    location: "Dubai World Trade Centre",
    industry: "Technology",
    year: 2024,
    description: "A futuristic double-decker stand featuring interactive AI touchpoints, LED video walls, and a VIP meeting lounge on the upper deck. Designed to position Deloitte as a leader in Enterprise AI.",
    image: "https://images.unsplash.com/photo-1550305080-4e029753abcf?w=1200&q=80",
    heroImage: "https://images.unsplash.com/photo-1550305080-4e029753abcf?w=1920&q=90",
    tags: ["Technology", "GITEX", "Double Decker", "Premium"],
    featured: true
  },
  {
    id: 2,
    slug: "microsoft-azure-gitex-2023",
    title: "GITEX 2023 - Cloud Infrastructure",
    client: "Microsoft Azure",
    category: "exhibition",
    size: "95 sqm",
    configuration: "Peninsula",
    location: "Dubai World Trade Centre",
    industry: "Technology",
    year: 2023,
    description: "Modern stand featuring cloud computing demos, server rack displays, and a developer workshop area. Clean blue and white branding with interactive zones.",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200&q=80",
    tags: ["Technology", "Cloud", "GITEX"],
    featured: false
  },
  {
    id: 3,
    slug: "ericsson-gitex-2022",
    title: "GITEX 2022 - 5G Solutions",
    client: "Ericsson Middle East",
    category: "exhibition",
    size: "18 sqm",
    configuration: "Inline",
    location: "Dubai World Trade Centre",
    industry: "Telecommunications",
    year: 2022,
    description: "Compact stand demonstrating 5G technology with live network visualization on LED screens and IoT applications. Efficient use of space.",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1200&q=80",
    tags: ["Technology", "Telecom", "GITEX", "Small"],
    featured: false
  },
  {
    id: 4,
    slug: "schneider-electric-big-5-2024",
    title: "The Big 5 Dubai 2024",
    client: "Schneider Electric",
    category: "exhibition",
    size: "72 sqm",
    configuration: "Peninsula",
    location: "Dubai World Trade Centre",
    industry: "Construction Technology",
    year: 2024,
    description: "Technical stand featuring smart building solutions, electrical panels, and energy management automation demos.",
    image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=1200&q=80",
    tags: ["Construction", "Technology", "Big 5"],
    featured: false
  },
  {
    id: 5,
    slug: "philips-big-5-2022",
    title: "The Big 5 2022 - Smart Lighting",
    client: "Philips Lighting Middle East",
    category: "exhibition",
    size: "28 sqm",
    configuration: "Inline",
    location: "Dubai World Trade Centre",
    industry: "Construction",
    year: 2022,
    description: "Showcase stand featuring architectural LED lighting solutions with working demos and a design consultation area.",
    image: "https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=1200&q=80",
    tags: ["Construction", "Lighting", "Big 5", "Small"],
    featured: false
  },

  // --- EXHIBITIONS: HEALTHCARE ---
  {
    id: 6,
    slug: "siemens-healthineers-arab-health-2024",
    title: "Arab Health 2024 - Medical Imaging",
    client: "Siemens Healthineers",
    category: "exhibition",
    size: "96 sqm",
    configuration: "Island",
    location: "Dubai World Trade Centre",
    industry: "Healthcare",
    year: 2024,
    description: "Sophisticated stand displaying advanced MRI and CT equipment with clinical consultation zones and technical demonstration areas.",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&q=80",
    tags: ["Healthcare", "Arab Health", "Medical Equipment"],
    featured: true
  },
  {
    id: 7,
    slug: "julphar-arab-health-2023",
    title: "Arab Health 2023 - Pharmaceutical Solutions",
    client: "Julphar Pharmaceuticals",
    category: "exhibition",
    size: "32 sqm",
    configuration: "Corner",
    location: "Dubai World Trade Centre",
    industry: "Pharmaceuticals",
    year: 2023,
    description: "Professional pharma stand with product displays, consultation area, and educational materials. Clean white and blue healthcare aesthetic.",
    image: "https://images.unsplash.com/photo-1631217868269-dfc1c5c3e042?w=1200&q=80",
    tags: ["Healthcare", "Pharma", "Arab Health", "Small"],
    featured: false
  },
  {
    id: 8,
    slug: "cerner-arab-health-2022",
    title: "Arab Health 2022 - Healthcare IT",
    client: "Cerner Middle East",
    category: "exhibition",
    size: "24 sqm",
    configuration: "Inline",
    location: "Dubai World Trade Centre",
    industry: "Healthcare Technology",
    year: 2022,
    description: "Compact tech-focused stand showcasing electronic health records and digital health solutions with demo stations.",
    image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?w=1200&q=80",
    tags: ["Healthcare", "Technology", "Arab Health", "Small"],
    featured: false
  },

  // --- EXHIBITIONS: FOOD & BEVERAGE ---
  {
    id: 9,
    slug: "lactalis-gulfood-2024",
    title: "Gulfood 2024 - Dairy Products",
    client: "Lactalis Group",
    category: "exhibition",
    size: "64 sqm",
    configuration: "Peninsula",
    location: "Dubai World Trade Centre",
    industry: "Food & Beverage",
    year: 2024,
    description: "Elegant stand with refrigerated displays, tasting bar, and product showcase. Warm wood finishes with premium branding.",
    image: "https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=1200&q=80",
    tags: ["Food & Beverage", "Gulfood", "Premium"],
    featured: true
  },
  {
    id: 10,
    slug: "agthia-gulfood-2023",
    title: "Gulfood 2023 - UAE Food Brands",
    client: "Agthia Group",
    category: "exhibition",
    size: "48 sqm",
    configuration: "Corner",
    location: "Dubai World Trade Centre",
    industry: "Food & Beverage",
    year: 2023,
    description: "Modern stand showcasing Al Ain water, juice, and dairy products with interactive sampling stations and sustainability messaging.",
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=1200&q=80",
    tags: ["Food & Beverage", "Gulfood", "UAE Brands"],
    featured: false
  },
  {
    id: 11,
    slug: "monin-gulfood-2022",
    title: "Gulfood 2022 - Coffee & Beverages",
    client: "Monin Middle East",
    category: "exhibition",
    size: "20 sqm",
    configuration: "Inline",
    location: "Dubai World Trade Centre",
    industry: "Beverages",
    year: 2022,
    description: "Compact cafe-style stand with live barista demos, product tasting, and vibrant branding. Efficient small-space design.",
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=1200&q=80",
    tags: ["Food & Beverage", "Gulfood", "Small", "Beverages"],
    featured: false
  },

  // --- EXHIBITIONS: CONSTRUCTION ---
  {
    id: 12,
    slug: "al-ghurair-big-5-2023",
    title: "The Big 5 2023 - Building Materials",
    client: "Al Ghurair Iron & Steel",
    category: "exhibition",
    size: "56 sqm",
    configuration: "Corner",
    location: "Dubai World Trade Centre",
    industry: "Construction Materials",
    year: 2023,
    description: "Industrial stand displaying steel products, technical specifications, and construction applications with material samples.",
    image: "https://images.unsplash.com/photo-1531834685032-c34bf0d84c7c?w=1200&q=80",
    tags: ["Construction", "Materials", "Big 5"],
    featured: false
  },

  // --- EXHIBITIONS: AUTOMOTIVE ---
  {
    id: 13,
    slug: "bosch-automechanika-2024",
    title: "Automechanika Dubai 2024",
    client: "Bosch Automotive",
    category: "exhibition",
    size: "84 sqm",
    configuration: "Island",
    location: "Dubai World Trade Centre",
    industry: "Automotive",
    year: 2024,
    description: "Professional automotive stand with parts display, diagnostic equipment demos, and technical workshop area.",
    image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=1200&q=80",
    tags: ["Automotive", "Parts", "Automechanika"],
    featured: false
  },
  {
    id: 14,
    slug: "bridgestone-automechanika-2023",
    title: "Automechanika 2023 - Tires",
    client: "Bridgestone Middle East",
    category: "exhibition",
    size: "36 sqm",
    configuration: "Corner",
    location: "Dubai World Trade Centre",
    industry: "Automotive",
    year: 2023,
    description: "Tire showcase stand with product displays, technical information, and consultation zone. Bold branding with product wall.",
    image: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=1200&q=80",
    tags: ["Automotive", "Tires", "Automechanika"],
    featured: false
  },

  // --- EXHIBITIONS: BEAUTY ---
  {
    id: 15,
    slug: "loreal-beautyworld-2024",
    title: "Beautyworld Middle East 2024",
    client: "L'Oréal Middle East",
    category: "exhibition",
    size: "68 sqm",
    configuration: "Peninsula",
    location: "Dubai World Trade Centre",
    industry: "Beauty & Cosmetics",
    year: 2024,
    description: "Elegant beauty stand with product displays, makeup stations, hair styling area, and brand storytelling zones.",
    image: "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?w=1200&q=80",
    tags: ["Beauty", "Cosmetics", "Beautyworld", "Premium"],
    featured: false
  },
  {
    id: 16,
    slug: "ghd-beautyworld-2023",
    title: "Beautyworld 2023 - Hair Care",
    client: "GHD Middle East",
    category: "exhibition",
    size: "24 sqm",
    configuration: "Inline",
    location: "Dubai World Trade Centre",
    industry: "Beauty",
    year: 2023,
    description: "Compact salon-style stand with live styling demos, product displays, and consultation area. Modern black and gold aesthetic.",
    image: "https://images.unsplash.com/photo-1562322140-8baeececf3df?w=1200&q=80",
    tags: ["Beauty", "Hair Care", "Beautyworld", "Small"],
    featured: false
  },

  // --- EXHIBITIONS: ENERGY ---
  {
    id: 17,
    slug: "shell-adipec-2024",
    title: "ADIPEC 2024 - Energy Solutions",
    client: "Shell Middle East",
    category: "exhibition",
    size: "200 sqm",
    configuration: "Island",
    location: "ADNEC Abu Dhabi",
    industry: "Energy",
    year: 2024,
    description: "Massive corporate stand showcasing LNG technology, renewable energy projects, and digital solutions with theater and lounge.",
    image: "https://images.unsplash.com/photo-1581094288338-2314dddb7ece?w=1200&q=80",
    tags: ["Energy", "ADIPEC", "Large Scale", "Premium"],
    featured: true
  },
  {
    id: 18,
    slug: "schlumberger-adipec-2023",
    title: "ADIPEC 2023 - Oilfield Services",
    client: "Schlumberger Middle East",
    category: "exhibition",
    size: "88 sqm",
    configuration: "Peninsula",
    location: "ADNEC Abu Dhabi",
    industry: "Energy",
    year: 2023,
    description: "Technical stand featuring drilling technology, digital oilfield solutions, and consultation areas. Professional industrial aesthetic.",
    image: "https://images.unsplash.com/photo-1518709766631-a6a7f45921c3?w=1200&q=80",
    tags: ["Energy", "ADIPEC", "Industrial"],
    featured: false
  },

  // --- EXHIBITIONS: REAL ESTATE ---
  {
    id: 19,
    slug: "emaar-cityscape-2024",
    title: "Cityscape Global 2024",
    client: "Emaar Properties",
    category: "exhibition",
    size: "120 sqm",
    configuration: "Island",
    location: "Dubai World Trade Centre",
    industry: "Real Estate",
    year: 2024,
    description: "Prestigious stand showcasing luxury developments with large-format visuals, VR property tours, and VIP lounges.",
    image: "https://images.unsplash.com/photo-1512453979798-5ea936a86775?w=1200&q=80",
    tags: ["Real Estate", "Luxury", "Cityscape", "Large Scale"],
    featured: true
  },
  {
    id: 20,
    slug: "damac-cityscape-2023",
    title: "Cityscape 2023 - Developer Showcase",
    client: "Damac Properties",
    category: "exhibition",
    size: "64 sqm",
    configuration: "Peninsula",
    location: "Dubai World Trade Centre",
    industry: "Real Estate",
    year: 2023,
    description: "Elegant property showcase with project displays, payment plan information, and sales consultation areas.",
    image: "https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?w=1200&q=80",
    tags: ["Real Estate", "Cityscape"],
    featured: false
  },

  // --- EVENTS: BANKING & FINANCE ---
  {
    id: 21,
    slug: "emirates-nbd-genai-summit-2025",
    title: "Emirates NBD GenAI Summit 2025",
    client: "Emirates NBD Bank",
    category: "event",
    capacity: "350 attendees",
    location: "Ritz Carlton DIFC, Dubai",
    industry: "Banking",
    eventType: "Corporate Summit",
    year: 2025,
    description: "Premium technology conference bringing together global AI experts. Featured main stage, breakout sessions, and networking lounge.",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&q=80",
    tags: ["Corporate", "Technology", "Summit", "Banking"],
    featured: true
  },
  {
    id: 22,
    slug: "hsbc-future-forum-2025",
    title: "HSBC MENAT Future Forum 2025",
    client: "HSBC Bank Middle East",
    category: "event",
    capacity: "800 attendees",
    location: "Atlantis The Palm, Dubai",
    industry: "Finance",
    eventType: "Financial Conference",
    year: 2025,
    description: "Financial markets forum for institutional investors. Multiple conference halls, VIP networking areas, and gala dinner setup.",
    image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1200&q=80",
    tags: ["Finance", "Conference", "Luxury", "Corporate"],
    featured: true
  },
  {
    id: 23,
    slug: "emirates-nbd-gala-2024",
    title: "Emirates NBD Annual Gala Dinner",
    client: "Emirates NBD Bank",
    category: "event",
    capacity: "500 guests",
    location: "Burj Al Arab, Dubai",
    industry: "Banking",
    eventType: "Corporate Gala",
    year: 2024,
    description: "Elegant annual appreciation gala with premium table settings, stage entertainment, and award ceremony setup.",
    image: "https://images.unsplash.com/photo-1519167758481-83f29da8c8d6?w=1200&q=80",
    tags: ["Gala", "Corporate", "Luxury", "Banking"],
    featured: false
  },

  // --- EVENTS: LUXURY & FASHION ---
  {
    id: 24,
    slug: "rolex-launch-2024",
    title: "Luxury Brand Launch - Swiss Watches",
    client: "Rolex Middle East",
    category: "event",
    capacity: "120 VIP guests",
    location: "Dubai Mall Fountain Plaza",
    industry: "Luxury",
    eventType: "Product Launch",
    year: 2024,
    description: "Exclusive evening event for new watch collection launch. Elegant setup with display cases, ambient lighting, and fountain backdrop.",
    image: "https://images.unsplash.com/photo-1514525253440-b393452e3383?w=1200&q=80",
    tags: ["Luxury", "Product Launch", "VIP", "Retail"],
    featured: true
  },
  {
    id: 25,
    slug: "arabian-luxury-2024",
    title: "Arabian Luxury Dubai 2024",
    client: "Various Luxury Brands",
    category: "event",
    capacity: "300 VIP attendees",
    location: "Atlantis The Royal",
    industry: "Luxury",
    eventType: "Luxury Showcase",
    year: 2024,
    description: "Invitation-only luxury event featuring private properties, yachts, and premium experiences. Elegant display areas and VIP lounges.",
    image: "https://images.unsplash.com/photo-1566737236500-c8ac43014a67?w=1200&q=80",
    tags: ["Luxury", "VIP", "Networking", "Premium"],
    featured: true
  },
  {
    id: 26,
    slug: "fashion-futures-2024",
    title: "Fashion Futures Dubai 2024",
    client: "Dubai Design District",
    category: "event",
    capacity: "600 attendees",
    location: "Dubai Design District",
    industry: "Fashion",
    eventType: "Fashion Conference",
    year: 2024,
    description: "Luxury fashion industry summit with runway shows, exhibition areas, panel discussion stages, and VIP networking lounges.",
    image: "https://images.unsplash.com/photo-1509631179647-b849f1150ab3?w=1200&q=80",
    tags: ["Fashion", "Luxury", "Conference", "Design"],
    featured: false
  },

  // --- EVENTS: BUSINESS & TECH ---
  {
    id: 27,
    slug: "step-conference-2024",
    title: "Step Conference 2024",
    client: "Step Group",
    category: "event",
    capacity: "8,000 attendees",
    location: "Dubai World Trade Centre",
    industry: "Technology",
    eventType: "Tech Conference",
    year: 2024,
    description: "Major startup and tech conference with 6 specialized tracks. Multiple stages, exhibition area, and investor lounge.",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&q=80",
    tags: ["Startups", "Technology", "Conference", "Large Scale"],
    featured: false
  },
  {
    id: 28,
    slug: "fintech-summit-2024",
    title: "Dubai FinTech Summit 2024",
    client: "Dubai Economy",
    category: "event",
    capacity: "2,000 attendees",
    location: "Dubai World Trade Centre",
    industry: "Fintech",
    eventType: "Industry Summit",
    year: 2024,
    description: "Major fintech conference aligned with Dubai D33 Economic Agenda. Exhibition stands, innovation showcase, and main stage.",
    image: "https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=1200&q=80",
    tags: ["Fintech", "Technology", "Summit", "Banking"],
    featured: false
  },

  // --- INTERIORS: OFFICES ---
  {
    id: 29,
    slug: "emirates-nbd-difc-office",
    title: "Emirates NBD Executive Office DIFC",
    client: "Emirates NBD Bank",
    category: "interior",
    size: "520 sqm",
    location: "Dubai International Financial Centre",
    industry: "Banking",
    spaceType: "Corporate Office",
    year: 2024,
    description: "Premium executive office suite with glass partitions, custom Italian furniture, and sophisticated navy blue and gold finishes.",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80",
    tags: ["Corporate", "Office", "Luxury", "Banking"],
    featured: true
  },
  {
    id: 30,
    slug: "hsbc-private-lounge",
    title: "HSBC Private Banking Lounge",
    client: "HSBC Bank Middle East",
    category: "interior",
    size: "380 sqm",
    location: "Emirates Towers, Dubai",
    industry: "Banking",
    spaceType: "Banking Lounge",
    year: 2024,
    description: "Ultra-luxury private banking lounge with consultation rooms, waiting area, and premium coffee service. Contemporary British design.",
    image: "https://images.unsplash.com/photo-1600607686527-6fb886090705?w=1200&q=80",
    tags: ["Banking", "Luxury", "Lounge", "Corporate"],
    featured: true
  },
  {
    id: 31,
    slug: "deloitte-consulting-hub",
    title: "Deloitte Consulting Hub",
    client: "Deloitte Middle East",
    category: "interior",
    size: "680 sqm",
    location: "Business Bay, Dubai",
    industry: "Consulting",
    spaceType: "Corporate Office",
    year: 2024,
    description: "Modern open-plan office with collaboration zones, meeting pods, innovation lab, and client presentation center.",
    image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1200&q=80",
    tags: ["Corporate", "Office", "Consulting", "Modern"],
    featured: false
  },
  {
    id: 32,
    slug: "google-cloud-office",
    title: "Google Cloud Regional Office",
    client: "Google Cloud MENA",
    category: "interior",
    size: "450 sqm",
    location: "Dubai Internet City",
    industry: "Technology",
    spaceType: "Tech Office",
    year: 2024,
    description: "Vibrant tech office space with open workstations, creative meeting rooms, and an innovation showcase zone.",
    image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=1200&q=80",
    tags: ["Technology", "Office", "Creative", "Modern"],
    featured: true
  },

  // --- INTERIORS: RETAIL, HEALTH, INDUSTRIAL ---
  {
    id: 33,
    slug: "rolex-dubai-mall",
    title: "Rolex Boutique Dubai Mall",
    client: "Rolex Middle East",
    category: "interior",
    size: "180 sqm",
    location: "Dubai Mall",
    industry: "Retail",
    spaceType: "Luxury Retail",
    year: 2024,
    description: "Prestigious watch boutique with custom display cases, VIP consultation room, secure vault, and elegant seating areas.",
    image: "https://images.unsplash.com/photo-1612026248496-47c45db8252a?w=1200&q=80",
    tags: ["Retail", "Luxury", "Watches", "Premium"],
    featured: true
  },
  {
    id: 34,
    slug: "siemens-clinic",
    title: "Siemens Healthcare Clinic",
    client: "Siemens Healthineers",
    category: "interior",
    size: "420 sqm",
    location: "Dubai Healthcare City",
    industry: "Healthcare",
    spaceType: "Medical Facility",
    year: 2025,
    description: "State-of-the-art medical diagnostic center with imaging rooms, consultation areas, and reception. Clean clinical design.",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1200&q=80",
    tags: ["Healthcare", "Medical", "Clinical", "Technology"],
    featured: false
  },
  {
    id: 35,
    slug: "tetra-pak-innovation",
    title: "Tetra Pak Innovation Center",
    client: "Tetra Pak Middle East",
    category: "interior",
    size: "550 sqm",
    location: "Dubai Industrial Park",
    industry: "Food Tech",
    spaceType: "Innovation Lab",
    year: 2024,
    description: "Industrial-modern innovation center with product testing lab, demonstration kitchen, meeting rooms, and exhibition area.",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200&q=80",
    tags: ["Industrial", "Innovation", "Food Tech", "Commercial"],
    featured: false
  },

  // --- INTERIORS: HOSPITALITY & RESIDENTIAL ---
  {
    id: 36,
    slug: "lpm-restaurant",
    title: "La Petite Maison Restaurant",
    client: "DIFC Restaurants Group",
    category: "interior",
    size: "320 sqm",
    location: "Dubai International Financial Centre",
    industry: "Hospitality",
    spaceType: "Fine Dining",
    year: 2024,
    description: "Upscale French Mediterranean restaurant with open kitchen, wine cellar display, and private dining room.",
    image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=1200&q=80",
    tags: ["Restaurant", "Hospitality", "Luxury", "Fine Dining"],
    featured: true
  },
  {
    id: 37,
    slug: "fitness-first-platinum",
    title: "Fitness First Platinum Club",
    client: "Fitness First Middle East",
    category: "interior",
    size: "800 sqm",
    location: "Downtown Dubai",
    industry: "Fitness",
    spaceType: "Fitness Center",
    year: 2024,
    description: "Premium gym facility with cardio zone, free weights area, functional training space, studio rooms, and spa.",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&q=80",
    tags: ["Fitness", "Wellness", "Commercial", "Modern"],
    featured: false
  },
  {
    id: 38,
    slug: "address-hotel-lounge",
    title: "Address Hotels Executive Lounge",
    client: "Address Hotels + Resorts",
    category: "interior",
    size: "450 sqm",
    location: "Address Boulevard, Downtown Dubai",
    industry: "Hospitality",
    spaceType: "Hotel Lounge",
    year: 2024,
    description: "Sophisticated hotel executive lounge with reception, seating zones, business center, and breakfast area.",
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1200&q=80",
    tags: ["Hotel", "Hospitality", "Luxury", "Lounge"],
    featured: false
  },
  {
    id: 39,
    slug: "private-villa-emirates-hills",
    title: "Private Villa Emirates Hills",
    client: "Private Client",
    category: "interior",
    size: "950 sqm",
    location: "Emirates Hills, Dubai",
    industry: "Residential",
    spaceType: "Luxury Residence",
    year: 2024,
    description: "Ultra-luxury villa interior featuring grand entrance, formal living, family lounge, dining room, and home theater.",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80",
    tags: ["Residential", "Villa", "Ultra Luxury", "Custom"],
    featured: true
  },
  {
    id: 40,
    slug: "wework-dubai-marina",
    title: "WeWork Co-Working Space",
    client: "WeWork Dubai",
    category: "interior",
    size: "620 sqm",
    location: "Dubai Marina",
    industry: "Real Estate",
    spaceType: "Co-Working",
    year: 2024,
    description: "Flexible workspace with hot desks, private offices, meeting rooms, phone booths, and lounge area.",
    image: "https://images.unsplash.com/photo-1527192491265-7de07c002698?w=1200&q=80",
    tags: ["Office", "Co-Working", "Modern", "Flexible"],
    featured: false
  }
];

export const regionalEvents: Event[] = [
  { name: "INTERMOBILITY EXPO", date: "Nov 2025 (TBC)", venue: "Dubai Exhibition Centre", country: "UAE", industry: "Logistics", description: "INTERMOBILITY EXPO is the event for the transport industry to meet their peers and leading policy and decision makers from the Middle Esat Region. Connecting Infrastructure for a Sustanable Mobility Ecosystem" },
  { name: "META CINEMA FORUM", date: "Nov 01-02, 2025", venue: "Dubai", country: "UAE", industry: "Entertainment", description: "META Cinema Forum is the premier cinema convention spanning across the Middle East, Africa, and Turkey. The Forum brings together a diverse group of industry leaders, filmmakers, distributors, exhibitors, technology providers..." },
];

export const testimonials: Testimonial[] = [
  { quote: "FANN didn't just build a stand; they created an experience. Their attention to detail and project management is unparalleled. Our leads increased by 40%!", client: "Aisha Al Futtaim", company: "TechVision Systems", projectType: "GITEX Exhibition" },
  { quote: "The team at FANN is a dream to work with. They took our vision for the annual gala and elevated it beyond our wildest expectations. Flawless execution from start to finish.", client: "Johnathan Lee", company: "Global Leaders Org", projectType: "Corporate Event" },
  { quote: "Transforming our new headquarters with FANN was the best decision we made. The design is not only beautiful but has tangibly improved our team's collaboration and morale.", client: "Fatima Al Mansouri", company: "Emirates Tech Solutions", projectType: "Interior Design" },
];
