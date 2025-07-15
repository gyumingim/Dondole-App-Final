import React from "react";
import { Image, ScrollView, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  Container,
  Header,
  Title,
  Subtitle,
  Button,
  ButtonText,
  QuizContainer,
} from "../../components/Styled";

export default function ParentQuizFeedbackScreen({ navigation, route }: { navigation: any; route: any }) {
  const { quiz, correctAnswer } = route.params || {};

  const feedbackText = "돈을내리고이제쇼핑한것처럼 감정이 나온대체거기서 가명으로 나는 해시영 돈 좋아하는 않은감정인지 고치";

  return (
    <Container>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginRight: 16 }}>
            <Ionicons name="chevron-back" size={24} color="#333" />
          </TouchableOpacity>
          <View style={{ flex: 1 }}>
            <Title style={{ marginBottom: 4 }}>오답이에요:(</Title>
            <Subtitle>선택한 답안이 틀렸네요.</Subtitle>
          </View>
        </Header>

        <QuizContainer>
          <ScrollView 
            showsVerticalScrollIndicator={false} 
            contentContainerStyle={{ 
              flexGrow: 1, 
              alignItems: "center", 
              justifyContent: "center",
              paddingVertical: 20 
            }}
          >
            <Image
              source={require("../../assets/feedback_girl.png")}
              style={{ width: 180, height: 180, marginVertical: 20 }}
              resizeMode="contain"
            />

            <Title style={{ 
              textAlign: "center", 
              marginBottom: 16, 
              fontSize: 18,
              fontWeight: 'bold'
            }}>
              {correctAnswer}
            </Title>
            
            <Subtitle style={{ 
              textAlign: "center", 
              lineHeight: 20, 
              paddingHorizontal: 24,
              color: '#666'
            }}>
              {feedbackText}
            </Subtitle>
          </ScrollView>
        </QuizContainer>

        <Button onPress={() => navigation.navigate("ParentQuizHistory")} style={{ marginTop: 20 }}>
          <ButtonText>좋으요</ButtonText>
        </Button>
      </ScrollView>
    </Container>
  );
} 