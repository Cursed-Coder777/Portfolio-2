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
      "I'm Cursed Coder, a full-stack developer who specializes in building immersive 3D web experiences. From WebGL and WebGPU worlds with custom GLSL/TSL shaders to full-featured Next.js applications, I blend creative design with solid engineering to ship polished, performant products.",
      "My work spans an FWA-recognized 3D museum portfolio, e-commerce platforms with Stripe checkout and admin panels, real-time social apps with tRPC, AI-powered image galleries, and scroll-driven storytelling sites — always pushing what's possible in the browser.",
    ],
  },
  thecollective: {
    title: "Projects",
    link: "/projects",
    linkText: "View all projects →",
    paragraphs: [
      {
        name: "Fizzi",
        text: " — Soda brand marketing site with Prismic CMS and 3D product scenes.",
        url: "https://fizzi-3d-dev-me.vercel.app/",
      },
      {
        name: "Koisei",
        text: " — Cinematic sakura-river narrative with GLSL shaders, petal physics, and scroll-scrubbed film sections.",
        url: "https://koisei-six.vercel.app/",
      },
      {
        name: "Nimbus Keyboards",
        text: " — Mechanical keyboard store with 3D product showcases and Prismic CMS.",
        url: "https://nimbus-keyboards-3d-dev-me.vercel.app/",
      },
      {
        name: "Seraph Kamos",
        text: " — Scroll-driven storytelling with GSAP Flip morphing and Lenis smooth scroll.",
        url: "https://seraph-kamos.vercel.app/",
      },
      {
        name: "XTYNCT",
        text: " — Gaming brand showcase with clip-path shape morphing and staggered text reveals.",
        url: "https://xtynct.vercel.app/",
      },
      {
        name: "Designer Portfolio",
        text: " — Scroll-driven creative studio portfolio with pinned reveals, book flips, and puzzle assembly.",
        url: "https://designer-portfolio-3d-dev-me.vercel.app/",
      },
      {
        name: "And more",
        text: " — each project reflects a love for clean code, 3D creativity, and thoughtful UX.",
        url: "/projects",
      },
    ],
  },
  webzibition: {
    title: "Skills & Tools",
    link: "#",
    linkText: "View tech stack",
    paragraphs: [
      "Frontend: React 19, Next.js 16, TypeScript, Tailwind CSS, Sass, GSAP, Framer Motion, Lenis, Splitting.js, React Compiler",
      "3D & Creative: Three.js, React Three Fiber, WebGL, WebGPU, GLSL/TSL Shaders, Blender, OGL, Matter.js",
      "Backend & Data: Node.js, tRPC, Prisma, Drizzle ORM, PostgreSQL, MongoDB, Turso, Zod",
      "Auth & Payments: NextAuth, better-auth, Stripe",
      "CMS & Cloud: Prismic CMS, Cloudinary, Vercel Blob, Supabase, Neon, PWA",
      "Tools: Git, pnpm, Zustand, TanStack Query, Radix UI, shadcn/ui, Howler.js",
    ],
  },
  developerspotlight: {
    title: "Experience",
    link: "https://github.com/Cursed-Coder777",
    linkText: "View resume",
    paragraphs: [
      "I've built and shipped 13 full-stack projects spanning 3D interactive experiences, e-commerce platforms, social media clones, and creative marketing sites.",
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
