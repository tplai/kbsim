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
      // reset existing words
      if (state.index < state.words.length) {
        state.words[state.index].focused = false;
      }
      state.words = [];
      state.index = 0;

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
    incrementWord: (state) => {
      if (state.words.length - 1 > state.index) {
        state.words[state.index].focused = false;
        state.words[++state.index].focused = true;
      }
    },
    shiftWords: (state) => {
      if (state.index > 0) {
        state.words.splice(0, state.index);
      }
      state.index = 0;
      let randomwords = getRandom(wordList, 15);
      for (let word in randomwords) {
        let wordObj = {
          text: randomwords[word],
          focused: false,
          status: "default",
          ref: null,
        }
        randomwords[word] = wordObj;
      }
      state.words = [...state.words, ...randomwords];
    },
    classifyWord: (state, action) => {
      if (action.payload.input === state.words[action.payload.index].text) {
        state.words[action.payload.index].status = "correct";
      }
      else {
        state.words[action.payload.index].status = "incorrect";
      }
    },
    spellCheck: (state, action) => {
      // console.log(action.payload);
      if (action.payload.input) {
        if (action.payload.input.length <= state.words[state.index].text.length) {
          if (state.words[state.index].text.substring(0, action.payload.input.length) === action.payload.input) {
            state.words[state.index].status = "default";
          }
          else {
            state.words[state.index].status = "incorrect";
          }
        }
        else {
          state.words[state.index].status = "incorrect";
        }
      }
    },
    tick: (state, action) => {
      state.time--;
    },
    redo: (state, action) => {
    },
  },
});

export const { generateWords, incrementWord, shiftWords, classifyWord, spellCheck, tick, redo } = typingTestSlice.actions;

// state exports
export const selectTime = state => state.typingTest.time;
export const selectWords = state => state.typingTest.words;
export const selectWordIndex = state => state.typingTest.index;
// export const selectWordRef = state => state.typingTest.wordRef;

export default typingTestSlice.reducer;
