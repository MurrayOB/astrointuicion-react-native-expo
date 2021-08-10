//Drawer
import { createDrawerNavigator } from "@react-navigation/drawer";
import React from 'react'; 
import TabNavigator from "./TabNavigator";
import Settings from "../screens/Settings";
import { AntDesign } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
    return (
        <Drawer.Navigator initialRouteName="Home">
            <Drawer.Screen name="Astrointuicion" component={TabNavigator} options={{
          title: "Astrointuicion",
          //headerLeft: () => null, 
        //   headerLeft: () => (
        //     <TouchableOpacity onPress={() => alert("This is a button!")}>
        //       <AntDesign size={30} name="bars" />
        //     </TouchableOpacity>
        //   ),
        }}/>
            <Drawer.Screen name="Settings" component={Settings} />
        </Drawer.Navigator>
    )
}

export default DrawerNavigator; 
