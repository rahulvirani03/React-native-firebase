import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TextInput, View ,Button} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./Login";
import Signup from "./Signup";
import Dashboard from "./Dashboard";
import { getAuth } from "@firebase/auth";
function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate("Details")}
      />
    </View>
  );
}

const Stack = createNativeStackNavigator();
export default function App({navigation}) {
  const [user, setUser] = useState();
  const auth = getAuth();
  auth.onAuthStateChanged((user) => {
    if (user) {
      setUser(user);
      // ...
    } else {
      setUser(user);
    }
  });
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user ? (
          <Stack.Screen
            name="Dashboard"
            component={Dashboard}
          options={{
            headerRight : (navigation) => (
           <Button title="Logout "  onPress={() =>{
             auth.signOut()
           }}/>
            )
          }}
             />
        ) : (
          <>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Signup" component={Signup} />
            <Stack.Screen name="Dashboard" component={Dashboard} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
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
