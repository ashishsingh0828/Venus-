import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  MapPin,
  Calendar,
  Building,
  CheckCircle2,
  Phone,
  Mail,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Layers,
  ChevronRight,
  Share2,
} from "lucide-react";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import "./ProjectDetails.css";

const STATIC_PROJECTS = [
  {
    id: "aiims-modular-ot-hermetic-doors",
    slug: "aiims-modular-ot-hermetic-doors",
    title: "AIIMS Modular Operation Theatre Hermetic Doors",
    category: "Hermetic Sliding Doors",
    client: "All India Institute of Medical Sciences (AIIMS)",
    location: "New Delhi, India",
    year: "2024",
    scope: "Design, fabrication, and installation of 16 motorized hermetically sealed sliding doors with touchless infrared sensors and microprocessor interlock systems.",
    image: "/assets/images/Autoslides/automatic-hermetic-sliding-door.png",
    gallery: [
      "/assets/images/Autoslides/automatic-hermetic-sliding-door.png",
      "/assets/images/Autoslides/hermetically-sealed-sliding-door.png",
      "/assets/images/Autoslides/hermetically-sealed-sliding-hospital-door.png",
    ],
    description: "Custom engineered for the Advanced Surgical Block at AIIMS, these hermetically sealed sliding doors maintain strict positive sterile air pressure differentials between operating suites and outer corridors. Featuring heavy-duty perimeter neoprene gaskets, track-drop airtight seals, and whisper-quiet brushless DC automation, the units eliminate cross-contamination during emergency surgeries.",
    specifications: [
      "Door Leaf Core: High-density CFC-free polyurethane core (48 kg/m³)",
      "Facing Material: SS304 1.2mm grade stainless steel with matte satin hairline finish",
      "Airtight Rating: EN 12207 Class 4 hermetic airtight certification",
      "Automation Drive: 100W Brushless DC motor with intelligent micro-controller",
      "Safety Sensors: Dual through-beam optical safety photocells and anti-pinch radar",
      "Operation Controls: Touchless contactless optical radar and foot-kick sensors",
    ],
    order: 1,
    active: true,
  },
  {
    id: "apollo-radiation-shielding-doors",
    slug: "apollo-radiation-shielding-doors",
    title: "Apollo Specialty Hospital Lead-Lined Radiation Barrier Doors",
    category: "Radiation Shielding Doors",
    client: "Apollo Multi-Specialty Hospital",
    location: "Faridabad & NCR, India",
    year: "2024",
    scope: "Fabrication of 2.0mm to 3.0mm lead-equivalent radiation protection hinged and sliding doors for CT Scan, Cath Lab, and Linear Accelerator suites.",
    image: "/assets/images/Hospital door/leaned.png",
    gallery: [
      "/assets/images/Hospital door/leaned.png",
      "/assets/images/Hospital door/HPL Hinge Lead Door.png",
      "/assets/images/Hospital door/SS304 Lead Single Leaf Hinged Door.png",
    ],
    description: "Equipped with continuous 99.9% pure unpierced lead sheet cores, these radiation shielding doors provide certified radiation containment for high-energy diagnostic radiology departments. Frames are engineered with full lead lining overlap to eliminate any direct radiation leakage around jambs and hinges, fully compliant with AERB (Atomic Energy Regulatory Board) safety standards.",
    specifications: [
      "Radiation Barrier: 2.0mm / 3.0mm Pb lead core shielding",
      "Hinges: Heavy-duty SS304 ball-bearing hinges rated for 250kg leaf load",
      "Vision Panel: Radiation-shielded lead glass with equivalent lead protection",
      "Compliance: AERB and international diagnostic radiology containment norms",
      "Acoustic & Dust Seal: Integrated drop-down automatic acoustic bottom seals",
    ],
    order: 2,
    active: true,
  },
  {
    id: "max-healthcare-ss304-ot-doors",
    slug: "max-healthcare-ss304-ot-doors",
    title: "Max Super Speciality Hospital SS304 Cleanroom Hinged Doors",
    category: "Hospital & OT Doors",
    client: "Max Super Speciality Healthcare",
    location: "Gurugram, Haryana",
    year: "2025",
    scope: "Supply and commissioning of 28 double-leaf and single-leaf SS304 hinged cleanroom doors across surgical theatres, recovery bays, and sterile corridors.",
    image: "/assets/images/Hospital door/SS304 HOSPITAL HINGED DOOR.png",
    gallery: [
      "/assets/images/Hospital door/SS304 HOSPITAL HINGED DOOR.png",
      "/assets/images/Hospital door/SS304 Double Leaf Lead Hinged Door.png",
      "/assets/images/Hospital door/SS304 Single Leaf Hinged Door.png",
    ],
    description: "Engineered for high-frequency clinical traffic, these full stainless steel SS304 doors feature seamless flush construction that eliminates bacteria-harboring ledges. Double-glazed flush vision panels with integrated blinds provide observation clarity without disrupting sterility.",
    specifications: [
      "Material: High grade non-magnetic SS304 satin finish sheets",
      "Vision Glass: 6mm+6mm double-glazed flush mounted safety glass with desiccant",
      "Hardware: Heavy-duty stainless steel lever handles and concealed door closers",
      "Sanitization: 100% resistant to chlorine and hospital medical sanitizers",
      "Door Frame: Wrap-around profile interlocking directly with modular OT wall panels",
    ],
    order: 3,
    active: true,
  },
  {
    id: "medanta-surgical-pendants-scrub-stations",
    slug: "medanta-surgical-pendants-scrub-stations",
    title: "Medanta The Medicity Surgical Pendants & Scrub Stations",
    category: "Surgical Pendants & Scrub Sinks",
    client: "Medanta The Medicity Hospital",
    location: "Gurugram, Haryana",
    year: "2025",
    scope: "Installation of 12 dual-arm articulated surgical and anesthesia ceiling pendants and 8 heavy-duty hands-free SS304 surgical scrub sink stations.",
    image: "/assets/images/Surgical Pendant/Double Arm Pendant.png",
    gallery: [
      "/assets/images/Surgical Pendant/Double Arm Pendant.png",
      "/assets/images/Surgical Scrub/Foot Operated Automatic Surgical Scrub Sink For Hospital.png",
      "/assets/images/Surgical Scrub/stainless-steel-surgical-scrub-sink-station.png",
    ],
    description: "Delivered complete ergonomic and sanitary infrastructure for Medanta's surgical wing. Ceiling-mounted double-arm pendants provide clutter-free medical gas management, high-voltage isolations, and 330-degree rotation. The hands-free SS304 surgical scrub stations feature infrared sensor faucets and foot controls ensuring zero touch contamination.",
    specifications: [
      "Pendant Arms: Dual articulated 330° bearing arms with pneumatic friction brakes",
      "Gas Terminal Units: Oxygen, Nitrous Oxide, Medical Air 4 Bar, Surgical Air 7 Bar, Vacuum",
      "Scrub Station: 1.5mm heavy-gauge SS304 surgical grade steel with anti-splash bowl",
      "Controls: Dual knee/foot switches and digital infrared automatic sensors",
      "Water Temperature: Integrated thermostatic anti-scalding mixer",
    ],
    order: 4,
    active: true,
  },
  {
    id: "fortis-motorized-sliding-cleanroom-doors",
    slug: "fortis-motorized-sliding-cleanroom-doors",
    title: "Fortis Escorts Motorized Cleanroom Airlock System",
    category: "Motor Automation",
    client: "Fortis Escorts Heart Institute",
    location: "Okhla, New Delhi",
    year: "2025",
    scope: "Multi-door interlock automation with centralized Motor Control Panels (MCP) for cardiac catheterization and ICU transfer airlocks.",
    image: "/assets/images/services/motorservice.png",
    gallery: [
      "/assets/images/services/motorservice.png",
      "/assets/images/Autoslides/operation-theater-sliding-doors.png",
      "/assets/images/Autoslides/automatic-hermetic-sliding-door.png",
    ],
    description: "Engineered an intelligent cleanroom airlock interlock system driven by custom Venus Motor Control Panels (MCP). The automated motorized system guarantees that both entry and exit doors cannot be opened simultaneously, safeguarding sterile HVAC zones and preventing airborne particulate transfer.",
    specifications: [
      "Controller: Microprocessor-based multi-door interlock PLC logic",
      "Motor: High-torque brushless DC servo drive with soft start/stop profiling",
      "Emergency Integration: Instant fire alarm relay release and manual freewheeling",
      "Backup Power: Built-in 24V UPS battery system providing up to 200 uninterrupted cycles",
      "Access Trigger: RFID badge scanners, touchless optical wave switches, and elbow push pads",
    ],
    order: 5,
    active: true,
  },
  {
    id: "manipal-hpl-hermetic-sliding-doors",
    slug: "manipal-hpl-hermetic-sliding-doors",
    title: "Manipal Hospital HPL Hermetically Sealed Sliding Doors",
    category: "Hermetic Sliding Doors",
    client: "Manipal Hospitals Network",
    location: "Dwarka, New Delhi",
    year: "2025",
    scope: "Supply and precision mounting of antibacterial High-Pressure Laminate (HPL) hermetic sliding doors for specialized neonatal and cardiac surgery suites.",
    image: "/assets/images/Hospital door/HPL Hermatically Sealed Manual Sliding Lead Lined Door.png",
    gallery: [
      "/assets/images/Hospital door/HPL Hermatically Sealed Manual Sliding Lead Lined Door.png",
      "/assets/images/Hospital door/HPL Hinge Lead Door.png",
      "/assets/images/Hospital door/SS304 HOSPITAL HINGED DOOR.png",
    ],
    description: "Engineered with 4mm solid-core High-Pressure Laminate (HPL) skins treated with active silver-ion antimicrobial coatings. These sliding doors offer outstanding impact resistance against patient trolleys and hospital beds while maintaining hermetic isolation across sterile corridors.",
    specifications: [
      "Surface Skin: 4mm High Pressure Laminate (HPL) with antimicrobial protection",
      "Perimeter Frame: Heavy-gauge anodized aluminum alloy with flush silicone seal",
      "Track Mechanism: Slanted bottom drop track providing airtight downward seal",
      "Inspection Window: Flush double-glazed toughened safety glass with desiccant",
      "Compliance: ISO Class 5 Cleanroom and NABH Hospital OT standards",
    ],
    order: 6,
    active: true,
  },
];

export default function ProjectDetails() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [allProjects, setAllProjects] = useState(STATIC_PROJECTS);
  const [activeImage, setActiveImage] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    setIsLoading(true);

    // 1. Try fetching from dynamic API
    fetch(`/api/projects/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data) {
          setProject(data.data);
          setActiveImage(data.data.image || (data.data.gallery && data.data.gallery[0]));
        } else {
          // Fallback to static array
          const fallback = STATIC_PROJECTS.find(
            (p) => p.id === id || p.slug === id
          );
          if (fallback) {
            setProject(fallback);
            setActiveImage(fallback.image || fallback.gallery[0]);
          }
        }
      })
      .catch(() => {
        const fallback = STATIC_PROJECTS.find(
          (p) => p.id === id || p.slug === id
        );
        if (fallback) {
          setProject(fallback);
          setActiveImage(fallback.image || fallback.gallery[0]);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });

    // Also fetch all projects for the related projects section
    fetch("/api/projects")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.data) && data.data.length > 0) {
          setAllProjects(data.data);
        }
      })
      .catch(() => {});
  }, [id]);

  const currentProject = project || STATIC_PROJECTS.find((p) => p.id === id || p.slug === id) || STATIC_PROJECTS[0];
  const galleryList = (currentProject.gallery && currentProject.gallery.length > 0)
    ? currentProject.gallery
    : [currentProject.image];

  const relatedProjects = allProjects
    .filter((p) => (p.slug || p.id) !== (currentProject.slug || currentProject.id))
    .slice(0, 3);

  return (
    <div className="project-details-page">
      <Breadcrumb title={currentProject.title} />

      <section className="pd-main-section">
        <div className="pd-container">
          <div className="pd-layout-grid">
            {/* Left Main Content */}
            <div className="pd-content-col">
              {/* Project Hero Header */}
              <div className="pd-header-block">
                <div className="pd-badge-row">
                  <span className="pd-category-tag">{currentProject.category || "Hospital Project"}</span>
                  <span className="pd-status-tag">Certified Installation</span>
                </div>
                <h1 className="pd-project-title">{currentProject.title}</h1>

                <div className="pd-meta-bar">
                  {currentProject.client && (
                    <div className="pd-meta-item">
                      <Building size={16} className="pd-meta-icon" />
                      <span>{currentProject.client}</span>
                    </div>
                  )}
                  {currentProject.location && (
                    <div className="pd-meta-item">
                      <MapPin size={16} className="pd-meta-icon" />
                      <span>{currentProject.location}</span>
                    </div>
                  )}
                  {currentProject.year && (
                    <div className="pd-meta-item">
                      <Calendar size={16} className="pd-meta-icon" />
                      <span>Year: {currentProject.year}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Gallery Image Display */}
              <div className="pd-gallery-card">
                <div className="pd-main-image-wrap">
                  <img
                    src={activeImage || currentProject.image}
                    alt={currentProject.title}
                    className="pd-main-image"
                    onError={(e) => {
                      e.target.src = "/assets/images/project/OT.png";
                    }}
                  />
                </div>

                {galleryList.length > 1 && (
                  <div className="pd-thumbnails-list">
                    {galleryList.map((thumbUrl, idx) => (
                      <button
                        key={idx}
                        type="button"
                        className={`pd-thumb-btn ${activeImage === thumbUrl ? "active" : ""}`}
                        onClick={() => setActiveImage(thumbUrl)}
                        aria-label={`View photo ${idx + 1}`}
                      >
                        <img
                          src={thumbUrl}
                          alt={`${currentProject.title} thumb ${idx + 1}`}
                          onError={(e) => {
                            e.target.src = "/assets/images/project/OT.png";
                          }}
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Scope of Work Box */}
              {currentProject.scope && (
                <div className="pd-scope-card">
                  <div className="pd-scope-header">
                    <ShieldCheck size={24} className="pd-scope-icon" />
                    <h3>Scope of Work &amp; Engineering Overview</h3>
                  </div>
                  <p className="pd-scope-text">{currentProject.scope}</p>
                </div>
              )}

              {/* In-depth Clinical Description */}
              <div className="pd-description-card">
                <h2>Project Background &amp; Execution</h2>
                <div className="pd-description-body">
                  <p>{currentProject.description}</p>
                </div>
              </div>

              {/* Technical Specifications */}
              {currentProject.specifications && currentProject.specifications.length > 0 && (
                <div className="pd-specs-card">
                  <h2>Key Technical Specifications</h2>
                  <p className="pd-specs-subtitle">
                    Manufactured and verified in accordance with NABH, ISO Class 5 Cleanroom, and AERB healthcare safety codes.
                  </p>

                  <div className="pd-specs-grid">
                    {currentProject.specifications.map((spec, index) => (
                      <div className="pd-spec-item" key={index}>
                        <CheckCircle2 size={20} className="pd-spec-check" />
                        <span>{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Sidebar */}
            <aside className="pd-sidebar-col">
              {/* Quick Details Card */}
              <div className="pd-side-card pd-info-card">
                <h3 className="pd-side-title">Project Summary</h3>
                <div className="pd-divider"></div>

                <ul className="pd-details-list">
                  <li>
                    <span className="pd-detail-label">Client</span>
                    <strong className="pd-detail-val">{currentProject.client || "Healthcare Facility"}</strong>
                  </li>
                  <li>
                    <span className="pd-detail-label">Location</span>
                    <strong className="pd-detail-val">{currentProject.location || "India"}</strong>
                  </li>
                  <li>
                    <span className="pd-detail-label">Category</span>
                    <strong className="pd-detail-val">{currentProject.category || "Hospital Engineering"}</strong>
                  </li>
                  <li>
                    <span className="pd-detail-label">Completed</span>
                    <strong className="pd-detail-val">{currentProject.year || "2025"}</strong>
                  </li>
                  <li>
                    <span className="pd-detail-label">Standard</span>
                    <strong className="pd-detail-val">NABH / ISO / AERB</strong>
                  </li>
                  <li>
                    <span className="pd-detail-label">Status</span>
                    <span className="pd-status-pill">Operational &amp; Commissioned</span>
                  </li>
                </ul>
              </div>

              {/* Direct Engineering Support CTA Card */}
              <div className="pd-side-card pd-contact-cta">
                <div className="pd-cta-badge">NEED A CUSTOM SOLUTION?</div>
                <h3 className="pd-cta-title">Plan Your Hospital OT Doors With Venus</h3>
                <p className="pd-cta-desc">
                  Connect directly with our manufacturing specialists for drawings, site inspection, and quotations.
                </p>

                <div className="pd-phone-list">
                  <a href="tel:+919810730153" className="pd-phone-link">
                    <Phone size={18} />
                    <span>+91 98107 30153</span>
                  </a>
                  <a href="tel:+919582516661" className="pd-phone-link">
                    <Phone size={18} />
                    <span>+91 95825 16661</span>
                  </a>
                </div>

                <a href="mailto:venushospitaldoorsolutions@gmail.com" className="pd-mail-link">
                  <Mail size={16} />
                  <span>venushospitaldoorsolutions@gmail.com</span>
                </a>

                <Link to="/contact" className="pd-quote-btn">
                  <span>Request Project Quotation</span>
                  <ArrowRight size={16} />
                </Link>
              </div>

              {/* Navigation Back */}
              <div className="pd-side-card pd-nav-back">
                <Link to="/projects" className="pd-back-link">
                  <ArrowLeft size={16} />
                  <span>View All Projects</span>
                </Link>
              </div>
            </aside>
          </div>

          {/* Related Hospital Projects */}
          {relatedProjects.length > 0 && (
            <div className="pd-related-section">
              <div className="pd-related-header">
                <div>
                  <span className="pd-related-eyebrow">Other Installations</span>
                  <h2 className="pd-related-title">Related Healthcare Projects</h2>
                </div>
                <Link to="/projects" className="pd-view-all-link">
                  <span>Explore All Projects</span>
                  <ChevronRight size={18} />
                </Link>
              </div>

              <div className="pd-related-grid">
                {relatedProjects.map((relProj) => (
                  <Link
                    key={relProj.id || relProj.slug}
                    to={`/project/${relProj.slug || relProj.id}`}
                    className="pd-related-card"
                  >
                    <div className="pd-related-thumb">
                      <img
                        src={relProj.image}
                        alt={relProj.title}
                        onError={(e) => {
                          e.target.src = "/assets/images/project/OT.png";
                        }}
                      />
                      <span className="pd-related-tag">{relProj.category}</span>
                    </div>
                    <div className="pd-related-body">
                      <h3>{relProj.title}</h3>
                      {relProj.client && (
                        <p className="pd-related-client">
                          <MapPin size={13} style={{ display: 'inline', marginRight: '4px' }} />
                          {relProj.client}
                        </p>
                      )}
                      <span className="pd-related-btn">
                        <span>View Details</span>
                        <ArrowRight size={14} />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
