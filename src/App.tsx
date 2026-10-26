/**
 * ============================================================
 * Sable — Next-Generation Fintech Web Application
 * Designed & Engineered by Rhidham Garg
 * ============================================================
 */

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CustomCursor } from './components/CustomCursor';
import { HomePage } from './pages/HomePage';
import { OpenAccountPage } from './pages/OpenAccountPage';
import { FloatingHelp } from './components/FloatingHelp';

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-black text-white font-['Inter',sans-serif] selection:bg-[#6FDBD4] selection:text-black">
        {/* Sleek Custom Cursor (Desktop only, auto-disabled on touch) */}
        <CustomCursor />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/open-account" element={<OpenAccountPage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>

        {/* Floating Live Support Widget */}
        <FloatingHelp />
      </div>
    </BrowserRouter>
  );
}
