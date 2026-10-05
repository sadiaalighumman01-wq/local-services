import HeroSection from '@/components/home/HeroSection';
import PopularServices from '@/components/home/PopularServices';
import FeaturedProfessionals from '@/components/home/FeaturedProfessionals';
import HowItWorks from '@/components/home/HowItWorks';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import CtaSection from '@/components/home/CtaSection';

export default function HomePage() {
  return (
    <div>
      <HeroSection />
      <PopularServices />
      <FeaturedProfessionals />
      <HowItWorks />
      <WhyChooseUs />
      <TestimonialsSection />
      <CtaSection />
    </div>
  );
}
