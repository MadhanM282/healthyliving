import axios from "axios";
import React, { useEffect, useState } from "react";
import { Dimensions } from "react-native";
import { StyleSheet } from "react-native";
import { ScrollView } from "react-native";
import { Text, View } from "react-native";
import { RadioButton } from "react-native-paper";
import { SingleRadioElement } from "../Elements/RadioElement";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

type Question = {
  label: undefined;
  question: string;
  optionA?: string;
  optionB?: string;
  optionC?: string;
  optionD?: string;
  optionE?: string;
  section: string;
};

export const Attitude: React.FC = () => {
  const AuthStr = "3eb1aa6a-3136-462f-a7ba-162f6d091ef9";
  const [knowledge, setKnowledge] = useState<Question[]>([]);

  useEffect(() => {
    axios
      .get("http://65.1.11.235:5003/api/v1/getQuestion", {
        headers: { Token: AuthStr },
      })
      .then(({ data }) => {
        const knowledgeQuestions = data.data.english.filter(
          (e: Question) => e.section === "Attitude related Questions"
        );
        setKnowledge(knowledgeQuestions);
      });
  }, []);

  const renderCheckbox = (item: Question) => {
    return <SingleRadioElement options={item} />;
  };

  return (
    <ScrollView style={styles.container}>
      <View style={{ width: screenWidth, padding: 10 }}>
        <Text
          style={{
            fontWeight: "600",
            fontSize: 20,
            color: "#7A7676",
          }}
        >
          {knowledge[0]?.question}
        </Text>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            width: screenWidth,
            justifyContent:"flex-end"
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              width: screenWidth/2,
              justifyContent: "space-evenly",
              padding: 10,
              
            }}
          >
            {knowledge[0]?.optionA && <Text style={{textAlign:"center",color:"black",}}>{knowledge[0]?.optionA}</Text>}
            {knowledge[0]?.optionB && <Text style={{textAlign:"center",color:"black",}}>{knowledge[0]?.optionB}</Text>}
            {knowledge[0]?.optionC && <Text style={{textAlign:"center",color:"black",}}>{knowledge[0]?.optionC}</Text>}
            {knowledge[0]?.optionD && <Text style={{textAlign:"center",color:"black",}}>{knowledge[0]?.optionD}</Text>}
            {knowledge[0]?.optionE && <Text style={{textAlign:"center",color:"black",}}>{knowledge[0]?.optionE}</Text>}
          </View>
        </View>
        {knowledge.map((item, i) => {
          return (
            <View key={item.question}>
              {item.label !== undefined && (
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    borderBottomWidth: 1,
                    borderBottomColor: "#D9D9D9",
                    marginTop:5
                  }}
                >
                  <Text
                    style={{
                      color: "black",
                      fontWeight: "500",
                      fontSize: 16,
                      width: screenWidth / 2,
                    }}
                  >
                    {item.label + ". "}
                    {item.question}
                  </Text>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      width: screenWidth/2,
                      justifyContent: "space-evenly",
                      padding: 10,
                    }}
                  >
                    { renderCheckbox(item)}
                  </View>
                </View>
              )}
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 0,
    height: screenHeight,
    backgroundColor: "white",
  },
});
