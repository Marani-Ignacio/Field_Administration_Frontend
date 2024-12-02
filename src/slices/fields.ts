import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Field, FieldApi } from "../types/fields";
import api from "../config/axios";

interface FieldsState {
  allFields: {
    list: FieldApi[];
    loading: boolean;
    error: string | undefined;
  };
  myFields: {
    list: FieldApi[];
    loading: boolean;
    error: string | undefined;
  };
}

export const getFields = createAsyncThunk("fields/getFields", async () => {
  const response = await api.get("/fields");
  return response.data.data;
});

export const getMyFields = createAsyncThunk(
  "fields/getMyFields",
  async (userId: string) => {
    const response = await api.get(`/fields/myFields/${userId}`);
    return response.data.data;
  }
);

export const postField = createAsyncThunk(
  "fields/postField",
  async (newField: Field) => {
    const response = await api.post("/fields/", newField);
    return response.data;
  }
);

export const deleteField = createAsyncThunk(
  "fields/deleteField",
  async (fieldId: string) => {
    await api.delete(`/fields/${fieldId}`);
    return fieldId;
  }
);

export const patchField = createAsyncThunk(
  "fields/patchField",
  async ({ id, updates }: { id: string; updates: Partial<Field> }) => {
    const response = await api.patch(`/fields/${id}`, updates);
    return response.data;
  }
);

const initialState: FieldsState = {
  allFields: {
    list: [],
    loading: false,
    error: undefined,
  },
  myFields: {
    list: [],
    loading: false,
    error: undefined,
  }
};

const slice = createSlice({
  name: "fields",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFields.pending, (state) => {
        state.allFields.loading = true;
        state.allFields.error = undefined;
      })
      .addCase(getFields.fulfilled, (state, action) => {
        state.allFields.loading = false;
        state.allFields.list = action.payload;
      })
      .addCase(getFields.rejected, (state, action) => {
        state.allFields.loading = false;
        state.allFields.error = action.error.message;
      });

    builder
      .addCase(getMyFields.pending, (state) => {
        state.myFields.loading = true;
        state.myFields.error = undefined;
        state.myFields.list = [];
      })
      .addCase(getMyFields.fulfilled, (state, action) => {
        state.myFields.loading = false;
        state.myFields.list = action.payload;
      })
      .addCase(getMyFields.rejected, (state, action) => {
        state.myFields.loading = false;
        state.myFields.error = action.error.message;
      });

    builder
      .addCase(postField.fulfilled, (state, action) => {
        const newField = action.payload;
        state.allFields.list.push(newField);
        state.myFields.list.push(newField);
      })
      .addCase(deleteField.fulfilled, (state, action) => {
        const fieldId = action.payload;
        state.allFields.list = state.allFields.list.filter(
          (field) => field._id !== fieldId
        );
        state.myFields.list = state.myFields.list.filter(
          (field) => field._id !== fieldId
        );
      })
      .addCase(patchField.fulfilled, (state, action) => {
        const updatedField = action.payload;
        const updateList = (list: FieldApi[]) =>
          list.map((field) =>
            field._id === updatedField._id ? updatedField : field
          );

        state.allFields.list = updateList(state.allFields.list);
        state.myFields.list = updateList(state.myFields.list);
      });
  },
});

export const reducer = slice.reducer;
export default reducer;
