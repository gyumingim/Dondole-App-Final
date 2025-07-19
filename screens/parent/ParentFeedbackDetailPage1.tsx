import React from "react";
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

interface FeedbackDetail {
  id: number;
  content: string;
  emotion: string;
  advice: string | null;
  category: "DAILY" | "WEEKLY";
  createdAt: string;
}

export default function ParentFeedbackDetailPage1({ navigation, route }: { navigation: any; route: any }) {
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

  const getEmotionImage = (emotion: string) => {
    switch (emotion) {
      case "좋음":
      case "매우 좋음":
        return require("../../assets/happy.png");
      case "보통":
        return require("../../assets/soso.png");
      case "나쁨":
      case "매우 나쁨":
        return require("../../assets/sad.png");
      default:
        return require("../../assets/happy.png");
    }
  };

  const getCategoryText = (category: string) => {
    return category === "DAILY" ? "매일 피드백" : "주간 피드백";
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    
    return `${year}년 ${month}월 ${day}일`;
  };

  const handleNext = () => {
    if (feedback.advice) {
      navigation.navigate('ParentFeedbackDetailPage2', { feedback });
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
            <Title style={{ marginBottom: 4 }}>{getCategoryText(feedback.category)}</Title>
            <Subtitle>{formatDate(feedback.createdAt)}</Subtitle>
          </View>
        </Header>

        <MenuContainer>
          <QuizContainer style={{ padding: 40, alignItems: 'center', justifyContent: 'center', minHeight: 400 }}>
            <Image 
              source={getEmotionImage(feedback.emotion)} 
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
              {feedback.emotion}
            </Text>
            
            <Text style={{ 
              fontSize: 14, 
              fontWeight: '400', 
              textAlign: 'center',
              color: '#333',
              lineHeight: 28,
              paddingHorizontal: 16
            }}>
              {feedback.content}
            </Text>
          </QuizContainer>
        </MenuContainer>

        <View style={{ padding: 16, paddingBottom: 40 }}>
          {feedback.advice ? (
            <Button onPress={handleNext}>
              <Text style={{ color: '#fff', fontSize: 16, fontWeight: '600' }}>다음으로</Text>
            </Button>
          ) : (
            <Button onPress={() => navigation.goBack()}>
              <Text style={{ color: '#fff', fontSize: 16, fontWeight: '600' }}>돌아가기</Text>
            </Button>
          )}
        </View>

        <View style={{ alignItems: 'center', marginBottom: 20 }}>
          <Text style={{ color: '#999', fontSize: 12 }}>Developed by Oh yun chan</Text>
        </View>
      </ScrollView>
    </Container>
  );
} 