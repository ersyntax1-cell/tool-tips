import { useEffect, useState } from "react";
import { getSmartTips } from "../../shared/api/smart-tips/smart-tips.api";
import type { TooltipItem } from "../../shared/types/tour-item/tour-item.type";
import Overlay from "./overlay/overlay";

function buildSafeSelector(selector: string) {
  if (selector.startsWith("#")) return selector;
  const classes = selector.split(" ");
  const escapedClasses = classes.map(c => `.${CSS.escape(c)}`);
  return escapedClasses.join("");
}

export default function ToolTipOverlay() {
  const [tips, setTips] = useState<TooltipItem[]>([]);
  const [activeTip, setActiveTip] = useState<TooltipItem | null>(null);
  const [coords, setCoords] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    async function fetchTips() {
      try {
        const data = await getSmartTips();
        setTips(data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchTips();
  }, []);

  useEffect(() => {
    if (!tips.length) return;

    const handlers: { el: HTMLElement; onEnter: EventListener; onLeave: EventListener }[] = [];

    tips.forEach((tip) => {
      let safeSelector = buildSafeSelector(tip.selector);
      let elements: NodeListOf<HTMLElement>;

      try {
        elements = document.querySelectorAll<HTMLElement>(safeSelector);
      } catch (err) {
        console.warn(`Invalid selector skipped: ${tip.selector}`);
        return;
      }

      elements.forEach((el) => {
        if (el.closest("#my-extension-root") || el.closest(".extension-ui")) return;

        const onEnter: EventListener = (e) => {
          const target = e.target as HTMLElement;
          const rect = target.getBoundingClientRect();
          setCoords({
            x: rect.left + rect.width / 2 + window.scrollX,
            y: rect.top - 8 + window.scrollY,
          });
          setActiveTip(tip);
          console.log(activeTip);
          
        };

        const onLeave: EventListener = () => {
          setCoords(null);
          setActiveTip(null);
        };

        el.addEventListener("mouseover", onEnter);
        el.addEventListener("mouseleave", onLeave);

        handlers.push({ el, onEnter, onLeave });
      });
    });

    return () => {
      handlers.forEach(({ el, onEnter, onLeave }) => {
        el.removeEventListener("mouseover", onEnter);
        el.removeEventListener("mouseleave", onLeave);
      });
    };
  }, [tips, activeTip]);

  if (!activeTip || !coords) return null;

  return <Overlay item={activeTip} x={coords.x} y={coords.y} />;
}
