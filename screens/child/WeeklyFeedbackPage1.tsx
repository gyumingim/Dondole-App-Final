import React, { useState, useEffect } from "react";
import { ScrollView, View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  Container,
  Header,
  Title,
  Subtitle,
  Button,
  ButtonText,
} from "../../components/Styled";
import { api } from "../../utils/api";

export default function WeeklyFeedbackPage1({ navigation }: { navigation: any }) {
  const [feedbackData, setFeedbackData] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchWeeklyFeedback();
  }, []);

  const fetchWeeklyFeedback = async () => {
    try {
      const url = "http://15.164.98.121:8080/feedback/weekly";
      const res = await api.get(url);
      console.log("weekly feedback", res.data);
      let data = res.data;
      if (Array.isArray(data) && data.length > 0) {
        // createdAt 기준 내림차순 정렬 후 가장 최근 항목 선택
        data = data.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())[0];
      }
      console.log("weekly feedback", data);
      if (data) {
        const emotionMap: Record<string, string> = {
          "매우 좋음": "이번 주는 기분이 아주 좋았어요!",
          "좋음": "이번 주는 기분이 좋았어요!",
          "보통": "이번 주는 평범했어요.",
          "나쁨": "이번 주는 아쉬웠어요.",
          "매우 나쁨": "이번 주는 아쉬웠어요.",
        };

        const summary = emotionMap[data.emotion?.trim()] || "이번 주는 평범했어요.";

        const details = (data.content || "").split(/\n|\.|,/).map((s: string) => s.trim()).filter((s: string) => s.length > 0);

        setFeedbackData({
          summary,
          details,
          advice: data.advice || undefined,
          emotion: data.emotion?.trim() || "보통",
        });
      }
    } catch (error) {
      console.warn("/feedback/weekly API 실패, 더미 데이터 사용", error);
      setFeedbackData({
        summary: "이번 주는 평범했어요.",
        details: [
          "이번 주에 30000원을 썼네요.",
          "예산을 잘 지켰어요!",
          "다음 주에도 잘해보자고요!"
        ],
        advice: "계획적인 소비를 유지하고, 저축 목표를 세워보세요!",
        emotion: "보통",
      });
    } finally {
      setLoading(false);
    }
  };

  const getEmoji = (emo?: string) => {
    switch ((emo || "보통").trim()) {
      case "매우 좋음":
      case "좋음":
        return "😊";
      case "나쁨":
      case "매우 나쁨":
        return "😢";
      case "보통":
      default:
        return "😐";
    }
  };

  const handleNext = () => {
    (navigation as any).navigate("WeeklyFeedbackPage2", { feedbackData });
  };

  return (
    <Container style={{ backgroundColor: "#FFFFFF" }}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
        {/* 헤더 */}
        <Header style={{ flexDirection: "row", alignItems: "center", marginBottom: 16 }}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginRight: 16 }}>
            <Ionicons name="chevron-back" size={24} color="#333" />
          </TouchableOpacity>
          <View>
            <Title>주간 피드백</Title>
            <Subtitle>이번 주 결과를 확인해 주세요.</Subtitle>
          </View>
        </Header>

        <View
          style={{
            backgroundColor: "#FFFFFF",
            borderRadius: 24,
            padding: 40,
            margin: 20,
            alignItems: "center",
            shadowColor: "#000",
            shadowOpacity: 0.1,
            shadowRadius: 8,
            elevation: 2,
          }}
        >
          {/* 이모지 */}
          <Text style={{ fontSize: 96, marginBottom: 24 }}>
            {loading ? "😐" : getEmoji(feedbackData?.emotion)}
          </Text>

          <Text
            style={{
              fontSize: 20,
              fontFamily: "Pretendard-Bold",
              color: "#191F28",
              marginBottom: 12,
              textAlign: "center",
            }}
          >
            {loading ? "로딩 중..." : feedbackData?.summary || "이번 주는 평범했어요."}
          </Text>

          {!loading &&
            (feedbackData?.details || []).map((line: string, idx: number) => (
              <Text
                key={idx}
                style={{
                  fontSize: 14,
                  fontFamily: "Pretendard-Regular",
                  color: "#6B7684",
                  textAlign: "center",
                  lineHeight: 20,
                  marginBottom: 8,
                }}
              >
                {line}
              </Text>
            ))}
        </View>

        <Button
          onPress={handleNext}
          style={{ margin: 20, marginTop: 0, opacity: loading ? 0.5 : 1 }}
          disabled={loading}
        >
          <ButtonText>다음으로</ButtonText>
        </Button>
      </ScrollView>
    </Container>
  );
} 