import React from 'react';
import { useState, useEffect } from 'react';
import { View, Text } from '../components/Themed';
import { Button, StyleSheet } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";

//Temporary Fix
type Props = {
    navigation: any;
};

const Home = ({navigation} : Props) => {
    const [user, setName] = useState({
        name: '', 
        email: ''
    });  

    useEffect(() => {
        restoreUserState(); 
    }) 

    const restoreUserState = async () => {
        const savedStateString = await AsyncStorage.getItem('user');
        const userState = savedStateString ? JSON.parse(savedStateString) : undefined;
        setName(userState); 
    }

    return (
        <View style={styles.container}>
           <Text>Hello {user.name}</Text> 
           <Text>This is the Home Screen</Text> 
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