import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { View } from "react-native";
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

  return (
    <Container>
      <View>
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
        </Form>
      </View>


      <Button onPress={() => navigation.navigate("ExpenseCalendar")}>
        <ButtonText>지출 등록하기</ButtonText>
      </Button>
    </Container>
  );
};

export default ExpenseRegistrationScreen;
