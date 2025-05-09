import React, { useState } from "react"
import { Ionicons } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"
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

export default function FinancialQuizScreen() {
  const navigation = useNavigation()
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)

  const question = {
    date: "4월 30일",
    text: "3000원만 남았는데 4000원인 장난감을 사고 싶어요. 어떻게 하는게 좋을까요?",
    options: [
      "그냥 구매 한다.",
      "내일 다시 생각해본다.",
      "친구에게 돈을 빌린다.",
      "엄마 몰래 구매한다."
    ]
  }

  return (
    <Container>
      <Header>
        <Ionicons name="chevron-back" size={24} color="#333" onPress={() => navigation.goBack()} />
        <Title>{`${question.date} 금융 퀴즈`}</Title>
      </Header>

      <Subtitle>오늘의 오윤이 금융 문제를 풀어보세요.</Subtitle>

      <QuizContainer>
        <QuestionContainer>
          <QuestionNumber>Q.</QuestionNumber>
          <QuestionText>{question.text}</QuestionText>
        </QuestionContainer>

        <AnswersContainer>
          {question.options.map((option, idx) => (
            <AnswerOption
              key={idx}
              selected={selectedAnswer === idx}
              onPress={() => setSelectedAnswer(idx)}
            >
              <AnswerText>{option}</AnswerText>
              {selectedAnswer === idx && <Ionicons name="checkmark" size={24} color="{theme.colors.primary}" />}
            </AnswerOption>
          ))}
        </AnswersContainer>
      </QuizContainer>

      <Button onPress={() => navigation.navigate('Dashboard' as never)} disabled={selectedAnswer === null}>
        <ButtonText>선택 완료</ButtonText>
      </Button>
    </Container>
  )
}
