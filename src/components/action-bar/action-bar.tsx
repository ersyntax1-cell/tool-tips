import React, { useState } from "react";
import {
  BottomNavigation,
  Box,
  Fab,
  Typography,
} from "@mui/material";
import { ActionBarItems } from "../../shared/action-bar-items/action-bar-items";
import ElementPicker from "./dashboard/dashboard";

const ActionBar: React.FC = () => {
  const [openPicker, setOpenPicker] = useState(false);

  const handleClick = (item: any) => {
    if (item.id === "add-grabers") {
      setOpenPicker(true);
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
          py: 1.5,
          gap: 3,
          zIndex: 10,
          boxShadow: 20,
          bgcolor: "background.paper",
        }}
      >
        {ActionBarItems.map((item) => (
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
                bgcolor: "white",
                color: "primary.main",
                "&:hover": { bgcolor: "grey.100" },
                width: 44,
                height: 44,
              }}
              aria-label={item.label}
            >
              {React.cloneElement(item.element, {
                sx: { color: "inherit", width: 20 },
              })}
            </Fab>
            <Typography variant="caption" sx={{ mt: 0.5 }}>
              {item.label}
            </Typography>
          </Box>
        ))}
      </BottomNavigation>

      <ElementPicker open={openPicker} onClose={handleClose} />
    </>
  );
};

export default ActionBar;
