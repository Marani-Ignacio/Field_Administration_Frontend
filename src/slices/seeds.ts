import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Seed } from "../types/seeds";
import api from "../config/axios";

interface SeedsState {
  list: Seed[];
  loading: boolean;
  error: string | undefined;
}

export const getSeeds = createAsyncThunk("seeds/getSeeds", async () => {
  const response = await api.get("/seeds");
  return response.data.data;
});

export const postSeed = createAsyncThunk(
  "seeds/postSeed",
  async (newSeed: Seed) => {
    console.log(newSeed);
    const response = await api.post("/seeds/", newSeed);
    return response.data;
  }
);

export const deleteSeed = createAsyncThunk(
  "seeds/deleteSeed",
  async (seedId: string) => {
    await api.delete(`/seeds/${seedId}`);
    return seedId;
  }
);

export const patchSeed = createAsyncThunk(
  "seeds/patchSeed",
  async ({ id, updates }: { id: string; updates: Partial<Seed> }) => {
    const response = await api.patch(`/seeds/${id}`, updates);
    return response.data;
  }
);

const initialState: SeedsState = {
  list: [],
  loading: false,
  error: undefined,
};

const slice = createSlice({
  name: "seeds",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSeeds.pending, (state) => {
        state.loading = true;
        state.error = initialState.error;
      })
      .addCase(getSeeds.fulfilled, (state, action) => {
        state.loading = initialState.loading;
        state.list = action.payload;
      })
      .addCase(getSeeds.rejected, (state, action) => {
        state.loading = initialState.loading;
        state.list = initialState.list;
        state.error = action.error.message;
      })
      .addCase(postSeed.pending, (state) => {
        state.loading = true;
        state.error = initialState.error;
      })
      .addCase(postSeed.fulfilled, (state, action) => {
        state.loading = false;
        state.list.push(action.payload);
      })
      .addCase(deleteSeed.pending, (state) => {
        state.loading = true;
        state.error = initialState.error;
      })
      .addCase(deleteSeed.fulfilled, (state, action) => {
        state.loading = false;
        state.list = state.list.filter((field) => field._id !== action.payload);
      })
      .addCase(deleteSeed.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(patchSeed.pending, (state) => {
        state.loading = true;
        state.error = initialState.error;
      })
      .addCase(patchSeed.fulfilled, (state, action) => {
        state.loading = false;
        const updatedSeed = action.payload;
        const index = state.list.findIndex(
          (seed) => seed._id === updatedSeed._id
        );
        if (index !== -1) {
          state.list[index] = updatedSeed;
        }
      })
      .addCase(patchSeed.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const reducer = slice.reducer;

export default reducer;
