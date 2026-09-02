import React, { useState, useEffect, useRef } from 'react';
import { BRANDING_PROJECTS } from '../data/taxerData';

export default function BrandingSection({ onSelectProject }) {
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const groupsRef = useRef([]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight * 0.45;
      groupsRef.current.forEach((el, idx) => {
        if (!el) return;
        const top = el.offsetTop;
        const height = el.offsetHeight;
        if (scrollPos >= top && scrollPos < top + height) {
          setActiveProjectIndex(idx);
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const activeProj = BRANDING_PROJECTS[activeProjectIndex] || BRANDING_PROJECTS[0];

  return (
    <>
      {/* Giant Studio & Screen-Printing Typographic Header */}
      <section className="branding" id="studio">
        <h2 className="branding__big" id="brandingBig">Studio</h2>
      </section>

      {/* Sticky Project HUD Showcase */}
      <section className="brand2" id="brand2" aria-label="Studio showcase">
        
        {/* Sticky HUD Overlay (Mix Blend Difference) */}
        <div className="brand2__hud" aria-hidden="true">
          <h3 className="brand2__title">
            <span className="brand2__titleinner">
              <sup className="brand2__num">{activeProj.num}</sup>
              <span className="brand2__name">{activeProj.title}</span>
            </span>
          </h3>
          <p className="brand2__desc">{activeProj.desc}</p>
        </div>

        {/* Parallax Media Groups Scrolling Behind */}
        <div className="brand2__groups">
          {BRANDING_PROJECTS.map((proj, pIdx) => (
            <div
              key={proj.num}
              ref={(el) => (groupsRef.current[pIdx] = el)}
              className="brand2__group"
              data-num={proj.num}
              data-title={proj.title}
              data-desc={proj.desc}
            >
              {proj.media.map((item, mIdx) => {
                const sideClass = item.side === 'r' ? 'brand2__img--r' : 'brand2__img--l';
                return (
                  <figure 
                    key={mIdx} 
                    className={`brand2__img ${sideClass} cursor-pointer`}
                    onClick={() => onSelectProject(proj)}
                  >
                    <img 
                      src={item.src} 
                      alt={proj.title} 
                      width="1600" 
                      height="2400" 
                      loading="lazy" 
                    />
                  </figure>
                );
              })}
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
