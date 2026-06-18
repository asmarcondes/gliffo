import React from "react";

/**
 * Countdown to the next puzzle (.countdown-block). Big serif tabular timer.
 *
 * <CountdownBlock label="Próximo glifo em" time="08:42:13" />
 */
export function CountdownBlock({ label = "Próximo glifo em", time = "--:--:--", className = "", ...rest }) {
  return (
    <div className={`gf-countdown ${className}`.trim()} {...rest}>
      <div className="gf-countdown-label">{label}</div>
      <div className="gf-countdown-timer">{time}</div>
    </div>
  );
}

export default CountdownBlock;
