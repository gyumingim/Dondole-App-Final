import React, { useState } from "react";
import { Alert } from "react-native";
import { api, getStoredToken } from "@/utils/api";
import { Ionicons } from "@expo/vector-icons";
import { View, ScrollView } from "react-native";
import {
  Container,
  Header,
  Title,
  Form,
  InputContainer,
  Label,
  Input,
  Button,
  ButtonText
} from "@/components/Styled";

interface Props {
  navigation: any;
}

const ExpenseRegistrationScreen: React.FC<Props> = ({ navigation }) => {
  const [expenseName, setExpenseName] = useState("");
  const [expenseAmount, setExpenseAmount] = useState("");
  const [expenseEmotion, setExpenseEmotion] = useState<string>("");
  const [expenseThought, setExpenseThought] = useState("");

  async function handleRegister() {
    if (!expenseName || !expenseAmount) {
      Alert.alert("필수 입력", "지출 내용과 금액을 입력해주세요.");
      return;
    }
    const payload = {
      content: expenseName,
      price: Number(expenseAmount) || 0,
      emotion: Number(expenseEmotion) || 0,
      thought: expenseThought,
      date: new Date().toISOString(),
    };
    try {
      const token = await getStoredToken();
      await api.post("/variables", payload, {
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      });
      navigation.navigate("TodayCalendar");
    } catch (err) {
      console.error("[RegisterVariable] 실패", err);
      Alert.alert("오류", "지출 등록에 실패했습니다.");
    }
  }

  return (
    <Container>
      <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled" contentContainerStyle={{paddingBottom: 20}}>
        <Header>
          <Title>오늘의 소비 등록</Title>
        </Header>

        <Form>
          <InputContainer>
            <Label>지출 내용</Label>
            <Input
              placeholder="지출 내용을 입력해주세요. ex) 햄버거"
              value={expenseName}
              onChangeText={setExpenseName}
            />
          </InputContainer>

          <InputContainer>
            <Label>예상 금액</Label>
            <Input
              placeholder="필요한 예상 금액을 입력주세요. ex) 10000"
              value={expenseAmount}
              onChangeText={setExpenseAmount}
              keyboardType="numeric"
            />
          </InputContainer>

          <InputContainer>
            <Label>느낀 감정 (선택)</Label>
            <Input
              placeholder="어떤 기분이었나요? ex) 행복"
              value={expenseEmotion}
              onChangeText={setExpenseEmotion}
            />
          </InputContainer>

          <InputContainer>
            <Label>생각/메모 (선택)</Label>
            <Input
              placeholder="간단한 메모를 남겨보세요."
              value={expenseThought}
              onChangeText={setExpenseThought}
            />
          </InputContainer>
        </Form>
      </ScrollView>

      <Button onPress={handleRegister}>
        <ButtonText>지출 등록하기</ButtonText>
      </Button>
    </Container>
  );
};

export default ExpenseRegistrationScreen;
