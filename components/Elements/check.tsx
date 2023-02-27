import { Dimensions, View, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import CheckBox from "react-native-check-box";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
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

export const ChecKBoxComponent: React.FC<{
  values: Question;
  SetMultiple: any;
  multiple: {
    question: string;
    answer: string[];
    type: string;
    id: number;
  }[];
}> = ({ values, multiple, SetMultiple }) => {
  const [MultySelect, SetMultySelect] = useState<string[]>([]);

  const HandelChange = () => {
    // eslint-disable-next-line no-console
    console.log(multiple);
    const ind = multiple.findIndex((value) => value.id === values.id);
    if (ind !== undefined && ind >= 0) {
      multiple[ind] = {
        id: values.id,
        question: values.question,
        type: values.type,
        answer: MultySelect,
      };
    } else {
      SetMultiple([
        ...multiple,
        {
          id: values.id,
          question: values.question,
          type: values.type,
          answer: MultySelect,
        },
      ]);
    }
  };

  const renderCheckbox = (
    label: string,
    MultySelect: any,
    SetMultySelect: any,
    item: Question,
    HandelChange: () => void
  ) => {
    return (
      <Check
        Values={MultySelect}
        SetValues={SetMultySelect}
        item={item}
        label={label}
        HandelChange={HandelChange}
      />
    );
  };
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        width: screenWidth / 2,
        padding: 10,
      }}
    >
      {values.optionA && (
        <View
          style={{
            display: "flex",
            justifyContent: "center",
            width: "30%",
            marginLeft: -15,
          }}
        >
          {renderCheckbox(
            values.optionA,
            MultySelect,
            SetMultySelect,
            values,
            HandelChange
          )}
        </View>
      )}
      {values.optionB && (
        <View
          style={{
            display: "flex",
            justifyContent: "center",
            width: "30%",
            marginLeft: -5,
          }}
        >
          {renderCheckbox(
            values.optionB,
            MultySelect,
            SetMultySelect,
            values,
            HandelChange
          )}
        </View>
      )}
      {values.optionC && (
        <View
          style={{
            display: "flex",
            justifyContent: "center",
            width: "40%",
          }}
        >
          {renderCheckbox(
            values.optionC,
            MultySelect,
            SetMultySelect,
            values,
            HandelChange
          )}
        </View>
      )}
    </View>
  );
};

const Check: React.FC<{
  item: Question;
  Values: any;
  label: string;
  SetValues: any;
  HandelChange: () => void;
}> = ({ Values, SetValues, item, label, HandelChange }) => {
  const [state, setState] = useState<boolean>(false);

  const HandelSelect = (answerIndex: string) => {
    if (Values.includes(answerIndex)) {
      SetValues(Values.filter((index: string) => index !== answerIndex));
      HandelChange();
    } else {
      SetValues([...Values, answerIndex]);
      HandelChange();
    }
  };
  return (
    <View style={styles.container}>
      <CheckBox
        isChecked={state}
        onClick={() => {
          setState(!state);
          HandelSelect(label);
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
