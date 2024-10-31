// eslint-disable-next-line import/named
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define a type for the slice state
export interface LoadingState {
  isAppLoading: boolean;
}

// Define the initial state using that type
const initialState: LoadingState = {
  isAppLoading: true,
};

export const loadingSlice = createSlice({
  name: 'loadingState',
  initialState,
  reducers: {
    loadingReducer: (state, action: PayloadAction<LoadingState>) => {
      state.isAppLoading = action.payload.isAppLoading;
    },
  },
});

export const { loadingReducer } = loadingSlice.actions;

export default loadingSlice.reducer;
