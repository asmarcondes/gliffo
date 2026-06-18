import React from "react";

const Chevron = () => (
  <svg
    className="gf-cfg-row-chevron"
    viewBox="0 0 24 24"
    width="16"
    height="16"
    stroke="currentColor"
    fill="none"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M9 18l6-6-6-6" />
  </svg>
);

/**
 * A settings row (.cfg-row): emoji icon, label + sub-label, and a trailing
 * control — either a <Toggle> (pass `control`) or a navigation chevron
 * (pass `chevron`).
 *
 * <ConfigRow icon="🌙" label="Tema escuro" sub="Ativado"
 *            control={<Toggle checked onChange={...} />} />
 * <ConfigRow icon="🎯" label="Modo Prática" sub="Palavra aleatória" chevron onClick={...} />
 */
export function ConfigRow({
  icon,
  label,
  sub,
  control,
  chevron = false,
  disabled = false,
  onClick,
  className = "",
  ...rest
}) {
  // A row that contains its own interactive control (e.g. a <Toggle>) must NOT
  // itself be a <button> — nested buttons are invalid HTML. Only rows that act
  // as a single tap target (chevron / onClick, no inner control) become buttons.
  const interactive = !control && (chevron || onClick);
  const Tag = interactive ? "button" : "div";
  return (
    <Tag
      type={interactive ? "button" : undefined}
      onClick={onClick}
      className={`gf-cfg-row ${disabled ? "disabled" : ""} ${className}`.trim()}
      {...rest}
    >
      <div className="gf-cfg-row-left">
        {icon && <span className="gf-cfg-row-icon">{icon}</span>}
        <div>
          <div className="gf-cfg-row-label">{label}</div>
          {sub && <div className="gf-cfg-row-sub">{sub}</div>}
        </div>
      </div>
      {control ?? (chevron ? <Chevron /> : null)}
    </Tag>
  );
}

/** Thin divider between config rows (.cfg-divider). */
export function ConfigDivider() {
  return <div className="gf-cfg-divider" />;
}

export default ConfigRow;
