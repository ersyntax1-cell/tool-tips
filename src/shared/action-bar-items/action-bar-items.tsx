import { AddOutlined } from '@mui/icons-material';
import BrushOutlinedIcon from '@mui/icons-material/BrushOutlined';
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
import TourOutlinedIcon from '@mui/icons-material/TourOutlined';

export const ActionBarItems = [
  {
    id: 'branding',
    label: "Branding",
    element: <BrushOutlinedIcon />,
    showLabel: true,
    onClick: () => {
      console.log("Branding clicked");
    },
  },
  {
    id: 'add-grabers',
    label: "Add Grabbers",
    element: <AddOutlined />,
    showLabel: true,
  },
  {
    id: 'tours',
    label: "Tours",
    element: <TourOutlinedIcon />,
    showLabel: true,
    onClick: () => {
      console.log("Tours clicked");
    },
  },
  {
    id: 'smart-tips',
    label: "Smart tips",
    element: <LightbulbOutlinedIcon />,
    showLabel: true,
    onClick: () => {
      console.log('clicked');

    }
  },
];
