import React from 'react'
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb'
import ServiceDetails from '../../components/Servicedetails/Servicedetails';
import ServiceProjectsSlider from '../../components/ProductSlider/ServiceProjectsSlider';

function ServiceDetailss() {
  return (
    <div>
      <Breadcrumb/>
      <ServiceDetails/>
      <ServiceProjectsSlider serviceId="hospital-ot-doors" />
    </div>
  )
}

export default ServiceDetailss;
