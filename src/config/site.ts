// Single place for everything on the site that changes between launches.
// Edit values here; the components read from this file.

export const site = {
  name: "ALP Coach",
  programme: "Agribusiness Leadership Program",
  description:
    "ALP Coach brings the full Agribusiness Leadership Program curriculum to WhatsApp and Telegram: short lessons, quizzes and a coach you can ask by text or voice.",

  // Production Telegram bot for the full ALP Coach (see Notion › Development › Telegram Bot Info).
  // Set live: true when the bot is cleared for public access; until then the site
  // shows a placeholder card with no link or QR.
  telegram: {
    live: false,
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

  // Where project teams should write to bring ALP Coach to a project.
  contactEmail: "aline@intaigent.com",


  languages: [
    { name: "English", status: "available" },
    { name: "Swahili", status: "country" },
    { name: "Bengali", status: "country" },
    { name: "Vietnamese", status: "planned" },
    { name: "French", status: "planned" },
    { name: "Amharic", status: "planned" },
  ] as const,

  // Structure of the full ALP curriculum (learning path > category > courses),
  // from the MCT Learning Paths library, including the Traceability category.
  learningPaths: [
    { title: "Fundamentals of Cooperatives", categories: [
      { name: "Understanding Cooperatives", courses: 3 }, { name: "Leadership", courses: 3 }, { name: "Member Relations", courses: 4 } ] },
    { title: "Producer Organization Essentials", categories: [
      { name: "Operations", courses: 4 }, { name: "Bookkeeping for Producer Organizations", courses: 6 }, { name: "Sustainability", courses: 6 } ] },
    { title: "Fundamentals of Retail Management", categories: [
      { name: "Business Relationships", courses: 4 }, { name: "Inventory Management", courses: 4 }, { name: "Cost Management", courses: 3 } ] },
    { title: "Bookkeeping Essentials", categories: [
      { name: "Bookkeeping and Your Business", courses: 3 }, { name: "Bookkeeping Ledgers", courses: 3 } ] },
    { title: "Finance and Accounting", categories: [
      { name: "Finance and Accounting Basics", courses: 6 }, { name: "Working with Credit", courses: 3 }, { name: "Financial Analysis and Planning", courses: 5 } ] },
    { title: "Growing Your Business", categories: [
      { name: "Planning for Your Business", courses: 5 }, { name: "Marketing", courses: 4 }, { name: "Managing Risk", courses: 3 } ] },
    { title: "Internal Management", categories: [
      { name: "Internal Organization", courses: 3 }, { name: "Staff Management", courses: 3 } ] },
    { title: "Business Sustainability", categories: [
      { name: "Sustainability", courses: 6 }, { name: "Traceability", courses: 3 }, { name: "Women's Inclusion", courses: 3 } ] },
    { title: "Fundamentals of ALP Coaching", categories: [
      { name: "Coaching Basics", courses: 2 }, { name: "Coaching Skills", courses: 3 }, { name: "Coaching for the ALP Context", courses: 3 } ] },
  ],

  deployments: [
    { country: "Tanzania", since: "2024", channels: "Telegram", languages: "Swahili and English", audience: "Agri-entrepreneurs" },
    { country: "Bangladesh", since: "2026", channels: "WhatsApp", languages: "Bengali and English", audience: "Coaches and agri-entrepreneurs" },
  ],

  // One external reference for the section above.
  fieldStory: {
    text: "Cliford Magoti, an agri-entrepreneur in Kasuguti, Tanzania, uses the coach \u201cas a virtual agri-coach on demand in Swahili and English.\u201d",
    source: "From an IFC story, October 2025",
    url: "https://www.ifc.org/en/stories/2025/empowering-tanzania-s-farmers-one-entrepreneur-at-a-time",
    label: "Read the story",
  },
};
