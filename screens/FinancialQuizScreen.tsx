import React, { useState, useEffect } from "react"
import { Ionicons } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"
import { Alert, ScrollView } from "react-native";
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
import { fetchQuizzes, submitQuizAnswer } from "../utils/api";

export default function FinancialQuizScreen() {
  const navigation = useNavigation()
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [question, setQuestion] = useState<{id:number;text:string; options:string[]; answer:number; feedback?:string} | null>(null);
  const [correctIndex, setCorrectIndex] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const loadQuiz = async () => {
      try {
        const data = await fetchQuizzes();
        const first = data.find(q => q.id === 0) || data[0];
        if (first) {
          setQuestion({
            id: first.id,
            text: first.question,
            options: [first.choice1, first.choice2, first.choice3, first.choice4],
            answer: first.answer,
            feedback: first.feedback
          });
        }
      } catch (e) {
        console.error(e);
      }
    };
    loadQuiz();
  }, []);

  return (
    <Container>
      <Header>
        <Title>오늘의 금융 퀴즈</Title>
        <Subtitle>문제를 풀어보세요.</Subtitle>
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
                  style={correctIndex === idx ? { borderColor: 'red', borderWidth: 2 } : undefined}
                  onPress={() => setSelectedAnswer(idx)}
                >
                  <AnswerText>{option}</AnswerText>
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
            const result = await submitQuizAnswer({ id: question.id, userAnswer: selectedAnswer + 1 });
            if (result.isCorrected) {
              Alert.alert("정답입니다!", "잘했어요!", [
                { text: "확인", onPress: () => navigation.navigate("Dashboard" as never) },
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
      >
        <ButtonText>선택 완료</ButtonText>
      </Button>)}

        {feedback && (
          <Button style={{ marginTop: 40 }} onPress={() => (navigation as any).navigate("QuizFeedback", { 
            feedback,
            correctAnswer: question?.options[correctIndex || 0] || ""
          })}>
            <ButtonText>피드백 보기</ButtonText>
          </Button>
        )}


    </Container>
  )
}
