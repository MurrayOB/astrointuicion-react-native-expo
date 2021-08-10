import React from 'react';
import { useState, useEffect } from 'react';
import { View, Text } from '../components/Themed';
import { Button, StyleSheet } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";

import { AuthContext } from "../components/Context"

//Temporary Fix
type Props = {
    navigation: any;
};

const Home = ({navigation} : Props) => {
    const [user, setUser] = useState({
        name: '', 
        email: ''
    });  

    const { signOut } = React.useContext(AuthContext)

    useEffect(() => {
        restoreUserState(); 
    }, [])

    const restoreUserState = async () => {
        const savedStateString = await AsyncStorage.getItem('user');
        const userState = savedStateString ? JSON.parse(savedStateString) : undefined;
        setUser(userState); 
    }

    return (
        <View style={styles.container}>
           <Text>Hello {user.name}</Text> 
           <Text>This is the Home Screen</Text> 
           <Button title="Sign Out" onPress={() => signOut()}></Button>
        </View>
    ); 
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
});

export default Home; 