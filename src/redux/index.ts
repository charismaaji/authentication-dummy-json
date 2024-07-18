import {configureStore} from '@reduxjs/toolkit';
import {reducer as userReducer} from './user/user.slice';
import {TypedUseSelectorHook, useSelector} from 'react-redux';

const reducers = {
  user: userReducer,
};

export const store = configureStore({
  reducer: reducers,
  enhancers: [],
});

export type ActionEntity = {
  type: string;
  payload?: any;
};
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
