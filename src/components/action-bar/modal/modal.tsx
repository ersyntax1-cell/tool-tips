import {
  Box,
  Fade,
  Modal
} from "@mui/material";
import ModalForm from "../form/form";

interface ModalProps {
  open: boolean;
  onClose: () => void;
}

export default function ModalComponent({
  open,
  onClose
}: ModalProps) {
  return (
    <>
      <Modal
        open={open}
        onClose={onClose}
        closeAfterTransition
        disablePortal
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Fade in={open}
        >
          <Box
            sx={{
              width: 600,
              bgcolor: 'white',
              borderRadius: 2,
              boxShadow: 24,
              p: 2,
            }}
          >
            <ModalForm onClose={onClose} />
          </Box>
        </Fade>
      </Modal>
    </>
  )
}
