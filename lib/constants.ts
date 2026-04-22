export const SITE = {
  logo: "/images/logo.png",
  name: "Daniel Oweibo",
};

export const HERO = {
  greeting: "Hey, I'm Daniel",
  tagline:
    "fullstack developer obsessed with building platforms and scaling infrastructure",
  description:
    "I build platforms, design user interfaces, engineer server architectures and everything in-between.",
  image: "https://placehold.co/480x560/e8e4dc/888888?text=Daniel",
};

export const CAREERS = [
  {
    id: "company-a",
    role: "Senior Fullstack Engineer",
    company: "Acme Corp",
    banner: "https://placehold.co/1200x400/1a1a2e/ffffff?text=Acme+Corp",
    contributions: [
      "Architected a multi-tenant SaaS platform serving 50k+ users",
      "Reduced API response time by 40% through query optimisation",
      "Led a team of 5 engineers across frontend and backend squads",
      "Introduced CI/CD pipelines cutting deployment time from 2hr to 8min",
    ],
    images: [
      "https://placehold.co/800x500/e8e4dc/888888?text=Dashboard+View",
      "https://placehold.co/800x500/e8e4dc/888888?text=Analytics+Screen",
      "https://placehold.co/800x500/e8e4dc/888888?text=Mobile+App",
    ],
  },
  {
    id: "company-b",
    role: "Backend Engineer",
    company: "Bravo Systems",
    banner: "https://placehold.co/1200x400/0f3460/ffffff?text=Bravo+Systems",
    contributions: [
      "Built a real-time data pipeline processing 1M+ events per day",
      "Designed microservices architecture using Golang and gRPC",
      "Improved system uptime from 97% to 99.9% SLA",
    ],
    images: [],
  },
  {
    id: "company-c",
    role: "Frontend Engineer",
    company: "Charlie Studio",
    banner: "https://placehold.co/1200x400/16213e/ffffff?text=Charlie+Studio",
    contributions: [
      "Delivered pixel-perfect UI components used across 3 product lines",
      "Built a design system from scratch adopted by 8 engineers",
      "Improved Lighthouse performance score from 62 to 97",
      "Integrated complex data visualisations using D3.js",
    ],
    images: [
      "https://placehold.co/800x500/e8e4dc/888888?text=Design+System",
      "https://placehold.co/800x500/e8e4dc/888888?text=Component+Library",
    ],
  },
];

export const PRODUCTS = [
  {
    id: "product-a",
    icon: "https://placehold.co/64x64/1a1a2e/ffffff?text=A",
    name: "AppName One",
    description:
      "A brief description of what this product does and who it serves. Used by thousands daily.",
    solves: [
      "Eliminates manual reporting workflows",
      "Centralises team communication",
      "Automates invoice generation",
    ],
    images: [
      "https://placehold.co/390x844/e8e4dc/888888?text=Screen+1",
      "https://placehold.co/390x844/e8e4dc/888888?text=Screen+2",
      "https://placehold.co/390x844/e8e4dc/888888?text=Screen+3",
    ],
  },
  {
    id: "product-b",
    icon: "https://placehold.co/64x64/0f3460/ffffff?text=B",
    name: "AppName Two",
    description:
      "Another product that solves a real problem at scale. Trusted by thousands of businesses.",
    solves: [
      "Real-time inventory tracking",
      "Multi-currency payment processing",
      "One-click supplier ordering",
    ],
    images: [
      "https://placehold.co/390x844/e8e4dc/888888?text=Screen+1",
      "https://placehold.co/390x844/e8e4dc/888888?text=Screen+2",
      "https://placehold.co/390x844/e8e4dc/888888?text=Screen+3",
    ],
  },
  {
    id: "product-c",
    icon: "https://placehold.co/64x64/16213e/ffffff?text=C",
    name: "AppName Three",
    description:
      "A platform engineering tool that makes infrastructure accessible to every developer.",
    solves: [
      "One-click environment provisioning",
      "Visualises infrastructure as code",
      "Detects drift in real time",
    ],
    images: [
      "https://placehold.co/390x844/e8e4dc/888888?text=Screen+1",
      "https://placehold.co/390x844/e8e4dc/888888?text=Screen+2",
      "https://placehold.co/390x844/e8e4dc/888888?text=Screen+3",
    ],
  },
];

export const SKILLS = [
  { label: "React", icon: "https://cdn.simpleicons.org/react" },
  { label: "Next.js", icon: "https://cdn.simpleicons.org/nextdotjs" },
  { label: "Nuxt.js", icon: "https://cdn.simpleicons.org/nuxtdotjs" },
  { label: "Vue", icon: "https://cdn.simpleicons.org/vuedotjs" },
  { label: "React Native", icon: "https://cdn.simpleicons.org/react" },
  { label: "Expo", icon: "https://cdn.simpleicons.org/expo" },
  { label: "TypeScript", icon: "https://cdn.simpleicons.org/typescript" },
  { label: "GraphQL", icon: "https://cdn.simpleicons.org/graphql" },
  { label: "Golang", icon: "https://cdn.simpleicons.org/go" },
  { label: "Java", icon: "https://cdn.simpleicons.org/openjdk" },
  { label: "Node.js", icon: "https://cdn.simpleicons.org/nodedotjs" },
  { label: "Express", icon: "https://cdn.simpleicons.org/express" },
  { label: "NestJS", icon: "https://cdn.simpleicons.org/nestjs" },
  { label: "Python", icon: "https://cdn.simpleicons.org/python" },
  { label: "Spring Boot", icon: "https://cdn.simpleicons.org/springboot" },
  { label: "C#", icon: "https://cdn.simpleicons.org/csharp" },
  { label: "ASP.NET", icon: "https://cdn.simpleicons.org/dotnet" },
  { label: "PostgreSQL", icon: "https://cdn.simpleicons.org/postgresql" },
  { label: "MongoDB", icon: "https://cdn.simpleicons.org/mongodb" },
  { label: "Docker", icon: "https://cdn.simpleicons.org/docker" },
  { label: "Terraform", icon: "https://cdn.simpleicons.org/terraform" },
];

export const FOOTER = {
  tagline: "let's connect today and ship billions",
  socials: [
    {
      platform: "X",
      handle: "@danoweibo",
      url: "https://x.com/danoweibo",
    },
    {
      platform: "LinkedIn",
      handle: "Daniel Oweibo",
      url: "https://www.linkedin.com/in/danoweibo/",
    },
    {
      platform: "GitHub",
      handle: "@danoweibo",
      url: "https://github.com/danoweibo/",
    },
    {
      platform: "Discord",
      handle: "DVNL",
      url: "https://discord.com/channels/1488951364901015584/1488951366046191770",
    },
    {
      platform: "YouTube",
      handle: "@danoweibo",
      url: "https://www.youtube.com/@danoweibo",
    },
  ],
  copyright: "Daniel Oweibo © 2026, Fullstack Platform Developer.",
};
