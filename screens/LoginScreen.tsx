// src/screens/LoginScreen.tsx
import React, { useState } from "react";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

import {
  Container,
  HeaderCenter,
  SubtitleSmall,
  TitleLarge,
  Form,
  InputContainer,
  Label,
  Input,
  PasswordContainer,
  PasswordInput,
  EyeIcon,
  Button,
  ButtonText,
  FooterRow,
  FooterText,
  FooterLink,
  Space
} from "../components/Styled";

export default function LoginScreen({ navigation }: any) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Container>
      <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
        <HeaderCenter>
          <SubtitleSmall>나를 위한 금융 관리</SubtitleSmall>
          <TitleLarge>돈돌이</TitleLarge>
        </HeaderCenter>

        <Form>
          <InputContainer>
            <Label>아이디</Label>
            <Input
              placeholder="아이디를 입력해주세요."
              value={username}
              onChangeText={setUsername}
            />
          </InputContainer>

          <InputContainer>
            <Label>비밀번호</Label>
            <PasswordContainer>
              <PasswordInput
                placeholder="비밀번호를 입력해주세요."
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={setPassword}
              />
              <EyeIcon onPress={() => setShowPassword((v) => !v)}>
                <Ionicons
                  name={showPassword ? "eye-off-outline" : "eye-outline"}
                  size={24}
                  color={"#ccc"}
                />
              </EyeIcon>
            </PasswordContainer>
          </InputContainer>

          <Space />

          <Button onPress={() => navigation.navigate("Dashboard")}>
            <ButtonText>로그인 하기</ButtonText>
          </Button>
          <FooterRow>
          <FooterText>아직 회원이 아니신가요?</FooterText>
          <FooterLink onPress={() => navigation.navigate("Signup")}>
            회원가입하기
          </FooterLink>
        </FooterRow>
        </Form>
      </ScrollView>
    </Container>
  );
}
