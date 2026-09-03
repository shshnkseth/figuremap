const STORAGE_KEY = 'figuremap_cms_collections_v1';

// Initial default collections converted into the unified index schema
const DEFAULT_COLLECTIONS = [
  // Posters
  {
    id: 'col_p1',
    tag: 'poster',
    title: 'KINETIC DYNAMICS — BACKPRINT',
    description: 'Screenprint Pass 01 / 280 GSM Heavy White',
    media: '/images/img_backprint_kinetic.png',
    month: 'September',
    year: '2026',
    size: 'large',
    gridCol: '1 / 6',
    gridRow: '1',
  },
  {
    id: 'col_p2',
    tag: 'poster',
    title: 'BARCODE MOCKNECK — BLACK',
    description: 'Screenprint Pass 02 / 3-Plate Screen Stencil',
    media: '/images/img_barcode_tee.png',
    month: 'August',
    year: '2026',
    size: 'medium',
    gridCol: '7 / 10',
    gridRow: '1',
  },
  {
    id: 'col_p3',
    tag: 'poster',
    title: 'LIQUID CHROME & MOSS HOODIE',
    description: 'Screenprint Pass 03 / High-Density Puff Ink',
    media: '/images/img_hoodie_neon.png',
    month: 'July',
    year: '2026',
    size: 'medium',
    gridCol: '10 / 13',
    gridRow: '1',
  },
  {
    id: 'col_p4',
    tag: 'poster',
    title: 'GRLSWIRL CRUISER DECK',
    description: 'Screenprint Pass 04 / 7-Ply Maple Silkscreen',
    media: '/images/img_skate_mosaic.jpg',
    month: 'June',
    year: '2026',
    size: 'medium',
    gridCol: '2 / 7',
    gridRow: '2',
  },
  {
    id: 'col_p5',
    tag: 'poster',
    title: 'MONOCHROME STREETWEAR DUO',
    description: 'Screenprint Pass 05 / 450 GSM Heavy Fleece',
    media: '/images/img_hoodie_bw.png',
    month: 'May',
    year: '2026',
    size: 'large',
    gridCol: '7 / 13',
    gridRow: '2',
  },
  {
    id: 'col_p6',
    tag: 'poster',
    title: 'RAW REGISTRATION SPECIMEN',
    description: 'Screenprint Pass 06 / Pitch Black Boxy Cut',
    media: '/images/img_barcode_tee.png',
    month: 'April',
    year: '2026',
    size: 'small',
    gridCol: '1 / 5',
    gridRow: '3',
  },
  {
    id: 'col_p7',
    tag: 'poster',
    title: 'CIRCULAR HALFTONE TOPOGRAPHY',
    description: 'Screenprint Pass 07 / Dual-Pass Charcoal',
    media: '/images/img_backprint_kinetic.png',
    month: 'March',
    year: '2026',
    size: 'medium',
    gridCol: '6 / 10',
    gridRow: '3',
  },
  {
    id: 'col_p8',
    tag: 'poster',
    title: 'COBALT SUNBURST MOSAIC',
    description: 'Screenprint Pass 08 / Hand-Pulled Woodgrain',
    media: '/images/img_skate_mosaic.jpg',
    month: 'February',
    year: '2026',
    size: 'medium',
    gridCol: '10 / 13',
    gridRow: '3',
  },

  // Partners (Vinyl / Edition Turntable section)
  {
    id: 'col_a1',
    tag: 'partner',
    title: 'KINETIC DRIFT / EDITION 01',
    partnerName: 'Movement & Parkour Community',
    technique: 'Hand-Pulled 2-Pass Charcoal Silkscreen',
    description: 'Heavyweight 280 GSM Unbleached Cotton • Edition of 35 Hand-Numbered Pieces',
    media: '/images/img_backprint_kinetic.png',
    month: 'September',
    year: '2026',
  },
  {
    id: 'col_a2',
    tag: 'partner',
    title: 'BARCODE MOCKNECK / EDITION 02',
    partnerName: 'High-Fashion Avant-Garde',
    technique: '3-Plate Manual Screen Stencil & Discharge Ink',
    description: 'Pitch Black 300 GSM Boxy Cut • Edition of 30 Hand-Numbered Pieces',
    media: '/images/img_barcode_tee.png',
    month: 'August',
    year: '2026',
  },
  {
    id: 'col_a3',
    tag: 'partner',
    title: 'CHROME & ACID HOODIES / EDITION 03',
    partnerName: 'Underground Street Sound',
    technique: 'High-Density Chrome Relief + Acid Yellow Vector',
    description: '450 GSM Organic Heavy Fleece • Edition of 40 Hand-Numbered Pieces',
    media: '/images/img_hoodie_neon.png',
    month: 'July',
    year: '2026',
  },
  {
    id: 'col_a4',
    tag: 'partner',
    title: 'CRUISER MAP DECK / EDITION 04',
    partnerName: 'GRLSWIRL Skate Collective',
    technique: 'Hand-Screenprinted 7-Ply Canadian Hardrock Maple',
    description: 'Cobalt Blue & Natural Woodgrain Screen-Print • Edition of 25 Hand-Numbered Pieces',
    media: '/images/img_skate_mosaic.jpg',
    month: 'June',
    year: '2026',
  },

  // Prints (Studio Screen-Printing projects)
  {
    id: 'col_s1',
    tag: 'print',
    title: 'Studio Squeegee & Registration DNA',
    description: 'Every single piece is physically hand-screenprinted in studio. We deliberately celebrate squeegee angle variations, microscopic registration shifts, and organic ink absorption on raw unbleached cotton.',
    media: '/images/img_backprint_kinetic.png',
    month: 'September',
    year: '2026',
    side: 'r',
  },
  {
    id: 'col_s2',
    tag: 'print',
    title: 'Art-Led Creator Partnerships',
    description: 'We collaborate directly with artists across unconventional fields—skateboarding, modular sound synthesis, graffiti, parkour, and movement arts—creating a dedicated numbered physical specimen for each partnership.',
    media: '/images/img_hoodie_neon.png',
    month: 'August',
    year: '2026',
    side: 'l',
  },
  {
    id: 'col_s3',
    tag: 'print',
    title: 'Physical Medium & Heavyweight Cotton',
    description: 'Zero mass production. We use 280–300 GSM unbleached organic combed jersey and 450 GSM heavyweight fleece built to endure kinetic motion and age with tactile character.',
    media: '/images/img_skate_mosaic.jpg',
    month: 'July',
    year: '2026',
    side: 'r',
  }
];

export function getStoredCollections() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.error('Failed to load collections from storage:', e);
  }
  return DEFAULT_COLLECTIONS;
}

export function saveStoredCollections(collections) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(collections));
    // Dispatch storage event so all components update synchronously
    window.dispatchEvent(new Event('figuremap_collections_updated'));
  } catch (e) {
    console.error('Failed to save collections to storage:', e);
  }
}

export function resetStoredCollections() {
  localStorage.removeItem(STORAGE_KEY);
  window.dispatchEvent(new Event('figuremap_collections_updated'));
  return DEFAULT_COLLECTIONS;
}
