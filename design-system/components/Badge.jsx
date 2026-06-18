import React from "react";

/**
 * Difficulty badge (.dif-badge) and the early-access pill (.early-access-badge).
 *
 * <Badge difficulty="facil|medio|dificil|muito_dificil">Fácil</Badge>
 * <Badge variant="ea">Acesso Antecipado</Badge>
 */
export function Badge({ difficulty, variant, children, className = "", ...rest }) {
  if (variant === "ea") {
    return (
      <span className={`gf-badge-ea ${className}`.trim()} {...rest}>
        {children}
      </span>
    );
  }
  return (
    <span className={`gf-badge ${difficulty || ""} ${className}`.trim()} {...rest}>
      {children}
    </span>
  );
}

export default Badge;
