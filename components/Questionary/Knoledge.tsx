import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { Button } from "react-native-paper";
import { SingleRadio } from "../Elements/Radio";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

type Question = {
  optionA?: string;
  optionB?: string;
  optionC?: string;
  optionD?: string;
  optionE?: string;
  section: string;
  label: string;
  Survey: {
    questionID: string;
    answer: string;
  };
  id: number;
  question: string;
  type: string;
};

export const Knowledge = () => {
  const AuthStr = "3eb1aa6a-3136-462f-a7ba-162f6d091ef9";
  const [knowledge, setKnowledge] = useState<Question[]>([]);
  const navigation = useNavigation();
  const [Survey, SetSurvey] = useState<
    { question: string; answer: string; type: string; id: number }[]
  >([]);
  // eslint-disable-next-line no-console
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

  const handelSingleRadio = (e: {
    question: string;
    answer: string;
    type: string;
    id: number;
  }) => {
    const ind = Survey.findIndex((value) => value.id === e.id);
    if (ind !== undefined && ind >= 0) {
      Survey[ind] = {
        id: e.id,
        question: e.question,
        type: e.type,
        answer: e.answer,
      };
    } else {
      SetSurvey([
        ...Survey,
        { id: e.id, question: e.question, type: e.type, answer: e.answer },
      ]);
    }
  };

  const handleNavigation = () => {
    HandelSubmit();
    navigation.navigate("Attitude Related");
  };

  const HandelSubmit = async () => {
    // eslint-disable-next-line no-console
    console.log(Survey);
    try {
      await AsyncStorage.setItem("Knowledge", JSON.stringify(Survey));
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log("error", e);
      // saving error
    }
  };
  const renderCheckbox = (
    item: Question,
    handelSingleRadio: (selection: {
      question: string;
      answer: string;
      type: string;
      id: number;
    }) => void
  ): JSX.Element => (
    <SingleRadio handelSingleRadio={handelSingleRadio} options={item} />
  );

  return (
    <ScrollView style={styles.container}>
      <View style={{ width: "100%", padding: 10 }}>
        {knowledge.map((item, i) => {
          // const [selectedValue, SetselectedValue] = useState("");
          return (
            <View key={item.question}>
              <View style={{ display: "flex", flexDirection: "row" }}>
                <Text
                  style={{
                    color: "#2F4153",
                    fontWeight: "500",
                    fontSize: 16,
                  }}
                >
                  {i + 1 + ". "}
                </Text>
                <Text
                  style={{
                    color: "#2F4153",
                    fontWeight: "500",
                    fontSize: 16,
                    width: screenWidth,
                  }}
                >
                  {item.question}
                </Text>
              </View>
              {renderCheckbox(item, handelSingleRadio)}
            </View>
          );
        })}
        <TouchableOpacity onPress={handleNavigation}>
          <Button
            style={{
              backgroundColor: "#4E86DE",
              width: "15%",
              borderRadius: 10,
              marginLeft: "80%",
            }}
          >
            <Text style={{ color: "white", fontSize: 16 }}>Submit</Text>
          </Button>
        </TouchableOpacity>
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
