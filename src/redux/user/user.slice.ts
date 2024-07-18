import {UserState} from './user.entity';
import userReducer from './user.reducer';
import {createSlice} from '@reduxjs/toolkit';

export const initialState: UserState = {
  user: null,
};

const userSlice = createSlice({
  name: 'front-office',
  initialState: initialState,
  reducers: userReducer,
});

export const {actions, reducer} = userSlice;
