import React, { useState } from "react";
import { View, ScrollView, Alert } from "react-native";
import { getStoredToken } from "@/utils/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
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
import axios from "axios";

interface Props {
  navigation: any;
}

const DonationRegistrationScreen: React.FC<Props> = ({ navigation }) => {
  const [donationName, setDonationName] = useState("");
  const [donationAmount, setDonationAmount] = useState("");

  async function handleRegister() {
    if (!donationName || !donationAmount) {
      Alert.alert("필수 입력", "지출 내용과 금액을 입력해주세요.");
      return;
    }
    const payload = {
      content: donationName,
      price: Number(donationAmount) || 0,
      date: new Date().toISOString(),
    };
    const token = await getStoredToken();
    console.log("token", token);
    console.log("payload", payload);
    try {
      await axios.post(`http://15.164.98.121:8080/fixed`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      navigation.navigate("DonationCalendar");
    } catch (err) {
      console.error("[RegisterFixed] 실패", err);
      Alert.alert("오류", "고정 지출 등록에 실패했습니다.");
    }
  }

  return (
    <Container>
      <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled" contentContainerStyle={{paddingBottom: 20}}>
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
      </ScrollView>

      <Button onPress={handleRegister}>
        <ButtonText>지출 등록하기</ButtonText>
      </Button>
    </Container>
  );
};

export default DonationRegistrationScreen;
