import React from 'react';
import AnimatedPage from '../../components/AnimatedPage';
import SEO from '../../components/SEO';
import ServicePageLayout from '../../components/ServicePageLayout';
import FaqAccordion from '../../components/FaqAccordion';
import { Link } from 'react-router-dom';

const pageTitle = "Interior Fit-Out for Exhibition Spaces Dubai";
const heroImage = "https://images.pexels.com/photos/271639/pexels-photo-271639.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";

const breadcrumbs = [
  { name: 'Home', path: '/' },
  { name: 'Services', path: '/services' },
  { name: pageTitle, path: '/services/interior-fitout-exhibition-spaces-dubai' }
];

const faqs = [
  { question: "What is the difference between stand fabrication and interior fit-out?", answer: "Fabrication is the process of building the main structure of the stand. Interior fit-out is the next stage, focusing on the 'finishing touches' that make the space functional and aesthetically pleasing. This includes flooring, wall finishes, lighting installation, branding, and furnishing—essentially, turning the raw structure into a complete, ready-to-use environment." },
  { question: "Can you provide fit-out services for a stand built by another company?", answer: "While we typically provide fit-out as part of our turnkey solution, we can offer our finishing services for stands built by other contractors, subject to a technical review. Our expertise can significantly elevate the final look and feel of any structure." },
  { question: "What kind of flooring options do you offer?", answer: "We offer a wide range of flooring solutions suitable for exhibitions, including custom-printed vinyl, premium carpeting and carpet tiles, raised wooden or composite flooring for a premium feel, and durable laminate options. The choice depends on your budget, branding, and expected footfall." },
  { question: "How do you handle branding and signage within the fit-out?", answer: "Branding is a key part of our fit-out service. We produce and install all forms of signage, including 3D logos, vinyl wall graphics, fabric prints, and directional signage, ensuring your brand messaging is clear, consistent, and professionally presented." },
  { question: "What's involved in your project management for fit-out?", answer: "Our project manager coordinates all aspects of the fit-out, including scheduling different trades (electricians, painters, flooring specialists), managing material deliveries, and ensuring all work is completed to a high standard and in accordance with the event's timeline and safety regulations." },
  { question: "Can you create high-end hospitality areas within a stand?", answer: "Yes, creating premium hospitality and VIP lounge areas is one of our specialties. Our fit-out service includes the installation of custom-built bars, comfortable seating areas, high-end finishes, and ambient lighting to create an exclusive and welcoming space for your most important guests." },
  { question: "How long does the fit-out process take on-site?", answer: "The on-site fit-out timeline varies depending on the complexity, but it is a core part of the overall build-up schedule. For a typical stand, this can range from 1 to 3 days. We meticulously plan this phase to ensure efficiency and completion well before the show opening." },
  { question: "Do you offer sustainable fit-out options?", answer: "Yes, we are committed to sustainability. We can offer eco-friendly fit-out solutions, including sourcing recycled or sustainable materials for flooring and finishes, using low-VOC paints, and recommending energy-efficient LED lighting systems." }
];

const schema = {
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": "Service",
            "serviceType": "Interior Fit-Out for Exhibition Spaces",
            "name": "Interior Fit-Out for Exhibition Spaces Dubai",
            "description": "FANN provides professional interior fit-out services for exhibition stands and pavilions in Dubai. Our turnkey finishing solutions include flooring, lighting, branding, and premium finishes to transform your exhibition space.",
            "provider": { "@type": "Organization", "name": "FANN" },
            "areaServed": { "@type": "City", "name": "Dubai" },
            "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Fit-Out Services",
                "itemListElement": [
                    { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Exhibition Flooring Solutions" } },
                    { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Specialist Lighting Installation" } },
                    { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Branding & Signage Application" } },
                    { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Hospitality & Lounge Finishing" } }
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

const FitOutPage: React.FC = () => {
  return (
    <AnimatedPage>
      <SEO
        title="Interior Fit-Out for Exhibition Spaces Dubai | FANN"
        description="Professional interior fit-out for exhibition pavilions and spaces. Turnkey finishing, flooring, lighting, branding. Transform your exhibition space."
        schema={schema}
      />
      <ServicePageLayout
        heroImage={heroImage}
        heroAltText="A beautifully finished interior of a corporate hospitality lounge at an exhibition."
        pageTitle="Interior Fit-Out Services for Exhibition Spaces Dubai"
        pageDescription="Transforming raw structures into immersive brand environments with meticulous attention to detail and premium finishes."
        breadcrumbs={breadcrumbs}
      >
        <h2>What Is Exhibition Space Interior Fit-Out?</h2>
        <p>While stand fabrication creates the 'bones' of your exhibition stand, the <strong>interior fit-out</strong> provides its soul. This crucial phase involves transforming the raw, constructed space into a fully functional, aesthetically complete, and brand-aligned environment. It encompasses all the finishing touches that engage the senses and create a professional atmosphere, from the floor underfoot to the light that illuminates your products. As a premier provider of <strong>interior fit-out services in Dubai</strong>, FANN ensures every surface and detail is executed to perfection, creating a polished and welcoming space for your visitors.</p>

        <div className="my-8 text-center">
            <Link to="/book-consultation" className="bg-fann-gold text-fann-charcoal font-bold py-3 px-8 rounded-full text-lg uppercase tracking-wider inline-block">Get a Fit-Out Consultation</Link>
        </div>

        <h2>Our Fit-Out Services: From Design to Completion</h2>
        <p>Our fit-out service is an integral part of our <Link to="/services/turnkey-exhibition-services-uae">turnkey solution</Link>. We manage the entire finishing process to ensure a cohesive and high-quality result:</p>
        <ol>
            <li><strong>Design Integration:</strong> Our fit-out plan is developed in conjunction with the initial 3D design, ensuring all finishes, colours, and textures are planned from the start.</li>
            <li><strong>Material Sourcing:</strong> We procure high-quality materials from our trusted suppliers, including flooring, wall coverings, lighting fixtures, and branding elements.</li>
            <li><strong>On-Site Execution:</strong> Our skilled team of technicians, electricians, painters, and installers work in a coordinated manner during the build-up phase to execute the fit-out plan.</li>
            <li><strong>Quality Assurance:</strong> A dedicated site supervisor oversees all finishing work, ensuring every detail meets our exacting standards and the approved design.</li>
            <li><strong>Final Handover:</strong> We present you with a clean, polished, and fully functional space, ready for the show to open.</li>
        </ol>

        <h2>Flooring, Lighting & Aesthetic Solutions</h2>
        <p>The right combination of flooring and lighting is fundamental to creating the desired ambiance. We offer a complete range of solutions tailored for exhibition environments:</p>
        <ul>
            <li><strong>Flooring:</strong> We provide and install everything from durable, custom-printed vinyl graphics and professional carpet tiles to raised platforms with premium wood laminate or composite decking for a more luxurious feel.</li>
            <li><strong>Lighting:</strong> Our expertise goes beyond basic illumination. We design and install multi-layered lighting schemes, including ambient lighting to set the mood, accent lighting to highlight products, and feature lighting like custom pendants or chandeliers to create a focal point.</li>
            <li><strong>Wall & Surface Finishes:</strong> We apply a variety of finishes, including high-quality paint, textured wallpapers, custom laminates, and large-format fabric or vinyl graphics to bring your brand's visual identity to life.</li>
        </ul>

        {/* Visual Placeholder */}
        <div className="my-8 p-4 border-2 border-dashed border-fann-light-gray rounded-lg text-center">
            <p className="text-fann-light-gray font-semibold">[Gallery: Images of different flooring, lighting, and wall finish examples in exhibition stands]</p>
            <img src="https://via.placeholder.com/800x250.png?text=Gallery+of+Fit-Out+Finishes" alt="A collage showing examples of exhibition flooring, lighting, and wall graphics" className="w-full h-auto mt-2 rounded-md opacity-50"/>
        </div>

        <h2>Hospitality & Premium Finishes</h2>
        <p>For stands featuring VIP lounges, meeting rooms, or hospitality bars, the quality of the fit-out is paramount. We specialize in creating these premium spaces within an exhibition environment. Our services include:</p>
        <ul>
            <li><strong>Custom Bars & Counters:</strong> Building and installing high-end hospitality bars with features like integrated lighting, refrigeration, and premium countertop materials.</li>
            <li><strong>Acoustic Panelling:</strong> Installing sound-dampening materials in meeting rooms to ensure privacy and a quiet environment for business discussions.</li>
            <li><strong>Bespoke Joinery:</strong> Creating custom-built shelving, storage units, and decorative features that seamlessly integrate into the stand's design.</li>
        </ul>
        <p>These details elevate the visitor experience, reflecting a commitment to quality that enhances your brand's reputation. See examples in our <Link to="/portfolio">portfolio</Link>.</p>

        <div className="my-8 text-center">
            <Link to="/contact" className="border-2 border-fann-accent-teal dark:border-fann-gold text-fann-accent-teal dark:text-fann-gold font-bold py-3 px-8 rounded-full text-lg uppercase tracking-wider inline-block">Discuss Your Project</Link>
        </div>

        <FaqAccordion faqs={faqs} />
      </ServicePageLayout>
    </AnimatedPage>
  );
};

export default FitOutPage;
