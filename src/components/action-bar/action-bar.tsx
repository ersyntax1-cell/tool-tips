import React, { useState } from "react";
import {
  BottomNavigation,
  Box,
  Fab,
  Typography,
} from "@mui/material";
import { ActionBarItems } from "../../shared/action-bar-items/action-bar-items";
import ElementPicker from "./dashboard/dashboard";
import CloseIcon from "@mui/icons-material/Close";

const ActionBar: React.FC = () => {
  const [openPicker, setOpenPicker] = useState(false);

  const handleClick = (item: any) => {
    if (item.id === "add-grabers") {
      setOpenPicker((prev) => !prev);
    } else if (item.onClick) {
      item.onClick();
    }
  };

  const handleClose = () => setOpenPicker(false);

  return (
    <>
      <BottomNavigation
        sx={{
          position: "fixed",
          bottom: 0,
          width: "100%",
          height: 80,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          px: 2,
          gap: 3,
          zIndex: 10,
          boxShadow: 20,
          bgcolor: "background.paper",
        }}
      >
        {ActionBarItems.map((item) => {
          const isAddGrabbers = item.id === "add-grabers";
          const isOpen = isAddGrabbers && openPicker;

          return (
            <Box
              key={item.id}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Fab
                id={item.id}
                onClick={() => handleClick(item)}
                sx={{
                  bgcolor: isOpen ? "#616161" : "white",
                  color: isOpen ? "white" : "grey.700",
                  "&:hover": {
                    bgcolor: isOpen ? "primary.dark" : "grey.100",
                  },
                  width: 48,
                  height: 48,
                  transition: "all 0.3s ease",
                }}
                aria-label={item.label}
              >
                {isOpen ? (
                  <CloseIcon sx={{ color: "inherit", width: 20 }} />
                ) : (
                  React.cloneElement(item.element, {
                    sx: { color: "inherit", width: 20 },
                  })
                )}
              </Fab>
              <Typography
                variant="caption"
                sx={{
                  mt: 0.5,
                  transition: "opacity 0.3s",
                  color: isOpen ? "primary.main" : "text.primary",
                }}
              >
                {item.label}
              </Typography>
            </Box>
          );
        })}
      </BottomNavigation>

      <ElementPicker open={openPicker} onClose={handleClose} />
    </>
  );
};

export default ActionBar;
