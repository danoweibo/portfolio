import { HeroSection } from "@/components/hero-section";
import { CareersSection } from "@/components/careers-section";
import { ProductsSection } from "@/components/products-section";
import { SkillsSection } from "@/components/skills-section";
import { FooterSection } from "@/components/footer-section";

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
