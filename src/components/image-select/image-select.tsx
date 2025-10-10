import { Box, Button, Typography } from "@mui/material";
import ImageIcon from '@mui/icons-material/Image';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from "react";

interface ImageSelectProps {
  setImage: (file: File | null) => void;
}

export default function ImageSelect({ setImage }: ImageSelectProps) {
  const [preview, setPreview] = useState<string | null>(null);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    if (file) {
      setPreview(URL.createObjectURL(file));
      setImage(file);
    }
  };

  const handleRemovePreview = () => {
    setPreview(null);
    setImage(null);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Typography variant="caption" color="text.primary" sx={{ fontWeight: 700 }}>
        Image
      </Typography>

      <Box
        sx={{
          bgcolor: '#fff',
          width: '100%',
          height: 'auto',
          border: '1px solid #bebcbc',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          borderRadius: 1,
          px: 0.5,
          pb: 0.5,
        }}
      >
        <Button variant="text" component="label" startIcon={<ImageIcon />} sx={{ color: '#5697dc' }}>
          Select Image
          <input type="file" hidden accept="image/*" onChange={handleUpload} />
        </Button>

        {preview && (
          <Box sx={{ position: 'relative', mt: 1 }}>
            <img src={preview} alt="preview" width={140} height={140} className="rounded" />
            <CloseIcon
              onClick={handleRemovePreview}
              sx={{
                position: 'absolute',
                top: 0,
                right: -10,
                color: 'red',
                cursor: 'pointer',
                bgcolor: 'grey',
                borderRadius: '100%',
              }}
            />
          </Box>
        )}
      </Box>
    </Box>
  );
}
