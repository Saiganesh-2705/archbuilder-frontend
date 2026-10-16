import { useLocation } from "react-router-dom";
import { SITE } from "../config/site";

const FloatingWhatsApp = () => {
  const { pathname } = useLocation();
  if (pathname.startsWith("/admin")) return null;
  const href = `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent("Hi, I would like a quote for my project.")}`;
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      className="wa-btn group fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-xl hover:scale-110 transition-transform"
    >
      <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M12.04 2a9.9 9.9 0 00-8.4 15.1L2 22l5-1.6A9.9 9.9 0 1012.04 2zm5.8 14.1c-.25.7-1.4 1.3-1.95 1.35-.5.05-1.1.07-1.8-.12-.4-.13-.95-.3-1.6-.6-2.8-1.2-4.6-4-4.75-4.2-.14-.2-1.1-1.5-1.1-2.8s.7-1.95.95-2.2c.25-.27.55-.33.73-.33h.52c.17 0 .4-.06.6.45.25.6.85 2.1.9 2.25.07.15.12.32.02.5-.1.2-.15.32-.3.5-.15.17-.32.37-.45.5-.15.15-.3.3-.13.6.17.3.77 1.27 1.65 2.05 1.15 1 2.1 1.3 2.4 1.45.3.15.47.12.65-.07.17-.2.75-.87.95-1.17.2-.3.4-.25.67-.15.27.1 1.7.8 2 .95.3.15.5.22.57.35.07.12.07.7-.18 1.4z" /></svg>
      <span className="absolute right-16 bg-ink text-white text-xs font-semibold px-3 py-2 rounded whitespace-nowrap opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all pointer-events-none">
        Chat with us
      </span>
    </a>
  );
};

export default FloatingWhatsApp;
