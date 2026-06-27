
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calculator, Download } from 'lucide-react';
import SEO from '../components/SEO';
import { motion, AnimatePresence } from 'framer-motion';
import ScrollReveal from '../components/ScrollReveal';
import OptimizedImage from '../components/OptimizedImage';

// --- DATA ---

const heroSlides = [
    {
        id: 1,
        tagline: "Exhibitions",
        headline: "Architecture for Brands",
        description: "We design and build award-winning exhibition stands that dominate the floor at GITEX, Arab Health, and beyond.",
        video: "https://cdn.pixabay.com/video/2020/02/16/32378-392290092_large.mp4", // Generic tech/structure background
        image: "https://images.unsplash.com/photo-1550305080-4e029753abcf?w=1920&q=90", // Fancy double decker structure
        link: "/services/custom-exhibition-stands-dubai"
    },
    {
        id: 2,
        tagline: "Events",
        headline: "Immersive Experiences",
        description: "From corporate summits to product launches, we engineer events that captivate audiences and amplify your message.",
        video: "https://cdn.pixabay.com/video/2023/10/22/186175-877199342_large.mp4", // Stage/Event lighting
        image: "https://images.pexels.com/photos/2608516/pexels-photo-2608516.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        link: "/portfolio"
    },
    {
        id: 3,
        tagline: "Interiors",
        headline: "Visionary Spaces",
        description: "Turnkey interior fit-out solutions for commercial headquarters and luxury residential projects across the UAE.",
        video: "https://cdn.pixabay.com/video/2020/05/25/40149-424930038_large.mp4", // Interior/Architectural walk
        image: "https://images.pexels.com/photos/3797991/pexels-photo-3797991.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        link: "/services/interior-fitout-exhibition-spaces-dubai"
    }
];

// --- COMPONENTS ---

const StatItem: React.FC<{ value: string; label: string }> = ({ value, label }) => (
    <div className="text-center md:text-left">
        <h3 className="text-4xl md:text-5xl font-serif font-medium text-fann-gold mb-2">{value}</h3>
        <p className="text-xs uppercase tracking-widest text-gray-400">{label}</p>
    </div>
);

const ServiceCard: React.FC<{ title: string; description: string; image: string; link: string; index: number }> = ({ title, description, image, link, index }) => (
    <ScrollReveal delay={index * 0.1} className="group cursor-pointer">
        <Link to={link} className="block relative overflow-hidden aspect-[4/5] md:aspect-[3/4]">
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500 z-10"></div>
            <OptimizedImage 
                src={image} 
                alt={title} 
                className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105 grayscale-[30%] group-hover:grayscale-0" 
                width={400}
                height={533}
            />
            <div className="absolute bottom-0 left-0 right-0 p-8 z-20 transform transition-transform duration-500 translate-y-4 group-hover:translate-y-0">
                <h3 className="text-2xl font-serif text-white mb-3">{title}</h3>
                <p className="text-sm text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 line-clamp-2 mb-4">
                    {description}
                </p>
                <div className="flex items-center gap-2 text-fann-gold text-xs uppercase tracking-widest font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
                    Explore Service <ArrowRight size={14} />
                </div>
            </div>
        </Link>
    </ScrollReveal>
);

const ProjectCard: React.FC<{ title: string; category: string; image: string; link?: string }> = ({ title, category, image, link = "/portfolio" }) => (
    <ScrollReveal className="relative group cursor-pointer overflow-hidden">
        <Link to={link}>
            <div className="aspect-video overflow-hidden bg-gray-900">
                <OptimizedImage 
                    src={image} 
                    alt={title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                    width={600}
                    height={338}
                />
            </div>
            <div className="mt-4 flex justify-between items-end">
                <div>
                    <h4 className="text-lg font-serif text-white group-hover:text-fann-gold transition-colors">{title}</h4>
                    <p className="text-xs text-gray-500 uppercase tracking-wider mt-1">{category}</p>
                </div>
                <ArrowRight className="text-gray-600 group-hover:text-fann-gold transform -translate-x-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" size={18} />
            </div>
        </Link>
    </ScrollReveal>
);

// --- SECTIONS ---

const HeroSection: React.FC = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
        }, 6000); // Change slide every 6 seconds
        return () => clearInterval(timer);
    }, []);

    const goToSlide = (index: number) => {
        setCurrentSlide(index);
    };

    return (
        <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-fann-charcoal">
            <AnimatePresence mode="wait">
                <motion.div
                    key={heroSlides[currentSlide].id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1 }}
                    className="absolute inset-0 z-0"
                >
                    <video 
                        autoPlay 
                        loop 
                        muted 
                        playsInline 
                        className="w-full h-full object-cover opacity-50"
                        poster={heroSlides[currentSlide].image}
                    >
                        <source src={heroSlides[currentSlide].video} type="video/mp4" /> 
                    </video>
                    <div className="absolute inset-0 bg-gradient-to-t from-fann-charcoal via-fann-charcoal/40 to-black/40"></div>
                </motion.div>
            </AnimatePresence>

            <div className="container relative z-10 text-center">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={heroSlides[currentSlide].id}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <span className="inline-block py-1 px-3 border border-white/20 rounded-full text-[10px] uppercase tracking-[0.3em] text-fann-gold mb-6 backdrop-blur-sm">
                            {heroSlides[currentSlide].tagline}
                        </span>
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-medium text-white leading-[1.1] mb-8 tracking-tight">
                            {heroSlides[currentSlide].headline}
                        </h1>
                        <p className="max-w-2xl mx-auto text-lg text-gray-200 font-light leading-relaxed mb-12">
                            {heroSlides[currentSlide].description}
                        </p>
                        <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
                            <Link to={heroSlides[currentSlide].link}>
                                <button className="btn-gold min-w-[180px]">
                                    Learn More
                                </button>
                            </Link>
                            <Link to="/fann-studio">
                                <button className="btn-outline min-w-[180px]">
                                    Launch Studio
                                </button>
                            </Link>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Slider Navigation Dots */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex items-center gap-4">
                {heroSlides.map((slide, index) => (
                    <button
                        key={slide.id}
                        onClick={() => goToSlide(index)}
                        className={`transition-all duration-300 rounded-full ${
                            currentSlide === index 
                            ? 'w-3 h-3 bg-fann-gold' 
                            : 'w-2 h-2 bg-white/30 hover:bg-white/50'
                        }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </section>
    );
};

const AboutSection: React.FC = () => (
    <section className="py-24 md:py-32 bg-fann-charcoal border-b border-white/5">
        <div className="container">
            <div className="grid md:grid-cols-2 gap-16 items-center">
                <ScrollReveal>
                    <h2 className="text-4xl md:text-5xl font-serif text-white mb-8 leading-tight">
                        Transforming spaces into <span className="text-fann-gold italic">experiences</span>.
                    </h2>
                    <p className="text-gray-400 text-lg leading-relaxed mb-8 font-light">
                        FANN is a premier design and build firm based in Dubai. We specialize in three core pillars: <strong>Exhibitions, Corporate Events, and Interior Design</strong>. Our integrated approach combines architectural discipline with creative flair, ensuring every project is not just built, but crafted to perfection.
                    </p>
                    <div className="grid grid-cols-3 gap-8 border-t border-white/10 pt-8">
                        <StatItem value="200+" label="Projects Delivered" />
                        <StatItem value="6+" label="Years Excellence" />
                        <StatItem value="100%" label="Client Satisfaction" />
                    </div>
                </ScrollReveal>
                <ScrollReveal variant="scale" delay={0.2}>
                    <div className="relative">
                        <OptimizedImage 
                            src="https://images.pexels.com/photos/30556812/pexels-photo-30556812.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                            alt="FANN Workshop Team" 
                            className="w-full rounded-sm shadow-2xl grayscale hover:grayscale-0 transition-all duration-700"
                            width={600}
                            height={400}
                        />
                        <div className="absolute -bottom-6 -left-6 bg-fann-charcoal-light p-6 border border-white/10 max-w-xs hidden md:block">
                            <p className="text-sm text-gray-300 italic">"Precision in every detail, from concept to construction."</p>
                        </div>
                    </div>
                </ScrollReveal>
            </div>
        </div>
    </section>
);

const ServicesSection: React.FC = () => (
    <section className="py-32 bg-fann-charcoal">
        <div className="container">
            <ScrollReveal className="text-center mb-20">
                <span className="text-fann-gold text-xs font-bold uppercase tracking-widest mb-4 block">Our Expertise</span>
                <h2 className="text-4xl md:text-5xl font-serif text-white">Comprehensive Design Solutions</h2>
            </ScrollReveal>

            <div className="grid md:grid-cols-3 gap-1">
                <ServiceCard 
                    title="Exhibition Stands" 
                    description="Custom, modular, and hybrid stands designed to dominate the trade show floor. Full turnkey service from design to dismantling."
                    image="https://images.pexels.com/photos/2608517/pexels-photo-2608517.jpeg?auto=compress&cs=tinysrgb&w=800&q=75"
                    link="/services/custom-exhibition-stands-dubai"
                    index={1}
                />
                <ServiceCard 
                    title="Corporate Events" 
                    description="Strategic event planning and production for product launches, galas, and conferences. We manage the stage, AV, and atmosphere."
                    image="https://images.pexels.com/photos/1181438/pexels-photo-1181438.jpeg?auto=compress&cs=tinysrgb&w=800&q=75"
                    link="/portfolio"
                    index={2}
                />
                <ServiceCard 
                    title="Interior Fit-Out" 
                    description="Luxury commercial and residential interior design and build. Creating functional, inspiring workspaces and homes."
                    image="https://images.pexels.com/photos/3797991/pexels-photo-3797991.jpeg?auto=compress&cs=tinysrgb&w=800&q=75"
                    link="/services/interior-fitout-exhibition-spaces-dubai"
                    index={3}
                />
            </div>
        </div>
    </section>
);

const WhyChooseUs: React.FC = () => (
    <section className="py-32 bg-fann-charcoal text-white border-b border-white/5">
        <div className="container">
            <div className="grid lg:grid-cols-12 gap-16">
                <div className="lg:col-span-4">
                    <ScrollReveal>
                        <h2 className="text-4xl md:text-5xl font-serif mb-8">The FANN Standard</h2>
                        <p className="text-gray-400 text-lg leading-relaxed mb-8">
                            We don't just build stands; we build reputation. Our commitment to quality and reliability sets us apart in the competitive UAE market.
                        </p>
                        <Link to="/about" className="text-white font-bold uppercase tracking-widest text-xs border-b border-white pb-1 hover:text-fann-gold hover:border-fann-gold transition-colors">
                            Learn More About Us
                        </Link>
                    </ScrollReveal>
                </div>
                <div className="lg:col-span-8">
                    <div className="grid md:grid-cols-2 gap-12">
                        {[
                            { title: "Venue Certified", desc: "Fully accredited and authorized to operate in DWTC, ADNEC, and all major regional exhibition centers." },
                            { title: "In-House Fabrication", desc: "Complete control over quality and timelines with our dedicated workshop." },
                            { title: "Turnkey Management", desc: "A single point of contact for design, build, logistics, and approvals." },
                            { title: "Strategic Design", desc: "Concepts rooted in marketing strategy to maximize your ROI." }
                        ].map((item, i) => (
                            <ScrollReveal key={i} delay={i * 0.1} className="border-l border-white/10 pl-8">
                                <h3 className="text-xl font-bold mb-3 font-serif text-white">{item.title}</h3>
                                <p className="text-gray-400 leading-relaxed">{item.desc}</p>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    </section>
);

const SelectedWork: React.FC = () => (
    <section className="py-32 bg-fann-charcoal border-t border-white/5">
        <div className="container">
            <div className="flex justify-between items-end mb-16">
                <ScrollReveal>
                    <h2 className="text-4xl md:text-5xl font-serif text-white">Selected Works</h2>
                </ScrollReveal>
                <Link to="/portfolio" className="hidden md:flex items-center gap-2 text-white hover:text-fann-gold transition-colors text-sm font-medium">
                    View Full Portfolio <ArrowRight size={16} />
                </Link>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <ProjectCard 
                    title="TechVision Systems" 
                    category="GITEX Global" 
                    image="https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg?auto=compress&cs=tinysrgb&w=800&q=75" 
                />
                <ProjectCard 
                    title="Annual Leadership Summit" 
                    category="Corporate Event" 
                    image="https://images.pexels.com/photos/2608516/pexels-photo-2608516.jpeg?auto=compress&cs=tinysrgb&w=800&q=75" 
                />
                <ProjectCard 
                    title="Downtown Corporate HQ" 
                    category="Interior Fit-Out" 
                    image="https://images.pexels.com/photos/1170412/pexels-photo-1170412.jpeg?auto=compress&cs=tinysrgb&w=800&q=75" 
                />
            </div>
            
            <div className="mt-12 text-center md:hidden">
                 <Link to="/portfolio" className="btn-outline inline-block">View Portfolio</Link>
            </div>
        </div>
    </section>
);

const FeaturedResource: React.FC = () => (
    <ScrollReveal>
        <section className="py-24 bg-fann-charcoal-light relative overflow-hidden border-y border-white/5">
            <div className="absolute top-0 right-0 w-96 h-96 bg-purple-900/20 rounded-full blur-[120px]"></div>
            <div className="container relative z-10">
                <div className="flex flex-col md:flex-row items-center gap-12">
                    <div className="md:w-1/2">
                        <span className="text-purple-400 font-bold tracking-widest uppercase text-xs mb-2 block">Just Released</span>
                        <h2 className="text-3xl md:text-5xl font-serif text-white mb-6">2026 Exhibition Trends Report</h2>
                        <p className="text-gray-400 text-lg mb-8">
                            Discover the cutting-edge materials, immersive technologies, and design philosophies that will define the next era of exhibitions in the GCC.
                        </p>
                        <Link to="/resources/trends-2026">
                            <button className="flex items-center gap-2 text-white border-b border-white pb-1 hover:text-fann-gold hover:border-fann-gold transition-colors">
                                Download Report <Download size={16} />
                            </button>
                        </Link>
                    </div>
                    <div className="md:w-1/2 flex justify-center">
                        <div className="relative w-64 h-80 bg-gradient-to-br from-gray-800 to-black border border-white/10 rounded-lg shadow-2xl p-6 flex flex-col justify-between transform rotate-3 hover:rotate-0 transition-transform duration-500">
                            <div className="text-xs font-bold text-gray-500 uppercase">FANN Intelligence</div>
                            <div className="text-center">
                                <div className="text-4xl font-bold text-white mb-2">2026</div>
                                <div className="text-sm text-fann-gold uppercase tracking-[0.2em]">Future Trends</div>
                            </div>
                            <div className="w-full h-1 bg-gradient-to-r from-transparent via-fann-gold to-transparent"></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </ScrollReveal>
);

const CtaSection: React.FC = () => (
    <section className="py-32 relative overflow-hidden bg-fann-charcoal">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="container relative z-10 text-center">
            <ScrollReveal>
                <h2 className="text-4xl md:text-6xl font-serif text-white mb-8">Ready to elevate your brand?</h2>
                <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-12">
                    Let's discuss your upcoming project. Our team of experts is ready to bring your vision to life with precision and style.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link to="/book-consultation">
                        <button className="btn-gold text-sm py-4 px-10">
                            Book Free Consultation
                        </button>
                    </Link>
                    <Link to="/contact">
                        <button className="btn-outline text-sm py-4 px-10">
                            Contact Us
                        </button>
                    </Link>
                </div>
            </ScrollReveal>
        </div>
    </section>
);

const HomePage: React.FC = () => {
    return (
        <div className="bg-fann-charcoal min-h-screen">
            <SEO
                title="FANN | Premier Design & Build | Exhibitions, Events, Interiors"
                description="Award-winning design and build company in Dubai specializing in custom exhibition stands, corporate events, and luxury interiors."
            />
            
            <HeroSection />
            <AboutSection />
            <ServicesSection />
            <WhyChooseUs />
            <SelectedWork />
            <FeaturedResource />
            <CtaSection />
        </div>
    );
};

export default HomePage;
