import { useEffect, useState } from 'react'
import { api } from '../api'
import {
  DEFAULT_CURRICULUM, DEFAULT_GENERAL, DEFAULT_PROJECTS, DEFAULT_SECTIONS, DEFAULT_TESTIMONIALS,
  DEFAULT_THEME, SECTION_DEFAULTS
} from './defaults'

const defaults = () => ({
  sections: DEFAULT_SECTIONS.map(s => ({ slug: s.slug, content: s.content })),
  general: DEFAULT_GENERAL,
  theme: DEFAULT_THEME,
  projects: DEFAULT_PROJECTS,
  testimonials: DEFAULT_TESTIMONIALS,
  curriculum: DEFAULT_CURRICULUM
})

// Loads all public content from the API. Until the admin has imported content
// (site setting meta.initialized), or if the API is unreachable, the built-in defaults are shown.
export function useSiteContent() {
  const [data, setData] = useState(null)
  useEffect(() => {
    let cancelled = false
    Promise.all([api('/site'), api('/sections'), api('/projects'), api('/testimonials'), api('/curriculum')])
      .then(([site, sections, projects, testimonials, curriculum]) => {
        if (cancelled) return
        if (!site.meta?.initialized) return setData(defaults())
        setData({
          sections: sections
            .filter(s => SECTION_DEFAULTS[s.slug])
            .map(s => ({ slug: s.slug, content: { ...SECTION_DEFAULTS[s.slug].content, ...s.content } })),
          general: { ...DEFAULT_GENERAL, ...site.general },
          theme: { ...DEFAULT_THEME, ...site.theme },
          projects, testimonials, curriculum
        })
      })
      .catch(err => { console.warn('Content API unavailable, showing default content.', err); if (!cancelled) setData(defaults()) })
    return () => { cancelled = true }
  }, [])
  return data
}
