import { configureStore } from '@reduxjs/toolkit';
import keySimulatorReducer from '../features/keySimulator/keySimulatorSlice';

export default configureStore({
  reducer: {
    keySimulator: keySimulatorReducer,
  },
});
