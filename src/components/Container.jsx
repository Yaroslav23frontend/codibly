import Box from "@mui/material/Box";
import { useThemeValue } from "../context/ThemeValueContext";

export default function Container({ children }) {
  const { mode } = useThemeValue();
  const styles = {
    paper: {
      width: "100%",
      height: "100vh",
      mr: "auto",
      ml: "auto",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: mode === "dark" ? "#121212" : "#fff",
    },
  };
  return <Box sx={styles.paper}>{children}</Box>;
}
