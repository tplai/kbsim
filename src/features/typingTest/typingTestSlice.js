import { createSlice } from '@reduxjs/toolkit';

export const typingTestSlice = createSlice({
  name: 'typingTest',
  initialState: {
    input: "",
    results: {
      wpm: "",
      keystrokes: "",
      accuracy: "",
    },
    array: [],
  },
  reducers: {
    keyDown: (state, action) => {

    },
    redo: (state, action) => {
    },
  },
});

export const { keyDown, redo } = typingTestSlice.actions;

// state exports
export const selectLayout = state => state.typingTest.array;
export const selectLocations = state => state.typingTest.keyLocations;
export const selectKeyboardStyle = state => state.typingTest.keyboardStyle;
export const selectHighlight = state => state.typingTest.highlight;

export default typingTestSlice.reducer;
