import { Box, Button, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { toolTipSchema, type ToolTipForm } from "../../../shared/schemas/smart-tips/smart-tips.schema";
import { createSmartTips } from "../../../shared/api/smart-tips/smart-tips.api";
import ImageSelect from "../../image-select/image-select";
import TourSelect from "../../tour-select/tour-select";

interface SmartTipFormProps {
    selectedElement: string;
    closeSidebar: () => void;
}

export default function SmartTipForm({ selectedElement, closeSidebar }: SmartTipFormProps) {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<ToolTipForm>({
        resolver: zodResolver(toolTipSchema),
    });

    const [image, setImage] = useState<File | null>(null);
    const [error, setError] = useState<string | null>("");

    const submit = handleSubmit(async (data: ToolTipForm) => {
        if (!image) return;
        setError(null);

        const formData = new FormData();
        formData.append("selector", selectedElement);
        formData.append("title", data.title);
        formData.append("description", data.description);
        formData.append("image", image);

        try {
            await createSmartTips(formData);
            reset({ title: "", description: "" });
            setImage(null);
            closeSidebar();
        } catch (err: any) {
            setError(err.message);
        }
    });

    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Box>
                <Typography variant="caption" color="text.secondary">Title</Typography>
                <TextField
                    fullWidth
                    {...register("title")}
                    error={!!errors.title}
                    helperText={error}
                    placeholder="Type your title here"
                />
            </Box>

            <Box>
                <Typography variant="caption" color="text.secondary">Description</Typography>
                <TextField
                    fullWidth
                    multiline
                    minRows={5}
                    maxRows={10}
                    {...register("description")}
                    error={!!errors.description}
                    placeholder="Type your description here"
                />
            </Box>

            <Box sx={{ display: "flex", gap: 2 }}>
                <ImageSelect getImage={setImage} />
                <TourSelect />
            </Box>

            <Button
                sx={{
                    bgcolor: '#3b5bbf',
                    width: 180,
                    '&:hover': {
                        boxShadow: 8
                    }
                }}
                variant="contained" onClick={submit}>
                Save
            </Button>
        </Box>
    );
}
