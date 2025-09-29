import {
    Box,
    Button,
    Drawer,
    IconButton,
    TextField,
    Typography
} from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ImageSelect from "../image-select/image-select";
import TourSelect from "../tour-select/tour-select";

interface SmartTipsProps {
    open: boolean;
    toggleDrawer: (value: boolean) => void;
}


export default function SmartTipsSidebar({ open, toggleDrawer }: SmartTipsProps) {
    return (
        <Drawer
            anchor="right"
            open={open}
            onClose={() => toggleDrawer(false)}
            variant="persistent"
            PaperProps={{
                sx: (theme) => ({
                    width: 600,
                    boxShadow: 0,
                    borderLeft: `1px solid ${theme.palette.text.primary}`,
                    borderBottom: `1px solid ${theme.palette.text.primary}`,
                    height: `calc(100vh - 94px)`,
                    borderRadius: 2,
                    bgcolor: '#fff',
                    overflowX: 'hidden'
                })
            }}
            BackdropProps={{
                sx: {
                    backgroundColor: "transparent"
                }
            }}
            ModalProps={{
                disableAutoFocus: true,
                disableEnforceFocus: true
            }}
        >
            <Box sx={{
                width: 600,
                p: 2,
                position: 'relative',
                height: 'auto'
            }}>
                <Box sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    m: 1
                }}>
                    <IconButton onClick={() => toggleDrawer(false)}>
                        <ArrowBackIcon />
                    </IconButton>
                </Box>

                <Box sx={{ mt: 4, ml: 0.5 }}>
                    <Typography
                        variant="h6"
                        color="title"
                        sx={{ fontWeight: 700 }}
                    >
                        Smart Tips
                    </Typography>

                    <Box sx={{
                        mt: 1,
                        pr: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 1,
                    }}>
                        <Box>
                            <Typography
                                variant="caption"
                                color="text.secondary"
                            >
                                Select element
                            </Typography>
                            <TextField
                                placeholder="Element ID"
                                variant="outlined"
                                fullWidth
                                sx={{
                                    bgcolor: '#fff',
                                }}
                            />
                        </Box>

                        <Box>
                            <Typography
                                variant="caption"
                                color="text.secondary"
                            >
                                Title
                            </Typography>
                            <TextField
                                placeholder="Type your title here"
                                variant="outlined"
                                fullWidth
                                sx={{
                                    bgcolor: '#fff',
                                }}
                            />
                        </Box>

                        <Box>
                            <Typography
                                variant="caption"
                                color="text.secondary"
                            >
                                Description
                            </Typography>
                            <TextField
                                placeholder="Type your description here"
                                variant="outlined"
                                fullWidth
                                multiline
                                minRows={5}
                                maxRows={10}
                                sx={{
                                    bgcolor: '#fff',
                                }}
                            />
                        </Box>

                        <div className="flex gap-6">
                            <ImageSelect />
                            <TourSelect />
                        </div>
                    </Box>

                    <Box sx={{ mt: 1 }}>
                        <Button
                            variant="contained"
                            sx={{
                                px: 9,
                                borderRadius: '16px',
                                bgcolor: '#6464e3'
                            }}
                        >
                            Save
                        </Button>
                    </Box>
                </Box>

            </Box>
        </Drawer>
    )
}
