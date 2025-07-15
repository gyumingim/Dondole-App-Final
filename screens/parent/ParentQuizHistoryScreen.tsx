import React, { useState, useEffect } from "react";
import { ScrollView, TouchableOpacity, View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  Container,
  Header,
  Title,
  Subtitle,
  MenuContainer,
  MenuCard,
  MenuTextContainer,
  MenuTitle,
  MenuDescription,
} from "../../components/Styled";
import { api } from "../../utils/api";

interface QuizResult {
  id: number;
  question: string;
  date: string;
  isCorrect: boolean;
  userAnswer: string;
  correctAnswer: string;
}

export default function ParentQuizHistoryScreen({ navigation, route }: { navigation: any; route: any }) {
  const [quizHistory, setQuizHistory] = useState<QuizResult[]>([
    {
      id: 1,
      question: "3000원인 남은돈에...",
      date: "4월 29일 화요일",
      isCorrect: true,
      userAnswer: "내일 다시 생각해본다",
      correctAnswer: "내일 다시 생각해본다"
    },
    {
      id: 2,
      question: "3000원인 남은돈에...",
      date: "4월 28일 월요일",
      isCorrect: false,
      userAnswer: "그냥 구매한다",
      correctAnswer: "내일 다시 생각해본다"
    }
  ]);
  const [loading, setLoading] = useState(false);
  const selectedChild = route?.params?.selectedChild;

  // TODO: 실제 API로 퀴즈 내역 가져오기
  // useEffect(() => {
  //   const fetchQuizHistory = async () => {
  //     try {
  //       setLoading(true);
  //       const response = await api.get(`/parent/children/${selectedChild?.id}/quiz-history`);
  //       setQuizHistory(response.data);
  //     } catch (error) {
  //       console.error("퀴즈 내역 조회 실패", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   if (selectedChild) {
  //     fetchQuizHistory();
  //   }
  // }, [selectedChild]);

  const handleQuizDetail = (quiz: QuizResult) => {
    navigation.navigate("ParentQuizDetail", { quiz });
  };

  return (
    <Container>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginRight: 16 }}>
            <Ionicons name="chevron-back" size={24} color="#333" />
          </TouchableOpacity>
          <View style={{ flex: 1 }}>
            <Title style={{ marginBottom: 4 }}>금융 퀴즈 내역</Title>
            <Subtitle>현재 퀴즈 기록을 확인하세요.</Subtitle>
          </View>
        </Header>

        <MenuContainer>
          {quizHistory.map((quiz) => (
            <MenuCard key={quiz.id} onPress={() => handleQuizDetail(quiz)}>
              <MenuTextContainer style={{ flex: 1 }}>
                <MenuTitle style={{ marginBottom: 8 }}>{quiz.question}</MenuTitle>
                <MenuDescription>{quiz.date}</MenuDescription>
              </MenuTextContainer>
              <View style={{ 
                backgroundColor: quiz.isCorrect ? '#007BFF' : '#FF3B30',
                paddingHorizontal: 12,
                paddingVertical: 6,
                borderRadius: 12,
                minWidth: 50,
                alignItems: 'center'
              }}>
                <Text style={{ 
                  color: '#fff', 
                  fontSize: 12, 
                  fontWeight: '600' 
                }}>
                  {quiz.isCorrect ? '정답' : '오답'}
                </Text>
              </View>
            </MenuCard>
          ))}

          {quizHistory.length === 0 && !loading && (
            <View style={{ 
              padding: 40, 
              alignItems: 'center', 
              justifyContent: 'center' 
            }}>
              <Text style={{ 
                color: '#999', 
                fontSize: 16, 
                textAlign: 'center' 
              }}>
                아직 퀴즈 기록이 없습니다.
              </Text>
            </View>
          )}
        </MenuContainer>
      </ScrollView>
    </Container>
  );
} 