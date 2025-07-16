import React, { useState, useEffect } from "react";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome5, MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import {
  Container,
  Header,
  BalanceContainer,
  BalanceHeader,
  PiggyBank,
  BalanceInfo,
  BalanceTitle,
  BalanceAmount,
  MenuContainer,
  MenuCard,
  MenuIconContainer,
  MenuTextContainer,
  MenuTitle,
  MenuDescription,
  Button,
  ButtonText,
} from "../../components/Styled";
import { api } from "../../utils/api";

interface UserInfo {
  id: number;
  name: string;
  level: string;
  age: number;
  role: string;
  assets: number;
  expectedAssets: number;
}

export default function ChildDashboardScreen({ navigation }: { navigation: any }) {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        setLoading(true);
        const response = await api.get("/users/mine");
        setUserInfo(response.data);
      } catch (error) {
        console.error("사용자 정보 조회 실패", error);
        // 에러 시 기본값 설정
        setUserInfo({
          id: 0,
          name: "사용자",
          level: "",
          age: 0,
          role: "USER",
          assets: 0,
          expectedAssets: 0
        });
      } finally {
        setLoading(false);
      }
    };
    fetchUserInfo();
  }, []);

  return (
    <Container>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header>
          <BalanceContainer>
            <BalanceHeader>
              <PiggyBank
                source={require("../../assets/piggy.png")}
              />
              <BalanceInfo>
                <BalanceTitle>
                  {loading ? "불러오는 중..." : `${userInfo?.name || "사용자"}님의 잔여금액`}
                </BalanceTitle>
                <BalanceAmount>
                  {loading ? "..." : `${(userInfo?.expectedAssets || 0).toLocaleString()}원 | ${(userInfo?.assets || 0).toLocaleString()}원`}
                </BalanceAmount>
              </BalanceInfo>
            </BalanceHeader>
          </BalanceContainer>
        </Header>

        <MenuContainer>
          <MenuCard onPress={() => navigation.navigate("DonationCalendar")}>  
            <MenuIconContainer>
              <FontAwesome5 name="hand-holding-heart" size={24} color="#4CAF50" />
            </MenuIconContainer>
            <MenuTextContainer>
              <MenuTitle>고정 지출</MenuTitle>
              <MenuDescription>고정 지출을 설정하고 관리해요.</MenuDescription>
            </MenuTextContainer>
          </MenuCard>

          <MenuCard onPress={() => navigation.navigate("TodayCalendar")}>  
            <MenuIconContainer>
              <FontAwesome5 name="shopping-bag" size={24} color="#FF9800" />
            </MenuIconContainer>
            <MenuTextContainer>
              <MenuTitle>오늘의 소비</MenuTitle>
              <MenuDescription>오늘의 나의 소비를 확인해요.</MenuDescription>
            </MenuTextContainer>
          </MenuCard>

          <MenuCard onPress={() => navigation.navigate("FinancialQuiz")}>  
            <MenuIconContainer>
              <MaterialCommunityIcons name="comment-question" size={24} color="#2196F3" />
            </MenuIconContainer>
            <MenuTextContainer>
              <MenuTitle>금융 퀴즈</MenuTitle>
              <MenuDescription>지식을 쌓고, 금융 지식을 쌓아요.</MenuDescription>
            </MenuTextContainer>
          </MenuCard>
        </MenuContainer>

        {/* 피드백 버튼들 */}
        <MenuContainer style={{ flexDirection: 'row', gap: 12, marginTop: 20 }}>
          <MenuCard 
            onPress={() => navigation.navigate("DailyFeedbackPage1")}
            style={{ flex: 1, paddingVertical: 20 }}
          >
            <MenuIconContainer style={{ backgroundColor: '#FF9800', marginBottom: 8 }}>
              <Ionicons name="calendar-outline" size={16} color="#fff" />
            </MenuIconContainer>
            <MenuTextContainer style={{ alignItems: 'center' }}>
              <MenuTitle style={{ textAlign: 'center' }}>매일 피드백</MenuTitle>
            </MenuTextContainer>
          </MenuCard>

          <MenuCard 
            onPress={() => navigation.navigate("WeeklyFeedbackPage1")}
            style={{ flex: 1, paddingVertical: 20 }}
          >
            <MenuIconContainer style={{ backgroundColor: '#9C27B0', marginBottom: 8 }}>
              <Ionicons name="stats-chart-outline" size={16} color="#fff" />
            </MenuIconContainer>
            <MenuTextContainer style={{ alignItems: 'center' }}>
              <MenuTitle style={{ textAlign: 'center' }}>주간 피드백</MenuTitle>
            </MenuTextContainer>
          </MenuCard>
        </MenuContainer>
      </ScrollView>
    </Container>
  );
} 