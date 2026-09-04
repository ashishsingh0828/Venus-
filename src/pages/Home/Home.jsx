import React from 'react'
import HeroSlider from '../../components/Hero/Hero'
import AboutHome from '../../components/AboutHome/AboutHome'
import MarqueeText from '../../components/MarqueeText/MarqueeText'
import ServicesSlider from '../../components/ServicesSlider/ServicesSlider'
import Testimonials from '../../components/Testimonials/Testimonial'
import FaqSection from '../../components/FAQ/FaqSection'
import ProjectsSection from '../../components/Project/Project'
import VideoHero from '../../components/Video/Video'

function Home() {
  return (
    <div>
      <HeroSlider/>
      <MarqueeText/>
      <AboutHome/>
      <ServicesSlider/>
      <VideoHero/>
      <ProjectsSection/>
      <FaqSection/>
      <Testimonials/>
    </div>
  )
}

export default Home
