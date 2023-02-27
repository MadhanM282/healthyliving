import React, { useState } from "react";
import { Text, View } from "react-native";
import { RadioButton } from "react-native-paper";

interface QuestionProps {
  question: string;
  type: string;
  optionA?: string;
  optionB?: string;
  optionC?: string;
  optionD?: string;
  optionE?: string;
  id: number;
}

interface ElementProps {
  e: string;
  checked: string;
  setChecked: (value: string) => void;
  handelSingleRadio: (selection: {
    question: string;
    answer: string;
    type: string;
    id: number;
  }) => void;
  question: QuestionProps;
}

export const SingleRadio: React.FC<{
  options: QuestionProps;
  handelSingleRadio: (selection: {
    question: string;
    answer: string;
    type: string;
    id: number;
  }) => void;
}> = ({ options, handelSingleRadio }) => {
  const [checked, setChecked] = useState<string>("");

  return (
    <>
      {options.optionA ? (
        <Element
          e={options.optionA}
          checked={checked}
          setChecked={setChecked}
          handelSingleRadio={handelSingleRadio}
          question={options}
        />
      ) : null}
      {options.optionB ? (
        <Element
          e={options.optionB}
          checked={checked}
          setChecked={setChecked}
          handelSingleRadio={handelSingleRadio}
          question={options}
        />
      ) : null}
      {options.optionC ? (
        <Element
          e={options.optionC}
          checked={checked}
          setChecked={setChecked}
          handelSingleRadio={handelSingleRadio}
          question={options}
        />
      ) : null}
      {options.optionD ? (
        <Element
          e={options.optionD}
          checked={checked}
          setChecked={setChecked}
          handelSingleRadio={handelSingleRadio}
          question={options}
        />
      ) : null}
    </>
  );
};

const Element: React.FC<ElementProps> = ({
  e,
  checked,
  setChecked,
  handelSingleRadio,
  question,
}) => {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        padding: 5,
      }}
    >
      <RadioButton
        value={e}
        status={checked === e ? "checked" : "unchecked"}
        onPress={() => {
          setChecked(e);
          handelSingleRadio({
            id: question.id,
            answer: e,
            type: question.type,
            question: question.question,
          });
        }}
        color="green"
      />
      <Text style={{ color: "black", fontWeight: "500", fontSize: 16 }}>
        {e}
      </Text>
    </View>
  );
};
