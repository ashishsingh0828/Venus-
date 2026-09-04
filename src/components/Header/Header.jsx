import { useState, useEffect, useRef } from "react";
import {
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  ArrowRight,
  Layers,
  Hammer,
  Grid3x3,
  Sofa,
  Building2,
} from "lucide-react";
import "./Header.css";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  {
    label: "Services",
    href: "/services",
    children: [
      {
        label: "Hardwood Refinishing",
        href: "#refinishing",
        blurb: "Sand, stain & seal",
        icon: Layers,
      },
      {
        label: "New Installation",
        href: "#installation",
        blurb: "Wood, vinyl & laminate",
        icon: Hammer,
      },
      {
        label: "Tile & Stone",
        href: "#tile-stone",
        blurb: "Kitchens, baths & entries",
        icon: Grid3x3,
      },
      {
        label: "Carpet & Vinyl",
        href: "#carpet-vinyl",
        blurb: "Soft flooring solutions",
        icon: Sofa,
      },
      {
        label: "Commercial Flooring",
        href: "#commercial",
        blurb: "Retail & office spaces",
        icon: Building2,
      },
    ],
  },
  { label: "Projects", href: "/projects" },
  { label: "Blog", href: "#blog" },
  { label: "Contact", href: "/contact" },
];

const SCROLL_THRESHOLD = 50;

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [activeHref, setActiveHref] = useState("#home");
  const [openMobileSubmenu, setOpenMobileSubmenu] = useState(null);
  const [openDesktopMenu, setOpenDesktopMenu] = useState(null);
  const closeTimer = useRef(null);

  // Sticky / blur transition on scroll
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > SCROLL_THRESHOLD);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll while the mobile drawer is open
  useEffect(() => {
    document.body.style.overflow = isDrawerOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isDrawerOpen]);

  // Close drawer on Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setIsDrawerOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const closeDrawer = () => {
    setIsDrawerOpen(false);
    setOpenMobileSubmenu(null);
  };

  const handleNavClick = (href) => {
    setActiveHref(href);
    setOpenDesktopMenu(null);
    closeDrawer();
  };

  const toggleMobileSubmenu = (label) => {
    setOpenMobileSubmenu((current) => (current === label ? null : label));
  };

  // Desktop dropdown: small close-delay so a diagonal mouse path from the
  // link down into the panel never gets caught by a dead zone and closes early.
  const handleMenuEnter = (label) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenDesktopMenu(label);
  };

  const handleMenuLeave = () => {
    closeTimer.current = setTimeout(() => setOpenDesktopMenu(null), 220);
  };

  useEffect(() => () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  }, []);

  return (
    <header className={`site-header ${isScrolled ? "site-header--stuck" : ""}`}>
      <div className="site-header__inner">
        {/* Brand */}
        <a href="#home" className="site-header__brand" onClick={() => handleNavClick("#home")}>
          <span className="site-header__brand-mark" aria-hidden="true">
            <span className="site-header__brand-mark-tile" />
            <span className="site-header__brand-mark-tile" />
            <span className="site-header__brand-mark-tile" />
          </span>
          <span className="site-header__brand-text">
            <span className="site-header__brand-name">Palatka</span>
            <span className="site-header__brand-sub">Floor Services</span>
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="site-header__nav" aria-label="Primary">
          <ul>
            {NAV_LINKS.map((link) => (
              <li
                key={link.href}
                className={`site-header__nav-item ${link.children ? "has-dropdown" : ""} ${
                  openDesktopMenu === link.label ? "is-open" : ""
                }`}
                onMouseEnter={link.children ? () => handleMenuEnter(link.label) : undefined}
                onMouseLeave={link.children ? handleMenuLeave : undefined}
              >
                <a
                  href={link.href}
                  className={`site-header__link ${activeHref === link.href ? "is-active" : ""}`}
                  onClick={() => handleNavClick(link.href)}
                  aria-expanded={link.children ? openDesktopMenu === link.label : undefined}
                >
                  {link.label}
                  {link.children && (
                    <ChevronDown size={14} strokeWidth={2} className="site-header__caret" />
                  )}
                </a>

                {link.children && (
                  <div className="site-header__submenu" role="menu">
                    <div className="site-header__submenu-panel">
                      <span className="site-header__submenu-eyebrow">Explore Services</span>
                      <ul>
                        {link.children.map((child) => {
                          const Icon = child.icon;
                          return (
                            <li key={child.href}>
                              <a
                                href={child.href}
                                className="site-header__submenu-link"
                                role="menuitem"
                                onClick={() => handleNavClick(child.href)}
                              >
                                <span className="site-header__submenu-icon">
                                  <Icon size={17} strokeWidth={1.75} />
                                </span>
                                <span className="site-header__submenu-copy">
                                  <span className="site-header__submenu-label">{child.label}</span>
                                  <span className="site-header__submenu-blurb">{child.blurb}</span>
                                </span>
                                <ChevronRight
                                  size={15}
                                  strokeWidth={2}
                                  className="site-header__submenu-arrow"
                                />
                              </a>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Desktop actions */}
        <div className="site-header__actions">
          <a href="#contact" className="site-header__cta">
            <span>Get a quote</span>
            <ArrowRight size={16} strokeWidth={2} />
          </a>

          {/* Hamburger / close toggle (mobile) */}
          <button
            type="button"
            className={`site-header__toggle ${isDrawerOpen ? "is-open" : ""}`}
            aria-label={isDrawerOpen ? "Close menu" : "Open menu"}
            aria-expanded={isDrawerOpen}
            aria-controls="mobile-drawer"
            onClick={() => setIsDrawerOpen((open) => !open)}
          >
            <Menu size={22} strokeWidth={1.75} className="icon-menu" />
            <X size={22} strokeWidth={1.75} className="icon-close" />
          </button>
        </div>
      </div>

      {/* Backdrop */}
      <div
        className={`site-header__backdrop ${isDrawerOpen ? "is-visible" : ""}`}
        onClick={closeDrawer}
      />

      {/* Mobile drawer */}
      <aside
        id="mobile-drawer"
        className={`site-header__drawer ${isDrawerOpen ? "is-open" : ""}`}
        aria-hidden={!isDrawerOpen}
      >
        <div className="site-header__drawer-head">
          <span className="site-header__drawer-title">Menu</span>
          <button
            type="button"
            className="site-header__drawer-close"
            aria-label="Close menu"
            onClick={closeDrawer}
          >
            <X size={20} strokeWidth={1.75} />
          </button>
        </div>

        <nav aria-label="Mobile primary" className="site-header__drawer-nav">
          <ul>
            {NAV_LINKS.map((link, i) => (
              <li
                key={link.href}
                className={link.children ? "has-dropdown" : ""}
                style={{ transitionDelay: isDrawerOpen ? `${i * 40 + 80}ms` : "0ms" }}
              >
                <div className="site-header__drawer-row">
                  <a
                    href={link.href}
                    className={`site-header__drawer-link ${
                      activeHref === link.href ? "is-active" : ""
                    }`}
                    onClick={() => handleNavClick(link.href)}
                  >
                    {link.label}
                  </a>
                  {link.children && (
                    <button
                      type="button"
                      className={`site-header__drawer-caret ${
                        openMobileSubmenu === link.label ? "is-open" : ""
                      }`}
                      aria-label={`Toggle ${link.label} submenu`}
                      aria-expanded={openMobileSubmenu === link.label}
                      onClick={() => toggleMobileSubmenu(link.label)}
                    >
                      <ChevronDown size={16} strokeWidth={2} />
                    </button>
                  )}
                </div>

                {link.children && (
                  <div
                    className={`site-header__drawer-submenu ${
                      openMobileSubmenu === link.label ? "is-open" : ""
                    }`}
                  >
                    <ul>
                      {link.children.map((child) => (
                        <li key={child.href}>
                          <a
                            href={child.href}
                            className="site-header__drawer-submenu-link"
                            onClick={() => handleNavClick(child.href)}
                          >
                            {child.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className="site-header__drawer-footer">
          <a
            href="#contact"
            className="site-header__cta site-header__cta--block"
            onClick={() => handleNavClick("#contact")}
          >
            <span>Get a quote</span>
            <ArrowRight size={16} strokeWidth={2} />
          </a>
        </div>
      </aside>
    </header>
  );
}