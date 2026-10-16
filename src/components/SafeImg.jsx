import { useEffect, useState } from "react";
import { img, FALLBACK_ID } from "../config/images";

/** <img> that swaps to a known-good photo if the original fails to load. */
const SafeImg = ({ src, alt = "", ...rest }) => {
  const [s, setS] = useState(src);
  useEffect(() => setS(src), [src]);
  const fb = img(FALLBACK_ID);
  return <img src={s} alt={alt} onError={() => s !== fb && setS(fb)} {...rest} />;
};

export default SafeImg;
