import "@repo/ui/main.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { Toaster } from "sonner";
import { ThemeProvider } from "./providers/theme-provider.tsx";
import { persistor, store } from "./redux/store.ts";
import router from "./routes/router.tsx";
// import "./styles/global.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        <PersistGate loading={null} persistor={persistor}>
          <Toaster />
        </PersistGate>
        <RouterProvider router={router} />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
