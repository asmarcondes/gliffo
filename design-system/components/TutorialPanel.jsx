import React from "react";
import { ModalClose } from "./Modal.jsx";

/**
 * Chat-style tutorial panel shell (.tut-panel + .tut-chat-header/.tut-chat-feed).
 * The mascot "Gliffo" speaks in cards. `messages` is an array of nodes rendered
 * as feed cards; `footer` (optional) holds choices / fake input.
 *
 * <TutorialPanel agentName="Gliffo" onClose={...}
 *   messages={["Olá! Eu sou o Gliffo.", "Vou te ensinar a decodificar."]} />
 */
export function TutorialPanel({
  agentName = "Gliffo",
  avatar = "✦",
  messages = [],
  footer,
  onClose,
  className = "",
  ...rest
}) {
  return (
    <div className={`gf-tut-panel ${className}`.trim()} {...rest}>
      <div className="gf-tut-chat-header">
        <div className="gf-tut-agent-avatar">{avatar}</div>
        <span className="gf-tut-agent-name">{agentName}</span>
        {onClose && <ModalClose onClose={onClose} />}
      </div>
      <div className="gf-tut-chat-feed">
        {messages.map((m, i) => (
          <div className="gf-tut-chat-card" key={i}>
            {m}
          </div>
        ))}
      </div>
      {footer}
    </div>
  );
}

export default TutorialPanel;
