import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  clases: [], // Estado para almacenar las clases
  status: "idle",
  error: null,
};

// Obtener las clases de un curso por su ID
export const fetchClases = createAsyncThunk(
    "lesson/fetchClases",
    async (id) => {
      const response = await axios.get(`/cursos/${id}/clases`);
      console.log(response.data)
      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error("Curso no encontrado");
      }
    }
  );

// Crear una nueva clase en un curso
export const createClase = createAsyncThunk(
  "lesson/createClase",
  async (data) => {
    const response = await axios.post(`/cursos/${data.cursoId}/clases`, data);
    return response.data;
  }
);

// Modificar una clase en un curso
export const updateClase = createAsyncThunk(
  "lesson/updateClase",
  async (data) => {
    const { cursoId, claseId, updatedData } = data;
    const response = await axios.put(`/cursos/${cursoId}/clases/${claseId}`, updatedData);
    return response.data;
  }
);

// Eliminar una clase de un curso
export const deleteClase = createAsyncThunk(
  "lesson/deleteClase",
  async (data) => {
    await axios.delete(`/cursos/${data.cursoId}/clases/${data.claseId}`);
    return data.claseId;
  }
);

const lessonSlice = createSlice({
  name: "lesson",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchClases.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchClases.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.clases = action.payload;
      })
      .addCase(fetchClases.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(createClase.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.clases.push(action.payload);
      })
      .addCase(updateClase.fulfilled, (state, action) => {
        state.status = "succeeded";
        const index = state.clases.findIndex(
          (clase) => clase.id === action.payload.id
        );
        if (index !== -1) {
          state.clases[index] = action.payload;
        }
      })
      .addCase(deleteClase.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.clases = state.clases.filter(
          (clase) => clase.id !== action.payload
        );
      })
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state, action) => {
          state.status = "failed";
          state.error = action.error.message;
        }
      );
  },
});

export default lessonSlice.reducer;
