import React, { useState, useEffect } from "react";
import { ScrollView, TouchableOpacity, View, Text, Image } from "react-native";
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
  feedback: string;
  score: number;
  averageEmotion: string;
  advice: string;
}

export default function DailyFeedbackPage1({ navigation, route }: { navigation: any; route: any }) {
  const [feedback, setFeedback] = useState<DailyFeedback | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchDailyFeedback = async () => {
      try {
        setLoading(true);
        const response = await api.post("/feedback/daily", {});
        setFeedback(response.data);
      } catch (error) {
        console.error("매일 피드백 조회 실패", error);
        // 에러 시 기본값 설정
        setFeedback({
          feedback: "오늘은 돈을 하나도 안 썼네! 기분이 어땠는지 알려줘서 고마워.",
          score: 70,
          averageEmotion: "좋음",
          advice: "돈을 쓰면 무엇을 샀는지, 기분이 어땠는지 적어보는 연습을 해보자! 궁금한 점이 있으면 언제든지 물어봐."
        });
      } finally {
        setLoading(false);
      }
    };
    fetchDailyFeedback();
  }, []);

  const getEmotionImage = (emotion: string) => {
    switch (emotion) {
      case "좋음":
        return require("../../assets/happy.png");
      case "보통":
        return require("../../assets/soso.png");
      case "나쁨":
        return require("../../assets/sad.png");
      default:
        return require("../../assets/happy.png");
    }
  };

  const handleNext = () => {
    if (feedback) {
      navigation.navigate('DailyFeedbackPage2', { feedback });
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
            <Title style={{ marginBottom: 4 }}>매일 피드백</Title>
            <Subtitle>나의 피드백을 확인해보세요.</Subtitle>
          </View>
        </Header>

        <MenuContainer>
          <QuizContainer style={{ padding: 40, alignItems: 'center', justifyContent: 'center', minHeight: 400 }}>
            {loading ? (
              <Text style={{ fontSize: 18, color: '#666' }}>피드백을 불러오는 중...</Text>
            ) : feedback ? (
              <>
                <Image 
                  source={getEmotionImage(feedback.averageEmotion)} 
                  style={{ width: 120, height: 120, marginBottom: 32 }} 
                  resizeMode="contain"
                />
                
                <Text style={{ 
                  fontSize: 20, 
                  fontWeight: '600', 
                  textAlign: 'center',
                  color: '#007BFF',
                  marginBottom: 16
                }}>
                  {feedback.averageEmotion} (점수: {feedback.score}점)
                </Text>
                
                <Text style={{ 
                  fontSize: 14, 
                  fontWeight: '400', 
                  textAlign: 'center',
                  color: '#333',
                  lineHeight: 28
                }}>
                  {feedback.feedback}
                </Text>
              </>
            ) : (
              <Text style={{ fontSize: 18, color: '#666' }}>피드백을 불러올 수 없습니다.</Text>
            )}
          </QuizContainer>
        </MenuContainer>

        {feedback && !loading && (
          <View style={{ padding: 16, paddingBottom: 40 }}>
            <Button onPress={handleNext}>
              <Text style={{ color: '#fff', fontSize: 16, fontWeight: '600' }}>다음으로</Text>
            </Button>
          </View>
        )}

        <View style={{ alignItems: 'center', marginBottom: 20 }}>
          <Text style={{ color: '#999', fontSize: 12 }}>Developed by Oh yun chan</Text>
        </View>
      </ScrollView>
    </Container>
  );
} 