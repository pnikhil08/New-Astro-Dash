// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


// // Function to extract CSRF token from cookies
// const getCsrfTokenFromCookie = () => {
//   const matches = document.cookie.match(/XSRF-TOKEN=([^;]+)/);
//   return matches ? decodeURIComponent(matches[1]) : null;
// };

// export const loginUser = createAsyncThunk(
//   "auth/loginUser",
//   async ({ mobile, password }, { rejectWithValue }) => {
//     try {
//       // Step 1: Get CSRF cookie from Laravel backend
//       await fetch("http://webdemo.dhwaniastro.co.in/sanctum/csrf-cookie", {
//         method: "GET",
//         credentials: "include", // ✅ Ensures cookies are included
//       });

//       // Step 2: Extract CSRF token from cookies
//       const csrfToken = getCsrfTokenFromCookie();
//       if (!csrfToken) throw new Error("CSRF Token not found");

//       // Step 3: Send login request with CSRF token
//       const response = await fetch("http://webdemo.dhwaniastro.co.in/api/signin", {
//         method: "POST",
//         credentials: "include", // ✅ Ensures cookies are included
//         headers: {
//           "Content-Type": "application/json",
//           "Accept": "application/json",
//           "X-Requested-With": "XMLHttpRequest",
//           "X-XSRF-TOKEN": csrfToken, // ✅ Manually send CSRF token
//         },
//         body: JSON.stringify({ mobile, password }),
//       });

//       const data = await response.json();
//       if (!response.ok) throw new Error(data?.message || "Login failed. Please try again.");

//       return data;
//     } catch (error) {
//       console.error("Login Error:", error.message);
//       return rejectWithValue(error.message || "Login failed");
//     }
//   }
// );

// // Initial state
// const initialState = {
//   user: null,
//   token: null,
//   isLoading: false,
//   error: null,
// };

// // Create authentication slice
// const loginSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     logout: (state) => {
//       state.user = null;
//       state.token = null;
//       localStorage.removeItem("token"); // Remove token from storage
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(loginUser.pending, (state) => {
//         state.isLoading = true;
//         state.error = null;
//       })
//       .addCase(loginUser.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.user = action.payload.user;
//         state.token = action.payload.token;
//         localStorage.setItem("token", action.payload.token); // Store token
//       })
//       .addCase(loginUser.rejected, (state, action) => {
//         state.isLoading = false;
//         state.error = action.payload;
//       });
//   },
// });

// // Export actions and reducer
// export const { logout } = loginSlice.actions;
// export default loginSlice.reducer;


import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ mobile, password }, { rejectWithValue }) => {
    try {
      // Hardcoded CSRF Token (for testing only)
      const csrfToken = "eyJpdiI6IlpmVXdPU0xtUFIyUER0aVNzQlBVZWc9PSIsInZhbHVlIjoiRzlWSTNMWHdwckZEcEZzNDlJOE83YVhaVkVJMXczZlllYzF2WEpkcGUzVVFHK2VubERXRW15QTV4VENoOUE5SG0vZkVjQ2gwOVh5MnFOa1VvMnZ3SlBFQnFVZGN1TzcrY1BlRmtpQm9YVjBMZkptekp5";

      // Step 1: Get CSRF cookie from Laravel backend
      await fetch("http://webdemo.dhwaniastro.co.in/sanctum/csrf-cookie", {
        method: "GET",
        credentials: "include",
      });

      // Step 2: Send login request with Hardcoded CSRF token
      const response = await fetch("http://webdemo.dhwaniastro.co.in/api/signin", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "X-Requested-With": "XMLHttpRequest",
          "X-XSRF-TOKEN": csrfToken,  // Manually setting token
        },
        body: JSON.stringify({ mobile, password }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data?.message || "Login failed. Please try again.");

      return data;
    } catch (error) {
      console.error("Login Error:", error.message);
      return rejectWithValue(error.message || "Login failed");
    }
  }
);


// Initial state
const initialState = {
  user: null,
  token: null,
  isLoading: false,
  error: null,
};

// Create authentication slice
const loginSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("token"); // Remove token from storage
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        localStorage.setItem("token", action.payload.token); // Store token
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

// Export actions and reducer
export const { logout } = loginSlice.actions;
export default loginSlice.reducer;
