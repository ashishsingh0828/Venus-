import React from 'react'
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb'
import ValuesSection from '../../components/Value/Value'
import CompanyFoundersSection from '../../components/Founder/Founder'
import FactsExpertiseSection from '../../components/Fact/Fact'
import Testimonial from '../../components/Testimonials/Testimonial'

function About() {
  return (
    <div>
      <Breadcrumb/>
      <CompanyFoundersSection/>
      <FactsExpertiseSection/>
      <ValuesSection/>
      <Testimonial/>
      
    </div>
  )
}

export default About
