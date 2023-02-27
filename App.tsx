import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  Button,
  Image,
  StyleSheet,
  Dimensions,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { StackNavigationProp } from "@react-navigation/stack";
import { Knowledge } from "./components/Questionary/Knoledge";
import { Attitude } from "./components/Questionary/Attitude";
import { Practice } from "./components/Questionary/Practical";
import { IconButton } from "react-native-paper";
const { width: screenWidth } = Dimensions.get("window");

type RootStackParamList = {
  ScreenA: undefined;
  ScreenB: undefined;
};

type ScreenANavigationProp = StackNavigationProp<RootStackParamList, "ScreenA">;

const Stack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();

function App() {
  // eslint-disable-next-line no-console
  console.log({ name: Tab.Screen });
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="ScreenA" component={ScreenA} />
        <Stack.Screen name="ScreenB" component={ScreenB} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function ScreenA({ navigation }: { navigation: ScreenANavigationProp }) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Button
        title="KAP Questionary"
        onPress={() => navigation.navigate("ScreenB")}
      />
    </View>
  );
}

const Headercomponent = (navigation: ScreenANavigationProp) => {
  return (
    <View style={Styles.containor}>
      <IconButton
        style={{ marginLeft: -10 }}
        icon={{ uri: "https://img.icons8.com/windows/56/left.png" }}
        size={40}
        onPress={() => navigation.navigate("ScreenA")}
      />

      <Text style={Styles.HeroTitle}>KAP Questions</Text>
      <Image
        style={Styles.ProfileImage}
        source={require("./profile.png")}
        alt=""
      />
    </View>
  );
};

function ScreenB({ navigation }: { navigation: ScreenANavigationProp }) {
  const [Section, SetSection] = useState("");
  return (
    <>
      {Headercomponent(navigation)}
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 20,
          backgroundColor: "white",
          borderBottomWidth: 8,
          borderBottomColor: "#7FCEEE",
        }}
      >
        <Text
          style={{
            color: "black",
            fontWeight: "500",
            fontSize: 18,
            borderRightWidth: 1,
            borderRightColor: "black",
            paddingRight: 20,
            paddingLeft: 10,
            paddingBottom: 10,
          }}
        >
          Name Of Student
        </Text>
        <Text style={{ color: "black", fontWeight: "500", fontSize: 18 }}>
          ID
        </Text>
      </View>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: "#0074F9",
          tabBarInactiveTintColor: "grey",
          tabBarLabelStyle: { fontSize: 18 },
        }}
      >
        <Tab.Screen
          listeners={{
            tabPress: () => {
              SetSection("Knowledge Related");
            },
          }}
          options={{
            tabBarStyle: {
              backgroundColor: "white",
            },
            tabBarLabelStyle: {
              textTransform: "none",
              fontSize: 18,
            },
          }}
          name="Knowledge Related"
          component={Tab1}
        />
        <Tab.Screen
          listeners={{
            tabPress: () => {
              SetSection("Attitude Related");
            },
          }}
          options={{
            tabBarStyle: {
              backgroundColor: "white",
            },
            tabBarLabelStyle: {
              textTransform: "none",
              fontSize: 18,
            },
          }}
          name="Attitude Related"
          component={Tab2}
        />
        <Tab.Screen
          listeners={{
            tabPress: () => {
              SetSection("Practical Related");
            },
          }}
          options={{
            tabBarStyle: {
              backgroundColor: "white",
            },
            tabBarLabelStyle: {
              textTransform: "none",
              fontSize: 18,
            },
          }}
          name="Practice Related"
          component={Tab3}
        />
      </Tab.Navigator>
    </>
  );
}

function Tab1() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Knowledge />
    </View>
  );
}

function Tab2() {
  return (
    <View>
      <Attitude />
    </View>
  );
}

function Tab3() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Practice />
    </View>
  );
}

export default App;

const Styles = StyleSheet.create({
  containor: {
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: "white",
    height: 90,
    display: "flex",
    flexDirection: "row",
    width: screenWidth,

    justifyContent: "space-between",
    alignItems: "center",
  },
  HeroTitle: {
    textAlign: "center",
    fontWeight: "500",
    fontSize: 30,
    color: "black",
    fontFamily: "SF Pro Display",
  },
  ProfileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  SideTag: {
    fontWeight: "500",
    fontSize: 22,
    color: "black",
  },
  InfoContainor: {
    marginTop: 21,
  },
});
