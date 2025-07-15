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

interface WeeklyFeedback {
  weekPeriod: string;
  totalSpent: number;
  avgDailySpent: number;
  topCategory: string;
  feedbackMessage: string;
  weeklyGoal: number;
  achievement: number;
  trend: "증가" | "감소" | "유지";
  recommendation: string;
  emotion: string;
}

export default function WeeklyFeedbackPage1({ navigation, route }: { navigation: any; route: any }) {
  const [feedback, setFeedback] = useState<WeeklyFeedback>({
    weekPeriod: "11월 4주차",
    totalSpent: 45000,
    avgDailySpent: 6400,
    topCategory: "간식",
    feedbackMessage: "오늘은 행복해요.",
    weeklyGoal: 50000,
    achievement: 90,
    trend: "감소",
    recommendation: "오늘은 시작 자금 10000원으로 주식에 모두 투자했지만, 다행히 운이 좋아서 반만큼인 5000원을 더 벌어 총 15000원이 되었습니다. 하지만 더욱 계획적인 투자와 리스크 관리를 위해 다음에는 목표량을 정해서 해보세요.",
    emotion: "😊"
  });
  const [loading, setLoading] = useState(false);

  // TODO: 실제 API로 주간 피드백 가져오기
  // useEffect(() => {
  //   const fetchWeeklyFeedback = async () => {
  //     try {
  //       setLoading(true);
  //       const response = await api.get("/child/weekly-feedback/current");
  //       setFeedback(response.data);
  //     } catch (error) {
  //       console.error("주간 피드백 조회 실패", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchWeeklyFeedback();
  // }, []);

  const handleNext = () => {
    navigation.navigate('WeeklyFeedbackPage2', { feedback });
  };

  return (
    <Container>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginRight: 16 }}>
            <Ionicons name="chevron-back" size={24} color="#333" />
          </TouchableOpacity>
          <View style={{ flex: 1 }}>
            <Title style={{ marginBottom: 4 }}>주간 피드백</Title>
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