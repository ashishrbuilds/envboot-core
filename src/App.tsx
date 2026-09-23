import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { PackageManagerProvider } from './context/PackageManagerContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ScrollToAnchor } from './components/ScrollToAnchor';
import { HomePage } from './pages/HomePage';
import { DocsLayout } from './pages/DocsLayout';
import { QuickstartPage } from './pages/QuickstartPage';
import { CliPage } from './pages/CliPage';
import { FrameworksPage } from './pages/FrameworksPage';
import { CiCdPage } from './pages/CiCdPage';
import { ApiPage } from './pages/ApiPage';
import { PlaygroundPage } from './pages/PlaygroundPage';
import { ChangelogPage } from './pages/ChangelogPage';
import { NotFoundPage } from './pages/NotFoundPage';

const AppShell: React.FC = () => {
  const location = useLocation();
  const isDocs = location.pathname.startsWith('/docs');

  return (
    <div className="min-h-screen flex flex-col bg-white text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100 selection:bg-zinc-800 selection:text-white dark:selection:bg-zinc-200 dark:selection:text-zinc-950">
      <ScrollToAnchor />
      {!isDocs && <Navbar />}
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
            <Route path="changelog" element={<ChangelogPage />} />
          </Route>

          {/* Quick alias for /changelog */}
          <Route path="/changelog" element={<Navigate to="/docs/changelog" replace />} />

          {/* Interactive Playground Route */}
          <Route
            path="/playground"
            element={
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <PlaygroundPage />
              </div>
            }
          />

          {/* 404 Catch-all fallback */}
          <Route path="/404" element={<NotFoundPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
      {!isDocs && <Footer />}
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <PackageManagerProvider>
        <Router basename={import.meta.env.BASE_URL}>
          <AppShell />
        </Router>
      </PackageManagerProvider>
    </ThemeProvider>
  );
};

export default App;
