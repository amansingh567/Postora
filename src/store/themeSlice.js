import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    themeMode: "light"
}

const themeSlice = createSlice({
    name: "theme",
    initialState,
    reducers: {
        lightTheme: (state) => {
          state.themeMode = "light";
          localStorage.setItem("theme", "light"); // ✅ Save to localStorage
        },
        darkTheme: (state) => {
          state.themeMode = "dark";
          localStorage.setItem("theme", "dark"); // ✅ Save to localStorage
        },
      },
});

export const {lightTheme , darkTheme} = themeSlice.actions;

export default themeSlice.reducer;