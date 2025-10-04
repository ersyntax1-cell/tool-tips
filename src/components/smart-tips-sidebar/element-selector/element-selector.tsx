import { Box, IconButton, InputAdornment, TextField, Typography } from "@mui/material";
import GpsFixedIcon from "@mui/icons-material/GpsFixed";
import { useState, useEffect } from "react";

interface ElementSelectorProps {
    selectedElement: string;
    setSelectedElement: (value: string) => void;
    toggleMode: (mode: boolean) => void;
}

export default function ElementSelector({
    selectedElement,
    setSelectedElement,
    toggleMode
}: ElementSelectorProps) {

    const [isSelecting, setIsSelecting] = useState(false);
    const [highlighted, setHighlighted] = useState<HTMLElement | null>(null);

    useEffect(() => {
        if (!isSelecting) return;

        document.body.style.cursor = "crosshair";
        toggleMode(true);

        const handleMouseOver = (e: MouseEvent) => {
            const element = e.target as HTMLElement;
            if (element.tagName.toLowerCase() === "button") {
                element.style.outline = "2px solid #6464e3";
                element.style.outlineOffset = "2px";
                setHighlighted(element);
            }
        };

        const handleMouseOut = (e: MouseEvent) => {
            if (e.target === highlighted) {
                highlighted!.style.outline = "";
                highlighted!.style.outlineOffset = "";
                setHighlighted(null);
            }
        };

        const handleClick = (e: MouseEvent) => {
            e.preventDefault();
            e.stopPropagation();

            const element = e.target as HTMLElement;
            if (element.tagName.toLowerCase() === "button") {
                let selector = "";
                if (element.id) selector = `#${element.id}`;
                else if (element.classList.length > 0)
                    selector = Array.from(element.classList).map(cls => `.${cls}`).join("");
                else selector = element.tagName.toLowerCase();

                setSelectedElement(selector);
                setIsSelecting(false);
            }
        };

        document.addEventListener("mouseover", handleMouseOver, true);
        document.addEventListener("mouseout", handleMouseOut, true);
        document.addEventListener("click", handleClick, true);

        return () => {
            document.body.style.cursor = "default";
            if (highlighted) {
                highlighted.style.outline = "";
                highlighted.style.outlineOffset = "";
            }
            document.removeEventListener("mouseover", handleMouseOver, true);
            document.removeEventListener("mouseout", handleMouseOut, true);
            document.removeEventListener("click", handleClick, true);
            toggleMode(false);
        };
    }, [isSelecting, highlighted]);

    return (
        <Box>
            <Typography variant="caption" color="text.secondary">
                Select element
            </Typography>
            <TextField
                placeholder="Element ID"
                variant="outlined"
                fullWidth
                value={selectedElement}
                onChange={(e) => setSelectedElement(e.target.value)}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton onClick={() => setIsSelecting(true)}>
                                <GpsFixedIcon />
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
            />
        </Box>
    );
}