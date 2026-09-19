import { useState, useEffect } from "react";

/**
 * useMediaQuery — SSR-safe hook that tracks a CSS media query.
 *
 * Returns `false` during server-side rendering and on the first client
 * render (before hydration), then reactively updates whenever the
 * viewport crosses the breakpoint.
 *
 * @param {string} query  A valid CSS media query string, e.g. "(min-width: 768px)"
 * @returns {boolean}     Whether the media query currently matches
 *
 * @example
 *   const isDesktop = useMediaQuery("(min-width: 768px)");
 */
export function useMediaQuery(query) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    // Guard against SSR where `window` is undefined
    if (typeof window === "undefined") return;

    const mediaQueryList = window.matchMedia(query);
    setMatches(mediaQueryList.matches);

    const handleChange = (event) => setMatches(event.matches);
    mediaQueryList.addEventListener("change", handleChange);

    return () => mediaQueryList.removeEventListener("change", handleChange);
  }, [query]);

  return matches;
}

export default useMediaQuery;
