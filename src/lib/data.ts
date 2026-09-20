export type NavLink = {
  label: string;
  href: string;
  // i18n key into the Header's translated nav object (src/lib/i18n.ts)
  key: "home" | "about" | "courses" | "dars" | "admissions" | "gallery" | "contact";
};

export const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "/", key: "home" },
  { label: "About", href: "/about", key: "about" },
  { label: "Courses", href: "/courses", key: "courses" },
  { label: "Dars-e-Nizami", href: "/courses#dars-e-nizami", key: "dars" },
  { label: "Admissions", href: "/admissions", key: "admissions" },
  { label: "Gallery", href: "/gallery", key: "gallery" },
  { label: "Contact", href: "/contact", key: "contact" },
];

export const BRAND = {
  name: "Madina-Tul-Ilm",
  subtitle: "Islamic College",
  description:
    "A women-focused Islamic educational institution nurturing knowledge, understanding and tarbiyah since 2016.",
};

export const HERO = {
  eyebrow: "Madina-Tul-Ilm Islamic College",
  headline: "Authentic Islamic Education",
  // Second line rendered as an italic em, matching the original
  // '<em>for Women &amp; Girls</em>' markup in madina-tul-ilm-home.html
  headlineEm: "for Women & Girls",
  lede: "Build a strong foundation in Qur'an, Sunnah and the Islamic sciences through structured learning, tarbiyah and character development.",
  primaryCta: { label: "Explore Courses", href: "/courses" },
  secondaryCta: { label: "Enroll Now", href: "/admissions" },
  tag: "Established 2016 · On-Campus + Online · Women-Focused",
};

export const ABOUT_META = [
  { value: "2016", label: "Founded" },
  { value: "5 Yrs", label: "Aalimah Course" },
  { value: "4+", label: "Program Categories" },
  { value: "2", label: "Learning Modes" },
];

export const ABOUT_PARAGRAPHS = [
  "Madina-Tul-Ilm Islamic College is a women-focused educational institution established in 2016 with a vision of making authentic Islamic learning accessible, structured, and relevant to the needs of today's generation.",
  "We provide an intellectually engaging environment where students pursue Islamic knowledge through a systematic approach grounded in the Qur'an, Sunnah, and established scholarly tradition — cultivating thoughtful, principled and spiritually grounded individuals who carry their knowledge into their families, communities and wider society.",
  "Today, the institution continues to expand its educational outreach through both on-campus and online learning, creating opportunities for women to pursue Islamic education at different stages of life.",
];

export type WhyItem = {
  number: string;
  title: string;
  description: string;
};

export const WHY_ITEMS: WhyItem[] = [
  {
    number: "01",
    title: "Women-Focused Learning",
    description:
      "A dedicated, nurturing environment designed specifically for women and girls.",
  },
  {
    number: "02",
    title: "Authentic Islamic Education",
    description:
      "Grounded in Qur'an, Sunnah and established scholarly tradition.",
  },
  {
    number: "03",
    title: "On-Campus + Online",
    description:
      "Flexible learning options to accommodate women at different stages of life.",
  },
  {
    number: "04",
    title: "Structured Islamic Sciences",
    description:
      "A systematic approach to Qur'an, Hadith, Fiqh, Tafseer and Arabic.",
  },
  {
    number: "05",
    title: "Knowledge & Character",
    description:
      "Education that shapes the mind and nurtures the soul through Tarbiyah.",
  },
  {
    number: "06",
    title: "Established Since 2016",
    description:
      "A proven institution with years of educational leadership and growth.",
  },
];

export type ProgramCategory = {
  label: string;
  title: string;
  items: string[];
};

export const PROGRAM_CATEGORIES: ProgramCategory[] = [
  {
    label: "A",
    title: "Quranic Programs",
    items: [
      "Nazra Tul Qur'an",
      "Tajweed",
      "Hifz-ul-Qur'an",
      "Hifz Maintenance",
      "Quran Translation",
      "Quran Understanding",
    ],
  },
  {
    label: "B",
    title: "Islamic Studies",
    items: [
      "Dars-e-Nizami",
      "Tafseer",
      "Hadith",
      "Ahkam e Shariat",
      "Seerah",
      "Islamic History",
    ],
  },
  {
    label: "C",
    title: "Specialized Programs",
    items: ["Takhassus Programs", "Short Courses", "Workshops", "Certificate Courses"],
  },
  {
    label: "D",
    title: "Children's Programs",
    items: ["Nazra", "Hifz", "Tajweed", "Islamic Tarbiyah", "Summer Camps"],
  },
];

export const DARS_NIZAMI = {
  eyebrow: "Flagship Program",
  title: "Dars-e-Nizami Aalimah Program",
  description:
    "A comprehensive Dars-e-Nizami Aalimah Course combining traditional Islamic scholarship with contemporary learning. The program develops a strong foundation in Qur'an, Hadith, Arabic, Fiqh and other Islamic sciences while addressing modern challenges and practical needs.",
  descriptionTwo:
    "Designed for girls and women who wish to pursue structured Islamic education, deepen their understanding of Deen, and develop Arabic and research skills. Open to those who meet the college's admission requirements.",
  stats: [
    { value: "5", label: "YEARS" },
    { value: "2", label: "STUDY MODES" },
    { value: "14+", label: "SUBJECTS" },
  ],
  tags: ["Qur'an", "Tafseer", "Hadith", "Fiqh", "Arabic", "Seerah", "Aqeedah"],
  cta: { label: "Explore Dars-e-Nizami", href: "/courses#dars-e-nizami" },
  panelRows: [
    { term: "Duration", detail: "5 years" },
    { term: "On-Campus", detail: "6 days/week, or once-a-week track" },
    { term: "Online", detail: "6 evenings a week" },
    {
      term: "Subjects",
      detail:
        "Qur'an, Tafseer, Usul-e-Tafseer, Hadith, Usul-e-Hadith, Fiqh, Usul-ul-Fiqh, Arabic, Seerah, Aqeedah, Islamic History, Contemporary Issues, Research",
    },
    { term: "Eligibility", detail: "Girls & women meeting admission requirements" },
  ],
  note: "Class timings and fees vary by track — see the admissions schedule below or contact us on WhatsApp for the current intake.",
};

export type PhilosophyStep = {
  number: string;
  word: string;
};

export const PHILOSOPHY = {
  eyebrow: "Our Approach",
  title: "Knowledge That Shapes Character",
  description:
    "Islamic education at Madina-Tul-Ilm is not only information acquisition — it is a progression that carries knowledge into everyday character.",
  steps: [
    { number: "01", word: "Knowledge" },
    { number: "02", word: "Understanding" },
    { number: "03", word: "Tarbiyah" },
    { number: "04", word: "Character" },
  ],
};

export type TimelineEntry = {
  year: string;
  title: string;
  description: string;
  present?: boolean;
};

export const TIMELINE: TimelineEntry[] = [
  {
    year: "2016",
    title: "Foundation",
    description:
      "Established with a vision of authentic Islamic education for women.",
  },
  {
    year: "2017–20",
    title: "Growth & Expansion",
    description: "Programs expanded and student community grew.",
  },
  {
    year: "2021–24",
    title: "New Programs & Online",
    description:
      "Launched online learning and new specialized programs.",
  },
  {
    year: "2025",
    title: "10 Years of MTI",
    description: "A decade of knowledge, Tarbiyah and impact.",
  },
  {
    year: "Present",
    title: "Continuing the Mission",
    description:
      "Strengthening Islamic scholarship among the next generation.",
    present: true,
  },
];

export const FOUNDER = {
  role: "Founder & Principal",
  name: "Safia Qadri",
  quote:
    "Combining authentic Islamic scholarship with a structured, contemporary approach to learning.",
  bio: [
    "Safia Qadri is the Founder and Principal of Madina-Tul-Ilm Islamic College and a dedicated educator committed to strengthening Islamic scholarship and education among women. With academic qualifications in Islamic studies and years of educational leadership, she established the institution with a vision of combining authentic Islamic scholarship with a structured, contemporary approach to learning.",
    "Under her leadership, Madina-Tul-Ilm has developed as a platform for academic excellence, spiritual growth, character development, and the cultivation of Ishq-e-Mustafa among the younger generation.",
  ],
};

export type GalleryTile = {
  label: string;
  sub?: string;
  placeholder?: boolean;
  note?: string;
};

export const GALLERY_TILES: GalleryTile[] = [
  { label: "Campus Life", sub: "[CONTENT NEEDED: photography]", placeholder: true },
  { label: "Campus — Jamia", sub: "[CONTENT NEEDED: photography]", placeholder: true },
  { label: "Mehfil", sub: "[CONTENT NEEDED: photography]", placeholder: true },
  { label: "Competition", sub: "[CONTENT NEEDED: photography]", placeholder: true },
  { label: "Celebration", sub: "Mela — 14th August", placeholder: true },
  { label: "Institutional Moments", sub: "[CONTENT NEEDED: photography]", placeholder: true },
];

export const GALLERY_NOTE =
  "Real campus and event photography to be added — placeholders shown reflect the categories provided.";

export type ScheduleRow = {
  course: string;
  days: string;
  time: string;
  format: string;
  fee: string;
};

export const SCHEDULE_ROWS: ScheduleRow[] = [
  { course: "Nazra", days: "Mon–Sat", time: "8–1 & 3–4:30", format: "Onsite", fee: "2,000" },
  { course: "Hifz-ul-Qur'an", days: "Mon–Sat", time: "8–2", format: "Onsite", fee: "5,000" },
  { course: "Tafseer", days: "Tuesday", time: "—", format: "Onsite", fee: "3,000" },
  {
    course: "Hadith (Adab-ul-Mufrad)",
    days: "Wednesday",
    time: "—",
    format: "Onsite",
    fee: "2,500 (one-time)",
  },
  { course: "Tafseer", days: "Thursday", time: "—", format: "Onsite", fee: "2,000" },
  { course: "Takhassus fil Qur'an", days: "Wednesday", time: "3–6", format: "Onsite", fee: "2,500" },
  { course: "Dars-e-Nizami", days: "Mon–Sat", time: "—", format: "Onsite", fee: "3,000" },
  { course: "Dars-e-Nizami", days: "Saturday", time: "12–2", format: "Onsite", fee: "3,000" },
  { course: "Dars-e-Nizami", days: "Mon–Fri", time: "5:30–8:30", format: "Online", fee: "3,000" },
  { course: "Arabic Language", days: "Mon, Tue, Thu", time: "3–4", format: "Online", fee: "1,500" },
  { course: "Ahkam-e-Shariat", days: "Saturday", time: "11–1", format: "Onsite", fee: "500" },
  { course: "Seerah", days: "Monday", time: "3:30–4:30", format: "Onsite", fee: "2,000" },
  { course: "Shamail Shareef", days: "Monday", time: "4:30–5:30", format: "Onsite", fee: "1,000" },
  { course: "Tafseer", days: "Saturday", time: "3 pm", format: "Online", fee: "2,000" },
];

export const SCHEDULE_NOTE =
  "A snapshot of current classes. Timings and intake may change — confirm the latest schedule on WhatsApp before enrolling.";

export const SCHEDULE_CAPTION = "Class Schedule & Fees";

export const FINAL_CTA = {
  heading: "Begin Your Journey in",
  // Second line rendered as an italic gold em, matching the original
  // '<em>Islamic Learning</em>' markup in madina-tul-ilm-home.html
  headingEm: "Islamic Learning",
  description:
    "Take the first step towards a stronger foundation in Islamic knowledge and Tarbiyah.",
  primaryCta: { label: "Explore Courses", href: "/courses" },
  secondaryCta: { label: "Enroll Now", href: "/admissions" },
};

export const ABOUT_PAGE = {
  hero: {
    eyebrow: "About Us",
    heading: "A Place for Knowledge,",
    headingEm: "Tarbiyah & Growth",
  },
  who: {
    eyebrow: "Who We Are",
    heading: "Madina-Tul-Ilm",
    headingTwo: "Islamic College",
    photo: { label: "Institutional Photo", subLabel: "Client Asset Needed" },
    paragraphs: [
      "Madina-Tul-Ilm Islamic College is a women-focused educational institution established in 2016 with a vision of making authentic Islamic learning accessible, structured, and relevant to the needs of today's generation.",
      "We provide an intellectually engaging environment where students can pursue Islamic knowledge through a systematic approach grounded in the Qur'an, Sunnah, and established scholarly tradition.",
      "Beyond the classroom, Madina-Tul-Ilm seeks to cultivate thoughtful, principled, and spiritually grounded individuals who can carry their knowledge into their families, communities, and wider society.",
      "Today, the institution continues to expand its educational outreach through both on-campus and online learning, creating opportunities for women to pursue Islamic education at different stages of life.",
    ],
  },
  history: {
    eyebrow: "Our Story",
    title: "Our History",
    entries: [
      {
        year: "2016",
        title: "Foundation",
        description:
          "Madina-Tul-Ilm Islamic College was established with a clear vision: to make authentic Islamic learning accessible, structured, and relevant for women.",
      },
      {
        year: "2017–2020",
        title: "Growth & Expansion",
        description:
          "The institution grew steadily, expanding its programs and welcoming a wider community of students across Karachi and beyond.",
      },
      {
        year: "2021–2024",
        title: "New Programs & Online Education",
        description:
          "New specialized programs were launched alongside an online learning platform, creating flexible pathways for women at different stages of life.",
      },
      {
        year: "2025",
        title: "10 Years of Madina-Tul-Ilm",
        description:
          "A decade of scholarship, Tarbiyah, and service to the community — a milestone in the institution's ongoing journey.",
      },
      {
        year: "Present",
        title: "Continuing the Mission",
        description:
          "Madina-Tul-Ilm continues to strengthen Islamic scholarship among the next generation of women, guided by the same vision since its founding.",
      },
    ],
  },
  visionMission: {
    vision: {
      tag: "Our Vision",
      quote:
        "To nurture knowledgeable, practicing and confident Muslim women who contribute positively to their families, communities and society.",
    },
    mission: {
      tag: "Our Mission",
      quote:
        "To nurture a generation of knowledgeable, practicing, and confident Muslim women by providing authentic Islamic education rooted in the Qur'an and Sunnah, while inspiring Ishq-e-Mustafa ﷺ and positive values for everyday life.",
    },
  },
  leadership: {
    eyebrow: "Leadership",
    title: "The People Behind the Vision",
    name: "Safia Qadri",
    role: "Founder & Principal",
    photo: { label: "Founder Portrait", subLabel: "Client Image Needed" },
    quote:
      "Safia Qadri is the Founder and Principal of Madina-Tul-Ilm Islamic College and a dedicated educator committed to strengthening Islamic scholarship and education among women.",
    paragraphs: [
      "With academic qualifications in Islamic studies and years of educational leadership, she established the institution with a vision of combining authentic Islamic scholarship with a structured, contemporary approach to learning.",
      "Under her leadership, Madina-Tul-Ilm has developed as a platform for academic excellence, spiritual growth, character development, and the cultivation of Ishq-e-Mustafa ﷺ among the younger generation.",
    ],
  },
};

export const CONTACT_INFO = {
  whatsappLabel: "WhatsApp: 0313-3502333",
  whatsappUrl: "https://wa.me/923133502333",
  email: "madinatulilm.edu.pk@gmail.com",
  location: "Bahadurabad, Karachi",
  address:
    "House No. 238, Block-3, Street 13, Bahadur Shah Zafar Road, B-Y-J-C-H-S, Opposite Rashid Seafood, Next to Askari Bank, Bahadurabad, Karachi",
  facebookUrl: "https://m.facebook.com/Madinatulilmislamicacademy",
  instagramUrl: "https://www.instagram.com/madinatulilmislamiccollege",
};