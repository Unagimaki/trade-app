import { HeroSection } from './ui/HeroSection';
import { FeaturesSection } from './ui/FeaturesSection';
import { HowItWorksSection } from './ui/HowItWorksSection';
import { CTASection } from './ui/CTASection';

export const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] text-[#f8fafc]">
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <CTASection />
    </div>
  );
};