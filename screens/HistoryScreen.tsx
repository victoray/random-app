import React, { FC, useEffect, useState } from "react";
import firestore from "../storage/firestore";
import { StackNavigationProp } from "@react-navigation/stack";
import HistoryList from "../components/HistoryList";
import { RandomNumber } from "../types";
import * as firebase from "firebase";
import { FIREBASE_APP } from "../constants";

const HistoryScreen: FC<{ navigation: StackNavigationProp<any> }> = ({
  navigation,
}) => {
  const [calculatorHistory, setCalculatorHistory] = useState<RandomNumber[]>(
    []
  );
  const [currentUser, setCurrentUser] = useState<firebase.User | null>(null);

  useEffect(() => {
    const app = firebase.app(FIREBASE_APP);
    const user = firebase.auth(app).currentUser;

    if (user) {
      setCurrentUser(user);
    }
  }, []);

  useEffect(() => {
    const onFocus = () => {
      if (currentUser) {
        firestore.getItem(currentUser?.uid).then((querySnapshot) => {
          const historyObjects: RandomNumber[] = [];
          querySnapshot.forEach((doc) => {
            historyObjects.push(doc.data() as RandomNumber);
          });

          setCalculatorHistory(historyObjects);
        });
      }
    };

    navigation.addListener("focus", onFocus);

    return () => {
      navigation.removeListener("focus", onFocus);
    };
  }, []);

  if (!currentUser) {
    return null;
  }

  return (
    <HistoryList randomNumbers={calculatorHistory} title={"Random Numbers"} />
  );
};

export default HistoryScreen;
