import { PortfolioCareer } from "@/lib/types";

export const CAREERS: PortfolioCareer[] = [
  {
    id: "spacetrade",
    role: "Senior Fullstack Engineer",
    company: "SpaceTrade Technologies.",
    duration: "Jul 2024 - Apr 2025",
    banner: "/images/careers/spacetrade.webp",
    contributions: [
      "Hardened wallet address handling by implementing clipboard sanitization and regex-based format validation across intents preventing spoofed or malformed addresses from reaching the transaction layer.",
      "Optimized app bundle and lazy-loaded heavy screens, reducing initial load time by ~30% and introduced efficient caching which then improved perceived performance even more on low-bandwidth networks.",
      "Collaborated with design and product teams across 2-week sprint cycles, shipping 4+ major features between Q3 2024 and Q1 2025.",
      "Implemented swift webhooks handling 5k+ daily transactions, executing asset conversions in under 6 seconds on average.",
    ],
    stacks: [
      { name: "Expo", icon: "expo" },
      { name: "Next.js", icon: "nextdotjs" },
      { name: "TypeScript", icon: "typescript" },
      { name: "Node.js", icon: "nodedotjs" },
      { name: "PostgreSQL", icon: "postgresql" },
      { name: "Laravel", icon: "laravel" },
    ],
    images: [
      "/images/careers/spacetrade-1.webp",
      "/images/careers/spacetrade-2.webp",
      "/images/careers/spacetrade-3.webp",
    ],
  },
  {
    id: "aiico",
    role: "Backend Developer",
    company: "AIICO Insurance.",
    duration: "Mar 2023 - Oct 2023",
    banner: "/images/careers/aiico.webp",
    contributions: [
      "Built an internal claims processing tool in Spring Boot used by 200-500 operations staff, reducing average claims handling time by ~35% through workflow automation and retrieval augmented generation.",
      "Designed premium collection services that processed 1M+ monthly payment transactions, improved payment success rates by 18%, and reduced reconciliation time to 1 hour.",
      "Optimized 12+ Hibernate ORM queries on policyholder and transaction tables, cutting average DB response time from ~900ms to under 300ms.",
      "Implemented role-based access control across internal tools, enforcing 4 permission tiers and eliminating unauthorized data access incidents.",
    ],
    stacks: [
      { name: "Spring Boot", icon: "springboot" },
      { name: "Java", icon: "java" },
      { name: "MySQL", icon: "mysql" },
      { name: "Hibernate", icon: "hibernate" },
    ],
    images: [],
  },
  {
    id: "springbok",
    role: "Fullstack Developer",
    company: "Springbok Developers.",
    duration: "Nov 2021 - Aug 2022",
    banner: "/images/careers/springbok.webp",
    contributions: [
      "Replaced a repeatedly-failing legacy system with a production-grade web and mobile feeding platform serving 500-1,000 students, ending a cycle of 3+ system overhauls in 2 years.",
      "Built the parent mobile app in Expo and school admin dashboard using NextJS as a unified platform, cutting admin meal reconciliation time from hours to under 10 minutes per day.",
      "Shipped with balance visibility, reducing payment-related support queries by an estimated 50%.",
      "Improved database performance through indexing, query tuning and access policies with Zenstack built for Prisma ORM schemas.",
    ],
    stacks: [
      { name: "Next.js", icon: "nextdotjs" },
      { name: "Expo", icon: "expo" },
      { name: "TypeScript", icon: "typescript" },
      { name: "Prisma", icon: "prisma" },
      { name: "MongoDB", icon: "mongodb" },
    ],
    images: [
      "/images/careers/springbok-1.webp",
      "/images/careers/springbok-2.webp",
    ],
  },
];
