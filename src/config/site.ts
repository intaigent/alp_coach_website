// Single place for everything on the site that changes between launches.
// Edit values here; the components read from this file.

export const site = {
  name: "ALP Coach",
  programme: "Agribusiness Leadership Program",
  description:
    "ALP Coach brings the full Agribusiness Leadership Program curriculum to WhatsApp and Telegram: short lessons, quizzes and a coach you can ask by text or voice.",

  // Production Telegram bot for the full ALP Coach (see Notion › Development › Telegram Bot Info).
  // live: false turns the card back into a placeholder with no link or QR.
  telegram: {
    live: true,
    handle: "alp_coach_bot",
    url: "https://t.me/alp_coach_bot",
    qr: "/images/alp/qr-telegram.png",
  },

  // Full-bot production WhatsApp number. live: false turns the card back into a placeholder.
  whatsapp: {
    live: true,
    launch: "October 2026",
    number: "14154260877",
    displayNumber: "+1 415 426 0877",
    qr: "/images/alp/qr-whatsapp.png",
    get url() {
      // "Start" is pre-filled so a first-time learner only has to press send; the bot
      // answers it with the greeting and language choice, and logs bot_started.
      return this.number ? `https://wa.me/${this.number}?text=Start` : "";
    },
  },

  // Where project teams should write to bring ALP Coach to a project.
  contactEmail: "info@intaigent.com",


  languages: [
    { name: "English", status: "available" },
    { name: "Swahili", status: "country" },
    { name: "Bengali", status: "country" },
    { name: "Vietnamese", status: "planned" },
    { name: "French", status: "planned" },
    { name: "Amharic", status: "planned" },
  ] as const,

  // Structure of the full ALP curriculum (learning path > category),
  // from the MCT Learning Paths library, including the Traceability category.
  learningPaths: [
    { title: "Fundamentals of Cooperatives", categories: [
      { name: "Understanding Cooperatives" }, { name: "Leadership" }, { name: "Member Relations" } ] },
    { title: "Producer Organization Essentials", categories: [
      { name: "Operations" }, { name: "Bookkeeping for Producer Organizations" }, { name: "Sustainability" } ] },
    { title: "Fundamentals of Retail Management", categories: [
      { name: "Business Relationships" }, { name: "Inventory Management" }, { name: "Cost Management" } ] },
    { title: "Bookkeeping Essentials", categories: [
      { name: "Bookkeeping and Your Business" }, { name: "Bookkeeping Ledgers" } ] },
    { title: "Finance and Accounting", categories: [
      { name: "Finance and Accounting Basics" }, { name: "Working with Credit" }, { name: "Financial Analysis and Planning" } ] },
    { title: "Growing Your Business", categories: [
      { name: "Planning for Your Business" }, { name: "Marketing" }, { name: "Managing Risk" } ] },
    { title: "Internal Management", categories: [
      { name: "Internal Organization" }, { name: "Staff Management" } ] },
    { title: "Business Sustainability", categories: [
      { name: "Sustainability" }, { name: "Traceability" }, { name: "Women's Inclusion" } ] },
    { title: "Fundamentals of ALP Coaching", categories: [
      { name: "Coaching Basics" }, { name: "Coaching Skills" }, { name: "Coaching for the ALP Context" } ] },
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
