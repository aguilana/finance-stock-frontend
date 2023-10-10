import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../../services/firebase';
import { AppDispatch } from '../store';
import { config } from '../../common';
const { API_ENDPOINT } = config;
import { User, AuthState } from '../../types/types';
import axios from 'axios';

axios.defaults.withCredentials = true;

const initialState: AuthState = {
  user: null,
  isLoading: true,
  error: null,
};

export const loginUser = createAsyncThunk<
  User,
  {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    name: string;
  },
  { dispatch: AppDispatch }
>('auth/loginUser', async ({ email, password, firstName, lastName, name }) => {
  try {
    console.log(
      'api endpoint',
      import.meta.env.VITE_BACKEND_API_URL,
      API_ENDPOINT
    );
    if (name === 'signup') {
      const { data } = await axios.post(`${API_ENDPOINT}/auth/signup`, {
        email,
        password,
        firstName,
        lastName,
        name,
      });

      console.log(
        'data coming back from the backend api SIGNUP ACTION NEW USER',
        data
      );
      return data; // This will be sent as the action payload on success (user is returned this will be the user.)
    } else {
      console.log(
        `LOGIN USER ACTION TO THIS ENDPOINT: ${API_ENDPOINT}/auth/login`
      );
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log('userCredential', userCredential);

      const token = await userCredential.user.getIdToken(true);
      const otherToken = await auth.currentUser?.getIdToken(true);
      // const token = await auth.currentUser?.getIdToken(true);
      // Store the token in localStorage
      console.log('token frontend and otherToken frontend\n', {
        token,
        otherToken,
      });
      localStorage.setItem('token', token || '');
      const { data } = await axios.post(
        `${API_ENDPOINT}/auth/login`,
        {
          email,
          password,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log('data coming back from the backend api', data);
      return data;
    }
  } catch (error) {
    throw error; // This will trigger the rejection action
  }
});

// Async thunk for signing out
export const logoutUser = createAsyncThunk('auth/signOut', async () => {
  try {
    localStorage.removeItem('token'); // Clear token from localStorage
    signOut(auth);
    return null; // This will be sent as the action payload on success (user is null)
  } catch (error) {
    throw error; // This will trigger the rejection action
  }
});

// Create an async thunk for checking authentication state
export const checkAuthState = createAsyncThunk<User | null, void>(
  'auth/checkAuthState',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token'); // Assuming the token is stored in localStorage
      if (!token) {
        console.log('not authenticated');
        return null; // No token available in localStorage, so the user is not authenticated.
      }

      const { data } = await axios.get(`${API_ENDPOINT}/auth/check`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (data && data.user) {
        // console.log('authenticated in checkAuthState', data);
        return {
          email: data.user.email,
          displayName: `${data.user.firstName} ${data.user.lastName}`,
          ...(data.user.isAdmin && { isAdmin: true }),
        }; // Return the user data
      } else {
        console.log('not authenticated');
        return null; // User data not found in the response
      }
    } catch (error) {
      console.error('Error checking authentication status', error);
      return rejectWithValue(error); // Reject with the error
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.isLoading = false;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.error = action.error;
        state.isLoading = false;
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.user = action.payload;
        state.isLoading = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      })
      .addCase(checkAuthState.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkAuthState.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoading = false;
      })
      .addCase(checkAuthState.rejected, (state, action) => {
        state.error = action.error;
        state.isLoading = false;
      });
  },
});

export const { login } = authSlice.actions;
export const selectUser = (state: { auth: AuthState }) => state.auth.user;

export default authSlice.reducer;
