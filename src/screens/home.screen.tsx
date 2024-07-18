import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Alert} from 'react-native';
import {colors} from '../utils/colors';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RouteParamList} from '../routes/routes.type';
import {userLogout} from '../redux/user/user.action';

const HomeScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RouteParamList>>();

  const handleLogout = async () => {
    const result = await userLogout();

    if (!result?.success) {
      return Alert.alert('Error', 'Failed to logout');
    }

    navigation.replace('LoginScreen');
  };

  return (
    <View style={styles.container}>
      <Text>HomeScreen</Text>
      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={styles.textButton}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, alignItems: 'center', justifyContent: 'center'},
  button: {
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    marginTop: 25,
    borderRadius: 20,
    width: '80%',
  },
  textButton: {
    fontWeight: '800',
    color: colors.white,
  },
});

export default HomeScreen;
