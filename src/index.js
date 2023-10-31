import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ThemeProvider} from "@mui/material";
import theme from "./theme";
import { setupStore } from "./store/store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";


const { store } = setupStore();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ThemeProvider>
  </Provider>
);
