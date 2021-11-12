import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { Component, useState } from "react";
import { Text, View, StyleSheet, TextInput, Button } from "react-native";
import {getAuth,createUserWithEmailAndPassword,signInWithEmailAndPassword} from "firebase/auth"
import {app} from './firebase/index'
export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleClick = () => {
    console.log("Pressed");
    navigation.navigate("Signup");
  };
  const handleLogin = async () => {
    console.log(email)
    console.log(password)
    const auth=getAuth();
    const user=await signInWithEmailAndPassword(auth,email,password)
    console.log(user.user.uid);
    if(user!=null)
    {
      navigation.navigate("Dashboard")
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.Customcard}>
        <Text style={styles.text}>Username</Text>
        <TextInput
          type="text"
          style={styles.textinput}
          onChangeText={setEmail}
          value={email}
        ></TextInput>
        <Text style={styles.text}>Password</Text>
        <TextInput
          textContentType="password"
          secureTextEntry={true}
          style={styles.textinput}
          onChangeText={setPassword}
          value={password}
        ></TextInput>
        <View
          style={{
            flex: 1,
            flexDirection: "column",
            width: "50%",
            alignSelf: "center",
          }}
        >
          <Button
            onPress={handleLogin}
            style={styles.loginbutton}
            title="Login"
          ></Button>
        </View>
        <View style={{ flex: 1, flexDirection: "row" }}>
          <Text>Not a user?</Text>
          <Text onPress={handleClick} style={styles.signup}>
            Signup
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f2f3f5",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    margin: 2,
    color: "black",
  },
  Customcard: {
    backgroundColor: "white",
    elevation: 4,
    shadowColor: "grey",
    borderRadius: 7,
    padding: 15,
    height: 300,
    width: "100%",
  },
  textinput: {
    height: 40,
    margin: 1,
    marginBottom: 20,
    borderWidth: 1,
    padding: 10,
  },
  signup: {
    color: "blue",
  },
  loginbutton: {
    marginLeft: 40,
    maxWidth: 50,
  },
});
