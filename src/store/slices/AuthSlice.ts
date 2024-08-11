import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { IUser } from "../../interfaces";
import AuthService from "../../services/AuthService";
import axios from "axios";
import { API_URL } from "../../services";

export interface AuthState {
  user: IUser | null;
  isAuth: boolean;
}

const initialState: AuthState = {
  user: null,
  isAuth: false,
};

export const login = createAsyncThunk("auth/login", async ({ email, password, cb }: { email: string; password: string; cb: () => void }, thunkAPI) => {
  try {
    const response = await AuthService.login(email, password);
    localStorage.setItem("access-token", response.data.access_token);
    localStorage.setItem("refresh-token", response.data.refresh_token);
    if (cb) cb();
    return response.data.userDetails;
  } catch (error) {
    alert("Something went wrong, please try again");
    return thunkAPI.rejectWithValue("Login failed. Please check your email and password.");
  }
});

export const register = createAsyncThunk(
  "auth/register",
  async ({ photo, firstname, lastname, email, password, cb }: { photo: File; firstname: string; lastname: string; email: string; password: string; cb?: () => void }, thunkAPI) => {
    try {
      await AuthService.register(photo, firstname, lastname, email, password);
      if (cb) cb();
    } catch (error) {
      alert("Something went wrong, please try again");
      return thunkAPI.rejectWithValue("Registration failed. Please check your details.");
    }
  }
);

export const resetPass = createAsyncThunk("auth/resetPass", async ({ email, cb }: { email: string; cb: () => void }, thunkAPI) => {
  try {
    await AuthService.resetPassword(email);
    if (cb) cb();
  } catch (error) {
    alert("Something went wrong, please try again later");
    return thunkAPI.rejectWithValue("Reset password failed.");
  }
});

export const changePass = createAsyncThunk("auth/changePass", async ({ email, code, password, cb }: { email: string; code: string; password: string; cb: () => void }, thunkAPI) => {
  try {
    await AuthService.changePassword(email, code, password);
    if (cb) cb();
  } catch (error) {
    alert("Something went wrong, please try again later");
    return thunkAPI.rejectWithValue("Change password failed.");
  }
});

export const checkAuth = createAsyncThunk("auth/checkAuth", async (refresh_token: string | null, thunkAPI) => {
  if (refresh_token) {
    try {
      const response = await axios.post(`${API_URL}/api/auth/refreshtoken`, { token: refresh_token }, { withCredentials: true });
      localStorage.setItem("access-token", response.data.access_token);
      return response.data.userDetails;
    } catch (error) {
      return thunkAPI.rejectWithValue("Unauthorized");
    }
  } else {
    localStorage.removeItem("access-token");
    localStorage.removeItem("refresh-token");
    return thunkAPI.rejectWithValue("Unauthorized");
  }
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isAuth = false;
      localStorage.removeItem("access-token");
      localStorage.removeItem("refresh-token");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isAuth = true;
    });
    builder.addCase(login.rejected, (_, action) => {
      alert(action.payload);
    });
    builder.addCase(checkAuth.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isAuth = true;
    });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
