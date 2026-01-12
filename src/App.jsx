import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import EcommerceProject from './pages/EcommerceProject';
import TaskManagerProject from './pages/TaskManagerProject';
import WeatherProject from './pages/WeatherProject';
import GameProject from './pages/GameProject';
import AppProject from './pages/AppProject';
import FilmProject from './pages/FilmProject';
import TemplateStore from './pages/TemplateStore';
import PreviewFrame from './pages/PreviewFrame';
import Lessons from './pages/Lessons';
import LessonView from './pages/LessonView';
import LiveSessions from './pages/LiveSessions';
import ChatWidget from './components/ChatWidget';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import { SiteContentProvider } from './context/SiteContentContext';
import EcommerceDemo from './demos/EcommerceDemo';
import TaskManagerDemo from './demos/TaskManagerDemo';
import WeatherDemo from './demos/WeatherDemo';
import GameDemo from './demos/GameDemo';
import AppDemo from './demos/AppDemo';
import FilmDemo from './demos/FilmDemo';
import AgencyDemo from './demos/AgencyDemo';
import SaasDemo from './demos/SaasDemo';
import { SmartUI } from './components/SmartUI';
import CommandPalette from './components/CommandPalette';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import VideoAccess from './pages/VideoAccess';
import UserLogin from './pages/UserLogin';
import UserSignup from './pages/UserSignup';
import UserProfile from './pages/UserProfile';
import UserProtectedRoute from './components/UserProtectedRoute';


function App() {
    return (
        <SiteContentProvider>
            <Router>
                <div className="min-h-screen font-sans bg-neutral-950 text-neutral-100">
                    <SmartUI />
                    <CommandPalette />
                    <Navbar />

                    <Routes>
                        <Route path="/login" element={<UserLogin />} />
                        <Route path="/signup" element={<UserSignup />} />

                        <Route path="/" element={<UserProtectedRoute><Home /></UserProtectedRoute>} />
                        <Route path="/profile" element={<UserProtectedRoute><UserProfile /></UserProtectedRoute>} />
                        <Route path="/store" element={<UserProtectedRoute><TemplateStore /></UserProtectedRoute>} />
                        <Route path="/lessons" element={<UserProtectedRoute><Lessons /></UserProtectedRoute>} />
                        <Route path="/lessons/:id" element={<UserProtectedRoute><LessonView /></UserProtectedRoute>} />
                        <Route path="/live" element={<UserProtectedRoute><LiveSessions /></UserProtectedRoute>} />
                        <Route path="/preview/:id" element={<UserProtectedRoute><PreviewFrame /></UserProtectedRoute>} />

                        {/* Admin Routes */}
                        <Route path="/admin/login" element={<AdminLogin />} />
                        <Route
                            path="/admin"
                            element={
                                <ProtectedRoute>
                                    <AdminDashboard />
                                </ProtectedRoute>
                            }
                        />

                        {/* Project Detail Pages */}
                        <Route path="/projects/ecommerce" element={<UserProtectedRoute><EcommerceProject /></UserProtectedRoute>} />
                        <Route path="/projects/taskmanager" element={<UserProtectedRoute><TaskManagerProject /></UserProtectedRoute>} />
                        <Route path="/projects/weather" element={<UserProtectedRoute><WeatherProject /></UserProtectedRoute>} />
                        <Route path="/projects/game" element={<UserProtectedRoute><GameProject /></UserProtectedRoute>} />
                        <Route path="/projects/app" element={<UserProtectedRoute><AppProject /></UserProtectedRoute>} />
                        <Route path="/projects/film" element={<UserProtectedRoute><FilmProject /></UserProtectedRoute>} />

                        {/* Interactive Demos */}
                        <Route path="/demo/ecommerce" element={<UserProtectedRoute><EcommerceDemo /></UserProtectedRoute>} />
                        <Route path="/demo/taskmanager" element={<UserProtectedRoute><TaskManagerDemo /></UserProtectedRoute>} />
                        <Route path="/demo/weather" element={<UserProtectedRoute><WeatherDemo /></UserProtectedRoute>} />
                        <Route path="/demo/game" element={<UserProtectedRoute><GameDemo /></UserProtectedRoute>} />
                        <Route path="/demo/app" element={<UserProtectedRoute><AppDemo /></UserProtectedRoute>} />
                        <Route path="/demo/film" element={<UserProtectedRoute><FilmDemo /></UserProtectedRoute>} />
                        <Route path="/demo/agency" element={<UserProtectedRoute><AgencyDemo /></UserProtectedRoute>} />
                        <Route path="/demo/saas" element={<UserProtectedRoute><SaasDemo /></UserProtectedRoute>} />

                        {/* Legal Routes */}
                        <Route path="/privacy" element={<UserProtectedRoute><PrivacyPolicy /></UserProtectedRoute>} />
                        <Route path="/terms" element={<UserProtectedRoute><TermsOfService /></UserProtectedRoute>} />
                        <Route path="/video-access" element={<UserProtectedRoute><VideoAccess /></UserProtectedRoute>} />
                    </Routes>
                    <Footer />
                    <ChatWidget />
                </div>
            </Router>
        </SiteContentProvider>
    );
}

export default App;
