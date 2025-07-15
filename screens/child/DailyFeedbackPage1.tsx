import React, { useState, useEffect } from "react";
import { ScrollView, TouchableOpacity, View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  Container,
  Header,
  Title,
  Subtitle,
  MenuContainer,
  QuizContainer,
  Button,
} from "../../components/Styled";
import { api } from "../../utils/api";

interface DailyFeedback {
  date: string;
  totalSpent: number;
  feedbackMessage: string;
  emotion: string;
  recommendation: string;
}

export default function DailyFeedbackPage1({ navigation, route }: { navigation: any; route: any }) {
  const [feedback, setFeedback] = useState<DailyFeedback>({
    date: "2023년 11월 30일",
    totalSpent: 12000,
    feedbackMessage: "오늘은 행복해요.",
    emotion: "😊",
    recommendation: "오늘은 돈을 시작 10000원을 받았고, 기분이 들떠 주식에 10000원을 다 투자했습니다. 하지만 운이 좋아서 10000원의 반인 5000원을 더 벌어 총 15000원이 되었습니다."
  });
  const [loading, setLoading] = useState(false);

  // TODO: 실제 API로 매일 피드백 가져오기
  // useEffect(() => {
  //   const fetchDailyFeedback = async () => {
  //     try {
  //       setLoading(true);
  //       const response = await api.get("/child/daily-feedback/today");
  //       setFeedback(response.data);
  //     } catch (error) {
  //       console.error("매일 피드백 조회 실패", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchDailyFeedback();
  // }, []);

  const handleNext = () => {
    navigation.navigate('DailyFeedbackPage2', { feedback });
  };

  return (
    <Container>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginRight: 16 }}>
            <Ionicons name="chevron-back" size={24} color="#333" />
          </TouchableOpacity>
          <View style={{ flex: 1 }}>
            <Title style={{ marginBottom: 4 }}>매일 피드백</Title>
            <Subtitle>나의 피드백을 확인해보세요.</Subtitle>
          </View>
        </Header>

        <MenuContainer>
          <QuizContainer style={{ padding: 40, alignItems: 'center', justifyContent: 'center', minHeight: 400 }}>
            <Text style={{ fontSize: 120, marginBottom: 32 }}>{feedback.emotion}</Text>
            
            <Text style={{ 
              fontSize: 24, 
              fontWeight: '600', 
              textAlign: 'center',
              color: '#333',
              lineHeight: 32
            }}>
              {feedback.feedbackMessage}
            </Text>
          </QuizContainer>
        </MenuContainer>

        <View style={{ padding: 16, paddingBottom: 40 }}>
          <Button onPress={handleNext}>
            <Text style={{ color: '#fff', fontSize: 16, fontWeight: '600' }}>다음으로</Text>
          </Button>
        </View>

        <View style={{ alignItems: 'center', marginBottom: 20 }}>
          <Text style={{ color: '#999', fontSize: 12 }}>Developed by Oh yun chan</Text>
        </View>
      </ScrollView>
    </Container>
  );
} 