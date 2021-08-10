import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import { ActivityIndicator, Button, ColorSchemeName, View } from "react-native";
import BottomTabNavigator from "./BottomTabNavigator";
import LinkingConfiguration from "./LinkingConfiguration";

//Screens
import Login from "../screens/account/Login";
import NotFoundScreen from "../screens/NotFoundScreen";
import { useEffect, useMemo } from "react";

//context
import { AuthContext } from "../components/Context";
import DrawerNavigator from "./DrawerNavigator";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { User } from "../models/User";

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {

  const initialLoginState = {
    isLoading: true, 
    userName: null, 
    userToken: null
  }

  const loginReducer = (prevState : any, action : any) => {
    switch(action.type){
      case 'RETRIEVE_TOKEN':
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false
        }
      case 'LOGIN': 
        return {
          ...prevState,
          useName: action.name, 
          userToken: action.token,
          isLoading: false
        }
      case 'REGISTER': 
        return {
          ...prevState,
          useName: action.name, 
          userToken: action.token,
          isLoading: false
        }
      case 'LOGOUT':
        return {
          ...prevState,
          userName: null, 
          userToken: null, 
          isLoading: false
        }
    }
  }

  const [loginState, dispatch] = React.useReducer(loginReducer, initialLoginState); 

  const authContext = React.useMemo(
    () => ({
      signIn: async(token: string, user: User) => {
        try {
          await AsyncStorage.setItem('userToken', token)
          await AsyncStorage.setItem('user', JSON.stringify(user))
        } catch (error) {
          console.log(error);
        }
        dispatch({type: 'LOGIN', name: user.name, token: token})
      },
      signOut: async() => {
        try {
          await AsyncStorage.removeItem('userToken')
          await AsyncStorage.removeItem('user')
        } catch (error) {
          console.log(error);
        }  
        dispatch({type: 'LOGOUT'})
      },
      signUp: () => {
        
      },
    }),
    []
  );

  React.useEffect(() => {
    setTimeout(async() => {
      let userToken; 
      userToken = null; 
      try {
        userToken = await AsyncStorage.getItem('userToken')
      } catch (error) {
        console.log(error);
      }
      dispatch({type: 'RETRIEVE_TOKEN', token: userToken})
    }, 1000);
  }, []);

  if (loginState.isLoading) {
    return (
      <View
        style={{ flex: 1, justifyContent: "center", alignContent: "center" }}
      >
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer
        linking={LinkingConfiguration}
        theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
      >
        {loginState.userToken !== null ? (
          <>
            <DrawerNavigator />
          </>
        ) : (
          <>
            <RootNavigator />
          </>
        )}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

//const Stack = createStackNavigator<RootStackParamList>();
const Stack = createStackNavigator();

function RootNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Login" component={Login} />
      {/* <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} /> */}
    </Stack.Navigator>
  );
}
