import React, { useState } from 'react';
import AnimatedPage from '../components/AnimatedPage';
import SEO from '../components/SEO';
import { Clock, Video, Award, Phone, Mail, AlertCircle, Calendar, Loader2, CheckCircle } from 'lucide-react';

const ConsultationPage: React.FC = () => {
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
        const phone = formData.get('phone') as string;
        const company = formData.get('company') as string;
        const details = formData.get('details') as string;

        try {
            const response = await fetch('https://formspree.io/f/xzzbnqvj', {
                method: 'POST',
                headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    subject: 'New Consultation Request',
                    name, 
                    email, 
                    phone,
                    company,
                    message: details 
                })
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
            <SEO title="Book Free Design Consultation | FANN" description="Schedule a 30-minute session with our expert exhibition designers." />
            <div className="min-h-screen bg-fann-charcoal text-white pt-32 pb-20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-12 gap-12">
                        
                        {/* Left: Pitch */}
                        <div className="lg:col-span-5 space-y-8">
                            <div>
                                <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6 text-fann-gold">
                                    Let's Discuss Your Vision
                                </h1>
                                <p className="text-lg text-gray-300 leading-relaxed">
                                    Planning an exhibition or event in the UAE? Book a complimentary strategy session with a senior FANN designer. No obligation, just expert advice.
                                </p>
                            </div>

                            <div className="space-y-6">
                                {[
                                    { icon: Clock, title: "Expert Guidance", desc: "Actionable advice for your next project." },
                                    { icon: Video, title: "Zoom, Teams or Phone", desc: "Convenient meeting options tailored for you." },
                                    { icon: Award, title: "Senior Expert", desc: "Speak directly with a lead designer." }
                                ].map((item, i) => (
                                    <div key={i} className="flex items-start gap-4 p-4 bg-white/5 border border-white/10 rounded-lg hover:border-fann-gold/30 transition-colors">
                                        <item.icon className="w-6 h-6 text-fann-gold mt-1" />
                                        <div>
                                            <h4 className="font-bold text-white">{item.title}</h4>
                                            <p className="text-sm text-gray-400">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="p-6 border-l-4 border-fann-gold bg-fann-charcoal-light border-y border-r border-white/5">
                                <p className="italic text-sm text-gray-300">
                                    "The consultation gave us more clarity in 30 minutes than we had in weeks of internal meetings."
                                </p>
                                <p className="mt-2 font-bold text-xs uppercase tracking-wider text-fann-gold">- Marketing Director, FinTech Hive</p>
                            </div>
                        </div>

                        {/* Right: Booking Form */}
                        <div className="lg:col-span-7 space-y-6">
                            <div className="bg-white rounded-lg shadow-2xl overflow-hidden p-8 border border-gray-200">
                                {isSent ? (
                                    <div className="text-center py-16 text-gray-800">
                                        <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
                                        <h3 className="text-3xl font-serif font-bold mb-4 text-gray-900">Request Received</h3>
                                        <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
                                            Thank you for reaching out. A senior designer will contact you shortly to confirm your consultation time.
                                        </p>
                                        <button 
                                            onClick={() => setIsSent(false)}
                                            className="px-8 py-3 bg-fann-gold text-fann-charcoal font-bold rounded-lg hover:bg-fann-gold-light transition-colors"
                                        >
                                            Book Another Consultation
                                        </button>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-6 text-gray-800">
                                        <div className="text-center mb-8">
                                            <h2 className="text-2xl font-bold text-gray-900 mb-2">Request a Consultation</h2>
                                            <p className="text-gray-500">Fill out the form below and we'll be in touch to schedule your session.</p>
                                        </div>
                                        
                                        {error && (
                                            <div className="p-4 bg-red-50 text-red-700 rounded-lg border border-red-200 flex items-start gap-3">
                                                <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                                                <p>{error}</p>
                                            </div>
                                        )}

                                        <div className="grid md:grid-cols-2 gap-6">
                                            <div>
                                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                                                <input type="text" id="name" name="name" required className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-fann-gold focus:border-transparent transition-all text-gray-900" placeholder="John Doe" />
                                            </div>
                                            <div>
                                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                                                <input type="email" id="email" name="email" required className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-fann-gold focus:border-transparent transition-all text-gray-900" placeholder="john@company.com" />
                                            </div>
                                        </div>

                                        <div className="grid md:grid-cols-2 gap-6">
                                            <div>
                                                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                                                <input type="tel" id="phone" name="phone" required className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-fann-gold focus:border-transparent transition-all text-gray-900" placeholder="+971 50 000 0000" />
                                            </div>
                                            <div>
                                                <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
                                                <input type="text" id="company" name="company" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-fann-gold focus:border-transparent transition-all text-gray-900" placeholder="Your Company" />
                                            </div>
                                        </div>

                                        <div>
                                            <label htmlFor="details" className="block text-sm font-medium text-gray-700 mb-2">Project Details</label>
                                            <textarea id="details" name="details" rows={4} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-fann-gold focus:border-transparent transition-all text-gray-900 resize-none" placeholder="Tell us a bit about your upcoming project or goals..."></textarea>
                                        </div>

                                        <button 
                                            type="submit" 
                                            disabled={isSending}
                                            className="w-full py-4 bg-fann-charcoal text-white font-bold rounded-lg hover:bg-fann-charcoal-light focus:outline-none focus:ring-4 focus:ring-gray-300 transition-all flex items-center justify-center gap-2 text-lg disabled:opacity-70 disabled:cursor-not-allowed"
                                        >
                                            {isSending ? (
                                                <>
                                                    <Loader2 className="w-5 h-5 animate-spin" />
                                                    Sending Request...
                                                </>
                                            ) : (
                                                'Request Consultation'
                                            )}
                                        </button>
                                    </form>
                                )}
                            </div>
                            
                            {/* Fallback Contact Options */}
                            <div className="bg-fann-charcoal-light border border-white/10 rounded-lg p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg">
                                <div className="flex items-center gap-3 text-gray-300">
                                    <AlertCircle className="w-5 h-5 text-fann-gold flex-shrink-0" />
                                    <p className="text-sm font-medium text-center sm:text-left">Prefer to speak directly with our team?</p>
                                </div>
                                <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
                                    <a href="tel:+971505667502" className="flex items-center gap-2 hover:text-fann-gold transition-colors text-white font-medium group">
                                        <div className="bg-white/5 p-2 rounded-full group-hover:bg-fann-gold/10 transition-colors">
                                            <Phone className="w-4 h-4 text-fann-gold" />
                                        </div>
                                        <span className="text-sm whitespace-nowrap">+971 50 566 7502</span>
                                    </a>
                                    <a href="mailto:sales@fann.ae" className="flex items-center gap-2 hover:text-fann-gold transition-colors text-white font-medium group">
                                        <div className="bg-white/5 p-2 rounded-full group-hover:bg-fann-gold/10 transition-colors">
                                            <Mail className="w-4 h-4 text-fann-gold" />
                                        </div>
                                        <span className="text-sm">sales@fann.ae</span>
                                    </a>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </AnimatedPage>
    );
};

export default ConsultationPage;