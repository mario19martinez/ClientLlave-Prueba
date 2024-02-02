import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  cursos: [],
  cursoDetail: {},
  status: "idle",
  error: null,
};

export const getCursos = createAsyncThunk(
  "courses/getCursos", 
  async () => {
  const response = await axios.get("/cursos");
  //console.log('soy cursos del slice', response.data);
  return response.data;
});

export const fetchCursos = createAsyncThunk(
  "courses/fetchCursos",
  async (id = "") => {
    const response = await axios.get(
      `/cursos/${id}/clases`
    );
    return response.data;
  }
);

export const fetchCursoDetail = createAsyncThunk(
  "courses/fetchCursoDetail",
  async (id) => {
    const response = await axios.get(`/cursos/${id}`);
    //console.log('Soy detalles desde el slice', response.data);
    return response.data;
  }
);

export const createCurso = createAsyncThunk(
  "courses/createCurso",
  async (cursoData) => {
    const response = await axios.post(
      "/newCurso",
      cursoData
    );
    return response.data;
  }
);

export const updateCurso = createAsyncThunk(
  "courses/updateCurso",
  async ({ id, cursoData }) => {
    const response = await axios.put(
      `/newCurso/${id}`,
      cursoData
    );
    return response.data;
  }
);

export const deleteCurso = createAsyncThunk(
  "courses/deleteCurso",
  async (id) => {
    await axios.delete(`/curso/${id}`);
    return id;
  }
);

const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCursos.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getCursos.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.cursos = action.payload;
      })
      .addCase(getCursos.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchCursos.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCursos.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.cursos = action.payload;
      })
      .addCase(fetchCursos.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchCursoDetail.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCursoDetail.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.cursoDetail = action.payload;
      })
      .addCase(fetchCursoDetail.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(createCurso.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.cursos.push(action.payload);
      })
      .addCase(updateCurso.fulfilled, (state, action) => {
        state.status = "succeeded";
        const index = state.cursos.findIndex(
          (curso) => curso.id === action.payload.id
        );
        if (index !== -1) {
          state.cursos[index] = action.payload;
        }
      })
      .addCase(deleteCurso.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.cursos = state.cursos.filter(
          (curso) => curso.id !== action.payload
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
export default coursesSlice.reducer;
