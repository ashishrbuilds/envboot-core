import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { PackageManagerProvider } from './context/PackageManagerContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { DocsLayout } from './pages/DocsLayout';
import { QuickstartPage } from './pages/QuickstartPage';
import { CliPage } from './pages/CliPage';
import { FrameworksPage } from './pages/FrameworksPage';
import { CiCdPage } from './pages/CiCdPage';
import { ApiPage } from './pages/ApiPage';
import { PlaygroundPage } from './pages/PlaygroundPage';

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <PackageManagerProvider>
        <Router>
          <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 dark:bg-slate-950 dark:text-slate-100 light:bg-white light:text-slate-900 selection:bg-emerald-500/20 selection:text-emerald-300">
            <Navbar />
            <div className="flex-1">
              <Routes>
                <Route path="/" element={<HomePage />} />
                
                {/* Docs Routes */}
                <Route path="/docs" element={<DocsLayout />}>
                  <Route index element={<Navigate to="/docs/quickstart" replace />} />
                  <Route path="quickstart" element={<QuickstartPage />} />
                  <Route path="cli" element={<CliPage />} />
                  <Route path="frameworks" element={<FrameworksPage />} />
                  <Route path="ci-cd" element={<CiCdPage />} />
                  <Route path="api" element={<ApiPage />} />
                </Route>

                {/* Interactive Playground Route */}
                <Route
                  path="/playground"
                  element={
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                      <PlaygroundPage />
                    </div>
                  }
                />

                {/* Catch-all fallback */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </div>
            <Footer />
          </div>
        </Router>
      </PackageManagerProvider>
    </ThemeProvider>
  );
};

export default App;
