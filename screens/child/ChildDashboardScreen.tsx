import React, { useState, useEffect } from "react";
import { ScrollView, View, Text, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome5, MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import {
  Container,
  Header,
  Title,
  Subtitle,
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

  const getProgressPercentage = () => {
    if (!userInfo || userInfo.expectedAssets === 0) return 0;
    return Math.min((userInfo.assets / userInfo.expectedAssets) * 100, 100);
  };

  return (
    <Container>
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        <Header>
          <Title>{loading ? "..." : `${userInfo?.name || "친구"}`}</Title>
          <Subtitle>오늘도 똑똑한 소비 하자</Subtitle>
        </Header>
        
        <View style={{ paddingHorizontal: 20, marginBottom: 20 }}>
          <View style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 16,
            padding: 20,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderWidth: 1,
            borderColor: '#F2F4F6'
          }}>
            <View style={{ flex: 1 }}>
              <Text style={{
                fontSize: 13,
                fontFamily: 'Pretendard-Regular',
                color: '#6B7684',
                marginBottom: 4
              }}>
                {loading ? "..." : `${userInfo?.name || "나"}의 잔여금액`}
              </Text>
              <Text style={{
                fontSize: 24,
                fontFamily: 'Pretendard-Bold',
                color: '#191F28',
                marginBottom: 2
              }}>
                {loading ? "..." : `${(userInfo?.assets || 0).toLocaleString()}원`}
              </Text>
              <Text style={{
                fontSize: 13,
                fontFamily: 'Pretendard-Regular',
                color: '#6B7684'
              }}>
                {loading ? "..." : `${(userInfo?.expectedAssets || 0).toLocaleString()}원`}
              </Text>
            </View>
            <View style={{ marginLeft: 16 }}>
              <Text style={{ fontSize: 48 }}>🐷</Text>
            </View>
          </View>
        </View>

        <View style={{ paddingTop: 4 }}>
          <Text style={{ 
            fontSize: 13,
            fontFamily: 'Pretendard-Regular',
            color: '#6B7684',
            paddingHorizontal: 20,
            marginBottom: 12
          }}>
            오늘 할 일
          </Text>

          <MenuContainer>
            <MenuCard onPress={() => navigation.navigate("DonationCalendar")}>  
              <MenuIconContainer style={{ backgroundColor: '#E3F2FD' }}>
                <FontAwesome5 name="calendar-check" size={18} color="#1976D2" />
              </MenuIconContainer>
              <MenuTextContainer>
                <MenuTitle>고정 지출</MenuTitle>
                <MenuDescription>매달 나가는 돈 관리</MenuDescription>
              </MenuTextContainer>
              <Ionicons name="chevron-forward" size={20} color="#D1D6DB" />
            </MenuCard>

            <MenuCard onPress={() => navigation.navigate("TodayCalendar")}>  
              <MenuIconContainer style={{ backgroundColor: '#FFF3E0' }}>
                <FontAwesome5 name="shopping-bag" size={18} color="#F57C00" />
              </MenuIconContainer>
              <MenuTextContainer>
                <MenuTitle>오늘의 소비</MenuTitle>
                <MenuDescription>오늘 사용한 돈 기록</MenuDescription>
              </MenuTextContainer>
              <Ionicons name="chevron-forward" size={20} color="#D1D6DB" />
            </MenuCard>

            <MenuCard onPress={() => navigation.navigate("FinancialQuizSelection")}>  
              <MenuIconContainer style={{ backgroundColor: '#E8F5E9' }}>
                <MaterialCommunityIcons name="school" size={20} color="#388E3C" />
              </MenuIconContainer>
              <MenuTextContainer>
                <MenuTitle>금융 퀴즈</MenuTitle>
                <MenuDescription>재미있게 배우는 돈 이야기</MenuDescription>
              </MenuTextContainer>
              <Ionicons name="chevron-forward" size={20} color="#D1D6DB" />
            </MenuCard>
          </MenuContainer>
        </View>

        <View style={{ paddingTop: 20 }}>
          <Text style={{ 
            fontSize: 13,
            fontFamily: 'Pretendard-Regular',
            color: '#6B7684',
            paddingHorizontal: 20,
            marginBottom: 12
          }}>
            피드백
          </Text>

          <MenuContainer>
            <MenuCard onPress={() => navigation.navigate("DailyFeedbackPage1")}>
              <MenuIconContainer style={{ backgroundColor: '#F3E5F5' }}>
                <Ionicons name="today" size={20} color="#7B1FA2" />
              </MenuIconContainer>
              <MenuTextContainer>
                <MenuTitle>오늘의 피드백</MenuTitle>
                <MenuDescription>오늘 하루 돌아보기</MenuDescription>
              </MenuTextContainer>
              <Ionicons name="chevron-forward" size={20} color="#D1D6DB" />
            </MenuCard>

            <MenuCard onPress={() => navigation.navigate("WeeklyFeedbackPage1")}>
              <MenuIconContainer style={{ backgroundColor: '#FCE4EC' }}>
                <Ionicons name="trending-up" size={20} color="#C2185B" />
              </MenuIconContainer>
              <MenuTextContainer>
                <MenuTitle>이번 주 성적표</MenuTitle>
                <MenuDescription>일주일 소비 분석</MenuDescription>
              </MenuTextContainer>
              <Ionicons name="chevron-forward" size={20} color="#D1D6DB" />
            </MenuCard>
          </MenuContainer>
        </View>
      </ScrollView>
    </Container>
  );
} 