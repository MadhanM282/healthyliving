import axios from "axios";
import React, { useEffect, useState } from "react";
import { Dimensions } from "react-native";
import { StyleSheet, TouchableOpacity } from "react-native";
import { ScrollView } from "react-native";
import { Text, View } from "react-native";
import { Button } from "react-native-paper";
import { SingleRadio } from "../Elements/Radio";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ChecKBoxComponent } from "../Elements/check";

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
  item: {
    id: number;
    answer: string[];
    type: string;
    question: string;
  };
  headerLabel: string;
  qno?: string;
  id: number;
  Survey: {
    questionID: string;
    answer: string;
  };
};

export const Practice: React.FC = () => {
  const AuthStr = "3eb1aa6a-3136-462f-a7ba-162f6d091ef9";
  const [knowledge, setKnowledge] = useState<Question[]>([]);
  const [Survey, SetSurvey] = useState<
    { question: string; answer: string; type: string; id: number }[]
  >([]);
  const [multiple, SetMultiple] = useState<
    { question: string; answer: string[]; type: string; id: number }[]
  >([]);
  // eslint-disable-next-line no-console
  console.log(multiple);
  useEffect(() => {
    axios
      .get("http://65.1.11.235:5003/api/v1/getQuestion", {
        headers: { Token: AuthStr },
      })
      .then(({ data }) => {
        const knowledgeQuestions = data.data.english.filter(
          (e: Question) => e.section === "Practice related Questions"
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
        ["id"]: e.id,
        ["answer"]: e.answer,
        ["type"]: e.type,
        ["question"]: e.question,
      };
    } else {
      SetSurvey([
        ...Survey,
        {
          ["id"]: e.id,
          ["answer"]: e.answer,
          ["type"]: e.type,
          ["question"]: e.question,
        },
      ]);
    }
  };

  const renderRadio = (
    item: Question,
    handelSingleRadio: (selection: {
      question: string;
      answer: string;
      type: string;
      id: number;
    }) => void
  ) => <SingleRadio handelSingleRadio={handelSingleRadio} options={item} />;

  const HandelSubmit = async () => {
    // eslint-disable-next-line no-console
    // console.log(Survey);
    const arr = multiple.concat(Survey);
    try {
      await AsyncStorage.setItem("Practice", JSON.stringify(arr));
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log("error", e);
      // saving error
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={{ width: screenWidth, padding: 10, paddingTop: 0 }}>
        {knowledge.map((item) => {
          return (
            <View key={item.question}>
              {item?.label === undefined &&
                item.type === "Tick as many boxes as apply" && (
                  <View>
                    <View style={styles.MainQuestionContainer}>
                      <Text style={styles.MainQuestionText}>
                        {item.qno + ". "}
                        {item?.question + "  "}
                        {item.type}
                      </Text>
                    </View>
                    <View style={styles.HeaderOptionContainor}>
                      <View style={styles.HeaderContainer}>
                        {item?.optionA && (
                          <Text style={styles.HeaderOptionText}>
                            {item?.optionA}
                          </Text>
                        )}
                        {item?.optionB && (
                          <Text style={styles.HeaderOptionText}>
                            {item?.optionB}
                          </Text>
                        )}
                        {item?.optionC && (
                          <Text style={styles.HeaderOptionText2}>
                            {item?.optionC}
                          </Text>
                        )}
                      </View>
                    </View>
                  </View>
                )}
              {item?.label === undefined &&
                item.type === "Tick one box in each row" && (
                  <View style={styles.MainQuestionContainer}>
                    <Text style={styles.MainQuestionText}>
                      {item.qno + ". "}
                      {item.question}
                      {item.type}
                    </Text>
                  </View>
                )}
              {item.headerLabel && item.type === "Tick one box" && (
                <View style={styles.MainQuestionContainer}>
                  <Text style={styles.MainQuestionText}>
                    {item.qno + ". "}
                    {item.headerLabel}
                  </Text>
                  <Text style={styles.MainQuestionText}>{item.type}</Text>
                </View>
              )}
              {item?.label !== undefined &&
              item.type === "Tick as many boxes as apply" ? (
                <View style={styles.SubQuestionContainer}>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                    }}
                  >
                    <Text
                      style={{
                        color: "#2F4153",
                        fontWeight: "500",
                        fontSize: 16,
                      }}
                    >
                      {item?.label + ". "}
                    </Text>
                    <Text
                      style={{
                        color: "#2F4153",
                        fontWeight: "500",
                        fontSize: 16,
                        width: screenWidth / 2,
                      }}
                    >
                      {item.question}
                    </Text>
                  </View>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                    }}
                  >
                    <ChecKBoxComponent
                      values={item}
                      SetMultiple={SetMultiple}
                      multiple={multiple}
                    />
                  </View>
                </View>
              ) : (
                <View
                  key={item.question}
                  style={{
                    marginTop: 10,
                  }}
                >
                  {item.type === "Tick one box in each row" ? (
                    item?.label !== undefined && (
                      <View
                        style={{
                          borderBottomWidth: 1,
                          borderBottomColor: "#D9D9D9",
                        }}
                      >
                        <View style={{ display: "flex", flexDirection: "row" }}>
                          <Text
                            style={{
                              color: "#2F4153",
                              fontWeight: "500",
                              fontSize: 16,
                            }}
                          >
                            {item?.label + ". "}
                          </Text>
                          <Text
                            style={{
                              color: "#2F4153",
                              fontWeight: "500",
                              fontSize: 16,
                              width: screenWidth / 2,
                            }}
                          >
                            {item.question}
                          </Text>
                        </View>
                        {renderRadio(item, handelSingleRadio)}
                      </View>
                    )
                  ) : item.type === "Tick one box" ? (
                    <View
                      style={{
                        borderBottomWidth: 1,
                        borderBottomColor: "#D9D9D9",
                      }}
                    >
                      <View style={{ display: "flex", flexDirection: "row" }}>
                        <Text
                          style={{
                            color: "#2F4153",
                            fontWeight: "500",
                            fontSize: 16,
                          }}
                        >
                          {item?.label + ". "}
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
                      {renderRadio(item, handelSingleRadio)}
                    </View>
                  ) : (
                    ""
                  )}
                </View>
              )}
            </View>
          );
        })}
        <TouchableOpacity onPress={HandelSubmit}>
          <Button
            style={{
              backgroundColor: "#4E86DE",
              width: "15%",
              borderRadius: 10,
              marginLeft: "80%",
              marginTop: 10,
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
    paddingHorizontal: 0,
    paddingVertical: 0,
    height: screenHeight,
    backgroundColor: "white",
  },
  MainQuestionContainer: {
    borderWidth: 1,
    borderColor: "#D9D9D9",
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 10,
    width: screenWidth,
    marginLeft: -10,
    backgroundColor: "#FBFAFA",
  },
  MainQuestionText: {
    fontWeight: "600",
    fontSize: 18,
    color: "#7A7676",
    marginTop: 5,
  },
  HeaderOptionContainor: {
    display: "flex",
    flexDirection: "row",
    width: screenWidth,
    justifyContent: "flex-end",
  },
  HeaderContainer: {
    display: "flex",
    flexDirection: "row",
    width: screenWidth / 2,
    justifyContent: "space-evenly",
    padding: 10,
    marginTop: 10,
  },
  HeaderOptionText: {
    textAlign: "center",
    color: "black",
    fontWeight: "500",
    width: "30%",
  },
  HeaderOptionText2: {
    textAlign: "center",
    color: "black",
    fontWeight: "500",
    width: "40%",
  },
  SubQuestionContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#D9D9D9",
    marginTop: 5,
  },
});
