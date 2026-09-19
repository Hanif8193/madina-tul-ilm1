export type Lang = "en" | "ur";

export const DIRECTIONS: Record<Lang, "ltr" | "rtl"> = {
  en: "ltr",
  ur: "rtl",
};

export const LANG_LABELS: Record<Lang, string> = {
  en: "EN",
  ur: "اردو",
};

// English content — mirrors src/lib/data.ts values.
const en = {
  brand: { name: "Madina-Tul-Ilm", subtitle: "Islamic College" },
  nav: {
    home: "Home",
    about: "About",
    courses: "Courses",
    dars: "Dars-e-Nizami",
    admissions: "Admissions",
    gallery: "Gallery",
    contact: "Contact",
  },
  actions: {
    enrollNow: "Enroll Now",
    exploreCourses: "Explore Courses",
    language: "Language",
  },
  // Footer program titles, keyed by the English title in data.ts.
  // (en here is the data.ts key, ur is the display translation.)
  courses: {
    categories: [
      { en: "Qur'an Programs", ur: "قرآنی پروگرامز" },
      { en: "Islamic Studies", ur: "اسلامی علوم" },
      { en: "Specialized Programs", ur: "خصوصی پروگرامز" },
      { en: "Children's Programs", ur: "بچوں کے پروگرامز" },
    ],
  },
  hero: {
    eyebrow: "Madina-Tul-Ilm Islamic College",
    headline: "Authentic Islamic Education",
    headlineEm: "for Women & Girls",
    lede: "Build a strong foundation in Qur'an, Sunnah and the Islamic sciences through structured learning, tarbiyah and character development.",
    tag: "Established 2016 · On-Campus + Online · Women-Focused",
  },
  who: {
    eyebrow: "Who We Are",
    title: "Learn Deen With Knowledge,",
    titleEm: "Understanding & Tarbiyah",
    paragraphs: [
      "Madina-Tul-Ilm Islamic College is a women-focused educational institution established in 2016 with a vision of making authentic Islamic learning accessible, structured, and relevant to the needs of today's generation.",
      "We provide an intellectually engaging environment where students pursue Islamic knowledge through a systematic approach grounded in the Qur'an, Sunnah, and established scholarly tradition — cultivating thoughtful, principled and spiritually grounded individuals who carry their knowledge into their families, communities and wider society.",
    ],
    link: "Learn More About Us",
    stats: [
      { value: "2016", label: "Founded" },
      { value: "5 Yrs", label: "Aalimah Course" },
      { value: "4+", label: "Program Categories" },
      { value: "2", label: "Learning Modes" },
    ],
  },
  why: {
    eyebrow: "Our Approach",
    title: "A Structured Path",
    titleLine2: "to Islamic Learning",
    cards: [
      { title: "Women-Focused Learning", description: "A dedicated, nurturing environment designed specifically for women and girls." },
      { title: "Authentic Islamic Education", description: "Grounded in Qur'an, Sunnah and established scholarly tradition." },
      { title: "On-Campus + Online", description: "Flexible learning options to accommodate women at different stages of life." },
      { title: "Structured Islamic Sciences", description: "A systematic approach to Qur'an, Hadith, Fiqh, Tafseer and Arabic." },
      { title: "Knowledge & Character", description: "Education that shapes the mind and nurtures the soul through Tarbiyah." },
      { title: "Established Since 2016", description: "A proven institution with years of educational leadership and growth." },
    ],
  },
  dars: {
    eyebrow: "Featured Program",
    title: "Dars-e-Nizami",
    subtitle: "Aalimah Course",
    description: "A comprehensive Dars-e-Nizami Aalimah Course combining traditional Islamic scholarship with contemporary learning. The program develops a strong foundation in Qur'an, Hadith, Arabic, Fiqh and other Islamic sciences while addressing modern challenges and practical needs.",
    tags: ["5 Years", "Qur'an", "Hadith", "Arabic", "Fiqh"],
    cta: "Explore Dars-e-Nizami",
    photoLabel: "Campus Photograph",
    photoSub: "Client Asset Needed",
  },
  philosophy: {
    eyebrow: "Our Philosophy",
    title: "Knowledge That Shapes Character",
    description: "Islamic education at Madina-Tul-Ilm is not only information acquisition — it is a progression that carries knowledge into everyday character.",
    steps: ["Knowledge", "Understanding", "Tarbiyah", "Character"],
  },
  story: {
    eyebrow: "Our Story",
    title: "A Journey Since 2016",
    milestones: [
      { title: "Foundation", description: "Established with a vision of authentic Islamic education for women." },
      { title: "Growth & Expansion", description: "Programs expanded and student community grew." },
      { title: "New Programs & Online", description: "Launched online learning and new specialized programs." },
      { title: "10 Years of MTI", description: "A decade of knowledge, Tarbiyah and impact." },
      { title: "Continuing the Mission", description: "Strengthening Islamic scholarship among the next generation." },
    ],
  },
  founder: {
    role: "Founder & Principal",
    name: "Safia Qadri",
    quote: "Combining authentic Islamic scholarship with a structured, contemporary approach to learning.",
    photoLabel: "Founder Portrait",
    bio: [
      "Safia Qadri is the Founder and Principal of Madina-Tul-Ilm Islamic College and a dedicated educator committed to strengthening Islamic scholarship and education among women. With academic qualifications in Islamic studies and years of educational leadership, she established the institution with a vision of combining authentic Islamic scholarship with a structured, contemporary approach to learning.",
      "Under her leadership, Madina-Tul-Ilm has developed as a platform for academic excellence, spiritual growth, character development, and the cultivation of Ishq-e-Mustafa among the younger generation.",
    ],
  },
  gallery: {
    eyebrow: "Gallery",
    title: "Moments That Inspire",
    subtitle: "A glimpse into campus life, events and activities.",
    featureLabel: "Campus Life",
    photoNeeded: "Client Photo Needed",
    tiles: ["Mehfil", "Competition", "Celebration", "Campus — Jamia"],
  },
  schedule: {
    eyebrow: "Admissions",
    title: "Class Schedule & Fees",
    note: "A snapshot of current classes. Timings and intake may change — confirm the latest schedule on WhatsApp before enrolling.",
    footerHint: "Have questions about eligibility or timings?",
    footerLink: "Contact our admissions team",
    footerTail: "or enroll directly via WhatsApp.",
    columns: ["Course", "Days", "Time", "Format", "Fee (PKR)"],
    rows: [
      { course: "Nazra", days: "Mon–Sat", time: "8–1 & 3–4:30", format: "Onsite", fee: "2,000" },
      { course: "Hifz-ul-Qur'an", days: "Mon–Sat", time: "8–2", format: "Onsite", fee: "5,000" },
      { course: "Tafseer", days: "Tuesday", time: "—", format: "Onsite", fee: "3,000" },
      { course: "Hadith (Adab-ul-Mufrad)", days: "Wednesday", time: "—", format: "Onsite", fee: "2,500 (one-time)" },
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
    ],
  },
  finalCta: {
    heading: "Begin Your Journey in",
    headingEm: "Islamic Learning",
    description: "Take the first step towards a stronger foundation in Islamic knowledge and Tarbiyah.",
  },
  footer: {
    about: "A women-focused Islamic educational institution nurturing knowledge, understanding and tarbiyah since 2016.",
    navigate: "Navigate",
    programs: "Programs",
    contact: "Contact",
    copyright: "All rights reserved.",
  },

  // ------------------------------------------------------------------
  // Inner pages (about / courses / admissions / gallery / contact)
  // ------------------------------------------------------------------
  pages: {
    gallery: {
      eyebrow: "Gallery",
      title: "Life at Madina-Tul-Ilm",
      description:
        "A glimpse of campus life, mehfils, competitions, celebrations and institutional moments.",
      note: "Real campus and event photography to be added — placeholders shown reflect the categories provided.",
      tiles: [
        { label: "Campus Life", sub: "[CONTENT NEEDED: photography]" },
        { label: "Campus — Jamia", sub: "[CONTENT NEEDED: photography]" },
        { label: "Mehfil", sub: "[CONTENT NEEDED: photography]" },
        { label: "Competition", sub: "[CONTENT NEEDED: photography]" },
        { label: "Celebration", sub: "Mela — 14th August" },
        { label: "Institutional Moments", sub: "[CONTENT NEEDED: photography]" },
      ],
    },
    contact: {
      // Content reproduced exactly from the original contact.html source.
      hero: {
        eyebrow: "Contact Us",
        heading: "Start a Conversation",
        headingEm: "With Madina-Tul-Ilm",
      },
      channelsEyebrow: "Get in Touch",
      channelsTitle: "How to Reach Us",
      cards: [
        { label: "WhatsApp", value: "0313-3502333" },
        { label: "Facebook", value: "@Madinatulilmislamicacademy" },
        { label: "Instagram", value: "@madinatulilmislamiccollege" },
        { label: "Email", value: "madinatulilm.edu.pk@gmail.com" },
      ],
      banner: {
        heading: "Ready to enroll or have a question?",
        sub: "Reach out via WhatsApp — our team will respond promptly.",
        cta: "Message on WhatsApp",
      },
      find: {
        eyebrow: "Find Us",
        title: "Visit Madina-Tul-Ilm",
        addressLabel: "Address",
        addressLines: [
          "House No. 238, Block-3, Street 13",
          "Bahadur Shah Zafar Road",
          "B-Y-J-C-H-S",
          "Opposite Rashid Seafood,",
          "Next to Askari Bank",
          "Bahadurabad, Karachi",
        ],
        landmarksLabel: "Landmarks",
        landmarks: "Opposite Rashid Seafood · Next to Askari Bank · Bahadurabad",
        mapsLink: "Open in Maps",
      },
    },
    about: {
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
    },
    courses: {
      hero: {
        eyebrow: "Programs & Courses",
        heading: "Explore Our",
        headingEm: "Programs",
        description:
          "From foundational Qur'anic recitation to comprehensive Aalimah studies — structured programs for women at every stage of their Islamic learning journey.",
      },
      tabsLabel: "Course categories",
      categories: [
        {
          id: "quran",
          n: "01",
          title: "Qur'an Programs",
          desc: "Structured Qur'anic education from foundational recitation to comprehensive study.",
          courses: [
            { name: "Nazra Tul Qur'an", desc: "Foundation in correct recitation." },
            { name: "Tajweed", desc: "The science of Qur'anic pronunciation and recitation rules." },
            { name: "Hifz-ul-Qur'an", desc: "Memorisation of the complete Qur'an." },
            { name: "Hifz Maintenance", desc: "Ongoing revision and strengthening of Hifz." },
            { name: "Quran Translation", desc: "Understanding the meaning of the Qur'an." },
            {
              name: "Quran Understanding",
              desc: "Deeper engagement with Qur'anic themes and context.",
            },
          ],
        },
        {
          id: "islamic",
          n: "02",
          title: "Islamic Studies",
          desc: "Comprehensive Islamic education covering all major disciplines of scholarship.",
          courses: [
            {
              name: "Dars-e-Nizami",
              desc: "The flagship Aalimah course — 5 years of structured Islamic scholarship.",
            },
            { name: "Tafseer", desc: "Exegesis and interpretation of the Qur'an." },
            { name: "Hadith", desc: "Study of the Prophetic traditions and their sciences." },
            { name: "Ahkam e Shariat", desc: "Islamic jurisprudence and practical rulings." },
            { name: "Seerah", desc: "Life, character and biography of the Prophet ﷺ." },
            { name: "Islamic History", desc: "From the Companions to the present day." },
          ],
        },
        {
          id: "specialized",
          n: "03",
          title: "Specialized Programs",
          desc: "Advanced and focused programs for deeper learning and professional development.",
          courses: [
            {
              name: "Takhassus Programs",
              desc: "Post-Aalimah specialisation in specific Islamic sciences.",
            },
            { name: "Short Courses", desc: "Focused programs on specific topics and disciplines." },
            { name: "Workshops", desc: "Practical and skills-based learning sessions." },
            { name: "Certificate Courses", desc: "Accredited programs in Islamic subjects." },
          ],
        },
        {
          id: "children",
          n: "04",
          title: "Children's Programs",
          desc: "Nurturing Islamic education designed for girls and younger students.",
          courses: [
            { name: "Nazra", desc: "Qur'anic recitation for children." },
            { name: "Hifz", desc: "Qur'an memorisation for young students." },
            { name: "Tajweed", desc: "Recitation rules taught in an age-appropriate way." },
            { name: "Islamic Tarbiyah", desc: "Character, manners and Islamic values." },
            { name: "Summer Camps", desc: "Engaging educational programs during school holidays." },
          ],
        },
      ],
      enroll: "Enroll Now",
      featured: {
        eyebrow: "Featured Program",
        title: "Dars-e-Nizami",
        subtitle: "Aalimah Course",
        description:
          "A comprehensive Dars-e-Nizami Aalimah Course combining traditional Islamic scholarship with contemporary learning. The program develops a strong foundation in Qur'an, Hadith, Arabic, Fiqh and other Islamic sciences while addressing modern challenges and practical needs.",
        stats: [
          { label: "Duration", value: "5 Years" },
          { label: "Class Timing", value: "12:00 – 2:00" },
          { label: "Monthly Fee", value: "2000 (billing period to be confirmed)" },
          {
            label: "Eligibility",
            value: "Open to girls and women meeting admission requirements",
          },
        ],
        formatLabel: "Course Format",
        format:
          "On-campus and online options available.",
        formatNote: "Exact schedule details: information to be confirmed.",
        cta: "Apply / Enroll Now",
        learnLabel: "What You Will Learn",
        subjects: [
          "Qur'an",
          "Tafseer",
          "Usul e Tafseer",
          "Hadith",
          "Usul e Hadith",
          "Fiqh",
          "Usul-ul-Fiqh",
          "Arabic",
          "Seerah",
          "Aqeedah",
          "Islamic History",
          "Islamic Studies",
          "Contemporary Issues",
          "Research",
        ],
      },
    },
    admissions: {
      hero: {
        eyebrow: "Admissions",
        heading: "Find a Program That Fits",
        headingEm: "Your Learning Journey",
        description:
          "Choose from a range of on-campus and online programs. Enroll through WhatsApp or directly via the links below.",
      },
      enrollSteps: [
        {
          n: "01",
          title: "Browse Programs",
          description:
            "Review the course schedule below and identify the program that suits your schedule and goals.",
        },
        {
          n: "02",
          title: "Contact Us",
          description:
            "Reach out via WhatsApp at 0313-3502333 to confirm availability and details for your chosen program.",
        },
        {
          n: "03",
          title: "Enroll",
          description:
            "Complete enrollment and begin your journey in Islamic education at Madina-Tul-Ilm.",
        },
      ],
      scheduleEyebrow: "Course Schedule",
      scheduleTitle: "Available Programs",
      note: 'Some fields in the source document are incomplete. Where details are not yet confirmed, "Information to be confirmed" is displayed. Please contact us via WhatsApp for the latest information.',
      ctaHeading: "Have questions about enrollment?",
      ctaText:
        "Our team is available via WhatsApp to answer your questions and guide you through the process.",
      ctaButton: "WhatsApp Us",
      table: {
        columns: ["Course", "Days", "Time", "Mode", "Requirements", "Fee (PKR)", "Enroll"],
        toBeConfirmed: "To be confirmed",
        mobile: {
          days: "Days",
          time: "Time",
          mode: "Mode",
          fee: "Fee (PKR)",
          requirements: "Requirements",
          enroll: "Enroll Now via WhatsApp",
        },
        rows: [
          { course: "Nazra", days: "Mon – Sat", time: "8:00 – 1:00", mode: "Onsite", fee: "2,000", tbc: false },
          { course: "Hifz-ul-Qur'an", days: "Mon – Sat", time: "3:00 – 4:30 / 8:00 – 2:00", mode: "Onsite", fee: "5,000", tbc: false },
          { course: "Tafseer", days: "Tuesday", time: "To be confirmed", mode: "Onsite", fee: "3,000", tbc: true },
          { course: "Hadith (Adab ul Mufrad)", days: "Wednesday", time: "To be confirmed", mode: "Onsite", fee: "2,500 (one time)", tbc: true },
          { course: "Tafseer", days: "Thursday", time: "To be confirmed", mode: "Onsite", fee: "2,000", tbc: true },
          { course: "Thakhassus fil Quran", days: "Wednesday", time: "To be confirmed", mode: "—", fee: "2,500", tbc: true },
          { course: "Dars-e-Nizami", days: "Mon – Sat", time: "To be confirmed", mode: "Onsite", fee: "3,000", tbc: true },
          { course: "Dars-e-Nizami", days: "Saturday", time: "12:00 – 2:00", mode: "Onsite", fee: "3,000", tbc: false },
          { course: "Dars-e-Nizami", days: "Mon – Fri", time: "5:30 – 8:30", mode: "Online", fee: "3,000", tbc: false },
          { course: "Arabic Language", days: "Mon / Tue / Thu", time: "3:00 – 4:00", mode: "Online", fee: "1,500", tbc: false },
          { course: "Ahkam e Shariat", days: "Saturday", time: "11:00 – 1:00", mode: "Onsite", fee: "500", tbc: false },
          { course: "Seerah", days: "Monday", time: "3:30 – 4:30", mode: "Onsite", fee: "2,000", tbc: false },
          { course: "Shamail Shareef", days: "Monday", time: "4:30 – 5:30", mode: "Onsite", fee: "1,000", tbc: false },
          { course: "Tafseer", days: "Saturday", time: "3:00 – 6:00", mode: "Online", fee: "2,000", tbc: false },
        ],
      },
    },
  },
};

export type Dict = typeof en;

// Urdu translations — key-for-key mirror of the English dict.
const ur: Dict = {
  brand: { name: "مدينۃ العلم", subtitle: "اسلامی کالج" },
  nav: {
    home: "سرِ ورق",
    about: "ہمارے بارے میں",
    courses: "کورسز",
    dars: "درسِ نظامی",
    admissions: "داخلے",
    gallery: "گیلری",
    contact: "رابطہ",
  },
  actions: {
    enrollNow: "ابھی داخلہ لیں",
    exploreCourses: "کورسز دیکھیں",
    language: "زبان",
  },
  courses: {
    categories: [
      { en: "Qur'an Programs", ur: "قرآنی پروگرامز" },
      { en: "Islamic Studies", ur: "اسلامی علوم" },
      { en: "Specialized Programs", ur: "خصوصی پروگرامز" },
      { en: "Children's Programs", ur: "بچوں کے پروگرامز" },
    ],
  },
  hero: {
    eyebrow: "مدينۃ العلم اسلامی کالج",
    headline: "خواتین و طالبات کے لیے",
    headlineEm: "تعلیمِ قرآن و سنت",
    lede: "قرآن، سنت اور علومِ اسلامیہ میں مضبوط بنیاد رکھنے کے لیے منظم تعلیم، تربیت اور کردار سازی۔",
    tag: "تأسیس 2016ء · کیمپس + آن لائن · خواتین کے لیے مخصوص",
  },
  who: {
    eyebrow: "ہم کون ہیں",
    title: "علم کے ساتھ دین کی سیکھ،",
    titleEm: "فہم اور تربیت",
    paragraphs: [
      "مدينۃ العلم اسلامی کالج خواتین کے لیے مرکوز ایک تعلیمی ادارہ ہے جس کی بنیاد 2016ء میں اس مقصد سے رکھی گئی کہ مستند اسلامی تعلیم کو آسان، منظم اور آج کی نسل کی ضروریات کے مطابق بنایا جائے۔",
      "ہم ایک ایسا فکری ماحول فراہم کرتے ہیں جہاں طالبات قرآن، سنت اور مستند علمی روایت پر مبنی منظم طریقے سے اسلامی علوم حاصل کرتی ہیں — اور اپنے گھر، معاشرے اور ملک میں علم و عمل کا چراغ روشن کرتی ہیں۔",
    ],
    link: "ہمارے بارے میں مزید جانیں",
    stats: [
      { value: "2016", label: "تأسیس" },
      { value: "5 سال", label: "عالمیہ کورس" },
      { value: "+4", label: "پروگرام زمرے" },
      { value: "2", label: "طرزِ تعلیم" },
    ],
  },
  why: {
    eyebrow: "ہمارا طریقہ",
    title: "اسلامی تعلیم کا",
    titleLine2: "منظم راستہ",
    cards: [
      { title: "خواتین کے لیے مخصوص", description: "خواتین و طالبات کے لیے مخصوص ایک مہربان اور پُرسکون تعلیمی ماحول۔" },
      { title: "مستند اسلامی تعلیم", description: "قرآن، سنت اور مستند علمی روایت پر مبنی۔" },
      { title: "کیمپس + آن لائن", description: "زندگی کے مختلف مراحل میں خواتین کے لیے لچکدار تعلیمی مواقع۔" },
      { title: "منظم علومِ اسلامیہ", description: "قرآن، حدیث، فقہ، تفسیر اور عربی کا منظم نظام۔" },
      { title: "علم اور کردار", description: "ایسی تعلیم جو ذہن کو تشکیل دے اور روح کو تربیت دے۔" },
      { title: "2016ء سے قائم", description: "تعلیمی قیادت اور ترقی کے سالوں کا ثابت قائم ادارہ۔" },
    ],
  },
  dars: {
    eyebrow: "نمایاں پروگرام",
    title: "درسِ نظامی",
    subtitle: "عالمیہ کورس",
    description: "درسِ نظامی عالمیہ کورس روایتی اسلامی علوم کو عصری تعلیم کے ساتھ ملاتا ہے۔ اس پروگرام میں قرآن، حدیث، عربی، فقہ اور دیگر اسلامی علوم میں مضبوط بنیاد رکھی جاتی ہے، ساتھ ہی عصرِ حاضر کے تقاضوں اور عملی ضروريات سے بھی آگاہی دی جاتی ہے۔",
    tags: ["5 سال", "قرآن", "حدیث", "عربی", "فقہ"],
    cta: "درسِ نظامی دیکھیں",
    photoLabel: "کیمپس کی تصویر",
    photoSub: "اصل تصویر درکار ہے",
  },
  philosophy: {
    eyebrow: "ہمارا فلسفہ",
    title: "علم جو کردار بنائے",
    description: "مدينۃ العلم میں اسلامی تعلیم صرف معلومات کا حصول نہیں — یہ ایک ایسا سفر ہے جو علم کو روزمرہ کے کردار میں بدل دیتا ہے۔",
    steps: ["علم", "فہم", "تربیت", "کردار"],
  },
  story: {
    eyebrow: "ہماری کہانی",
    title: "2016ء سے سفرِ علم",
    milestones: [
      { title: "بنیاد", description: "خواتین کے لیے مستند اسلامی تعلیم کے مقصد سے تأسیس۔" },
      { title: "ترقی و توسیع", description: "پروگرام بڑھے اور طلبات کا حلقہ وسیع ہوا۔" },
      { title: "نئے پروگرام اور آن لائن تعلیم", description: "آن لائن تعلیم اور نئے خصوصی پروگرام کا آغاز۔" },
      { title: "ایم ٹی آئی کے 10 سال", description: "علم، تربیت اور خدمت کا ایک عشرہ۔" },
      { title: "سفر جاری ہے", description: "آنے والی نسل کو اسلامی علوم کی تعلیم دینے کا سلسلہ۔" },
    ],
  },
  founder: {
    role: "بانی و پرنسپل",
    name: "صافیہ قادری",
    quote: "مستند اسلامی علوم کو منظم اور عصری طریقۂ تعلیم کے ساتھ جوڑنا۔",
    photoLabel: "بانی کی تصویر",
    bio: [
      "صافیہ قادری مدينۃ العلم اسلامی کالج کی بانی و پرنسپل ہیں اور خواتین میں اسلامی علوم اور تعلیم کو فروغ دینے کی باوقار معلمہ ہیں۔ اسلامی علوم میں تعلیمی قابلیت اور سالوں کی تعلیمی قیادت کے ساتھ، انہوں نے مستند اسلامی علوم کو منظم اور عصری طریقۂ تعلیم کے ساتھ جوڑنے کے مقصد سے ادارے کی بنیاد رکھی۔",
      "ان کی قیادت میں مدينۃ العلم علمی فضیلت، روحانی بہبود، کردار سازی اور نئی نسل میں عشقِ مصطفیٰ ﷺ کی ترویج کا ایک مضبوط پلیٹ فارم بن چکا ہے۔",
    ],
  },
  gallery: {
    eyebrow: "گیلری",
    title: "لمحاتِ تاثیر",
    subtitle: "کیمپس کی زندگی، تقریبات اور سرگرمیوں کی جھلک۔",
    featureLabel: "کیمپس لائف",
    photoNeeded: "اصل تصویر درکار ہے",
    tiles: ["محفل", "مقابلہ", "جشن", "کیمپس — جامعہ"],
  },
  schedule: {
    eyebrow: "داخلے",
    title: "کلاس شیڈول و فیس",
    note: "موجودہ کلاسوں کا خلاصہ۔ اوقات اور داخلہ بدل سکتے ہیں — داخلے سے پہلے واٹس ایپ پر تصدیق کر لیں۔",
    footerHint: "اہلیت یا اوقات کے بارے میں سوال ہے؟",
    footerLink: "داخلہ ٹیم سے رابطہ کریں",
    footerTail: "یا براہِ راست واٹس ایپ کے ذریعے داخلہ لیں۔",
    columns: ["کورس", "دن", "وقت", "طریقہ", "فیس (پاکستانی روپیہ)"],
    rows: [
      { course: "ناظرہ", days: "پیر تا ہفتہ", time: "8–1 و 3–4:30", format: "کیمپس", fee: "2,000" },
      { course: "حفظ القرآن", days: "پیر تا ہفتہ", time: "8–2", format: "کیمپس", fee: "5,000" },
      { course: "تفسیر", days: "منگل", time: "—", format: "کیمپس", fee: "3,000" },
      { course: "حدیث (آداب المعرف)", days: "بدھ", time: "—", format: "کیمپس", fee: "2,500 (یک بار)" },
      { course: "تفسیر", days: "جمعرات", time: "—", format: "کیمپس", fee: "2,000" },
      { course: "تخصص فی القرآن", days: "بدھ", time: "3–6", format: "کیمپس", fee: "2,500" },
      { course: "درسِ نظامی", days: "پیر تا ہفتہ", time: "—", format: "کیمپس", fee: "3,000" },
      { course: "درسِ نظامی", days: "ہفتہ", time: "12–2", format: "کیمپس", fee: "3,000" },
      { course: "درسِ نظامی", days: "پیر تا جمعہ", time: "5:30–8:30", format: "آن لائن", fee: "3,000" },
      { course: "زبانِ عربی", days: "پیر، منگل، جمعرات", time: "3–4", format: "آن لائن", fee: "1,500" },
      { course: "احکامِ شریعت", days: "ہفتہ", time: "11–1", format: "کیمپس", fee: "500" },
      { course: "سیرت", days: "پیر", time: "3:30–4:30", format: "کیمپس", fee: "2,000" },
      { course: "شمائل شریف", days: "پیر", time: "4:30–5:30", format: "کیمپس", fee: "1,000" },
      { course: "تفسیر", days: "ہفتہ", time: "3 شام", format: "آن لائن", fee: "2,000" },
    ],
  },
  finalCta: {
    heading: "علمِ دین کا سفر آج آغاز کریں",
    headingEm: "",
    description: "اسلامی علم اور تربیت میں مضبوط بنیاد کی طرف پہلا قدم اٹھائیں۔",
  },
  footer: {
    about: "خواتین کے لیے مرکوز اسلامی تعلیمی ادارہ جو 2016ء سے علم، فہم اور تربیت کو فروغ دے رہا ہے۔",
    navigate: "رہنمائی",
    programs: "پروگرامز",
    contact: "رابطہ",
    copyright: "جملہ حقوق محفوظ ہیں۔",
  },

  // ------------------------------------------------------------------
  // Inner pages (about / courses / admissions / gallery / contact)
  // ------------------------------------------------------------------
  pages: {
    gallery: {
      eyebrow: "گیلری",
      title: "مدينۃ العلم کی زندگی",
      description: "کیمپس کی زندگی، محافل، مقابلے، جشنیں اور ادارتی لمحات کی جھلک۔",
      note: "اصلی کیمپس اور تقریبات کی تصاویر بعد میں شامل کی جائیں گی — ابھی خانوں کے مطابق نمائشی خانے دکھائے گئے ہیں۔",
      tiles: [
        { label: "کیمپس لائف", sub: "[تصویر درکار ہے]" },
        { label: "کیمپس — جامعہ", sub: "[تصویر درکار ہے]" },
        { label: "محفل", sub: "[تصویر درکار ہے]" },
        { label: "مقابلہ", sub: "[تصویر درکار ہے]" },
        { label: "جشن", sub: "میلا — 14 اگست" },
        { label: "ادارتی لمحات", sub: "[تصویر درکار ہے]" },
      ],
    },
    contact: {
      hero: {
        eyebrow: "رابطہ کریں",
        heading: "ہم سے گفتگو کا آغاز کریں",
        headingEm: "",
      },
      channelsEyebrow: "رابطہ کریں",
      channelsTitle: "ہم تک کیسے پہنچیں",
      cards: [
        { label: "واٹس ایپ", value: "0313-3502333" },
        { label: "فیس بک", value: "@Madinatulilmislamicacademy" },
        { label: "انسٹاگرام", value: "@madinatulilmislamiccollege" },
        { label: "ای میل", value: "madinatulilm.edu.pk@gmail.com" },
      ],
      banner: {
        heading: "داخلے کے لیے تیار ہیں یا کوئی سوال ہے؟",
        sub: "واٹس ایپ کے ذریعے رابطہ کریں — ہماری ٹیم فوراً جواب دے گی۔",
        cta: "واٹس ایپ پر پیغام بھیجیں",
      },
      find: {
        eyebrow: "ہم یہاں ہیں",
        title: "مدينۃ العلم تشریف لائیں",
        addressLabel: "پتہ",
        addressLines: [
          "مکان نمبر 238، بلاک 3، سٹریٹ 13",
          "بہادر شاہ ظفر روڈ",
          "بی-وائے-جے-سی-ایچ-ایس",
          "راشد سی فوڈ کے سامنے،",
          "عسکری بینک کے ساتھ",
          "بہادر آباد، کراچی",
        ],
        landmarksLabel: "نشانیاں",
        landmarks: "راشد سی فوڈ کے سامنے · عسکری بینک کے ساتھ · بہادر آباد",
        mapsLink: "میپس میں کھولیں",
      },
    },
    about: {
      hero: {
        eyebrow: "ہمارے بارے میں",
        heading: "علم کا گہوارہ،",
        headingEm: "تربیت اور نشوونما",
      },
      who: {
        eyebrow: "ہم کون ہیں",
        heading: "مدينۃ العلم",
        headingTwo: "اسلامی کالج",
        photo: { label: "ادارتی تصویر", subLabel: "اصل تصویر درکار ہے" },
        paragraphs: [
          "مدينۃ العلم اسلامی کالج خواتین کے لیے مرکوز ایک تعلیمی ادارہ ہے جس کی بنیاد 2016ء میں اس مقصد سے رکھی گئی کہ مستند اسلامی تعلیم کو آسان، منظم اور آج کی نسل کی ضروریات کے مطابق بنایا جائے۔",
          "ہم ایک ایسا فکری ماحول فراہم کرتے ہیں جہاں طالبات قرآن، سنت اور مستند علمی روایت پر مبنی منظم طریقے سے اسلامی علوم حاصل کر سکیں۔",
          "کلاس روم سے آگے، مدينۃ العلم ایسے سوچ سمجھ کر فیصلہ کرنے والے، اصولوں پر کاربند اور روحانی طور پر مضبوط افراد تیار کرنے کی کوشش کرتا ہے جو اپنا علم اپنے گھر، معاشرے اور ملک تک پہنچائیں۔",
          "آج ادارہ کیمپس اور آن لائن دونوں طریقوں سے اپنی تعلیمی سرگرمیوں میں توسیع کر رہا ہے تاکہ زندگی کے مختلف مراحل میں خواتین اسلامی تعلیم حاصل کر سکیں۔",
        ],
      },
      history: {
        eyebrow: "ہماری کہانی",
        title: "ہماری تاریخ",
        entries: [
          {
            year: "2016",
            title: "بنیاد",
            description:
              "مدينۃ العلم اسلامی کالج ایک واضح مقصد کے ساتھ قائم ہوا: خواتین کے لیے مستند اسلامی تعلیم کو آسان، منظم اورعملی بنانا۔",
          },
          {
            year: "2017–2020",
            title: "ترقی و توسیع",
            description:
              "ادارہ مسلسل بڑھتا رہا، پروگرامز میں اضافہ ہوا اور کراچی سمیت ملک بھر سے طالبات کا وسیع حلقہ شامل ہوا۔",
          },
          {
            year: "2021–2024",
            title: "نئے پروگرام اور آن لائن تعلیم",
            description:
              "نئے خصوصی پروگرامز اور آن لائن تعلیمی پلیٹ فارم کا آغاز ہوا، جس سے زندگی کے مختلف مراحل میں خواتین کے لیے لچکدار راستے بنے۔",
          },
          {
            year: "2025",
            title: "مدينۃ العلم کے 10 سال",
            description:
              "علم، تربیت اور معاشرتی خدمت کا ایک عشرہ — ادارے کے مسلسل سفر میں ایک سنگ میل۔",
          },
          {
            year: "موجودہ",
            title: "سفر جاری ہے",
            description:
              "مدينۃ العلم وہی مقصد سامنے رکھ کر آنے والی نسل کی خواتین میں اسلامی علوم کو مضبوط کرتا جا رہا ہے۔",
          },
        ],
      },
      visionMission: {
        vision: {
          tag: "ہماری ویژن",
          quote:
            "ایسی علم رکھنے والی، عمل کرنے والی اور پُراعتماد مسلم خواتین کی تربیت کرنا جو اپنے گھر، معاشرے اور ملک میں مثبت کردار ادا کریں۔",
        },
        mission: {
          tag: "ہمارا مشن",
          quote:
            "قرآن و سنت پر مبنی مستند اسلامی تعلیم فراہم کر کے علم والی، عمل کرنے والی اور پُراعتماد مسلم خواتین کی نسل تیار کرنا، اور عشقِ مصطفیٰ ﷺ اور روزمرہ زندگی کے مثبت اقدار سے آراستہ کرنا۔",
        },
      },
      leadership: {
        eyebrow: "قیادت",
        title: "اس ویژن کے محرک",
        name: "صافیہ قادری",
        role: "بانی و پرنسپل",
        photo: { label: "بانی کی تصویر", subLabel: "اصل تصویر درکار ہے" },
        quote:
          "صافیہ قادری مدينۃ العلم اسلامی کالج کی بانی و پرنسپل ہیں اور خواتین میں اسلامی علوم اور تعلیم کو فروغ دینے کی باوقار معلمہ ہیں۔",
        paragraphs: [
          "اسلامی علوم میں تعلیمی قابلیت اور سالوں کی تعلیمی قیادت کے ساتھ، انہوں نے مستند اسلامی علوم کو منظم اور عصری طریقۂ تعلیم کے ساتھ جوڑنے کے مقصد سے ادارے کی بنیاد رکھی۔",
          "ان کی قیادت میں مدينۃ العلم علمی فضیلت، روحانی بہبود، کردار سازی اور نئی نسل میں عشقِ مصطفیٰ ﷺ کی ترویج کا ایک مضبوط پلیٹ فارم بن چکا ہے۔",
        ],
      },
    },
    courses: {
      hero: {
        eyebrow: "پروگرامز و کورسز",
        heading: "ہمارے پروگرامز دیکھیں",
        headingEm: "",
        description: "بنیادی ناظرہ سے لے کر مکمل عالمیہ کورسز تک — خواتین کے اسلامی تعلیمی سفر کے ہر مرحلے کے لیے منظم پروگرامز۔",
      },
      tabsLabel: "کورس زمرے",
      categories: [
        {
          id: "quran",
          n: "01",
          title: "قرآنی پروگرامز",
          desc: "بنیادی ناظرہ سے لے کر جامع مطالعے تک منظم قرآنی تعلیم۔",
          courses: [
            { name: "ناظرۃ القرآن", desc: "صحیح تلاوت کی بنیاد۔" },
            { name: "تجوید", desc: "قرآنی ادائیگی اور قواعدِ تلاوت کا علم۔" },
            { name: "حفظ القرآن", desc: "مکمل قرآن کا حفظ۔" },
            { name: "حفظ کی بازبینی", desc: "حفظ کی مسلسل دہرائی اور مضبوطی۔" },
            { name: "قرآن ترجمہ", desc: "قرآن کے مفہوم کو سمجھنا۔" },
            { name: "قرآن فہمی", desc: "قرآنی موضوعات اور پس منظر سے گہری وابستگی۔" },
          ],
        },
        {
          id: "islamic",
          n: "02",
          title: "اسلامی علوم",
          desc: "تمام بڑے علمی شعبوں پر مشتمل جامع اسلامی تعلیم۔",
          courses: [
            { name: "درسِ نظامی", desc: "نمایاں عالمیہ کورس — 5 سالہ منظم اسلامی علوم۔" },
            { name: "تفسیر", desc: "قرآن کی تشریح اور وضاحت۔" },
            { name: "حدیث", desc: "نبوی احادیث اور ان کے علوم کا مطالعہ۔" },
            { name: "احکامِ شریعت", desc: "اسلامی فقہ اور عملی احکام۔" },
            { name: "سیرت", desc: "نبی کریم ﷺ کی زندگی، کردار اور سوانح۔" },
            { name: "اسلامی تاریخ", desc: "صحابہ کرام سے آج تک۔" },
          ],
        },
        {
          id: "specialized",
          n: "03",
          title: "خصوصی پروگرامز",
          desc: "گہری تعلیم اور پیشہ ورانہ ترقی کے لیے جدید اور مخصوص پروگرامز۔",
          courses: [
            { name: "تخصص پروگرامز", desc: "عالمیہ کے بعد مخصوص اسلامی علوم میں تخصص۔" },
            { name: "مختصر کورسز", desc: "مخصوص موضوعات اور شعبوں پر مرکوز پروگرامز۔" },
            { name: "ورکشاپس", desc: "عملی اور مہارت پر مبنی تعلیمی نشستیں۔" },
            { name: "سرٹیفکیٹ کورسز", desc: "اسلامی مضامین میں معیاری پروگرامز۔" },
          ],
        },
        {
          id: "children",
          n: "04",
          title: "بچوں کے پروگرامز",
          desc: "بچیوں اور چھوٹی طالبات کے لیے مہربان اسلامی تعلیم۔",
          courses: [
            { name: "ناظرہ", desc: "بچوں کے لیے قرآنی تلاوت۔" },
            { name: "حفظ", desc: "ننھی طالبات کے لیے قرآن حفظ۔" },
            { name: "تجوید", desc: "عمر کے مطابق سکھائے جانے والے قواعدِ تلاوت۔" },
            { name: "اسلامی تربیت", desc: "کردار، آداب اور اسلامی اقدار۔" },
            { name: "سمر کیمپ", desc: "گرمیوں کی چھٹیوں میں دلچسپ تعلیمی پروگرام۔" },
          ],
        },
      ],
      enroll: "ابھی داخلہ لیں",
      featured: {
        eyebrow: "نمایاں پروگرام",
        title: "درسِ نظامی",
        subtitle: "عالمیہ کورس",
        description:
          "درسِ نظامی عالمیہ کورس روایتی اسلامی علوم کو عصری تعلیم کے ساتھ ملاتا ہے۔ اس پروگرام میں قرآن، حدیث، عربی، فقہ اور دیگر اسلامی علوم میں مضبوط بنیاد رکھی جاتی ہے، ساتھ ہی عصرِ حاضر کے تقاضوں اور عملی ضروريات سے بھی آگاہی دی جاتی ہے۔",
        stats: [
          { label: "دورانیہ", value: "5 سال" },
          { label: "کلاس ٹائمنگ", value: "12:00 – 2:00" },
          { label: "ماہانہ فیس", value: "2000 (بلنگ مدت کی توثیق باقی)" },
          { label: "اہلیت", value: "داخلے کی شرائط پوری کرنے والی بچیوں و خواتین کے لیے کھلا" },
        ],
        formatLabel: "کورس کا طریقہ",
        format: "کیمپس اور آن لائن دونوں سہولتیں موجود ہیں۔",
        formatNote: "شیڈول کی تفصیلات: توثیق باقی ہے۔",
        cta: "درخواست / داخلہ",
        learnLabel: "آپ کیا سیکھیں گی",
        subjects: [
          "قرآن",
          "تفسیر",
          "اصولِ تفسیر",
          "حدیث",
          "اصولِ حدیث",
          "فقہ",
          "اصولِ فقہ",
          "عربی",
          "سیرت",
          "عقیدہ",
          "اسلامی تاریخ",
          "اسلامیات",
          "عصری مسائل",
          "تحقیق",
        ],
      },
    },
    admissions: {
      hero: {
        eyebrow: "داخلے",
        heading: "ایسا پروگرام تلاش کریں",
        headingEm: "جو آپ کے سفر سے جُڑے",
        description:
          "کیمپس اور آن لائن پروگرامز میں سے انتخاب کریں۔ واٹس ایپ کے ذریعے یا نیچے دیے گئے لنکس سے داخلہ لیں۔",
      },
      enrollSteps: [
        {
          n: "01",
          title: "پروگرامز دیکھیں",
          description:
            "نیچے دیے گئے کورس شیڈول سے اپنے وقت اور مقصد کے مطابق پروگرام منتخب کریں۔",
        },
        {
          n: "02",
          title: "ہم سے رابطہ کریں",
          description:
            "واٹس ایپ 0313-3502333 پر رابطہ کر کے اپنے منتخب پروگرام کی دستیابی اور تفصیلات کی تصدیق کریں۔",
        },
        {
          n: "03",
          title: "داخلہ",
          description:
            "داخلہ مکمل کریں اور مدينۃ العلم میں اسلامی تعلیم کے سفر کا آغاز کریں۔",
        },
      ],
      scheduleEyebrow: "کورس شیڈول",
      scheduleTitle: "دستیاب پروگرامز",
      note: 'بعض خانے اصل دستاویز میں نامکمل ہیں۔ جہاں تفصیلات ابھی تصدیق شدہ نہیں، وہاں "توثیق باقی ہے" دکھایا جاتا ہے۔ تازہ معلومات کے لیے براہِ کرم واٹس ایپ پر رابطہ کریں۔',
      ctaHeading: "داخلے کے بارے میں سوال ہے؟",
      ctaText: "ہماری ٹیم واٹس ایپ پر آپ کے سوالات کا جواب دینے اور عمل کی رہنمائی کے لیے موجود ہے۔",
      ctaButton: "واٹس ایپ کریں",
      table: {
        columns: ["کورس", "دن", "وقت", "طریقہ", "تقاضے", "فیس (پاکستانی روپیہ)", "داخلہ"],
        toBeConfirmed: "توثیق باقی ہے",
        mobile: {
          days: "دن",
          time: "وقت",
          mode: "طریقہ",
          fee: "فیس (پاکستانی روپیہ)",
          requirements: "تقاضے",
          enroll: "واٹس ایپ کے ذریعے داخلہ",
        },
        rows: [
          { course: "ناظرہ", days: "پیر تا ہفتہ", time: "8:00 – 1:00", mode: "کیمپس", fee: "2,000", tbc: false },
          { course: "حفظ القرآن", days: "پیر تا ہفتہ", time: "3:00 – 4:30 / 8:00 – 2:00", mode: "کیمپس", fee: "5,000", tbc: false },
          { course: "تفسیر", days: "منگل", time: "توثیق باقی ہے", mode: "کیمپس", fee: "3,000", tbc: true },
          { course: "حدیث (آداب المعرف)", days: "بدھ", time: "توثیق باقی ہے", mode: "کیمپس", fee: "2,500 (یک بار)", tbc: true },
          { course: "تفسیر", days: "جمعرات", time: "توثیق باقی ہے", mode: "کیمپس", fee: "2,000", tbc: true },
          { course: "تخصص فی القرآن", days: "بدھ", time: "توثیق باقی ہے", mode: "—", fee: "2,500", tbc: true },
          { course: "درسِ نظامی", days: "پیر تا ہفتہ", time: "توثیق باقی ہے", mode: "کیمپس", fee: "3,000", tbc: true },
          { course: "درسِ نظامی", days: "ہفتہ", time: "12:00 – 2:00", mode: "کیمپس", fee: "3,000", tbc: false },
          { course: "درسِ نظامی", days: "پیر تا جمعہ", time: "5:30 – 8:30", mode: "آن لائن", fee: "3,000", tbc: false },
          { course: "زبانِ عربی", days: "پیر / منگل / جمعرات", time: "3:00 – 4:00", mode: "آن لائن", fee: "1,500", tbc: false },
          { course: "احکامِ شریعت", days: "ہفتہ", time: "11:00 – 1:00", mode: "کیمپس", fee: "500", tbc: false },
          { course: "سیرت", days: "پیر", time: "3:30 – 4:30", mode: "کیمپس", fee: "2,000", tbc: false },
          { course: "شمائل شریف", days: "پیر", time: "4:30 – 5:30", mode: "کیمپس", fee: "1,000", tbc: false },
          { course: "تفسیر", days: "ہفتہ", time: "3:00 – 6:00", mode: "آن لائن", fee: "2,000", tbc: false },
        ],
      },
    },
  },
};

export const DICTS: Record<Lang, Dict> = { en, ur };
