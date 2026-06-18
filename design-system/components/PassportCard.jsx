import React from "react";
import { StatCard } from "./StatGrid.jsx";

/**
 * The stats "passport" (.passport-card): gradient card with a 4-up stat grid,
 * a serif title/subtitle header, a faint corner glyph, and an optional footer
 * area below the divider (distribution chart, rank banner, etc.).
 *
 * <PassportCard subtitle="glif.foo" glyph={<svg.../>} stats={[{value,label},…]}>
 *   …distribution…
 * </PassportCard>
 */
export function PassportCard({ subtitle = "glif.foo", glyph, stats = [], children, className = "", ...rest }) {
  return (
    <div className={`gf-passport ${className}`.trim()} {...rest}>
      <div className="gf-passport-header">
        <div className="gf-passport-subtitle">{subtitle}</div>
        {glyph && <div className="gf-passport-glyph">{glyph}</div>}
      </div>
      <div className="gf-passport-grid">
        {stats.map((s, i) => (
          <StatCard key={i} value={s.value} label={s.label} />
        ))}
      </div>
      {children && <div className="gf-passport-divider" />}
      {children}
    </div>
  );
}

export default PassportCard;
