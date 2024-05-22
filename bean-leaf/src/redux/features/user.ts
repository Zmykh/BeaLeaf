import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../store.ts";

// Define a type for the slice state

// Define the initial state using that type
const initialState = {
id :null,
  email     :null,
    password:null,
  name      :"Guest",
  admin     :null,
  telNumber : null,
  adress    : null,
  createdAt : null,
  updatedAt : null,
  accessToken: null
};

export const userSlice = createSlice({
  name: "user",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.id = action.payload.id ?? state.id;
      state.email = action.payload.email ?? state.email;
      state.password = action.payload.password ?? state.password;
      state.name = action.payload.name ?? state.name;
      state.admin = action.payload.admin ?? state.admin;
      state.telNumber = action.payload.telNumber ?? state.telNumber;
      state.adress = action.payload.adress ?? state.adress;
      state.createdAt = action.payload.createdAt ?? state.createdAt;
      state.updatedAt = action.payload.updatedAt ?? state.updatedAt;
    },
    setToken: (state, action) => {
      state.accessToken = action.payload.accessToken;
    },
    clearUser: (state) => {
      state.id = null
      state.email =null
      state.password = null
      state.name = "Guest"
      state.admin = null
      state.telNumber = null
      state.adress = null
      state.createdAt = null
      state.updatedAt = null
    },
  },
});

export const { setToken, clearUser, setUser } = userSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectUser = (state: RootState) => state.user.accessToken;

export default userSlice.reducer;
