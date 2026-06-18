import React from "react";

const CloseIcon = () => <span aria-hidden="true">✕</span>;

/**
 * Bottom-sheet-on-mobile, centered-on-desktop modal (.moverlay / .modal).
 *
 * <Modal open title="Configurações" onClose={...}>
 *   …body…
 * </Modal>
 *
 * Sub-parts also exported for custom layouts:
 *   <ModalTitle>, <ModalSub>, <ModalDivider>, <ModalClose>
 */
export function Modal({ open = true, title, sub, onClose, children, className = "", ...rest }) {
  if (!open) return null;
  return (
    <div
      className="gf-moverlay"
      onClick={(e) => e.target === e.currentTarget && onClose && onClose()}
      {...rest}
    >
      <div className={`gf-modal ${className}`.trim()} role="dialog" aria-modal="true">
        {onClose && <ModalClose onClose={onClose} />}
        {title && <ModalTitle>{title}</ModalTitle>}
        {sub && <ModalSub>{sub}</ModalSub>}
        {children}
      </div>
    </div>
  );
}

export function ModalTitle({ children }) {
  return <div className="gf-modal-title">{children}</div>;
}
export function ModalSub({ children }) {
  return <p className="gf-modal-sub">{children}</p>;
}
export function ModalDivider() {
  return <div className="gf-modal-divider" />;
}
export function ModalClose({ onClose }) {
  return (
    <button type="button" className="gf-mclose" aria-label="Fechar" onClick={onClose}>
      <CloseIcon />
    </button>
  );
}

export default Modal;
