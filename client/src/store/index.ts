import { configureStore } from '@reduxjs/toolkit';

import userReducerSlice from './slices/user';
import loadingReducerSlice from './slices/loading';


export const makeStore = () => {
    return configureStore({
        reducer: {
          user: userReducerSlice,
          loading: loadingReducerSlice
        },
      //   middleware: (getDefaultMiddleware) => {
      //     return getDefaultMiddleware({
      //       serializableCheck: {
      //         ignoredPaths: [],
      //       },
      //     });
      //   },
      });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = AppStore['dispatch'];
