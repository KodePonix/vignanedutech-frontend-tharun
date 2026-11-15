import { Fragment, useEffect, useState } from 'react'
import {
  ArrowRight, Menu, X, ChevronLeft, ChevronRight, Play, CheckCircle2,
  Star, Quote, Mail, Phone, MapPin, Instagram, Linkedin, Youtube, Facebook, Send, Sparkles, Atom, Rocket, Clock, Download
} from 'lucide-react'
import { api } from './api'
import { Icon } from './content/icons'
import { useSiteContent } from './content/useSiteContent'
import './hero.css'
import './about.css'
import './programs.css'
import './edge.css'
import './impact.css'
import './services.css'
import './classes-showcase.css'
import './testimonials-contact.css'
import './curriculum-footer.css'
import './collab.css'
import './animations.css'
import { useReveal } from './animations'

const pad = n => String(n).padStart(2, '0')

// Renders a heading: new line = <br/>, *text* = gold italic <em>.
export function Rich({ text }) {
  return String(text || '').split('\n').map((line, li) => <Fragment key={li}>
    {li > 0 && <>{' '}<br /></>}
    {line.split(/\*([^*]+)\*/).map((part, i) => i % 2 ? <em key={i}>{part}</em> : part)}
  </Fragment>)
}
const paragraphs = text => String(text || '').split(/\n\s*\n/).filter(p => p.trim())
const initials = name => String(name || '').split(/\s+/).filter(Boolean).slice(0, 2).map(w => w[0].toUpperCase()).join('')

function Socials({ g, labels }) {
  const items = [['instagram', Instagram, 'Instagram'], ['linkedin', Linkedin, 'LinkedIn'], ['youtube', Youtube, 'YouTube'], ['facebook', Facebook, 'Facebook']]
  return items.filter(([k]) => g[k] && (labels || k !== 'facebook')).map(([k, C, label]) =>
    <a key={k} href={g[k]} aria-label={label} target={g[k].startsWith('http') ? '_blank' : undefined} rel="noreferrer"><C /></a>)
}

const Topbar = ({ c, g }) => <div className="top-strip"><div className="container strip-inner"><span><Sparkles size={13} /> {c.text}</span><div><a href={`mailto:${g.email}`}>{g.email}</a><span className="strip-divider">|</span><span>{c.rightText}</span></div></div></div>

// Highlights the nav link of the section currently in view.
function useActiveHash(links) {
  const [active, setActive] = useState(links[0]?.href)
  useEffect(() => {
    const ids = links.map(l => l.href).filter(h => h?.startsWith('#')).map(h => h.slice(1))
    const onScroll = () => {
      let current = ids[0]
      for (const id of ids) { const el = document.getElementById(id); if (el && el.getBoundingClientRect().top <= 140) current = id }
      setActive('#' + current)
    }
    onScroll(); window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [links])
  return active
}
const external = href => /^https?:/.test(href || '') ? { target: '_blank', rel: 'noreferrer' } : {}

function Header({ c, g }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const links = c.navLinks || []
  const active = useActiveHash(links)
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 20)
    on(); window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])
  return <header className={`hx-header${scrolled ? ' scrolled' : ''}`}><div className="hx-header-bar">
    <a className="hx-logo" href="#home">
      {g.logoImage ? <img src={g.logoImage} alt="" /> : <span className="hx-logo-mark">{g.logoMark}<span>+</span></span>}
      <span className="hx-logo-text"><b>{g.companyName}</b>{g.tagline && <small>{g.tagline}</small>}</span>
    </a>
    <nav className={menuOpen ? 'hx-nav open' : 'hx-nav'}>
      {links.map((l, i) => <a key={i} href={l.href} className={active === l.href ? 'active' : ''} onClick={() => setMenuOpen(false)} {...external(l.href)}>{l.label}</a>)}
      {c.cta?.label && <a href={c.cta.href} className="hx-btn hx-btn-gold hx-nav-cta" onClick={() => setMenuOpen(false)}>{c.cta.label} <ArrowRight size={16} /></a>}
    </nav>
    {c.cta?.label && <a href={c.cta.href} className="hx-btn hx-btn-gold hx-header-cta">{c.cta.label} <ArrowRight size={17} /></a>}
    <button className="hx-menu" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation">{menuOpen ? <X /> : <Menu />}</button>
  </div></header>
}

const Hero = ({ c }) => <section className="hx" id="home">
  <div className="hx-visual" aria-hidden={!c.imageAlt}>{c.image && <img src={c.image} alt={c.imageAlt} />}<div className="hx-ring" /></div>
  <div className="hx-inner">
    <div className="hx-copy">
      {c.badgeText && <span className="hx-badge"><Icon name={c.badgeIcon} size={18} /> {c.badgeText}</span>}
      <h1><Rich text={c.title} /></h1>
      <p className="hx-lead">{c.lead}</p>
      <div className="hx-actions">
        {c.primaryButton?.label && <a href={c.primaryButton.href} className="hx-btn hx-btn-gold hx-btn-lg" {...external(c.primaryButton.href)}>{c.primaryButton.label} <ArrowRight size={18} /></a>}
        {c.secondaryButton?.label && <a href={c.secondaryButton.href} className="hx-video" {...external(c.secondaryButton.href)}><span><Play size={16} fill="currentColor" /></span>{c.secondaryButton.label}</a>}
      </div>
      {c.scrollText && <a href="#about" className="hx-scroll"><i /><span>{c.scrollText}</span></a>}
    </div>
  </div>
  <div className="hx-band" />
  {(c.stats?.length > 0 || c.ctaText) && <div className="hx-stats">
    {(c.stats || []).map((s, i) => <div className="hx-stat" key={i}><Icon name={s.icon} size={44} strokeWidth={1.6} /><div><b>{s.value}</b><span>{s.label}</span></div></div>)}
    {c.ctaText && <a className="hx-stats-cta" href={c.ctaHref || '#contact'} {...external(c.ctaHref)}><Icon name={c.ctaIcon} size={34} /><span><Rich text={c.ctaText} /></span><i><ArrowRight size={18} /></i></a>}
  </div>}
</section>

const Trust = ({ c }) => <section className="trust-bar"><div className="container trust-inner"><span>{c.label}</span>{(c.items || []).map((it, i) => <b key={i}><Icon name={it.icon} /> {it.text}</b>)}</div></section>

// Paragraph text where *this part* is shown bold/dark.
const Strong = ({ text }) => String(text || '').split(/\*([^*]+)\*/).map((part, i) => i % 2 ? <strong key={i}>{part}</strong> : part)

function About({ c }) {
  const storyHref = c.secondaryButton?.href || c.videoUrl
  return <section className="ab" id="about">
    <div className="ab-inner">
      <div className="ab-copy">
        {c.badgeText && <span className="hx-badge"><Icon name={c.badgeIcon} size={18} /> {c.badgeText}</span>}
        <h2><Rich text={c.title} /></h2>
        <span className="ab-rule" />
        {paragraphs(c.body).map((p, i) => <p className="ab-body" key={i}><Strong text={p} /></p>)}
        {c.pillars?.length > 0 && <div className="ab-pillars">{c.pillars.map((p, i) => <div key={i}><span><Icon name={p.icon} size={26} /></span><b><Rich text={p.title} /></b>{p.text && <small>{p.text}</small>}</div>)}</div>}
        {c.stats?.length > 0 && <div className="ab-stats">{c.stats.map((s, i) => <div key={i}><Icon name={s.icon} size={38} strokeWidth={1.6} /><div><b>{s.value}</b><small>{s.label}</small></div></div>)}</div>}
        <div className="hx-actions ab-actions">
          {c.primaryButton?.label && <a href={c.primaryButton.href} className="hx-btn ab-btn-navy" {...external(c.primaryButton.href)}>{c.primaryButton.label} <ArrowRight size={18} /></a>}
          {c.secondaryButton?.label && storyHref && <a href={storyHref} className="hx-video" {...external(storyHref)}><span><Play size={16} fill="currentColor" /></span>{c.secondaryButton.label}</a>}
        </div>
      </div>
      <div className="ab-visual">
        <i className="ab-dots" />
        <div className="ab-frame">{c.image && <img src={c.image} alt={c.imageAlt} />}
          {c.videoUrl && <a className="ab-play" href={c.videoUrl} {...external(c.videoUrl)} aria-label="Play video"><Play size={30} fill="currentColor" /></a>}
        </div>
        <i className="ab-wave" />
        {c.mascotImage && <img className="ab-mascot" src={c.mascotImage} alt="" />}
      </div>
    </div>
  </section>
}

const SectionHead = ({ c }) => <div className="section-head"><div><p className="eyebrow">{c.eyebrow}</p><h2><Rich text={c.title} /></h2></div><p className="head-description">{c.description}</p></div>

const Programs = ({ c }) => <section className="pg" id="programs">
  <i className="pg-swoosh" /><i className="pg-dots" /><Atom className="pg-atom" strokeWidth={1.2} />
  {c.mascotImage && <img className="pg-mascot" src={c.mascotImage} alt="" />}
  <div className="pg-inner">
    <div className="pg-head">
      {c.badgeText && <div className="pg-badge-row"><span className="hx-badge pg-badge"><Icon name={c.badgeIcon} size={20} /> {c.badgeText}</span></div>}
      <h2><Rich text={c.title} /></h2>
      {c.description && <p><Rich text={c.description} /></p>}
    </div>
    <div className="pg-grid">{(c.items || []).map((p, i) => <article className="pg-card" key={i}>
      <div className="pg-img">{p.image && <img src={p.image} alt={p.title} loading="lazy" />}<span className="pg-icon"><Icon name={p.icon} size={34} /></span></div>
      <div className="pg-body"><h3>{p.title}</h3><p>{p.text}</p>
        {p.buttonLabel && <a href={p.href || '#contact'} className="pg-more" {...external(p.href)}>{p.buttonLabel} <ArrowRight size={17} /></a>}</div>
    </article>)}</div>
    {(c.bannerTitle || c.bannerButton?.label) && <div className="pg-banner">
      <span className="pg-banner-art">{c.bannerImage ? <img src={c.bannerImage} alt="" /> : <Rocket size={40} />}</span>
      <div><h3><Rich text={c.bannerTitle} /></h3>{c.bannerText && <p>{c.bannerText}</p>}</div>
      {c.bannerButton?.label && <a href={c.bannerButton.href} className="hx-btn hx-btn-gold" {...external(c.bannerButton.href)}>{c.bannerButton.label} <ArrowRight size={18} /></a>}
    </div>}
  </div>
</section>

const Edge = ({ c }) => {
  const items = c.items || []
  return <section className="eg" id="edge">
    <i className="eg-corner-l" /><i className="eg-corner-r" /><i className="eg-dots" /><i className="eg-dots eg-dots-l" />
    <div className="eg-inner">
      <div className="pg-head eg-head">
        {c.badgeText && <div className="pg-badge-row"><span className="hx-badge pg-badge"><Icon name={c.badgeIcon} size={20} /> {c.badgeText}</span></div>}
        <h2><Rich text={c.title} /></h2>
        {c.description && <p><Rich text={c.description} /></p>}
      </div>
      <div className="eg-main">
        <div className="eg-photo">{c.image && <img src={c.image} alt={c.imageAlt} loading="lazy" />}</div>
        <div className="eg-cards">{items.map((f, i) => {
          const Tag = f.href ? 'a' : 'div'
          return <Tag key={i} className={`eg-card${i === items.length - 1 && items.length % 2 ? ' eg-wide' : ''}`} {...(f.href ? { href: f.href, ...external(f.href) } : {})}>
            <span className={`eg-icon ${f.color === 'navy' ? 'navy' : 'gold'}`}><Icon name={f.icon} size={34} /></span>
            <div><h3>{f.title}</h3><p>{f.text}</p></div>
            {f.href && <i className="eg-arrow"><ArrowRight size={18} /></i>}
          </Tag>
        })}</div>
      </div>
      {(c.stats?.length > 0 || c.tagline) && <div className="eg-stats">
        {(c.stats || []).map((s, i) => <div className="eg-stat" key={i}><Icon name={s.icon} size={46} strokeWidth={1.5} /><div><b>{s.value}</b><span>{s.label}</span></div></div>)}
        {c.tagline && <div className="eg-tagline"><span><Rich text={c.tagline} /></span></div>}
      </div>}
    </div>
  </section>
}

function Impact({ c }) {
  const quotes = c.quotes || []
  const [qi, setQi] = useState(0)
  const n = quotes.length
  useEffect(() => { if (n < 2) return; const t = setInterval(() => setQi(i => (i + 1) % n), 7000); return () => clearInterval(t) }, [n])
  const q = quotes[Math.min(qi, n - 1)]
  return <section className="im" id="impact">
    <i className="im-band" /><Atom className="im-atom" strokeWidth={1.2} />
    <div className="im-inner">
      <div className="im-top">
        <div className="im-copy">
          {c.badgeText && <span className="hx-badge pg-badge"><Icon name={c.badgeIcon} size={20} /> {c.badgeText}</span>}
          <h2><Rich text={c.title} /></h2>
          {c.body && <p className="im-body"><Rich text={c.body} /></p>}
          {c.stats?.length > 0 && <div className="im-stats">{c.stats.map((s, i) => <div key={i}><span><Icon name={s.icon} size={28} /></span><b>{s.value}</b><small><Rich text={s.label} /></small></div>)}</div>}
        </div>
        <div className="im-photo">{c.image && <img src={c.image} alt={c.imageAlt} loading="lazy" />}</div>
      </div>
      {c.items?.length > 0 && <div className="im-cards">{c.items.map((it, i) => <div className="im-card" key={i}><span><Icon name={it.icon} size={36} /></span><div><h3>{it.title}</h3><p>{it.text}</p></div></div>)}</div>}
      {q && <div className="im-quote">
        <span className="im-avatar">{q.photo ? <img src={q.photo} alt="" /> : initials(q.name)}</span>
        <Quote className="im-qmark" size={44} fill="currentColor" strokeWidth={0} />
        <blockquote key={qi}><p>“{q.quote}”</p><cite>— {q.name}</cite></blockquote>
        {n > 1 && <div className="im-nav">
          <div className="im-dots">{quotes.map((_, i) => <button key={i} className={i === qi ? 'on' : ''} onClick={() => setQi(i)} aria-label={`Quote ${i + 1}`} />)}</div>
          <button className="im-arrow" onClick={() => setQi((qi + n - 1) % n)} aria-label="Previous quote"><ArrowRight size={20} style={{ transform: 'scaleX(-1)' }} /></button>
          <button className="im-arrow" onClick={() => setQi((qi + 1) % n)} aria-label="Next quote"><ArrowRight size={20} /></button>
        </div>}
      </div>}
    </div>
  </section>
}

const Services = ({ c }) => <section className="sv" id="services">
  <i className="sv-blob" /><i className="eg-dots" />
  <div className="sv-inner">
    <div className="pg-head">
      {c.badgeText && <div className="pg-badge-row"><span className="hx-badge pg-badge"><Icon name={c.badgeIcon} size={20} /> {c.badgeText}</span></div>}
      <h2 className="sv-title"><Rich text={c.title} /></h2>
      {c.description && <p><Rich text={c.description} /></p>}
    </div>
    <div className="sv-grid">
      {(c.items || []).map((s, i) => <article className="sv-card" key={i}>
        <span className="sv-num">{pad(i + 1)}</span>
        <span className={`sv-icon ${i % 2 ? 'gold' : ''}`}><Icon name={s.icon} size={32} /></span>
        <h3>{s.title}</h3>
        <p>{s.text}</p>
        {s.points?.length > 0 && <ul>{s.points.map((pt, j) => <li key={j}><CheckCircle2 size={17} />{pt}</li>)}</ul>}
        {s.linkLabel && <a href={s.href || '#contact'} className="sv-link" {...external(s.href)}>{s.linkLabel} <ArrowRight size={16} /></a>}
      </article>)}
      {c.ctaTitle && <div className="sv-card sv-cta">
        <span className="sv-icon gold"><Icon name={c.ctaIcon} size={32} /></span>
        <h3>{c.ctaTitle}</h3>
        <p>{c.ctaText}</p>
        {c.ctaButton?.label && <a href={c.ctaButton.href} className="hx-btn hx-btn-gold" {...external(c.ctaButton.href)}>{c.ctaButton.label} <ArrowRight size={17} /></a>}
      </div>}
    </div>
    {c.steps?.length > 0 && <div className="sv-steps">
      {c.stepsTitle && <h3><Rich text={c.stepsTitle} /></h3>}
      <ol>{c.steps.map((st, i) => <li key={i}><span><Icon name={st.icon} size={26} /><i>{i + 1}</i></span><b>{st.title}</b><small>{st.text}</small></li>)}</ol>
    </div>}
  </div>
</section>

// Shared centered heading used by the redesigned sections.
const CenterHead = ({ c, className = '' }) => <div className={`pg-head ${className}`}>
  {c.badgeText && <div className="pg-badge-row"><span className="hx-badge pg-badge"><Icon name={c.badgeIcon} size={20} /> {c.badgeText}</span></div>}
  <h2 className="sv-title"><Rich text={c.title} /></h2>
  {c.description && <p><Rich text={c.description} /></p>}
</div>

const Classes = ({ c }) => {
  const items = c.items || []
  return <section className="cl" id="classes">
    <i className="eg-dots" />
    <div className="cl-inner">
      <CenterHead c={c} />
      <div className="cl-path" style={{ '--n': items.length }}>
        <i className="cl-line" />
        {items.map((g, i) => <article className={`cl-card ${i % 2 ? 'low' : 'high'}`} key={i}>
          <span className="cl-dot">{pad(i + 1)}</span>
          <div className="cl-top"><span>{g.grade}</span><small>{g.level}</small></div>
          <span className={`cl-icon ${i % 2 ? 'gold' : ''}`}>{g.icon ? <Icon name={g.icon} size={34} /> : g.symbol}</span>
          <h3>{g.title}</h3>
          <p>{g.text}</p>
          {g.skills?.length > 0 && <div className="cl-tags">{g.skills.map(s => <span key={s}>{s}</span>)}</div>}
          {g.linkLabel && <a href={g.href || '#contact'} className="sv-link" {...external(g.href)}>{g.linkLabel} <ArrowRight size={16} /></a>}
        </article>)}
      </div>
      {c.noteText && <div className="cl-note">
        <span className="sv-icon gold"><Icon name={c.noteIcon} size={26} /></span>
        <p><Strong text={c.noteText} /></p>
        {c.noteButton?.label && <a href={c.noteButton.href} className="hx-btn ab-btn-navy" {...external(c.noteButton.href)}>{c.noteButton.label} <ArrowRight size={17} /></a>}
      </div>}
    </div>
  </section>
}

const Curriculum = ({ c, items }) => <section className="cu" id="curriculum">
  <div className="cu-inner">
    <aside className="cu-panel">
      {c.badgeText && <span className="hx-badge pg-badge"><Icon name={c.badgeIcon} size={20} /> {c.badgeText}</span>}
      <h2><Rich text={c.title} /></h2>
      {c.body && <p className="cu-body">{c.body}</p>}
      {c.highlights?.length > 0 && <ul className="cu-highlights">{c.highlights.map((h, i) => <li key={i}><span><Icon name={h.icon} size={20} /></span>{h.text}</li>)}</ul>}
      {c.button?.label && <a href={c.button.href} className="hx-btn hx-btn-gold" {...external(c.button.href)}>{c.button.label} <ArrowRight size={18} /></a>}
      {c.footnote && <small className="cu-foot">{c.footnote}</small>}
      <i className="cu-ring" />
    </aside>
    <ol className="cu-timeline">{items.map((row, i) => <li key={row.id || i}>
      <span className="cu-dot">{pad(i + 1)}</span>
      <div className="cu-card">
        <div className="cu-meta"><span className="cu-grade">{row.gradeLabel}</span>{c.stageLabel && <small>{c.stageLabel} {pad(i + 1)}</small>}</div>
        <h3>{row.title}</h3>
        {row.description && <p>{row.description}</p>}
        {row.fileUrl && <a className="cu-download" href={row.fileUrl} target="_blank" rel="noreferrer"><Download size={16} /> {c.downloadLabel || 'Download'}</a>}
      </div>
    </li>)}</ol>
  </div>
</section>

function Showcase({ c, projects }) {
  const [filter, setFilter] = useState(null)
  const categories = c.categories || []
  const filtered = filter ? projects.filter(p => p.category === filter) : projects
  return <section className="sc" id="showcase">
    <i className="sc-glow" />
    <div className="sc-inner">
      <CenterHead c={c} />
      <div className="sc-filters">{[null, ...categories].map(cat => <button className={filter === cat ? 'on' : ''} key={cat || 'all'} onClick={() => setFilter(cat)}>{cat || c.allLabel}</button>)}</div>
      {filtered.length ? <div className="sc-grid">{filtered.map((p, i) => <article className={`sc-card${i === 0 && filtered.length >= 4 ? ' sc-feature' : ''}`} key={p.id || i}>
        {p.imageUrl ? <img src={p.imageUrl} alt={p.title} loading="lazy" /> : <div className="sc-noimg"><Icon name="Bot" size={48} /></div>}
        <span className="sc-cat">{p.category}</span>
        <div className="sc-info">
          <small>{[p.gradeLabel, c.cardLabel].filter(Boolean).join(' · ')}</small>
          <h3>{p.title}</h3>
          {p.description && <p>{p.description}</p>}
        </div>
      </article>)}</div> : <p className="sc-empty">{c.emptyText}</p>}
      {c.bottomText && <div className="pg-banner sc-banner">
        <span className="pg-banner-art"><Icon name={c.bannerIcon} size={40} /></span>
        <div><h3><Rich text={c.bottomText} /></h3>{c.bannerText && <p>{c.bannerText}</p>}</div>
        {c.link?.label && <a href={c.link.href} className="hx-btn hx-btn-gold" {...external(c.link.href)}>{c.link.label} <ArrowRight size={18} /></a>}
      </div>}
    </div>
  </section>
}

// How many testimonial cards fit side by side at the current screen width.
function usePerView() {
  const get = () => (window.innerWidth <= 760 ? 1 : window.innerWidth <= 1100 ? 2 : 3)
  const [per, setPer] = useState(get)
  useEffect(() => { const on = () => setPer(get()); window.addEventListener('resize', on); return () => window.removeEventListener('resize', on) }, [])
  return per
}

function Testimonials({ c, items }) {
  const per = usePerView()
  const n = items.length
  const pages = Math.max(1, n - per + 1)
  const [idx, setIdx] = useState(0)
  const [paused, setPaused] = useState(false)
  const i = Math.min(idx, pages - 1)
  useEffect(() => { if (pages < 2 || paused) return; const t = setInterval(() => setIdx(x => (x + 1) % pages), 6000); return () => clearInterval(t) }, [pages, paused])
  const focus = i + Math.floor(per / 2) // highlighted (navy) card
  return <section className="ts" id="testimonials">
    <Quote className="ts-mark" size={260} fill="currentColor" strokeWidth={0} />
    <div className="ts-inner">
      <CenterHead c={{ ...c, description: c.intro }} />
      {n > 0 && <div className="ts-viewport" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
        <div className="ts-track" style={{ '--per': per, '--i': i }}>
          {items.map((t, k) => <figure className={`ts-card${k === focus && per > 1 ? ' on' : ''}`} key={t.id || k}>
            <Quote className="ts-q" size={40} fill="currentColor" strokeWidth={0} />
            <div className="ts-stars">{Array.from({ length: Math.max(1, Math.min(5, t.rating || 5)) }, (_, s) => <Star key={s} size={18} fill="currentColor" strokeWidth={0} />)}</div>
            <blockquote>{t.quote}</blockquote>
            <figcaption>
              <span className="ts-avatar">{t.avatarUrl ? <img src={t.avatarUrl} alt="" /> : initials(t.name)}</span>
              <span><b>{t.name}</b><small>{t.designation}</small></span>
            </figcaption>
          </figure>)}
        </div>
      </div>}
      {pages > 1 && <div className="ts-nav">
        <button className="ts-arrow" onClick={() => setIdx((i + pages - 1) % pages)} aria-label="Previous"><ChevronLeft size={22} /></button>
        <div className="im-dots">{Array.from({ length: pages }, (_, k) => <button key={k} className={k === i ? 'on' : ''} onClick={() => setIdx(k)} aria-label={`Show testimonial ${k + 1}`} />)}</div>
        <button className="ts-arrow" onClick={() => setIdx((i + 1) % pages)} aria-label="Next"><ChevronRight size={22} /></button>
      </div>}
    </div>
  </section>
}

function Collab({ c, g }) {
  const tel = String(g.phone || '').replace(/[^\d+]/g, '')
  const secondHref = c.secondaryButton?.href || (tel.length > 5 ? `tel:${tel}` : '')
  return <section className="co" id="collaborate">
    <div className="co-panel">
      <i className="co-ring co-ring-a" /><i className="co-ring co-ring-b" /><i className="co-dots" />
      <div className="co-copy">
        {c.badgeText && <span className="hx-badge pg-badge"><Icon name={c.badgeIcon} size={20} /> {c.badgeText}</span>}
        <h2><Rich text={c.title} /></h2>
        {c.body && <p>{c.body}</p>}
        {c.benefits?.length > 0 && <ul className="co-benefits">{c.benefits.map((b, i) => <li key={i}><span><Icon name={b.icon} size={20} /></span>{b.text}</li>)}</ul>}
      </div>
      <div className="co-card">
        <span className="co-card-icon"><Icon name={c.icon} size={34} /></span>
        <h3>{c.cardTitle}</h3>
        {c.cardText && <p>{c.cardText}</p>}
        <div className="co-actions">
          {c.button?.label && <a href={c.button.href} className="hx-btn hx-btn-gold" {...external(c.button.href)}>{c.button.label} <ArrowRight size={18} /></a>}
          {c.secondaryButton?.label && secondHref && <a href={secondHref} className="hx-btn co-btn-outline" {...external(secondHref)}><Phone size={17} /> {c.secondaryButton.label}</a>}
        </div>
        {c.cardNote && <small className="co-note"><CheckCircle2 size={15} /> {c.cardNote}</small>}
      </div>
    </div>
  </section>
}

function Contact({ c, g }) {
  const subjects = c.subjects || []
  const empty = { name: '', email: '', phone: '', organization: '', subject: '', message: '' }
  const [form, setForm] = useState(empty)
  const [state, setState] = useState({ sent: false, sending: false, error: '' })
  async function submit(e) {
    e.preventDefault()
    setState({ sent: false, sending: true, error: '' })
    try {
      await api('/enquiries', { method: 'POST', body: { ...form, subject: form.subject || 'Website enquiry' } })
      setForm(empty); setState({ sent: true, sending: false, error: '' })
    } catch (err) { setState({ sent: false, sending: false, error: err.message }) }
  }
  const set = k => e => setForm({ ...form, [k]: e.target.value })
  const tel = String(g.phone || '').replace(/[^\d+]/g, '')
  const mapOk = /^https:\/\/(www\.)?google\.[a-z.]+\/maps\/embed/.test(c.mapUrl || '')
  const details = [
    [Mail, c.emailLabel, g.email, g.email && `mailto:${g.email}`],
    [Phone, c.phoneLabel, g.phone, tel.length > 5 && `tel:${tel}`],
    [MapPin, c.locationLabel, g.location],
    [Clock, c.hoursLabel, c.hours]
  ].filter(d => d[2])
  return <section className="ct" id="contact">
    <div className="ct-inner">
      <CenterHead c={{ ...c, description: c.body }} />
      <div className="ct-box">
        <aside className="ct-info">
          <h3>{c.infoTitle}</h3>
          {c.infoText && <p>{c.infoText}</p>}
          <ul>{details.map(([I, label, value, href], k) => <li key={k}><span><I size={22} /></span><div><small>{label}</small>{href ? <a href={href}>{value}</a> : <b>{value}</b>}</div></li>)}</ul>
          {mapOk && <iframe className="ct-map" src={c.mapUrl} title="Map" loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen />}
          <div className="ct-social">{c.socialLabel && <small>{c.socialLabel}</small>}<div><Socials g={g} labels /></div></div>
          <i className="ct-ring" />
        </aside>
        <div className="ct-form">
          {state.sent
            ? <div className="ct-success"><span><CheckCircle2 size={44} /></span><h3>{c.successTitle}</h3><p>{c.successText}</p><button className="hx-btn ab-btn-navy" onClick={() => setState({ ...state, sent: false })}>{c.successButton}</button></div>
            : <form onSubmit={submit}>
              <h3>{c.formTitle}</h3>
              {c.formText && <p className="ct-sub">{c.formText}</p>}
              <div className="ct-grid">
                <label>{c.nameLabel} *<input required value={form.name} onChange={set('name')} placeholder={c.namePlaceholder} /></label>
                <label>{c.emailFieldLabel} *<input type="email" required value={form.email} onChange={set('email')} placeholder={c.emailPlaceholder} /></label>
                <label>{c.phoneFieldLabel}<input type="tel" value={form.phone} onChange={set('phone')} placeholder={c.phonePlaceholder} /></label>
                <label>{c.orgLabel}<input value={form.organization} onChange={set('organization')} placeholder={c.orgPlaceholder} /></label>
                {subjects.length > 0 && <label className="wide">{c.subjectLabel}<select value={form.subject} onChange={set('subject')}><option value="">Select an option</option>{subjects.map(s => <option key={s}>{s}</option>)}</select></label>}
                <label className="wide">{c.messageLabel} *<textarea required rows="5" value={form.message} onChange={set('message')} placeholder={c.messagePlaceholder} /></label>
              </div>
              {state.error && <p className="ct-error">{state.error}</p>}
              <button className="hx-btn hx-btn-gold ct-submit" type="submit" disabled={state.sending}>{state.sending ? 'Sending…' : c.submitLabel} <Send size={18} /></button>
              {c.privacyText && <small className="ct-privacy">{c.privacyText}</small>}
            </form>}
        </div>
      </div>
    </div>
  </section>
}

function Footer({ c, g }) {
  const tel = String(g.phone || '').replace(/[^\d+]/g, '')
  return <footer className="ft">
    {c.newsTitle && <div className="ft-cta-wrap"><div className="ft-cta">
      <span className="ft-cta-icon"><Rocket size={30} /></span>
      <div>{c.newsKicker && <small>{c.newsKicker}</small>}<h3><Rich text={c.newsTitle} /></h3></div>
      {c.newsButton?.label && <a href={c.newsButton.href} className="hx-btn ab-btn-navy" {...external(c.newsButton.href)}>{c.newsButton.label} <ArrowRight size={18} /></a>}
    </div></div>}
    <div className="ft-main">
      <div className="ft-brand">
        <a className="hx-logo ft-logo" href="#home">
          {g.logoImage ? <span className="ft-logo-img"><img src={g.logoImage} alt="" /></span> : <span className="hx-logo-mark">{g.logoMark}<span>+</span></span>}
          <span className="hx-logo-text"><b>{g.companyName}</b>{g.tagline && <small>{g.tagline}</small>}</span>
        </a>
        {c.about && <p>{c.about}</p>}
        <div className="ct-social"><div><Socials g={g} labels /></div></div>
      </div>
      {(c.columns || []).map((col, i) => <nav className="ft-col" key={i}><h4>{col.title}</h4>{(col.links || []).map((l, j) => <a key={j} href={l.href} {...external(l.href)}><ChevronRight size={15} />{l.label}</a>)}</nav>)}
      <div className="ft-col ft-contact">
        <h4>{c.contactTitle}</h4>
        {g.email && <a href={`mailto:${g.email}`}><span><Mail size={17} /></span>{g.email}</a>}
        {g.phone && (tel.length > 5 ? <a href={`tel:${tel}`}><span><Phone size={17} /></span>{g.phone}</a> : <p><span><Phone size={17} /></span>{g.phone}</p>)}
        {g.location && <p><span><MapPin size={17} /></span>{g.location}</p>}
        {c.contactLink?.label && <a href={c.contactLink.href} className="ft-more">{c.contactLink.label} <ArrowRight size={15} /></a>}
      </div>
    </div>
    <div className="ft-bottom">
      <span>© {new Date().getFullYear()} {g.companyName}. {c.copyright}</span>
      {c.tagline && <span className="ft-tagline">{c.tagline}</span>}
      <div>{(c.bottomLinks || []).map((l, i) => <a key={i} href={l.href} {...external(l.href)}>{l.label}</a>)}<a href="#home" className="ft-top" aria-label="Back to top"><ArrowRight size={18} style={{ transform: 'rotate(-90deg)' }} /></a></div>
    </div>
  </footer>
}

const BODY = { hero: Hero, trust: Trust, about: About, programs: Programs, edge: Edge, impact: Impact, services: Services, classes: Classes, curriculum: Curriculum, showcase: Showcase, testimonials: Testimonials, collab: Collab, contact: Contact }

export default function PublicSite() {
  const data = useSiteContent()
  useReveal(!!data)
  if (!data) return <div style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', color: '#7e899b' }}>Loading…</div>
  const { sections, general: g, theme } = data
  const find = slug => sections.find(s => s.slug === slug)
  const topbar = find('topbar'), header = find('header'), footer = find('footer')
  return <div style={{ '--navy': theme.navy, '--gold': theme.gold, background: theme.white }}>
    {topbar && <Topbar c={topbar.content} g={g} />}
    {header && <Header c={header.content} g={g} />}
    <main>{sections.filter(s => BODY[s.slug]).map(s => {
      const C = BODY[s.slug]
      const items = s.slug === 'curriculum' ? data.curriculum : s.slug === 'testimonials' ? data.testimonials : []
      return <C key={s.slug} c={s.content} g={g} projects={data.projects} items={items} />
    })}</main>
    {footer && <Footer c={footer.content} g={g} />}
  </div>
}
