import React from "react";
import { Image, ScrollView } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  Container,
  Header,
  Title,
  Subtitle,
  Button,
  ButtonText,
  QuizContainer,
} from "@/components/Styled";

export default function QuizFeedbackScreen() {
  const navigation = useNavigation();
  const route = useRoute() as any;
  const { feedback, correctAnswer } = route.params ?? { feedback: "", correctAnswer: "" };

  return (
    <Container>
      <Header>
        <Title style={{ marginBottom: 4 }}>오답이에요:(</Title>
        <Subtitle>선택한 항목이 정답이 아니네요.</Subtitle>
      </Header>

      <QuizContainer>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1, alignItems: "center", justifyContent: "center" }}>
          <Image
            source={require("../assets/feedback_girl.png")}
            style={{ width: 180, height: 180, marginVertical: 20 }}
            resizeMode="contain"
          />

          <Title style={{ textAlign: "center", marginBottom: 8 }}>{correctAnswer}</Title>
          <Subtitle style={{ textAlign: "center", lineHeight: 20, paddingHorizontal: 24 }}>
            {feedback}
          </Subtitle>
        </ScrollView>
      </QuizContainer>

      <Button style={{ marginTop: 40 }} onPress={() => (navigation as any).navigate("Dashboard")}>
        <ButtonText>홈으로</ButtonText>
      </Button>
    </Container>
  );
} 