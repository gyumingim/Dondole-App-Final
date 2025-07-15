import React, { useState } from "react";
import { ScrollView, Alert } from "react-native";
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
  ErrorText,
  Button,
  ButtonText,
  FooterLink,
} from "../../components/Styled";
import { signUp } from "../../utils/api";

export default function ParentSignupScreen({ navigation }: any) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    if (!username || !password || password !== confirmPassword) {
      setHasError(true);
      Alert.alert("입력 오류", "모든 필드를 올바르게 입력해주세요.");
      return;
    }
    try {
      setLoading(true);
      const response = await signUp({
        username,
        password,
        role: "PARENT",
        level: "일반", // 보호자는 기본 레벨
      });
      if (response.status === 200) {
        Alert.alert("가입 완료", "회원가입이 완료되었습니다.", [
          { text: "확인", onPress: () => navigation.navigate("Login") }
        ]);
      } else {
        setHasError(true);
        Alert.alert("가입 실패", "회원가입에 실패했습니다.");
      }
    } catch (e) {
      setHasError(true);
      Alert.alert("가입 실패", "회원가입에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
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

        </Form>

        <Button onPress={handleSignup} disabled={loading}>
          <ButtonText>가입하기</ButtonText>
        </Button>
      </ScrollView>
    </Container>
  );
} 