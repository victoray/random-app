import React, { FC } from "react";
import { FlatList, StyleSheet } from "react-native";
import styled from "styled-components/native";
import dayjs from "dayjs";
import { RandomNumber } from "../types";

export const StyledView = styled.View`
  background-color: #121212;
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const StyledTitle = styled.Text`
  font-size: 32px;
  color: white;
  font-weight: bold;
`;

const StyledText = styled.Text`
  font-size: 15px;
  font-weight: 500;
  margin-left: 15px;
  color: white;
`;

const StyledContainer = styled.View`
  flex: 1;
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 20px 15px 15px 0;
  margin-top: 25px;
  align-items: center;
`;

const StyledHistoryItem = styled.View`
  margin: 10px;
  background-color: #262626;
  padding: 8px;
`;

const styles = StyleSheet.create({
  flatList: {
    padding: 5,
    borderRadius: 5,
    width: "100%",
  },
});

const HistoryList: FC<{
  randomNumbers: RandomNumber[];
  title?: string;
}> = ({ randomNumbers, title = "History" }) => {
  return (
    <StyledView>
      <StyledContainer>
        <StyledTitle>{title}</StyledTitle>

        <FlatList
          style={styles.flatList}
          keyExtractor={(_, index) => String(index)}
          data={randomNumbers}
          renderItem={({ item, index }) => (
            <StyledHistoryItem key={index}>
              <StyledText>RandomNumber: {item.randomNumber}</StyledText>
              <StyledText>Date: {dayjs(item.timestamp).format()}</StyledText>
            </StyledHistoryItem>
          )}
        />
      </StyledContainer>
    </StyledView>
  );
};

export default HistoryList;
