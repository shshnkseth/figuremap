import React, { useState, useEffect, useRef } from 'react';
import { 
  Plus, Trash2, Edit3, Image as ImageIcon, LogOut, 
  Upload, Eye, RefreshCw, X, Tag
} from 'lucide-react';
import { getStoredCollections, saveStoredCollections, resetStoredCollections } from '../utils/cmsStore';

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const YEARS = ['2027', '2026', '2025', '2024', '2023'];

export default function AdminCMS({ onExit }) {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('figuremap_admin_auth') === 'true';
  });

  // CMS Collections State
  const [items, setItems] = useState(getStoredCollections);
  const [selectedFilter, setSelectedFilter] = useState('all'); // 'all', 'poster', 'partner', 'print'
  
  // Modal / Drawer state for creating / editing items
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  // Form Fields
  const [formTitle, setFormTitle] = useState('');
  const [formTag, setFormTag] = useState('poster'); // 'poster', 'partner', 'print'
  const [formDesc, setFormDesc] = useState('');
  const [formMedia, setFormMedia] = useState('');
  const [formMonth, setFormMonth] = useState('September');
  const [formYear, setFormYear] = useState('2026');
  const [formPartnerName, setFormPartnerName] = useState('');
  const [formTechnique, setFormTechnique] = useState('');
  const [formSize, setFormSize] = useState('medium');

  const fileInputRef = useRef(null);

  // Sync with store
  useEffect(() => {
    const handleUpdate = () => {
      setItems(getStoredCollections());
    };
    window.addEventListener('figuremap_collections_updated', handleUpdate);
    return () => window.removeEventListener('figuremap_collections_updated', handleUpdate);
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem('figuremap_admin_auth');
    setIsAuthenticated(false);
  };

  // Open Create Modal
  const handleOpenCreate = () => {
    setEditingItem(null);
    setFormTitle('');
    setFormTag(selectedFilter === 'all' ? 'poster' : selectedFilter);
    setFormDesc('');
    setFormMedia('');
    setFormMonth('September');
    setFormYear('2026');
    setFormPartnerName('');
    setFormTechnique('');
    setFormSize('medium');
    setIsModalOpen(true);
  };

  // Open Edit Modal
  const handleOpenEdit = (item) => {
    setEditingItem(item);
    setFormTitle(item.title || '');
    setFormTag(item.tag || 'poster');
    setFormDesc(item.description || '');
    setFormMedia(item.media || '');
    setFormMonth(item.month || 'September');
    setFormYear(item.year || '2026');
    setFormPartnerName(item.partnerName || '');
    setFormTechnique(item.technique || '');
    setFormSize(item.size || 'medium');
    setIsModalOpen(true);
  };

  // Handle File Upload (FileReader to Base64)
  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFormMedia(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Save Item (Create / Update)
  const handleSaveItem = (e) => {
    e.preventDefault();
    if (!formTitle.trim()) return;

    const newItem = {
      id: editingItem ? editingItem.id : `col_${Date.now()}`,
      tag: formTag,
      title: formTitle.trim(),
      description: formDesc.trim(),
      media: formMedia || '/images/img_backprint_kinetic.png',
      month: formMonth,
      year: formYear,
      partnerName: formPartnerName.trim(),
      technique: formTechnique.trim(),
      size: formSize,
    };

    let updatedList;
    if (editingItem) {
      updatedList = items.map((it) => (it.id === editingItem.id ? newItem : it));
    } else {
      updatedList = [newItem, ...items];
    }

    setItems(updatedList);
    saveStoredCollections(updatedList);
    setIsModalOpen(false);
  };

  // Delete Item
  const handleDeleteItem = (id) => {
    if (window.confirm('Delete this collection item from the archive?')) {
      const updatedList = items.filter((it) => it.id !== id);
      setItems(updatedList);
      saveStoredCollections(updatedList);
    }
  };

  // Reset to default collections
  const handleResetDefaults = () => {
    if (window.confirm('Reset all collections to initial studio defaults?')) {
      const defaults = resetStoredCollections();
      setItems(defaults);
    }
  };

  // Filtered Items
  const filteredItems = selectedFilter === 'all' 
    ? items 
    : items.filter((it) => it.tag === selectedFilter);

  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState(false);
  const [shaking, setShaking] = useState(false);

  // -------------------------------------------------------------
  // LOGIN SCREEN (PLAIN WHITE, SINGLE CENTERED INPUT FIELD)
  // -------------------------------------------------------------
  if (!isAuthenticated) {
    const handlePasswordSubmit = (e) => {
      e?.preventDefault();
      const clean = passwordInput.trim().toLowerCase();
      if (clean === 'screamprint' || clean === 'screen' || clean === 'satyakala') {
        sessionStorage.setItem('figuremap_admin_auth', 'true');
        setIsAuthenticated(true);
      } else {
        setAuthError(true);
        setShaking(true);
        setTimeout(() => setShaking(false), 400);
      }
    };

    return (
      <div 
        className="admin-gate-screen"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: '100vw',
          height: '100vh',
          zIndex: 999999,
          backgroundColor: '#ffffff',
          color: '#111827',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px',
          boxSizing: 'border-box',
          fontFamily: "var(--text, 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif)",
          userSelect: 'none'
        }}
      >
        <div 
          className={`admin-gate-card ${shaking ? 'admin-shake' : ''}`}
          style={{ width: '100%', maxWidth: '320px', textAlign: 'left' }}
        >
          <label 
            htmlFor="secret-passcode-input"
            className="admin-gate-label"
            style={{
              display: 'block',
              fontSize: '15px',
              fontWeight: 500,
              color: '#111827',
              marginBottom: '8px',
              letterSpacing: '-0.01em'
            }}
          >
            Secret passcode
          </label>
          
          <form onSubmit={handlePasswordSubmit}>
            <input
              id="secret-passcode-input"
              type="password"
              autoFocus
              value={passwordInput}
              onChange={(e) => {
                const val = e.target.value;
                setPasswordInput(val);
                if (authError) setAuthError(false);
                // Auto unlock on match
                const clean = val.trim().toLowerCase();
                if (clean === 'screamprint' || clean === 'screen' || clean === 'satyakala') {
                  sessionStorage.setItem('figuremap_admin_auth', 'true');
                  setIsAuthenticated(true);
                }
              }}
              placeholder="6 characters long"
              className="admin-gate-input"
              style={{
                width: '100%',
                boxSizing: 'border-box',
                backgroundColor: '#ffffff',
                border: '1px solid #D1D5DB',
                borderRadius: '6px',
                padding: '9px 12px',
                fontSize: '14px',
                color: '#111827',
                fontFamily: 'inherit',
                outline: 'none'
              }}
            />
          </form>

          {authError && (
            <div 
              className="admin-gate-error"
              style={{ color: '#EF4444', fontSize: '12px', fontWeight: 500, marginTop: '8px' }}
            >
              Incorrect passcode
            </div>
          )}
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // ADMIN CMS INDEX DASHBOARD
  // -------------------------------------------------------------
  return (
    <div 
      className="min-h-screen bg-[#090909] text-[#D9D9D9] p-4 sm:p-8 selection:bg-white selection:text-black"
      style={{ fontFamily: "var(--text, 'Plus Jakarta Sans', sans-serif)" }}
    >
      {/* Top Admin Nav */}
      <header className="max-w-6xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#222222] pb-6 gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[#FFFFFF]">
              FIGURE MAP
            </h1>
            <span className="text-[10px] font-mono uppercase bg-[#181818] border border-[#333333] px-2 py-0.5 text-[#AAA]">
              Archive CMS
            </span>
            <span className="text-[10px] font-mono text-[var(--accent,#D9532F)] tracking-wider">
              ● satyakala
            </span>
          </div>
          <p className="text-xs font-mono text-[#777777] mt-1">
            Index, upload, and tag collections across Poster Grid, Partner Turntable, and Studio Showcase.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleOpenCreate}
            className="flex items-center gap-2 bg-[#FFFFFF] text-[#000000] px-4 py-2.5 text-xs font-mono font-bold tracking-wider uppercase hover:bg-[#D9D9D9] transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Upload Collection</span>
          </button>

          <button
            onClick={onExit}
            className="flex items-center gap-1.5 border border-[#333333] hover:border-[#FFFFFF] text-[#D9D9D9] px-3.5 py-2.5 text-xs font-mono tracking-wider uppercase transition-colors"
            title="View live website"
          >
            <Eye className="w-4 h-4" />
            <span className="hidden sm:inline">Live Site</span>
          </button>

          <button
            onClick={handleLogout}
            className="p-2.5 border border-[#333333] hover:border-red-500 hover:text-red-400 text-[#777777] transition-colors"
            title="Logout"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-6xl mx-auto mt-8">
        {/* Filter Tabs & Stats Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 border-b border-[#1A1A1A] pb-4">
          
          {/* Tag Filter Tabs */}
          <div className="flex items-center gap-1">
            {[
              { key: 'all', label: 'All Collections', count: items.length },
              { key: 'poster', label: 'Posters (Grid)', count: items.filter(i => i.tag === 'poster').length },
              { key: 'partner', label: 'Partners (Vinyl)', count: items.filter(i => i.tag === 'partner').length },
              { key: 'print', label: 'Prints (Studio)', count: items.filter(i => i.tag === 'print').length },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setSelectedFilter(tab.key)}
                className={`px-3.5 py-1.5 text-xs font-mono tracking-wider transition-colors uppercase ${
                  selectedFilter === tab.key
                    ? 'bg-[#FFFFFF] text-[#000000] font-bold'
                    : 'text-[#888888] hover:text-[#FFFFFF] hover:bg-[#141414]'
                }`}
              >
                {tab.label} ({tab.count})
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4 text-xs font-mono text-[#666666]">
            <button
              onClick={handleResetDefaults}
              className="hover:text-[#AAA] flex items-center gap-1 text-[11px] underline underline-offset-4"
              title="Reset to default seed data"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Reset Defaults</span>
            </button>
          </div>
        </div>

        {/* Index Table List */}
        <div className="border border-[#222222] bg-[#0E0E0E] overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-[#222222] bg-[#141414] text-[#777777] font-mono uppercase tracking-wider text-[10px]">
                <th className="py-3 px-4 w-12">#</th>
                <th className="py-3 px-4 w-20">Media</th>
                <th className="py-3 px-4">Title &amp; Details</th>
                <th className="py-3 px-4 w-36">Page Tag</th>
                <th className="py-3 px-4 w-32">Date</th>
                <th className="py-3 px-4 w-24 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1A1A1A]">
              {filteredItems.map((item, idx) => (
                <tr 
                  key={item.id}
                  className="hover:bg-[#121212] transition-colors group"
                >
                  {/* Row Number */}
                  <td className="py-3 px-4 font-mono text-[#555555]">
                    {String(idx + 1).padStart(2, '0')}
                  </td>

                  {/* Media Thumbnail */}
                  <td className="py-3 px-4">
                    <div className="w-12 h-14 bg-[#1C1C1C] border border-[#2B2B2B] overflow-hidden flex items-center justify-center">
                      {item.media ? (
                        <img
                          src={item.media}
                          alt={item.title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = '/images/img_backprint_kinetic.png';
                          }}
                        />
                      ) : (
                        <ImageIcon className="w-4 h-4 text-[#444444]" />
                      )}
                    </div>
                  </td>

                  {/* Title & Description */}
                  <td className="py-3 px-4">
                    <div className="font-semibold text-sm text-[#FFFFFF] group-hover:text-[#FFFFFF] transition-colors">
                      {item.title}
                    </div>
                    {item.description && (
                      <div className="text-[#888888] text-xs mt-0.5 line-clamp-1">
                        {item.description}
                      </div>
                    )}
                    {item.partnerName && (
                      <div className="text-[10px] font-mono text-[#666666] mt-0.5">
                        Partner: {item.partnerName} {item.technique && `• ${item.technique}`}
                      </div>
                    )}
                  </td>

                  {/* Tag / Page Landing */}
                  <td className="py-3 px-4">
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 font-mono text-[10px] uppercase font-bold tracking-wider rounded-none ${
                      item.tag === 'poster' 
                        ? 'bg-blue-950/60 text-blue-300 border border-blue-800/40' 
                        : item.tag === 'partner'
                        ? 'bg-purple-950/60 text-purple-300 border border-purple-800/40'
                        : 'bg-amber-950/60 text-amber-300 border border-amber-800/40'
                    }`}>
                      <Tag className="w-2.5 h-2.5" />
                      <span>{item.tag}</span>
                    </span>
                    <div className="text-[9px] font-mono text-[#555] mt-1">
                      {item.tag === 'poster' && 'Lands on #prints grid'}
                      {item.tag === 'partner' && 'Lands on #partners turntable'}
                      {item.tag === 'print' && 'Lands on #studio showcase'}
                    </div>
                  </td>

                  {/* Month & Year */}
                  <td className="py-3 px-4 font-mono text-xs text-[#AAAAAA]">
                    <span>{item.month || '—'} {item.year || '2026'}</span>
                  </td>

                  {/* Actions */}
                  <td className="py-3 px-4 text-right space-x-2">
                    <button
                      onClick={() => handleOpenEdit(item)}
                      className="p-1.5 text-[#777777] hover:text-[#FFFFFF] transition-colors inline-block"
                      title="Edit Item"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDeleteItem(item.id)}
                      className="p-1.5 text-[#777777] hover:text-red-400 transition-colors inline-block"
                      title="Delete Item"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}

              {filteredItems.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-xs font-mono text-[#666666]">
                    No collections found in this category. Click "+ Upload Collection" to add one.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>

      {/* ------------------------------------------------------------- */}
      {/* ADD / EDIT COLLECTION MODAL */}
      {/* ------------------------------------------------------------- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm">
          <div className="relative w-full max-w-lg bg-[#111111] text-[#D9D9D9] border border-[#2B2B2B] p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
            
            {/* Modal Header */}
            <div className="flex justify-between items-center border-b border-[#222222] pb-4 mb-6">
              <div>
                <span className="text-[10px] font-mono text-[#888888] tracking-widest uppercase">
                  {editingItem ? 'EDIT ENTRY' : 'NEW ENTRY'}
                </span>
                <h2 className="text-lg font-bold text-[#FFFFFF] mt-0.5">
                  {editingItem ? 'Edit Collection Item' : 'Upload New Collection'}
                </h2>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-[#777777] hover:text-[#FFFFFF] p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSaveItem} className="space-y-5 text-left">
              
              {/* Tag Selector (Poster / Partner / Print) */}
              <div className="space-y-1.5">
                <label className="block text-[11px] font-mono text-[#888888] tracking-wider uppercase">
                  Landing Tag <span className="text-[var(--accent,#D9532F)]">*</span>
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { key: 'poster', label: 'Poster', desc: 'Poster World Grid' },
                    { key: 'partner', label: 'Partner', desc: 'Vinyl Turntable' },
                    { key: 'print', label: 'Print', desc: 'Studio Showcase' },
                  ].map((tg) => (
                    <button
                      key={tg.key}
                      type="button"
                      onClick={() => setFormTag(tg.key)}
                      className={`py-2 px-3 border text-left font-mono transition-colors ${
                        formTag === tg.key
                          ? 'border-[#FFFFFF] bg-[#222222] text-[#FFFFFF]'
                          : 'border-[#2B2B2B] text-[#777777] hover:border-[#555555]'
                      }`}
                    >
                      <div className="text-xs font-bold uppercase">{tg.label}</div>
                      <div className="text-[9px] text-[#888888] mt-0.5">{tg.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Title */}
              <div className="space-y-1">
                <label className="block text-[11px] font-mono text-[#888888] tracking-wider uppercase">
                  Collection Title <span className="text-[var(--accent,#D9532F)]">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  placeholder="e.g. KINETIC DYNAMICS — BACKPRINT"
                  className="w-full bg-[#161616] border border-[#2B2B2B] focus:border-[#FFFFFF] text-[#FFFFFF] py-2.5 px-3 text-xs font-mono focus:outline-none"
                />
              </div>

              {/* Month and Year */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="block text-[11px] font-mono text-[#888888] tracking-wider uppercase">
                    Month
                  </label>
                  <select
                    value={formMonth}
                    onChange={(e) => setFormMonth(e.target.value)}
                    className="w-full bg-[#161616] border border-[#2B2B2B] focus:border-[#FFFFFF] text-[#FFFFFF] py-2.5 px-3 text-xs font-mono focus:outline-none"
                  >
                    {MONTHS.map((m) => (
                      <option key={m} value={m}>{m}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="block text-[11px] font-mono text-[#888888] tracking-wider uppercase">
                    Year
                  </label>
                  <select
                    value={formYear}
                    onChange={(e) => setFormYear(e.target.value)}
                    className="w-full bg-[#161616] border border-[#2B2B2B] focus:border-[#FFFFFF] text-[#FFFFFF] py-2.5 px-3 text-xs font-mono focus:outline-none"
                  >
                    {YEARS.map((y) => (
                      <option key={y} value={y}>{y}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-1">
                <label className="block text-[11px] font-mono text-[#888888] tracking-wider uppercase">
                  Description / Subtitle
                </label>
                <textarea
                  rows={2}
                  value={formDesc}
                  onChange={(e) => setFormDesc(e.target.value)}
                  placeholder="e.g. Screenprint Pass 01 / 280 GSM Heavy White • Edition of 35"
                  className="w-full bg-[#161616] border border-[#2B2B2B] focus:border-[#FFFFFF] text-[#FFFFFF] py-2 px-3 text-xs font-mono focus:outline-none"
                />
              </div>

              {/* Media Uploader */}
              <div className="space-y-1.5">
                <label className="block text-[11px] font-mono text-[#888888] tracking-wider uppercase">
                  Media Image <span className="text-[var(--accent,#D9532F)]">*</span>
                </label>
                
                <div className="flex gap-3 items-center">
                  {/* Thumbnail Preview */}
                  <div className="w-16 h-20 bg-[#161616] border border-[#2B2B2B] overflow-hidden flex items-center justify-center shrink-0">
                    {formMedia ? (
                      <img src={formMedia} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <ImageIcon className="w-5 h-5 text-[#444444]" />
                    )}
                  </div>

                  <div className="flex-1 space-y-2">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full py-2 px-3 border border-[#333333] hover:border-[#FFFFFF] bg-[#161616] text-xs font-mono text-[#D9D9D9] flex items-center justify-center gap-2 transition-colors"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <span>Upload Local Image</span>
                    </button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />

                    <input
                      type="text"
                      value={formMedia}
                      onChange={(e) => setFormMedia(e.target.value)}
                      placeholder="Or paste image URL (/images/...)"
                      className="w-full bg-[#161616] border border-[#2B2B2B] focus:border-[#FFFFFF] text-[#AAAAAA] py-1.5 px-3 text-[11px] font-mono focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Extra metadata for Partner / Poster */}
              {formTag === 'partner' && (
                <div className="grid grid-cols-2 gap-3 pt-2 border-t border-[#1C1C1C]">
                  <div className="space-y-1">
                    <label className="block text-[10px] font-mono text-[#888888] tracking-wider uppercase">
                      Partner Name
                    </label>
                    <input
                      type="text"
                      value={formPartnerName}
                      onChange={(e) => setFormPartnerName(e.target.value)}
                      placeholder="e.g. Movement & Parkour"
                      className="w-full bg-[#161616] border border-[#2B2B2B] text-[#FFFFFF] py-1.5 px-2.5 text-xs font-mono"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-[10px] font-mono text-[#888888] tracking-wider uppercase">
                      Print Technique
                    </label>
                    <input
                      type="text"
                      value={formTechnique}
                      onChange={(e) => setFormTechnique(e.target.value)}
                      placeholder="e.g. 2-Pass Charcoal"
                      className="w-full bg-[#161616] border border-[#2B2B2B] text-[#FFFFFF] py-1.5 px-2.5 text-xs font-mono"
                    />
                  </div>
                </div>
              )}

              {/* Submit Buttons */}
              <div className="flex justify-end gap-3 pt-4 border-t border-[#222222]">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-[#333333] hover:border-[#666666] text-xs font-mono uppercase tracking-wider text-[#888888] transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#FFFFFF] text-[#000000] text-xs font-mono font-bold uppercase tracking-wider hover:bg-[#D9D9D9] transition-colors"
                >
                  {editingItem ? 'Save Changes' : 'Publish to Index'}
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
}
