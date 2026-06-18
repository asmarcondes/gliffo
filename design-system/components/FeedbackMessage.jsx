import React from "react";

/**
 * Inline feedback banner (.fbmsg). `tone`:
 *  "found" (amber) | "err" (red) | "key" (purple) | "warn" (amber) | undefined (neutral).
 */
export function FeedbackMessage({ tone, children, className = "", ...rest }) {
  return (
    <div className={`gf-fbmsg ${tone || ""} ${className}`.trim()} aria-live="polite" {...rest}>
      {children}
    </div>
  );
}

export default FeedbackMessage;
