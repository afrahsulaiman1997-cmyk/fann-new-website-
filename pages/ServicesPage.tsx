
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import AnimatedPage from '../components/AnimatedPage';
import SEO from '../components/SEO';
import { Layers, Calendar, PenTool, CheckCircle, ArrowRight } from 'lucide-react';

interface ServiceSectionProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  image: string;
  services: string[];
  imagePosition?: 'left' | 'right';
  link: string;
}

const buttonTransition = { type: 'spring', stiffness: 400, damping: 17 } as const;

const ServiceSection: React.FC<ServiceSectionProps> = ({ icon, title, description, image, services, imagePosition = 'right', link }) => {
  const imageVariants = {
    offscreen: { opacity: 0, x: imagePosition === 'right' ? 100 : -100 },
    onscreen: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 50, duration: 0.8 } }
  } as const;
  
  const textVariants = {
    offscreen: { opacity: 0, y: 50 },
    onscreen: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 50, duration: 0.8, delay: 0.2 } }
  } as const;

  return (
    <motion.section 
      className="container mx-auto px-4 sm:px-6 lg:px-8 py-20"
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className={`grid md:grid-cols-2 gap-12 items-center`}>
        <motion.div className={`order-2 ${imagePosition === 'left' ? 'md:order-2' : 'md:order-1'}`} variants={textVariants}>
          <div className="flex items-center gap-4 mb-4">
            <div className="text-fann-gold">{icon}</div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-fann-gold">{title}</h2>
          </div>
          <p className="text-gray-300 mb-6 leading-relaxed">{description}</p>
          <ul className="space-y-3 mb-8">
            {services.map((service, index) => (
              <li key={index} className="flex items-center gap-3">
                <CheckCircle className="text-fann-gold w-5 h-5 flex-shrink-0" />
                <span className="text-gray-300">{service}</span>
              </li>
            ))}
          </ul>
           <Link to={link}>
              <motion.button 
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  transition={buttonTransition}
                  className="border-2 border-fann-gold text-fann-gold font-bold py-3 px-8 rounded-full text-base uppercase tracking-wider flex items-center gap-2 group transition-all duration-300 hover:bg-fann-gold/10"
              >
                  Learn More
                  <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </motion.button>
          </Link>
        </motion.div>
        <motion.div className={`order-1 ${imagePosition === 'left' ? 'md:order-1' : 'md:order-2'}`} variants={imageVariants}>
          <picture>
            <source srcSet={`${image}&fm=webp`} type="image/webp" />
            <source srcSet={image} type="image/jpeg" />
            <img 
              src={image} 
              alt={title} 
              className="rounded-sm shadow-2xl w-full h-auto object-cover grayscale hover:grayscale-0 transition-all duration-700 border border-white/10" 
              loading="lazy"
              width="532"
              height="299"
            />
          </picture>
        </motion.div>
      </div>
    </motion.section>
  );
};

const servicesData = [
    {
        icon: <Layers size={40} />,
        title: "Exhibition Services",
        description: "From award-winning custom stands to versatile modular systems, our exhibition services are comprehensive. We offer turnkey solutions, managing everything from design and in-house fabrication to logistics and on-site installation, ensuring a powerful and stress-free presence at any trade show.",
        image: "https://images.pexels.com/photos/2608517/pexels-photo-2608517.jpeg?auto=compress&cs=tinysrgb&w=800&q=75",
        services: [ "Custom Stand Design & Build", "Modular & Reusable Systems", "Turnkey Project Management", "In-House Fabrication & Production", "Premium Interior Fit-Out" ],
        imagePosition: "right" as "right",
        link: "/portfolio?category=exhibition"
    },
    {
        icon: <Calendar size={40} />,
        title: "Corporate Event Management",
        description: "We orchestrate flawless corporate events that resonate with your audience. Whether it's a high-profile product launch, an elegant gala dinner, or a global summit, our meticulous planning and creative production deliver unforgettable, stress-free experiences.",
        image: "https://images.pexels.com/photos/1181438/pexels-photo-1181438.jpeg?auto=compress&cs=tinysrgb&w=800&q=75",
        services: [ "Strategic Event Concept & Theming", "Venue Sourcing & Management", "Stage Design & Technical Production", "Delegate & VIP Management", "Entertainment & Speaker Sourcing" ],
        imagePosition: "left" as "left",
        link: "/portfolio" // Assuming no detailed page for this yet
    },
    {
        icon: <PenTool size={40} />,
        title: "Interior Design & Build",
        description: "Our design and build philosophy for interiors centers on creating spaces that are both beautiful and functional. We manage the entire process from concept to completion, designing and constructing inspiring commercial environments and luxurious residential properties that reflect your unique identity.",
        image: "https://images.pexels.com/photos/3797991/pexels-photo-3797991.jpeg?auto=compress&cs=tinysrgb&w=800&q=75",
        services: [ "Comprehensive Space Planning", "Concept & Mood Board Development", "Custom Furniture & Joinery Design", "Complete Fit-Out & Project Management", "Turnkey Design & Build Solutions" ],
        imagePosition: "right" as "right",
        link: "/portfolio" // Assuming no detailed page for this yet
    }
];

const servicesSchema = servicesData.map(service => ({
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": service.title,
    "name": service.title,
    "url": `https://fann.ae${service.link}`,
    "provider": { "@type": "Organization", "@id": "https://fann.ae" },
    "areaServed": { "@type": "Country", "name": "United Arab Emirates" },
    "description": service.description,
    "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": `${service.title} Offerings`,
        "itemListElement": service.services.map(serviceName => ({
            "@type": "Offer",
            "itemOffered": { "@type": "Service", "name": serviceName }
        }))
    }
}));


const ServicesPage: React.FC = () => {
  return (
    <AnimatedPage>
      <SEO
          title="Exhibition, Event & Interior Design Services in Dubai | FANN"
          description="FANN offers premier design & build services for exhibitions, corporate events, and luxury interiors in Dubai & UAE. Get a free quote for your next project today."
      >
          <script type="application/ld+json">
              {JSON.stringify(servicesSchema)}
          </script>
      </SEO>
      <div className="bg-fann-charcoal pt-32 pb-20 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-fann-gold mb-4">Our Core Capabilities</h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            As a full-service design and build firm, we deliver end-to-end solutions with precision, creativity, and a commitment to excellence.
          </p>
        </div>

        {servicesData.map((service, index) => (
            <div key={index} className={index % 2 !== 0 ? 'bg-fann-charcoal-light border-y border-white/5' : ''}>
                <ServiceSection {...service} />
            </div>
        ))}
        
         {/* CTA Section */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 mt-16">
            <div className="text-center bg-gradient-to-r from-fann-gold/20 to-transparent p-1 rounded-lg border border-fann-gold/20">
                 <div className="bg-black/40 rounded-lg py-16 px-8">
                    <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4 text-white">Have a Project in Mind?</h2>
                    <p className="max-w-2xl mx-auto text-gray-400 mb-8">Let's turn your vision into a reality. Contact us today for a complimentary consultation with our design experts.</p>
                    <Link to="/book-consultation">
                        <motion.button 
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            transition={buttonTransition}
                            className="bg-fann-gold text-fann-charcoal font-bold py-3 px-8 rounded-full text-lg uppercase tracking-wider transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-fann-gold/40"
                        >
                            Book a Consultation
                        </motion.button>
                    </Link>
                 </div>
            </div>
        </section>

      </div>
    </AnimatedPage>
  );
};

export default ServicesPage;
