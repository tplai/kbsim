import { createSlice } from '@reduxjs/toolkit';

export const keyContainerSlice = createSlice({
  name: 'keyContainer',
  initialState: {
    keyPresses: [],
  },
  reducers: {
    handleKeyDown: (state, action) => {
      state.keyPresses.push(action.payload);
      // console.log("XD");
    },
    handleKeyUp: (state, action) => {
      console.log(action.payload);
    },
  },
});

export const { handleKeyDown, handleKeyUp } = keyContainerSlice.actions;

export const selectKeyPresses = state => state.keyContainer.keyPresses;

export default keyContainerSlice.reducer;
