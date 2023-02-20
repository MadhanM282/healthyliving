import { useState } from "react";
import { Text, View } from "react-native";
import CheckBox from "react-native-check-box";
export const Check = ({label}) => {
  const [State, SetState] = useState(false);
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center',gap:10,padding:10}}>
      <CheckBox
        isChecked={State}
        onClick={() => SetState(!State)}
        checkBoxColor={'#667080'}
        
      />
      <Text style={{color:"#667080"}}>{label}</Text>
    </View>
  );
};
