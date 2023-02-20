// /**
//  * Sample React Native App
//  * https://github.com/facebook/react-native
//  *
//  * @format
//  */

// import React from "react";

// import { View, Text } from "react-native";
// import { NavigationContainer } from "@react-navigation/native";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import { SectionCard } from "./components/Questionary/section";
// import { RootStackParamList } from "./components/types";

// function App(): JSX.Element {
//   const Stack = createNativeStackNavigator<RootStackParamList>();

//   return (
//     <NavigationContainer>
//       <Stack.Navigator>
//         <Stack.Screen name="Home" component={SectionCard} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }

// export default App;

import React from "react";
import { Text, View, Button, Image, StyleSheet } from "react-native";
import { NavigationContainer, StackActions } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { StackNavigationProp } from "@react-navigation/stack";
import { Knowledge } from "./components/Questionary/Knoledge";
import { Attitude } from "./components/Questionary/Attitude";
import { Practice } from "./components/Questionary/Practical";

type RootStackParamList = {
  ScreenA: undefined;
  ScreenB: undefined;
};

type ScreenANavigationProp = StackNavigationProp<RootStackParamList, "ScreenA">;
type ScreenBNavigationProp = StackNavigationProp<RootStackParamList, "ScreenB">;

const Stack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerLeftLabelVisible: false,
        }}
      >
        <Stack.Screen name="ScreenA" component={ScreenA} />
        <Stack.Screen
          options={{
            title: "",
          }}
          name="ScreenB"
          component={ScreenB}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function ScreenA({ navigation }: { navigation: ScreenANavigationProp }) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Button
        title="Go to Screen B"
        onPress={() => navigation.navigate("ScreenB")}
      />
    </View>
  );
}

function ScreenB() {
  return (
    <>
      <View style={Styles.containor}>
        <Text style={Styles.HeroTitle}>Student Questionary</Text>
        <Image
          style={Styles.ProfileImage}
          source={require("./profile.png")}
          alt=""
        />
      </View>
      <Tab.Navigator
        screenOptions={{
          tabBarShowLabel: false,
        }}
      >
        <Tab.Screen
          options={{
            tabBarStyle: {
              backgroundColor: "white",
            },
            tabBarIcon: (props: { focused: boolean; color: string }) => {
              return (
                <View style={{ marginLeft: -85 }}>
                  <Text
                    style={{
                      width: 200,
                      marginLeft: 0,
                      fontSize: 13,
                      color: "black",
                      textAlign: "center",
                      fontWeight: "500",
                    }}
                  >
                    Knowledge Related Questions
                  </Text>
                </View>
              );
            },
          }}
          name="Knowledge"
          component={Tab1}
        />
        <Tab.Screen
          options={{
            tabBarStyle: {
              backgroundColor: "white",
            },
            tabBarIcon: (props: { focused: boolean; color: string }) => {
              return (
                <View style={{ marginLeft: -85 }}>
                  <Text
                    style={{
                      width: 200,
                      marginLeft: 0,
                      color: "black",
                      textAlign: "center",
                      fontWeight: "500",
                    }}
                  >
                    Attitude Related Questions
                  </Text>
                </View>
              );
            },
          }}
          name="Attitude Related Questions"
          component={Tab2}
        />
        <Tab.Screen
          options={{
            tabBarStyle: {
              backgroundColor: "white",
            },
            tabBarIcon: (props: { focused: boolean; color: string }) => {
              return (
                <View style={{ marginLeft: -85 }}>
                  <Text
                    style={{
                      width: 200,
                      marginLeft: 0,
                      color: "black",
                      textAlign: "center",
                      fontWeight: "500",
                    }}
                  >
                    Practical Related Questions
                  </Text>
                </View>
              );
            },
          }}
          name="PracticalRelated Questions"
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
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
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
    marginTop: "-1%",
  },
  HeroTitle: {
    textAlign: "center",
    marginTop: 13,
    // marginRight:282,
    fontWeight: "500",
    fontSize: 32,
    color: "black",
    fontFamily: "SF Pro Display",
  },
  ProfileImage: {
    marginLeft: "90%",
    marginTop: "-8%",
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
