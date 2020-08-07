import { configureStore } from '@reduxjs/toolkit';
import keySimulatorReducer from '../features/keySimulator/keySimulatorSlice';
import typingTestReducer from '../features/typingTest/typingTestSlice';

export default configureStore({
  reducer: {
    keySimulator: keySimulatorReducer,
    typingTest: typingTestReducer,
  },
});
