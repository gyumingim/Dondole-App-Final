import React, { useState, useEffect } from "react";
import { ScrollView, View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import {
  Container,
  Header,
  Title,
  Subtitle,
  Button,
  ButtonText,
} from "../../components/Styled";
import { api, getStoredToken } from "../../utils/api";

export default function DailyFeedbackPage1() {
  const navigation = useNavigation();

  const [feedbackData, setFeedbackData] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchDailyFeedback();
  }, []);

  const fetchDailyFeedback = async () => {
    try {
      const url = "http://15.164.98.121:8080/feedback/daily";
      const res = await api.post(url);
      const latest = res.data;
      console.log("latest", latest);
      const map: Record<string, string> = {
        "보통": "오늘은 평범해요.",
        "좋음": "오늘은 좋아요.",
        "나쁨": "오늘은 좋지 않아요.",
      };
      const summaryText = map[latest.averageEmotion?.trim() as string] || "오늘은 평범해요.";
      setFeedbackData({
        summary: summaryText,
        details: Array.isArray(latest.feedback) ? latest.feedback : [latest.feedback],
        advice: latest.advice,
        emotion: latest.averageEmotion,
      });
    } catch (error) {
      console.log("/feedback/daily API 실패, 더미 데이터 사용", error);
      // 더미 데이터
      setFeedbackData({
        summary: "오늘은 평범해요.",
        details: [
          "오늘은 옷을 사서 10000원을 썼네.",
          "기분이 좋았구나!",
          "고정으로 나가는 돈은 3000원이고,"
        ],
        advice: "옷을 사서 기분 좋았지만, 다음에는 돈을 쓸 때 조금 더 생각해 보자! 돈을 모으는 연습도 해보자!",
        emotion: "보통",
      });
    } finally {
      setLoading(false);
    }
  };

  const getEmoji = (emo?: string) => {
    switch ((emo || "보통").trim()) {
      case "좋음":
        return "😊";
      case "아쉬움":
      case "나쁨":
        return "😢";
      case "보통":
      default:
        return "😐";
    }
  };

  const handleNext = () => {
    (navigation as any).navigate("DailyFeedbackPage2", { feedbackData });
  };

  return (
    <Container style={{ backgroundColor: '#FFFFFF' }}>
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ 
          paddingBottom: 40
        }}
      >
        {/* 헤더 영역 */}
        <Header style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginRight: 16 }}>
            <Ionicons name="chevron-back" size={24} color="#333" />
          </TouchableOpacity>
          <View>
            <Title>매일 피드백</Title>
            <Subtitle>아래 피드백을 확인해 주세요.</Subtitle>
          </View>
        </Header>
        <View style={{
          backgroundColor: '#FFFFFF',
          borderRadius: 24,
          padding: 40,
          margin: 20,
          alignItems: 'center',
          shadowColor: '#000',
          shadowOpacity: 0.1,
          shadowRadius: 8,
          elevation: 2,
        }}>
          {/* 크게 표시되는 이모지 */}
          <Text style={{ fontSize: 96, marginBottom: 24 }}>
            {loading ? "😐" : getEmoji(feedbackData?.emotion)}
          </Text>

          <Text style={{
            fontSize: 20,
            fontFamily: 'Pretendard-Bold',
            color: '#191F28',
            marginBottom: 12,
            textAlign: 'center'
          }}>
            {loading ? '로딩 중...' : ("오늘은 " + feedbackData?.emotion + "이에요.")}
          </Text>

          {!loading && (
              <Text style={{
              fontSize: 14,
              fontFamily: 'Pretendard-Regular',
              color: '#6B7684',
              textAlign: 'center',
              lineHeight: 20,
              marginBottom: 8
            }}>
              {feedbackData?.details}
            </Text>
          )}
        </View>

        <Button 
          onPress={handleNext}
          style={{ 
            margin: 20,
            marginTop: 0,
            opacity: loading ? 0.5 : 1
          }}
          disabled={loading}
        >
          <ButtonText>다음으로</ButtonText>
        </Button>
      </ScrollView>
    </Container>
  );
} 