import { configureStore } from '@reduxjs/toolkit';
import keyGeneratorReducer from '../features/keyGenerator/keyGeneratorSlice';

export default configureStore({
  reducer: {
    keyGenerator: keyGeneratorReducer,
  },
});
