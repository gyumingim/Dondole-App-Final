import React, { useState, useEffect } from "react";
import { ScrollView, View, Text, TouchableOpacity, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Container,
  Header,
  Title,
  Subtitle,
  OptionsContainer,
  OptionCard,
  OptionTitle,
  OptionDescription,
  Emoji,
  Button,
  ButtonText,
} from "../../components/Styled";
import { api } from "../../utils/api";

export default function DailyFeedbackPage1() {
  const navigation = useNavigation();
  const [selectedEmotion, setSelectedEmotion] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const emotions = [
    { key: "happy", emoji: require("../../assets/happy.png"), title: "좋아요", description: "오늘 하루 기분이 좋았어요" },
    { key: "soso", emoji: require("../../assets/soso.png"), title: "그저 그래요", description: "평범한 하루였어요" },
    { key: "sad", emoji: require("../../assets/sad.png"), title: "아쉬워요", description: "조금 아쉬운 하루였어요" },
  ];

  const handleSubmit = async () => {
    if (!selectedEmotion) {
      Alert.alert("감정을 선택해주세요", "오늘의 기분을 먼저 선택해주세요.");
      return;
    }

    try {
      setLoading(true);
      
      // AsyncStorage에서 userId 가져오기
      const userId = await AsyncStorage.getItem("userId");
      if (!userId) {
        Alert.alert("오류", "사용자 정보를 찾을 수 없습니다.");
        return;
      }
      
      const response = await api.post(`/feedback/daily/${userId}`, {
        emotion: selectedEmotion
      });
      
      if (response.status === 200) {
        (navigation as any).navigate("DailyFeedbackPage2", { 
          emotion: selectedEmotion,
          feedbackData: response.data 
        });
      }
    } catch (error) {
      console.error("피드백 제출 실패:", error);
      Alert.alert("오류", "피드백 제출에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        <Header>
          <Title>오늘 하루 어땠나요?</Title>
          <Subtitle>솔직한 마음을 들려주세요</Subtitle>
        </Header>

        <OptionsContainer>
          {emotions.map((emotion) => (
            <OptionCard
              key={emotion.key}
              onPress={() => setSelectedEmotion(emotion.key)}
              style={{
                borderWidth: 2,
                borderColor: selectedEmotion === emotion.key ? "#3182F6" : "transparent",
                backgroundColor: selectedEmotion === emotion.key ? "#F0F7FF" : "#FFFFFF"
              }}
            >
              <Emoji source={emotion.emoji} />
              <View style={{ flex: 1, marginLeft: 16 }}>
                <OptionTitle>{emotion.title}</OptionTitle>
                <OptionDescription>{emotion.description}</OptionDescription>
              </View>
              {selectedEmotion === emotion.key && (
                <Ionicons name="checkmark-circle" size={24} color="#3182F6" />
              )}
            </OptionCard>
          ))}
        </OptionsContainer>

        <Button 
          onPress={handleSubmit}
          disabled={!selectedEmotion || loading}
          style={{ opacity: (!selectedEmotion || loading) ? 0.5 : 1 }}
        >
          <ButtonText>{loading ? "제출 중..." : "다음으로"}</ButtonText>
        </Button>
      </ScrollView>
    </Container>
  );
} 