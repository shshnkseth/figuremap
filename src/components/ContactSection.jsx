import React from 'react';

export default function ContactSection({ impressumOpen, privacyOpen, onCloseModals, onOpenImpressum, onOpenPrivacy }) {
  return (
    <>
      {/* Fixed Footer Revealed as page scrolls up */}
      <footer className="contact" id="contact">
        <a 
          className="contact__marquee" 
          href="mailto:studio@figuremap.archive" 
          aria-label="Get in touch — studio@figuremap.archive"
        >
          <span className="contact__track" id="contactMarquee" aria-hidden="true">
            <span className="contact__word">Get in touch</span>
            <span className="contact__word">Get in touch</span>
            <span className="contact__word">Get in touch</span>
            <span className="contact__word">Get in touch</span>
          </span>
        </a>

        <span className="contact__copy">© Figure Map 2026</span>
        
        <button 
          className="contact__link contact__link--impressum" 
          onClick={onOpenImpressum}
        >
          impressum
        </button>

        <button 
          className="contact__link contact__link--privacy" 
          onClick={onOpenPrivacy}
        >
          privacy
        </button>

        <a 
          className="contact__link contact__link--admin" 
          href="#admin"
        >
          admin
        </a>
      </footer>

      {/* Impressum Legal Dialog */}
      {impressumOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="legal-dialog" style={{ display: 'block' }}>
            <div className="legal-dialog__inner">
              <button className="legal-dialog__close" onClick={onCloseModals} aria-label="Close">
                &times;
              </button>
              <h2 className="legal-dialog__title">Legal Notice</h2>
              <div className="legal-dialog__body">
                <p>
                  <strong>Figure Map</strong><br />
                  Screen-Printing Studio &amp; Art Archive<br />
                  Tokyo / Berlin / Global
                </p>

                <p>
                  Email: <a href="mailto:studio@figuremap.archive">studio@figuremap.archive</a>
                </p>

                <p>
                  <strong>Practice:</strong> Hand-pulled screen-printed apparel, limited archival editions, artist monographs.
                </p>

                <p className="legal-dialog__note">
                  All pieces physically hand-pulled in numbered studio runs.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Privacy Policy Legal Dialog */}
      {privacyOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="legal-dialog" style={{ display: 'block' }}>
            <div className="legal-dialog__inner">
              <button className="legal-dialog__close" onClick={onCloseModals} aria-label="Close">
                &times;
              </button>
              <h2 className="legal-dialog__title">Privacy Policy</h2>
              <div className="legal-dialog__body">
                <p>
                  <strong>Figure Map Studio</strong><br />
                  <a href="mailto:studio@figuremap.archive">studio@figuremap.archive</a>
                </p>

                <h3>Hosting &amp; Privacy</h3>
                <p>
                  This website does not track cookies, create advertising profiles, or monetize user data. All inquiries via direct message or email are strictly handled between the collector and the studio maker.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
