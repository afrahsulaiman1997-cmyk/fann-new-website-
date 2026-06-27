import React from 'react';
import AnimatedPage from '../../components/AnimatedPage';
import SEO from '../../components/SEO';
import ServicePageLayout from '../../components/ServicePageLayout';
import FaqAccordion from '../../components/FaqAccordion';
import { Link } from 'react-router-dom';

const pageTitle = "Modular Exhibition Systems Dubai";
const heroImage = "https://images.pexels.com/photos/7533347/pexels-photo-7533347.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";

const breadcrumbs = [
  { name: 'Home', path: '/' },
  { name: 'Services', path: '/services' },
  { name: pageTitle, path: '/services/modular-exhibition-systems-dubai' }
];

const faqs = [
  { question: "What is a modular exhibition stand?", answer: "A modular exhibition stand is constructed from pre-engineered components and frames that can be configured in various ways. This system-based approach allows for flexibility in size and layout, making it a reusable and scalable solution for exhibitors attending multiple shows." },
  { question: "Are modular stands customizable?", answer: "Absolutely. While built from standard components, modern modular systems are highly customizable. We enhance them with large-format tension fabric graphics, custom lighting, unique furniture, AV equipment, and bespoke counters to create a look that is far from 'off-the-shelf' and perfectly reflects your brand." },
  { question: "What is the main advantage of a modular system over a custom stand?", answer: "The primary advantages are reusability and cost-effectiveness over the long term. If you exhibit at several events per year, a modular stand can be reconfigured for different booth sizes, significantly reducing your per-show production costs compared to building a new custom stand each time." },
  { question: "How long does it take to set up a modular stand?", answer: "Installation and dismantling times are significantly faster for modular systems compared to traditional custom builds. This can lead to savings on labor costs and allows for more efficient planning, especially for events with tight build-up schedules." },
  { question: "Can I rent a modular exhibition system?", answer: "Yes, renting a modular system is an excellent option for companies testing a new market or exhibiting on a tighter budget. FANN offers comprehensive rental packages that include design, graphics, installation, and dismantling services." },
  { question: "How are modular stands stored between shows?", answer: "FANN offers secure, climate-controlled storage solutions for your modular stand components at our UAE warehouse. We manage the inventory, handle logistics to and from the event venue, and ensure your assets are maintained and ready for the next show." },
  { question: "What types of modular systems do you offer?", answer: "We work with a variety of world-class modular systems, including versatile aluminum frame systems, tension fabric systems, and hybrid solutions that combine modular components with custom-built elements to achieve the best of both worlds." },
  { question: "Is a modular stand suitable for a large booth space?", answer: "Yes. Modern modular systems are incredibly versatile and can be used to construct large and complex structures, including double-decker stands. They provide a robust framework that can be scaled to create an impressive presence even in large booth spaces." }
];

const schema = {
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": "Service",
            "serviceType": "Modular Exhibition Systems",
            "name": "Modular Exhibition Systems Dubai",
            "description": "FANN provides high-quality modular exhibition systems in Dubai. Our solutions are cost-effective, reusable, and scalable, perfect for multi-show exhibitors. We offer full customization with branding, lighting, and AV to create impactful stands.",
            "provider": { "@type": "Organization", "name": "FANN" },
            "areaServed": { "@type": "City", "name": "Dubai" },
            "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Modular System Services",
                "itemListElement": [
                    { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Modular Stand Design & Configuration" } },
                    { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "System Rental & Purchase" } },
                    { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Graphics Production & Updates" } },
                    { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Logistics & Storage Solutions" } }
                ]
            }
        },
        {
            "@type": "BreadcrumbList",
            "itemListElement": breadcrumbs.map((crumb, index) => ({
                "@type": "ListItem",
                "position": index + 1,
                "name": crumb.name,
                "item": `https://fann.ae${crumb.path}`
            }))
        },
        {
            "@type": "FAQPage",
            "mainEntity": faqs.map(faq => ({
                "@type": "Question",
                "name": faq.question,
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": faq.answer
                }
            }))
        }
    ]
};

const ModularSystemsPage: React.FC = () => {
  return (
    <AnimatedPage>
      <SEO
        title="Modular Exhibition Systems Dubai | Reusable & Scalable | FANN"
        description="High-quality modular exhibition systems in Dubai. Cost-effective, reusable, and scalable solutions for any event. Fast setup and customization available."
        schema={schema}
      />
      <ServicePageLayout
        heroImage={heroImage}
        heroAltText="A clean and modern modular exhibition stand with vibrant graphics."
        pageTitle="Modular Exhibition Systems for Dubai & UAE Events"
        pageDescription="Flexible, sustainable, and cost-effective solutions for the modern exhibitor. Maximize your impact across multiple events with a single, scalable system."
        breadcrumbs={breadcrumbs}
      >
        <h2>What Are Modular Exhibition Systems?</h2>
        <p><strong>Modular exhibition systems</strong> are a sophisticated and versatile alternative to traditional custom builds. They are composed of standardized, interlocking components—such as aluminum frames, connectors, and panels—that can be assembled in a multitude of configurations. This 'building block' approach allows for the creation of stands that are not only reusable but also adaptable to different space requirements and layouts. At FANN, we leverage cutting-edge modular systems to provide our clients with high-impact, brand-centric stands that offer unparalleled flexibility and long-term value.</p>
        
        <div className="my-8 text-center">
            <Link to="/contact" className="bg-fann-gold text-fann-charcoal font-bold py-3 px-8 rounded-full text-lg uppercase tracking-wider inline-block">Get a Quote for a Modular System</Link>
        </div>

        <h2>The Advantages of Modular Stands</h2>
        <p>Choosing a modular exhibition stand offers a range of strategic benefits, particularly for companies with a consistent event calendar:</p>
        <ul>
            <li><strong>Cost-Effectiveness:</strong> The primary benefit is the reduction in long-term costs. By reusing the core structure, you save significantly on fabrication expenses for each subsequent show.</li>
            <li><strong>Sustainability:</strong> Reusability inherently makes modular stands a more eco-friendly option, reducing waste and aligning with corporate sustainability goals.</li>
            <li><strong>Scalability & Flexibility:</strong> A single system can be reconfigured to fit a 12sqm inline booth at one show and a 50sqm island space at another, making it a highly adaptable investment.</li>
            <li><strong>Faster Turnaround:</strong> With pre-engineered components, both the design and on-site installation processes are considerably faster than a full custom build.</li>
            <li><strong>Consistency:</strong> Maintain a consistent, high-quality brand image across all your events, regardless of the location or booth size.</li>
        </ul>
        
        <h2>Our Modular System Options</h2>
        <p>We don't believe in a one-size-fits-all approach. FANN provides a curated selection of world-class modular systems to suit different aesthetic and functional needs:</p>
        <ul>
            <li><strong>Frame-Based Systems:</strong> These versatile aluminum systems (similar to Octanorm or Maxima) provide a robust structure for mounting graphics, screens, and shelving.</li>
            <li><strong>Tension Fabric Systems:</strong> Lightweight frames are covered with large, seamless, high-resolution fabric graphics, creating a clean, modern, and visually stunning look.</li>
            <li><strong>Hybrid Solutions:</strong> We often create the most impactful designs by combining the efficiency of modular systems with bespoke, custom-built elements. This could mean a modular framework enhanced with a custom reception counter, unique product displays, or high-end flooring. This approach, which is a FANN specialty, balances budget with brand impact.</li>
        </ul>

         {/* Visual Placeholder */}
        <div className="my-8 p-4 border-2 border-dashed border-fann-light-gray rounded-lg text-center">
            <p className="text-fann-light-gray font-semibold">[Image: Side-by-side comparison of a basic modular frame and a FANN-customized hybrid modular stand]</p>
            <img src="https://via.placeholder.com/800x350.png?text=Basic+Frame+vs.+FANN+Hybrid+Solution" alt="Comparison of a basic modular stand and a customized hybrid stand by FANN" className="w-full h-auto mt-2 rounded-md opacity-50"/>
        </div>

        <h2>Beyond the Frame: Customization & Branding</h2>
        <p>A modular stand from FANN is never generic. We transform the system into a powerful branding tool through expert customization. Our in-house production capabilities allow us to integrate:</p>
        <ul>
            <li><strong>High-Impact Graphics:</strong> We print vibrant, high-resolution graphics on various materials, including tension fabrics and rigid panels, which can be easily swapped out for different events or campaigns.</li>
            <li><strong>Advanced Lighting:</strong> From backlit fabric walls to programmable LED accents and professional spotlights, we use lighting to create mood and highlight key areas.</li>
            <li><strong>Technology Integration:</strong> Seamlessly incorporate LED screens, touch panels, and charging stations directly into the modular structure.</li>
            <li><strong>Custom Furniture & Finishes:</strong> We pair the system with carefully selected furniture and flooring to complete the desired aesthetic, whether it's for a corporate lounge or a dynamic product showcase.</li>
        </ul>
        <p>This level of customization ensures your <strong>reusable exhibition stand</strong> always looks fresh, relevant, and perfectly aligned with your brand. Explore our <Link to="/portfolio">portfolio</Link> for inspiration.</p>

        <div className="my-8 text-center">
            <Link to="/contact#consultation" className="border-2 border-fann-accent-teal dark:border-fann-gold text-fann-accent-teal dark:text-fann-gold font-bold py-3 px-8 rounded-full text-lg uppercase tracking-wider inline-block">Schedule a Consultation</Link>
        </div>

        <FaqAccordion faqs={faqs} />
      </ServicePageLayout>
    </AnimatedPage>
  );
};

export default ModularSystemsPage;
