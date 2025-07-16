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

interface WeeklyFeedback {
  id: number;
  content: string;
  emotion: string;
  advice: string | null;
  category: "WEEKLY";
  createdAt: string;
}

export default function ParentWeeklyFeedbackScreen({ navigation }: { navigation: any }) {
  const [feedbacks, setFeedbacks] = useState<WeeklyFeedback[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchWeeklyFeedbacks = async () => {
      try {
        setLoading(true);
        const userId = await AsyncStorage.getItem("selectedChildId");
        if (!userId) {
          console.error("[ParentWeeklyFeedback] selectedChildId가 없습니다.");
          return;
        }
        
        const response = await api.get<WeeklyFeedback[]>(`/feedback/weekly/${userId}`);
        setFeedbacks(response.data);
      } catch (error) {
        console.error("[ParentWeeklyFeedback] 주간 피드백 조회 실패", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWeeklyFeedbacks();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getMonth() + 1}월 ${date.getDate()}일`;
  };

  const getEmotionColor = (emotion: string) => {
    switch (emotion) {
      case "좋음":
        return "#4CAF50";
      case "보통":
        return "#FF9800";
      case "나쁨":
        return "#F44336";
      default:
        return "#9E9E9E";
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
            <Title style={{ marginBottom: 4 }}>주간 피드백 내역</Title>
            <Subtitle>아이의 주간 피드백을 확인하세요.</Subtitle>
          </View>
        </Header>

        <MenuContainer>
          {loading ? (
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
                주간 피드백을 불러오는 중...
              </Text>
            </View>
          ) : feedbacks.length === 0 ? (
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
                아직 주간 피드백이 없습니다.
              </Text>
            </View>
          ) : (
            feedbacks.map((feedback) => (
              <MenuCard key={feedback.id}>
                <MenuTextContainer style={{ flex: 1 }}>
                  <MenuTitle style={{ marginBottom: 8 }}>{feedback.content}</MenuTitle>
                  <MenuDescription style={{ marginBottom: 8 }}>
                    {formatDate(feedback.createdAt)}
                  </MenuDescription>
                  {feedback.advice && (
                    <MenuDescription style={{ 
                      fontStyle: 'italic', 
                      color: '#007BFF',
                      marginTop: 4 
                    }}>
                      조언: {feedback.advice}
                    </MenuDescription>
                  )}
                </MenuTextContainer>
                <View style={{ 
                  backgroundColor: getEmotionColor(feedback.emotion),
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
                    {feedback.emotion}
                  </Text>
                </View>
              </MenuCard>
            ))
          )}
        </MenuContainer>
      </ScrollView>
    </Container>
  );
} 