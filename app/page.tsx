import { HeroCartoon } from '@/components/sections/HeroCartoon';
import { TimelineWrapper } from '@/components/TimelineWrapper';
import { Problem } from '@/components/sections/Problem';
import { Testimonials } from '@/components/sections/Testimonials';
import { Creator } from '@/components/sections/Creator';
import { ParentsMessage } from '@/components/sections/ParentsMessage';
import { PricingSection, FAQSection } from '@/components/sections/PricingFAQ';
import { SiteFooter, StickyMobileCTA } from '@/components/sections/CTA';
import { SectionParchmentDivider } from '@/components/SectionParchmentDivider';
import { MidPageCta } from '@/components/MidPageCta';
import { LeadPopup } from '@/components/LeadPopup';

export default function LandingPage() {
  return (
    <main className="min-h-screen overflow-x-clip bg-[#FDFBF7] text-[#1A1A1A] selection:bg-[#EC6426] selection:text-white">
      <HeroCartoon />
      <SectionParchmentDivider variant="hero" />
      <TimelineWrapper />
      <SectionParchmentDivider variant="cream" />
      <Testimonials />
      <SectionParchmentDivider variant="cream" />
      <Problem />
      <Creator />
      <MidPageCta />
      <SectionParchmentDivider variant="cream" />
      <ParentsMessage />
      <SectionParchmentDivider variant="cream" />
      <PricingSection />
      <SectionParchmentDivider variant="cream" />
      <FAQSection />
      <SiteFooter />
      <StickyMobileCTA />
      <LeadPopup />
    </main>
  );
}
