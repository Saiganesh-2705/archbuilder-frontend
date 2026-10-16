import { useEffect, useRef, useState } from "react";
import { contactAPI } from "../services/api";
import { SITE } from "../config/site";

const options = [
  { label: "Building Construction", icon: "M3 21V9l9-6 9 6v12M9 21v-6h6v6" },
  { label: "Interior Design", icon: "M4 20V10a2 2 0 012-2h12a2 2 0 012 2v10M2 20h20M7 8V5a2 2 0 012-2h6a2 2 0 012 2v3" },
  { label: "Renovation", icon: "M14.7 6.3a4 4 0 00-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 005.4-5.4l-2.6 2.6-2.4-.6-.6-2.4z" },
  { label: "Commercial Project", icon: "M4 21V5a1 1 0 011-1h8a1 1 0 011 1v16M14 9h5a1 1 0 011 1v11M8 8h2M8 12h2M8 16h2M2 21h20" },
];

const phoneOk = (v) => /^(\+?91[\s-]?)?[6-9]\d{9}$/.test(v.replace(/[\s-]/g, ""));
const emailOk = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

// Is the office open right now (India time)? Uses the hours in config/site.js.
const isOpenNow = () => {
  const ist = new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" }));
  const h = ist.getHours() + ist.getMinutes() / 60;
  return ist.getDay() === 0 ? h >= 9 && h < 14 : h >= 7 && h < 20;
};

const Field = ({ id, label, error, inputRef, ...props }) => (
  <div className="relative">
    <input
      id={id}
      ref={inputRef}
      placeholder=" "
      aria-invalid={!!error}
      className={`peer w-full border bg-white px-4 pt-6 pb-2 text-[15px] outline-none transition-colors rounded-lg focus:border-ink ${error ? "border-red-500" : "border-ink/15"}`}
      {...props}
    />
    <label
      htmlFor={id}
      className="pointer-events-none absolute left-4 top-2 text-[11px] font-semibold text-stone transition-all duration-200 peer-placeholder-shown:top-4 peer-placeholder-shown:text-[15px] peer-placeholder-shown:font-normal peer-focus:top-2 peer-focus:text-[11px] peer-focus:font-semibold peer-focus:text-ink"
    >
      {label}
    </label>
    {error && <p className="text-red-600 text-xs mt-1">{error}</p>}
  </div>
);

const QuoteModal = ({ onClose }) => {
  const [step, setStep] = useState(1);
  const [dir, setDir] = useState("fwd");
  const [type, setType] = useState(options[0].label);
  const [form, setForm] = useState({ name: "", phone: "", email: "" });
  const [showEmail, setShowEmail] = useState(false);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error
  const [serverMsg, setServerMsg] = useState("");
  const [closing, setClosing] = useState(false);
  const [open] = useState(isOpenNow);
  const panelRef = useRef(null);
  const nameRef = useRef(null);

  const requestClose = () => {
    if (closing) return;
    setClosing(true);
    setTimeout(onClose, 220);
  };

  useEffect(() => {
    const prevFocus = document.activeElement;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e) => {
      if (e.key === "Escape") requestClose();
      if (e.key !== "Tab" || !panelRef.current) return;
      const f = panelRef.current.querySelectorAll("button:not([disabled]), input, a[href]");
      if (!f.length) return;
      const first = f[0];
      const last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      prevFocus?.focus?.();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (step === 2) setTimeout(() => nameRef.current?.focus(), 150);
  }, [step]);

  const go = (n) => { setDir(n > step ? "fwd" : "back"); setStep(n); };
  const set = (k) => (e) => {
    setForm((f) => ({ ...f, [k]: e.target.value }));
    setErrors((er) => ({ ...er, [k]: undefined }));
  };

  const submit = async (e) => {
    e.preventDefault();
    const er = {};
    if (!form.name.trim()) er.name = "Enter your name.";
    if (!form.phone.trim()) er.phone = "Enter your mobile number.";
    else if (!phoneOk(form.phone)) er.phone = "Enter a valid 10-digit mobile number.";
    if (form.email.trim() && !emailOk(form.email)) er.email = "Enter a valid email address.";
    if (Object.keys(er).length) return setErrors(er);

    setStatus("submitting");
    setServerMsg("");
    try {
      await contactAPI.submit({
        name: form.name.trim(),
        phone: form.phone.trim(),
        email: form.email.trim(),
        projectType: type,
        message: `Free quote request: ${type}`,
      });
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setServerMsg(err.response?.data?.message || "Could not send your request. Please try again.");
    }
  };

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-end sm:items-center justify-center sm:p-6 bg-ink/60 backdrop-blur-sm ${closing ? "animate-modal-out" : "animate-modal-fade"}`}
      onMouseDown={(e) => e.target === e.currentTarget && requestClose()}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="quote-title"
        className={`quote-panel relative w-full sm:max-w-[420px] max-h-[96vh] overflow-y-auto bg-white shadow-2xl rounded-t-2xl sm:rounded-2xl ${closing ? "animate-panel-out" : "animate-panel-in"}`}
      >
        {/* Header */}
        <div className="relative bg-ink text-white px-6 pt-6 pb-7 overflow-hidden">
          <svg viewBox="0 0 120 80" className="absolute -right-2 -bottom-2 w-36 opacity-40" fill="none" stroke="#F5B400" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path className="draw-path" pathLength="1" d="M4 76 H116 M18 76 V44 L50 20 L82 44 V76 M40 76 V58 H60 V76 M92 76 V30 H108 V76 M92 40 H108 M92 52 H108" />
          </svg>

          <span className="inline-flex items-center gap-2 text-xs font-semibold bg-white/10 rounded-full pl-2.5 pr-3 py-1">
            <span className={`live-dot relative w-2 h-2 rounded-full ${open ? "bg-emerald-400" : "bg-amber"}`} />
            {open ? "Team online now" : "Office closed, we'll call you when we open"}
          </span>

          <h2 id="quote-title" className="font-display font-extrabold text-2xl mt-4 leading-tight relative">
            Get your free quote
          </h2>
          <p className="text-white/65 text-sm mt-1 relative">Two quick steps. No spam, no obligation.</p>

          <button
            onClick={requestClose}
            aria-label="Close quote form"
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-amber hover:text-ink hover:rotate-90 transition-all duration-300 flex items-center justify-center"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg>
          </button>
        </div>

        {/* Progress */}
        <div className="flex gap-1.5 px-6 pt-5" aria-hidden>
          {[1, 2].map((n) => (
            <span key={n} className="h-1 flex-1 rounded-full bg-ink/10 overflow-hidden">
              <span className="block h-full bg-amber origin-left transition-transform duration-500" style={{ transform: step >= n || status === "success" ? "scaleX(1)" : "scaleX(0)" }} />
            </span>
          ))}
        </div>

        <div className="px-6 pt-5 pb-6">
          {status === "success" ? (
            <div className="text-center py-6 step-in" role="status">
              <svg viewBox="0 0 52 52" className="w-16 h-16 mx-auto" fill="none" strokeWidth="3" aria-hidden>
                <circle className="draw-path" pathLength="1" cx="26" cy="26" r="23" stroke="#F5B400" />
                <path className="draw-path draw-delay" pathLength="1" d="M15 27l8 8 14-16" stroke="#111" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <h3 className="font-display font-extrabold text-xl mt-4">Request received</h3>
              <p className="text-stone text-sm mt-1">We'll call you about your {type.toLowerCase()} shortly.</p>
              <button onClick={requestClose} className="btn-dark mt-6">Close</button>
            </div>
          ) : step === 1 ? (
            <div key="s1" className={dir === "back" ? "step-back" : "step-in"}>
              <p className="font-semibold text-sm">What are you planning?</p>
              <div className="grid grid-cols-2 gap-3 mt-3" role="radiogroup" aria-label="Project type">
                {options.map((o) => {
                  const on = type === o.label;
                  return (
                    <button
                      key={o.label}
                      type="button"
                      role="radio"
                      aria-checked={on}
                      onClick={() => setType(o.label)}
                      className={`group relative text-left rounded-xl border p-3.5 transition-all duration-200 ${on ? "border-ink bg-ink text-white -translate-y-0.5 shadow-lg" : "border-ink/15 hover:border-ink/50"}`}
                    >
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={on ? "#F5B400" : "#111"} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110"><path d={o.icon} /></svg>
                      <span className="block text-[13px] font-semibold mt-2.5 leading-snug">{o.label}</span>
                      {on && <span className="absolute top-2.5 right-2.5 w-4 h-4 rounded-full bg-amber text-ink flex items-center justify-center text-[10px] font-bold">&#10003;</span>}
                    </button>
                  );
                })}
              </div>
              <button onClick={() => go(2)} className="quote-submit w-full bg-ink text-white rounded-lg py-3.5 mt-5 font-semibold text-sm flex items-center justify-center gap-2">
                Continue
                <svg className="arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
              </button>
            </div>
          ) : (
            <form key="s2" onSubmit={submit} noValidate className={`space-y-3 ${dir === "back" ? "step-back" : "step-in"}`}>
              <p className="text-sm text-stone">
                For <span className="font-semibold text-ink">{type}</span>{" "}
                <button type="button" onClick={() => go(1)} className="underline underline-offset-2 hover:text-ink">change</button>
              </p>
              <Field id="q-name" label="Your name" value={form.name} onChange={set("name")} autoComplete="name" inputRef={nameRef} error={errors.name} />
              <Field id="q-phone" label="Mobile number" type="tel" inputMode="tel" value={form.phone} onChange={set("phone")} autoComplete="tel" error={errors.phone} />
              {showEmail ? (
                <div className="step-in"><Field id="q-email" label="Email (optional)" type="email" value={form.email} onChange={set("email")} autoComplete="email" error={errors.email} /></div>
              ) : (
                <button type="button" onClick={() => setShowEmail(true)} className="text-xs font-semibold text-stone hover:text-ink transition-colors">+ Add email (optional)</button>
              )}

              <button type="submit" disabled={status === "submitting"} className="quote-submit w-full bg-ink text-white rounded-lg py-3.5 font-semibold text-sm flex items-center justify-center gap-2 disabled:opacity-60">
                {status === "submitting" ? "Sending..." : "Get free quote"}
                {status !== "submitting" && (
                  <svg className="arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                )}
              </button>
              {status === "error" && <p className="text-red-600 text-xs" role="alert">{serverMsg}</p>}
              <div className="flex items-center justify-between text-xs text-stone pt-1">
                <button type="button" onClick={() => go(1)} className="hover:text-ink transition-colors">&larr; Back</button>
                <a href={`tel:${SITE.phones[0].replace(/\s/g, "")}`} className="hover:text-ink transition-colors">Or call {SITE.phones[0]}</a>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuoteModal;
