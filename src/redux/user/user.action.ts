import {Dispatch} from '@reduxjs/toolkit';
import {dispatchable} from '../dispatchable';
import {LoginParams, LoginResponse, UserDetailEntity} from './user.entity';
import {actions} from './user.slice';
import {instance} from '../../api/instance';
import {AxiosResponse} from 'axios';
import {
  getRefreshToken,
  getToken,
  removeTokens,
  saveTokenToStorage,
} from '../../utils';

export const userLogin = dispatchable(({username, password}: LoginParams) => {
  return async (dispatch: Dispatch) => {
    try {
      const result: AxiosResponse<LoginResponse> = await instance.post(
        '/login',
        {username, password},
      );

      const {status, data} = result;

      if (status === 200) {
        const getUserDetail: AxiosResponse<UserDetailEntity> =
          await instance.get('/me', {
            headers: {
              Authorization: `Bearer ${data.token}`,
            },
          });

        await saveTokenToStorage({
          token: data.token,
          refreshToken: data.refreshToken,
        });

        dispatch(actions['user/set-user'](getUserDetail.data));

        return {
          success: true,
        };
      }
    } catch (error: any) {
      return {
        success: false,
        error: error.message,
      };
    }
  };
});

export const refreshToken = dispatchable(() => {
  return async (dispatch: Dispatch) => {
    try {
      const tokenFromKeychain = await getToken();
      const refreshTokenFromKeychain = await getRefreshToken();

      if (!tokenFromKeychain) {
        return {
          success: false,
        };
      }

      const response = await instance.post('/refresh', {
        refreshToken: refreshTokenFromKeychain,
      });

      const {status, data} = response;

      if (status === 200) {
        const getUserDetail: AxiosResponse<UserDetailEntity> =
          await instance.get('/me', {
            headers: {
              Authorization: `Bearer ${data.token}`,
            },
          });

        await saveTokenToStorage({
          token: data.token,
          refreshToken: data.refreshToken,
        });

        dispatch(actions['user/set-user'](getUserDetail.data));

        return {
          success: true,
        };
      }
    } catch (error: any) {
      return {
        success: false,
      };
    }
  };
});

export const userLogout = dispatchable(() => {
  return async (dispatch: Dispatch) => {
    try {
      const result = await removeTokens();

      if (result.success) {
        dispatch(actions['user/set-user'](null));
        return {
          success: true,
        };
      }
    } catch (error) {
      return {
        success: false,
      };
    }
  };
});
