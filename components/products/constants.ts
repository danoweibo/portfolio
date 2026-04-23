import { PortfolioProducts } from "@/lib/types";

export const PRODUCTS: PortfolioProducts[] = [
  {
    id: "bullioner",
    icon: "/images/products/bullioner.webp",
    name: "Bullioner",
    description:
      "Cryptocurrency fintech project focused on solving issues with staking and earning yield for digital asset growth alongside standard transaction-based features including credits and debits, bill payments and statement history.",
    solves: [
      "Offers competitive staking options for digital asset growth",
      "Provides user-friendly platform for managing cryptocurrency portfolios",
      "Integrates traditional financial features for seamless transactions",
    ],
    stacks: [
      { name: "Next.js", icon: "nextdotjs" },
      { name: "React Native", icon: "reactnative" },
      { name: "Expo", icon: "expo" },
      { name: "TypeScript", icon: "typescript" },
      { name: "Node.js", icon: "nodedotjs" },
      { name: "Solidity", icon: "solidity" },
      { name: "Fastify", icon: "fastify" },
      { name: "PostgreSQL", icon: "postgresql" },
    ],
    images: [
      "/images/products/bullioner-1.webp",
      "/images/products/bullioner-2.webp",
      "/images/products/bullioner-3.webp",
    ],
  },
  {
    id: "firmament",
    icon: "/images/firmament.webp",
    name: "Firmament ERP",
    description:
      "Developed for businesses and enterprises aimed to solve operational and fragmentation issues with resource planning modules by improving the documentation and integration utilities through artificially intelligent systems.",
    solves: [
      "Streamlines resource management",
      "Enhances data-driven decision making",
      "Improves cross-departmental collaboration",
    ],
    stacks: [
      { name: "Nuxt", icon: "nuxt" },
      { name: "Vue.js", icon: "vuedotjs" },
      { name: "Expo", icon: "expo" },
      { name: "React Native", icon: "reactnative" },
      { name: "TypeScript", icon: "typescript" },
      { name: "Java", icon: "java" },
      { name: "Spring Boot", icon: "springboot" },
      { name: "PostgreSQL", icon: "postgresql" },
      { name: "Docker", icon: "docker" },
    ],
    images: [
      "/images/products/firmament-1.webp",
      "/images/products/firmament-2.webp",
      "/images/products/firmament-3.webp",
    ],
  },
  {
    id: "jotclip",
    icon: "/images/products/jotclip.webp",
    name: "Jotclip",
    description:
      "Boosts productivity in video annotations by transforming manual review tasks into automated reviews executed by artificial intelligence which learns customers' preferences, by noting the changes made to the ones generated.",
    solves: [
      "Simplifies video review processes",
      "Allows for more efficient collaboration with teams",
      "Reduces time spent on manual annotations",
    ],
    stacks: [
      { name: "Next.js", icon: "nextdotjs" },
      { name: "React Native", icon: "reactnative" },
      { name: "Expo", icon: "expo" },
      { name: "TypeScript", icon: "typescript" },
      { name: "Python", icon: "python" },
      { name: "FastAPI", icon: "fastapi" },
      { name: "Go", icon: "go" },
      { name: "PostgreSQL", icon: "postgresql" },
    ],
    images: [
      "/images/products/jotclip-1.webp",
      "/images/products/jotclip-2.webp",
      "/images/products/jotclip-3.webp",
    ],
  },
];
