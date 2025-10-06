import { Box, Button, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useEffect } from "react";
import {
  toolTipSchema,
  type ToolTipForm,
} from "../../../shared/schemas/smart-tips/smart-tips.schema";
import {
  createSmartTips,
  editSmartTip,
} from "../../../shared/api/smart-tips/smart-tips.api";
import ImageSelect from "../../image-select/image-select";
import TourSelect from "../../tour-select/tour-select";
import { useEditModeStore } from "../../../shared/store/edit-mode/edit-mode.store";

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

  const { editMode, currentTip, resetEdit } = useEditModeStore();
  const [image, setImage] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  // При активации editMode заполняем форму
  useEffect(() => {
    if (editMode && currentTip) {
      reset({
        title: currentTip.title,
        description: currentTip.description,
      });
    }
  }, [editMode, currentTip, reset]);

  const onSubmit = handleSubmit(async (data) => {
    if (!image && !editMode) {
      setError("Please select an image");
      return;
    }
    setError(null);

    const formData = new FormData();
    formData.append("selector", selectedElement || currentTip?.selector || "");
    formData.append("title", data.title);
    formData.append("description", data.description);
    if (image) formData.append("image", image);

    try {
      if (editMode && currentTip) {
        await editSmartTip(currentTip._id, formData);
      } else {
        await createSmartTips(formData);
      }

      reset({ title: "", description: "" });
      setImage(null);
      resetEdit();
      closeSidebar();
    } catch (err: any) {
      setError(err.message);
    }
  });

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <Box>
        <Typography variant="caption" color="text.secondary">
          Title
        </Typography>
        <TextField
          fullWidth
          {...register("title")}
          error={!!errors.title}
          helperText={errors.title?.message}
          placeholder="Type your title here"
        />
      </Box>

      <Box>
        <Typography variant="caption" color="text.secondary">
          Description
        </Typography>
        <TextField
          fullWidth
          multiline
          minRows={5}
          {...register("description")}
          error={!!errors.description}
          helperText={errors.description?.message}
          placeholder="Type your description here"
        />
      </Box>

      <Box sx={{ display: "flex", gap: 2 }}>
        <ImageSelect getImage={setImage} />
        <TourSelect />
      </Box>

      {error && (
        <Typography color="error" variant="body2">
          {error}
        </Typography>
      )}

      <Button
        sx={{
          bgcolor: "#3b5bbf",
          width: 180,
          "&:hover": { boxShadow: 8 },
        }}
        variant="contained"
        onClick={onSubmit}
      >
        {editMode ? "Update" : "Save"}
      </Button>
    </Box>
  );
}
