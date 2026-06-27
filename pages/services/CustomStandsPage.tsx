import React from 'react';
import AnimatedPage from '../../components/AnimatedPage';
import SEO from '../../components/SEO';
import ServicePageLayout from '../../components/ServicePageLayout';
import FaqAccordion from '../../components/FaqAccordion';
import { Link } from 'react-router-dom';

const pageTitle = "Custom Exhibition Stands Dubai";
const heroImage = "https://images.pexels.com/photos/8112165/pexels-photo-8112165.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";

const breadcrumbs = [
  { name: 'Home', path: '/' },
  { name: 'Services', path: '/services' },
  { name: pageTitle, path: '/services/custom-exhibition-stands-dubai' }
];

const faqs = [
    { question: "How much does a custom exhibition stand cost in Dubai?", answer: "The cost for a custom exhibition stand in Dubai can range from AED 45,000 for a small, simple design to over AED 500,000 for a large, complex double-decker pavilion. The final price depends on size, material quality, AV technology, and complexity. We provide a detailed, transparent quote after our initial consultation." },
    { question: "What is the typical timeline for a custom stand project?", answer: "From design approval, a typical custom stand project takes 4-6 weeks for fabrication and production. This includes 3D modeling, revisions, material procurement, manufacturing, and graphics printing. We recommend starting the process at least 8-12 weeks before your event." },
    { question: "Can FANN handle the entire process from design to installation?", answer: "Yes, absolutely. Our turnkey service covers every aspect of your project. We manage the initial concept, 3D design, fabrication, logistics, on-site installation at venues like DWTC, and post-show dismantling. This provides you with a single point of contact and a stress-free experience." },
    { question: "What kind of materials can be used for a bespoke stand?", answer: "We work with a vast range of high-quality materials to match your brand aesthetic. This includes premium woods, custom laminates, brushed metals (like bronze and aluminum), acrylics, tension fabrics for graphics, and advanced AV elements like seamless LED screens." },
    { question: "Why should I choose a custom stand over a modular system?", answer: "A custom stand offers unparalleled brand expression and impact. It's uniquely designed to meet your specific marketing objectives, showcase products perfectly, and create an immersive visitor experience. While modular stands offer reusability, custom stands provide the 'wow' factor that makes you stand out in a crowded exhibition hall." },
    { question: "Do you have experience at major Dubai venues?", answer: "Yes, we are seasoned experts at all major UAE venues, especially the Dubai World Trade Centre (DWTC) and Abu Dhabi National Exhibition Centre (ADNEC). We have a deep understanding of their regulations, logistical procedures, and technical guidelines, ensuring a smooth and compliant build process." },
    { question: "How involved will I be in the design process?", answer: "As involved as you wish to be. Our process is collaborative. We start with your brief, present initial concepts, and refine the 3D models based on your feedback. We provide regular updates throughout fabrication, ensuring the final product perfectly aligns with your vision." },
    { question: "Can you incorporate interactive technology into the stand?", answer: "Definitely. We specialize in integrating cutting-edge technology to enhance visitor engagement. This includes interactive touchscreens, VR/AR experiences, holographic displays, motion sensor activations, and custom-programmed LED lighting to create a dynamic and memorable stand." }
];

const schema = {
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": "Service",
            "serviceType": "Custom Exhibition Stand Design and Build",
            "name": "Custom Exhibition Stands Dubai",
            "description": "FANN provides award-winning custom exhibition stand design and build services in Dubai. We deliver bespoke, high-impact stands for major events at venues like the Dubai World Trade Centre (DWTC). Our turnkey solutions cover everything from 3D concept to final on-site installation.",
            "provider": { "@type": "Organization", "name": "FANN" },
            "areaServed": { "@type": "City", "name": "Dubai" },
            "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Custom Stand Services",
                "itemListElement": [
                    { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "3D Conceptual Design" } },
                    { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "In-House Fabrication" } },
                    { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Project Management" } },
                    { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "On-site Installation & Dismantling" } }
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

const CustomStandsPage: React.FC = () => {
  return (
    <AnimatedPage>
      <SEO
        title="Custom Exhibition Stands Dubai | Bespoke Design & Build | FANN"
        description="Award-winning custom exhibition stand design and build in Dubai. From 3D concept to final installation at DWTC. DMCC licensed. Get your free quote today."
        schema={schema}
      />
      <ServicePageLayout
        heroImage={heroImage}
        heroAltText="A stunning, large-scale custom exhibition stand at a major trade show in Dubai."
        pageTitle="Custom Exhibition Stand Design & Build in Dubai"
        pageDescription="Crafting unforgettable brand experiences with bespoke exhibition stands that captivate, engage, and deliver results."
        breadcrumbs={breadcrumbs}
      >
        <h2>What is a Custom Exhibition Stand?</h2>
        <p>A custom exhibition stand is a bespoke, one-of-a-kind structure designed and built from the ground up to meet the unique marketing objectives of a single brand. Unlike pre-fabricated or modular systems, a custom stand offers complete creative freedom in terms of layout, materials, technology, and overall aesthetic. It is a powerful statement of brand identity, designed to attract maximum attention, facilitate meaningful interactions, and create a memorable visitor journey in a competitive exhibition environment. As a leading provider of <strong>custom exhibition stands in Dubai</strong>, FANN transforms your vision into a physical reality that commands the show floor.</p>
        
        <div className="my-8 text-center">
            <Link to="/contact" className="bg-fann-gold text-fann-charcoal font-bold py-3 px-8 rounded-full text-lg uppercase tracking-wider inline-block">Get a Free Quote</Link>
        </div>

        <h2>Our Custom Design Process: From Vision to Reality</h2>
        <p>Our process is a collaborative journey designed to ensure your final stand is a perfect reflection of your brand and goals. It is meticulously managed by our expert team, providing you with clarity and confidence at every stage.</p>
        <ol>
            <li><strong>Discovery & Briefing:</strong> We start by understanding your brand, objectives, target audience, and budget. This deep dive ensures our creative direction is strategically aligned with your desired outcomes.</li>
            <li><strong>Conceptual Design & 3D Visualization:</strong> Our designers develop initial concepts and translate them into photorealistic 3D renders. You'll see exactly how your stand will look, feel, and function on the exhibition floor.</li>
            <li><strong>Revisions & Refinement:</strong> We collaborate with your team, incorporating feedback to refine every detail of the design, from material finishes to visitor flow, until it's perfect.</li>
            <li><strong>Technical Drawings & Fabrication:</strong> Once approved, we move to detailed technical drawings. Our in-house <Link to="/services/exhibition-stand-fabrication-dubai">fabrication team</Link> then begins construction in our state-of-the-art Dubai workshop.</li>
            <li><strong>On-Site Installation & Handover:</strong> Our dedicated project managers oversee the entire installation process at the venue, ensuring a flawless build that's ready for you to impress your visitors.</li>
        </ol>

        {/* Visual Placeholder */}
        <div className="my-8 p-4 border-2 border-dashed border-fann-light-gray rounded-lg text-center">
            <p className="text-fann-light-gray font-semibold">[Infographic: Our 5-Step Custom Design Process]</p>
            <img src="https://via.placeholder.com/800x250.png?text=Discovery+%E2%86%92+3D+Design+%E2%86%92+Refinement+%E2%86%92+Fabrication+%E2%86%92+Installation" alt="Diagram showing the FANN 5-step process for custom stand design" className="w-full h-auto mt-2 rounded-md opacity-50"/>
        </div>
        
        <h2>Benefits of a Bespoke Stand for Dubai's Exhibitions</h2>
        <p>In a globally competitive market like Dubai, standing out is not just an option—it's a necessity. A bespoke stand from FANN offers significant advantages:</p>
        <ul>
            <li><strong>Unmatched Brand Impact:</strong> A unique design ensures your brand is not just seen, but remembered long after the event.</li>
            <li><strong>Tailored Functionality:</strong> Every element is designed around your specific needs, whether it's for product demos, private meetings, or VIP hospitality.</li>
            <li><strong>Superior Visitor Engagement:</strong> Create immersive experiences with integrated technology and a layout designed to guide visitors and encourage interaction.</li>
            <li><strong>Flexibility in Design:</strong> From double-decker structures to complex lighting rigs, the only limit is your imagination. This is crucial for major events like <Link to="/events-calendar">GITEX Global</Link>.</li>
            <li><strong>Perceived Market Leadership:</strong> A significant, high-quality custom stand signals to competitors and clients that you are a serious player in your industry.</li>
        </ul>

        <h2>Industries We Specialize In</h2>
        <p>Our portfolio of <strong>bespoke stand design</strong> spans across the most demanding industries in the GCC. We have proven experience delivering exceptional results for clients in:</p>
        <ul>
            <li><strong>Technology:</strong> Creating futuristic, interactive stands for GITEX & LEAP.</li>
            <li><strong>Healthcare & Pharma:</strong> Designing clean, professional, and compliant stands for Arab Health.</li>
            <li><strong>Real Estate & Construction:</strong> Building large-scale, luxurious pavilions for Cityscape and The Big 5.</li>
            <li><strong>Food & Beverage:</strong> Crafting elegant and functional spaces with hospitality features for Gulfood.</li>
            <li><strong>Aviation & Defence:</strong> Engineering secure, high-impact exhibits for the Dubai Airshow and IDEX.</li>
        </ul>
        <p>Explore our <Link to="/portfolio">portfolio</Link> to see our work in action.</p>

        <div className="my-8 text-center">
            <Link to="/portfolio" className="border-2 border-fann-accent-teal dark:border-fann-gold text-fann-accent-teal dark:text-fann-gold font-bold py-3 px-8 rounded-full text-lg uppercase tracking-wider inline-block">View Our Portfolio</Link>
        </div>

        <h2>Premium Materials & Finishing</h2>
        <p>The quality of a custom stand lies in its details. We source and work with only the finest materials to ensure a premium finish that reflects your brand's standards. Our capabilities include bespoke joinery, metalwork, solid surfaces, advanced lighting, and large-format seamless graphics. Our commitment to craftsmanship ensures your stand not only looks stunning but is also built to the highest safety and durability standards required by Dubai's top venues.</p>

        <FaqAccordion faqs={faqs} />
      </ServicePageLayout>
    </AnimatedPage>
  );
};

export default CustomStandsPage;
