import React from "react";

/**
 * The pill toggle switch (.cfg-switch). Controlled.
 *
 * <Toggle checked={dark} onChange={setDark} aria-label="Tema escuro" />
 */
export function Toggle({ checked = false, onChange, className = "", ...rest }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange && onChange(!checked)}
      className={`gf-switch ${checked ? "on" : ""} ${className}`.trim()}
      {...rest}
    >
      <span className="gf-switch-thumb" />
    </button>
  );
}

export default Toggle;
