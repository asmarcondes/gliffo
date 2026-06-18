import React from "react";

/**
 * Achievement toast (.ach-popup). Icon + uppercase label + serif name + desc.
 *
 * <AchievementPopup icon="🏅" name="Primeiro Glifo" desc="Você decodificou seu primeiro glifo!" />
 */
export function AchievementPopup({
  icon = "🏅",
  label = "Conquista desbloqueada!",
  name,
  desc,
  className = "",
  ...rest
}) {
  return (
    <output className={`gf-ach-popup ${className}`.trim()} aria-live="polite" {...rest}>
      <div className="gf-ach-popup-icon">{icon}</div>
      <div className="gf-ach-popup-text">
        <div className="gf-ach-popup-label">{label}</div>
        <div className="gf-ach-popup-name">{name}</div>
        {desc && <div className="gf-ach-popup-desc">{desc}</div>}
      </div>
    </output>
  );
}

export default AchievementPopup;
