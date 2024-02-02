import { createAsyncThunk, createSlice, createAction } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loginStatus: "idle",
  userData: null,
  error: null,
};

// Inicio de sesion de usuario
export const loginUser = createAsyncThunk(
  "users/loginUser",
  async (userData) => {
    try {
      const response = await axios.post("/login", userData);
      return response.data.token;
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      throw error;
    }
  }
);

// Registro de usuario
export const registerUser = createAsyncThunk(
  "users/registerUser",
  async (userData) => {
    console.log(userData);
    try {
      const response = await axios.post("/user", userData);
      //console.log("Datos del usuario registrado:", response.data);

      return { success: true, response: response.data };
    } catch (error) {
      console.error("Error al registrar al usuario:", error);
      throw error;
    }
  }
);

export const clearRegistrationStatus = createAction(
  "users/clearRegistrationStatus"
);

// Traer el usuario por email
export const getUserData = createAsyncThunk(
  "users/getUserData",
  async (email) => {
    try {
      const response = await axios.get(`/user/email/${email}`);
      //console.log("Datos del usuario:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error al obtener los datos del usuario:", error);
      throw error;
    }
  }
);

// Editar usuario
export const updateUser = createAsyncThunk(
  "users/updateUser",
  async ({ id, userData }) => {
    try {
      const response = await axios.put(`/user/${id}`, userData);
      console.log("Usuario actualizado:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error al actualizar el usuario:", error);
      throw error;
    }
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loginStatus = "loading";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loginStatus = "succeeded";
        state.token = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loginStatus = "failed";
        state.error = action.error.message;
      })
      .addCase(registerUser.pending, (state) => {
        state.registrationStatus = "loading";
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.registrationStatus = "succeeded";
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.registrationStatus = "failed";
        state.error = action.error.message;
      })
      .addCase(clearRegistrationStatus, (state) => {
        state.registrationStatus = "idle";
        state.error = null;
      })
      .addCase(getUserData.pending, (state) => {
        state.userData = null; // Reiniciar los datos del usuario al cargar
      })
      .addCase(getUserData.fulfilled, (state, action) => {
        state.userData = action.payload; // Almacenar los datos del usuario
      })
      .addCase(getUserData.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(updateUser.pending, (state) => {
        state.loginStatus = "loading";
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loginStatus = "succeeded";
        state.userData = action.payload; // Actualiza los datos del usuario
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loginStatus = "failed";
        state.error = action.error.message;
      });
  },
});

export default usersSlice.reducer;
