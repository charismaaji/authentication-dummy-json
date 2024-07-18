import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RouteParamList} from './routes.type';
import SplashScreen from '../screens/splash.screen';
import HomeScreen from '../screens/home.screen';
import LoginScreen from '../screens/login.screen';

const Stack = createNativeStackNavigator<RouteParamList>();

const Routes = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen component={SplashScreen} name="SplashScreen" />
      <Stack.Screen component={LoginScreen} name="LoginScreen" />
      <Stack.Screen component={HomeScreen} name="HomeScreen" />
    </Stack.Navigator>
  );
};
export default Routes;
