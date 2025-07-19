import React, { useState, useEffect } from "react";
import { ScrollView, View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Container,
  Header,
  Title,
  Subtitle,
  MenuCard,
  MenuTextContainer,
} from "../../components/Styled";
import { api } from "../../utils/api";

interface WeeklyFeedback {
  id: number;
  content: string;
  emotion: string;
  advice: string | null;
  category: "WEEKLY";
  createdAt: string;
}

export default function ParentWeeklyFeedbackList({ navigation }: { navigation: any }) {
  const [feedbacks, setFeedbacks] = useState<WeeklyFeedback[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const fetchFeedbacks = async () => {
    try {
      const selectedChildId = await AsyncStorage.getItem("selectedChildId");
      if (selectedChildId) {
        try {
          const response = await api.get<WeeklyFeedback[]>(`/feedback/weekly/${selectedChildId}`);
          console.log("weekly feedback", response.data);
          const sorted = response.data.sort((a,b)=> new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
          setFeedbacks(sorted);
        } catch (apiError) {
          console.log("API에서 데이터를 가져올 수 없어 더미 데이터를 사용합니다.");
          // API 실패 시 더미 데이터 사용
          setFeedbacks([
            {
              id: 1,
              content: "이번 주는 돈을 잘 관리했어요!",
              emotion: "좋음",
              advice: null,
              category: "WEEKLY",
              createdAt: "2024-01-21T00:00:00Z"
            }
          ]);
        }
      }
    } catch (error) {
      console.error("주간 피드백 목록 조회 실패", error);
      // 에러 발생 시에도 더미 데이터 표시
      setFeedbacks([
        {
          id: 1,
          content: "이번 주는 돈을 잘 관리했어요!",
          emotion: "좋음",
          advice: null,
          category: "WEEKLY",
          createdAt: "2024-01-21T00:00:00Z"
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const getEmotionIcon = (emotion: string) => {
    switch (emotion.trim()) {
      case '좋음':
      case '매우 좋음':
        return '😊';
      case '나쁨':
      case '매우 나쁨':
        return '😢';
      case '보통':
      default:
        return '😐';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getMonth() + 1}월 ${date.getDate()}일`;
  };

  return (
    <Container>
      <Header>
        <Title>주간 피드백 내역</Title>
        <Subtitle>주별 소비 트렌드를 확인하세요</Subtitle>
      </Header>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        <View style={{ paddingHorizontal: 20 }}>
          {loading ? (
            <Text style={{
              fontSize: 14,
              fontFamily: 'Pretendard-Regular',
              color: '#6B7684',
              textAlign: 'center',
              marginTop: 40
            }}>
              로딩 중...
            </Text>
          ) : feedbacks.length === 0 ? (
            <Text style={{
              fontSize: 14,
              fontFamily: 'Pretendard-Regular',
              color: '#6B7684',
              textAlign: 'center',
              marginTop: 40
            }}>
              아직 주간 피드백 내역이 없습니다.
            </Text>
          ) : (
            feedbacks.map((feedback) => (
              <MenuCard 
                key={feedback.id}
                onPress={() => navigation.navigate("ParentFeedbackDetailPage1", { feedback })}
                style={{ marginBottom: 12 }}
              >
                <View style={{ 
                  width: 44, 
                  height: 44, 
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginRight: 16
                }}>
                  <Text style={{ fontSize: 32 }}>{getEmotionIcon(feedback.emotion)}</Text>
                </View>
                <MenuTextContainer>
                  <Text style={{
                    fontSize: 13,
                    fontFamily: 'Pretendard-Regular',
                    color: '#6B7684',
                    marginBottom: 4
                  }}>
                    {formatDate(feedback.createdAt)}
                  </Text>
                  {/* emotion label already show via emoji; no amount info */}
                  <Text style={{
                    fontSize: 14,
                    fontFamily: 'Pretendard-Regular',
                    color: '#4E5968'
                  }}
                  numberOfLines={1}>
                    {feedback.content}
                  </Text>
                </MenuTextContainer>
                <Ionicons name="chevron-forward" size={20} color="#D1D6DB" />
              </MenuCard>
            ))
          )}
        </View>
      </ScrollView>
    </Container>
  );
} 