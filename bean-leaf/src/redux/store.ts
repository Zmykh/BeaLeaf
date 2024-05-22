import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user.ts";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import persistStore from "redux-persist/es/persistStore";

const reducers = combineReducers({
  user: userReducer,
});

const persistConfig = {
  key: "bean-leaf",
  storage: storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

const persistor = persistStore(store);



export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export { store, persistor };