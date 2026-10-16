import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

/** Two panels sweep up on every page change, and the new page starts at the top. */
const RouteCurtain = () => {
  const { pathname } = useLocation();
  const prev = useRef(pathname);
  const [k, setK] = useState(0);

  useEffect(() => {
    if (prev.current === pathname) return;
    prev.current = pathname;
    window.scrollTo(0, 0);
    setK((n) => n + 1);
  }, [pathname]);

  if (!k) return null;
  return (
    <div key={k} className="curtain" aria-hidden>
      <span className="curtain-a" />
      <span className="curtain-b" />
    </div>
  );
};

export default RouteCurtain;
