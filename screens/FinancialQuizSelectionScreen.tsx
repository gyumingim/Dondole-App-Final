import React, { useState, useEffect } from "react";
import { ScrollView, View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { Ionicons, MaterialCommunityIcons, FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Container,
  Header,
  Title,
  Subtitle,
  MenuContainer,
  MenuCard,
  MenuIconContainer,
  MenuTextContainer,
  MenuTitle,
  MenuDescription,
} from "../components/Styled";
import { fetchQuizzes, api } from "../utils/api";

interface Quiz {
  id: number;
  question: string;
  choice1: string;
  choice2: string;
  choice3: string;
  choice4: string;
  answer: number;
  feedback?: string;
}

export default function FinancialQuizSelectionScreen() {
  const navigation = useNavigation();
  const [allQuizzes, setAllQuizzes] = useState<Quiz[]>([]);
  const [solvedQuizIds, setSolvedQuizIds] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadQuizzes();
  }, []);

  const loadQuizzes = async () => {
    try {
      setLoading(true);
      
      // 푼 퀴즈 ID 목록 가져오기
      const solvedIds = await AsyncStorage.getItem("solvedQuizIds");
      const parsedSolvedIds = solvedIds ? JSON.parse(solvedIds) : [];
      setSolvedQuizIds(parsedSolvedIds);

      // 전체 퀴즈 가져오기
      const quizzes = await fetchQuizzes();
      
      // 최신 10개 퀴즈 표시 (풀었든 안 풀었든)
      const recentQuizzes = quizzes
        .sort((a, b) => b.id - a.id)
        .slice(0, 10);

      setAllQuizzes(recentQuizzes);

      // 풀지 않은 퀴즈가 5개 미만이면 새로운 퀴즈 생성 요청
      const availableQuizzes = recentQuizzes.filter(
        quiz => !parsedSolvedIds.includes(quiz.id)
      );

      if (availableQuizzes.length < 3) {
        await api.post("/ai/quiz", {});
      }
    } catch (error) {
      console.error("퀴즈 로드 실패:", error);
    } finally {
      setLoading(false);
    }
  };

  const getQuizIcon = (index: number) => {
    const icons = [
      { name: "calculator", color: "#3182F6", library: "FontAwesome5" },
      { name: "piggy-bank", color: "#00C896", library: "FontAwesome5" },
      { name: "shopping-bag", color: "#FFB800", library: "FontAwesome5" },
      { name: "wallet", color: "#9C27B0", library: "FontAwesome5" },
      { name: "chart-line", color: "#FF5A5F", library: "FontAwesome5" },
      { name: "university", color: "#795548", library: "FontAwesome5" },
      { name: "credit-card", color: "#607D8B", library: "FontAwesome5" },
      { name: "coins", color: "#FF9800", library: "FontAwesome5" },
      { name: "money-bill-wave", color: "#4CAF50", library: "FontAwesome5" },
      { name: "hand-holding-usd", color: "#E91E63", library: "FontAwesome5" },
    ];
    return icons[index % icons.length];
  };

  const handleQuizPress = (quiz: Quiz) => {
    const isSolved = solvedQuizIds.includes(quiz.id);
    if (isSolved) {
      // 이미 푼 퀴즈는 결과 보기 또는 다시 풀기 옵션 제공
      return;
    } else {
      // 새 퀴즈 풀기
      (navigation as any).navigate("FinancialQuiz", { quizId: quiz.id });
    }
  };

  if (loading) {
    return (
      <Container>
        <Header>
          <Title style={{ marginBottom: 4 }}>오늘의 금융 퀴즈 🎯</Title>
          <Subtitle>풀고 싶은 퀴즈를 선택해보세요!</Subtitle>
        </Header>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#3182F6" />
          <Text style={{ marginTop: 16, color: '#6B7684' }}>퀴즈를 불러오는 중...</Text>
        </View>
      </Container>
    );
  }

  const availableQuizzes = allQuizzes.filter(quiz => !solvedQuizIds.includes(quiz.id));

  return (
    <Container>
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        <Header>
          <Title style={{ marginBottom: 4 }}>오늘의 금융 퀴즈 🎯</Title>
          <Subtitle>풀고 싶은 퀴즈를 선택해보세요!</Subtitle>
        </Header>

        <MenuContainer>
          <View style={{ 
            backgroundColor: '#E3F2FD',
            padding: 16,
            borderRadius: 12,
            marginBottom: 20
          }}>
            <Text style={{
              fontSize: 14,
              fontFamily: 'Pretendard-Medium',
              color: '#1976D2',
              textAlign: 'center',
              lineHeight: 22
            }}>
              💡 풀 수 있는 퀴즈: {availableQuizzes.length}개 | 완료: {solvedQuizIds.length}개
            </Text>
          </View>

          {allQuizzes.map((quiz, index) => {
            const icon = getQuizIcon(index);
            const isSolved = solvedQuizIds.includes(quiz.id);

            return (
              <MenuCard 
                key={quiz.id}
                onPress={() => handleQuizPress(quiz)}
                style={{ 
                  marginBottom: 16,
                  opacity: isSolved ? 0.7 : 1,
                  backgroundColor: isSolved ? '#F9FAFB' : '#FFFFFF'
                }}
              >
                <MenuIconContainer style={{ 
                  backgroundColor: isSolved ? '#E5E8EB' : `${icon.color}15`
                }}>
                  {isSolved ? (
                    <FontAwesome5 name="check-circle" size={20} color="#00C896" solid />
                  ) : (
                    <FontAwesome5 name={icon.name as any} size={18} color={icon.color} />
                  )}
                </MenuIconContainer>
                <MenuTextContainer style={{ flex: 1 }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
                    <MenuTitle style={{ 
                      flex: 1,
                      color: isSolved ? '#8B95A1' : '#191F28'
                    }}>
                      퀴즈 #{index + 1} {isSolved && '✓'}
                    </MenuTitle>
                    {isSolved && (
                      <View style={{
                        backgroundColor: '#E8F5E9',
                        paddingHorizontal: 8,
                        paddingVertical: 4,
                        borderRadius: 6
                      }}>
                        <Text style={{
                          fontSize: 12,
                          fontFamily: 'Pretendard-Medium',
                          color: '#00C896'
                        }}>
                          완료
                        </Text>
                      </View>
                    )}
                  </View>
                  <MenuDescription 
                    numberOfLines={2}
                    style={{ color: isSolved ? '#B0B8C1' : '#4E5968' }}
                  >
                    {quiz.question}
                  </MenuDescription>
                </MenuTextContainer>
                {!isSolved && (
                  <FontAwesome5 name="chevron-right" size={16} color="#B0B8C1" />
                )}
              </MenuCard>
            );
          })}

          {availableQuizzes.length === 0 && (
            <View style={{ 
              padding: 24,
              alignItems: 'center',
              backgroundColor: '#F9FAFB',
              borderRadius: 12,
              marginTop: 20
            }}>
              <Text style={{ 
                fontSize: 16, 
                fontFamily: 'Pretendard-Medium',
                color: '#333D4B',
                marginBottom: 8
              }}>
                모든 퀴즈를 완료했어요! 🎉
              </Text>
              <Text style={{ 
                fontSize: 14, 
                fontFamily: 'Pretendard-Regular',
                color: '#6B7684',
                textAlign: 'center'
              }}>
                새로운 퀴즈가 곧 추가될 예정입니다.
              </Text>
            </View>
          )}
        </MenuContainer>

        <View style={{ paddingHorizontal: 24, marginTop: 24 }}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 16,
              backgroundColor: '#F2F4F6',
              borderRadius: 12
            }}
          >
            <FontAwesome5 name="arrow-left" size={16} color="#6B7684" style={{ marginRight: 8 }} />
            <Text style={{
              fontSize: 16,
              fontFamily: 'Pretendard-Medium',
              color: '#6B7684'
            }}>
              돌아가기
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </Container>
  );
} 