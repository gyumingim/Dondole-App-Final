import React from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  Container,
  Header,
  Title,
  Subtitle,
  QuizContainer,
  QuestionContainer,
  QuestionNumber,
  QuestionText,
  AnswersContainer,
  AnswerOption,
  AnswerText,
  Button,
  ButtonText,
} from "../../components/Styled";

export default function ParentQuizDetailScreen({ navigation, route }: { navigation: any; route: any }) {
  const { quiz } = route.params || {};
  
  const question = {
    text: "3000원만 남았는데 4000원인 장난감을 사고 싶어요. 어떻게 하는게 좋을까요?",
    options: [
      "그냥 구입 한다.",
      "내일 다시 생각해본다.",
      "친구에게 돈을 빌린다.",
      "엄마 몰래 구매한다."
    ],
    correctAnswerIndex: 1,
    userAnswerIndex: quiz?.isCorrect ? 1 : 0
  };

  const handleNext = () => {
    if (quiz?.isCorrect) {
      // 정답인 경우 그냥 돌아가기
      navigation.goBack();
    } else {
      // 오답인 경우 피드백 화면으로
      navigation.navigate("ParentQuizFeedback", { 
        quiz, 
        correctAnswer: question.options[question.correctAnswerIndex] 
      });
    }
  };

  return (
    <Container>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginRight: 16 }}>
            <Ionicons name="chevron-back" size={24} color="#333" />
          </TouchableOpacity>
          <View style={{ flex: 1 }}>
            <Title style={{ marginBottom: 4 }}>
              {quiz?.isCorrect ? "정답이에요:)" : "오답이에요:("}
            </Title>
            <Subtitle>
              {quiz?.isCorrect ? "문제를 맞혔어요." : "아쉽게 정답이 틀렸네요."}
            </Subtitle>
          </View>
        </Header>

        <QuizContainer>
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }}>
            <QuestionContainer>
              <QuestionNumber>Q.</QuestionNumber>
              <QuestionText>{question.text}</QuestionText>
            </QuestionContainer>

            <AnswersContainer>
              {question.options.map((option, idx) => {
                const isUserAnswer = idx === question.userAnswerIndex;
                const isCorrectAnswer = idx === question.correctAnswerIndex;
                const showCorrectMark = !quiz?.isCorrect && isCorrectAnswer;
                
                return (
                  <AnswerOption
                    key={idx}
                    selected={isUserAnswer || showCorrectMark}
                    style={{
                      borderColor: showCorrectMark ? '#007BFF' : (isUserAnswer ? '#007BFF' : 'transparent'),
                      borderWidth: 2
                    }}
                  >
                    <AnswerText>{option}</AnswerText>
                    {(isUserAnswer || showCorrectMark) && (
                      <Ionicons name="checkmark" size={24} color="#007BFF" />
                    )}
                  </AnswerOption>
                );
              })}
            </AnswersContainer>
          </ScrollView>
        </QuizContainer>

        <Button onPress={handleNext} style={{ marginTop: 20 }}>
          <ButtonText>{quiz?.isCorrect ? "홈으로" : "다음으로"}</ButtonText>
        </Button>
      </ScrollView>
    </Container>
  );
} 