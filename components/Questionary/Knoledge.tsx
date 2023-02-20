import axios from "axios";
import React, { useEffect, useState } from "react";
import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";
import { SingleRadio } from "../Elements/Radio";
import { Check } from "../Elements/Single";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

type Question = {
  question: string;
  optionA?: string;
  optionB?: string;
  optionC?: string;
  optionD?: string;
  optionE?: string;
  section: string;
};

export const Knowledge = () => {
  const AuthStr = "3eb1aa6a-3136-462f-a7ba-162f6d091ef9";
  const [knowledge, setKnowledge] = useState<Question[]>([]);

  useEffect(() => {
    axios
      .get("http://65.1.11.235:5003/api/v1/getQuestion", {
        headers: { Token: AuthStr },
      })
      .then(({ data }) => {
        const knowledgeQuestions = data.data.english.filter(
          (e: Question) => e.section === "Knowledge related Questions"
        );
        setKnowledge(knowledgeQuestions);
      });
  }, []);

  const renderCheckbox = (item: Question) => (
    <SingleRadio options={item}/>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={{ width: "100%", padding: 10 }}>
        {knowledge.map((item, i) => {
          // const [selectedValue, SetselectedValue] = useState("");

          
          return (
            <View key={item.question}>
              <Text style={{ color: "black", fontWeight: "500",fontSize:18 }}>
                {i + 1}. {item.question}
              </Text>
              {renderCheckbox(item)}
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 3,
    paddingHorizontal: 0,
    height: screenHeight,
    backgroundColor: "white",
  },
});
