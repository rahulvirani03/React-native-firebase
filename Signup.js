import React, { Component,useState } from "react";
import { Text, View, StyleSheet, TextInput, Button } from "react-native";
import {getAuth,createUserWithEmailAndPassword,signInWithEmailAndPassword} from "firebase/auth"
import { doc, setDoc,addDoc,collection,getFirestore } from "firebase/firestore"; 
// import {db} from './firebase/index'
export default function Signup({ navigation }) {
  const [email,setEmail]=useState("");
  const [username,setUsername]=useState("") 
  const [password,setPassword]=useState("")
  const handleClick = () => {
   
    navigation.navigate("Login");
  };
  const handleSignup = async () => {
    const auth=getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        const db =getFirestore()
        const docRef = addDoc(collection(db,"users"),{
          email:email,
          password:password,
          username:username
        })
        console.log(docRef)
        
        if(user!=null)
    {
      navigation.navigate("Dashboard")
    }
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(error);
        // ..
      });
    
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.Customcard}>
        <Text style={styles.text}>Email</Text>
        <TextInput onChangeText={setEmail} type="text" style={styles.textinput}></TextInput>
        <Text style={styles.text}>Username</Text>
        <TextInput onChangeText={setUsername} type="text" style={styles.textinput}></TextInput>
        <Text style={styles.text}>Password</Text>
        <TextInput
          textContentType="password"
          secureTextEntry={true}
          style={styles.textinput}
          onChangeText={setPassword}
        ></TextInput>
        <View
          style={{
            flex: 1,
            flexDirection: "column",
            width: "50%",
            alignSelf: "center",
          }}
        >
          <Button onPress={handleSignup} style={styles.loginbutton} title="Signup"></Button>
        </View>
        <View style={{ flex: 1, flexDirection: "row" }}>
          <Text>Already a user?</Text>
          <Text onPress={handleClick} style={styles.signup}>
            Login
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
    height: 350,
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
