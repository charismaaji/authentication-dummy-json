import * as Keychain from 'react-native-keychain';

export const getToken = async () => {
  const credentials = await Keychain.getGenericPassword();

  if (!credentials) {
    return null;
  }

  return credentials.password;
};

export const getRefreshToken = async () => {
  const credentials = await Keychain.getGenericPassword({
    service: 'refreshToken',
  });

  if (!credentials) {
    return null;
  }

  return credentials.password;
};

export const saveTokenToStorage = async ({
  token,
  refreshToken,
}: {
  token: string;
  refreshToken: string;
}) => {
  await Keychain.setGenericPassword('token', token);
  await Keychain.setGenericPassword('refreshToken', refreshToken, {
    service: 'refreshToken',
  });
};

export const removeTokens = async () => {
  try {
    await Keychain.resetGenericPassword();
    await Keychain.resetGenericPassword({service: 'refreshToken'});
    return {
      success: true,
    };
  } catch (error) {
    return {
      success: false,
    };
  }
};
