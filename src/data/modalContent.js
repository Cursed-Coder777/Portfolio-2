// Modal content data — each entry matches a modalID set by a 3D mesh onClick.
//
// Keys (demoshub, thecollective, etc.) map to the `id` field in each
// model's onClick handler. The Modal component looks up content here.

export const modalContent = {
  demoshub: {
    title: "About Me",
    link: "https://github.com/Cursed-Coder777",
    linkText: "View GitHub",
    paragraphs: [
      "I'm Cursed Coder, a full-stack developer who specializes in building immersive 3D web experiences. From interactive Three.js worlds to full-featured Next.js applications, I blend creative design with solid engineering to ship polished, performant products.",
      "My work spans award-winning 3D portfolios, e-commerce platforms, real-time collaborative apps, and experimental WebGL scenes — always pushing what's possible in the browser.",
    ],
  },
  thecollective: {
    title: "Projects",
    link: "/projects",
    linkText: "View all projects →",
    paragraphs: [
      {
        name: "Suburbia",
        text: " — Skateboarding brand with a 3D board builder, Matter.js physics, and CMS-driven content.",
        url: "https://suburbia-mocha.vercel.app/",
      },
      {
        name: "Nimbus Keyboards",
        text: " — Mechanical keyboard store with 3D product showcases and Prismic CMS.",
        url: "https://nimbus-keyboards-seven.vercel.app/",
      },
      {
        name: "Zara Perfumes",
        text: " — Premium perfume e-commerce with Stripe, 3D hero fluid animation, and admin panel.",
        url: "https://zara-perfumes.vercel.app/",
      },
      {
        name: "Unsplash Clone",
        text: " — Full-stack image gallery with AI generation, masonry layouts, and PWA support.",
        url: "https://unsplash-clone-pied.vercel.app/",
      },
      {
        name: "X Clone",
        text: " — Twitter clone with real-time posts, DMs, polls, notifications, and trending hashtags.",
        url: "https://x-pi-inky.vercel.app/",
      },
      {
        name: "Fizzi",
        text: " — Soda brand marketing site with Prismic CMS and 3D product scenes.",
        url: "https://fizzi-phi-eight.vercel.app/",
      },
      {
        name: "Heaven Homes",
        text: " — Real estate platform with property listings, 3D virtual tours, and interactive neighborhood maps.",
        url: "https://portfolio-1-alpha-gold.vercel.app/",
      },
      {
        name: "Cocktails",
        text: " — Award-winning UI clone with cinematic GSAP scroll animations.",
        url: "https://portfolio-1-alpha-gold.vercel.app/",
      },
      {
        name: "Cozy Cafes",
        text: " — 3D interactive split-screen cafe comparison with Blender models.",
        url: "https://cozy-cafes.vercel.app/",
      },
      {
        name: "And more",
        text: " — each project reflects a love for clean code, 3D creativity, and thoughtful UX.",
        url: "https://github.com/Cursed-Coder777",
      },
    ],
  },
  webzibition: {
    title: "Skills & Tools",
    link: "#",
    linkText: "View tech stack",
    paragraphs: [
      "Frontend: React, Next.js, TypeScript, Tailwind CSS, GSAP, Framer Motion, Sass",
      "3D & Creative: Three.js, React Three Fiber, WebGL, Blender, OGL, Matter.js",
      "Backend & Data: Node.js, tRPC, Prisma, Drizzle ORM, PostgreSQL, MongoDB, SQLite",
      "Auth & Payments: NextAuth, better-auth, Stripe",
      "CMS & Cloud: Prismic CMS, Cloudinary, Vercel, Neon",
      "Tools: Git, pnpm, Zustand, TanStack Query, Radix UI, shadcn/ui",
    ],
  },
  developerspotlight: {
    title: "Experience",
    link: "https://github.com/Cursed-Coder777",
    linkText: "View resume",
    paragraphs: [
      "I've built and shipped 12 full-stack projects spanning 3D interactive experiences, e-commerce platforms, social media clones, and creative marketing sites.",
      "My work has been recognized in the Codrops FWA (Site of the Day) for the 'house-portfolio' 3D fan museum experience. I'm passionate about pushing browser capabilities — combining WebGL, smooth animations, and rock-solid backend architecture.",
      "Currently exploring AI integration, advanced shader techniques, and performance optimization for complex 3D web applications.",
    ],
  },
  designerspotlight: {
    title: "Contact",
    link: "https://github.com/Cursed-Coder777",
    linkText: "Get in touch",
    paragraphs: [
      "Want to collaborate on a 3D web project, discuss a creative idea, or just say hi? Reach out — I'm always open to interesting conversations and new challenges.",
      "Find me on GitHub: github.com/Cursed-Coder777",
    ],
  },
};
