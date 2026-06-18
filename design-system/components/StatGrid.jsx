import React from "react";

/**
 * A single stat tile (.stat-card): big serif value + small uppercase label.
 */
export function StatCard({ value, label, className = "", ...rest }) {
  return (
    <div className={`gf-stat-card ${className}`.trim()} {...rest}>
      <div className="gf-stat-val">{value}</div>
      <div className="gf-stat-lbl">{label}</div>
    </div>
  );
}

/**
 * 3-column stat grid (.stats-grid). Pass `stats` as [{value,label}, …]
 * or supply <StatCard> children directly.
 */
export function StatGrid({ stats, children, className = "", ...rest }) {
  return (
    <div className={`gf-stats-grid ${className}`.trim()} {...rest}>
      {stats
        ? stats.map((s, i) => <StatCard key={i} value={s.value} label={s.label} />)
        : children}
    </div>
  );
}

export default StatGrid;
