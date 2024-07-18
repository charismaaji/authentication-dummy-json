import React, {useEffect} from 'react';
import {Text, StyleSheet, ImageBackground} from 'react-native';
import {SplashScreenBackground} from '../assets';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RouteParamList} from '../routes/routes.type';
import {refreshToken} from '../redux/user/user.action';

const SplashScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RouteParamList>>();

  useEffect(() => {
    const handleToken = async () => {
      const result = await refreshToken();

      if (!result?.success) {
        navigation.replace('LoginScreen');

        return;
      }

      navigation.replace('HomeScreen');
    };

    handleToken();
  }, [navigation]);

  return (
    <ImageBackground style={styles.container} source={SplashScreenBackground}>
      <Text style={styles.text}>Auth Project</Text>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
  },
});

export default SplashScreen;
