import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../config/axios";
import { SeedApi } from "../types/seeds";

interface SeedState {
    seed: SeedApi | undefined;
    loading: boolean;
    error: string | undefined;
}

export const getSeed = createAsyncThunk("seeds/getSeed", async (seedId: string) => {
  const response = await api.get(`/seeds/${seedId}`);
  return response.data.data;
})

const initialState: SeedState = {
    seed: undefined,
    loading: false,
    error: undefined
};

const slice = createSlice({
  name: "seed",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSeed.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(getSeed.fulfilled, (state, action) => {
        state.loading = false;
        state.seed = action.payload;
      })
      .addCase(getSeed.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const reducer = slice.reducer;
export default reducer;
