import { Link, useLocation } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import './Breadcrumb.css'

export default function Breadcrumb({ title }) {
  const location = useLocation()

  // Derives name automatically from URL path if no title prop is passed
  const pathName = location.pathname
    .split('/')
    .filter(Boolean)
    .pop()
    ?.replace(/-/g, ' ')
    ?.replace(/\b\w/g, (char) => char.toUpperCase())

  const currentTitle = title || pathName || 'Page'

  return (
    <section className="breadcrumb-section">
      <div className="breadcrumb-overlay"></div>
      <div className="breadcrumb-container">
        <div className="breadcrumb-content">
          <h1 className="breadcrumb-title">{currentTitle}</h1>
          <ul className="breadcrumb-nav">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li className="breadcrumb-sep">
              <ChevronRight size={16} />
            </li>
            <li className="breadcrumb-active">{currentTitle}</li>
          </ul>
        </div>
      </div>
    </section>
  )
}