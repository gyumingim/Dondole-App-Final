import React, { useState, useEffect } from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
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
import { api } from "../../utils/api";

interface QuizData {
  id: number;
  question: string;
  choice1: string;
  choice2: string;
  choice3: string;
  choice4: string;
  answer: number;
  userAnswer: number;
  isCorrected: boolean;
  feedback: string;
  createdAt: string;
}

export default function ParentQuizDetailScreen({ navigation, route }: { navigation: any; route: any }) {
  const { quiz } = route.params || {};
  const [quizData, setQuizData] = useState<QuizData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadQuizData() {
      try {
        setLoading(true);
        const userId = await AsyncStorage.getItem("selectedChildId");
        if (!userId) {
          console.error("[ParentQuizDetail] selectedChildId가 없습니다.");
          return;
        }
        
        const res = await api.get<QuizData[]>(`/quizs/${userId}`);
        // route.params에서 받은 quiz id로 해당 퀴즈 찾기
        const targetQuiz = res.data.find(q => q.id === quiz?.id) || res.data[0];
        setQuizData(targetQuiz || null);
      } catch (err) {
        console.error("[ParentQuizDetail] 퀴즈 데이터 조회 실패", err);
      } finally {
        setLoading(false);
      }
    }

    loadQuizData();
  }, []);

  if (loading || !quizData) {
    return (
      <Container>
        <Header style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginRight: 16 }}>
            <Ionicons name="chevron-back" size={24} color="#333" />
          </TouchableOpacity>
          <View style={{ flex: 1 }}>
            <Title>로딩 중...</Title>
          </View>
        </Header>
      </Container>
    );
  }

  const question = {
    text: quizData.question,
    options: [
      quizData.choice1,
      quizData.choice2,
      quizData.choice3,
      quizData.choice4
    ],
    correctAnswerIndex: quizData.answer,
    userAnswerIndex: quizData.userAnswer
  };

  const handleNext = () => {
    if (quizData.isCorrected) {
      // 정답인 경우 그냥 돌아가기
      navigation.goBack();
    } else {
      // 오답인 경우 피드백 화면으로
      navigation.navigate("ParentQuizFeedback", { 
        quiz: quizData, 
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
              {quizData.isCorrected ? "정답이에요:)" : "오답이에요:("}
            </Title>
            <Subtitle>
              {quizData.isCorrected ? "문제를 맞혔어요." : "아쉽게 정답이 틀렸네요."}
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
                const showCorrectMark = !quizData.isCorrected && isCorrectAnswer;
                const isWrongAnswer = isUserAnswer && !quizData.isCorrected && !isCorrectAnswer;
                
                // 색상 결정
                let borderColor = 'transparent';
                let iconColor = '#007BFF';
                
                if (showCorrectMark) {
                  // 정답 표시 (틀렸을 때 정답 보여주기)
                  borderColor = '#007BFF';
                  iconColor = '#007BFF';
                } else if (isWrongAnswer) {
                  // 사용자가 틀린 답
                  borderColor = '#FF4444';
                  iconColor = '#FF4444';
                } else if (isUserAnswer && quizData.isCorrected) {
                  // 사용자가 맞힌 답
                  borderColor = '#007BFF';
                  iconColor = '#007BFF';
                }
                
                return (
                  <AnswerOption
                    key={idx}
                    selected={isUserAnswer || showCorrectMark}
                    style={{
                      borderColor,
                      borderWidth: 2
                    }}
                  >
                    <AnswerText>{option}</AnswerText>
                    {(isUserAnswer || showCorrectMark) && (
                      isWrongAnswer ? (
                        <Ionicons name="close" size={24} color={iconColor} />
                      ) : (
                        <Ionicons name="checkmark" size={24} color={iconColor} />
                      )
                    )}
                  </AnswerOption>
                );
              })}
            </AnswersContainer>
          </ScrollView>
        </QuizContainer>

        <Button onPress={handleNext} style={{ marginTop: 20 }}>
          <ButtonText>{quizData.isCorrected ? "홈으로" : "다음으로"}</ButtonText>
        </Button>
      </ScrollView>
    </Container>
  );
} 