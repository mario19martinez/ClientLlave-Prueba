import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  users: [],
  user: {},
  isLoading: false,
  error: null,
};

// Action para obtener usuarios
export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const response = await axios.get("/user");
  return response.data;
});

// Action para obtener un usuario por ID
export const fetchUserDetails = createAsyncThunk(
  "users/fetchUserDetails",
  async (identificacion) => {
    const response = await axios.get(`/user/${identificacion}`);
    return response.data;
  }
);

// Action para banear o desbanear un usuario
export const banUser = createAsyncThunk(
  "users/banUser",
  async (identificacion) => {
    const response = await axios.put(`/user/ban/${identificacion}`);
    return response.data;
  }
);

// Action para eliminar un usuario
export const deleteUser = createAsyncThunk("users/deleteUser", async (id) => {
  await axios.delete(`/user/deleted/${id}`);
  return id;
});

const AdminUsersSlices = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(fetchUserDetails.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUserDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(fetchUserDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(banUser.fulfilled, (state, action) => {
        // Actualiza el estado del usuario en el array de usuarios
        state.users = state.users.map((user) =>
          user.identificacion === action.payload.identificacion
            ? action.payload
            : user
        );
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter((user) => user.id !== action.payload);
      });
  },
});

export const selectUsers = (state) => state.users;

export default AdminUsersSlices.reducer;
