"use client";
import { ClerkProvider} from '@clerk/nextjs';
import Hero from '@/components/ui/Hero';
import AnimatedFeaturesSection from '@/components/Features';  

const HomePage = () => {
  return (
    <>
        <ClerkProvider>
            <Hero/>
            <AnimatedFeaturesSection/>
        </ClerkProvider>
    </>
  );
};

export default HomePage;