import React, { FC, useEffect, useState } from "react";
import firestore from "../storage/firestore";
import { StackNavigationProp } from "@react-navigation/stack";
import HistoryList from "../components/HistoryList";
import { RandomNumber } from "../types";

const HistoryScreen: FC<{ navigation: StackNavigationProp<any> }> = ({
  navigation,
}) => {
  const [calculatorHistory, setCalculatorHistory] = useState<RandomNumber[]>(
    []
  );

  useEffect(() => {
    const onFocus = () => {
      firestore.getItem().then((querySnapshot) => {
        const historyObjects: RandomNumber[] = [];
        querySnapshot.forEach((doc) => {
          historyObjects.push(doc.data() as RandomNumber);
        });

        setCalculatorHistory(historyObjects);
      });
    };

    navigation.addListener("focus", onFocus);

    return () => {
      navigation.removeListener("focus", onFocus);
    };
  }, []);

  return (
    <HistoryList randomNumbers={calculatorHistory} title={"Random Numbers"} />
  );
};

export default HistoryScreen;
