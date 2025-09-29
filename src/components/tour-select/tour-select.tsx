import {
    Box,
    Typography
} from "@mui/material";
import { TourPositions } from "../../positions/tour-position/tour-position";
import { useState } from "react";

export default function TourSelect() {

    const [position, setPosition] = useState<string>('');
    const [selected, setSelected] = useState<number>(1);

    return (
        <Box>
            <Typography
                variant="caption"
                color="text.primary"
                sx={{
                    fontWeight: 700
                }}
            >
                Tour position
            </Typography>
            <Box
                sx={{
                    bgcolor: '#fff',
                    width: 220,
                    height: 90,
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
                        justifyContent: 'center',
                        px: 2,
                        gap: 0.5
                    }}
                >
                    {TourPositions.map((position, index) => (
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
            </Box>
        </Box>
    )
}
