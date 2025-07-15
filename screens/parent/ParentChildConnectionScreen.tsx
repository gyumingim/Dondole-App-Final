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
  Button,
  ButtonText,
} from "../../components/Styled";
import { api } from "../../utils/api";

export default function ParentChildConnectionScreen({ navigation }: { navigation: any }) {
  const [childId, setChildId] = useState("");
  const [childPassword, setChildPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleConnection = async () => {
    if (!childId || !childPassword) {
      Alert.alert("입력 오류", "모든 필드를 입력해주세요.");
      return;
    }

    try {
      setLoading(true);
      
      // TODO: 실제 자녀 연동 API 호출
      // const response = await api.post("/parent/connect-child", {
      //   childUsername: childId,
      //   childPassword: childPassword
      // });

      // 임시로 성공 처리
      Alert.alert(
        "연동 완료", 
        `${childId} 사용자와 연동이 완료되었습니다.`,
        [
          { 
            text: "확인", 
            onPress: () => navigation.navigate("ParentChildSelection")
          }
        ]
      );

    } catch (error) {
      console.error("자녀 연동 실패", error);
      Alert.alert("연동 실패", "사용자 정보를 확인해주세요.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
        <Header>
          <Title>사용자 연동하기</Title>
          <Subtitle>아래 내용에 대해 입력하세요.</Subtitle>
        </Header>

        <Form>
          <InputContainer>
            <Label>사용자 아이디</Label>
            <Input
              placeholder="연동할 사용자의 아이디를 입력해주세요."
              value={childId}
              onChangeText={setChildId}
            />
          </InputContainer>

          <InputContainer>
            <Label>사용자 비밀번호</Label>
            <PasswordContainer>
              <PasswordInput
                placeholder="연동할 사용자의 비밀번호를 입력해주세요."
                secureTextEntry={!showPassword}
                value={childPassword}
                onChangeText={setChildPassword}
              />
              <EyeIcon onPress={() => setShowPassword((prev) => !prev)}>
                <Ionicons
                  name={showPassword ? "eye-off-outline" : "eye-outline"}
                  size={24}
                  color="#999"
                />
              </EyeIcon>
            </PasswordContainer>
          </InputContainer>
        </Form>

        <Button onPress={handleConnection} disabled={loading}>
          <ButtonText>가입하기</ButtonText>
        </Button>
      </ScrollView>
    </Container>
  );
} 