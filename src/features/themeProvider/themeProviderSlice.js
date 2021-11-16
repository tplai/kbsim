import { createSlice } from '@reduxjs/toolkit';

export const themeProviderSlice = createSlice({
    name: 'themeProvider',
    initialState: {
        theme: "dark",
    },
    reducers: {
        toggleTheme: (state) => {
            state.theme = (state.theme == "light") ? "dark" : "light"
            // state.theme = "light";
        },
    },
});

export const { toggleTheme } = themeProviderSlice.actions;

// state exports
export const selectTheme = state => state.themeProvider.theme;

export default themeProviderSlice.reducer;

