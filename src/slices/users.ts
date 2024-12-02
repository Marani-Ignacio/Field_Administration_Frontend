import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { User } from "../types/users";
import api from "../config/axios";

interface UserState {
  loading: boolean;
  error: string | undefined;
  user: User | null;
}

export const getUserByUid = createAsyncThunk(
  "users/getUserByUid",
  async (uid: string, { rejectWithValue }) => {
    try {
      const response = await api.get(`/users/Uid/${uid}`);
      return response.data.data;
    } catch (error) {
      console.error("Error al obtener el usuario por UID:", error);
      return rejectWithValue("No se pudo obtener el usuario.");
    }
  }
);

export const getUser = createAsyncThunk(
  "users/getUser",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await api.get(`/users/${id}`);
      return response.data.data;
    } catch (error) {
      console.error("Error al obtener el usuario por ID:", error);
      return rejectWithValue("No se pudo obtener el usuario.");
    }
  }
);

export const postUser = createAsyncThunk(
  "users/postUser",
  async (newUser: User) => {
    const response = await api.post("/users/", newUser);
    return response.data;
  }
);

const initialState: UserState = {
  loading: false,
  error: undefined,
  user: null,
};

const slice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(postUser.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(postUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(postUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getUserByUid.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(getUserByUid.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(getUserByUid.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(getUser.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const reducer = slice.reducer;
export default reducer;