import React, { useState, useEffect } from 'react';
import { getStoredCollections } from '../utils/cmsStore';

export default function PosterWorld({ onSelectPoster }) {
  const [posters, setPosters] = useState(() => {
    return getStoredCollections().filter((i) => i.tag === 'poster');
  });

  useEffect(() => {
    const handleUpdate = () => {
      setPosters(getStoredCollections().filter((i) => i.tag === 'poster'));
    };
    window.addEventListener('figuremap_collections_updated', handleUpdate);
    return () => window.removeEventListener('figuremap_collections_updated', handleUpdate);
  }, []);

  // Preset responsive grid columns for layout variety
  const gridPositions = [
    { col: '1 / 6', row: '1' },
    { col: '7 / 10', row: '1' },
    { col: '10 / 13', row: '1' },
    { col: '2 / 7', row: '2' },
    { col: '7 / 13', row: '2' },
    { col: '1 / 5', row: '3' },
    { col: '6 / 10', row: '3' },
    { col: '10 / 13', row: '3' },
  ];

  return (
    <div className="work__world" id="prints">
      {posters.map((poster, index) => {
        const sizeClass = `poster--${poster.size || 'medium'}`;
        const pos = gridPositions[index % gridPositions.length];
        const gridCol = poster.gridCol || pos.col;
        const gridRow = poster.gridRow || pos.row;

        return (
          <div
            key={poster.id}
            className={`poster ${sizeClass}`}
            style={{
              gridColumn: gridCol,
              gridRow: gridRow
            }}
            onClick={() => onSelectPoster({
              id: poster.id,
              title: poster.title,
              subtitle: poster.description,
              image: poster.media,
            })}
          >
            <div className="poster__frame">
              <div className="poster__par">
                <img
                  src={poster.media}
                  alt={poster.title}
                  loading="lazy"
                />
              </div>
            </div>

            <div className="poster__caption">
              <span>{poster.title}</span>
              <span>{poster.description || `${poster.month} ${poster.year}`}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
