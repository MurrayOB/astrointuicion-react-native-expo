import React from "react";
import { View, Text } from "react-native";
import { StyleSheet } from "react-native";

const Profile = () => {
    return (
        <View style={styles.container}>
            <Text>This is the Profile Page</Text>
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

export default Profile; 