import {
    BottomNavigation,
    Box,
    Fab,
    Typography
} from "@mui/material";
import { ActionBarItems } from "../../shared/action-bar-items/action-bar-items";
import { useSmartTipsSidebarStore } from "../../store/smart-tips-sidebar/smart-tips-sidebar.store";
import React from "react";

export default function ActionBar() {

    return (
        <>
            <BottomNavigation
                sx={(theme) => ({
                    position: "fixed",
                    bottom: 0,
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    px: 2,
                    py: 1.5,
                    borderTop: `1px solid ${theme.palette.text.primary}`,
                    height: "auto",
                    gap: 3,
                    zIndex: 10
                })}
            >
                {ActionBarItems.map((item, index) => {
                    const { activeItem, toggle } = useSmartTipsSidebarStore();
                    const isActive = activeItem === item.label;

                    return (
                        <Box
                            key={index}
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                            }}
                            onClick={() => {
                                if (item.onClick) item.onClick(toggle);
                            }}
                        >
                            <Fab
                                id={item.id}
                                sx={{
                                    bgcolor: isActive ? "#2a4899" : "white",
                                    color: isActive ? "white" : "primary.main",
                                    "&:hover": {
                                        bgcolor: isActive ? "#3b5bbf" : "grey.100",
                                    },
                                    width: 44,
                                    height: 44
                                }}
                                aria-label={item.label}
                            >
                                {React.cloneElement(item.element, { sx: { color: "inherit", width: 20 } })}
                            </Fab>
                            <Typography variant="caption" sx={{ mt: 0.5 }} className="text-text">
                                {item.label}
                            </Typography>
                        </Box>
                    );
                })}
            </BottomNavigation>
        </>
    )
}
