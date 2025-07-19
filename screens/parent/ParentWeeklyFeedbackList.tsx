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
  weekStartDate: string;
  weekEndDate: string;
  overallEmotion: string;
  feedback: string;
  totalExpense: number;
  averageDaily: number;
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
          const response = await api.get(`/feedback/weekly/${selectedChildId}`);
          setFeedbacks(response.data);
        } catch (apiError) {
          console.log("API에서 데이터를 가져올 수 없어 더미 데이터를 사용합니다.");
          // API 실패 시 더미 데이터 사용
          setFeedbacks([
            {
              id: 1,
              weekStartDate: "2024-01-15",
              weekEndDate: "2024-01-21",
              overallEmotion: "happy",
              feedback: "이번 주는 계획적으로 잘 사용했어요!",
              totalExpense: 105000,
              averageDaily: 15000
            },
            {
              id: 2,
              weekStartDate: "2024-01-08",
              weekEndDate: "2024-01-14",
              overallEmotion: "soso",
              feedback: "조금 더 절약할 수 있을 것 같아요.",
              totalExpense: 140000,
              averageDaily: 20000
            },
            {
              id: 3,
              weekStartDate: "2024-01-01",
              weekEndDate: "2024-01-07",
              overallEmotion: "sad",
              feedback: "충동구매가 많았던 한 주였어요.",
              totalExpense: 210000,
              averageDaily: 30000
            },
            {
              id: 4,
              weekStartDate: "2023-12-25",
              weekEndDate: "2023-12-31",
              overallEmotion: "happy",
              feedback: "연말을 알차게 보냈어요.",
              totalExpense: 95000,
              averageDaily: 13500
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
          weekStartDate: "2024-01-15",
          weekEndDate: "2024-01-21",
          overallEmotion: "happy",
          feedback: "이번 주는 계획적으로 잘 사용했어요!",
          totalExpense: 105000,
          averageDaily: 15000
        },
        {
          id: 2,
          weekStartDate: "2024-01-08",
          weekEndDate: "2024-01-14",
          overallEmotion: "soso",
          feedback: "조금 더 절약할 수 있을 것 같아요.",
          totalExpense: 140000,
          averageDaily: 20000
        },
        {
          id: 3,
          weekStartDate: "2024-01-01",
          weekEndDate: "2024-01-07",
          overallEmotion: "sad",
          feedback: "충동구매가 많았던 한 주였어요.",
          totalExpense: 210000,
          averageDaily: 30000
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

  const formatWeekRange = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    return `${start.getMonth() + 1}월 ${start.getDate()}일 - ${end.getMonth() + 1}월 ${end.getDate()}일`;
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
                onPress={() => navigation.navigate("ParentFeedbackDetailPage1", { 
                  feedbackData: feedback,
                  isDaily: false 
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
                  <Text style={{ fontSize: 32 }}>{getEmotionIcon(feedback.overallEmotion)}</Text>
                </View>
                <MenuTextContainer>
                  <Text style={{
                    fontSize: 13,
                    fontFamily: 'Pretendard-Regular',
                    color: '#6B7684',
                    marginBottom: 4
                  }}>
                    {formatWeekRange(feedback.weekStartDate, feedback.weekEndDate)}
                  </Text>
                  <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
                    <Text style={{
                      fontSize: 16,
                      fontFamily: 'Pretendard-Medium',
                      color: '#191F28',
                      marginRight: 8
                    }}>
                      총 {(feedback.totalExpense || 0).toLocaleString()}원
                    </Text>
                    <Text style={{
                      fontSize: 14,
                      fontFamily: 'Pretendard-Regular',
                      color: '#6B7684'
                    }}>
                      일평균 {(feedback.averageDaily || 0).toLocaleString()}원
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