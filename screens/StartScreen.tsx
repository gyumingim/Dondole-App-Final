// src/screens/StartScreen.tsx
import React, { useCallback, useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import {
  Container,
  Header,
  Title,
  Subtitle,
  OptionsContainer,
  OptionCard,
  OptionContent,
  OptionTitle,
  OptionDescription,
  Emoji,
  Button,
  ButtonText,
  Footer,
  FooterText,
  FooterLink,
} from "../components/Styled";

export default function StartScreen({ navigation }: { navigation: any }) {
  const [fontsLoaded] = useFonts({
    "Pretend-Regular": require("../assets/fonts/Pretendard-Regular.otf"),
    "Pretend-Medium": require("../assets/fonts/Pretendard-Medium.otf"),
    "Pretend-Bold": require("../assets/fonts/Pretendard-Bold.otf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  return (
    <Container onLayout={onLayoutRootView}>
      <Header>
        <Title>시작하기</Title>
        <Subtitle>사용자의 프로필 및 서비스 이용을 선택하세요.</Subtitle>
      </Header>

      <OptionsContainer>
        <OptionCard
          onPress={() => setSelectedRole("user")}
          style={{ borderColor: selectedRole === "user" ? "#007BFF" : "#eee", borderWidth: 2 }}
        >
          <OptionContent>
            <View>
              <OptionTitle>사용자로 가입하기</OptionTitle>
              <OptionDescription>
                사용자로 서비스를 직접적으로
                {"\n"}
                사용하며 금융을 배워가요.
              </OptionDescription>
            </View>
            <Emoji source={require("../assets/child.png")} />
          </OptionContent>
        </OptionCard>

        <OptionCard
          onPress={() => setSelectedRole("parent")}
          style={{ borderColor: selectedRole === "parent" ? "#007BFF" : "#eee", borderWidth: 2 }}
        >
          <OptionContent>
            <View>
              <OptionTitle>보호자로 가입하기</OptionTitle>
              <OptionDescription>
                보호자는 사용자의 모든 내역을
                {"\n"}
                확인하고, 관리해요.
              </OptionDescription>
            </View>
            <Emoji source={require("../assets/parent.png")} />
          </OptionContent>
        </OptionCard>
      </OptionsContainer>

      <Button
        onPress={() => {
          if (selectedRole) navigation.navigate("Signup", { role: selectedRole });
        }}
        disabled={!selectedRole}
        style={{ opacity: selectedRole ? 1 : 0.5 }}
      >
        <ButtonText>다음으로</ButtonText>
      </Button>

      {/* <Footer>
          <FooterText>아직 회원이 아니신가요?</FooterText>
          <FooterLink onPress={() => navigation.navigate("Signup")}>
            회원가입하기
          </FooterLink>
      </Footer> */}
    </Container>
  );
}
