import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import "./firebase";
import HistoryScreen from "./screens/HistoryScreen";
import HomeScreen from "./screens/Home";

const Tab = createBottomTabNavigator();

const MyStack = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName={"Home"}
        tabBarOptions={{
          labelStyle: {
            fontSize: 14,
            fontWeight: "bold",
          },
        }}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="History" component={HistoryScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default MyStack;
