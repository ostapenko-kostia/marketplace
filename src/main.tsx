import React, { createContext, useContext } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.scss";
import Store from "./services/store/store.ts";

const store = new Store();

interface State {
  store: Store;
}

const StoreContext = createContext<State>({ store });
export const useStore = () => useContext(StoreContext);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <StoreContext.Provider value={{ store }}>
      <App />
    </StoreContext.Provider>
  </React.StrictMode>
);
