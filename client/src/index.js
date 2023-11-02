import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "App";
import { AblyProvider } from "ably/react";
import Cookies from "js-cookie";
import { composeWithDevTools } from "redux-devtools-extension";
import { configureStore, applyMiddleware } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { persistStore, persistReducer } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import storage from "redux-persist/lib/storage";
import rootReducer from "./app/reducers/index.js";
import AlertNotification from "shared/components/AlertNotification";

// Code Pulse React Context Provider
import { MaterialUIControllerProvider } from "context";
import { initializeAblyClient, realtime } from "./ably";
import Spaces from "@ably/spaces";
import { SpacesProvider, SpaceProvider } from "@ably/spaces/react";

const root = ReactDOM.createRoot(document.getElementById("root"));

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore(
  {
    reducer: persistedReducer,
  },
  composeWithDevTools(applyMiddleware(thunk))
);
const persistor = persistStore(store);

initializeAblyClient(Cookies.get("clientId"));
const spaces = new Spaces(realtime);

root.render(
  <SpacesProvider client={spaces}>
    <SpaceProvider name="auction-arena">
      <AblyProvider client={realtime}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <BrowserRouter>
              <MaterialUIControllerProvider>
                <App />
                <AlertNotification />
              </MaterialUIControllerProvider>
            </BrowserRouter>
          </PersistGate>
        </Provider>
      </AblyProvider>
    </SpaceProvider>
  </SpacesProvider>
);
