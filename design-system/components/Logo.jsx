import React from "react";

/**
 * The glif.foo wordmark (.logo). Serif "glif", amber dot, light-weight "foo".
 */
export function Logo({ href = "#", className = "", ...rest }) {
  return (
    <a href={href} className={`gf-logo ${className}`.trim()} {...rest}>
      <span className="gf-logo-text">glif</span>
      <span className="gf-logo-dot">.</span>
      <span className="gf-logo-foo">foo</span>
    </a>
  );
}

export default Logo;
