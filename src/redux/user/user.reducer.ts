import {PayloadAction} from '@reduxjs/toolkit';
import {UserDetailEntity, UserState} from './user.entity';

export default {
  'user/set-user': (
    state: UserState,
    action: PayloadAction<UserDetailEntity | null>,
  ) => {
    state.user = action.payload;
  },
};
