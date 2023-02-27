import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Text,
  View,
} from "react-native";
import { Button } from "react-native-paper";
import { SingleRadioElement } from "../Elements/RadioElement";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

type Question = {
  label?: undefined;
  question: string;
  optionA?: string;
  optionB?: string;
  optionC?: string;
  optionD?: string;
  optionE?: string;
  section: string;
  Survey: {
    questionID: string;
    answer: string;
  };
  id: number;
  type: string;
};

export const Attitude: React.FC = () => {
  const navigation = useNavigation();
  const AuthStr = "3eb1aa6a-3136-462f-a7ba-162f6d091ef9";
  const [Attitude, setAttitude] = useState<Question[]>([]);
  const [Survey, SetSurvey] = useState<
    { question: string; answer: string; type: string; id: number }[]
  >([]);
  useEffect(() => {
    axios
      .get("http://65.1.11.235:5003/api/v1/getQuestion", {
        headers: { Token: AuthStr },
      })
      .then(({ data }) => {
        const AttitudeQuestions = data.data.english.filter(
          (e: Question) => e.section === "Attitude related Questions"
        );
        setAttitude(AttitudeQuestions);
      });
  }, []);

  const renderCheckbox = (
    item: Question,
    handelSingleRadio: (e: {
      question: string;
      answer: string;
      type: string;
      id: number;
    }) => void
  ) => {
    return (
      <SingleRadioElement
        options={item}
        handelSingleRadio={handelSingleRadio}
      />
    );
  };

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

  const HandelSubmit = async () => {
    // eslint-disable-next-line no-console
    console.log(Survey);
    try {
      await AsyncStorage.setItem("Attitude", JSON.stringify(Survey));
      navigation.navigate("Practice Reladed");
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log("error", e);
      // saving error
    }
  };

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <View style={styles.QuestionsContainer}>
          <Text style={styles.QuestionBox}>{Attitude[0]?.question}</Text>
          <View style={styles.OptionsContainer}>
            <View style={styles.OptionsContainer2}>
              {Attitude[0]?.optionA && (
                <Text style={styles.optionText}>{Attitude[0]?.optionA}</Text>
              )}
              {Attitude[0]?.optionB && (
                <Text style={styles.optionText}>{Attitude[0]?.optionB}</Text>
              )}
              {Attitude[0]?.optionC && (
                <Text style={styles.optionText2}>{Attitude[0]?.optionC}</Text>
              )}
            </View>
          </View>
          {Attitude.map((item) => {
            return (
              <View key={item.question}>
                {item.label !== undefined && (
                  <View style={styles.SubQuestionContainer}>
                    <View style={styles.SubQuestionBox}>
                      <Text style={styles.SubQuestionLabel}>
                        {item.label + ". "}
                      </Text>
                      <Text style={styles.SubQuestion}>{item.question}</Text>
                    </View>
                    <View style={styles.CheckBoxContainor}>
                      {renderCheckbox(item, handelSingleRadio)}
                    </View>
                  </View>
                )}
              </View>
            );
          })}
        </View>
        <TouchableOpacity onPress={HandelSubmit}>
          <Button style={styles.Button}>
            <Text style={styles.ButtonText}>Submit</Text>
          </Button>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    paddingVertical: 3,
    paddingHorizontal: 0,
    height: screenHeight,
    backgroundColor: "white",
  },
  container: {
    height: screenHeight + 500,
  },
  QuestionsContainer: {
    width: screenWidth,
    margin: 10,
  },
  QuestionBox: {
    fontWeight: "600",
    fontSize: 18,
    color: "#7A7676",
    borderWidth: 1,
    borderColor: "#D9D9D9",
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 10,
    width: screenWidth,
    marginLeft: -10,
    backgroundColor: "#FBFAFA",
  },
  OptionsContainer: {
    display: "flex",
    flexDirection: "row",
    width: screenWidth,
    justifyContent: "flex-end",
  },
  OptionsContainer2: {
    display: "flex",
    flexDirection: "row",
    width: screenWidth / 1.9,
    padding: 10,
    marginRight: -30,
    marginTop: 15,
  },
  optionText: {
    textAlign: "center",
    color: "black",
    fontWeight: "500",
    width: "30%",
  },
  optionText2: {
    textAlign: "center",
    color: "black",
    fontWeight: "500",
    width: "35%",
  },
  SubQuestionContainer: {
    display: "flex",
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#D9D9D9",
    alignItems: "center",
    margin: 5,
  },
  SubQuestionBox: {
    display: "flex",
    flexDirection: "row",
    width: screenWidth / 2,
  },
  SubQuestionLabel: {
    color: "#2F4153",
    fontWeight: "500",
    fontSize: 16,
  },
  SubQuestion: {
    color: "#2F4153",
    fontWeight: "500",
    fontSize: 16,
  },
  CheckBoxContainor: {
    display: "flex",
    flexDirection: "row",
    width: screenWidth / 2.1,
    justifyContent: "space-evenly",
    margin: 10,
  },
  Button: {
    backgroundColor: "#4E86DE",
    width: "15%",
    borderRadius: 10,
    marginLeft: "80%",
  },
  ButtonText: { color: "white", fontSize: 16 },
});
