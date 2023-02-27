import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import CheckBox from "react-native-check-box";
type Question = {
  label: undefined;
  question: string;
  optionA?: string;
  optionB?: string;
  optionC?: string;
  optionD?: string;
  optionE?: string;
  optionF?: string;
  type: string;
  section: string;
  headerLabel: string;
  qno?: string;
  id: number;
  Survey: {
    questionID: string;
    answer: string;
  };
};

export const Check: React.FC<{
  item: Question;
  values: {
    question: string;
    answer: string[];
    type: string;
    id: number;
  }[];
  label: string;
  SetValues: {
    (
      value: React.SetStateAction<
        { question: string; answer: string[]; type: string; id: number }[]
      >
    ): void;
    (
      value: React.SetStateAction<
        { question: string; answer: string[]; type: string; id: number }[]
      >
    ): void;
    (
      value: React.SetStateAction<
        { question: string; answer: string[]; type: string; id: number }[]
      >
    ): void;
  };
}> = ({ label, item, values, SetValues }) => {
  const [state, setState] = useState<boolean>(false);
  const HandelClick = (e: string) => {
    SetValues([
      ...values,
      {
        ["id"]: item.id,
        ["answer"]: [e],
        ["type"]: item.type,
        ["question"]: item.question,
      },
    ]);
  };
  return (
    <View style={styles.container}>
      <CheckBox
        isChecked={state}
        onClick={() => {
          setState(!state);
          HandelClick(label);
        }}
        checkBoxColor={"green"}
        uncheckedCheckBoxColor={"#D9D9D9"}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "center",
    padding: 8,
  },
});
