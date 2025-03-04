import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import router from "./route/route";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { GlobalProvider } from "./provider/GlobalProvider";

createRoot(document.getElementById("root")).render(
  //<StrictMode>
  <Provider store={store}>
    <GlobalProvider>
      <RouterProvider router={router} future={{ v7_relativeSplatPath: true }} />
    </GlobalProvider>
  </Provider>
  //</StrictMode>,
);
