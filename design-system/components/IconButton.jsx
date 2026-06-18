import React from "react";

/**
 * Header icon button (.hbtn). Renders an inline SVG-friendly 36×36 button.
 *
 * Props:
 *  - accent: bool   → amber color + amber hover wash (.hbtn.accent), e.g. the key button
 *  - dot: bool      → small amber indicator dot in the corner (.key-dot.show)
 *  - title/aria-label for accessibility
 *  - children: the <svg> icon (24×24 viewBox, stroke-based)
 */
export function IconButton({
  accent = false,
  dot = false,
  title,
  children,
  className = "",
  ...rest
}) {
  return (
    <button
      type="button"
      title={title}
      aria-label={rest["aria-label"] || title}
      className={`gf-iconbtn ${accent ? "gf-accent" : ""} ${className}`.trim()}
      {...rest}
    >
      {children}
      {dot && <span className="gf-dot" aria-hidden="true" />}
    </button>
  );
}

export default IconButton;
