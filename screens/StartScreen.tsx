// src/screens/StartScreen.tsx
import React, { useCallback, useState } from "react";
import { TouchableOpacity, View, ScrollView, Text } from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { Ionicons } from "@expo/vector-icons";
import {
  Container,
  Header,
  HeaderCenter,
  Title,
  TitleLarge,
  Subtitle,
  SubtitleSmall,
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
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  
  const [fontsLoaded] = useFonts({
    "Pretendard-Regular": require("../assets/fonts/Pretendard-Regular.otf"),
    "Pretendard-Medium": require("../assets/fonts/Pretendard-Medium.otf"),
    "Pretendard-SemiBold": require("../assets/fonts/Pretendard-SemiBold.otf"),
    "Pretendard-Bold": require("../assets/fonts/Pretendard-Bold.otf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Container onLayout={onLayoutRootView}>
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <View style={{ flex: 1 }}>
          <View style={{ paddingHorizontal: 20, paddingTop: 80 }}>
            <Text style={{ 
              fontSize: 18,
              fontFamily: 'Pretendard-Bold',
              color: '#191F28',
              marginBottom: 20,
            }}>
              어떤 역할로 시작하시겠어요?
            </Text>

            <OptionCard
              onPress={() => setSelectedRole("user")}
              style={{ 
                borderColor: selectedRole === "user" ? "#3182F6" : "#F2F4F6",
                backgroundColor: selectedRole === "user" ? "#F0F7FF" : "#FFFFFF",
                marginBottom: 12
              }}
            >
              <View style={{ flex: 1 }}>
                <OptionTitle>아이로 시작하기</OptionTitle>
                <OptionDescription>
                  금융을 배우고 용돈을 관리해요
                </OptionDescription>
              </View>
              {selectedRole === "user" && (
                <Ionicons name="checkmark-circle" size={24} color="#3182F6" />
              )}
            </OptionCard>

            <OptionCard
              onPress={() => setSelectedRole("parent")}
              style={{ 
                borderColor: selectedRole === "parent" ? "#3182F6" : "#F2F4F6",
                backgroundColor: selectedRole === "parent" ? "#F0F7FF" : "#FFFFFF"
              }}
            >
              <View style={{ flex: 1 }}>
                <OptionTitle>보호자로 시작하기</OptionTitle>
                <OptionDescription>
                  아이의 금융 교육을 도와줘요
                </OptionDescription>
              </View>
              {selectedRole === "parent" && (
                <Ionicons name="checkmark-circle" size={24} color="#3182F6" />
              )}
            </OptionCard>
          </View>

          <View style={{ flex: 1, justifyContent: 'flex-end', paddingBottom: 40 }}>
            <Button
              onPress={() => {
                if (selectedRole === "user") {
                  navigation.navigate("ChildSignup");
                } else if (selectedRole === "parent") {
                  navigation.navigate("ParentSignup");
                }
              }}
              disabled={!selectedRole}
              style={{ 
                opacity: selectedRole ? 1 : 0.3,
                marginHorizontal: 20,
                marginBottom: 20
              }}
            >
              <ButtonText>계속하기</ButtonText>
            </Button>

            <View style={{ 
              flexDirection: 'row', 
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <FooterText>이미 계정이 있으신가요?</FooterText>
              <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                <FooterLink style={{ marginLeft: 4 }}>로그인</FooterLink>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </Container>
  );
}
