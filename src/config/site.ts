// Single place for everything on the site that changes between launches.
// Edit values here; the components read from this file.

export const site = {
  name: "ALP Coach",
  programme: "Agribusiness Leadership Program",
  description:
    "ALP Coach brings the full Agribusiness Leadership Program curriculum to WhatsApp and Telegram: short lessons, quizzes and a coach you can ask by text or voice.",

  // Production Telegram bot for the full ALP Coach (see Notion › Development › Telegram Bot Info).
  telegram: {
    live: true,
    handle: "alp_coach_bot",
    url: "https://t.me/alp_coach_bot",
    qr: "/images/alp/qr-telegram.png",
  },

  // Full-bot production WhatsApp number is prepared but not to be distributed yet.
  // When it is cleared for use, set live: true and fill number / displayNumber / qr.
  whatsapp: {
    live: false,
    launch: "October 2026",
    number: "", // e.g. "14154260877"
    displayNumber: "", // e.g. "+1 415 426 0877"
    qr: "", // e.g. "/images/alp/qr-whatsapp.png"
    get url() {
      return this.number ? `https://wa.me/${this.number}` : "";
    },
  },

  // Where programme teams should write to bring ALP Coach to a project.
  contactEmail: "aline@intaigent.com",

  // Public demo video shown in the hero (already in /public).
  demoVideo: "/Demo_ALP_logo_cut.mp4",

  languages: [
    { name: "English", status: "available" },
    { name: "Swahili", status: "country" },
    { name: "Bengali", status: "country" },
    { name: "Vietnamese", status: "planned" },
    { name: "French", status: "planned" },
    { name: "Amharic", status: "planned" },
  ] as const,

  learningPaths: [
    { title: "Fundamentals of Cooperatives" },
    { title: "Producer Organization Essentials" },
    { title: "Fundamentals of Retail Management" },
    { title: "Bookkeeping Essentials" },
    { title: "Finance and Accounting" },
    { title: "Growing Your Business" },
    { title: "Internal Management" },
    { title: "Business Sustainability" },
    { title: "Fundamentals of ALP Coaching" },
  ],

  deployments: [
    {
      country: "Tanzania",
      since: "2024",
      programme: "Better Life Farming programme with Bayer",
      channels: "Telegram",
      languages: "Swahili and English",
      audience: "Agro-dealers and farm advisors",
    },
    {
      country: "Bangladesh",
      since: "2026",
      programme: "Better Life Farming programme",
      channels: "WhatsApp and Telegram",
      languages: "Bengali and English",
      audience: "Coaches and agri-entrepreneurs in Rangpur, Rajshahi and Dhaka",
    },
  ],
};
