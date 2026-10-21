import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import "./PdfDocuments.css";

const COMPANY = "Venus Hospital Door Solutions";

/*
  PDF files live in:  public/assets/images/pdf/
  Do NOT write "public" in the URL. Everything inside "public" is served
  from the site root, so the URL starts with /assets/images/pdf/
  File names are case sensitive on most servers (IEC.pdf is not iec.pdf).

  expiry: use "YYYY-MM-DD", or null when the certificate has no expiry date.
  The Valid / Expired badge is worked out automatically from today's date.
*/
const DOCUMENTS = [
  {
    id: "iso-9001",
    icon: "quality",
    category: "Quality",
    title: "ISO 9001:2015",
    subtitle: "Quality Management System",
    description: "Manufacturing of operation theatre sliding doors.",
    number: "QMS/029821/0922",
    issuer: "Quality Control Certification",
    issued: "2022-09-02",
    expiry: "2025-09-01",
    file: "/assets/images/pdf/hospital.pdf",
  },
  {
    id: "compliance",
    icon: "compliance",
    category: "Compliance",
    title: "Certificate of Compliance",
    subtitle: "Medical Device Directive 93/42/EEC",
    description:
      "Hospital hinged and sliding doors, surgical pendant and surgical scrub sink.",
    number: "CE/D69E/0424",
    issuer: "Quality Control Certification",
    issued: "2024-04-25",
    expiry: "2027-04-24",
    file: "/assets/images/pdf/final.pdf",
  },
  {
    id: "iec",
    icon: "trade",
    category: "Trade",
    title: "Importer-Exporter Code",
    subtitle: "Government of India, DGFT",
    description: "Registered code that allows us to import and export goods.",
    number: "GYLPP4794R",
    issuer: "Directorate General of Foreign Trade",
    issued: "2024-04-23",
    expiry: null,
    file: "/assets/images/pdf/IEC.pdf",
  },
];

const fmt = (iso) =>
  new Intl.DateTimeFormat("en-AU", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(iso));

function getStatus(expiry) {
  if (!expiry) return { kind: "open", label: "No expiry date" };
  const expired = new Date(`${expiry}T23:59:59Z`) < new Date();
  return expired
    ? { kind: "expired", label: `Expired ${fmt(expiry)}` }
    : { kind: "valid", label: `Valid until ${fmt(expiry)}` };
}

/* ---------- Icons ---------- */
const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

function CardIcon({ name }) {
  return (
    <svg viewBox="0 0 24 24" width="30" height="30" aria-hidden="true" {...stroke}>
      {name === "quality" && (
        <>
          <path d="M12 3l7 3v5c0 4.5-3 8.2-7 10-4-1.8-7-5.5-7-10V6l7-3z" />
          <path d="M9 12l2 2 4-4" />
        </>
      )}
      {name === "compliance" && (
        <>
          <path d="M9 4h6v3H9z" />
          <path d="M9 5.5H6.5A1.5 1.5 0 0 0 5 7v13a1.5 1.5 0 0 0 1.5 1.5h11A1.5 1.5 0 0 0 19 20V7a1.5 1.5 0 0 0-1.5-1.5H15" />
          <path d="M9 14l2 2 4-4" />
        </>
      )}
      {name === "trade" && (
        <>
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18" />
          <path d="M12 3c3.2 3 3.2 15 0 18" />
          <path d="M12 3c-3.2 3-3.2 15 0 18" />
        </>
      )}
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" {...stroke} strokeWidth="2.6">
      <path d="M5 5l14 14M19 5L5 19" />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" {...stroke} strokeWidth="2.2">
      <path d="M12 4v11M7 11l5 5 5-5M5 20h14" />
    </svg>
  );
}

function EyeIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" {...stroke} strokeWidth="2.2">
      <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

/* ---------- Modal ---------- */
function PdfModal({ doc, onClose }) {
  const closeBtnRef = useRef(null);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeBtnRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose]);

  // Rendered into document.body so it always sits above headers and menus
  return createPortal(
    <div
      className="pdfm-overlay"
      role="dialog"
      aria-modal="true"
      aria-label={doc.title}
      onClick={onClose}
    >
      <div className="pdfm-window" onClick={(e) => e.stopPropagation()}>
        <header className="pdfm-bar">
          <div className="pdfm-heading">
            <h3 className="pdfm-title">{doc.title}</h3>
            <p className="pdfm-meta">{doc.number}</p>
          </div>

          <a className="pdfm-download" href={doc.file} download>
            <DownloadIcon />
            <span className="pdfm-btn-text">Download</span>
          </a>

          <button
            ref={closeBtnRef}
            type="button"
            className="pdfm-close"
            onClick={onClose}
            aria-label="Close certificate"
          >
            <CloseIcon />
            <span className="pdfm-btn-text">Close</span>
          </button>
        </header>

        <div className="pdfm-body">
          <iframe
            className="pdfm-frame"
            src={`${doc.file}#view=FitH`}
            title={doc.title}
          />
          <p className="pdfm-fallback">
            Can't see the certificate?{" "}
            <a href={doc.file} target="_blank" rel="noopener noreferrer">
              Open the PDF in a new tab
            </a>
            .
          </p>
        </div>
      </div>
    </div>,
    document.body
  );
}

/* ---------- Section ---------- */
export default function PdfDocuments() {
  const [active, setActive] = useState(null);
  const close = useCallback(() => setActive(null), []);

  return (
    <section className="pdfd" aria-labelledby="pdfd-heading">
      <div className="pdfd-inner">
        <div className="pdfd-head">
          <h2 className="pdfd-heading" id="pdfd-heading">
            Certifications
          </h2>
          <p className="pdfd-sub">
            Quality, compliance and trade registrations held by {COMPANY}.
            Open any certificate to read the original document.
          </p>
        </div>

        <ul className="pdfd-grid">
          {DOCUMENTS.map((doc) => {
            const status = getStatus(doc.expiry);
            return (
              <li key={doc.id} className="pdfd-item">
                <article className="pdfd-card">
                  <div className="pdfd-top">
                    <span className="pdfd-badge">
                      <CardIcon name={doc.icon} />
                    </span>
                    <span className="pdfd-category">{doc.category}</span>
                  </div>

                  <div className="pdfd-main">
                    <h3 className="pdfd-card-title">{doc.title}</h3>
                    <p className="pdfd-card-sub">{doc.subtitle}</p>
                    <p className="pdfd-card-text">{doc.description}</p>

                    <dl className="pdfd-facts">
                      <div>
                        <dt>Number</dt>
                        <dd>{doc.number}</dd>
                      </div>
                      <div>
                        <dt>Issued by</dt>
                        <dd>{doc.issuer}</dd>
                      </div>
                      <div>
                        <dt>Issued</dt>
                        <dd>{fmt(doc.issued)}</dd>
                      </div>
                    </dl>

                    <span className={`pdfd-status pdfd-status--${status.kind}`}>
                      {status.label}
                    </span>
                  </div>

                  <div className="pdfd-actions">
                    <button
                      type="button"
                      className="pdfd-view"
                      onClick={() => setActive(doc)}
                      aria-haspopup="dialog"
                    >
                      <EyeIcon />
                      View certificate
                    </button>
                    <a className="pdfd-save" href={doc.file} download aria-label={`Download ${doc.title}`}>
                      <DownloadIcon />
                    </a>
                  </div>
                </article>
              </li>
            );
          })}
        </ul>
      </div>

      {active && <PdfModal doc={active} onClose={close} />}
    </section>
  );
}