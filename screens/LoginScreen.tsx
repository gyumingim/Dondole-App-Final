// src/screens/LoginScreen.tsx
import React, { useState } from "react";
import { ScrollView, View, Text, KeyboardAvoidingView, Platform, TouchableOpacity } from "react-native";
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
  Space,
  ErrorText
} from "../components/Styled";
import { login, api } from "../utils/api";

export default function LoginScreen({ navigation }: any) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    if (!username || !password) {
      setError("아이디와 비밀번호를 모두 입력해주세요.");
      return;
    }
    try {
      setLoading(true);
      setError("");
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
        setError("로그인에 실패했습니다. 다시 시도해주세요.");
      }
    } catch (e) {
      setError("아이디 또는 비밀번호가 올바르지 않습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView 
          showsVerticalScrollIndicator={false} 
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ flexGrow: 1 }}
        >
          <View style={{ flex: 1, justifyContent: 'center', paddingHorizontal: 20 }}>
            <HeaderCenter style={{ marginBottom: 40 }}>
         
              <TitleLarge>돈돌이</TitleLarge>
              <SubtitleSmall style={{ marginTop: 8 }}>똑똑한 금융 습관을 만들어요</SubtitleSmall>
            </HeaderCenter>

            <Form>
              <InputContainer>
                <Label>아이디</Label>
                <Input
                  placeholder="아이디를 입력하세요"
                  value={username}
                  onChangeText={setUsername}
                  autoCapitalize="none"
                  autoCorrect={false}
                  style={{
                    backgroundColor: error ? '#FFF5F5' : '#F9FAFB',
                    borderColor: error ? '#FF5D5D' : '#E5E8EB'
                  }}
                />
              </InputContainer>

              <InputContainer>
                <Label>비밀번호</Label>
                <PasswordContainer style={{
                  backgroundColor: error ? '#FFF5F5' : '#F9FAFB',
                  borderColor: error ? '#FF5D5D' : '#E5E8EB'
                }}>
                  <PasswordInput
                    placeholder="비밀번호를 입력하세요"
                    secureTextEntry={!showPassword}
                    value={password}
                    onChangeText={setPassword}
                  />
                  <EyeIcon onPress={() => setShowPassword((v) => !v)}>
                    <Ionicons
                      name={showPassword ? "eye-off-outline" : "eye-outline"}
                      size={20}
                      color="#8B95A1"
                    />
                  </EyeIcon>
                </PasswordContainer>
              </InputContainer>

              {error ? (
                <View style={{ marginTop: 8, marginBottom: 24 }}>
                  <ErrorText>{error}</ErrorText>
                </View>
              ) : (
                <View style={{ height: 32 }} />
              )}

              <Button 
                onPress={handleLogin} 
                disabled={loading}
                style={{
                  opacity: loading ? 0.7 : 1,
                  marginHorizontal: 0,
                  marginBottom: 16
                }}
              >
                <ButtonText>{loading ? "로그인 중..." : "로그인"}</ButtonText>
              </Button>

              <FooterRow style={{ marginTop: 8 }}>
                <FooterText>처음이신가요?</FooterText>
                <TouchableOpacity onPress={() => navigation.navigate("Start")}>
                  <FooterLink style={{ marginLeft: 4 }}>회원가입</FooterLink>
                </TouchableOpacity>
              </FooterRow>
            </Form>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Container>
  );
}
