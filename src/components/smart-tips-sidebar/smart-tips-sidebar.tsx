import { Box, IconButton, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useEffect, useRef, useState } from "react";
import ElementSelector from "./element-selector/element-selector";
import SmartTipForm from "./form/form";

interface SmartTipsSidebarProps {
    open: boolean;
    toggleDrawer: (value: boolean) => void;
    refreshTips: () => void;
}


export default function SmartTipsSidebar({ open, toggleDrawer, refreshTips }: SmartTipsSidebarProps) {
    const [selectedElement, setSelectedElement] = useState("");

    const [selectMode, setSelectMode] = useState<boolean>(false);

    const sidebarRef = useRef<HTMLDivElement>(null);

    function toggleMode(mode: boolean) {
        setSelectMode(mode);
    }

    const onSaveSuccess = () => {
        refreshTips();
        toggleDrawer(false);
    };

    useEffect(() => {
        if (selectMode) return;

        function handleClickOutside(event: MouseEvent) {
            if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
                toggleDrawer(false);
            }
        }

        if (open) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [open, toggleDrawer, selectMode]);

    return (
        <Box
            ref={sidebarRef}
            sx={{
                position: 'fixed',
                top: 0,
                right: open ? 0 : -600,
                width: 600,
                height: '100vh',
                bgcolor: 'white',
                boxShadow: 3,
                transition: 'right 0.3s ease',
                zIndex: 20,
                px: 2,
                py: 1,
                overflowY: 'scroll'
            }}
        >
            <Box sx={{ position: "relative" }}>
                <IconButton
                    sx={{ position: 'absolute', left: '-10px', top: 0 }}
                    onClick={() => toggleDrawer(false)}
                >
                    <ArrowBackIcon />
                </IconButton>

                <Typography variant="h6" sx={{ pt: 5 }}>
                    Smart Tips
                </Typography>

                <Box sx={{ mt: 2, display: "flex", flexDirection: "column", gap: 2 }}>
                    <ElementSelector
                        selectedElement={selectedElement}
                        setSelectedElement={setSelectedElement}
                        toggleMode={toggleMode}
                    />
                    <SmartTipForm
                        selectedElement={selectedElement}
                        closeSidebar={onSaveSuccess}
                    />
                </Box>
            </Box>
        </Box>
    );
}
