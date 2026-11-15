import { useEffect } from 'react'

// Which elements animate in, and how. Grid items get a staggered delay based on their position.
const REVEALS = [
  // headings, copy blocks and single elements: fade + rise
  ['up', '.pg-head, .hx-copy > *, .ab-copy > *, .im-copy > *, .co-copy > *, .cu-panel, .ct-info, .ct-form, .sc-filters, .cl-note, .sv-steps, .pg-banner, .im-quote, .eg-stats, .ts-viewport, .ts-nav, .ft-cta, .ft-main > *, .hx-stats'],
  // grid / list items: fade + rise, one after another
  ['stagger', '.pg-card, .eg-card, .im-card, .sv-card, .cl-card, .sc-card, .cu-timeline > li, .im-stats > div, .ab-stats > div, .ab-pillars > div, .co-benefits > li, .cu-highlights > li, .sv-steps li, .hx-stat'],
  // photos and side cards: slide in from the right
  ['right', '.hx-visual, .ab-visual, .im-photo, .co-card'],
  // slide in from the left
  ['left', '.eg-photo']
]
const COUNTERS = '.hx-stat b, .ab-stats b, .eg-stat b, .im-stats b'

// Animates "5,000+" → counts 0…5000 keeping the prefix/suffix and number format.
function countUp(el) {
  const original = el.textContent
  const m = original.match(/^(\D*)([\d,]*\.?\d+)(.*)$/)
  if (!m) return
  const [, pre, num, post] = m
  const target = parseFloat(num.replace(/,/g, ''))
  const decimals = (num.split('.')[1] || '').length
  const commas = num.includes(',')
  const fmt = v => {
    const s = v.toFixed(decimals)
    return commas ? Number(s).toLocaleString('en-US', { minimumFractionDigits: decimals }) : s
  }
  const start = performance.now(), dur = 1600
  const tick = now => {
    const p = Math.min(1, (now - start) / dur)
    const eased = 1 - Math.pow(1 - p, 3)
    el.textContent = p < 1 ? pre + fmt(target * eased) + post : original
    if (p < 1) requestAnimationFrame(tick)
  }
  requestAnimationFrame(tick)
}

// Adds scroll-reveal animations to the public site once its content has rendered.
export function useReveal(ready) {
  useEffect(() => {
    if (!ready) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return

    const io = new IntersectionObserver(entries => {
      for (const e of entries) {
        if (!e.isIntersecting) continue
        const el = e.target
        el.classList.add('in')
        if (el.matches(COUNTERS)) countUp(el)
        el.querySelectorAll?.(COUNTERS).forEach(countUp)
        io.unobserve(el)
      }
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' })

    const tagged = new Set()
    for (const [kind, selector] of REVEALS) {
      document.querySelectorAll(selector).forEach(el => {
        if (tagged.has(el)) return
        tagged.add(el)
        el.classList.add('rv', `rv-${kind === 'stagger' ? 'up' : kind}`)
        const siblings = el.parentElement ? [...el.parentElement.children] : []
        el.style.setProperty('--d', kind === 'stagger' || el.parentElement?.matches('.hx-copy, .ab-copy, .im-copy, .co-copy, .ft-main')
          ? Math.min(siblings.indexOf(el), 8) : 0)
        io.observe(el)
      })
    }
    // standalone counters not inside an observed element (e.g. the edge stats bar items)
    document.querySelectorAll(COUNTERS).forEach(el => { if (!el.closest('.rv')) io.observe(el) })

    return () => io.disconnect()
  }, [ready])
}
