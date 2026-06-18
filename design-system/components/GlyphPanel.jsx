import React from "react";

/**
 * A glyph tile (.gpanel) with its floating pill tag (.gpanel-tag).
 * The glyph itself is whatever you put in `children` — typically stacked
 * <svg> layers, the game's signature visual. Use `daily` for the amber tag.
 *
 * <GlyphPanel tag="Glifo do Dia" daily>{svgLayers}</GlyphPanel>
 */
export function GlyphPanel({ tag, daily = false, children, className = "", ...rest }) {
  return (
    <div className={`gf-gpanel-wrap ${className}`.trim()} {...rest}>
      {tag && <div className={`gf-gpanel-tag ${daily ? "daily" : ""}`.trim()}>{tag}</div>}
      <div className="gf-gpanel">
        <div className="gf-gstage">
          <div className="gf-glyph-stack">{children}</div>
        </div>
      </div>
    </div>
  );
}

export default GlyphPanel;
