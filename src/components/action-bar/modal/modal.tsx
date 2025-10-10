import {
    Backdrop,
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
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        sx: {
                            backgroundColor: "rgba(0,0,0,0.7)"
                        },
                    },
                }}
                sx={{
                    height: '100vh',
                    display: 'grid',
                    placeItems: 'center',
                }}
            >
                <Fade
                    in={open}
                >

                    <Box
                        sx={{
                            position: 'fixed',
                            width: 600,
                            height: 500,
                            bgcolor: '#fff',
                            borderRadius: 2
                        }}
                    >
                        <ModalForm onClose={onClose} />
                    </Box>

                </Fade>
            </Modal>
        </>
    )
}
