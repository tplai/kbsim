import { createSlice } from '@reduxjs/toolkit';
import { palette } from "../theme/theme";

export const themeProviderSlice = createSlice({
    name: 'themeProvider',
    initialState: {
        theme: palette.light,
        current: "light",
    },
    reducers: {
        toggleTheme: (state) => {
            state.current = (state.current == "light") ? "dark" : "light";
            state.theme = palette[state.current];
            document.body.style = `background: ${[palette[state.current].background]};`;
        },
    },
});

export const { toggleTheme } = themeProviderSlice.actions;

// state exports
export const selectTheme = state => state.themeProvider.theme;

export default themeProviderSlice.reducer;

