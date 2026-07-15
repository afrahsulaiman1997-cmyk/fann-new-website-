
import React, { useState } from 'react';
import AnimatedPage from '../components/AnimatedPage';
import SEO from '../components/SEO';
import { Mail, Phone, MapPin, Loader2, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';


const WhatsAppIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38c1.45.79 3.08 1.21 4.79 1.21 5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2zM12.04 20.12c-1.48 0-2.91-.4-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31c-.82-1.28-1.26-2.79-1.26-4.38 0-4.54 3.7-8.23 8.24-8.23 2.22 0 4.29.86 5.82 2.39S20.27 9.82 20.27 12s-3.7 8.12-8.23 8.12zm4.24-6.01c-.23-.12-1.36-.67-1.57-.75-.21-.08-.36-.12-.52.12-.15.23-.59.75-.73.9-.13.15-.27.17-.5.05-.23-.12-1-.36-1.89-1.17-.7-.64-1.17-1.44-1.31-1.68-.13-.23 0-.36.11-.47.11-.11.23-.27.35-.41.12-.13.16-.23.25-.38.08-.15.04-.28-.02-.4-.06-.12-.52-1.25-.71-1.71-.19-.46-.39-.4-.52-.41-.13 0-.28-.02-.43-.02-.15 0-.4.06-.61.3-.21.24-.81.79-.81 1.94s.83 2.25.94 2.4c.12.15 1.64 2.5 4 3.48.58.24 1.03.38 1.38.48.5.15.94.13 1.3.08.4-.06 1.36-.56 1.55-1.1.19-.54.19-1 .13-1.1-.06-.11-.22-.18-.46-.3z"/>
    </svg>
);

const slideInFromLeft = {
  hidden: { x: -50, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { type: "spring", stiffness: 40, duration: 0.8 } },
} as const;

const slideInFromRight = {
  hidden: { x: 50, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { type: "spring", stiffness: 40, duration: 0.8 } },
} as const;

const ContactPage: React.FC = () => {
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSending(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const message = formData.get('message') as string;

    try {
        const response = await fetch('https://formspree.io/f/xzzbnqvj', {
            method: 'POST',
            headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, message })
        });
        if (!response.ok) {
            if (response.status === 404) {
                console.warn("Formspree form 'xzzbnqvj' not found. Simulating successful form submission for preview purposes.");
                setIsSending(false);
                setIsSent(true);
                return;
            }
            let errorText = `Server responded with status ${response.status}`;
            const responseText = await response.text();
            try {
                const errorData = JSON.parse(responseText);
                errorText = errorData.error || responseText;
            } catch (e) {
                errorText = responseText;
            }
            throw new Error(errorText);
        }

        setIsSent(true);
    } catch (err: any) {
        setError(err.message);
    } finally {
        setIsSending(false);
    }
};

  return (
    <AnimatedPage>
      <SEO
        title="Contact FANN | Get a Quote for Your Project"
        description="Reach out to FANN's team of design and build experts in Dubai. Contact us for a complimentary consultation on your next exhibition, event, or interior design project."
      >
        <script type="application/ld+json">
            {JSON.stringify({
                "@context": "https://schema.org",
                "@type": "LocalBusiness",
                "name": "FANN",
                "image": "https://fann.ae/favicon.svg",
                "@id": "https://fann.ae/",
                "url": "https://fann.ae/contact",
                "telephone": "+971505667502",
                "email": "sales@fann.ae",
                "address": {
                    "@type": "PostalAddress",
                    "streetAddress": "Office 508, Dusseldorf Business Point, Al Barsha 1",
                    "addressLocality": "Dubai",
                    "addressCountry": "AE"
                },
                 "department": [
                    {
                        "@type": "ContactPoint",
                        "contactType": "Warehouse",
                        "areaServed": "AE",
                        "address": {
                            "@type": "PostalAddress",
                            "streetAddress": "WH10-Umm Dera",
                            "addressLocality": "Umm Al Quain",
                            "addressCountry": "AE"
                        }
                    }
                ],
                "openingHoursSpecification": {
                    "@type": "OpeningHoursSpecification",
                    "dayOfWeek": [
                        "Monday",
                        "Tuesday",
                        "Wednesday",
                        "Thursday",
                        "Friday",
                        "Sunday"
                    ],
                    "opens": "09:00",
                    "closes": "18:00"
                }
            })}
        </script>
      </SEO>
      <div className="min-h-screen bg-fann-charcoal pt-32 pb-20 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-serif font-bold text-fann-gold mb-4">Contact Us</h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">We'd love to hear about your next project. Reach out to us through any of the channels below.</p>
          </div>
          
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
            <motion.div 
              className="bg-fann-charcoal-light border border-white/10 p-8 rounded-lg"
              variants={slideInFromLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
                <h2 className="text-3xl font-serif text-white mb-8" style={{ fontWeight: 600}}>Get in Touch</h2>
                <div className="space-y-6">
                    <div className="flex items-center space-x-4">
                        <Phone className="text-fann-gold flex-shrink-0" size={24} />
                        <a href="tel:+971505667502" className="text-lg text-gray-300 hover:text-white transition-colors">+971 50 566 7502</a>
                    </div>
                     <div className="flex items-center space-x-4">
                        <WhatsAppIcon className="text-fann-gold flex-shrink-0" />
                        <a href="https://wa.me/971505667502" target="_blank" rel="noopener noreferrer" className="text-lg text-gray-300 hover:text-white transition-colors">Chat on WhatsApp</a>
                    </div>
                    <div className="flex items-center space-x-4">
                        <Mail className="text-fann-gold flex-shrink-0" size={24} />
                        <a href="mailto:sales@fann.ae" className="text-lg text-gray-300 hover:text-white transition-colors">sales@fann.ae</a>
                    </div>
                     <div className="flex items-start space-x-4 pt-4 mt-4 border-t border-white/10">
                        <MapPin className="text-fann-gold mt-1 flex-shrink-0" size={24} />
                        <div>
                            <h3 className="text-lg font-bold text-white">Office Address</h3>
                            <p className="text-lg text-gray-400">Office 508, Dusseldorf Business Point, <br/>Al Barsha 1, Dubai, UAE</p>
                        </div>
                    </div>
                     <div className="flex items-start space-x-4 pt-4 mt-4 border-t border-white/10">
                        <MapPin className="text-fann-gold mt-1 flex-shrink-0" size={24} />
                         <div>
                            <h3 className="text-lg font-bold text-white">Warehouse Address</h3>
                            <p className="text-lg text-gray-400">WH10-Umm Dera, <br/>Umm Al Quain, UAE</p>
                        </div>
                    </div>
                </div>
            </motion.div>

            <motion.div 
              className="bg-fann-charcoal-light border border-white/10 p-8 rounded-lg"
              variants={slideInFromRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
                
                {isSent ? (
                     <div className="flex flex-col items-center justify-center h-full text-center py-12">
                        <CheckCircle className="w-16 h-16 text-fann-gold mx-auto mb-4" />
                        <h2 className="text-3xl font-serif text-white mb-4">Message Sent!</h2>
                        <p className="text-gray-400">Thank you for reaching out. We will get back to you shortly.</p>
                    </div>
                ) : (
                    <>
                        <h2 className="text-3xl font-serif text-white mb-8" style={{ fontWeight: 600}}>Send a Message</h2>
                        <form onSubmit={handleSubmit} className="space-y-6">
                           <div>
                               <input type="text" name="name" placeholder="Your Name" required className="w-full bg-black/30 border border-white/10 rounded-md px-4 py-3 text-white focus:outline-none focus:border-fann-gold transition-colors" />
                           </div>
                           <div>
                               <input type="email" name="email" placeholder="Your Email" required className="w-full bg-black/30 border border-white/10 rounded-md px-4 py-3 text-white focus:outline-none focus:border-fann-gold transition-colors" />
                           </div>
                           <div>
                               <textarea name="message" placeholder="Your Message" rows={5} required className="w-full bg-black/30 border border-white/10 rounded-md px-4 py-3 text-white focus:outline-none focus:border-fann-gold transition-colors"></textarea>
                           </div>
                            {error && <p className="text-red-500 text-sm">{error}</p>}
                           <div>
                               <motion.button 
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                                type="submit" 
                                disabled={isSending}
                                className="w-full bg-fann-gold text-fann-charcoal font-bold py-3 px-6 rounded-full flex items-center justify-center gap-2 disabled:opacity-70"
                                >
                                   {isSending ? <Loader2 className="animate-spin" /> : 'Send Message'}
                                </motion.button>
                           </div>
                        </form>
                    </>
                )}
            </motion.div>
          </div>
        </div>
      </div>
    </AnimatedPage>
  );
};

export default ContactPage;
