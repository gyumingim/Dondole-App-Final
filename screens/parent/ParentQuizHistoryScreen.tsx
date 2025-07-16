import React, { useState, useEffect } from "react";
import { ScrollView, TouchableOpacity, View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
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

export default function ParentQuizHistoryScreen({ navigation, route }: { navigation: any; route: any }) {
  const [quizHistory, setQuizHistory] = useState<QuizResult[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchQuizHistory = async () => {
      try {
        setLoading(true);
        const userId = await AsyncStorage.getItem("selectedChildId");
        if (!userId) {
          console.error("[ParentQuizHistory] selectedChildId가 없습니다.");
          return;
        }
        const response = await api.get<QuizResult[]>(`/quizs/${userId}`);
        setQuizHistory(response.data);
      } catch (error) {
        console.error("[ParentQuizHistory] 퀴즈 내역 조회 실패", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchQuizHistory();
  }, []);

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
          {quizHistory.map((quiz) => {
            const date = new Date(quiz.createdAt);
            const formattedDate = `${date.getMonth() + 1}월 ${date.getDate()}일`;
            
            return (
              <MenuCard key={quiz.id} onPress={() => handleQuizDetail(quiz)}>
                <MenuTextContainer style={{ flex: 1 }}>
                  <MenuTitle style={{ marginBottom: 8 }}>{quiz.question}</MenuTitle>
                  <MenuDescription>{formattedDate}</MenuDescription>
                </MenuTextContainer>
                <View style={{ 
                  backgroundColor: quiz.isCorrected ? '#007BFF' : '#FF3B30',
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
                    {quiz.isCorrected ? '정답' : '오답'}
                  </Text>
                </View>
              </MenuCard>
            );
          })}

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