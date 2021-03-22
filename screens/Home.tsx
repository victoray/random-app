import styled from "styled-components/native";
import Storage from "../storage";
import Api from "../api";
import React, { useEffect, useState } from "react";
import firestore from "../storage/firestore";
import dayjs from "dayjs";
import { StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";

const StyledButton = styled.TouchableOpacity`
  padding: 10px 30px;
  background-color: #4189ea;
  border-radius: 5px;
  color: white;
`;

const StyledText = styled.Text`
  color: white;
`;

const StyledRandomText = styled.Text`
  color: black;
  font-size: 32px;
  font-weight: bold;
`;

const StyledPreviousResults = styled.View`
  margin-top: 20px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

const RANDOM_NUMBERS = "randomNumbers";
const storage = new Storage(RANDOM_NUMBERS);
const api = new Api();

function HomeScreen() {
  const [numbers, setNumbers] = useState<number[]>([]);

  useEffect(() => {
    //   load data
    storage.getItem().then((numbers) => {
      if (numbers) {
        setNumbers(JSON.parse(numbers));
      }
    });
  }, []);

  useEffect(() => {
    // save data
    storage.setItem(numbers);
  }, [numbers]);

  const getRandomNumber = () => {
    api
      .getRandomNumber(1, 1000)
      .then((response) => {
        const { random } = response[0];

        if (random) {
          setNumbers((state) => [random, ...state]);
          firestore.setItem({
            randomNumber: random,
            timestamp: dayjs().unix(),
          });
        }
      })
      .catch(console.log);
  };

  return (
    <View style={styles.container}>
      <StyledButton onPress={() => getRandomNumber()}>
        <StyledText>Get a new random number</StyledText>
      </StyledButton>

      <StyledRandomText>{numbers[0]}</StyledRandomText>

      <StyledPreviousResults>
        <StyledRandomText>Previous Numbers</StyledRandomText>

        {numbers.slice(0, 10).map((n, index) => (
          <Text key={index}>{n}</Text>
        ))}
      </StyledPreviousResults>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
});

export default HomeScreen;
