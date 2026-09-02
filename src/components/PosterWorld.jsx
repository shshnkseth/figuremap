import React from 'react';
import { POSTERS } from '../data/taxerData';

export default function PosterWorld({ onSelectPoster }) {
  return (
    <div className="work__world" id="prints">
      {POSTERS.map((poster) => {
        const sizeClass = `poster--${poster.size}`;
        return (
          <div
            key={poster.id}
            className={`poster ${sizeClass}`}
            style={{
              gridColumn: poster.gridCol,
              gridRow: poster.gridRow
            }}
            onClick={() => onSelectPoster(poster)}
          >
            <div className="poster__frame">
              <div className="poster__par">
                <img
                  src={poster.image}
                  alt={poster.title}
                  loading="lazy"
                />
              </div>
            </div>

            <div className="poster__caption">
              <span>{poster.title}</span>
              <span>{poster.subtitle}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
