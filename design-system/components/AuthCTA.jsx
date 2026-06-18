import React from "react";
import { Button } from "./Button.jsx";

/**
 * The "save your progress" call-to-action (.auth-cta) shown in win/lose modals.
 *
 * <AuthCTA
 *   title="Salvar seu progresso na nuvem?"
 *   note="Ao jogar em outro aparelho, seus resultados não serão perdidos."
 *   action="Criar Conta Gratuita"
 *   onAction={...} onDismiss={...} />
 */
export function AuthCTA({
  icon = "👤",
  title,
  note,
  action = "Criar Conta Gratuita",
  dismissLabel = "Agora não",
  onAction,
  onDismiss,
  className = "",
  ...rest
}) {
  return (
    <div className={`gf-auth-cta ${className}`.trim()} {...rest}>
      <div className="gf-auth-cta-icon">{icon}</div>
      <div className="gf-auth-cta-text">
        <strong>{title}</strong>
        {note && (
          <>
            <br />
            <span style={{ fontSize: "0.85em", opacity: 0.8 }}>{note}</span>
          </>
        )}
      </div>
      <Button variant="auth" onClick={onAction}>{action}</Button>
      {onDismiss && (
        <button type="button" className="gf-auth-dismiss" onClick={onDismiss}>
          {dismissLabel}
        </button>
      )}
    </div>
  );
}

export default AuthCTA;
