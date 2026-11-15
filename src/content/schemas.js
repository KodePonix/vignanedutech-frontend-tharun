// Field definitions for the admin editor. Every editable thing on the public site is listed here.
// types: text | textarea | heading | image | icon | button | tags | list (with `fields`)

const t = (key, label, extra) => ({ key, label, type: 'text', ...extra })
const ta = (key, label, extra) => ({ key, label, type: 'textarea', ...extra })
const h = (key = 'title', label = 'Heading') => ({ key, label, type: 'heading' })
const im = (key = 'image', label = 'Image') => ({ key, label, type: 'image' })
const ic = (key = 'icon', label = 'Icon') => ({ key, label, type: 'icon' })
const btn = (key, label) => ({ key, label, type: 'button' })
const list = (key, label, fields, itemLabel = 'title') => ({ key, label, type: 'list', fields, itemLabel })
const head = [t('eyebrow', 'Small label above heading'), h()]

export const SECTION_SCHEMAS = {
  topbar: [t('text', 'Left text'), t('rightText', 'Right text (after email)')],
  header: [
    list('navLinks', 'Navigation links', [t('label', 'Label'), t('href', 'Link (e.g. #about or https://...)')], 'label'),
    btn('cta', 'Header button (e.g. Enroll Now)')
  ],
  hero: [
    ic('badgeIcon', 'Badge icon'), t('badgeText', 'Badge text'),
    h(), ta('lead', 'Intro paragraph'),
    btn('primaryButton', 'Main button'), btn('secondaryButton', 'Video / secondary link (a YouTube URL opens in a new tab)'),
    t('scrollText', 'Scroll hint text'),
    im('image', 'Hero image (wide photo works best, people on the right)'), t('imageAlt', 'Image description (alt text)'),
    list('stats', 'Stats bar', [ic(), t('value', 'Number (e.g. 50+)'), t('label', 'Label')], 'label'),
    ic('ctaIcon', 'Stats bar call-to-action icon'),
    { key: 'ctaText', label: 'Stats bar call-to-action text', type: 'heading' },
    t('ctaHref', 'Stats bar call-to-action link')
  ],
  trust: [t('label', 'Label'), list('items', 'Items', [ic(), t('text', 'Text')], 'text')],
  about: [
    ic('badgeIcon', 'Badge icon'), t('badgeText', 'Badge text'), h(),
    ta('body', 'Paragraph — wrap a sentence in *stars* to make it bold & dark. Blank line = new paragraph.', { rows: 5 }),
    list('pillars', 'Feature icons row', [ic(), { key: 'title', label: 'Title (Enter = 2nd line)', type: 'textarea', rows: 2 }]),
    list('stats', 'Stat cards', [ic(), t('value', 'Number (e.g. 50+)'), t('label', 'Label')], 'label'),
    btn('primaryButton', 'Main button'),
    btn('secondaryButton', 'Video / story link (leave link empty to open the video below)'),
    im('image', 'Main photo'), t('imageAlt', 'Image description (alt text)'),
    t('videoUrl', 'Video URL (YouTube etc.) — shows a play button on the photo'),
    im('mascotImage', 'Mascot image, e.g. robot (optional, transparent PNG works best)')
  ],
  programs: [
    ic('badgeIcon', 'Badge icon'), t('badgeText', 'Badge text'), h(),
    ta('description', 'Description (Enter = new line)'),
    list('items', 'Program cards', [im('image', 'Card image'), ic('icon', 'Icon on the image'), t('title', 'Title'), ta('text', 'Text'), t('buttonLabel', 'Button text'), t('href', 'Button link')]),
    im('mascotImage', 'Mascot image, top left (optional, transparent PNG works best)'),
    { key: 'bannerTitle', label: 'Bottom banner heading', type: 'heading' },
    t('bannerText', 'Bottom banner text'),
    btn('bannerButton', 'Bottom banner button'),
    im('bannerImage', 'Bottom banner image, e.g. rocket (optional — a rocket icon is shown otherwise)')
  ],
  edge: [
    ic('badgeIcon', 'Badge icon'), t('badgeText', 'Badge text'), h(),
    ta('description', 'Description (Enter = new line)'),
    im('image', 'Photo'), t('imageAlt', 'Image description (alt text)'),
    list('items', 'Feature cards (an odd last card spans the full width)', [
      ic(), { key: 'color', label: 'Icon circle colour', type: 'select', options: ['gold', 'navy'] },
      t('title', 'Title'), ta('text', 'Text'), t('href', 'Arrow link (empty = no arrow)')
    ]),
    list('stats', 'Stats bar', [ic(), t('value', 'Number (e.g. 50+)'), t('label', 'Label')], 'label'),
    { key: 'tagline', label: 'Gold handwritten tagline (right of stats bar)', type: 'heading' }
  ],
  impact: [
    ic('badgeIcon', 'Badge icon'), t('badgeText', 'Badge text'), h(),
    ta('body', 'Paragraph (Enter = new line)'),
    list('stats', 'Stats row', [ic(), t('value', 'Number (e.g. 98%)'), { key: 'label', label: 'Label (Enter = 2nd line)', type: 'textarea', rows: 2 }], 'value'),
    im('image', 'Photo'), t('imageAlt', 'Image description (alt text)'),
    list('items', 'Impact cards', [ic(), t('title', 'Title'), ta('text', 'Text')]),
    list('quotes', 'Student quotes (slider)', [im('photo', 'Student photo (optional — initials shown otherwise)'), ta('quote', 'Quote'), t('name', 'Name, grade')], 'name')
  ],
  services: [
    ic('badgeIcon', 'Badge icon'), t('badgeText', 'Badge text'), h(),
    ta('description', 'Description (Enter = new line)'),
    list('items', 'Service cards', [
      ic(), t('title', 'Title'), ta('text', 'Text'),
      { key: 'points', label: 'Bullet points (comma separated)', type: 'tags' },
      t('linkLabel', 'Link label (empty = no link)'), t('href', 'Link')
    ]),
    ic('ctaIcon', 'Call-to-action card icon'), t('ctaTitle', 'Call-to-action card title (empty = hide card)'),
    ta('ctaText', 'Call-to-action card text'), btn('ctaButton', 'Call-to-action card button'),
    { key: 'stepsTitle', label: '“How we work” heading', type: 'heading' },
    list('steps', '“How we work” steps (empty = hide strip)', [ic(), t('title', 'Title'), t('text', 'Text')])
  ],
  classes: [
    ic('badgeIcon', 'Badge icon'), t('badgeText', 'Badge text'), h(),
    ta('description', 'Description (Enter = new line)'),
    list('items', 'Grade cards (shown along the journey path)', [
      t('grade', 'Grade range (e.g. Grades 1–2)'), t('level', 'Level (e.g. Discover)'), ic(), t('title', 'Title'), ta('text', 'Text'),
      { key: 'skills', label: 'Skill tags (comma separated)', type: 'tags' },
      t('linkLabel', 'Link label (empty = no link)'), t('href', 'Link')
    ]),
    ic('noteIcon', 'Help bar icon'),
    ta('noteText', 'Help bar text — *stars* make text bold (empty = hide bar)'),
    btn('noteButton', 'Help bar button')
  ],
  curriculum: [
    ic('badgeIcon', 'Badge icon'), t('badgeText', 'Badge text'), h(), ta('body', 'Paragraph'),
    list('highlights', 'Highlights (left panel)', [ic(), t('text', 'Text')], 'text'),
    btn('button', 'Button'), t('footnote', 'Footnote'),
    t('stageLabel', 'Stage label on timeline (e.g. Stage)'), t('downloadLabel', 'Download button text (shown when a row has a file)')
  ],
  showcase: [
    ic('badgeIcon', 'Badge icon'), t('badgeText', 'Badge text'), h(),
    ta('description', 'Description (Enter = new line)'),
    t('allLabel', '"All" filter label'),
    { key: 'categories', label: 'Filter categories (comma separated — must match project categories)', type: 'tags' },
    t('cardLabel', 'Card label (after grade)'), t('emptyText', 'Message when a filter has no projects'),
    ic('bannerIcon', 'Bottom banner icon'),
    { key: 'bottomText', label: 'Bottom banner heading (empty = hide banner)', type: 'heading' },
    t('bannerText', 'Bottom banner text'), btn('link', 'Bottom banner button')
  ],
  testimonials: [ic('badgeIcon', 'Badge icon'), t('badgeText', 'Badge text'), h(), ta('intro', 'Intro text (Enter = new line)')],
  collab: [
    ic('badgeIcon', 'Badge icon'), t('badgeText', 'Badge text'), h(), ta('body', 'Paragraph'),
    list('benefits', 'Benefit chips', [ic(), t('text', 'Text')], 'text'),
    ic('icon', 'Card icon'), t('cardTitle', 'Card title'), ta('cardText', 'Card text'),
    btn('button', 'Main button'),
    btn('secondaryButton', 'Second button (leave link empty to call the phone number from Settings)'),
    t('cardNote', 'Small note under the buttons')
  ],
  contact: [
    ic('badgeIcon', 'Badge icon'), t('badgeText', 'Badge text'), h(), ta('body', 'Paragraph'),
    t('infoTitle', 'Info panel title'), ta('infoText', 'Info panel text'),
    t('emailLabel', 'Email label'), t('phoneLabel', 'Phone label'), t('locationLabel', 'Location label'),
    t('hoursLabel', 'Hours label'), t('hours', 'Working hours (empty = hide)'), t('socialLabel', 'Social links label'),
    t('mapUrl', 'Google Maps embed URL (optional — Maps › Share › Embed a map › copy the src link)'),
    t('formTitle', 'Form title'), t('formText', 'Form text'),
    t('nameLabel', 'Name field label'), t('namePlaceholder', 'Name placeholder'),
    t('emailFieldLabel', 'Email field label'), t('emailPlaceholder', 'Email placeholder'),
    t('phoneFieldLabel', 'Phone field label'), t('phonePlaceholder', 'Phone placeholder'),
    t('orgLabel', 'Organization field label'), t('orgPlaceholder', 'Organization placeholder'),
    t('subjectLabel', 'Topic dropdown label'),
    { key: 'subjects', label: 'Topic options (comma separated, empty = hide dropdown)', type: 'tags' },
    t('messageLabel', 'Message field label'), t('messagePlaceholder', 'Message placeholder'),
    t('submitLabel', 'Submit button'), t('privacyText', 'Privacy note'),
    t('successTitle', 'Success title'), ta('successText', 'Success text'), t('successButton', 'Success button')
  ],
  footer: [
    ta('about', 'About text'),
    list('columns', 'Link columns', [t('title', 'Column title'), list('links', 'Links', [t('label', 'Label'), t('href', 'Link')], 'label')]),
    t('contactTitle', 'Contact column title'), btn('contactLink', 'Contact column link'),
    t('newsKicker', 'Gold banner small text'),
    { key: 'newsTitle', label: 'Gold banner heading (*stars* = navy highlight, empty = hide banner)', type: 'heading' },
    btn('newsButton', 'Gold banner button'),
    t('copyright', 'Copyright text (after © year company)'),
    list('bottomLinks', 'Bottom links', [t('label', 'Label'), t('href', 'Link')], 'label'),
    t('tagline', 'Tagline')
  ]
}

export const GENERAL_SCHEMA = [
  t('brandName', 'Logo text'), t('brandSub', 'Logo small text'), t('logoMark', 'Logo mark letter'),
  im('logoImage', 'Logo image (optional — replaces the text logo)'),
  t('companyName', 'Company name (header logo & copyright)'), t('tagline', 'Tagline under the header logo'),
  t('email', 'Email'), t('phone', 'Phone'), t('location', 'Location'),
  t('instagram', 'Instagram URL'), t('linkedin', 'LinkedIn URL'), t('youtube', 'YouTube URL'), t('facebook', 'Facebook URL')
]
