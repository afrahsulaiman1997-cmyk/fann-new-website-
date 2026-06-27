
import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    ArrowLeft, BookOpen, BrainCircuit, Building2, Globe, Lightbulb, 
    Loader2, Rocket, ServerCrash, Sparkles, Store, TrendingUp, AlertTriangle,
    Calendar, User, Newspaper
} from 'lucide-react';
import AnimatedPage from '../components/AnimatedPage';
import SEO from '../components/SEO';
import { useApiKey } from '../context/ApiKeyProvider';
import { blogPosts } from '../constants';

interface InsightTopic {
    title: string;
    slug: string;
    prompt: string;
    category: 'Exhibitions' | 'Events' | 'Interior Design';
    icon: React.ElementType;
    image: string;
}

interface Article {
    content: string;
    sources: Array<{ uri: string, title: string }>;
}

const slugify = (text: string) => text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');

const insightTopics: InsightTopic[] = [
    {
        title: "Sustainable Exhibition Design in the GCC",
        slug: slugify("Sustainable Exhibition Design in the GCC"),
        prompt: "Write an insightful blog post about the latest trends in sustainable and eco-friendly exhibition stand design, with a specific focus on the UAE and Saudi Arabia for 2024. Cover innovative materials, modularity for events like GITEX and LEAP, and energy efficiency standards at venues like DWTC and Riyadh Front.",
        category: 'Exhibitions',
        icon: Building2,
        image: 'https://images.pexels.com/photos/7437488/pexels-photo-7437488.jpeg?auto=compress&cs=tinysrgb&w=600&q=75'
    },
    {
        title: "Audience Engagement Tech at Dubai Events",
        slug: slugify("Audience Engagement Tech at Dubai Events"),
        prompt: "As an expert event management agency, write a blog post detailing the most innovative audience engagement technologies being used at corporate events in Dubai. Discuss AR, VR, and smart networking tools with examples from recent major UAE events. Focus on ROI for exhibitors.",
        category: 'Events',
        icon: BrainCircuit,
        image: 'https://images.pexels.com/photos/6187640/pexels-photo-6187640.jpeg?auto=compress&cs=tinysrgb&w=600&q=75'
    },
    {
        title: "Biophilic Design in Dubai & Riyadh Workspaces",
        slug: slugify("Biophilic Design in Dubai & Riyadh Workspaces"),
        prompt: "For an interior design firm's blog, write an article on the rise of Biophilic Design in modern workspaces and luxury commercial environments in Dubai and Riyadh. Explain the principles and highlight the benefits for employee well-being, citing examples from areas like DIFC and KAFD.",
        category: 'Interior Design',
        icon: Lightbulb,
        image: 'https://images.pexels.com/photos/1918291/pexels-photo-1918291.jpeg?auto=compress&cs=tinysrgb&w=600&q=75'
    },
];

const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "FANN Intelligence Hub",
    "description": "Access expert-driven analysis from the FANN Intelligence Hub. Stay ahead with the latest trends in exhibition design, event technology, and commercial interiors in the GCC.",
    "publisher": {
        "@type": "Organization",
        "name": "FANN",
        "logo": {
            "@type": "ImageObject",
            "url": "https://fann.ae/favicon.svg"
        }
    }
};

const formatContent = (text: string) => {
    let html = text
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\n(\s*#+\s.*)/g, (match, p1) => { 
            const level = p1.match(/#+/)[0].length;
            const content = p1.replace(/#+\s/, '');
            return `</p><h${level}>${content}</h${level}><p>`;
        })
        .replace(/\n\s*\n/g, '</p><p>') 
        .replace(/\n\s*-\s/g, '</li><li>') 
        .replace(/<li>/g, '<ul><li>')
        .replace(/<\/li><\/ul>/g, '</li></ul>');

    if ((html.match(/<ul>/g) || []).length > (html.match(/<\/ul>/g) || []).length) {
        html += '</ul>';
    }
    
    return `<p>${html}</p>`.replace(/<p><\/p>/g, '');
};

const InsightsPage: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const topicSlug = searchParams.get('topic');
    const blogSlug = searchParams.get('article');

    const [generatedArticle, setGeneratedArticle] = useState<Article | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const { ensureApiKey, handleApiError, error, clearError } = useApiKey();
    const [schema, setSchema] = useState<object>(blogSchema);

    // Filter current selected items
    const selectedTopic = useMemo(() => insightTopics.find(t => t.slug === topicSlug) || null, [topicSlug]);
    const selectedBlog = useMemo(() => blogPosts.find(b => b.slug === blogSlug) || null, [blogSlug]);

    const generateArticle = async (topic: InsightTopic) => {
        clearError();
        if (!await ensureApiKey()) return;
        setIsLoading(true);
        try {
            const response = await fetch('/api/generate-insights', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ prompt: topic.prompt }),
            });
            const data = await response.json();
            setGeneratedArticle(data);
        } catch (e: any) {
            handleApiError(e);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (selectedTopic && !generatedArticle && !isLoading) {
            generateArticle(selectedTopic);
        }
        if (!selectedTopic && !selectedBlog) {
            setGeneratedArticle(null);
        }
    }, [selectedTopic, selectedBlog]);

    const renderTopicSelection = () => (
        <div className="text-center">
            <h1 className="text-5xl font-serif font-bold text-fann-gold mb-4">Intelligence Hub</h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-12">
                Expert analysis and AI-powered insights for the UAE design market.
            </p>

            {/* Featured Blog Posts (Contractor Content) */}
            <div className="mb-20">
                <h2 className="text-left text-2xl font-serif font-bold text-white mb-8 flex items-center gap-3">
                    <Newspaper className="text-fann-gold" /> Featured Articles
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogPosts.map((post) => (
                        <motion.div 
                            key={post.id}
                            onClick={() => setSearchParams({ article: post.slug })}
                            className="bg-fann-charcoal-light border border-white/10 rounded-lg overflow-hidden cursor-pointer hover:border-fann-gold transition-all"
                        >
                            <img src={post.image} className="w-full h-48 object-cover opacity-80" alt={post.title} />
                            <div className="p-6 text-left">
                                <span className="text-xs font-bold uppercase text-fann-gold">{post.category}</span>
                                <h3 className="text-xl font-bold text-white mt-2 mb-3">{post.title}</h3>
                                <p className="text-sm text-gray-400 line-clamp-2 mb-4">{post.excerpt}</p>
                                <div className="flex items-center gap-4 text-[10px] text-gray-500 uppercase tracking-widest border-t border-white/5 pt-4">
                                    <span className="flex items-center gap-1"><Calendar size={12}/> {post.date}</span>
                                    <span className="flex items-center gap-1"><User size={12}/> {post.author}</span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* AI Topics */}
            <div className="mb-12">
                 <h2 className="text-left text-2xl font-serif font-bold text-white mb-8 flex items-center gap-3">
                    <BrainCircuit className="text-fann-gold" /> AI Trend Analysis
                </h2>
                <div className="grid md:grid-cols-3 gap-8">
                    {insightTopics.map((topic) => (
                        <div 
                            key={topic.slug}
                            onClick={() => setSearchParams({ topic: topic.slug })}
                            className="h-64 relative rounded-lg overflow-hidden cursor-pointer group border border-white/5"
                        >
                            <img src={topic.image} className="absolute inset-0 w-full h-full object-cover transition-transform group-hover:scale-110 opacity-50" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
                            <div className="relative h-full flex flex-col justify-end p-6 text-left">
                                <topic.icon className="text-fann-gold mb-2" size={24} />
                                <h3 className="text-lg font-bold text-white">{topic.title}</h3>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

    const renderArticle = () => {
        const title = selectedBlog?.title || selectedTopic?.title;
        const content = selectedBlog?.content || generatedArticle?.content;

        return (
            <div className="max-w-4xl mx-auto">
                <button onClick={() => setSearchParams({})} className="flex items-center gap-2 text-fann-gold mb-8 font-semibold hover:underline">
                    <ArrowLeft size={16} /> Back to Hub
                </button>
                
                {isLoading ? (
                    <div className="flex flex-col items-center py-20">
                        <Loader2 className="animate-spin text-fann-gold w-12 h-12" />
                        <p className="mt-4 text-gray-400">Compiling Industry Insights...</p>
                    </div>
                ) : (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-fann-charcoal-light border border-white/10 p-8 sm:p-12 rounded-lg">
                        <h1 className="text-4xl md:text-5xl font-serif font-bold text-fann-gold mb-6">{title}</h1>
                        <div className="flex items-center gap-6 mb-12 text-sm text-gray-500 border-b border-white/5 pb-6">
                            <span className="flex items-center gap-2"><User size={14}/> {selectedBlog?.author || 'FANN Intelligence'}</span>
                            <span className="flex items-center gap-2"><Calendar size={14}/> {selectedBlog?.date || 'Real-time Analysis'}</span>
                        </div>
                        <div
                            className="prose prose-lg max-w-none text-gray-300 leading-relaxed space-y-4 prose-strong:text-white prose-headings:text-fann-gold prose-a:text-fann-gold"
                            dangerouslySetInnerHTML={{ __html: formatContent(content || '') }}
                        />
                    </motion.div>
                )}
            </div>
        );
    };

    return (
        <AnimatedPage>
            <SEO title="Insights & Intelligence | FANN" description="Expert analysis on UAE exhibitions, events, and interiors." />
            <div className="min-h-screen bg-fann-charcoal pt-32 pb-20 text-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                   {topicSlug || blogSlug ? renderArticle() : renderTopicSelection()}
                </div>
            </div>
        </AnimatedPage>
    );
};

export default InsightsPage;
