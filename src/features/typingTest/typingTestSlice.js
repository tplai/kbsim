import React from 'react';
import { createSlice } from '@reduxjs/toolkit';
import { getRandom } from './../typingModules/typingModules.js';
import { wordList, shuffle } from './wordlist.js';

export const typingTestSlice = createSlice({
  name: 'typingTest',
  initialState: {
    input: "",
    started: false,
    endTime: null,
    interval: null,
    time: 0,
    stats: {
      wpm: "",
      keystrokes: {
        correct: 0,
        incorrect: 0
      },
      accuracy: "",
      words: {
        correct: 0,
        incorrect: 0,
      },
    },
    words: [],
    index: 0,
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
      if (state.index < state.words.length - 1) {
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
        state.stats.words.correct++;
      }
      else {
        state.words[action.payload.index].status = "incorrect";
        state.stats.words.incorrect++;
      }
    },
    spellCheck: (state, action) => {
      // console.log(action.payload);
      if (action.payload.input) {
        if (action.payload.input.length <= state.words[state.index].text.length) {
          if (state.words[state.index].text.substring(0, action.payload.input.length) === action.payload.input) {
            state.words[state.index].status = "default";
            state.stats.keystrokes.correct++;
          }
          else {
            state.words[state.index].status = "incorrect";
            state.stats.keystrokes.incorrect++;
          }
        }
        else {
          // console.log("yep");
          state.words[state.index].status = "incorrect";
        }
      }
    },
    tick: (state, action) => {
      state.time--;
    },
    startTimer: (state) => {
      state.started = true;
    },
    stopTimer: (state) => {
      state.started = false;
    },
    showResults: (state) => {
      console.log(`Correct words: ${state.stats.words.correct} Incorrect words: ${state.stats.words.incorrect}\n
        Correct keystrokes: ${state.stats.keystrokes.correct} Incorrect keystrokes: ${state.stats.keystrokes.incorrect}`);
    },
    resetTimer: (state, action) => {
      state.started = false;
      state.time = action.payload.time;
      state.stats = {
        wpm: "",
        keystrokes: {
          correct: 0,
          incorrect: 0
        },
        accuracy: "",
        words: {
          correct: 0,
          incorrect: 0,
        }
      };
    },

    clearHighlight: (state) => {
      state.started = false;
      // console.log(state.words.length);
      if (state.index < state.words.length) {
        state.words[state.index].focused = false;
      }
      state.words[state.index].status = "default";
      // console.log("XD");
    },
  },
});

export const {
  generateWords,
  incrementWord,
  shiftWords,
  classifyWord,
  spellCheck,
  tick,
  startTimer,
  stopTimer,
  showResults,
  resetTimer,
  clearHighlight,
 } = typingTestSlice.actions;

// state exports
export const selectWords = state => state.typingTest.words;
export const selectWordIndex = state => state.typingTest.index;
export const selectTime = state => state.typingTest.time;
export const selectStarted = state => state.typingTest.started;

export default typingTestSlice.reducer;
