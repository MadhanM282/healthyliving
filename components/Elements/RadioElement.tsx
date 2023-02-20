// import { useState } from "react";
// import { Text, View } from "react-native";
// import { RadioButton } from "react-native-paper";

// export const Element = () => {
//   const [checked, setChecked] = useState<string>("");
//     return (
//       <View style={{flex:1,flexDirection:"row",alignItems:"center",justifyContent:"center"}}>
//         <RadioButton
//           value="ele"
//           status={checked === "ele" ? "checked" : "unchecked"}
//           onPress={() => setChecked("ele")}
//           color="blue"
//         />
//       </View>
//     );
//   };
import React, { useState } from "react";
import { Text, View } from "react-native";
import { RadioButton } from "react-native-paper";

interface QuestionProps {
  optionA?: string;
  optionB?: string;
  optionC?: string;
  optionD?: string;
  optionE?: string;
}

interface ElementProps {
  e: string;
  checked: string;
  setChecked: (value: string) => void;
}

export const SingleRadioElement: React.FC<{ options: QuestionProps }> = ({
  options,
}) => {
  const [checked, setChecked] = useState<string>("");

  return (
    <>
      {options.optionA ? (
        <Element
          e={options.optionA}
          checked={checked}
          setChecked={setChecked}
        />
      ) : null}
      {options.optionB ? (
        <Element
          e={options.optionB}
          checked={checked}
          setChecked={setChecked}
        />
      ) : null}
      {options.optionC ? (
        <Element
          e={options.optionC}
          checked={checked}
          setChecked={setChecked}
        />
      ) : null}
      {options.optionD ? (
        <Element
          e={options.optionD}
          checked={checked}
          setChecked={setChecked}
        />
      ) : null}
      {options.optionE ? (
        <Element
          e={options.optionC}
          checked={checked}
          setChecked={setChecked}
        />
      ) : null}
    </>
  );
};

const Element: React.FC<ElementProps> = ({ e, checked, setChecked }) => {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <RadioButton
        value={e}
        status={checked === e ? "checked" : "unchecked"}
        onPress={() => setChecked(e)}
        color="green"
      />
    </View>
  );
};
