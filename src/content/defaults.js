// Default website content. Used until the admin imports it into the database,
// and as a fallback for any field missing from a saved section.
// Headings: use a new line for a line break and *stars* for gold italic text.

const img = (id, w = 1000) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=85`

export const DEFAULT_GENERAL = {
  brandName: 'OPOT',
  brandSub: 'SOLVANCE',
  logoMark: 'O',
  logoImage: '',
  tagline: 'Innovating Minds. Building Future Technologists.',
  companyName: 'OPOT-SOLVANCE',
  email: 'hello@opotsolvance.com',
  phone: 'Contact number to be added',
  location: 'Location details to be added',
  instagram: '#contact',
  linkedin: '#contact',
  youtube: '#contact',
  facebook: '#contact'
}

export const DEFAULT_THEME = { navy: '#10264b', gold: '#d6a33a', white: '#ffffff' }

export const DEFAULT_SECTIONS = [
  { slug: 'topbar', title: 'Top strip', fixed: true, content: {
    text: 'Inspiring young minds through technology',
    rightText: 'Learn · Build · Innovate'
  } },
  { slug: 'header', title: 'Header & navigation', fixed: true, content: {
    navLinks: [
      { label: 'Home', href: '#home' },
      { label: 'About', href: '#about' },
      { label: 'Programs', href: '#programs' },
      { label: 'Services', href: '#services' },
      { label: 'Classes', href: '#classes' },
      { label: 'Showcase', href: '#showcase' },
      { label: 'Testimonials', href: '#testimonials' },
      { label: 'Contact', href: '#contact' }
    ],
    cta: { label: 'Enroll Now', href: '#contact' }
  } },
  { slug: 'hero', title: 'Hero', content: {
    badgeIcon: 'GraduationCap',
    badgeText: 'Robotics • STEM • AI Education',
    title: 'Transforming Schools\nwith *Robotics, STEM &*\nAI Education',
    lead: 'Empowering the next generation with hands-on learning, innovative technology and real-world skills.',
    primaryButton: { label: 'Explore Our Programs', href: '#programs' },
    secondaryButton: { label: 'Watch Video', href: '#about' },
    scrollText: 'Scroll Down',
    image: img('photo-1581092160562-40aa08e78837', 1400),
    imageAlt: 'Students learning robotics together',
    stats: [
      { icon: 'School', value: '50+', label: 'Schools Partnered' },
      { icon: 'Users', value: '5,000+', label: 'Students Trained' },
      { icon: 'Trophy', value: '200+', label: 'Projects Completed' }
    ],
    ctaIcon: 'Rocket',
    ctaText: 'Building a Smarter,\nInnovative Future Together',
    ctaHref: '#contact'
  } },
  { slug: 'trust', title: 'Trust bar', content: {
    label: 'LEARNING BUILT AROUND',
    items: [
      { icon: 'CircuitBoard', text: 'MAKING' },
      { icon: 'Brain', text: 'THINKING' },
      { icon: 'Rocket', text: 'CREATING' },
      { icon: 'Globe2', text: 'DISCOVERING' }
    ]
  } },
  { slug: 'about', title: 'About us', content: {
    badgeIcon: 'GraduationCap',
    badgeText: 'About OPOT-SOLVANCE',
    title: 'Empowering\n*Future* Innovators',
    body: '*At OPOT-SOLVANCE, we partner with schools to transform traditional classrooms into modern innovation labs.* Our hands-on robotics, STEM and AI programs help students build creativity, develop engineering thinking and solve real-world problems.',
    pillars: [
      { icon: 'Bot', title: 'Hands-on\nLearning' },
      { icon: 'Lightbulb', title: 'Innovation\nMindset' },
      { icon: 'Cog', title: 'Problem-Solving\nSkills' },
      { icon: 'Rocket', title: 'Future-Ready\nStudents' }
    ],
    stats: [
      { icon: 'School', value: '50+', label: 'Schools Partnered' },
      { icon: 'Users', value: '5,000+', label: 'Students Trained' },
      { icon: 'Trophy', value: '200+', label: 'Projects Completed' }
    ],
    primaryButton: { label: 'Learn More', href: '#programs' },
    secondaryButton: { label: 'Watch Our Story', href: '' },
    image: img('photo-1581091226825-a6a2a5aee158', 1200),
    imageAlt: 'Students building a robot together',
    videoUrl: '',
    mascotImage: ''
  } },
  { slug: 'programs', title: 'Our programs', content: {
    badgeIcon: 'GraduationCap',
    badgeText: 'OUR PROGRAMS',
    title: 'Comprehensive STEM Education\nfor a *Smarter Tomorrow*',
    description: 'Explore our innovative programs designed to build skills,\nignite curiosity and prepare for the future.',
    items: [
      { image: img('photo-1485827404703-89b55fcc595e', 700), icon: 'Bot', title: 'Robotics Training', text: 'Build, program and innovate with hands-on robotics projects.', buttonLabel: 'Learn More', href: '#contact' },
      { image: img('photo-1518770660439-4636190af475', 700), icon: 'Cpu', title: 'Electronics Basics', text: 'Discover the fundamentals of electronics and circuits.', buttonLabel: 'Learn More', href: '#contact' },
      { image: img('photo-1677442136019-21780ecad995', 700), icon: 'Brain', title: 'STEM Education', text: 'Learn Science, Technology, Engineering and Mathematics.', buttonLabel: 'Learn More', href: '#contact' },
      { image: img('photo-1516321318423-f06f85e504b3', 700), icon: 'Code2', title: 'AI Skills', text: 'Explore Artificial Intelligence and machine learning.', buttonLabel: 'Learn More', href: '#contact' }
    ],
    mascotImage: '',
    bannerImage: '',
    bannerTitle: 'Let’s Build a *Future-Ready* Generation Together!',
    bannerText: 'Join OPOT-SOLVANCE and give your child the skills they need to thrive.',
    bannerButton: { label: 'Explore All Programs', href: '#classes' }
  } },
  { slug: 'edge', title: 'Why choose us', content: {
    badgeIcon: 'Star',
    badgeText: 'OUR EDGE',
    title: 'Why Schools *Choose Us*',
    description: 'We go beyond traditional education to build skills, spark innovation,\nand prepare students for a technology-driven future.',
    image: img('photo-1581092580497-e0d23cbdf1dc', 1100),
    imageAlt: 'Teacher helping a student build a robot',
    items: [
      { icon: 'Bot', color: 'gold', title: 'Hands-on Robotics Learning', text: 'Get hands-on experience with cutting-edge robotics kits.', href: '#programs' },
      { icon: 'Cpu', color: 'navy', title: 'Industry-Relevant Technology', text: 'Learn the latest tools and technologies.', href: '#programs' },
      { icon: 'Lightbulb', color: 'navy', title: 'Innovation-Focused Learning', text: 'Think creatively and solve real-world problems.', href: '#programs' },
      { icon: 'Users', color: 'gold', title: 'Experienced Trainers', text: 'Learn from passionate experts in the field.', href: '#contact' },
      { icon: 'Trophy', color: 'navy', title: 'Future-Ready Students', text: 'Build skills for higher studies and successful careers.', href: '#classes' }
    ],
    stats: [
      { icon: 'School', value: '50+', label: 'Schools Partnered' },
      { icon: 'Users', value: '5,000+', label: 'Students Trained' },
      { icon: 'Trophy', value: '200+', label: 'Projects Completed' }
    ],
    tagline: 'Building a Smarter,\nInnovative Future Together'
  } },
  { slug: 'impact', title: 'Student impact', content: {
    badgeIcon: 'ChartColumnIncreasing',
    badgeText: 'STUDENT IMPACT',
    title: 'Real Learning.\n*Lasting Impact.*',
    body: 'Our programs help students build skills, gain confidence\nand achieve more in academics and beyond.',
    stats: [
      { icon: 'School', value: '50+', label: 'Schools\nPartnered' },
      { icon: 'Users', value: '5,000+', label: 'Students\nTrained' },
      { icon: 'Trophy', value: '200+', label: 'Projects\nCompleted' },
      { icon: 'Star', value: '98%', label: 'Parent\nSatisfaction' }
    ],
    image: img('photo-1503676260728-1c00da094a0b', 1200),
    imageAlt: 'Happy students celebrating their robotics project',
    items: [
      { icon: 'GraduationCap', title: 'Boosted Confidence', text: 'Build self-belief through hands-on projects.' },
      { icon: 'Lightbulb', title: 'Enhanced Skills', text: 'Develop critical thinking and problem-solving skills.' },
      { icon: 'Rocket', title: 'Better Career Ready', text: 'Gain future-ready skills in STEM and AI.' },
      { icon: 'ChartColumnIncreasing', title: 'Academic Excellence', text: 'Excel in academics with practical learning.' }
    ],
    quotes: [
      { photo: '', quote: 'OPOT-SOLVANCE helped me discover my passion for robotics. I now dream of becoming an engineer!', name: 'Aarav Sharma, Grade 7' }
    ]
  } },
  { slug: 'services', title: 'Our services', content: {
    badgeIcon: 'Layers',
    badgeText: 'OUR SERVICES',
    title: 'Complete STEM Solutions\nfor *Every School*',
    description: 'From setting up innovation labs to training teachers, we partner with schools at every step of their technology education journey.',
    items: [
      { icon: 'School', title: 'Robotics Lab Setup', text: 'End-to-end planning and setup of engaging, future-ready innovation labs.', points: ['Lab design & layout', 'Kits & equipment', 'Ongoing support'], linkLabel: 'Explore service', href: '#contact' },
      { icon: 'GraduationCap', title: 'STEM Training', text: 'Structured, practical learning programs for students across grade levels.', points: ['Grade-wise curriculum', 'Hands-on projects', 'Progress tracking'], linkLabel: 'Explore service', href: '#contact' },
      { icon: 'Brain', title: 'Coding & AI Education', text: 'Age-appropriate coding and AI learning paths that grow with each learner.', points: ['Block to Python coding', 'AI fundamentals', 'Real-world apps'], linkLabel: 'Explore service', href: '#contact' },
      { icon: 'Users', title: 'Teacher Training', text: 'Practical enablement for educators to confidently lead technology learning.', points: ['Workshops for teachers', 'Lesson plans', 'Certification'], linkLabel: 'Explore service', href: '#contact' },
      { icon: 'Trophy', title: 'Workshops & Events', text: 'Interactive workshops, project days and innovation challenges for schools.', points: ['Robotics competitions', 'Science fairs', 'Holiday camps'], linkLabel: 'Explore service', href: '#contact' }
    ],
    ctaIcon: 'MessageCircle',
    ctaTitle: 'Need a custom solution?',
    ctaText: 'Tell us about your school and we’ll design a program that fits your students, space and budget.',
    ctaButton: { label: 'Talk to Our Team', href: '#contact' },
    stepsTitle: 'How We *Work*',
    steps: [
      { icon: 'MessageCircle', title: 'Consult', text: 'Understand your school’s goals' },
      { icon: 'Target', title: 'Plan', text: 'Design the right program & lab' },
      { icon: 'Wrench', title: 'Set Up', text: 'Install kits and train teachers' },
      { icon: 'Rocket', title: 'Launch & Grow', text: 'Run classes and track results' }
    ]
  } },
  { slug: 'classes', title: 'Grade-wise classes', content: {
    badgeIcon: 'GraduationCap',
    badgeText: 'GRADE-WISE CLASSES',
    title: 'A Learning Path for\n*Every Age*',
    description: 'Our grade-wise journeys build step by step, matching each learner’s stage with the right level of challenge.',
    items: [
      { grade: 'Grades 1–2', level: 'Discover', icon: 'Puzzle', title: 'Little Explorers', text: 'Playful discovery with simple machines, patterns and creative building.', skills: ['Creative thinking', 'Basic mechanics', 'Team play'], linkLabel: 'Explore level', href: '#contact' },
      { grade: 'Grades 3–4', level: 'Explore', icon: 'Lightbulb', title: 'Young Makers', text: 'First steps into circuits, block coding and guided robotics projects.', skills: ['Block coding', 'Electronics basics', 'Design thinking'], linkLabel: 'Explore level', href: '#contact' },
      { grade: 'Grades 5–6', level: 'Create', icon: 'Bot', title: 'Junior Innovators', text: 'Build interactive models and bring ideas to life with code and sensors.', skills: ['Robotics', 'Sensors & circuits', 'Logical thinking'], linkLabel: 'Explore level', href: '#contact' },
      { grade: 'Grades 7–8', level: 'Invent', icon: 'Cpu', title: 'Future Engineers', text: 'Solve real challenges with automation, programming and connected devices.', skills: ['Python basics', 'IoT concepts', 'Prototyping'], linkLabel: 'Explore level', href: '#contact' },
      { grade: 'Grades 9–10', level: 'Innovate', icon: 'Rocket', title: 'Next-gen Creators', text: 'Explore advanced concepts and develop projects with real-world relevance.', skills: ['AI foundations', 'Advanced robotics', 'Project showcase'], linkLabel: 'Explore level', href: '#contact' }
    ],
    noteIcon: 'Sparkles',
    noteText: 'Not sure which level is right for your child? *Our team will help you choose.*',
    noteButton: { label: 'Get Guidance', href: '#contact' }
  } },
  { slug: 'curriculum', title: 'Curriculum', content: {
    badgeIcon: 'BookOpen',
    badgeText: 'OUR CURRICULUM',
    title: 'A Clear Path.\n*Endless Possibilities.*',
    body: 'A progressive, grade-wise curriculum that builds confidence through practical learning, creativity and age-appropriate challenges.',
    highlights: [
      { icon: 'Layers', text: 'Step-by-step levels for every grade' },
      { icon: 'Wrench', text: 'Project-based, hands-on lessons' },
      { icon: 'Target', text: 'Clear learning outcomes at each stage' }
    ],
    button: { label: 'Request Full Curriculum', href: '#contact' },
    footnote: 'Ask our team for the latest grade-wise curriculum document.',
    stageLabel: 'Stage',
    downloadLabel: 'Download PDF'
  } },
  { slug: 'showcase', title: 'Student showcase', content: {
    badgeIcon: 'Trophy',
    badgeText: 'STUDENT SHOWCASE',
    title: 'Big Ideas.\n*Real Creations.*',
    description: 'A glimpse into the imagination, experimentation and hard work of our young innovators.',
    allLabel: 'All Projects',
    categories: ['Robotics', 'Coding', 'AI', 'Electronics', '3D Printing', 'IoT'],
    cardLabel: 'Student Project',
    emptyText: 'No projects in this category yet — check back soon!',
    bannerIcon: 'Rocket',
    bottomText: 'Creativity has *no limits.*',
    bannerText: 'Have a young innovator at home? Let’s turn their ideas into real projects.',
    link: { label: 'Start Their Journey', href: '#contact' }
  } },
  { slug: 'testimonials', title: 'Testimonials', content: {
    badgeIcon: 'MessageCircle',
    badgeText: 'TESTIMONIALS',
    title: 'What Our *Community* Says',
    intro: 'Great learning experiences are best described by the schools, parents and students who are part of them.'
  } },
  { slug: 'collab', title: 'Collaborate with us', content: {
    badgeIcon: 'Handshake',
    badgeText: 'PARTNER WITH US',
    title: 'Bring the Future\ninto *Your School.*',
    body: 'Let’s create a learning environment where students are encouraged to imagine, experiment and innovate — we handle everything from setup to training.',
    benefits: [
      { icon: 'School', text: 'Complete lab setup' },
      { icon: 'Users', text: 'Trained instructors' },
      { icon: 'BookOpen', text: 'Curriculum & kits' },
      { icon: 'ShieldCheck', text: 'Ongoing support' }
    ],
    icon: 'School',
    cardTitle: 'Ready to explore a partnership?',
    cardText: 'Tell us about your school and what you want to make possible. We’ll suggest the right plan for your students.',
    button: { label: 'Start a Conversation', href: '#contact' },
    secondaryButton: { label: 'Call Us', href: '' },
    cardNote: 'We usually reply within one working day'
  } },
  { slug: 'contact', title: 'Contact', content: {
    badgeIcon: 'Mail',
    badgeText: 'CONTACT US',
    title: 'Let’s Start a *Conversation*',
    body: 'Have a question, want to explore a school partnership or looking for the right program? We’d love to hear from you.',
    infoTitle: 'Get in Touch',
    infoText: 'Reach out to us directly or fill in the form — our team usually replies within one working day.',
    emailLabel: 'Email Us', phoneLabel: 'Call Us', locationLabel: 'Visit Us',
    hoursLabel: 'Working Hours', hours: 'Mon – Sat, 9:00 AM – 6:00 PM',
    socialLabel: 'Follow us',
    mapUrl: '',
    formTitle: 'Send Us a Message',
    formText: 'Fill in the details and our team will get back to you.',
    nameLabel: 'Your Name', namePlaceholder: 'Enter your name',
    emailFieldLabel: 'Email Address', emailPlaceholder: 'you@example.com',
    phoneFieldLabel: 'Phone Number', phonePlaceholder: '+91 98765 43210',
    orgLabel: 'School / Organization', orgPlaceholder: 'Your school or organization',
    subjectLabel: 'I’m interested in',
    subjects: ['School Partnership', 'Robotics Lab Setup', 'Student Enrollment', 'Teacher Training', 'Workshops & Events', 'Other'],
    messageLabel: 'How can we help?', messagePlaceholder: 'Tell us a little about what you’re looking for...',
    submitLabel: 'Send Message',
    privacyText: 'By submitting, you agree to be contacted about your enquiry.',
    successTitle: 'Thanks for reaching out!',
    successText: 'We’ve received your message and our team will get back to you soon.',
    successButton: 'Send another message'
  } },
  { slug: 'footer', title: 'Footer', fixed: true, content: {
    about: 'Empowering the next generation through curiosity, creativity and hands-on robotics, STEM and AI learning.',
    columns: [
      { title: 'Quick Links', links: [
        { label: 'About Us', href: '#about' }, { label: 'Our Programs', href: '#programs' },
        { label: 'Why Choose Us', href: '#edge' }, { label: 'Grade-wise Classes', href: '#classes' },
        { label: 'Student Showcase', href: '#showcase' }
      ] },
      { title: 'Our Services', links: [
        { label: 'Robotics Lab Setup', href: '#services' }, { label: 'STEM Training', href: '#services' },
        { label: 'Coding & AI', href: '#services' }, { label: 'Teacher Training', href: '#services' },
        { label: 'Workshops & Events', href: '#services' }
      ] }
    ],
    contactTitle: 'Contact Us',
    contactLink: { label: 'Talk to our team', href: '#contact' },
    newsKicker: 'The next idea starts here',
    newsTitle: 'Ready to bring *innovation* to your school?',
    newsButton: { label: 'Partner With Us', href: '#contact' },
    copyright: 'All rights reserved.',
    bottomLinks: [
      { label: 'Privacy Policy', href: '#home' },
      { label: 'Terms of Use', href: '#home' }
    ],
    tagline: 'Made for the makers of tomorrow.'
  } }
]

export const DEFAULT_PROJECTS = [
  { title: 'Obstacle Avoiding Robot', category: 'Robotics', gradeLabel: 'Grade 7', imageUrl: img('photo-1485827404703-89b55fcc595e', 900), description: 'A smart robot that senses and navigates around obstacles.' },
  { title: 'Smart Irrigation System', category: 'IoT', gradeLabel: 'Grade 8', imageUrl: img('photo-1581092921461-eab62e97a780', 900), description: 'A sensor-based model that helps monitor soil moisture.' },
  { title: 'Creative Coding Lab', category: 'Coding', gradeLabel: 'Grade 6', imageUrl: img('photo-1516321318423-f06f85e504b3', 900), description: 'Interactive digital experiences created through code.' },
  { title: 'Electronic Music Box', category: 'Electronics', gradeLabel: 'Grade 5', imageUrl: img('photo-1518770660439-4636190af475', 900), description: 'A student-built circuit exploring sound and electronics.' },
  { title: 'AI Vision Explorer', category: 'AI', gradeLabel: 'Grade 9', imageUrl: img('photo-1677442136019-21780ecad995', 900), description: 'An introduction to how computers interpret visual information.' },
  { title: '3D Design Prototype', category: '3D Printing', gradeLabel: 'Grade 8', imageUrl: img('photo-1631556097152-c39479bbff66', 900), description: 'A concept model designed for prototyping and iteration.' }
].map((p, i) => ({ ...p, sortOrder: i, isPublished: true, gallery: [] }))

export const DEFAULT_TESTIMONIALS = [
  { quote: 'The hands-on approach has helped our students become more curious, collaborative and confident in solving problems.', name: 'School Partner', designation: 'Academic Coordinator' },
  { quote: 'The sessions make technology approachable. Students are excited to learn, experiment and present what they create.', name: 'Parent Community', designation: 'Parent Representative' },
  { quote: 'A structured way to introduce innovation into the classroom and connect concepts with practical activities.', name: 'Educator Network', designation: 'STEM Educator' }
].map((t, i) => ({ ...t, rating: 5, status: 'published', sortOrder: i, avatarUrl: null }))

export const DEFAULT_CURRICULUM = [
  { gradeLabel: 'Grades 1–2', title: 'Discovery & Foundations', description: 'Creative play, patterns, simple machines and guided building.' },
  { gradeLabel: 'Grades 3–4', title: 'Coding & Making', description: 'Block coding, basic electronics and interactive projects.' },
  { gradeLabel: 'Grades 5–6', title: 'Robotics Essentials', description: 'Sensors, mechanisms, logic and beginner robotics.' },
  { gradeLabel: 'Grades 7–8', title: 'Connected Innovation', description: 'Programming, automation and Internet of Things concepts.' },
  { gradeLabel: 'Grades 9–10', title: 'Emerging Technologies', description: 'AI foundations, advanced robotics and project development.' }
].map((c, i) => ({ ...c, fileUrl: '', fileName: null, sortOrder: i, isPublished: true }))

export const SECTION_DEFAULTS = Object.fromEntries(DEFAULT_SECTIONS.map(s => [s.slug, s]))
