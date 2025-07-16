import React from "react";
import { ScrollView, TouchableOpacity, View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
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

interface FeedbackDetail {
  id: number;
  content: string;
  emotion: string;
  advice: string | null;
  category: "DAILY" | "WEEKLY";
  createdAt: string;
}

export default function ParentFeedbackDetailScreen({ navigation, route }: { navigation: any; route: any }) {
  const { feedback } = route.params || {};

  if (!feedback) {
    return (
      <Container>
        <Header style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginRight: 16 }}>
            <Ionicons name="chevron-back" size={24} color="#333" />
          </TouchableOpacity>
          <View style={{ flex: 1 }}>
            <Title>피드백을 찾을 수 없습니다.</Title>
          </View>
        </Header>
      </Container>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    
    return `${year}년 ${month}월 ${day}일 ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
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

  const getEmotionIcon = (emotion: string) => {
    switch (emotion) {
      case "좋음":
        return "happy-outline";
      case "보통":
        return "remove-circle-outline";
      case "나쁨":
        return "sad-outline";
      default:
        return "help-circle-outline";
    }
  };

  const getCategoryText = (category: string) => {
    return category === "DAILY" ? "매일 피드백" : "주간 피드백";
  };

  return (
    <Container>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginRight: 16 }}>
            <Ionicons name="chevron-back" size={24} color="#333" />
          </TouchableOpacity>
          <View style={{ flex: 1 }}>
            <Title style={{ marginBottom: 4 }}>피드백 상세보기</Title>
            <Subtitle>{getCategoryText(feedback.category)}</Subtitle>
          </View>
        </Header>

        <MenuContainer>
          {/* 감정 표시 */}
          <MenuCard style={{ marginBottom: 16 }}>
            <View style={{ 
              flexDirection: 'row', 
              alignItems: 'center', 
              justifyContent: 'center',
              paddingVertical: 20 
            }}>
              <View style={{
                backgroundColor: getEmotionColor(feedback.emotion),
                padding: 16,
                borderRadius: 50,
                marginRight: 16
              }}>
                <Ionicons 
                  name={getEmotionIcon(feedback.emotion)} 
                  size={32} 
                  color="#fff" 
                />
              </View>
              <View>
                <Text style={{ 
                  fontSize: 24, 
                  fontWeight: 'bold', 
                  color: getEmotionColor(feedback.emotion),
                  marginBottom: 4
                }}>
                  {feedback.emotion}
                </Text>
                <Text style={{ 
                  fontSize: 14, 
                  color: '#666' 
                }}>
                  {formatDate(feedback.createdAt)}
                </Text>
              </View>
            </View>
          </MenuCard>

          {/* 피드백 내용 */}
          <MenuCard style={{ marginBottom: 16 }}>
            <MenuTextContainer>
              <MenuTitle style={{ marginBottom: 12, color: '#333' }}>
                피드백 내용
              </MenuTitle>
              <Text style={{
                fontSize: 16,
                lineHeight: 24,
                color: '#444',
                backgroundColor: '#f8f9fa',
                padding: 16,
                borderRadius: 8,
                borderLeftWidth: 4,
                borderLeftColor: getEmotionColor(feedback.emotion)
              }}>
                {feedback.content}
              </Text>
            </MenuTextContainer>
          </MenuCard>

          {/* 조언 (있는 경우에만) */}
          {feedback.advice && (
            <MenuCard>
              <MenuTextContainer>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
                  <Ionicons name="bulb-outline" size={20} color="#007BFF" style={{ marginRight: 8 }} />
                  <MenuTitle style={{ color: '#007BFF' }}>
                    조언
                  </MenuTitle>
                </View>
                <Text style={{
                  fontSize: 16,
                  lineHeight: 24,
                  color: '#007BFF',
                  backgroundColor: '#e3f2fd',
                  padding: 16,
                  borderRadius: 8,
                  fontStyle: 'italic'
                }}>
                  {feedback.advice}
                </Text>
              </MenuTextContainer>
            </MenuCard>
          )}
        </MenuContainer>
      </ScrollView>
    </Container>
  );
} 