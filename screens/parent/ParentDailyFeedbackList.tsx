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

interface Feedback {
  id: number;
  date: string;
  emotion: string;
  feedback: string;
  totalExpense: number;
}

export default function ParentDailyFeedbackList({ navigation }: { navigation: any }) {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const fetchFeedbacks = async () => {
    try {
      const selectedChildId = await AsyncStorage.getItem("selectedChildId");
      if (selectedChildId) {
        try {
          const response = await api.get(`/feedback/daily/${selectedChildId}`);
          setFeedbacks(response.data);
        } catch (apiError) {
          console.log("API에서 데이터를 가져올 수 없어 더미 데이터를 사용합니다.");
          // API 실패 시 더미 데이터 사용
          setFeedbacks([
            {
              id: 1,
              date: "2024-01-20",
              emotion: "happy",
              feedback: "오늘은 계획적으로 소비했어요!",
              totalExpense: 15000
            },
            {
              id: 2,
              date: "2024-01-19",
              emotion: "soso",
              feedback: "조금 아쉬운 하루였어요.",
              totalExpense: 23000
            },
            {
              id: 3,
              date: "2024-01-18",
              emotion: "sad",
              feedback: "충동구매가 있었어요.",
              totalExpense: 35000
            },
            {
              id: 4,
              date: "2024-01-17",
              emotion: "happy",
              feedback: "용돈을 잘 관리했어요.",
              totalExpense: 12000
            },
            {
              id: 5,
              date: "2024-01-16",
              emotion: "soso",
              feedback: "보통인 하루였어요.",
              totalExpense: 18000
            }
          ]);
        }
      }
    } catch (error) {
      console.error("피드백 목록 조회 실패", error);
      // 에러 발생 시에도 더미 데이터 표시
      setFeedbacks([
        {
          id: 1,
          date: "2024-01-20",
          emotion: "happy",
          feedback: "오늘은 계획적으로 소비했어요!",
          totalExpense: 15000
        },
        {
          id: 2,
          date: "2024-01-19",
          emotion: "soso",
          feedback: "조금 아쉬운 하루였어요.",
          totalExpense: 23000
        },
        {
          id: 3,
          date: "2024-01-18",
          emotion: "sad",
          feedback: "충동구매가 있었어요.",
          totalExpense: 35000
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const getEmotionIcon = (emotion: string) => {
    switch (emotion) {
      case 'happy':
        return '😊';
      case 'soso':
        return '😐';
      case 'sad':
        return '😢';
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
        <Title>일일 피드백 내역</Title>
        <Subtitle>날짜별 피드백을 확인하세요</Subtitle>
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
              아직 피드백 내역이 없습니다.
            </Text>
          ) : (
            feedbacks.map((feedback) => (
              <MenuCard 
                key={feedback.id}
                onPress={() => navigation.navigate("ParentFeedbackDetailPage1", { 
                  feedbackData: feedback,
                  isDaily: true 
                })}
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
                  <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
                    <Text style={{
                      fontSize: 16,
                      fontFamily: 'Pretendard-Medium',
                      color: '#191F28',
                      marginRight: 8
                    }}>
                      {formatDate(feedback.date)}
                    </Text>
                    <Text style={{
                      fontSize: 14,
                      fontFamily: 'Pretendard-Regular',
                      color: '#6B7684'
                    }}>
                      {(feedback.totalExpense || 0).toLocaleString()}원
                    </Text>
                  </View>
                  <Text style={{
                    fontSize: 14,
                    fontFamily: 'Pretendard-Regular',
                    color: '#4E5968'
                  }}
                  numberOfLines={1}>
                    {feedback.feedback}
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