import React from "react";

/**
 * A single guess slot (.lbox).
 *  - active:  amber pulsing cursor (the slot being typed)
 *  - decoded: transparent border (revealed glyph state)
 *  - kused:   shows the 🔑 marker (revealed via a decoder key)
 *
 * Children are usually a letter or a glyph <svg>.
 */
export function LetterBox({ active = false, decoded = false, kused = false, children, className = "", ...rest }) {
  const state = [active && "active", decoded && "decoded", kused && "kused"].filter(Boolean).join(" ");
  return (
    <div className={`gf-lbox ${state} ${className}`.trim()} {...rest}>
      {children}
    </div>
  );
}

/** Row wrapper for letter boxes (.lboxes). */
export function LetterBoxes({ children, className = "", ...rest }) {
  return (
    <div className={`gf-lboxes ${className}`.trim()} {...rest}>
      {children}
    </div>
  );
}

export default LetterBox;
