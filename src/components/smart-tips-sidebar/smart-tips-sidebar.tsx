import {
    Box,
    Button,
    Drawer,
    IconButton,
    InputAdornment,
    TextField,
    Typography
} from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ImageSelect from "../image-select/image-select";
import TourSelect from "../tour-select/tour-select";
import GpsFixedIcon from "@mui/icons-material/GpsFixed";
import { useEffect, useState } from "react";
import { createSmartTips } from "../../shared/api/smart-tips/smart-tips.api";
import { useForm } from "react-hook-form";
import { toolTipSchema, type ToolTipForm } from "../../shared/schemas/smart-tips/smart-tips.schema";
import { zodResolver } from "@hookform/resolvers/zod";

interface SmartTipsProps {
    open: boolean;
    toggleDrawer: (value: boolean) => void;
}

export default function SmartTipsSidebar({ open, toggleDrawer }: SmartTipsProps) {

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<ToolTipForm>({
        resolver: zodResolver(toolTipSchema),
    });

    const [isSelecting, setIsSelecting] = useState(false);
    const [selectedElement, setSelectedElement] = useState<string>("");
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [image, setImage] = useState<File | null>(null);
    const [highlighted, setHighlighted] = useState<HTMLElement | null>(null);
    const [error, setError] = useState<string | null>('');

    useEffect(() => {
        if (!isSelecting) return;

        document.body.style.cursor = "crosshair";

        const handleMouseOver = (e: MouseEvent) => {
            const element = e.target as HTMLElement;
            if (element.tagName.toLowerCase() === "button") {
                element.style.outline = "2px solid #6464e3";
                element.style.outlineOffset = "2px";
                setHighlighted(element);
            }
        };

        const handleMouseOut = (e: MouseEvent) => {
            const element = e.target as HTMLElement;
            if (element === highlighted) {
                element.style.outline = "";
                element.style.outlineOffset = "";
                setHighlighted(null);
            }
        };

        const handleClick = (e: MouseEvent) => {
            e.preventDefault();
            e.stopPropagation();

            const element = e.target as HTMLElement;
            if (element.tagName.toLowerCase() === "button") {
                let selector = "";

                if (element.id) {
                    selector = `#${element.id}`;
                } else if (element.classList.length > 0) {
                    const classes = Array.from(element.classList)
                        .map(cls => `.${cls}`)
                        .join("");
                    selector = classes;
                } else {
                    selector = element.tagName.toLowerCase();
                }

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
        };
    }, [isSelecting, highlighted]);

    const submit = handleSubmit(async (data: ToolTipForm) => {
        if (!image) return;

        setError(null);

        const formData = new FormData();
        formData.append('selector', selectedElement);
        formData.append('title', data.title);
        formData.append('description', data.description);
        formData.append('image', image);

        try {
            await createSmartTips(formData);
            reset({
                title: '',
                description: ''
            });
            setImage(null)
            toggleDrawer(false);
        } catch (error: any) {
            setError(error.message);
        }
    });


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
                    overflowX: 'hidden',
                    pointerEvents: isSelecting ? "none" : "auto",
                }),
            }}
            BackdropProps={{
                sx: { backgroundColor: "transparent" }
            }}
            ModalProps={{
                disableAutoFocus: true,
                disableEnforceFocus: true
            }}
        >
            <Box sx={{ width: 600, p: 2, position: 'relative', height: 'auto' }}>
                <Box sx={{ position: 'absolute', top: 0, left: 0, m: 1 }}>
                    <IconButton onClick={() => toggleDrawer(false)}>
                        <ArrowBackIcon />
                    </IconButton>
                </Box>

                <Box sx={{ mt: 4, ml: 0.5 }}>
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>
                        Smart Tips
                    </Typography>

                    <Box sx={{ mt: 1, pr: 4, display: 'flex', flexDirection: 'column', gap: 1 }}>
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
                                        <InputAdornment
                                            sx={{
                                                pl: 1,
                                                ml: 1,
                                                alignSelf: "stretch",
                                                display: "flex",
                                                alignItems: "center",
                                                borderLeft: "1px solid #c4c4c4",
                                            }}
                                            position="end"
                                        >
                                            <IconButton edge="end" onClick={() => setIsSelecting(true)}>
                                                <GpsFixedIcon />
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Box>

                        <Box>
                            <Typography variant="caption" color="text.secondary">
                                Title
                            </Typography>
                            <TextField
                                placeholder="Type your title here"
                                variant="outlined"
                                fullWidth
                                sx={{ bgcolor: '#fff' }}
                                {...register('title')}
                                error={!!errors.title}
                                helperText={error}
                            />
                        </Box>

                        <Box>
                            <Typography variant="caption" color="text.secondary">
                                Description
                            </Typography>
                            <TextField
                                placeholder="Type your description here"
                                variant="outlined"
                                fullWidth
                                multiline
                                minRows={5}
                                maxRows={10}
                                sx={{ bgcolor: '#fff' }}
                                {...register('description')}
                                error={!!errors.description}
                            />
                        </Box>

                        <div className="flex gap-6">
                            <ImageSelect getImage={setImage} />
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
                            onClick={submit}
                        >
                            Save
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Drawer>
    );
}