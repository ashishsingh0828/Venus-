import { useEffect, useState } from "react";
import ProductsSlider from "./ProductSlider";

export default function ServiceProjectsSlider({ serviceId, fallback: Fallback = ProductsSlider }) {
  const [state, setState] = useState({ status: "loading", service: null });

  useEffect(() => {
    let cancelled = false;
    fetch(`/api/services/${encodeURIComponent(serviceId)}`)
      .then((res) => {
        if (!res.ok) throw new Error("API failed");
        return res.json();
      })
      .then((data) => {
        if (cancelled) return;
        if (data.success && data.data) {
          setState({ status: "ready", service: data.data });
        } else {
          setState({ status: "error", service: null });
        }
      })
      .catch(() => {
        if (!cancelled) setState({ status: "error", service: null });
      });
    return () => {
      cancelled = true;
    };
  }, [serviceId]);

  if (state.status === "loading") return null;
  if (state.status === "error") return <Fallback />;

  const projects = Array.isArray(state.service.projects) ? state.service.projects : [];
  if (projects.length === 0) return null;

  return (
    <ProductsSlider
      key={state.service.id}
      products={projects}
      eyebrow="Our Projects"
      title={state.service.title}
    />
  );
}
