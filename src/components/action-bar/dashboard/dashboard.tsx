import React, { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  Divider,
  Fade,
  Backdrop,
  IconButton,
} from "@mui/material";
import { DashboardItems } from "../dashboard-items/dashboard-items";
import ModalComponent from "../modal/modal";
import "./dashboard.css";
import CloseIcon from '@mui/icons-material/Close';

interface ElementPickerProps {
  open: boolean;
  onClose: () => void;
}

const ElementPicker: React.FC<ElementPickerProps> = ({ open, onClose }) => {
  const [modal, setModal] = useState<boolean>(false);

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
        disablePortal
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            sx: {
              backgroundColor: "transparent",
            },
          },
        }}
        sx={{
          zIndex: 5,
        }}
      >
        <Fade in={open}>
          <Box
            sx={{
              position: "fixed",
              bottom: 75,
              left: 0,
              right: 0,
              mx: "auto",
              width: "100%",
              maxWidth: 480,
              height: 450,
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 3,
              pb: 5,
              display: "flex",
              flexDirection: "column",
              gap: 1.5,
              transformOrigin: "bottom",
              animation: open ? "slideUp 0.4s ease-out" : "slideDown 0.2s ease-out",
              borderRadius: 2,
            }}
          >

            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="h6" sx={{ mb: 1, color: '#000' }}>
                Choose what to add
              </Typography>

              <IconButton onClick={onClose}>
                <CloseIcon />
              </IconButton>
            </Box>
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
                  <Typography sx={{ color: '#000' }}>
                    {item.label}
                  </Typography>
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
