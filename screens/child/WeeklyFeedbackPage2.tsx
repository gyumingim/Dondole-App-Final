import React from "react";
import { ScrollView, View, Text, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  Container,
  Header,
  Title,
  Subtitle,
  Button,
  ButtonText,
} from "../../components/Styled";

export default function WeeklyFeedbackPage2({ navigation, route }: { navigation: any; route: any }) {
  const { feedbackData } = route.params || {};

  const handleGoHome = () => {
    navigation.navigate('ChildDashboard');
  };

  return (
    <Container style={{ backgroundColor: "#FFFFFF" }}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
        {/* 헤더 */}
        <Header style={{ flexDirection: "row", alignItems: "center", marginBottom: 16 }}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginRight: 16 }}>
            <Ionicons name="chevron-back" size={24} color="#333" />
          </TouchableOpacity>
          <View>
            <Title>주간 피드백</Title>
            <Subtitle>조언을 확인해 보세요.</Subtitle>
          </View>
        </Header>

        <View
          style={{
            backgroundColor: "#FFFFFF",
            borderRadius: 24,
            padding: 40,
            margin: 20,
            alignItems: "center",
            shadowColor: "#000",
            shadowOpacity: 0.1,
            shadowRadius: 8,
            elevation: 2,
          }}
        >
          {/* 아이콘 */}
          <Image
            source={require("../../assets/advice.png")}
            style={{ width: 80, height: 80, marginBottom: 16 }}
            resizeMode="contain"
          />

          <Text
            style={{
              fontSize: 20,
              fontFamily: "Pretendard-Bold",
              color: "#191F28",
              marginBottom: 20,
              textAlign: "center",
            }}
          >
            조언
          </Text>

          {(feedbackData?.advice || "계획적인 소비를 유지해 보세요!")
            .split("\n")
            .map((line: string, idx: number) => (
              <Text
                key={idx}
                style={{
                  fontSize: 14,
                  fontFamily: "Pretendard-Regular",
                  color: "#6B7684",
                  textAlign: "center",
                  lineHeight: 20,
                  marginBottom: 8,
                }}
              >
                {line.trim()}
              </Text>
            ))}
        </View>

        <Button onPress={handleGoHome} style={{ margin: 20, marginTop: 0 }}>
          <ButtonText>홈으로</ButtonText>
        </Button>
      </ScrollView>
    </Container>
  );
} 