import * as React from 'react';
import { View, Text } from '../components/Themed';
import { Button, StyleSheet } from 'react-native';

//Temporary Fix
type Props = {
    navigation: any;
};

const Home = ({navigation} : Props) => {
    return (
        <View style={styles.container}>
           <Text>This is the Home Screen</Text> 
           <Button onPress={() => navigation.navigate('Login')} title="Back"></Button>
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