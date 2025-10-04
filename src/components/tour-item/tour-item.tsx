import { Box, IconButton, Typography } from "@mui/material";
import { Icons } from "../../shared/icon/icon";
import type { TourItemProps } from "../../shared/types/tour-item/tour-item.type";

interface Props {
  data: TourItemProps;
  onDelete: (id: string) => void;
}

export default function TourItem({ data, onDelete }: Props) {
  return (
    <Box
      sx={{
        width: 400,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 1,
        cursor: 'pointer',
        my: 2,
        boxShadow: 2,
        p: 2,
        borderRadius: 1,
        transition: '0.3s',
        '&:hover': { boxShadow: 6 },
        position: 'relative'
      }}
    >
      <Box>
        <img
          src={`http://localhost:3000${data.image}`}
          alt="tour-image"
          width={60}
          height={60}
          className="rounded"
        />
      </Box>

      <Box>
        <Typography variant="h6" sx={{ color: "text.secondary", fontSize: 17, fontWeight: 600 }}>
          {data.title}
        </Typography>
        <Typography
          variant="caption"
          sx={{
            maxWidth: 300,
            overflow: "hidden",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            color: "text.secondary",
            lineHeight: 1.4,
            pl: 1
          }}
        >
          {data.description}
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', gap: 0.5 }}>
        <IconButton onClick={() => console.log("edit clicked")}>{Icons.editIcon}</IconButton>
        <IconButton onClick={() => onDelete(data._id)}>{Icons.trashIcon}</IconButton>
      </Box>
    </Box>
  );
}