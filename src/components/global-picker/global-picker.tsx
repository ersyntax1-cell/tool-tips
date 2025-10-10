import { useEffect, useState } from "react";
import { usePickElementStore } from "../../shared/store/pick-element-store/pick-element.store";
import { createSmartTips } from "../../shared/api/smart-tips/smart-tips.api";

export default function GlobalPicker() {
    const pickMode = usePickElementStore((state) => state.pickMode);
    const setPickMode = usePickElementStore((state) => state.setPickMode);
    const setPickedSelector = usePickElementStore((state) => state.setPickedSelector);
    const [hoveredEl, setHoveredEl] = useState<HTMLElement | null>(null);

    const { title, description, image } = usePickElementStore.getState();

    async function handleSubmit(selector: string) {
        if (!image) return;
        if (!selector) return;

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
            setHoveredEl(target);
            target.style.outline = "2px solid red";
            target.style.cursor = "crosshair";
        };

        const handleMouseOut = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            target.style.outline = "";
            target.style.cursor = "";
            setHoveredEl(null);
        };

        const handleClick = async (e: MouseEvent) => {
            e.preventDefault();
            e.stopPropagation();

            const target = e.target as HTMLElement;

            let selector = "";
            if (target.id) selector = `#${target.id}`;
            else if (target.className) selector = `.${(target.className as string).split(" ").join(".")}`;
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
