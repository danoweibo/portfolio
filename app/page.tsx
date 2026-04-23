import { CareersSection } from "@/components/careers";
import { FooterSection } from "@/components/footer-section";
import { HeroSection } from "@/components/hero";
import { ProductsSection } from "@/components/products";
import { SkillsSection } from "@/components/skills-section";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <CareersSection />
      <ProductsSection />
      <SkillsSection />
      <FooterSection />
    </main>
  );
}
