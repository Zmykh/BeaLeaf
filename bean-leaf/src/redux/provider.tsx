"use client";
import { Provider } from "react-redux";
import { persistor, store } from "./store.ts";
import { PersistGate } from "redux-persist/integration/react";
import React from "react";

export function Providers({ children }: { children: React.ReactNode }) {
  console.log(persistor, store)
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
       {children}
      </PersistGate>
    </Provider>
  );
}
