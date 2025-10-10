import React, { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  Divider,
  Fade,
  Backdrop,
} from "@mui/material";
import { DashboardItems } from "../dashboard-items/dashboard-items";
import ModalComponent from "../modal/modal";

interface ElementPickerProps {
  open: boolean;
  onClose: () => void;
}

const ElementPicker: React.FC<ElementPickerProps> = ({ open, onClose }) => {
  const [modal, setModal] = useState<boolean>(true);

  const handleOpenModal = () => {
    setModal(true);
    onClose();
  };
  const handleCloseModal = () => setModal(false);

  const itemsWithActions = DashboardItems.map((item) =>
    item.id === "tooltip"
      ? { ...item, onClick: handleOpenModal }
      : item
  );

  return (
    <>
      <Modal
        open={open}
        onClose={onClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{ backdrop: { sx: { backgroundColor: "transparent" } } }}
      >
        <Fade in={open}>
          <Box
            sx={{
              position: "fixed",
              bottom: 90,
              left: 0,
              right: 0,
              mx: "auto",
              width: "100%",
              maxWidth: 480,
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 3,
              pb: 5,
              display: "flex",
              flexDirection: "column",
              gap: 1.5,
              transformOrigin: "bottom",
            }}
          >
            <Typography variant="h6" sx={{ mb: 1 }}>
              Choose what to add
            </Typography>
            <Divider sx={{ mb: 1.5 }} />
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              {itemsWithActions.map((item) => (
                <Box
                  key={item.id}
                  sx={{
                    p: 1.5,
                    borderRadius: 2,
                    bgcolor: "grey.100",
                    "&:hover": { bgcolor: "grey.200", cursor: "pointer", transition: "0.2s" },
                  }}
                  onClick={item.onClick}
                >
                  <Typography>{item.label}</Typography>
                </Box>
              ))}
            </Box>
          </Box>
        </Fade>
      </Modal>

      {modal && <ModalComponent open={modal} onClose={handleCloseModal} />}
    </>
  );
};

export default ElementPicker;
