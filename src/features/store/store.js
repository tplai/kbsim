import { configureStore } from '@reduxjs/toolkit';
import keySimulatorReducer from '../keySimulator/keySimulatorSlice';
import typingTestReducer from '../typingTest/typingTestSlice';

export default configureStore({
  reducer: {
    keySimulator: keySimulatorReducer,
    typingTest: typingTestReducer,
  },
});
