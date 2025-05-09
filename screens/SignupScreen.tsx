// src/screens/SignupScreen.tsx
import React, { useState } from "react";
import { ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import {
  Container,
  Header,
  Title,
  Subtitle,
  Form,
  InputContainer,
  Label,
  Input,
  PasswordContainer,
  PasswordInput,
  EyeIcon,
  DropdownContainer,
  DropdownText,
  ErrorText,
  Button,
  ButtonText,
} from "../components/Styled";

export default function SignupScreen({ navigation }: any) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [hasError, setHasError] = useState(false);

  return (
    <Container>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header>
          <Title>회원가입</Title>
          <Subtitle>아래 내용에 대해 입력해주세요.</Subtitle>
        </Header>

        <Form>
          <InputContainer>
            <Label>사용 아이디</Label>
            <Input
              placeholder="사용할 아이디를 입력해주세요."
              value={username}
              onChangeText={setUsername}
            />
            {hasError && <ErrorText>* 이미 사용중인 아이디 입니다.</ErrorText>}
          </InputContainer>

          <InputContainer>
            <Label>비밀번호</Label>
            <PasswordContainer>
              <PasswordInput
                placeholder="사용할 비밀번호를 입력해주세요."
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={setPassword}
              />
              <EyeIcon onPress={() => setShowPassword((v) => !v)}>
                <Ionicons
                  name={showPassword ? "eye-off-outline" : "eye-outline"}
                  size={24}
                  color="#999"
                />
              </EyeIcon>
            </PasswordContainer>
          </InputContainer>

          <InputContainer>
            <Label>비밀번호 확인</Label>
            <PasswordContainer>
              <PasswordInput
                placeholder="입력한 비밀번호를 다시 입력해주세요."
                secureTextEntry={!showConfirmPassword}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
              />
              <EyeIcon onPress={() => setShowConfirmPassword((v) => !v)}>
                <Ionicons
                  name={showConfirmPassword ? "eye-off-outline" : "eye-outline"}
                  size={24}
                  color="#999"
                />
              </EyeIcon>
            </PasswordContainer>
          </InputContainer>

          <InputContainer>
            <Label>등급 확인</Label>
            <DropdownContainer onPress={() => {/* 카테고리 선택 로직 */}}>
              <DropdownText>
                {selectedCategory || "등급 선택하기"}
              </DropdownText>
              <Ionicons name="chevron-down" size={24} color="#999" />
            </DropdownContainer>
          </InputContainer>
        </Form>

        <Button onPress={() => navigation.navigate("Dashboard")}>
          <ButtonText>가입하기</ButtonText>
        </Button>
      </ScrollView>
    </Container>
  );
}
