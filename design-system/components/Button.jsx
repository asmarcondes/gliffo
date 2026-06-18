import React from "react";

/**
 * Gliffo button.
 *
 * Variants map 1:1 to the game's CSS:
 *  - "primary"  → .dbtn / .kuse-btn  (full-width amber, dark text)
 *  - "share"    → .sbtn              (full-width green)
 *  - "outline"  → .passport-share-btn (amber outline, transparent)
 *  - "auth"     → .auth-btn          (amber, used inside the auth CTA)
 *
 * For header icon buttons use <IconButton>.
 */
export function Button({
  variant = "primary",
  type = "button",
  disabled = false,
  children,
  className = "",
  ...rest
}) {
  const cls = {
    primary: "gf-btn-primary",
    share: "gf-btn-share",
    outline: "gf-btn-outline",
    auth: "gf-auth-btn",
  }[variant] || "gf-btn-primary";

  return (
    <button type={type} disabled={disabled} className={`${cls} ${className}`.trim()} {...rest}>
      {children}
    </button>
  );
}

export default Button;
