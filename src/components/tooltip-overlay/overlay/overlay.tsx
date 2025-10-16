import type { TooltipItem } from "../../../shared/types/tour-item/tour-item.type";

interface OverlayProps {
  item: TooltipItem;
  x: number;
  y: number;
}

import { createPortal } from "react-dom";

export default function Overlay({ item, x, y }: OverlayProps) {
  return createPortal(
    <div
      style={{
        position: "absolute",
        top: `${y}px`,
        left: `${x}px`,
        transform: "translate(-50%, -100%)",
        background: "white",
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "8px",
        zIndex: 999999,
        boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
        maxWidth: "200px"
      }}
    >
      <img src={`http://localhost:3000${item.image}`} alt="" style={{ width: "100%", borderRadius: "4px" }} />
      <h4 style={{ margin: "4px 0" }}>{item.title}</h4>
      <p style={{ fontSize: "12px", color: "#555" }}>{item.description}</p>
    </div>,
    document.body
  );
}
