import React, { useState } from 'react';
import Header from './components/Header';
import EyeCanvas from './components/EyeCanvas';
import PosterWorld from './components/PosterWorld';
import VinylArtworkSection from './components/VinylArtworkSection';
import BrandingSection from './components/BrandingSection';
import ContactSection from './components/ContactSection';
import AcquireModal from './components/AcquireModal';
import { POSTERS, ALBUMS } from './data/taxerData';

export default function App() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [impressumOpen, setImpressumOpen] = useState(false);
  const [privacyOpen, setPrivacyOpen] = useState(false);

  const handleOpenInquire = () => {
    setSelectedItem(POSTERS[0]);
  };

  return (
    <div className="relative bg-[#090909] text-[#D9D9D9] min-h-screen">
      <h1 className="sr-only">
        Figure Map — Art-Led Screen-Printing &amp; Collaborative Apparel Journal.
      </h1>

      {/* Fixed Swiss 4-Column Header */}
      <Header
        onOpenImpressum={() => setImpressumOpen(true)}
        onOpenPrivacy={() => setPrivacyOpen(true)}
        onOpenInquire={handleOpenInquire}
      />

      {/* Main Content (Leaves 100svh margin-bottom to reveal fixed marquee footer) */}
      <main id="top">
        
        {/* WORK SECTION — STICKY EYE CANVAS + POSTER WORLD 12-COL GRID */}
        <section className="work" id="work">
          
          {/* Sticky Eyeball Centerpiece & Corner Coordinates */}
          <div className="work__sticky" aria-hidden="false">
            <EyeCanvas />
            
            <div className="work__corner work__corner--bl">
              <span>© Figure Map 2026</span>
            </div>

            <div className="work__corner work__corner--br">
              <span className="work__scrollhint">
                <i></i>
              </span>
            </div>
          </div>

          {/* Spacer allowing eye to be visible before posters scroll over it */}
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
