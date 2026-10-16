import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import QuoteModal from "../components/QuoteModal";

const QuoteContext = createContext({ openQuote: () => {}, closeQuote: () => {} });
export const useQuote = () => useContext(QuoteContext);

// The popup opens on every fresh load or refresh of the site (once per load,
// not again while the visitor clicks around).
let shownThisLoad = false;
// If the intro animation already played this session, don't wait for it.
const introAlreadyPlayed = (() => {
  try { return !!sessionStorage.getItem("bw_intro"); } catch { return false; }
})();
const AUTO_OPEN_DELAY = introAlreadyPlayed ? 1200 : 2800; // ms after load
// Pages where the popup must NOT appear on its own.
const NO_AUTO_PREFIXES = ["/contact", "/admin"];
const skipAuto = (path) => NO_AUTO_PREFIXES.some((p) => path.startsWith(p));

export const QuoteProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const firstPath = useRef(pathname);

  const openQuote = useCallback(() => setOpen(true), []);
  const closeQuote = useCallback(() => setOpen(false), []);

  // Opens on the first page that is not /contact. If the visitor lands on
  // /contact first, it waits until they open another page.
  useEffect(() => {
    if (shownThisLoad || skipAuto(pathname)) return undefined;
    const delay = pathname === firstPath.current ? AUTO_OPEN_DELAY : 1000;
    const t = setTimeout(() => {
      if (shownThisLoad) return;
      shownThisLoad = true;
      setOpen(true);
    }, delay);
    return () => clearTimeout(t);
  }, [pathname]);

  const value = useMemo(() => ({ openQuote, closeQuote }), [openQuote, closeQuote]);

  return (
    <QuoteContext.Provider value={value}>
      {children}
      {open && <QuoteModal onClose={closeQuote} />}
    </QuoteContext.Provider>
  );
};
