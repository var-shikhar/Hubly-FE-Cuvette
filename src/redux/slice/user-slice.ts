import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { ROUTES } from "../../lib/route"
import { sessionLogout } from "../../lib/utils"
import { apiService } from "../../services/axiosService"

export type User = {
  id: string
  name: string
  email: string
  isAdmin: boolean
}

export interface UserState {
  user: User | null
  loading: boolean
  error: string | null
}

const initialState: UserState = {
  user: null,
  loading: false,
  error: null,
}

// Signin User
export const loginUser = createAsyncThunk(
  "user/login",
  async (
    credentials: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const data = await apiService.post(ROUTES.LoginRoute, credentials)
      return data
    } catch (error: unknown) {
      if (typeof error === "object" && error !== null && "message" in error) {
        return rejectWithValue((error as { message: string }).message)
      }
      return rejectWithValue("Login failed due to an unknown error")
    }
  }
)

// Signup User
export const signupUser = createAsyncThunk(
  "user/signup",
  async (
    userData: {
      firstName: string
      lastName: string
      email: string
      password: string
      confirmPassword: string
    },
    { rejectWithValue }
  ) => {
    try {
      const data = await apiService.post(ROUTES.RegisterRoute, userData)
      return data
    } catch (error: unknown) {
      if (typeof error === "object" && error !== null && "message" in error) {
        return rejectWithValue((error as { message: string }).message)
      }
      return rejectWithValue("Signup failed due to an unknown error")
    }
  }
)

// Logout User
export const logoutUser = createAsyncThunk(
  "user/logout",
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiService.get(ROUTES.LogoutRoute)
      sessionLogout(false)
      return response
    } catch (error: unknown) {
      if (typeof error === "object" && error !== null && "message" in error) {
        return rejectWithValue((error as { message: string }).message)
      }
      return rejectWithValue("Signup failed due to an unknown error")
    }
  }
)

// User Slice
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    renderInitialState: (state) => {
      state.error = null
      state.loading = false
    },
    checkLocalStorage: (state) => {
      const storedUser = localStorage.getItem("user")
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser)
        if (parsedUser.expiresAt && Date.now() > parsedUser.expiresAt) {
          localStorage.removeItem("user")
          state.user = null
          state.loading = false
          state.error = "Session expired. Please log in again."
        } else {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { expiresAt, ...userWithoutExpires } = parsedUser
          state.user = userWithoutExpires
          state.loading = false
          state.error = null
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.user = action.payload
        state.loading = false
        const expiresAt = Date.now() + 1000 * 60 * 60 * 2
        localStorage.setItem(
          "user",
          JSON.stringify({ ...action.payload, expiresAt })
        )
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })

      .addCase(signupUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(signupUser.fulfilled, (state) => {
        state.loading = false
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.error = action.payload as string
        state.loading = false
      })

      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false
        state.error = null
        state.user = null
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
  },
})

// Export Reducer and Actions
export const { renderInitialState, checkLocalStorage } = userSlice.actions
export const userReducer = userSlice.reducer
