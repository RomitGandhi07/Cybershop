// eslint-disable-next-line import/named
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../';
import { UserState } from '@/interfaces';


// Define the initial state using that type
const initialState: UserState = {
  id: '',
  email: '',
  firstName: '',
  lastName: '',
  name: '',
  isEnabled: false,
  type: '',
  isIndividualServiceProvider: null
};

export const userSlice = createSlice({
  name: 'userState',
  initialState,
  reducers: {
    resetUserInfo: (state) => {
      Object.assign(state, initialState);
    },
    updateUserInfo: (state, action: PayloadAction<UserState>) => {
      state.id = action.payload.id;
      state.email = action.payload.email;
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.name = action.payload.name;
      state.isEnabled = action.payload.isEnabled;
      state.type = action.payload.type;
      state.isIndividualServiceProvider = action.payload.isIndividualServiceProvider;
    }
  },
});

export const { resetUserInfo, updateUserInfo } = userSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const userInfo = (state: RootState) => state.user;

export default userSlice.reducer;
