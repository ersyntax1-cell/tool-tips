import {
    Box,
    Button,
    Typography
} from "@mui/material";
import { ImagePositions } from "../../positions/image-position/image-position";
import ImageIcon from '@mui/icons-material/Image';
import { useState } from "react";

export default function ImageSelect() {
    const [position, setPosition] = useState<string>('');
    const [selected, setSelected] = useState<number>(1);
    const [image, setImage] = useState<string | null>(null);

    const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImage(URL.createObjectURL(file));
        }
    };

    return (
        <Box>
            <Typography
                variant="caption"
                color="text.primary"
                sx={{
                    fontWeight: 700
                }}
            >
                Image
            </Typography>
            <Box
                sx={{
                    bgcolor: '#fff',
                    width: 180,
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
                <Box
                    sx={{
                        width: '100%',
                        p: 1,
                        m: 0.5,
                        bgcolor: '#f1eeee',
                        borderRadius: 0.5,
                        display: 'flex',
                        justifyContent: 'space-between',
                        px: 2,
                        gap: 0.5
                    }}
                >
                    {ImagePositions.map((position, index) => (
                        <Typography
                            key={index}
                            variant="caption"
                            sx={{
                                fontSize: '14px',
                                opacity: '.8',
                                cursor: 'pointer',
                                px: 1,
                                borderRadius: 0.8,
                                width: 60,
                                textAlign: 'center',
                                '&:hover': {
                                    bgcolor: '#fff'
                                },
                                bgcolor: `${selected === index ? '#fff' : ''}`
                            }}
                            onClick={() => {
                                setSelected(index);
                                setPosition(position.position);
                            }}
                        >
                            {position.label}
                        </Typography>
                    ))}
                </Box>

                <Button
                    variant="text"
                    component="label"
                    startIcon={<ImageIcon />}
                    sx={{
                        color: '#5697dc',
                    }}
                >
                    Select Image
                    <input type="file" hidden accept="image/*" onChange={handleUpload} />
                </Button>

                {image &&
                    <img
                        src={image}
                        alt="preview"
                        width={200}
                        height={200}
                        className="rounded mt-2"
                    />
                }
            </Box>
        </Box>
    )
}
