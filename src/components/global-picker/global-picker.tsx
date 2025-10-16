import { useEffect, useState } from "react";
import { usePickElementStore } from "../../shared/store/pick-element-store/pick-element.store";
import { createSmartTips } from "../../shared/api/smart-tips/smart-tips.api";

function buildSafeSelector(selector: string) {
  if (!selector) return "";
  if (selector.startsWith("#")) return selector;
  const classes = selector.split(" ");
  const escapedClasses = classes.map(c => `.${CSS.escape(c)}`);
  return escapedClasses.join("");
}

export default function GlobalPicker() {
  const pickMode = usePickElementStore((state) => state.pickMode);
  const setPickMode = usePickElementStore((state) => state.setPickMode);
  const setPickedSelector = usePickElementStore((state) => state.setPickedSelector);
  const [hoveredEl, setHoveredEl] = useState<HTMLElement | null>(null);

  const { title, description, image } = usePickElementStore.getState();

  async function handleSubmit(selector: string) {
    if (!image || !selector) return;

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("selector", selector);
    formData.append("image", image);

    try {
      await createSmartTips(formData);
      console.log("Tool tip created successfully");
    } catch (error: any) {
      console.error(error);
    }
  }

  useEffect(() => {
    document.body.style.cursor = pickMode ? "crosshair" : "default";
    return () => {
      document.body.style.cursor = "default";
    };
  }, [pickMode]);

  useEffect(() => {
    if (!pickMode) return;

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target || target.closest("#my-extension-root") || target.closest(".extension-ui")) return;

      setHoveredEl(target);
      target.style.outline = "2px solid red";
      target.style.cursor = "crosshair";
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      target.style.outline = "";
      target.style.cursor = "";
      setHoveredEl(null);
    };

    const handleClick = async (e: MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();

      const target = e.target as HTMLElement;
      if (!target) return;

      let selector = "";
      if (target.id) selector = `#${CSS.escape(target.id)}`;
      else if (target.className && typeof target.className === "string")
        selector = buildSafeSelector(target.className);
      else selector = target.tagName.toLowerCase();

      setPickedSelector(selector);
      setPickMode(false);

      if (hoveredEl) {
        hoveredEl.style.outline = "";
        hoveredEl.style.cursor = "";
      }

      await handleSubmit(selector);
    };

    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);
    document.addEventListener("click", handleClick, true);

    return () => {
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
      document.removeEventListener("click", handleClick, true);
    };
  }, [pickMode, hoveredEl, setPickMode, setPickedSelector]);

  return null;
}