import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { View, Text } from "../../components/Themed";

const SubmitButton = (props : any) => {
    return (
        <TouchableOpacity style={styles.button} onPress={props.handleOnPress}>
            <Text style={styles.title}>
                {props.title}
            </Text>
      </TouchableOpacity>
    ); 
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: "slateblue",
        borderRadius: 20,
        padding: 10,
        margin: 10,
        width: "50%", 
        alignItems: 'center',
    },
    title: {
        color: "white",
        fontSize: 20, 
    }
})

export default SubmitButton; 