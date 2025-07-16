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

interface DailyFeedback {
  id: number;
  content: string;
  emotion: string;
  advice: string | null;
  category: "DAILY";
  createdAt: string;
}

export default function ParentDailyFeedbackScreen({ navigation }: { navigation: any }) {
  const [feedbacks, setFeedbacks] = useState<DailyFeedback[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchDailyFeedbacks = async () => {
      try {
        setLoading(true);
        const userId = await AsyncStorage.getItem("selectedChildId");
        if (!userId) {
          console.error("[ParentDailyFeedback] selectedChildId가 없습니다.");
          return;
        }
        
        const response = await api.get<DailyFeedback[]>(`/feedback/daily/${userId}`);
        setFeedbacks(response.data);
      } catch (error) {
        console.error("[ParentDailyFeedback] 매일 피드백 조회 실패", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDailyFeedbacks();
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
            <Title style={{ marginBottom: 4 }}>매일 피드백 내역</Title>
            <Subtitle>아이의 매일 피드백을 확인하세요.</Subtitle>
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
                매일 피드백을 불러오는 중...
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
                아직 매일 피드백이 없습니다.
              </Text>
            </View>
          ) : (
            feedbacks.map((feedback) => (
              <MenuCard 
                key={feedback.id}
                onPress={() => navigation.navigate("ParentFeedbackDetail", { feedback })}
              >
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