import React, {Fragment, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {colors} from '../utils';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RouteParamList} from '../routes/routes.type';
import {userLogin} from '../redux/user/user.action';

const LoginScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RouteParamList>>();

  const [username, setUsername] = useState<string>('emilys');
  const [password, setPassword] = useState<string>('emilyspass');
  const [loading, setLoading] = useState<boolean>(false);

  const handleSignIn = async () => {
    setLoading(true);
    const result = await userLogin({
      username: username.toLowerCase(),
      password,
    });
    setLoading(false);

    if (!result?.success) {
      return Alert.alert('Error', result?.error);
    }

    navigation.replace('HomeScreen');
  };

  return (
    <Fragment>
      <SafeAreaView style={styles.header} />
      <SafeAreaView style={styles.container}>
        <View style={styles.subContainer}>
          <Text style={styles.title}>Auth Project</Text>
          <View style={styles.whiteSection}>
            <Text style={styles.subTitle}>Let's get something</Text>

            <View style={styles.wrapperInput}>
              <TextInput
                style={styles.input}
                value={username}
                onChangeText={setUsername}
                placeholder="Username"
              />
            </View>

            <View style={styles.wrapperInput}>
              <TextInput
                style={styles.input}
                value={password}
                onChangeText={setPassword}
                placeholder="Password"
                secureTextEntry
              />
            </View>

            <TouchableOpacity
              style={styles.button}
              disabled={loading}
              onPress={handleSignIn}>
              {loading ? (
                <ActivityIndicator size={'small'} />
              ) : (
                <Text style={styles.textButton}>Sign In</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </Fragment>
  );
};

const styles = StyleSheet.create({
  header: {flex: 0, backgroundColor: colors.primary},
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  subContainer: {backgroundColor: colors.primary, flex: 1},
  title: {
    color: colors.white,
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  whiteSection: {
    flex: 1,
    backgroundColor: colors.white,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    padding: 20,
  },
  subTitle: {
    fontSize: 20,
    fontWeight: '600',
  },
  wrapperInput: {
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 10,
    marginTop: 25,
  },
  input: {
    width: '100%',
    padding: 10,
  },
  button: {
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    marginTop: 25,
    borderRadius: 20,
  },
  textButton: {
    fontWeight: '800',
    color: colors.white,
  },
});

export default LoginScreen;
