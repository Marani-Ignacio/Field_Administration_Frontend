import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { FieldApi } from "../types/fields";
import api from "../config/axios";
import { getAuth } from "firebase/auth";

interface FieldState {
    field: FieldApi | undefined;
    loading: boolean;
    error: string | undefined;
}

export const getField = createAsyncThunk("fields/getField", async (fieldId: string) => {
  const response = await api.get(`/fields/${fieldId}`);
  return response.data.data;
})

export const getOwnerField = createAsyncThunk("fields/getOwnerField", async (fieldId: string) => {
  // get the user from current auth
  const user = await getAuth().currentUser;
  if (!user) {
    throw new Error("User not found");
  }

  const userResponse = await api.get(`/users/Uid/${user.uid}`);

  if (!userResponse.data.data) {
    throw new Error("User not found");
  }

  const ownerId = userResponse.data.data._id;

  const response = await api.get(`/fields/myField/${ownerId}?id=${fieldId}`);


  if (!response.data.data) {
    throw new Error("Field not found");
  }

  return response.data.data;
})

const initialState: FieldState = {
    field: undefined,
    loading: false,
    error: undefined
};

const slice = createSlice({
  name: "field",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getField.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(getField.fulfilled, (state, action) => {
        state.loading = false;
        state.field = action.payload;
      })
      .addCase(getField.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const reducer = slice.reducer;
export default reducer;
