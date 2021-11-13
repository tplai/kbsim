import { configureStore } from '@reduxjs/toolkit';
import themeProviderReducer from '../themeProvider/themeProviderSlice';
import keySimulatorReducer from '../keySimulator/keySimulatorSlice';
import typingTestReducer from '../typingTest/typingTestSlice';

export default configureStore({
  reducer: {
    themeProvider: themeProviderReducer,
    keySimulator: keySimulatorReducer,
    typingTest: typingTestReducer,
  },
});
