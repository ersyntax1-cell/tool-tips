import { createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    title: {
      primary: string;
    };
  }
  interface PaletteOptions {
    title?: {
      primary?: string;
    };
  }
}

const theme = createTheme({
  palette: {
    primary: {
      main: "#6b7c8c",
    },
    secondary: {
      main: "#f50057",
    },
    title: {
      primary: "#0b193f",
    },
  },
  typography: {
    fontFamily: "Gilroy, Arial, sans-serif",
  },
});

export default theme;
