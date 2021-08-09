import { AntDesign } from "@expo/vector-icons";
// https://icons.expo.fyi/
//import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import {
  BottomTabParamList,
  TabOneParamList,
  TabTwoParamList,
} from "../../types";
import { StyleSheet } from "react-native";
import { Button, TouchableOpacity } from "react-native";

//Screens
import Home from "../screens/Home";
import Diary from "../screens/Diary";
import Settings from "../screens/Settings";

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}
    >
      <BottomTab.Screen
        name="Home"
        component={TabOneNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Diary"
        component={TabTwoNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="book" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Settings"
        component={Settings}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="setting" color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof AntDesign>["name"];
  color: string;
}) {
  return <AntDesign size={30} style={{ marginBottom: -3 }} {...props} />;
}

const TabOneStack = createStackNavigator<TabOneParamList>();

function TabOneNavigator() {
  return (
    <TabOneStack.Navigator>
      <TabOneStack.Screen
        name="TabOneScreen"
        component={Home}
        options={{
          title: "Astrointuicion",
          headerLeft: () => (
            <TouchableOpacity onPress={() => alert("This is a button!")}>
              <AntDesign size={30} name="bars" style={styles.drawerMenu} />
            </TouchableOpacity>
          ),
        }}
      />
    </TabOneStack.Navigator>
  );
}

const TabTwoStack = createStackNavigator<TabTwoParamList>();

function TabTwoNavigator() {
  return (
    <TabTwoStack.Navigator>
      <TabTwoStack.Screen
        name="TabTwoScreen"
        component={Diary}
        options={{
          title: "Astrointuicion",
          headerLeft: () => null,
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
    </TabTwoStack.Navigator>
  );
}

const styles = StyleSheet.create({
  drawerMenu: {
    padding: 10,
    color: "#349feb",
  },
});
