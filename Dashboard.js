import React, { Component, useEffect, useState } from "react";
import { Text, View, StyleSheet, TextInput, Button } from "react-native";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {
  Icon,
  Card,
  Text as ElementText,
  FAB,
  Switch,
  Overlay,
  Divider,
  Input,
  Button as ElementButton,
} from "react-native-elements";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function Dashboard({ navigation }) {
  const [show, setShow] = useState(false);
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("time");
  const [visible, setVisible] = useState(false);

  const toggleOverlay = () => {
    setVisible(!visible);
  };
  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
    console.log(date.getHours() + ":" + date.getMinutes());
  };
  const showDatepicker = () => {
    showMode("date");
  };

  const showTimepicker = () => {
    showMode("time");
  };
  useEffect(() => {
    const auth = getAuth();
    auth.onAuthStateChanged((user) => {
      if (user) {
        console.log("");
      } else {
        navigation.navigate("Login");
      }
    });
  });
  const auth = getAuth();
  return (
    <View style={styles.container}>
      <Card style={styles.cardContainer}>
        <Card.Title>Reminder Name </Card.Title>
        <Card.Divider />
        <View style={styles.reminderCard}>
          <Text>New chages</Text>
          <Switch value={true} color="skyblue"></Switch>
        </View>
      </Card>
      <Overlay
        isVisible={visible}
        onBackdropPress={toggleOverlay}
        style={styles.container}
        overlayStyle={styles.overLay}
      >
        <ElementText h4={true} style={styles.header}> Reminder Details</ElementText>
        <Divider
          style={styles.divider}
          orientation="horizontal"
          color={"skyblue"}
          width={2}
        />

        <Input
          leftIcon={{ type: "material", name: "title" }}
          placeholder="Title"
        />
        <Input
          leftIcon={{ type: "material", name: "description" }}
          placeholder="Description"
        />
        <Input
          leftIcon={{ type: "material", name: "today" }}
          onPressIn={showDatepicker}
          placeholder="Date"
        />

        <Input
          leftIcon={{ type: "material", name: "timer" }}
          onPressIn={showTimepicker}
          placeholder="Time"
        />
        <ElementButton
          style={{ width: "70%" }}
          title="Create Reminder"
        ></ElementButton>

        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={mode}
            is24Hour={true}
            display="default"
            onChange={onChange}
          />
        )}
      </Overlay>
      <FAB
        title=""
        placement="right"
        color="steelblue"
        icon={<Icon name="add" />}
        onPress={() => {
          setVisible(true);
        }}
      ></FAB>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
   
    color: "black",
  },
  header:{

    alignSelf:"center"
  },
  Customcard: {
    backgroundColor: "white",
    elevation: 4,
    shadowColor: "grey",
    borderRadius: 7,
    padding: 40,
    height: 300,
    width: "100%",
  },
  divider: {
    marginBottom: 20,
  },
  textinput: {
    height: 40,
    margin: 1,
    width: "80%",
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

  columnButton: {
    flexWrap: "wrap",
    flexDirection: "row",
  },
  reminderCard: {
    flexDirection: "row",
    flexWrap: "wrap-reverse",
    justifyContent: "space-between",
  },
  cardContainer: {
    flex: 1,
    width: "100%",
    height: 600,
  },
  overLay: {
    width: "80%",
  },
});
