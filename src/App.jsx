import { Routes, Route, useLocation } from 'react-router-dom'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import Home from './pages/Home/Home'
import Contact from './pages/Contact/Contact'
import About from './pages/About/About'
import Services from './pages/Services/Services'
import Projects from './pages/Projects/Projects'
import ProjectDetails from './pages/ProjectDetails/ProjectDetails'
import ServiceDetailss from './pages/ServiceDetails/ServiceDetails'
import MotorSlidingDoorDetails from './components/Servicedetails/Motor'
import RadiationShieldingDoorDetails from './components/Servicedetails/Radiation'
import SurgicalPendantDetails from './components/Servicedetails/Surgical'
import SurgicalScrubSinkDetails from './components/Servicedetails/SurgicalScrub'
import HermeticDoorDetails from './components/Servicedetails/Hermetic'

// Admin Pages
import AdminLogin from './pages/Admin/AdminLogin'
import AdminForgotPassword from './pages/Admin/AdminForgotPassword'
import AdminDashboard from './pages/Admin/AdminDashboard'
import ProtectedRoute from './pages/Admin/ProtectedRoute'

function App() {
  const location = useLocation()
  const isAdmin = location.pathname.startsWith('/admin')

  return (
    <>
      {!isAdmin && <Header />}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/services" element={<Services />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/project/:id" element={<ProjectDetails />} />
          <Route path="/projects/:id" element={<ProjectDetails />} />
          <Route path="/hospital-doors" element={<ServiceDetailss />} />
          <Route path="/radiationshielding-doors" element={<RadiationShieldingDoorDetails />} />
          <Route path="/hermetic-doors" element={<HermeticDoorDetails />} />
          <Route path="/surgical-scrub" element={<SurgicalScrubSinkDetails />} />
          <Route path="/surgical-pendant" element={<SurgicalPendantDetails />} />
          <Route path="/motorsliding-doors" element={<MotorSlidingDoorDetails />} />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/forgot-password" element={<AdminForgotPassword />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
      {!isAdmin && <Footer />}
    </>
  )
}

export default App
