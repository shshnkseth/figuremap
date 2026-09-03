import React, { useState, useEffect, useRef } from 'react';
import { Plus, Trash2, Edit3, Image as ImageIcon, LogOut, Upload, ExternalLink, RotateCcw, X, ChevronDown, Search } from 'lucide-react';
import { getStoredCollections, saveStoredCollections, resetStoredCollections } from '../utils/cmsStore';

const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const YEARS  = ['2027','2026','2025','2024','2023'];

const TAG_META = {
  poster:  { label: 'Poster',  color: '#2563EB', bg: '#EFF6FF', dot: '#3B82F6' },
  partner: { label: 'Partner', color: '#7C3AED', bg: '#F5F3FF', dot: '#8B5CF6' },
  print:   { label: 'Print',   color: '#D97706', bg: '#FFFBEB', dot: '#F59E0B' },
};

function TagBadge({ tag }) {
  const m = TAG_META[tag] || TAG_META.poster;
  return (
    <span style={{
      display:'inline-flex', alignItems:'center', gap:5,
      padding:'3px 10px', borderRadius:20,
      background:m.bg, color:m.color,
      fontSize:11, fontWeight:600, letterSpacing:'0.02em',
      border:`1px solid ${m.color}22`,
    }}>
      <span style={{ width:6, height:6, borderRadius:'50%', background:m.dot, flexShrink:0 }} />
      {m.label}
    </span>
  );
}

function Divider() {
  return <div style={{ borderBottom:'1px solid #F0F0F0', margin:'4px 0' }} />;
}

function Field({ label, required, children }) {
  return (
    <div>
      <label style={{ display:'block', fontSize:12, fontWeight:600, color:'#374151', marginBottom:6 }}>
        {label}{required && <span style={{ color:'#EF4444', marginLeft:2 }}>*</span>}
      </label>
      {children}
    </div>
  );
}


export default function AdminCMS({ onExit }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() =>
    sessionStorage.getItem('figuremap_admin_auth') === 'true'
  );
  const [items, setItems]         = useState(getStoredCollections);
  const [filter, setFilter]       = useState('all');
  const [search, setSearch]       = useState('');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formTitle, setFormTitle] = useState('');
  const [formTag,   setFormTag]   = useState('poster');
  const [formDesc,  setFormDesc]  = useState('');
  const [formMedia, setFormMedia] = useState('');
  const [formMonth, setFormMonth] = useState('September');
  const [formYear,  setFormYear]  = useState('2026');
  const [deletingId, setDeletingId] = useState(null);
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState(false);
  const [shaking, setShaking]     = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const h = () => setItems(getStoredCollections());
    window.addEventListener('figuremap_collections_updated', h);
    return () => window.removeEventListener('figuremap_collections_updated', h);
  }, []);

  // ── Login gate ──────────────────────────────────────────────────────────
  if (!isAuthenticated) {
    const submit = (e) => {
      e?.preventDefault();
      const c = passwordInput.trim().toLowerCase();
      if (['screamprint','screen','satyakala'].includes(c)) {
        sessionStorage.setItem('figuremap_admin_auth','true');
        setIsAuthenticated(true);
      } else {
        setAuthError(true);
        setShaking(true);
        setTimeout(() => setShaking(false), 400);
      }
    };
    return (
      <div style={{
        position:'fixed', top:0, left:0, right:0, bottom:0, zIndex:999999,
        backgroundColor:'#fff', display:'flex', alignItems:'center', justifyContent:'center',
        fontFamily:"'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      }}>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
          @keyframes shakeGate{0%,100%{transform:translateX(0)}20%,60%{transform:translateX(-6px)}40%,80%{transform:translateX(6px)}}
          .shakeGate{animation:shakeGate .35s ease-in-out both}
          .gate-inp:focus{outline:none!important;border-color:#111!important;box-shadow:0 0 0 3px rgba(0,0,0,.06)!important}
        `}</style>
        <div className={shaking ? 'shakeGate' : ''} style={{ width:320 }}>
          <p style={{ fontSize:12, color:'#9CA3AF', marginBottom:24, fontWeight:500, letterSpacing:'0.06em', textTransform:'uppercase' }}>
            Figure Map Admin
          </p>
          <form onSubmit={submit}>
            <label style={{ display:'block', fontSize:13, fontWeight:500, color:'#111', marginBottom:6 }}>
              Secret passcode
            </label>
            <input
              className="gate-inp"
              type="password"
              autoFocus
              value={passwordInput}
              onChange={e => {
                const v = e.target.value;
                setPasswordInput(v);
                if (authError) setAuthError(false);
                const c = v.trim().toLowerCase();
                if (['screamprint','screen','satyakala'].includes(c)) {
                  sessionStorage.setItem('figuremap_admin_auth','true');
                  setIsAuthenticated(true);
                }
              }}
              placeholder="Enter passcode"
              style={{
                width:'100%', boxSizing:'border-box',
                border:'1.5px solid #E5E7EB', borderRadius:8, padding:'10px 14px',
                fontSize:14, color:'#111', background:'#fff', fontFamily:'inherit',
              }}
            />
            {authError && <p style={{ fontSize:12, color:'#EF4444', marginTop:8, margin:'8px 0 0' }}>Incorrect passcode. Try again.</p>}
          </form>
        </div>
      </div>
    );
  }

  // ── Handlers ──────────────────────────────────────────────────────────
  const openCreate = () => {
    setEditingItem(null);
    setFormTitle(''); setFormTag('poster'); setFormDesc('');
    setFormMedia(''); setFormMonth('September'); setFormYear('2026');
    setDrawerOpen(true);
  };

  const openEdit = (item) => {
    setEditingItem(item);
    setFormTitle(item.title || '');
    setFormTag(item.tag || 'poster');
    setFormDesc(item.description || '');
    setFormMedia(item.media || '');
    setFormMonth(item.month || 'September');
    setFormYear(item.year || '2026');
    setDrawerOpen(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!formTitle.trim()) return;
    const entry = {
      id: editingItem ? editingItem.id : `col_${Date.now()}`,
      tag: formTag,
      title: formTitle.trim(),
      description: formDesc.trim(),
      media: formMedia || '/images/img_backprint_kinetic.png',
      month: formMonth,
      year: formYear,
    };
    const list = editingItem
      ? items.map(it => it.id === editingItem.id ? entry : it)
      : [entry, ...items];
    setItems(list);
    saveStoredCollections(list);
    setDrawerOpen(false);
  };

  const handleDelete = (id) => {
    const list = items.filter(it => it.id !== id);
    setItems(list);
    saveStoredCollections(list);
    setDeletingId(null);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => setFormMedia(ev.target.result);
    reader.readAsDataURL(file);
  };

  const handleReset = () => {
    if (window.confirm('Reset all collections to defaults?')) {
      setItems(resetStoredCollections());
    }
  };

  // ── Derived ─────────────────────────────────────────────────────────
  const visible = items
    .filter(it => filter === 'all' || it.tag === filter)
    .filter(it => !search || it.title.toLowerCase().includes(search.toLowerCase()) || (it.description || '').toLowerCase().includes(search.toLowerCase()));

  const counts = {
    all: items.length,
    poster: items.filter(i => i.tag === 'poster').length,
    partner: items.filter(i => i.tag === 'partner').length,
    print: items.filter(i => i.tag === 'print').length,
  };

  // ── Shared style tokens ──────────────────────────────────────────────
  const root = {
    minHeight:'100vh', background:'#F9FAFB',
    fontFamily:"'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    color:'#111',
  };
  const topbar = {
    background:'#fff', borderBottom:'1px solid #E5E7EB',
    padding:'0 32px', display:'flex', alignItems:'center',
    justifyContent:'space-between', height:56, position:'sticky', top:0, zIndex:100,
  };
  const btnText = {
    background:'none', border:'none', cursor:'pointer', fontSize:13, color:'#6B7280',
    display:'flex', alignItems:'center', gap:6, padding:'6px 10px', borderRadius:6,
  };
  const btnPrimary = {
    background:'#111', color:'#fff', border:'none', cursor:'pointer',
    fontSize:13, fontWeight:500, padding:'8px 16px', borderRadius:7,
    display:'flex', alignItems:'center', gap:6,
  };
  const card = {
    background:'#fff', border:'1px solid #E5E7EB', borderRadius:10, overflow:'hidden',
  };
  const th = {
    padding:'10px 16px', textAlign:'left', fontSize:11, fontWeight:600, color:'#9CA3AF',
    letterSpacing:'0.05em', textTransform:'uppercase',
    borderBottom:'1px solid #F0F0F0', background:'#FAFAFA',
  };
  const td = { padding:'14px 16px', fontSize:13, color:'#374151', verticalAlign:'middle' };
  const iconBtn = {
    background:'none', border:'1px solid #E5E7EB', cursor:'pointer', borderRadius:6,
    padding:'5px 8px', display:'inline-flex', alignItems:'center', justifyContent:'center',
    color:'#6B7280',
  };

  return (
    <div style={root}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        .adm-row:hover td { background:#FAFAFA !important; }
        .adm-ib:hover { border-color:#D1D5DB !important; background:#F9FAFB !important; }
        .adm-del:hover { border-color:#FCA5A5 !important; background:#FEF2F2 !important; color:#EF4444 !important; }
        .adm-tab:hover { background:#F3F4F6 !important; }
        .adm-tbtn:hover { background:#F3F4F6 !important; }
        .adm-pbtn:hover { opacity:.85 !important; }
        .adm-inp:focus { outline:none !important; border-color:#111 !important; box-shadow:0 0 0 3px rgba(0,0,0,.06) !important; }
        .adm-upload:hover { border-color:#9CA3AF !important; background:#F3F4F6 !important; }
      `}</style>

      {/* ── Top bar ── */}
      <div style={topbar}>
        <div style={{ display:'flex', alignItems:'center', gap:12 }}>
          <span style={{ fontWeight:700, fontSize:15, letterSpacing:'-0.01em' }}>Figure Map</span>
          <span style={{ fontSize:11, fontWeight:500, color:'#6B7280', background:'#F3F4F6', padding:'2px 8px', borderRadius:4 }}>
            Admin CMS
          </span>
        </div>
        <div style={{ display:'flex', alignItems:'center', gap:8 }}>
          <button onClick={onExit} className="adm-tbtn" style={btnText}>
            <ExternalLink size={14} /> View site
          </button>
          <button
            onClick={() => { sessionStorage.removeItem('figuremap_admin_auth'); setIsAuthenticated(false); }}
            className="adm-tbtn" style={btnText}
          >
            <LogOut size={14} /> Log out
          </button>
          <button onClick={openCreate} className="adm-pbtn" style={btnPrimary}>
            <Plus size={15} /> Add collection
          </button>
        </div>
      </div>

      {/* ── Page ── */}
      <div style={{ maxWidth:1100, margin:'0 auto', padding:'32px' }}>
        <div style={{ marginBottom:24 }}>
          <h1 style={{ fontSize:22, fontWeight:700, letterSpacing:'-0.02em', margin:'0 0 4px' }}>Collections</h1>
          <p style={{ fontSize:13, color:'#6B7280', margin:0 }}>
            {items.length} item{items.length !== 1 ? 's' : ''} — manage your poster, partner, and print collections
          </p>
        </div>

        <div style={card}>
          {/* ── Card header ── */}
          <div style={{ padding:'14px 20px', display:'flex', alignItems:'center', justifyContent:'space-between', borderBottom:'1px solid #F0F0F0', flexWrap:'wrap', gap:12 }}>
            {/* Filter tabs */}
            <div style={{ display:'flex', gap:2 }}>
              {[
                { key:'all',     label:`All (${counts.all})` },
                { key:'poster',  label:`Posters (${counts.poster})` },
                { key:'partner', label:`Partners (${counts.partner})` },
                { key:'print',   label:`Prints (${counts.print})` },
              ].map(tab => (
                <button
                  key={tab.key}
                  onClick={() => setFilter(tab.key)}
                  className="adm-tab"
                  style={{
                    padding:'6px 14px', fontSize:13, border:'none', cursor:'pointer', borderRadius:6,
                    fontWeight: filter === tab.key ? 600 : 400,
                    color: filter === tab.key ? '#111' : '#6B7280',
                    background: filter === tab.key ? '#F3F4F6' : 'transparent',
                    fontFamily:'inherit',
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Search + reset */}
            <div style={{ display:'flex', alignItems:'center', gap:8 }}>
              <div style={{ display:'flex', alignItems:'center', gap:8, border:'1px solid #E5E7EB', borderRadius:7, padding:'7px 12px', width:220, background:'#fff' }}>
                <Search size={14} color="#9CA3AF" style={{ flexShrink:0 }} />
                <input
                  className="adm-inp"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Search collections…"
                  style={{ border:'none', outline:'none', fontSize:13, color:'#111', background:'transparent', width:'100%', fontFamily:'inherit' }}
                />
              </div>
              <button onClick={handleReset} className="adm-tbtn" style={{ ...btnText, padding:'7px 10px' }} title="Reset to defaults">
                <RotateCcw size={13} />
              </button>
            </div>
          </div>

          {/* ── Table ── */}
          <div style={{ overflowX:'auto' }}>
            <table style={{ width:'100%', borderCollapse:'collapse' }}>
              <thead>
                <tr>
                  <th style={{ ...th, width:72 }}>Image</th>
                  <th style={th}>Title</th>
                  <th style={{ ...th, width:120 }}>Type</th>
                  <th style={{ ...th, width:130 }}>Date</th>
                  <th style={{ ...th, width:100, textAlign:'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {visible.map(item => (
                  <tr key={item.id} className="adm-row" style={{ borderBottom:'1px solid #F3F4F6' }}>
                    <td style={td}>
                      <div style={{ width:44, height:52, borderRadius:6, background:'#F3F4F6', overflow:'hidden', border:'1px solid #E5E7EB', display:'flex', alignItems:'center', justifyContent:'center' }}>
                        {item.media
                          ? <img src={item.media} alt={item.title} style={{ width:'100%', height:'100%', objectFit:'cover' }} onError={e => { e.target.onerror=null; e.target.style.display='none'; }} />
                          : <ImageIcon size={16} color="#D1D5DB" />
                        }
                      </div>
                    </td>
                    <td style={td}>
                      <div style={{ fontWeight:600, color:'#111', fontSize:13, marginBottom:2 }}>{item.title}</div>
                      {item.description && (
                        <div style={{ fontSize:12, color:'#9CA3AF', maxWidth:420, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>
                          {item.description}
                        </div>
                      )}
                    </td>
                    <td style={td}><TagBadge tag={item.tag} /></td>
                    <td style={{ ...td, color:'#9CA3AF', fontSize:12, whiteSpace:'nowrap' }}>{item.month} {item.year}</td>
                    <td style={{ ...td, textAlign:'right' }}>
                      <div style={{ display:'flex', gap:6, justifyContent:'flex-end' }}>
                        <button onClick={() => openEdit(item)} className="adm-ib" style={iconBtn} title="Edit">
                          <Edit3 size={13} />
                        </button>
                        <button onClick={() => setDeletingId(item.id)} className="adm-ib adm-del" style={iconBtn} title="Delete">
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {visible.length === 0 && (
                  <tr>
                    <td colSpan={5} style={{ textAlign:'center', padding:'64px 20px', color:'#9CA3AF', fontSize:14 }}>
                      <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:8 }}>
                        <ImageIcon size={32} color="#E5E7EB" />
                        <p style={{ margin:0, fontWeight:500 }}>No collections found</p>
                        <p style={{ margin:0, fontSize:12, color:'#D1D5DB' }}>
                          {search ? 'Try a different search term' : 'Click "Add collection" to get started'}
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Footer */}
          {visible.length > 0 && (
            <div style={{ padding:'12px 20px', borderTop:'1px solid #F0F0F0', fontSize:12, color:'#9CA3AF' }}>
              Showing {visible.length} of {items.length} collections
            </div>
          )}
        </div>
      </div>

      {/* ── Drawer ── */}
      {drawerOpen && (
        <div style={{ position:'fixed', top:0, left:0, right:0, bottom:0, zIndex:200, display:'flex', justifyContent:'flex-end' }}>
          <div onClick={() => setDrawerOpen(false)} style={{ flex:1, background:'rgba(0,0,0,0.35)' }} />
          <div style={{ width:440, background:'#fff', height:'100vh', display:'flex', flexDirection:'column', boxShadow:'-4px 0 32px rgba(0,0,0,0.10)', overflowY:'auto' }}>
            {/* Drawer header */}
            <div style={{ padding:'20px 24px', borderBottom:'1px solid #F0F0F0', display:'flex', alignItems:'center', justifyContent:'space-between', position:'sticky', top:0, background:'#fff', zIndex:10 }}>
              <div>
                <p style={{ fontSize:11, fontWeight:600, color:'#9CA3AF', margin:'0 0 2px', textTransform:'uppercase', letterSpacing:'0.06em' }}>
                  {editingItem ? 'Edit collection' : 'New collection'}
                </p>
                <h2 style={{ fontSize:17, fontWeight:700, color:'#111', margin:0 }}>
                  {editingItem ? editingItem.title : 'Add to index'}
                </h2>
              </div>
              <button onClick={() => setDrawerOpen(false)} style={{ background:'none', border:'none', cursor:'pointer', padding:4, color:'#6B7280', borderRadius:6 }}>
                <X size={18} />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSave} style={{ flex:1, padding:'24px', display:'flex', flexDirection:'column', gap:20 }}>
              {/* Type */}
              <Field label="Type">
                <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:8 }}>
                  {Object.entries(TAG_META).map(([key, meta]) => (
                    <button key={key} type="button" onClick={() => setFormTag(key)} style={{
                      padding:'10px 8px', border:`1.5px solid ${formTag === key ? meta.color : '#E5E7EB'}`,
                      borderRadius:8, background: formTag === key ? meta.bg : '#fff',
                      cursor:'pointer', textAlign:'left',
                    }}>
                      <span style={{ display:'flex', alignItems:'center', gap:6, fontSize:12, fontWeight:600, color: formTag === key ? meta.color : '#374151' }}>
                        <span style={{ width:7, height:7, borderRadius:'50%', background: formTag === key ? meta.dot : '#D1D5DB' }} />
                        {meta.label}
                      </span>
                    </button>
                  ))}
                </div>
              </Field>

              <Divider />

              {/* Title */}
              <Field label="Title" required>
                <input
                  className="adm-inp"
                  type="text"
                  value={formTitle}
                  onChange={e => setFormTitle(e.target.value)}
                  placeholder="e.g. Kinetic Dynamics — Backprint"
                  required
                  style={{ width:'100%', boxSizing:'border-box', border:'1.5px solid #E5E7EB', borderRadius:8, padding:'10px 14px', fontSize:13, color:'#111', fontFamily:'inherit', background:'#fff' }}
                />
              </Field>

              {/* Description */}
              <Field label="Description">
                <textarea
                  className="adm-inp"
                  value={formDesc}
                  onChange={e => setFormDesc(e.target.value)}
                  placeholder="Short description or subtitle"
                  rows={3}
                  style={{ width:'100%', boxSizing:'border-box', border:'1.5px solid #E5E7EB', borderRadius:8, padding:'10px 14px', fontSize:13, color:'#111', fontFamily:'inherit', resize:'vertical', lineHeight:1.5 }}
                />
              </Field>

              <Divider />

              {/* Date row */}
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
                <Field label="Month">
                  <div style={{ position:'relative' }}>
                    <select className="adm-inp" value={formMonth} onChange={e => setFormMonth(e.target.value)} style={{ width:'100%', border:'1.5px solid #E5E7EB', borderRadius:8, padding:'10px 32px 10px 14px', fontSize:13, color:'#111', background:'#fff', appearance:'none', cursor:'pointer', fontFamily:'inherit' }}>
                      {MONTHS.map(m => <option key={m}>{m}</option>)}
                    </select>
                    <ChevronDown size={13} style={{ position:'absolute', right:10, top:'50%', transform:'translateY(-50%)', color:'#9CA3AF', pointerEvents:'none' }} />
                  </div>
                </Field>
                <Field label="Year">
                  <div style={{ position:'relative' }}>
                    <select className="adm-inp" value={formYear} onChange={e => setFormYear(e.target.value)} style={{ width:'100%', border:'1.5px solid #E5E7EB', borderRadius:8, padding:'10px 32px 10px 14px', fontSize:13, color:'#111', background:'#fff', appearance:'none', cursor:'pointer', fontFamily:'inherit' }}>
                      {YEARS.map(y => <option key={y}>{y}</option>)}
                    </select>
                    <ChevronDown size={13} style={{ position:'absolute', right:10, top:'50%', transform:'translateY(-50%)', color:'#9CA3AF', pointerEvents:'none' }} />
                  </div>
                </Field>
              </div>

              <Divider />

              {/* Media */}
              <Field label="Cover image">
                {formMedia && (
                  <div style={{ width:'100%', aspectRatio:'16/9', borderRadius:8, overflow:'hidden', border:'1px solid #E5E7EB', marginBottom:10, background:'#F9FAFB' }}>
                    <img src={formMedia} alt="Preview" style={{ width:'100%', height:'100%', objectFit:'cover' }} onError={e => { e.target.onerror=null; setFormMedia(''); }} />
                  </div>
                )}
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="adm-upload"
                  style={{ width:'100%', border:'1.5px dashed #D1D5DB', borderRadius:8, padding:'16px', background:'#FAFAFA', cursor:'pointer', display:'flex', flexDirection:'column', alignItems:'center', gap:6, marginBottom:10 }}
                >
                  <Upload size={18} color="#9CA3AF" />
                  <span style={{ fontSize:13, color:'#6B7280' }}>Upload image</span>
                  <span style={{ fontSize:11, color:'#B0B8C4' }}>PNG, JPG, WebP</span>
                </button>
                <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileUpload} style={{ display:'none' }} />
                <input
                  className="adm-inp"
                  type="text"
                  value={formMedia}
                  onChange={e => setFormMedia(e.target.value)}
                  placeholder="Or paste URL / path"
                  style={{ width:'100%', boxSizing:'border-box', border:'1.5px solid #E5E7EB', borderRadius:8, padding:'10px 14px', fontSize:13, color:'#111', fontFamily:'inherit', background:'#fff' }}
                />
              </Field>

              {/* Drawer footer */}
              <div style={{ display:'flex', gap:10, marginTop:'auto', paddingTop:8 }}>
                <button type="button" onClick={() => setDrawerOpen(false)} style={{ flex:1, padding:'10px', border:'1.5px solid #E5E7EB', borderRadius:8, background:'#fff', fontSize:14, fontWeight:500, color:'#374151', cursor:'pointer', fontFamily:'inherit' }}>
                  Cancel
                </button>
                <button type="submit" style={{ flex:2, padding:'10px', background:'#111', color:'#fff', border:'none', borderRadius:8, fontSize:14, fontWeight:600, cursor:'pointer', fontFamily:'inherit' }}>
                  {editingItem ? 'Save changes' : 'Add to index'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── Delete confirm ── */}
      {deletingId && (() => {
        const item = items.find(i => i.id === deletingId);
        return (
          <div style={{ position:'fixed', top:0, left:0, right:0, bottom:0, zIndex:300, background:'rgba(0,0,0,0.45)', display:'flex', alignItems:'center', justifyContent:'center' }}>
            <div style={{ background:'#fff', borderRadius:12, padding:'28px', width:360, boxShadow:'0 8px 40px rgba(0,0,0,0.16)', fontFamily:"'Inter', sans-serif" }}>
              <h3 style={{ fontSize:16, fontWeight:700, margin:'0 0 8px', color:'#111' }}>Delete collection?</h3>
              <p style={{ fontSize:13, color:'#6B7280', margin:'0 0 24px', lineHeight:1.5 }}>
                <strong style={{ color:'#111' }}>{item?.title}</strong> will be permanently removed from the index.
              </p>
              <div style={{ display:'flex', gap:10 }}>
                <button onClick={() => setDeletingId(null)} style={{ flex:1, padding:'9px', border:'1.5px solid #E5E7EB', borderRadius:8, background:'#fff', fontSize:14, fontWeight:500, color:'#374151', cursor:'pointer', fontFamily:'inherit' }}>
                  Cancel
                </button>
                <button onClick={() => handleDelete(deletingId)} style={{ flex:1, padding:'9px', background:'#EF4444', color:'#fff', border:'none', borderRadius:8, fontSize:14, fontWeight:600, cursor:'pointer', fontFamily:'inherit' }}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
}
