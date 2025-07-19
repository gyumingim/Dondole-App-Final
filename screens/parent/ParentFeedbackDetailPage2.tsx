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

export default function ParentFeedbackDetailPage2({ navigation, route }: { navigation: any; route: any }) {
  const { feedback } = route.params || {};

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

  const handleGoBack = () => {
    navigation.navigate('ParentDashboard');
  };

  return (
    <Container>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginRight: 16 }}>
            <Ionicons name="chevron-back" size={24} color="#333" />
          </TouchableOpacity>
          <View style={{ flex: 1 }}>
            <Title style={{ marginBottom: 4 }}>{getCategoryText(feedback?.category)}</Title>
            <Subtitle>{feedback ? formatDate(feedback.createdAt) : ""}</Subtitle>
          </View>
        </Header>

        <MenuContainer>
          <QuizContainer style={{ padding: 40, alignItems: 'center', justifyContent: 'center', minHeight: 400 }}>
            <Image 
              source={require("../../assets/advice.png")} 
              style={{ width: 80, height: 80, marginBottom: 32 }} 
              resizeMode="contain"
            />
            
            <Text style={{ 
              fontSize: 24, 
              fontWeight: '600', 
              textAlign: 'center',
              color: '#333',
              marginBottom: 24
            }}>
              조언
            </Text>
            
            <Text style={{ 
              fontSize: 16, 
              textAlign: 'center',
              color: '#666',
              lineHeight: 24,
              paddingHorizontal: 16
            }}>
              {feedback?.advice || "조언을 불러올 수 없습니다."}
            </Text>
          </QuizContainer>
        </MenuContainer>

        <View style={{ padding: 16, paddingBottom: 40 }}>
          <Button onPress={handleGoBack}>
            <Text style={{ color: '#fff', fontSize: 16, fontWeight: '600' }}>홈으로</Text>
          </Button>
        </View>

        <View style={{ alignItems: 'center', marginBottom: 20 }}>
          <Text style={{ color: '#999', fontSize: 12 }}>Developed by Oh yun chan</Text>
        </View>
      </ScrollView>
    </Container>
  );
} 