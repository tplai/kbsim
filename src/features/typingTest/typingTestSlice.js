import { createSlice } from '@reduxjs/toolkit';
import { getRandom } from './../typingModules/typingModules.js';
import { wordList, shuffle } from './wordlist.js';

export const typingTestSlice = createSlice({
  name: 'typingTest',
  initialState: {
    input: "",
    time: 60,
    results: {
      wpm: "",
      keystrokes: "",
      accuracy: "",
    },
    words: getRandom(wordList, 30),
  },
  reducers: {
    keyDown: (state, action) => {

    },
    tick: (state, action) => {
      state.time--;
    },
    redo: (state, action) => {
    },
  },
});

export const { keyDown, tick, redo } = typingTestSlice.actions;

// state exports
export const selectTime = state => state.typingTest.time;
export const selectWords = state => state.typingTest.words;

export default typingTestSlice.reducer;
