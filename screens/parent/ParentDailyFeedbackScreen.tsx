import React, { useState, useEffect } from "react";
import { ScrollView, TouchableOpacity, View, Text, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Container,
  Header,
  Title,
  Subtitle,
  MenuContainer,
  QuizContainer,
  Button,
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
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchDailyFeedback = async () => {
      try {
        setLoading(true);
        
        // AsyncStorage에서 selectedChildId 가져오기
        const selectedChildId = await AsyncStorage.getItem("selectedChildId");
        if (!selectedChildId) {
          console.error("선택된 자녀 ID가 없습니다.");
          setFeedbacks([]); // 기존 코드에서는 빈 배열로 설정
          return;
        }
        
        const response = await api.get<DailyFeedback[]>(`/feedback/daily/${selectedChildId}`);
        setFeedbacks(response.data);
      } catch (error) {
        console.error("[ParentDailyFeedback] 매일 피드백 조회 실패", error);
        setFeedbacks([]); // 기존 코드에서는 빈 배열로 설정
      } finally {
        setLoading(false);
      }
    };
    fetchDailyFeedback();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getMonth() + 1}월 ${date.getDate()}일`;
  };

  const getEmotionImage = (emotion: string) => {
    switch (emotion) {
      case "좋음":
        return require("../../assets/happy.png");
      case "보통":
        return require("../../assets/soso.png");
      case "나쁨":
        return require("../../assets/sad.png");
      default:
        return require("../../assets/happy.png");
    }
  };

  const handleNext = () => {
    if (currentIndex < feedbacks.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const currentFeedback = feedbacks[currentIndex];

  return (
    <Container>
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={{ paddingBottom: 20 }}
      >
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
          <QuizContainer style={{ padding: 40, alignItems: 'center', justifyContent: 'center', minHeight: 400 }}>
            {loading ? (
              <Text style={{ fontSize: 18, color: '#666' }}>피드백을 불러오는 중...</Text>
            ) : feedbacks.length === 0 ? (
              <Text style={{ fontSize: 18, color: '#666' }}>아직 매일 피드백이 없습니다.</Text>
            ) : currentFeedback ? (
              <>
                <Image 
                  source={getEmotionImage(currentFeedback.emotion)} 
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
                  {currentFeedback.emotion}
                </Text>

                <Text style={{ 
                  fontSize: 14, 
                  color: '#999',
                  marginBottom: 16
                }}>
                  {formatDate(currentFeedback.createdAt)}
                </Text>
                
                <Text style={{ 
                  fontSize: 16, 
                  fontWeight: '400', 
                  textAlign: 'center',
                  color: '#333',
                  lineHeight: 28,
                  marginBottom: 24
                }}>
                  {currentFeedback.content}
                </Text>

                {currentFeedback.advice && (
                  <View style={{
                    backgroundColor: '#E3F2FD',
                    padding: 16,
                    borderRadius: 12,
                    width: '100%'
                  }}>
                    <Text style={{ 
                      fontSize: 14, 
                      color: '#1976D2',
                      textAlign: 'center',
                      lineHeight: 22
                    }}>
                      💡 {currentFeedback.advice}
                    </Text>
                  </View>
                )}
              </>
            ) : null}
          </QuizContainer>
        </MenuContainer>

        {feedbacks.length > 0 && !loading && (
          <>
            <View style={{ 
              flexDirection: 'row', 
              justifyContent: 'center',
              alignItems: 'center',
              paddingVertical: 16,
              gap: 24
            }}>
              <TouchableOpacity 
                onPress={handlePrev}
                disabled={currentIndex === 0}
                style={{ opacity: currentIndex === 0 ? 0.3 : 1 }}
              >
                <Ionicons name="chevron-back-circle" size={36} color="#007BFF" />
              </TouchableOpacity>
              
              <Text style={{ 
                fontSize: 14, 
                color: '#666' 
              }}>
                {currentIndex + 1} / {feedbacks.length}
              </Text>
              
              <TouchableOpacity 
                onPress={handleNext}
                disabled={currentIndex === feedbacks.length - 1}
                style={{ opacity: currentIndex === feedbacks.length - 1 ? 0.3 : 1 }}
              >
                <Ionicons name="chevron-forward-circle" size={36} color="#007BFF" />
              </TouchableOpacity>
            </View>

            <View style={{ padding: 16, paddingBottom: 40 }}>
              <Button onPress={() => navigation.navigate("ParentFeedbackDetailPage1", { feedback: currentFeedback })}>
                <Text style={{ color: '#fff', fontSize: 16, fontWeight: '600' }}>상세 보기</Text>
              </Button>
            </View>
          </>
        )}

        <View style={{ alignItems: 'center', marginBottom: 20 }}>
          <Text style={{ color: '#999', fontSize: 12 }}>Developed by Oh yun chan</Text>
        </View>
      </ScrollView>
    </Container>
  );
} 