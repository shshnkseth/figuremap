import React, { useState, useEffect, useRef } from 'react';
import { getStoredCollections } from '../utils/cmsStore';

export default function BrandingSection({ onSelectProject }) {
  const [prints, setPrints] = useState(() => {
    return getStoredCollections().filter((i) => i.tag === 'print');
  });
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const groupsRef = useRef([]);

  useEffect(() => {
    const handleUpdate = () => {
      const list = getStoredCollections().filter((i) => i.tag === 'print');
      setPrints(list);
    };
    window.addEventListener('figuremap_collections_updated', handleUpdate);
    return () => window.removeEventListener('figuremap_collections_updated', handleUpdate);
  }, []);

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
  }, [prints.length]);

  if (prints.length === 0) return null;

  const activeProj = prints[activeProjectIndex] || prints[0];
  const numFormatted = String(activeProjectIndex + 1).padStart(2, '0');

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
              <sup className="brand2__num">{numFormatted}</sup>
              <span className="brand2__name">{activeProj.title}</span>
            </span>
          </h3>
          <p className="brand2__desc">{activeProj.description}</p>
        </div>

        {/* Parallax Media Groups Scrolling Behind */}
        <div className="brand2__groups">
          {prints.map((proj, pIdx) => {
            const sideClass = (pIdx % 2 === 0) ? 'brand2__img--r' : 'brand2__img--l';
            return (
              <div
                key={proj.id}
                ref={(el) => (groupsRef.current[pIdx] = el)}
                className="brand2__group"
                data-num={String(pIdx + 1).padStart(2, '0')}
                data-title={proj.title}
                data-desc={proj.description}
              >
                <figure 
                  className={`brand2__img ${sideClass} cursor-pointer`}
                  onClick={() => onSelectProject({
                    id: proj.id,
                    title: proj.title,
                    description: proj.description,
                    image: proj.media,
                  })}
                >
                  <img 
                    src={proj.media} 
                    alt={proj.title} 
                    width="1600" 
                    height="2400" 
                    loading="lazy" 
                  />
                </figure>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
