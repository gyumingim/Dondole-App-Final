import React, { useState } from "react";
import { View } from "react-native";
import {
  Container,
  Header,
  BackButton,
  Title,
  Form,
  InputContainer,
  Label,
  Input,
  Button,
  ButtonText,
  DevelopedBy,
} from "@/components/Styled";

interface Props {
  navigation: any;
}

const DonationRegistrationScreen: React.FC<Props> = ({ navigation }) => {
  const [donationName, setDonationName] = useState("");
  const [donationAmount, setDonationAmount] = useState("");

  return (
    <Container>
      <View>
        <Header>
          <Title>고정 지출 등록</Title>
        </Header>

        <Form>
          <InputContainer>
            <Label>지출 내용</Label>
            <Input
              placeholder="지출 내용을 입력해주세요. ex) 병원가기"
              value={donationName}
              onChangeText={setDonationName}
            />
          </InputContainer>

          <InputContainer>
            <Label>예상 금액</Label>
            <Input
              placeholder="필요한 예상 금액을 입력해주세요. ex) 10000"
              value={donationAmount}
              onChangeText={setDonationAmount}
              keyboardType="numeric"
            />
          </InputContainer>
        </Form>
      </View>
      

      <Button onPress={() => navigation.navigate("DonationCalendar")}>
        <ButtonText>지출 등록하기</ButtonText>
      </Button>
    </Container>
  );
};

export default DonationRegistrationScreen;
