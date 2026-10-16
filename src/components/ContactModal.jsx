import { useEffect } from "react";
import { useContactModal } from "../context/ContactModalContext";
import ContactForm from "./ContactForm";

const ContactModal = () => {
  const { isOpen, closeContactModal } = useContactModal();

  // Close on Escape, and stop the page behind the modal from scrolling
  // while it's open.
  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (ev) => {
      if (ev.key === "Escape") closeContactModal();
    };
    document.addEventListener("keydown", onKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen, closeContactModal]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start sm:items-center justify-center p-4 sm:p-6 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-modal-title"
    >
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Close contact form"
        onClick={closeContactModal}
        className="fixed inset-0 bg-ink/70 backdrop-blur-sm animate-fade-up"
        style={{ animationDuration: "200ms" }}
      />

      {/* Panel */}
      <div className="relative bg-sand w-full max-w-xl mt-8 sm:mt-0 border border-line shadow-2xl animate-fade-up">
        <button
          type="button"
          onClick={closeContactModal}
          aria-label="Close"
          className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center rounded-full bg-white border border-line hover:bg-ink hover:text-white hover:border-ink transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
          </svg>
        </button>

        <div className="p-6 sm:p-10 max-h-[85vh] overflow-y-auto">
          <span className="eyebrow">// Get in touch</span>
          <h2 id="contact-modal-title" className="font-display text-2xl sm:text-3xl mt-2">
            Let&apos;s talk today
          </h2>
          <p className="text-stone text-sm mt-2 mb-8">
            Send your details for a quick, reliable response.
          </p>
          <ContactForm />
        </div>
      </div>
    </div>
  );
};

export default ContactModal;
