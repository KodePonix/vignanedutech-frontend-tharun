import { useCallback, useEffect, useState } from 'react'
import { Link, Navigate, Route, Routes, useLocation, useNavigate, useParams } from 'react-router-dom'
import {
  Activity, ArrowDown, ArrowLeft, ArrowUp, Bell, BookOpen, Boxes, Check, ChevronDown, ChevronRight,
  CircleHelp, Database, ExternalLink, Eye, FolderOpen, Globe, GraduationCap, LayoutDashboard, LogOut,
  Mail, Menu, MessageSquare, Palette, Pencil, Plus, RotateCcw, Search, Settings, Sparkles, Trash2, X
} from 'lucide-react'
import { api, getToken, login, setToken } from '../api'
import {
  DEFAULT_CURRICULUM, DEFAULT_GENERAL, DEFAULT_PROJECTS, DEFAULT_SECTIONS, DEFAULT_TESTIMONIALS,
  DEFAULT_THEME, SECTION_DEFAULTS
} from '../content/defaults'
import { GENERAL_SCHEMA, SECTION_SCHEMAS } from '../content/schemas'
import { FieldList } from './fields'

const navItems = [
  ['Overview', '/admin', LayoutDashboard],
  ['Website Sections', '/admin/sections', Boxes],
  ['Student Projects', '/admin/projects', FolderOpen],
  ['Curriculum', '/admin/curriculum', BookOpen],
  ['Testimonials', '/admin/testimonials', MessageSquare],
  ['Inquiries', '/admin/inquiries', Mail],
  ['Theme & Design', '/admin/theme', Palette],
  ['Settings', '/admin/settings', Settings]
]

// Small data-loading hook for admin pages.
function useApi(path) {
  const [state, setState] = useState({ data: null, error: '', loading: true })
  const reload = useCallback(() => {
    setState(s => ({ ...s, loading: true }))
    return api(path).then(data => setState({ data, error: '', loading: false }))
      .catch(err => setState({ data: null, error: err.message, loading: false }))
  }, [path])
  useEffect(() => { reload() }, [reload])
  return { ...state, reload, setData: data => setState(s => ({ ...s, data })) }
}

const loadProfile = () => { try { return JSON.parse(localStorage.getItem('opot_admin_profile')) } catch { return null } }

function App() {
  const [admin, setAdmin] = useState(() => (getToken() ? loadProfile() || { name: 'Admin' } : null))
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  const signOut = useCallback(() => {
    setToken(null); localStorage.removeItem('opot_admin_profile'); setAdmin(null); navigate('/admin/login')
  }, [navigate])
  useEffect(() => {
    window.addEventListener('opot:logout', signOut)
    return () => window.removeEventListener('opot:logout', signOut)
  }, [signOut])
  useEffect(() => setSidebarOpen(false), [location.pathname])

  async function signIn(email, password) {
    const res = await login(email, password)
    setToken(res.token)
    localStorage.setItem('opot_admin_profile', JSON.stringify(res.admin))
    setAdmin(res.admin)
    navigate('/admin')
  }

  const onLogin = location.pathname === '/admin/login'
  if (!admin && !onLogin) return <Navigate to="/admin/login" replace />
  if (admin && onLogin) return <Navigate to="/admin" replace />

  return <Routes>
    <Route path="login" element={<Login onLogin={signIn} />} />
    <Route path="*" element={
      <AdminShell activePath={location.pathname} admin={admin} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} onLogout={signOut}>
        <Routes>
          <Route index element={<Dashboard admin={admin} />} />
          <Route path="sections" element={<SectionsPage />} />
          <Route path="sections/:slug" element={<SectionEditor />} />
          <Route path="projects" element={<ResourcePage {...RESOURCES.projects} />} />
          <Route path="curriculum" element={<ResourcePage {...RESOURCES.curriculum} />} />
          <Route path="testimonials" element={<ResourcePage {...RESOURCES.testimonials} />} />
          <Route path="inquiries" element={<InquiriesPage />} />
          <Route path="theme" element={<ThemePage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="*" element={<Navigate to="/admin" replace />} />
        </Routes>
      </AdminShell>
    } />
  </Routes>
}

function Login({ onLogin }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)
  async function submit(e) {
    e.preventDefault(); setBusy(true); setError('')
    try { await onLogin(email, password) } catch (err) { setError(err.message) } finally { setBusy(false) }
  }
  return <div className="login-wrap">
    <div className="login-card">
      <div className="brand-mark">O<span>+</span></div>
      <p className="eyebrow">OPOT-SOLVANCE</p>
      <h1>Welcome back</h1>
      <p className="muted">Sign in to manage your website content.</p>
      <form onSubmit={submit}>
        <label>Email address</label><input type="email" value={email} onChange={e => setEmail(e.target.value)} required autoComplete="username" />
        <label>Password</label><input type="password" value={password} onChange={e => setPassword(e.target.value)} required placeholder="Enter password" autoComplete="current-password" />
        {error && <div className="cms-error">{error}</div>}
        <button className="primary-btn full" type="submit" disabled={busy}>{busy ? 'Signing in…' : 'Sign in'} <ChevronRight size={17} /></button>
      </form>
    </div>
    <div className="login-side"><div className="orbit orbit-one"></div><div className="orbit orbit-two"></div><div className="login-side-content"><Sparkles size={30} /><h2>Inspire curiosity.<br />Build the future.</h2><p>One place to manage your learning experience, stories and student innovations.</p></div></div>
  </div>
}

function AdminShell({ children, activePath, admin, sidebarOpen, setSidebarOpen, onLogout }) {
  const isActive = path => path === '/admin' ? activePath === '/admin' || activePath === '/admin/' : activePath.startsWith(path)
  const active = navItems.find(([, path]) => isActive(path)) || navItems[0]
  const initials = (admin?.name || 'AD').split(/\s+/).map(w => w[0]).join('').slice(0, 2).toUpperCase()
  return <div className="admin-layout">
    {sidebarOpen && <div className="mobile-scrim" onClick={() => setSidebarOpen(false)} />}
    <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
      <div className="sidebar-brand"><div className="brand-mark small">O<span>+</span></div><div><strong>OPOT<span className="gold-text">.</span></strong><small>SOLVANCE ADMIN</small></div><button className="icon-btn mobile-close" onClick={() => setSidebarOpen(false)}><X /></button></div>
      <div className="workspace-label">WORKSPACE</div>
      <nav>{navItems.map(([label, path, Icon]) => <Link key={path} to={path} className={`nav-link ${isActive(path) ? 'active' : ''}`}><Icon size={18} /><span>{label}</span></Link>)}</nav>
      <div className="sidebar-bottom"><a className="help-card" href="/" target="_blank" rel="noreferrer"><CircleHelp size={19} /><div><b>View website</b><small>See your live changes</small></div><ExternalLink size={14} /></a><button className="nav-link logout" onClick={onLogout}><LogOut size={18} />Sign out</button><div className="sidebar-version">OPOT Admin · v1.1.0</div></div>
    </aside>
    <main className="main-area">
      <header className="topbar"><div className="topbar-left"><button className="icon-btn menu-btn" onClick={() => setSidebarOpen(true)}><Menu /></button><div className="breadcrumb">Admin <ChevronRight size={14} /><b>{active[0]}</b></div></div><div className="topbar-right"><a className="view-site" href="/" target="_blank" rel="noreferrer"><Globe size={16} /> View website <ExternalLink size={13} /></a><Link to="/admin/inquiries" className="icon-btn notification"><Bell size={18} /></Link><div className="avatar">{initials}</div><div className="profile-label"><b>{admin?.name}</b><small>{admin?.role === 'super_admin' ? 'Super admin' : 'Administrator'}</small></div><ChevronDown size={15} /></div></header>
      <div className="page-content">{children}</div>
    </main>
  </div>
}

function PageHeader({ eyebrow = 'CONTENT MANAGEMENT', title, description, action }) {
  return <div className="page-header"><div><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p className="muted">{description}</p></div>{action}</div>
}
const Status = ({ status }) => <span className={`status status-${String(status).toLowerCase().replaceAll(/[ _]/g, '-')}`}>{String(status).replace('_', ' ')}</span>
const Loading = ({ error }) => <div className="empty-panel">{error ? <><h3>Couldn’t load data</h3><p className="cms-error">{error}</p></> : <p>Loading…</p>}</div>

// Shown until the default website content has been copied into the database.
function SetupBanner({ onDone }) {
  const site = useApi('/admin/site-settings')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  if (!site.data || site.data.meta?.initialized) return null
  async function run() {
    setBusy(true); setError('')
    try {
      await api('/admin/bootstrap', {
        method: 'POST', body: {
          sections: DEFAULT_SECTIONS, projects: DEFAULT_PROJECTS, testimonials: DEFAULT_TESTIMONIALS,
          curriculum: DEFAULT_CURRICULUM, settings: { general: DEFAULT_GENERAL, theme: DEFAULT_THEME }
        }
      })
      await site.reload(); onDone?.()
    } catch (err) { setError(err.message) } finally { setBusy(false) }
  }
  return <div className="cms-setup"><Database size={22} /><div><b>Set up your editable website content</b><p>Your website is currently showing built-in default content. Import it into the database once to start editing every section, image and button from here.</p>{error && <p className="cms-error">{error}</p>}</div><button className="primary-btn" disabled={busy} onClick={run}>{busy ? 'Importing…' : 'Import website content'}</button></div>
}

function Dashboard({ admin }) {
  const sections = useApi('/admin/sections'), projects = useApi('/admin/projects'), inquiries = useApi('/admin/enquiries')
  const reloadAll = () => { sections.reload(); projects.reload() }
  const s = sections.data || [], p = projects.data || [], q = inquiries.data || []
  const hour = new Date().getHours()
  const stats = [
    ['Website sections', s.length, Boxes, `${s.filter(x => x.status === 'published' && x.isVisible).length} live on website`],
    ['Student projects', p.length, FolderOpen, `${p.filter(x => x.isPublished).length} published`],
    ['New inquiries', q.filter(x => x.status === 'new').length, Mail, 'Needs your attention'],
    ['Total inquiries', q.length, MessageSquare, 'All time']
  ]
  const ordered = [...s].sort((a, b) => a.sortOrder - b.sortOrder)
  return <>
    <PageHeader title={`Good ${hour < 12 ? 'morning' : hour < 17 ? 'afternoon' : 'evening'}, ${admin?.name?.split(' ')[0] || 'Admin'} 👋`} description="Here’s what’s happening with your website today." action={<a className="outline-btn" href="/" target="_blank" rel="noreferrer"><Eye size={16} /> Preview website</a>} />
    <SetupBanner onDone={reloadAll} />
    <div className="welcome-banner"><div><span className="banner-tag"><Sparkles size={13} /> YOUR DIGITAL WORKSPACE</span><h2>Make every learning moment<br />count.</h2><p>Keep your website fresh with stories, projects and learning resources.</p><Link to="/admin/sections" className="banner-link">Manage website content <ChevronRight size={16} /></Link></div><div className="banner-art"><div className="art-ring"></div><div className="art-core"><GraduationCap size={62} /></div><span className="art-chip chip-a">CREATE</span><span className="art-chip chip-b">INNOVATE</span><span className="art-chip chip-c">INSPIRE</span></div></div>
    <div className="stats-grid">{stats.map(([label, value, Icon, note]) => <div className="stat-card" key={label}><div className="stat-top"><span>{label}</span><span className="stat-icon"><Icon size={18} /></span></div><strong>{value}</strong><small>{note}</small></div>)}</div>
    <div className="dashboard-grid"><section className="panel"><div className="panel-heading"><div><h3>Website sections</h3><p>Quick overview of your page content</p></div><Link to="/admin/sections">Manage all <ChevronRight size={15} /></Link></div><div className="section-list">{ordered.slice(0, 6).map(x => <Link to={`/admin/sections/${x.slug}`} className="section-row" key={x.id}><span className="section-dot" /><div className="section-row-name"><b>{x.title}</b><small>{x.slug}</small></div><Status status={x.status} /><span className={`visibility ${x.isVisible ? 'on' : ''}`}>{x.isVisible ? 'Visible' : 'Hidden'}</span></Link>)}{!s.length && <p className="muted">No sections in the database yet.</p>}</div></section>
      <section className="panel activity-panel"><div className="panel-heading"><div><h3>Recent inquiries</h3><p>Latest website submissions</p></div><Link to="/admin/inquiries">View all <ChevronRight size={15} /></Link></div>{q.slice(0, 4).map(i => <div className="inquiry-mini" key={i.id}><div className="inquiry-avatar">{i.name.slice(0, 1)}</div><div><b>{i.name}</b><small>{i.organization || i.email}</small></div><span className="mini-date">{new Date(i.createdAt).toLocaleDateString()}</span></div>)}{!q.length && <p className="muted">No inquiries yet.</p>}</section></div>
    <div className="bottom-tip"><div className="tip-icon"><Activity size={20} /></div><div><b>Keep your website up to date</b><p>Update your student showcase and curriculum to give visitors a reason to come back.</p></div><Link to="/admin/projects">Update showcase <ChevronRight size={15} /></Link></div>
  </>
}

/* ---------------- Website sections ---------------- */

function SectionsPage() {
  const { data, error, reload, setData } = useApi('/admin/sections')
  const [busy, setBusy] = useState(false)
  if (!data) return <><SetupBanner onDone={reload} /><Loading error={error} /></>
  const rows = [...data].sort((a, b) => a.sortOrder - b.sortOrder)
  const fixed = rows.filter(r => SECTION_DEFAULTS[r.slug]?.fixed)
  const body = rows.filter(r => !SECTION_DEFAULTS[r.slug]?.fixed)

  async function patch(row, changes) {
    setData(data.map(r => r.id === row.id ? { ...r, ...changes } : r))
    try { await api(`/admin/sections/${row.id}`, { method: 'PUT', body: changes }) } catch (err) { alert(err.message); reload() }
  }
  async function move(index, delta) {
    const t = index + delta
    if (t < 0 || t >= body.length || busy) return
    const next = [...body];[next[index], next[t]] = [next[t], next[index]]
    const changed = next.map((r, i) => ({ r, sortOrder: i + 1 })).filter(x => x.r.sortOrder !== x.sortOrder)
    setData(data.map(r => { const c = changed.find(x => x.r.id === r.id); return c ? { ...r, sortOrder: c.sortOrder } : r }))
    setBusy(true)
    try { await Promise.all(changed.map(c => api(`/admin/sections/${c.r.id}`, { method: 'PUT', body: { sortOrder: c.sortOrder } }))) }
    catch (err) { alert(err.message); reload() } finally { setBusy(false) }
  }
  const row = (s, idx, movable) => <div className="table-row" key={s.id}>
    <div className="table-title"><span className="drag-grip">⠿</span><div><b>{s.title}</b><small>{s.slug}</small></div></div>
    <button className={`toggle ${s.status === 'published' ? 'checked' : ''}`} title="Published / draft" onClick={() => patch(s, { status: s.status === 'published' ? 'draft' : 'published' })}><i /></button>
    <Status status={s.status} />
    <button className={`toggle ${s.isVisible ? 'checked' : ''}`} title="Show / hide" onClick={() => patch(s, { isVisible: !s.isVisible })}><i /></button>
    <div className="row-actions">
      {movable && <><button title="Move up" onClick={() => move(idx, -1)}><ArrowUp size={15} /></button><button title="Move down" onClick={() => move(idx, 1)}><ArrowDown size={15} /></button></>}
      <Link to={`/admin/sections/${s.slug}`} className="cms-edit-link" title="Edit content"><Pencil size={15} /> Edit</Link>
    </div>
  </div>
  const head = <div className="table-head"><span>SECTION</span><span>PUBLISHED</span><span>STATUS</span><span>VISIBLE</span><span>ACTIONS</span></div>
  return <>
    <PageHeader title="Website sections" description="Edit the text, images, buttons and icons of every section, and control order and visibility." />
    <SetupBanner onDone={reload} />
    <h3 className="cms-group-title">Page sections <small>(shown top to bottom in this order)</small></h3>
    <div className="panel table-panel">{head}{body.map((s, i) => row(s, i, true))}</div>
    <h3 className="cms-group-title">Site-wide</h3>
    <div className="panel table-panel">{head}{fixed.map((s, i) => row(s, i, false))}</div>
    <p className="cms-hint" style={{ marginTop: 12 }}>A section appears on the website only when it is both <b>published</b> and <b>visible</b>. Contact details, logo and social links are in <Link to="/admin/settings">Settings</Link>.</p>
  </>
}

function SectionEditor() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const { data, error } = useApi('/admin/sections')
  const def = SECTION_DEFAULTS[slug]
  const row = data?.find(s => s.slug === slug)
  const [form, setForm] = useState(null)
  const [saved, setSaved] = useState(null)
  const [status, setStatus] = useState('')
  useEffect(() => {
    if (row && def && !form) { const c = { ...def.content, ...row.content }; setForm(c); setSaved(JSON.stringify(c)) }
  }, [row, def, form])
  const dirty = form && JSON.stringify(form) !== saved
  useEffect(() => {
    const warn = e => { if (dirty) { e.preventDefault(); e.returnValue = '' } }
    window.addEventListener('beforeunload', warn)
    return () => window.removeEventListener('beforeunload', warn)
  }, [dirty])

  if (!def) return <Loading error={`Unknown section "${slug}"`} />
  if (data && !row) return <><SetupBanner onDone={() => window.location.reload()} /><Loading error="This section is not in the database yet. Import the website content first." /></>
  if (!form) return <Loading error={error} />

  async function save() {
    setStatus('saving')
    try {
      await api(`/admin/sections/${row.id}`, { method: 'PUT', body: { content: form } })
      setSaved(JSON.stringify(form)); setStatus('saved'); setTimeout(() => setStatus(''), 2000)
    } catch (err) { setStatus(''); alert(err.message) }
  }
  const back = () => { if (!dirty || confirm('Discard unsaved changes?')) navigate('/admin/sections') }
  const anchor = { hero: 'home', topbar: 'home', header: 'home', footer: 'contact' }[slug] || slug
  return <>
    <PageHeader eyebrow="EDIT SECTION" title={row.title} description="Change any text, image, button or icon below, then click Save."
      action={<div className="cms-row"><button className="outline-btn" onClick={back}><ArrowLeft size={15} /> Back</button><a className="outline-btn" href={`/#${anchor}`} target="_blank" rel="noreferrer"><Eye size={15} /> View on site</a></div>} />
    <div className="panel cms-editor"><FieldList fields={SECTION_SCHEMAS[slug]} value={form} onChange={setForm} /></div>
    <div className="cms-savebar">
      <button className="outline-btn" onClick={() => confirm('Replace this section with the original default content? (Not saved until you click Save.)') && setForm(structuredClone(def.content))}><RotateCcw size={15} /> Reset to default</button>
      <span className="cms-hint">{status === 'saved' ? 'All changes saved ✓' : dirty ? 'You have unsaved changes' : 'No changes'}</span>
      <button className="primary-btn" disabled={!dirty || status === 'saving'} onClick={save}><Check size={16} /> {status === 'saving' ? 'Saving…' : 'Save changes'}</button>
    </div>
  </>
}

/* ---------------- Projects / testimonials / curriculum ---------------- */

const RESOURCES = {
  projects: {
    endpoint: '/admin/projects', title: 'Student projects', noun: 'project',
    description: 'Projects shown in the “Student showcase” section of the website.',
    blank: { title: '', description: '', category: 'Robotics', gradeLabel: 'Grade 6', imageUrl: '', gallery: [], sortOrder: 0, isPublished: true },
    fields: [
      { key: 'title', label: 'Project name', type: 'text' },
      { key: 'category', label: 'Category (must match a showcase filter to appear under it)', type: 'text', suggestions: ['Robotics', 'Coding', 'AI', 'Electronics', '3D Printing', 'IoT', 'Drone'] },
      { key: 'gradeLabel', label: 'Grade', type: 'text' },
      { key: 'description', label: 'Short description', type: 'textarea' },
      { key: 'imageUrl', label: 'Project image', type: 'image' },
      { key: 'sortOrder', label: 'Display order (lower first)', type: 'number' },
      { key: 'isPublished', label: 'Published (show on website)', type: 'bool' }
    ],
    image: r => r.imageUrl, subtitle: r => [r.gradeLabel, r.category].filter(Boolean).join(' · '),
    published: r => r.isPublished, togglePublish: r => ({ isPublished: !r.isPublished })
  },
  testimonials: {
    endpoint: '/admin/testimonials', title: 'Testimonials', noun: 'testimonial',
    description: 'Quotes shown in the testimonials carousel. Only “published” ones appear on the website.',
    blank: { name: '', designation: '', quote: '', avatarUrl: '', rating: 5, status: 'published', sortOrder: 0 },
    fields: [
      { key: 'name', label: 'Name', type: 'text' },
      { key: 'designation', label: 'Role / designation', type: 'text' },
      { key: 'quote', label: 'Quote', type: 'textarea' },
      { key: 'avatarUrl', label: 'Photo (optional — initials are shown otherwise)', type: 'image' },
      { key: 'rating', label: 'Stars (1–5)', type: 'number', min: 1, max: 5 },
      { key: 'status', label: 'Status', type: 'select', options: ['published', 'pending', 'draft'] },
      { key: 'sortOrder', label: 'Display order (lower first)', type: 'number' }
    ],
    title_: r => r.name, subtitle: r => r.designation, text: r => r.quote, image: r => r.avatarUrl,
    published: r => r.status === 'published', togglePublish: r => ({ status: r.status === 'published' ? 'draft' : 'published' })
  },
  curriculum: {
    endpoint: '/admin/curriculum', title: 'Curriculum', noun: 'curriculum row',
    description: 'Rows in the curriculum section. Attach a file to make the row a download link.',
    blank: { title: '', gradeLabel: '', description: '', fileUrl: '', fileName: '', sortOrder: 0, isPublished: true },
    fields: [
      { key: 'gradeLabel', label: 'Grades', type: 'text' },
      { key: 'title', label: 'Title', type: 'text' },
      { key: 'description', label: 'Description', type: 'textarea' },
      { key: 'fileUrl', label: 'Curriculum document (optional)', type: 'file' },
      { key: 'sortOrder', label: 'Display order (lower first)', type: 'number' },
      { key: 'isPublished', label: 'Published (show on website)', type: 'bool' }
    ],
    subtitle: r => r.gradeLabel, text: r => r.description,
    published: r => r.isPublished, togglePublish: r => ({ isPublished: !r.isPublished })
  }
}

function ResourcePage(cfg) {
  const { data, error, reload } = useApi(cfg.endpoint)
  const [editing, setEditing] = useState(null)
  const [query, setQuery] = useState('')
  const name = r => (cfg.title_ ? cfg.title_(r) : r.title) || '(untitled)'
  if (!data) return <><PageHeader title={cfg.title} description={cfg.description} /><SetupBanner onDone={reload} /><Loading error={error} /></>
  const rows = [...data].sort((a, b) => a.sortOrder - b.sortOrder)
    .filter(r => JSON.stringify(r).toLowerCase().includes(query.toLowerCase()))

  async function save(form) {
    const { id, createdAt, updatedAt, ...body } = form
    await api(id ? `${cfg.endpoint}/${id}` : cfg.endpoint, { method: id ? 'PUT' : 'POST', body })
    setEditing(null); reload()
  }
  async function remove(r) {
    if (!confirm(`Delete "${name(r)}"? This cannot be undone.`)) return
    try { await api(`${cfg.endpoint}/${r.id}`, { method: 'DELETE' }); reload() } catch (err) { alert(err.message) }
  }
  async function toggle(r) {
    try { await api(`${cfg.endpoint}/${r.id}`, { method: 'PUT', body: cfg.togglePublish(r) }); reload() } catch (err) { alert(err.message) }
  }
  const nextOrder = Math.max(0, ...data.map(r => r.sortOrder || 0)) + 1
  return <>
    <PageHeader title={cfg.title} description={cfg.description} action={<button className="primary-btn" onClick={() => setEditing({ ...cfg.blank, sortOrder: nextOrder })}><Plus size={17} /> Add {cfg.noun}</button>} />
    <SetupBanner onDone={reload} />
    <div className="toolbar"><div className="search-box"><Search size={17} /><input placeholder={`Search ${cfg.title.toLowerCase()}...`} value={query} onChange={e => setQuery(e.target.value)} /></div><span className="toolbar-note">{data.length} total · {data.filter(cfg.published).length} published</span></div>
    <div className="cms-cards">{rows.map(r => <div className="cms-card" key={r.id}>
      {cfg.image && <div className="cms-card-img">{cfg.image(r) ? <img src={cfg.image(r)} alt="" /> : <Boxes size={28} />}</div>}
      <div className="cms-card-body">
        <Status status={cfg.published(r) ? 'Published' : 'Draft'} />
        <h3>{name(r)}</h3>
        <small>{cfg.subtitle(r)}</small>
        {cfg.text && <p>{cfg.text(r)}</p>}
        <div className="cms-row">
          <button className="outline-btn" onClick={() => setEditing(r)}><Pencil size={14} /> Edit</button>
          <button className="outline-btn" onClick={() => toggle(r)}>{cfg.published(r) ? 'Unpublish' : 'Publish'}</button>
          <button className="outline-btn" title="Delete" onClick={() => remove(r)}><Trash2 size={14} /></button>
        </div>
      </div>
    </div>)}</div>
    {!rows.length && <div className="empty-panel"><h3>No {cfg.title.toLowerCase()} yet</h3><p>Click “Add {cfg.noun}” to create one.</p></div>}
    {editing && <EditModal title={editing.id ? `Edit ${cfg.noun}` : `Add ${cfg.noun}`} fields={cfg.fields} initial={editing} onClose={() => setEditing(null)} onSave={save} />}
  </>
}

function EditModal({ title, fields, initial, onClose, onSave }) {
  const [form, setForm] = useState(initial)
  const [busy, setBusy] = useState(false)
  async function submit() {
    setBusy(true)
    try { await onSave(form) } catch (err) { alert(err.message) } finally { setBusy(false) }
  }
  return <Modal title={title} onClose={onClose} wide>
    <FieldList fields={fields} value={form} onChange={setForm} />
    <div className="modal-footer"><button className="outline-btn" onClick={onClose}>Cancel</button><button className="primary-btn" disabled={busy} onClick={submit}><Check size={16} /> {busy ? 'Saving…' : 'Save'}</button></div>
  </Modal>
}

/* ---------------- Inquiries ---------------- */

function InquiriesPage() {
  const { data, error, reload, setData } = useApi('/admin/enquiries')
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(null)
  if (!data) return <><PageHeader title="Inquiries" description="Messages submitted through the website contact form." /><Loading error={error} /></>
  const rows = data.filter(i => [i.name, i.email, i.organization, i.message].join(' ').toLowerCase().includes(query.toLowerCase()))
  async function setStatus(i, status) {
    setData(data.map(x => x.id === i.id ? { ...x, status } : x))
    try { await api(`/admin/enquiries/${i.id}`, { method: 'PATCH', body: { status } }) } catch (err) { alert(err.message); reload() }
  }
  return <>
    <PageHeader title="Inquiries" description="Messages submitted through the website contact form." />
    <div className="toolbar"><div className="search-box"><Search size={17} /><input placeholder="Search inquiries..." value={query} onChange={e => setQuery(e.target.value)} /></div><span className="toolbar-note">{data.length} total · {data.filter(i => i.status === 'new').length} new</span></div>
    <div className="panel table-panel"><div className="inquiry-table-head"><span>CONTACT</span><span>ORGANIZATION</span><span>DATE</span><span>STATUS</span></div>
      {rows.map(i => <div key={i.id}>
        <div className="inquiry-table-row" style={{ cursor: 'pointer' }} onClick={() => setOpen(open === i.id ? null : i.id)}><div><b>{i.name}</b><small>{i.email}</small></div><span>{i.organization || '—'}</span><span>{new Date(i.createdAt).toLocaleString()}</span>
          <select className="status-select" value={i.status} onClick={e => e.stopPropagation()} onChange={e => setStatus(i, e.target.value)}><option value="new">New</option><option value="in_progress">In progress</option><option value="closed">Closed</option></select></div>
        {open === i.id && <div className="cms-message">{i.subject && <small><b>Topic:</b> {i.subject}</small>}<p>{i.message}</p>{i.phone && <small><b>Phone:</b> <a href={`tel:${i.phone.replace(/[^\d+]/g, '')}`}>{i.phone}</a></small>}<a className="outline-btn" href={`mailto:${i.email}`}><Mail size={14} /> Reply by email</a></div>}
      </div>)}
      {!rows.length && <p className="muted" style={{ padding: 18 }}>No inquiries found.</p>}
    </div>
  </>
}

/* ---------------- Theme & settings (site_settings) ---------------- */

function useSetting(key, fallback) {
  const site = useApi('/admin/site-settings')
  const [value, setValue] = useState(null)
  const [status, setStatus] = useState('')
  useEffect(() => { if (site.data && value === null) setValue({ ...fallback, ...site.data[key] }) }, [site.data, value, key, fallback])
  async function save() {
    setStatus('saving')
    try { await api('/admin/site-settings', { method: 'PUT', body: { [key]: value } }); setStatus('saved'); setTimeout(() => setStatus(''), 2000) }
    catch (err) { setStatus(''); alert(err.message) }
  }
  return { value, setValue, save, status, error: site.error, reload: site.reload }
}
const SaveButton = ({ status, onClick }) => <button className="primary-btn" disabled={status === 'saving'} onClick={onClick}><Check size={16} /> {status === 'saving' ? 'Saving…' : status === 'saved' ? 'Saved ✓' : 'Save changes'}</button>

function ThemePage() {
  const { value: theme, setValue, save, status, error } = useSetting('theme', DEFAULT_THEME)
  if (!theme) return <Loading error={error} />
  const set = (key, v) => setValue(p => ({ ...p, [key]: v }))
  return <><PageHeader title="Theme & design" description="Set your website's brand colors. Click Save to apply them to the live website." action={<SaveButton status={status} onClick={save} />} />
    <div className="theme-layout"><div className="panel theme-panel"><h3>Brand colors</h3><p className="muted">Use your brand palette consistently across the website.</p>{[['navy', 'Primary · Royal navy'], ['gold', 'Accent · Gold'], ['white', 'Page background']].map(([key, label]) => <div className="color-row" key={key}><div><b>{label}</b><small>{theme[key]}</small></div><input type="color" value={theme[key]} onChange={e => set(key, e.target.value)} /></div>)}<button className="outline-btn" onClick={() => setValue(DEFAULT_THEME)}>Reset to recommended palette</button></div><div className="panel preview-panel"><h3>Live preview</h3><div className="preview-site" style={{ background: theme.white, color: theme.navy }}><div className="preview-nav" style={{ background: theme.navy }}><b>OPOT<span style={{ color: theme.gold }}>.</span></b><span>ABOUT　 PROGRAMS　 CONTACT</span><button style={{ background: theme.gold }}>Get in touch</button></div><div className="preview-hero"><small>LEARN · BUILD · INNOVATE</small><h2>Empowering the<br />next generation.</h2><p>Hands-on learning for a world of possibilities.</p><button style={{ background: theme.gold }}>Explore programs</button></div></div></div></div></>
}

function SettingsPage() {
  const { value, setValue, save, status, error } = useSetting('general', DEFAULT_GENERAL)
  return <><PageHeader title="Settings" description="Logo, company name, contact details and social links used across the whole website (top strip, contact section and footer)." action={value && <SaveButton status={status} onClick={save} />} />
    {value ? <div className="panel cms-editor"><FieldList fields={GENERAL_SCHEMA} value={value} onChange={setValue} /></div> : <Loading error={error} />}</>
}

function Modal({ title, children, onClose, wide }) {
  return <div className="modal-backdrop" onMouseDown={onClose}><div className={`modal ${wide ? 'cms-modal' : ''}`} onMouseDown={e => e.stopPropagation()}><div className="modal-header"><h3>{title}</h3><button className="icon-btn" onClick={onClose}><X size={18} /></button></div>{children}</div></div>
}

export default App
