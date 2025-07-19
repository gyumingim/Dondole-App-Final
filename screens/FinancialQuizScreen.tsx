import React, { useState, useEffect } from "react"
import { Ionicons } from "@expo/vector-icons"
import { useNavigation, useRoute } from "@react-navigation/native"
import { Alert, ScrollView, View, TouchableOpacity } from "react-native";
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
  ButtonText
} from "@/components/Styled"
import { fetchQuizzes, submitQuizAnswer, api } from "../utils/api";

export default function FinancialQuizScreen() {
  const navigation = useNavigation()
  const route = useRoute()
  const { quizId } = (route.params as { quizId?: number }) || {}
  
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [question, setQuestion] = useState<{id:number;text:string; options:string[]; answer:number; feedback?:string} | null>(null);
  const [correctIndex, setCorrectIndex] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const loadQuiz = async () => {
      try {
        const data = await fetchQuizzes();
        
        // route parameter로 받은 quizId가 있으면 해당 퀴즈를 찾음
        let selectedQuiz;
        if (quizId) {
          selectedQuiz = data.find(q => q.id === quizId);
        } else {
          // quizId가 없으면 가장 최신 퀴즈 선택
          selectedQuiz = data.reduce((prev, current) => (prev.id > current.id) ? prev : current, data[0]);
        }
        
        if (selectedQuiz) {
          setQuestion({
            id: selectedQuiz.id,
            text: selectedQuiz.question,
            options: [selectedQuiz.choice1, selectedQuiz.choice2, selectedQuiz.choice3, selectedQuiz.choice4],
            answer: selectedQuiz.answer,
            feedback: selectedQuiz.feedback
          });
        }
      } catch (e) {
        console.error(e);
      }
    };
    loadQuiz();
  }, [quizId]);

  const saveSolvedQuiz = async (quizId: number) => {
    try {
      // 기존 푼 퀴즈 목록 가져오기
      const solvedIds = await AsyncStorage.getItem("solvedQuizIds");
      const parsedSolvedIds = solvedIds ? JSON.parse(solvedIds) : [];
      
      // 중복 체크 후 추가
      if (!parsedSolvedIds.includes(quizId)) {
        parsedSolvedIds.push(quizId);
        await AsyncStorage.setItem("solvedQuizIds", JSON.stringify(parsedSolvedIds));
      }
    } catch (error) {
      console.error("푼 퀴즈 저장 실패:", error);
    }
  };

  return (
    <Container>
      <Header style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginRight: 16 }}>
          <Ionicons name="chevron-back" size={24} color="#333" />
        </TouchableOpacity>
        <View style={{ flex: 1 }}>
          <Title style={{ marginBottom: 4 }}>오늘의 금융 퀴즈</Title>
          <Subtitle>문제를 풀어보세요.</Subtitle>
        </View>
      </Header>

      {question && (
        <QuizContainer>
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }}>
            <QuestionContainer>
              <QuestionNumber>Q.</QuestionNumber>
              <QuestionText>{question.text}</QuestionText>
            </QuestionContainer>

            <AnswersContainer>
              {question.options.map((option, idx) => (
                <AnswerOption
                  key={idx}
                  selected={selectedAnswer === idx}
                  style={correctIndex === idx ? { borderColor: '#00C896', borderWidth: 2 } : 
                         correctIndex !== null && selectedAnswer === idx ? { borderColor: '#FF5A5F', borderWidth: 2 } : undefined}
                  onPress={() => !submitted && setSelectedAnswer(idx)}
                  disabled={submitted}
                >
                  <AnswerText selected={selectedAnswer === idx}>{option}</AnswerText>
                  {submitted && correctIndex === idx && (
                    <Ionicons name="checkmark-circle" size={24} color="#00C896" style={{ marginLeft: 8 }} />
                  )}
                  {submitted && correctIndex !== idx && selectedAnswer === idx && (
                    <Ionicons name="close-circle" size={24} color="#FF5A5F" style={{ marginLeft: 8 }} />
                  )}
                </AnswerOption>
              ))}
            </AnswersContainer>
          </ScrollView>
        </QuizContainer>
      )}

      {!submitted && (
      <Button
        onPress={async () => {
          if (!question || selectedAnswer === null) return;
          try {
            await api.post("/ai/quiz", {});
            console.log("새로운 퀴즈 생성 요청 완료");
            const result = await submitQuizAnswer({ id: question.id, userAnswer: selectedAnswer + 1 });
            
            // 퀴즈를 푼 것으로 저장
            await saveSolvedQuiz(question.id);
            
            if (result.isCorrected) {
              Alert.alert("정답입니다! 🎉", "잘했어요! 다음 퀴즈도 풀어볼까요?", [
                { text: "다음 퀴즈", onPress: () => navigation.navigate("FinancialQuizSelection" as never) },
                { text: "홈으로", onPress: () => navigation.navigate("ChildDashboard" as never) },
              ]);
            } else {
              setCorrectIndex(result.answer - 1);
              const fb = result.feedback || question.feedback || "";
              setFeedback(fb);
            }
            setSubmitted(true);
          } catch (e) {
            console.error(e);
          }
        }}
        disabled={selectedAnswer === null || !question}
        style={{ opacity: selectedAnswer === null || !question ? 0.5 : 1 }}
      >
        <ButtonText>선택 완료</ButtonText>
      </Button>)}

        {feedback && (
          <Button style={{ marginTop: 16 }} onPress={() => (navigation as any).navigate("QuizFeedback", { 
            feedback,
            correctAnswer: question?.options[correctIndex || 0] || ""
          })}>
            <ButtonText>피드백 보기</ButtonText>
          </Button>
        )}


    </Container>
  )
}
