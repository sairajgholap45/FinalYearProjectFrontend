import React from 'react'
import AboutSection from '../components/AboutSection'
import EnquirySection from '../components/EnquirySection'
import Footer from '../components/Footer'
import HeroSection from '../components/HeroSection'
import Navbar from '../components/Navbar'
import ProductsSection from '../components/ProductsSection'
import WhyChooseUsSection from '../components/WhyChooseUsSection'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <ProductsSection />
        <WhyChooseUsSection />
        <EnquirySection />
      </main>
      <Footer />
    </div>
  )
}
