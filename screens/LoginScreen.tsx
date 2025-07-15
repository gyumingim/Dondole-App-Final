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
import { login } from "../utils/api";

export default function LoginScreen({ navigation }: any) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    if (!username || !password) {
      setError(true);
      return;
    }
    try {
      setLoading(true);
      const response = await login({ username, password });
      if (response.status === 200) {
        // 역할에 따라 다른 화면으로 라우팅
        if (response.userRole === "PARENT") {
          navigation.navigate("ParentChildSelection");
        } else {
          navigation.navigate("Dashboard"); // 자녀는 바로 대시보드로
        }
      } else {
        setError(true);
      }
    } catch (e) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

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

          <Button onPress={handleLogin} disabled={loading}>
            <ButtonText>로그인 하기</ButtonText>
          </Button>
          {error && (<FooterText style={{color: 'red'}}>로그인 실패. 아이디/비밀번호를 확인하세요.</FooterText>)}
          <FooterRow>
          <FooterText>아직 회원이 아니신가요?</FooterText>
          <FooterLink onPress={() => navigation.navigate("Start")}>
            회원가입하기
          </FooterLink>
        </FooterRow>
        </Form>
      </ScrollView>
    </Container>
  );
}
