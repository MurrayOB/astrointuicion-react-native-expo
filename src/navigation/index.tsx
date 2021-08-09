import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { Button, ColorSchemeName, View } from 'react-native';

import { RootStackParamList } from '../../types';
import BottomTabNavigator from './BottomTabNavigator';
import LinkingConfiguration from './LinkingConfiguration';

//Screens
import Home from '../screens/Home';
import Login from '../screens/account/Login';
import NotFoundScreen from '../screens/NotFoundScreen';

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

//const Stack = createStackNavigator<RootStackParamList>();
const Stack = createStackNavigator();

function RootNavigator() {
  const authenticated = false; 

  return (
    <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
       {authenticated == false ? (
        <>
          <Stack.Screen name="Root" component={BottomTabNavigator} />
        </>
      ) : (
        <>
          <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
          <Stack.Screen name="Login" component={Login} />
        </>
      )}
    </Stack.Navigator>
  );
}


