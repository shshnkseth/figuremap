import React, { useState } from 'react';

export default function Header({ onOpenImpressum, onOpenPrivacy, onOpenInquire }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [printsOpen, setPrintsOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <>
      <header className="site-header" id="siteHeader">
        <a className="site-header__name" href="#top">
          Figure&nbsp;Map<sup>©</sup>
        </a>

        {/* Work Column: prints, partners, studio */}
        <nav className="site-header__col site-header__col--portfolio">
          <span className="site-header__label">work</span>
          <a href="#prints">prints</a>
          <a href="#partners">partners</a>
          <a href="#studio">studio</a>
        </nav>

        {/* Editions Column: dm to order, archive, concept */}
        <nav className="site-header__col site-header__col--prints">
          <span className="site-header__label">editions</span>
          <button onClick={onOpenInquire} className="text-left">dm to order</button>
          <a href="#partners">art-led runs</a>
          <a href="#studio">silkscreen</a>
        </nav>

        {/* Contact Column */}
        <nav className="site-header__col site-header__col--contact">
          <span className="site-header__label">contact</span>
          <a href="mailto:studio@figuremap.archive">studio@figuremap.archive</a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">instagram</a>
        </nav>

        {/* Mobile menu trigger */}
        <button 
          className="nav-toggle" 
          id="navToggle" 
          type="button" 
          aria-label="Toggle menu" 
          onClick={toggleMenu}
        >
          <span className="nav-toggle__mask">
            <span className="nav-toggle__word">{menuOpen ? 'close' : 'menu'}</span>
          </span>
        </button>
      </header>

      {/* Mobile fullscreen menu overlay */}
      <nav className={`nav-overlay ${menuOpen ? 'is-open' : ''}`} id="navOverlay">
        <ul className="nav-overlay__list">
          <li>
            <a href="#prints" onClick={closeMenu}>
              <span>prints</span>
            </a>
          </li>
          <li>
            <a href="#partners" onClick={closeMenu}>
              <span>partners</span>
            </a>
          </li>
          <li>
            <a href="#studio" onClick={closeMenu}>
              <span>studio</span>
            </a>
          </li>
          <li className="nav-overlay__prints">
            <button 
              type="button" 
              className="nav-overlay__prints-toggle" 
              onClick={() => setPrintsOpen(!printsOpen)}
            >
              <span>art-led editions {printsOpen ? '−' : '+'}</span>
            </button>
            {printsOpen && (
              <ul className="nav-overlay__sub" style={{ height: 'auto', display: 'flex' }}>
                <li>
                  <button onClick={() => { closeMenu(); onOpenInquire(); }} className="text-left py-1 text-sm text-[var(--ink)]">
                    <span>DM to Order</span>
                  </button>
                </li>
                <li>
                  <a href="#partners" onClick={closeMenu}><span>Numbered Studio Runs</span></a>
                </li>
              </ul>
            )}
          </li>
        </ul>

        <div className="nav-overlay__contact">
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <span>instagram</span>
          </a>
          <a href="mailto:studio@figuremap.archive">
            <span>studio@figuremap.archive</span>
          </a>
        </div>
      </nav>
    </>
  );
}
