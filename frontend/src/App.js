import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Sidebar from './components/layout/Sidebar';
import HomePage from './pages/HomePage';
import SpecializationPage from './pages/SpecializationPage';
import AIAssistantPage from './pages/AIAssistantPage';
import CVAnalyzerPage from './pages/CVAnalyzerPage';
import CertificatesPage from './pages/CertificatesPage';
import MockInterviewPage from './pages/MockInterviewPage';
import { SpecializationProvider } from './context/SpecializationContext';

function App() {
  return (
    <SpecializationProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          {/* Navigation Bar */}
          <Navbar />
          
          <div className="flex">
            {/* Sidebar */}
            <Sidebar />
            
            {/* Main Content */}
            <main className="flex-1 lg:ml-64 pt-16">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/specialization/:id" element={<SpecializationPage />} />
                  <Route path="/ai-assistant" element={<AIAssistantPage />} />
                  <Route path="/cv-analyzer" element={<CVAnalyzerPage />} />
                  <Route path="/certificates" element={<CertificatesPage />} />
                  <Route path="/mock-interview" element={<MockInterviewPage />} />
                </Routes>
              </div>
            </main>
          </div>
        </div>
      </Router>
    </SpecializationProvider>
  );
}

export default App; 