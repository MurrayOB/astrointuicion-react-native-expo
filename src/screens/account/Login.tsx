import * as React from "react";
import { View, Text } from "../../components/Themed";
import { StyleSheet, Button, TextInput, TouchableOpacity } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from 'expo-secure-store';
import SubmitButton from '../../components/shared/SubmitButton'; 

//User Model
import { User } from "../../models/User";

//Temporary Fix
type Props = {
  navigation: any;
};

const Login = ({ navigation }: Props) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [response, setResponse] = React.useState("");

  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  const data = {
    email: email,
    password: password,
  };

  const handleLogin = () => {
    //Validation
    if (email == "" || password == "") {
      setResponse("Username or Password cannot be empty");
      return;
    }

    //POST
    axios
      .post("http://127.0.0.1:8000/api/user/login", data, { headers: headers })
      .then((res) => {
        if (res.data.Success) {
          const user : User = res.data.Data.user;
          //Save User: 
          AsyncStorage.setItem('user', JSON.stringify(user))
          setResponse("Successfully logged in " + user.name);
          //Set Signed In True: 
          

          return;
        }

        setResponse(res.data.Message);
      })
      .catch((err) => {
        const error = err.toString();
        setResponse(error);
      });

      return; 
  };

  const cleanBtnStyle = styles.input; 
  const dirtyBtnStyle = styles.input; 

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput placeholder="Email" style={styles.input} onChangeText={setEmail} value={email} />
      <TextInput
        placeholder="Password"
        style={styles.input}
        onChangeText={setPassword}
        value={password}
        secureTextEntry={true}
      />
      <SubmitButton title={"Login"} handleOnPress={handleLogin} />
      <Text>{response}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 25,
    fontWeight: "600",
  },
  inputDirty: {
    height: 50,
    width: 300,
    margin: 12,
    paddingLeft: 20,  
    paddingRight: 20,  
    paddingTop: 10,  
    paddingBottom: 10,  
    fontSize: 20, 
    borderRadius: 10,
    backgroundColor: "rgb(240, 240, 240)", 
    borderColor: "#ffa3a3", 
    borderWidth: 4,
  },
  input: {
    height: 50,
    width: 300,
    margin: 12,
    paddingLeft: 20,  
    paddingRight: 20,  
    paddingTop: 10,  
    paddingBottom: 10,  
    fontSize: 20, 
    borderRadius: 10,
    backgroundColor: "rgb(240, 240, 240)", 
  },
});

export default Login;
