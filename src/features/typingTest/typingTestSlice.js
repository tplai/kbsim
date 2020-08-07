import React from 'react';
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
    words: [],
    keystrokes: {
      correct: 0,
      incorrect: 0
    },
    index: 0,
    // wordRef: React.createRef(),
  },
  reducers: {
    generateWords: (state) => {
      state.words = [];
      let randomwords = getRandom(wordList, 30);
      for (let word in randomwords) {
        let wordObj = {
          text: randomwords[word],
          focused: false,
          status: "default",
          ref: null,
        }
        randomwords[word] = wordObj;
      }
      randomwords[0].focused = true;
      // randomwords[0].ref = state.wordRef;
      state.words = randomwords;
    },
    updateWords: (state) => {

    },
    incrementWord: (state) => {
      if (state.words.length - 1 > state.index) {
        state.words[state.index].focused = false;
        state.words[++state.index].focused = true;
        // state.words[state.index].focused = false;
        // state.words[state.index].ref = null;
        // state.words[state.index + 1].ref = action.payload.ref;
        // state.words[state.index + 1].focused = true;
        // state.index++;
        // console.log(state.index);
      }
    },
    keyDown: (state, action) => {

    },
    tick: (state, action) => {
      state.time--;
    },
    redo: (state, action) => {
    },
  },
});

export const { generateWords, incrementWord, keyDown, tick, redo } = typingTestSlice.actions;

// state exports
export const selectTime = state => state.typingTest.time;
export const selectWords = state => state.typingTest.words;
export const selectWordIndex = state => state.typingTest.index;
// export const selectWordRef = state => state.typingTest.wordRef;

export default typingTestSlice.reducer;
