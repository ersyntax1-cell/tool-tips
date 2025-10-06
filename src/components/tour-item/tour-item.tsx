import { Box, IconButton, Typography } from "@mui/material";
import { Icons } from "../../shared/icon/icon";
import type { TourItemProps } from "../../shared/types/tour-item/tour-item.type";
import { useEditModeStore } from "../../shared/store/edit-mode/edit-mode.store";
import { useSmartTipsSidebarStore } from "../../store/smart-tips-sidebar/smart-tips-sidebar.store";

interface Props {
  data: TourItemProps;
  onDelete: (id: string) => void;
}

export default function TourItem({ data, onDelete }: Props) {
  const { setEditMode, setCurrentTip } = useEditModeStore();
  const toggleDrawer = useSmartTipsSidebarStore((s) => s.toggle);

  const handleEditClick = () => {
    setCurrentTip(data);
    setEditMode(true);
    toggleDrawer(true);
  };

  return (
    <Box
      sx={{
        width: 400,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 1,
        cursor: "pointer",
        boxShadow: 2,
        p: 2,
        borderRadius: 1,
        transition: "0.3s",
        "&:hover": { boxShadow: 6 },
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
        <Typography variant="h6" sx={{ fontSize: 17, fontWeight: 600 }}>
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
            lineHeight: 1.4,
            pl: 1,
          }}
        >
          {data.description}
        </Typography>
      </Box>

      <Box sx={{ display: "flex", gap: 0.5 }}>
        <IconButton onClick={handleEditClick}>{Icons.editIcon}</IconButton>
        <IconButton onClick={() => onDelete(data._id)}>{Icons.trashIcon}</IconButton>
      </Box>
    </Box>
  );
}
