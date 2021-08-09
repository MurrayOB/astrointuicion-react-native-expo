import * as React from "react";
import { View, Text } from "../../components/Themed";
import { StyleSheet, Button, TextInput, TouchableOpacity } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
//User Model
import { User } from "../../models/User";

//Temporary Fix
type Props = {
  navigation: any;
};

const Login = ({ navigation }: Props) => {
  const [email, setEmail] = React.useState("murray18obrien@gmail.com");
  const [password, setPassword] = React.useState("Password");
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
          navigation.push("Root");
          return;
        }

        setResponse(res.data.Message);
      })
      .catch((err) => {
        const error = err.toString();
        setResponse(error);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput style={styles.input} onChangeText={setEmail} value={email} />
      <TextInput
        style={styles.input}
        onChangeText={setPassword}
        value={password}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.title}>Login</Text>
      </TouchableOpacity>
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
  input: {
    height: 40,
    width: 300,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
  },
  button: {
    backgroundColor: "rgb(110, 200, 100)",
    borderRadius: 20,
    padding: 20,
  },
});

export default Login;
