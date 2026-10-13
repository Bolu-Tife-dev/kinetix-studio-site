import { Hero } from "@/components/hero";
import { Marquee, HowItWorks } from "@/components/how-it-works";
import { Features } from "@/components/features";
import { CompareSlider } from "@/components/compare-slider";
import { Cta } from "@/components/cta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Marquee />
      <Features />
      <CompareSlider />
      <HowItWorks />
      <Cta />
    </>
  );
}
