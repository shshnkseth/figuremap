import React, { useState } from 'react';
import { Sun, Moon } from 'lucide-react';

export default function Header({ onOpenInquire, theme = 'dark', onToggleTheme }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [printsOpen, setPrintsOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const isLight = theme === 'light';

  return (
    <>
      <header className="site-header" id="siteHeader">
        <a className="site-header__name" href="#top" aria-label="Figure Map Home">
          <img
            src={isLight ? '/images/logo-black.png' : '/images/logo-white.png'}
            alt="FIGURE MAP"
            className="site-header__logo"
          />
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

        {/* Theme Toggle Button (Sun / Moon) */}
        <button
          onClick={onToggleTheme}
          className="site-header__theme-toggle"
          type="button"
          aria-label={isLight ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
          title={isLight ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
        >
          {isLight ? (
            <Moon className="w-4 h-4 stroke-[1.75]" />
          ) : (
            <Sun className="w-4 h-4 stroke-[1.75]" />
          )}
        </button>

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
          <li>
            <button
              onClick={() => { onToggleTheme(); closeMenu(); }}
              className="flex items-center gap-3 py-2 text-left w-full text-base font-mono uppercase tracking-wider text-[var(--ink)]"
              type="button"
            >
              {isLight ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
              <span>{isLight ? 'Dark Mode' : 'Light Mode'}</span>
            </button>
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
