import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  userCourseData: null,
  loading: "idle",
  error: null,
};

//Traer las clases vistas
export const fetchSeguimiento = createAsyncThunk(
  "userCourses/fetchSeguimiento",
  async (userId) => {
    try {
      const response = await axios.get(`/seguimiento/${userId}`);
      return response.data;
    } catch (error) {
      console.error("Error al obtener los datos de seguimiento:", error);
      throw error;
    }
  }
);

//Traer los cursos inscritos
export const fetchInscripcion = createAsyncThunk(
  "userCourses/fetchInscripcion",
  async (userId) => {
    try {
      const response = await axios.get(`/userCourse/${userId}`);
      return response.data;
    } catch (error) {
      console.error("Error al obtener los datos de inscripción:", error);
      throw error;
    }
  }
);

//Inscribir a un usuario a un curso
export const addStudentToCourse = createAsyncThunk(
  "userCourses/addStudentToCourse",
  async ({ userId, cursoId }) => {
    try {
      //console.log("Intentando agregar estudiante al curso...");
      const response = await axios.post("/userCourse", { userId, cursoId });
      //console.log("Respuesta del servidor:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error al agregar estudiante al curso:", error);
      throw error;
    }
  }
);

const userCoursesSlice = createSlice({
  name: "userCourses",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSeguimiento.pending, (state) => {
        state.loading = "loading";
      })
      .addCase(fetchSeguimiento.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.userCourseData = {
          ...state.userCourseData,
          seguimiento: action.payload,
        };
      })
      .addCase(fetchSeguimiento.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchInscripcion.pending, (state) => {
        state.loading = "loading";
      })
      .addCase(fetchInscripcion.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.userCourseData = {
          ...state.userCourseData,
          inscripcion: action.payload,
        };
      })
      .addCase(fetchInscripcion.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message;
      })
      .addCase(addStudentToCourse.pending, (state) => {
        state.loading = "loading";
      })
      .addCase(addStudentToCourse.fulfilled, (state) => {
        state.loading = "succeeded";
      })
      .addCase(addStudentToCourse.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message;
        console.error("Error al inscribir al usuario al curso:", action.error);
      });
  },
});

export default userCoursesSlice.reducer;
