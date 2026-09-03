import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import BlobCanvas from './components/BlobCanvas';
import PosterWorld from './components/PosterWorld';
import VinylArtworkSection from './components/VinylArtworkSection';
import BrandingSection from './components/BrandingSection';
import ContactSection from './components/ContactSection';
import AcquireModal from './components/AcquireModal';
import AdminCMS from './components/AdminCMS';

export default function App() {
  const checkIsAdmin = () => {
    const hash = window.location.hash.toLowerCase();
    const path = window.location.pathname.toLowerCase();
    const search = window.location.search.toLowerCase();
    return hash.includes('admin') || path.includes('admin') || search.includes('admin');
  };

  const [isAdmin, setIsAdmin] = useState(checkIsAdmin);
  const [selectedItem, setSelectedItem] = useState(null);
  const [impressumOpen, setImpressumOpen] = useState(false);
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('figuremap_theme') || 'dark';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('figuremap_theme', theme);
  }, [theme]);

  // Listen for hash & route changes
  useEffect(() => {
    const handleRouteChange = () => {
      setIsAdmin(checkIsAdmin());
    };
    window.addEventListener('hashchange', handleRouteChange);
    window.addEventListener('popstate', handleRouteChange);
    return () => {
      window.removeEventListener('hashchange', handleRouteChange);
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const handleOpenInquire = () => {
    setSelectedItem({
      title: 'SILKSCREEN CUSTOM EDITION',
      description: 'Hand-Pulled Numbered Studio Run',
      image: '/images/img_backprint_kinetic.png',
    });
  };

  // If in Admin mode, render the Admin Index CMS
  if (isAdmin) {
    return (
      <AdminCMS
        onExit={() => {
          window.location.hash = '';
          setIsAdmin(false);
        }}
      />
    );
  }

  return (
    <div className="relative bg-[var(--bg)] text-[var(--ink)] min-h-screen transition-colors duration-300">
      <h1 className="sr-only">
        Figure Map — Art-Led Screen-Printing &amp; Collaborative Apparel Journal.
      </h1>

      {/* Fixed Swiss 4-Column Header */}
      <Header
        theme={theme}
        onToggleTheme={toggleTheme}
        onOpenInquire={handleOpenInquire}
      />

      {/* Main Content (Leaves 100svh margin-bottom to reveal fixed marquee footer) */}
      <main id="top">
        
        {/* WORK SECTION — STICKY DENSE DOT BLOB CANVAS + POSTER WORLD 12-COL GRID */}
        <section className="work" id="work">
          
          {/* Sticky Dense Dot Blob Centerpiece & Corner Coordinates */}
          <div className="work__sticky" aria-hidden="false">
            <BlobCanvas theme={theme} />
            
            <div className="work__corner work__corner--bl">
              <span>© Figure Map 2026</span>
            </div>

            <div className="work__corner work__corner--br">
              <span className="work__scrollhint">
                <i></i>
              </span>
            </div>
          </div>

          {/* Spacer allowing fluid to be visible before posters scroll over it */}
          <div className="work__spacer"></div>

          {/* 12-Column Asymmetrical Poster Grid */}
          <PosterWorld onSelectPoster={(poster) => setSelectedItem(poster)} />
        </section>

        {/* ALBUM ARTWORKS — PINNED WEBGL / VINYL SLEEVE SECTION */}
        <VinylArtworkSection onSelectAlbum={(album) => setSelectedItem(album)} />

        {/* BRANDING — GIANT TYPOGRAPHY + STICKY HUD SHOWCASE */}
        <BrandingSection onSelectProject={(project) => setSelectedItem(project)} />
      </main>

      {/* FIXED UNDER-PAGE CONTACT MARQUEE REVEAL & LEGAL DIALOGS */}
      <ContactSection
        impressumOpen={impressumOpen}
        privacyOpen={privacyOpen}
        onCloseModals={() => {
          setImpressumOpen(false);
          setPrivacyOpen(false);
        }}
        onOpenImpressum={() => setImpressumOpen(true)}
        onOpenPrivacy={() => setPrivacyOpen(true)}
      />

      {/* Acquisition DM Modal */}
      {selectedItem && (
        <AcquireModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
        />
      )}
    </div>
  );
}
