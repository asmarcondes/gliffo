import React from "react";

const ROWS = ["QWERTYUIOP", "ASDFGHJKL", "ZXCVBNM"];

/**
 * Virtual keyboard (.keyboard). `keyStates` maps an uppercase letter to one of:
 *  "elim" | "dimmed" | "found-key" | "correct-key"  (matches the game's classes).
 * `onKey(letter)` fires on press. Pass `enterKey`/`backspaceKey` to render the
 * wide action keys at the ends of the last row.
 */
export function Keyboard({
  keyStates = {},
  onKey,
  enterKey = null,
  backspaceKey = null,
  className = "",
}) {
  const renderKey = (ch) => (
    <button
      key={ch}
      type="button"
      className={`gf-kbtn ${keyStates[ch] || ""}`.trim()}
      onClick={() => onKey && onKey(ch)}
    >
      {ch}
    </button>
  );

  return (
    <div className={`gf-keyboard ${className}`.trim()} aria-label="Teclado virtual">
      {ROWS.map((row, i) => (
        <div className="gf-krow" key={i}>
          {i === 2 && enterKey && (
            <button type="button" className="gf-kbtn wide" onClick={() => onKey && onKey("ENTER")}>
              {enterKey}
            </button>
          )}
          {row.split("").map(renderKey)}
          {i === 2 && backspaceKey && (
            <button type="button" className="gf-kbtn wide" onClick={() => onKey && onKey("BACKSPACE")}>
              {backspaceKey}
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

export default Keyboard;
