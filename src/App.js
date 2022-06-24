import { ThemeProvider, createTheme } from "@mui/material/styles";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/AppRouter";
import { useThemeValue } from "./context/ThemeValueContext";
import { useMemo } from "react";
function App() {
  const { mode } = useThemeValue();
  const theme = useMemo(() => {
    const theme = createTheme({
      palette: {
        mode: mode,
      },
    });
    return theme;
  }, [mode]);
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <AppRouter />
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
