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
import { login, api } from "../utils/api";

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
        // 로그인 성공 후 사용자 정보 조회
        try {
          const userInfoResponse = await api.get("/users/mine");
          const userRole = userInfoResponse.data.role;
          
          // 역할에 따라 다른 화면으로 라우팅
          if (userRole === "GUARDIAN") {
            navigation.navigate("ParentChildSelection");
          } else if (userRole === "USER") { // USER는 자녀 역할
            navigation.navigate("ChildDashboard");
          }
          else {
            console.log("Unknown role");
          }
        } catch (userInfoError) {
          console.error("사용자 정보 조회 실패:", userInfoError);
          // 사용자 정보 조회 실패 시 기본값으로 자녀 대시보드
          navigation.navigate("ChildDashboard");
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
