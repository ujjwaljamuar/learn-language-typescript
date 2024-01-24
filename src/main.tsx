import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { ThemeProvider } from "@emotion/react";
import { CssBaseline, createTheme } from "@mui/material";
import { Provider } from "react-redux";
import { store } from "./redux/store.ts";

const theme = createTheme({
    palette: {
        primary: {
            main: "#402957",
        },
    },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
    <ThemeProvider theme={theme}>
        <CssBaseline />
        <Provider store={store}>
            <App />
        </Provider>
    </ThemeProvider>
);
