import React from 'react';
import HeroSection from '@/components/home/hero-section';
import FeaturesSection from '@/components/home/features-section';
import Header from './header';
import Footer from './footer';

const Homepage = () => {
  return (
    <>
      <Header />
      <HeroSection />
      <FeaturesSection />
      <Footer />
    </>
  );
};

export default Homepage;
