
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Check, ChevronRight, Calendar, MapPin, DollarSign, Box, 
    TrendingUp, AlertTriangle, Clock, Layout, FileText, 
    Download, RefreshCw, Zap, MessageSquare, LifeBuoy, 
    ArrowLeft, Plus, Loader2, User, Mail, Building
} from 'lucide-react';
import AnimatedPage from '../../components/AnimatedPage';
import SEO from '../../components/SEO';
import { Link } from 'react-router-dom';

// --- Types ---
interface GuideState {
    step: number;
    industry: string;
    eventType: string;
    eventDate: string;
    standSize: number;
    budget: string;
    location: string;
    experienceLevel: string;
}

interface ContactInfo {
    name: string;
    email: string;
    company: string;
}

interface GuideData {
    guideTitle: string;
    executiveSummary: string;
    timelineStatus: 'On Track' | 'Caution' | 'Critical';
    daysRemaining: number;
    phases: Array<{
        phaseName: string;
        timeframe: string;
        description: string;
        actions: Array<{ task: string; priority: string; isCompleted?: boolean }>;
    }>;
    compliance_notes: string[];
    budget_hacks: string[];
    common_pitfalls: string[];
}

// --- Constants ---
const industries = ["Technology", "Real Estate", "Healthcare", "Energy", "Food & Bev", "Construction", "Beauty", "Finance"];
const budgets = ["< AED 50k", "AED 50k - 100k", "AED 100k - 250k", "AED 250k+"];
const experienceLevels = ["First Timer", "Intermediate", "Veteran"];

// --- Components ---

const EmergencyModal: React.FC<{ onClose: () => void; daysLeft: number }> = ({ onClose, daysLeft }) => {
    const [issue, setIssue] = useState('');
    const [plan, setPlan] = useState('');
    const [loading, setLoading] = useState(false);

    const handleEmergency = async () => {
        if(!issue) return;
        setLoading(true);
        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    history: [{
                        role: 'user',
                        parts: [{ text: `EMERGENCY MODE: I have an exhibition in ${daysLeft} days. The problem is: "${issue}". Give me a 3-step immediate action plan to fix this or mitigate damage. Keep it extremely concise and directive.` }]
                    }] 
                })
            });
            const data = await response.json();
            setPlan(data.content);
        } catch (e) {
            setPlan("System overloaded. Call FANN Support immediately at +971 50 566 7502.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
            <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-[#1a0505] border-2 border-red-600 rounded-lg p-8 max-w-lg w-full shadow-[0_0_50px_rgba(220,38,38,0.5)]"
            >
                <div className="flex items-center gap-3 mb-6 text-red-500">
                    <AlertTriangle size={32} className="animate-pulse"/>
                    <h2 className="text-2xl font-bold uppercase tracking-widest">Emergency Protocol</h2>
                </div>
                
                {!plan ? (
                    <>
                        <p className="text-red-200 mb-4">Describe the critical issue. AI will generate an immediate containment strategy.</p>
                        <textarea 
                            className="w-full bg-black/50 border border-red-900 rounded p-4 text-white focus:border-red-500 outline-none mb-6"
                            rows={3}
                            placeholder="e.g., Contractor cancelled, shipment delayed..."
                            value={issue}
                            onChange={(e) => setIssue(e.target.value)}
                        />
                        <div className="flex gap-4">
                            <button onClick={onClose} className="flex-1 py-3 rounded border border-red-900 text-red-500 hover:bg-red-900/20">Cancel</button>
                            <button onClick={handleEmergency} disabled={loading} className="flex-1 py-3 rounded bg-red-600 text-white font-bold hover:bg-red-700 flex justify-center items-center gap-2">
                                {loading ? <Loader2 className="animate-spin"/> : <Zap size={18}/>}
                                Generate Plan
                            </button>
                        </div>
                    </>
                ) : (
                    <div className="space-y-6">
                        <div className="prose prose-invert prose-sm max-h-[300px] overflow-y-auto text-red-100">
                            <div dangerouslySetInnerHTML={{__html: plan.replace(/\n/g, '<br/>')}} />
                        </div>
                        <div className="flex gap-4">
                            <a href="tel:+971505667502" className="flex-1 py-3 rounded bg-white text-black font-bold text-center flex items-center justify-center gap-2">
                                <LifeBuoy size={18}/> Call Support
                            </a>
                            <button onClick={onClose} className="flex-1 py-3 rounded border border-red-500 text-red-500">Close</button>
                        </div>
                    </div>
                )}
            </motion.div>
        </div>
    );
};

const TemplateGenerator: React.FC<{ context: GuideState }> = ({ context }) => {
    const [type, setType] = useState('Design Brief');
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(false);

    const generate = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/generate-template', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ templateType: type, userContext: context })
            });
            const data = await res.json();
            setContent(data.content);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-fann-charcoal-light border border-white/10 rounded-lg p-6">
            <h3 className="text-lg font-serif font-bold text-fann-gold mb-4 flex items-center gap-2">
                <FileText size={18}/> Document Generator
            </h3>
            <div className="flex gap-2 mb-4">
                {['Design Brief', 'RFP for Builders', 'Staff Training Manual'].map(t => (
                    <button 
                        key={t} 
                        onClick={() => { setType(t); setContent(''); }}
                        className={`px-3 py-1 text-xs rounded-full border transition-all ${type === t ? 'bg-fann-gold text-black border-fann-gold' : 'border-white/20 text-gray-400 hover:text-white'}`}
                    >
                        {t}
                    </button>
                ))}
            </div>
            
            {!content ? (
                <button onClick={generate} disabled={loading} className="w-full py-8 border-2 border-dashed border-white/10 rounded-lg text-gray-500 hover:border-fann-gold/50 hover:text-fann-gold transition-colors flex flex-col items-center gap-2 bg-black/20">
                    {loading ? <Loader2 className="animate-spin"/> : <Plus size={24}/>}
                    <span>Generate {type}</span>
                </button>
            ) : (
                <div className="relative">
                    <textarea 
                        readOnly 
                        value={content} 
                        className="w-full h-64 bg-black/50 border border-white/10 rounded p-4 text-xs font-mono text-gray-300 resize-none focus:outline-none"
                    />
                    <button 
                        onClick={() => {
                            const blob = new Blob([content], { type: 'text/plain' });
                            const url = URL.createObjectURL(blob);
                            const a = document.createElement('a');
                            a.href = url;
                            a.download = `${type.replace(/\s/g, '_')}_Template.md`;
                            a.click();
                        }}
                        className="absolute top-2 right-2 bg-fann-gold text-black text-xs px-3 py-1 rounded font-bold flex items-center gap-1"
                    >
                        <Download size={12}/> Save
                    </button>
                </div>
            )}
        </div>
    );
};

const ExhibitionGuidePage: React.FC = () => {
    const [step, setStep] = useState(1);
    const [state, setState] = useState<GuideState>({
        step: 1,
        industry: 'Technology',
        eventType: 'Trade Show',
        eventDate: '',
        standSize: 30,
        budget: 'AED 50k - 100k',
        location: 'Dubai World Trade Centre',
        experienceLevel: 'Intermediate'
    });
    const [contact, setContact] = useState<ContactInfo>({ name: '', email: '', company: '' });
    
    const [guide, setGuide] = useState<GuideData | null>(null);
    const [loading, setLoading] = useState(false);
    const [showEmergency, setShowEmergency] = useState(false);
    const [activeTab, setActiveTab] = useState<'timeline' | 'checklist' | 'tools'>('timeline');
    const [showDownloadForm, setShowDownloadForm] = useState(false);
    const [isDownloading, setIsDownloading] = useState(false);

    const generateGuide = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/generate-exhibition-guide', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(state)
            });
            const data = await res.json();
            setGuide(data);
            setStep(4); // Move to dashboard
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    const handleDownloadClick = () => {
        if (!contact.name || !contact.email) {
            setShowDownloadForm(true);
        } else {
            downloadPDF();
        }
    };

    const downloadPDF = async () => {
        setIsDownloading(true);
        try {
            const response = await fetch('/api/generate-guide-pdf', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ guideData: guide, userContext: state, contactInfo: contact }),
            });
            const { htmlContent } = await response.json();
            const blob = new Blob([htmlContent], { type: 'text/html' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `FANN_Guide_${state.industry}.html`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            setShowDownloadForm(false); // Hide form after download
        } catch (e) {
            console.error(e);
        } finally {
            setIsDownloading(false);
        }
    };

    const renderOnboarding = () => (
        <div className="max-w-2xl mx-auto bg-fann-charcoal-light border border-white/10 p-8 rounded-2xl shadow-2xl">
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-serif font-bold text-white">
                    {step === 1 ? "Event Basics" : step === 2 ? "Stand Specs" : "Context"}
                </h2>
                <div className="flex gap-2">
                    {[1, 2, 3].map(i => (
                        <div key={i} className={`w-2 h-2 rounded-full ${i === step ? 'bg-fann-gold' : 'bg-white/20'}`} />
                    ))}
                </div>
            </div>

            {step === 1 && (
                <motion.div initial={{opacity: 0, x: 20}} animate={{opacity: 1, x: 0}} className="space-y-6">
                    <div>
                        <label className="block text-xs uppercase tracking-wider font-bold text-gray-400 mb-2">Event Date</label>
                        <input type="date" value={state.eventDate} onChange={(e) => setState({...state, eventDate: e.target.value})} className="w-full bg-black/50 border border-white/20 rounded p-3 text-white focus:border-fann-gold outline-none"/>
                    </div>
                    <div>
                        <label className="block text-xs uppercase tracking-wider font-bold text-gray-400 mb-2">Event Type</label>
                        <select value={state.eventType} onChange={(e) => setState({...state, eventType: e.target.value})} className="w-full bg-black/50 border border-white/20 rounded p-3 text-white focus:border-fann-gold outline-none">
                            <option>Trade Show</option>
                            <option>Conference</option>
                            <option>Consumer Expo</option>
                            <option>Corporate Event</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-xs uppercase tracking-wider font-bold text-gray-400 mb-2">Location / Venue</label>
                        <input type="text" value={state.location} onChange={(e) => setState({...state, location: e.target.value})} className="w-full bg-black/50 border border-white/20 rounded p-3 text-white focus:border-fann-gold outline-none" placeholder="e.g. Dubai World Trade Centre"/>
                    </div>
                    <button onClick={() => state.eventDate && setStep(2)} className="w-full btn-gold mt-4">Next</button>
                </motion.div>
            )}

            {step === 2 && (
                <motion.div initial={{opacity: 0, x: 20}} animate={{opacity: 1, x: 0}} className="space-y-6">
                    <div>
                        <label className="block text-xs uppercase tracking-wider font-bold text-gray-400 mb-2">Stand Size (sqm)</label>
                        <input type="number" value={state.standSize} onChange={(e) => setState({...state, standSize: parseInt(e.target.value)})} className="w-full bg-black/50 border border-white/20 rounded p-3 text-white focus:border-fann-gold outline-none"/>
                    </div>
                    <div>
                        <label className="block text-xs uppercase tracking-wider font-bold text-gray-400 mb-2">Budget Range</label>
                        <div className="grid grid-cols-2 gap-2">
                            {budgets.map(b => (
                                <button key={b} onClick={() => setState({...state, budget: b})} className={`p-3 rounded border text-sm ${state.budget === b ? 'border-fann-gold bg-fann-gold/10 text-white' : 'border-white/10 text-gray-400 hover:text-white'}`}>
                                    {b}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="flex gap-4 mt-6">
                        <button onClick={() => setStep(1)} className="text-gray-400 font-medium">Back</button>
                        <button onClick={() => setStep(3)} className="flex-1 btn-gold">Next</button>
                    </div>
                </motion.div>
            )}

            {step === 3 && (
                <motion.div initial={{opacity: 0, x: 20}} animate={{opacity: 1, x: 0}} className="space-y-6">
                    <div>
                        <label className="block text-xs uppercase tracking-wider font-bold text-gray-400 mb-2">Industry</label>
                        <select value={state.industry} onChange={(e) => setState({...state, industry: e.target.value})} className="w-full bg-black/50 border border-white/20 rounded p-3 text-white focus:border-fann-gold outline-none">
                            {industries.map(i => <option key={i} value={i}>{i}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className="block text-xs uppercase tracking-wider font-bold text-gray-400 mb-2">Experience Level</label>
                        <div className="flex gap-2">
                            {experienceLevels.map(l => (
                                <button key={l} onClick={() => setState({...state, experienceLevel: l})} className={`flex-1 p-3 rounded border text-sm ${state.experienceLevel === l ? 'border-fann-gold bg-fann-gold/10 text-white' : 'border-white/10 text-gray-400 hover:text-white'}`}>
                                    {l}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="flex gap-4 mt-6">
                        <button onClick={() => setStep(2)} className="text-gray-400 font-medium">Back</button>
                        <button onClick={generateGuide} disabled={loading} className="flex-1 btn-gold flex justify-center items-center gap-2">
                            {loading ? <Loader2 className="animate-spin"/> : <Zap size={16}/>} Generate Strategy
                        </button>
                    </div>
                </motion.div>
            )}
        </div>
    );

    return (
        <AnimatedPage>
            <SEO title="AI Exhibition Copilot | FANN" description="Your personalized, AI-powered guide for exhibition success in Dubai." />
            <div className="min-h-screen bg-fann-charcoal pt-32 pb-20 text-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    
                    {step < 4 && (
                        <div className="text-center mb-12">
                            <span className="text-fann-gold text-xs font-bold uppercase tracking-widest border border-fann-gold/20 px-3 py-1 rounded-full bg-fann-gold/5 mb-4 inline-block">Beta 3.0</span>
                            <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-4">Exhibition Copilot</h1>
                            <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-6">
                                An intelligent agent that builds your timeline, checklists, and compliance strategy instantly.
                            </p>
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-fann-gold/10 border border-fann-gold/20 text-fann-gold/80 text-xs font-semibold">
                                <AlertTriangle size={14} />
                                <span>Beta Preview: Strategy generated by AI. Please verify critical dates.</span>
                            </div>
                        </div>
                    )}

                    {step < 4 ? renderOnboarding() : guide && (
                        <div className="max-w-6xl mx-auto">
                            
                            {/* Header Dashboard */}
                            <div className="grid md:grid-cols-3 gap-6 mb-8">
                                <div className="md:col-span-2 bg-fann-charcoal-light border border-white/10 p-6 rounded-xl flex flex-col justify-center">
                                    <h1 className="text-2xl font-serif text-fann-gold mb-2">{guide.guideTitle}</h1>
                                    <p className="text-sm text-gray-400 italic">"{guide.executiveSummary}"</p>
                                </div>
                                <div className={`p-6 rounded-xl border flex flex-col items-center justify-center text-center ${guide.timelineStatus === 'Critical' ? 'bg-red-900/20 border-red-500' : guide.timelineStatus === 'Caution' ? 'bg-yellow-900/20 border-yellow-500' : 'bg-green-900/20 border-green-500'}`}>
                                    <span className="text-xs uppercase tracking-widest opacity-70 mb-2">Timeline Status</span>
                                    <div className="text-4xl font-bold mb-1">{guide.daysRemaining}</div>
                                    <span className="text-sm">Days Left</span>
                                </div>
                            </div>

                            {/* Navigation Tabs */}
                            <div className="flex gap-4 mb-8 overflow-x-auto pb-2 border-b border-white/10">
                                {[
                                    { id: 'timeline', label: 'Timeline', icon: Calendar },
                                    { id: 'checklist', label: 'Checklist', icon: Check },
                                    { id: 'tools', label: 'Tools & Templates', icon: Layout }
                                ].map(tab => (
                                    <button 
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id as any)}
                                        className={`flex items-center gap-2 px-6 py-3 rounded-t-lg transition-colors whitespace-nowrap ${activeTab === tab.id ? 'bg-white/10 text-fann-gold border-b-2 border-fann-gold' : 'text-gray-400 hover:text-white'}`}
                                    >
                                        <tab.icon size={16}/> {tab.label}
                                    </button>
                                ))}
                                <button 
                                    onClick={() => setShowEmergency(true)} 
                                    className="ml-auto bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 flex items-center gap-2 text-sm font-bold animate-pulse"
                                >
                                    <AlertTriangle size={16}/> Emergency Mode
                                </button>
                            </div>

                            {/* Content */}
                            <div className="grid lg:grid-cols-3 gap-8">
                                <div className="lg:col-span-2 space-y-8">
                                    
                                    {/* Timeline View */}
                                    {activeTab === 'timeline' && (
                                        <div className="space-y-6">
                                            {guide.phases.map((phase, i) => (
                                                <div key={i} className="bg-fann-charcoal-light border border-white/10 rounded-xl p-6 relative overflow-hidden group hover:border-fann-gold/30 transition-colors">
                                                    <div className="absolute top-0 left-0 w-1 h-full bg-fann-gold opacity-20 group-hover:opacity-100 transition-opacity"/>
                                                    <div className="flex justify-between items-start mb-4">
                                                        <div>
                                                            <span className="text-xs uppercase tracking-widest text-fann-gold bg-fann-gold/10 px-2 py-1 rounded">{phase.timeframe}</span>
                                                            <h3 className="text-xl font-bold text-white mt-2">{phase.phaseName}</h3>
                                                        </div>
                                                        <div className="bg-white/5 p-2 rounded-full">
                                                            <Clock size={20} className="text-gray-400"/>
                                                        </div>
                                                    </div>
                                                    <p className="text-gray-300 text-sm mb-4">{phase.description}</p>
                                                    <div className="space-y-2">
                                                        {phase.actions.slice(0, 3).map((action, j) => (
                                                            <div key={j} className="flex items-center gap-3 text-sm text-gray-300 bg-black/30 p-2 rounded">
                                                                <div className={`w-2 h-2 rounded-full ${action.priority === 'High' ? 'bg-red-500' : 'bg-blue-500'}`}/>
                                                                {action.task}
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {/* Checklist View */}
                                    {activeTab === 'checklist' && (
                                        <div className="bg-fann-charcoal-light border border-white/10 rounded-xl p-6">
                                            {guide.phases.map((phase, i) => (
                                                <div key={i} className="mb-8 last:mb-0">
                                                    <h3 className="text-fann-gold font-bold mb-4 border-b border-white/10 pb-2">{phase.phaseName}</h3>
                                                    <div className="space-y-3">
                                                        {phase.actions.map((action, j) => (
                                                            <label key={j} className="flex items-start gap-3 p-3 hover:bg-white/5 rounded cursor-pointer group">
                                                                <input type="checkbox" className="mt-1 w-4 h-4 accent-fann-gold rounded bg-black border-gray-600"/>
                                                                <span className="text-sm text-gray-300 group-hover:text-white">{action.task}</span>
                                                                {action.priority === 'High' && <span className="ml-auto text-[10px] uppercase bg-red-900/50 text-red-300 px-2 py-0.5 rounded">Priority</span>}
                                                            </label>
                                                        ))}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {/* Tools View */}
                                    {activeTab === 'tools' && (
                                        <div className="space-y-6">
                                            <TemplateGenerator context={state} />
                                            <div className="bg-blue-900/20 border border-blue-500/30 p-6 rounded-xl">
                                                <h3 className="text-blue-300 font-bold mb-2 flex items-center gap-2"><RefreshCw size={18}/> Budget Optimizer</h3>
                                                <ul className="space-y-2 list-disc list-inside text-sm text-blue-100/70">
                                                    {guide.budget_hacks.map((hack, i) => <li key={i}>{hack}</li>)}
                                                </ul>
                                            </div>
                                        </div>
                                    )}

                                    <div className="flex flex-col items-center justify-center pt-8">
                                        <AnimatePresence>
                                            {showDownloadForm && (
                                                <motion.div 
                                                    initial={{ opacity: 0, height: 0 }}
                                                    animate={{ opacity: 1, height: 'auto' }}
                                                    exit={{ opacity: 0, height: 0 }}
                                                    className="bg-fann-charcoal-light border border-white/10 p-6 rounded-xl mb-4 w-full max-w-md overflow-hidden"
                                                >
                                                    <h3 className="text-lg font-bold text-white mb-4 text-center">Final Step: Where should we send the PDF?</h3>
                                                    <div className="space-y-3">
                                                        <div className="relative">
                                                            <User className="absolute left-3 top-3 text-gray-500" size={16}/>
                                                            <input type="text" placeholder="Full Name" value={contact.name} onChange={e => setContact({...contact, name: e.target.value})} className="w-full pl-10 bg-black/50 border border-white/20 rounded p-2 text-sm text-white outline-none focus:border-fann-gold"/>
                                                        </div>
                                                        <div className="relative">
                                                            <Mail className="absolute left-3 top-3 text-gray-500" size={16}/>
                                                            <input type="email" placeholder="Work Email" value={contact.email} onChange={e => setContact({...contact, email: e.target.value})} className="w-full pl-10 bg-black/50 border border-white/20 rounded p-2 text-sm text-white outline-none focus:border-fann-gold"/>
                                                        </div>
                                                        <div className="relative">
                                                            <Building className="absolute left-3 top-3 text-gray-500" size={16}/>
                                                            <input type="text" placeholder="Company" value={contact.company} onChange={e => setContact({...contact, company: e.target.value})} className="w-full pl-10 bg-black/50 border border-white/20 rounded p-2 text-sm text-white outline-none focus:border-fann-gold"/>
                                                        </div>
                                                        <button onClick={downloadPDF} disabled={!contact.name || !contact.email || isDownloading} className="w-full btn-gold flex items-center justify-center gap-2 mt-2">
                                                            {isDownloading ? <Loader2 className="animate-spin"/> : <Download size={16}/>} Download PDF
                                                        </button>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                        
                                        {!showDownloadForm && (
                                            <button onClick={handleDownloadClick} className="btn-gold flex items-center gap-2">
                                                <Download size={18}/> Export Strategy PDF
                                            </button>
                                        )}
                                    </div>
                                </div>

                                {/* Sidebar */}
                                <div className="space-y-6">
                                    <div className="bg-fann-charcoal-light border border-white/10 p-6 rounded-xl">
                                        <h3 className="text-white font-bold mb-4 flex items-center gap-2"><MapPin size={18} className="text-fann-gold"/> Location Intel</h3>
                                        <ul className="space-y-3 text-sm text-gray-300">
                                            {guide.compliance_notes.map((note, i) => (
                                                <li key={i} className="flex gap-2">
                                                    <span className="text-fann-gold">•</span> {note}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className="bg-red-900/10 border border-red-900/30 p-6 rounded-xl">
                                        <h3 className="text-red-400 font-bold mb-4 flex items-center gap-2"><AlertTriangle size={18}/> Pitfalls</h3>
                                        <ul className="space-y-3 text-sm text-gray-300">
                                            {guide.common_pitfalls.map((pitfall, i) => (
                                                <li key={i} className="flex gap-2">
                                                    <span className="text-red-500">×</span> {pitfall}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className="bg-white/5 p-6 rounded-xl text-center">
                                        <MessageSquare className="w-8 h-8 text-fann-gold mx-auto mb-3"/>
                                        <h3 className="text-white font-bold">Need Human Help?</h3>
                                        <p className="text-xs text-gray-400 mb-4">Our project directors are ready to step in.</p>
                                        <Link to="/book-consultation" className="block w-full border border-white/20 hover:bg-white hover:text-black text-white py-2 rounded text-sm transition-colors">
                                            Book Consultation
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            
            {showEmergency && <EmergencyModal onClose={() => setShowEmergency(false)} daysLeft={guide?.daysRemaining || 0} />}
        </AnimatedPage>
    );
};

export default ExhibitionGuidePage;
