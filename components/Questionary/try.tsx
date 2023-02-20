import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import CheckBox from "react-native-check-box";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { RadioButton } from "react-native-paper";

const Tab = createMaterialTopTabNavigator();

function Tab1Screen() {
  const [isChecked, setIsChecked] = useState(false);
  const [selectedValue, setSelectedValue] = useState(false);
  const [checked, setChecked] = React.useState("");

  return (
    <View style={styles.tabContainer}>
      <Text>Tab 1</Text>
      <CheckBox
        isChecked={isChecked}
        onClick={() => setIsChecked(!isChecked)}
        checkBoxColor="blue"
        style={styles.checkbox}
      />
      <Text>Option 1</Text>
      <RadioButton
        value="first"
        status={checked === "first" ? "checked" : "unchecked"}
        onPress={() => setChecked("first")}
      />
      <RadioButton
        value="second"
        status={checked === "second" ? "checked" : "unchecked"}
        onPress={() => setChecked("second")}
      />
    </View>
  );
}

function Tab2Screen() {
  const [selectedValue, setSelectedValue] = useState<string>("");
  const [checked, setChecked] = React.useState("");

  return (
    <View style={styles.tabContainer}>
      <Text>Tab 2</Text>
      <Text>Option 1</Text>
      <RadioButton
        value="first"
        status={checked === "first" ? "checked" : "unchecked"}
        onPress={() => setChecked("first")}
      />
      <RadioButton
        value="second"
        status={checked === "second" ? "checked" : "unchecked"}
        onPress={() => setChecked("second")}
      />
    </View>
  );
}

function Tab3Screen() {
  const [selectedValue, setSelectedValue] = useState<string>("");

  const [checked, setChecked] = React.useState("");

  return (
    <View style={styles.tabContainer}>
      <Text>Tab 3</Text>
      <Text>Option 1</Text>
      <RadioButton
        value="first"
        status={checked === "first" ? "checked" : "unchecked"}
        onPress={() => setChecked("first")}
      />
      <RadioButton
        value="second"
        status={checked === "second" ? "checked" : "unchecked"}
        onPress={() => setChecked("second")}
      />
    </View>
  );
}

export default function SecondScreen() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Tab1" component={Tab1Screen} />
      <Tab.Screen name="Tab2" component={Tab2Screen} />
      <Tab.Screen name="Tab3" component={Tab3Screen} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  checkbox: {
    marginTop: 20,
  },
});
