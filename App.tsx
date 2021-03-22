import "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import "./firebase";
import HistoryScreen from "./screens/HistoryScreen";
import HomeScreen from "./screens/Home";
import * as firebase from "firebase";
import { FIREBASE_APP } from "./constants";

const Tab = createBottomTabNavigator();

const MyStack = () => {
  const [issAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    const app = firebase.app(FIREBASE_APP);
    firebase
      .auth(app)
      .signInAnonymously()
      .then((credentials) => {
        setIsAuthenticated(true);
      });
  }, []);

  if (!issAuthenticated) {
    return null;
  }

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
