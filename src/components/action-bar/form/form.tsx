import { Box, Button, TextField } from "@mui/material";
import ImageSelect from "../../image-select/image-select";
import { usePickElementStore } from "../../../shared/store/pick-element-store/pick-element.store";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toolTipSchema, type ToolTipForm } from "../../../shared/schemas/smart-tips/smart-tips.schema";

interface FormProps {
  onClose: () => void;
}

export default function ModalForm({ onClose }: FormProps) {
  const setPickMode = usePickElementStore((state) => state.setPickMode);
  const setTitle = usePickElementStore((state) => state.setTitle);
  const setDescription = usePickElementStore((state) => state.setDescription);
  const setImage = usePickElementStore((state) => state.setImage);
  const image = usePickElementStore((state) => state.image);

  const { control, handleSubmit, formState: { errors } } = useForm<ToolTipForm>({
    resolver: zodResolver(toolTipSchema),
    defaultValues: { title: "", description: "" },
  });

  const onSubmit = (data: ToolTipForm) => {
    if (!image) {
      return;
    }

    setTitle(data.title);
    setDescription(data.description);
    setPickMode(true);
    onClose();
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        py: 4,
        px: 2
      }}>
      <Controller
        name="title"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            placeholder="Enter your title here"
            sx={{ borderRadius: 1 }}
            error={!!errors.title}
            helperText={errors.title?.message}
          />
        )}
      />

      <Controller
        name="description"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            placeholder="Enter your description here"
            multiline
            rows={5}
            sx={{ borderRadius: 1 }}
            error={!!errors.description}
            helperText={errors.description?.message}
          />
        )}
      />

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mt: 2
        }}>
        <ImageSelect setImage={setImage} />
      </Box>

      <Button
        variant="contained"
        sx={{
          bgcolor: '#5698dd',
        }}
        onClick={handleSubmit(onSubmit)}
      >
        Pick Element
      </Button>
    </Box>
  );
}
