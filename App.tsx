import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import PortfolioPage from './pages/PortfolioPage';
import ProjectDetailPage from './pages/ProjectDetailPage';
import AIDesignStudioPage from './pages/AIDesignStudioPage';
import ExhibitionStudioPage from './pages/ExhibitionStudioPage';
import DesignResultPage from './pages/DesignResultPage';
import EventStudioPage from './pages/EventStudioPage';
import EventResultPage from './pages/EventResultPage';
import InteriorStudioPage from './pages/InteriorStudioPage';
import InteriorResultPage from './pages/InteriorResultPage';
import EventsCalendarPage from './pages/EventsCalendarPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import InsightsPage from './pages/InsightsPage';
import { ApiKeyProvider } from './context/ApiKeyProvider';
import ROICalculatorPage from './pages/ROICalculatorPage';
import CustomStandsPage from './pages/services/CustomStandsPage';
import ModularSystemsPage from './pages/services/ModularSystemsPage';
import TurnkeyServicesPage from './pages/services/TurnkeyServicesPage';
import FabricationPage from './pages/services/FabricationPage';
import FitOutPage from './pages/services/FitOutPage';
import TestimonialsPage from './pages/TestimonialsPage';
import GoogleAnalytics from './components/GoogleAnalytics'; // Import the tracker

// New Lead Magnet Pages
import ExhibitionGuidePage from './pages/resources/ExhibitionGuidePage';
import TrendsReportPage from './pages/resources/TrendsReportPage';
import CostCalculatorPage from './pages/resources/CostCalculatorPage';
import ConsultationPage from './pages/ConsultationPage';

const App: React.FC = () => {
    const location = useLocation();

    return (
        <ApiKeyProvider>
            <GoogleAnalytics /> {/* Fired on every route change */}
            <Layout>
                <AnimatePresence mode="wait">
                    <Routes location={location} key={location.pathname}>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/services" element={<ServicesPage />} />
                        {/* Service Detail Pages */}
                        <Route path="/services/custom-exhibition-stands-dubai" element={<CustomStandsPage />} />
                        <Route path="/services/modular-exhibition-systems-dubai" element={<ModularSystemsPage />} />
                        <Route path="/services/turnkey-exhibition-services-uae" element={<TurnkeyServicesPage />} />
                        <Route path="/services/exhibition-stand-fabrication-dubai" element={<FabricationPage />} />
                        <Route path="/services/interior-fitout-exhibition-spaces-dubai" element={<FitOutPage />} />
                        
                        <Route path="/portfolio" element={<PortfolioPage />} />
                        <Route path="/portfolio/:slug" element={<ProjectDetailPage />} />
                        
                        <Route path="/testimonials" element={<TestimonialsPage />} />
                        <Route path="/fann-studio" element={<AIDesignStudioPage />} />
                        <Route path="/fann-studio/exhibition" element={<ExhibitionStudioPage />} />
                        <Route path="/fann-studio/exhibition/result" element={<DesignResultPage />} />
                        <Route path="/fann-studio/event" element={<EventStudioPage />} />
                        <Route path="/fann-studio/event/result" element={<EventResultPage />} />
                        <Route path="/fann-studio/interior" element={<InteriorStudioPage />} />
                        <Route path="/fann-studio/interior/result" element={<InteriorResultPage />} />
                        <Route path="/events-calendar" element={<EventsCalendarPage />} />
                        <Route path="/about" element={<AboutPage />} />
                        <Route path="/contact" element={<ContactPage />} />
                        <Route path="/insights" element={<InsightsPage />} />
                        <Route path="/roi-calculator" element={<ROICalculatorPage />} />
                        
                        {/* Resources & Lead Magnets */}
                        <Route path="/resources/exhibition-guide" element={<ExhibitionGuidePage />} />
                        <Route path="/resources/trends-2026" element={<TrendsReportPage />} />
                        <Route path="/resources/cost-calculator" element={<CostCalculatorPage />} />
                        <Route path="/book-consultation" element={<ConsultationPage />} />
                    </Routes>
                </AnimatePresence>
            </Layout>
        </ApiKeyProvider>
    );
};

export default App;
