import React, { useState, useEffect } from "react";
import { ScrollView, View, Text, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage';
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
} from "../../components/Styled";
import { api } from "../../utils/api";

interface ChildInfo {
  id: number;
  name: string;
  level: string;
  age: number;
  role: string;
  assets: number;
  expectedAssets: number;
}

export default function ParentDashboardScreen({ navigation }: { navigation: any }) {
  const [childInfo, setChildInfo] = useState<ChildInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChildInfo = async () => {
      try {
        const selectedChildId = await AsyncStorage.getItem("selectedChildId");
        
        if (selectedChildId) {
          const response = await api.get(`/users/${selectedChildId}`);
          setChildInfo(response.data);
        }
      } catch (error) {
        console.error("자녀 정보 조회 실패", error);
      } finally {
        setLoading(false);
      }
    };

    fetchChildInfo();
  }, []);

  return (
    <Container>
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        <Header>
          <Title>{loading ? "..." : childInfo ? `${childInfo.name}` : "자녀"}</Title>
          <Subtitle>자녀의 금융 활동을 확인하세요</Subtitle>
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
                {loading ? "..." : childInfo ? `${childInfo.name}의 잔여금액` : "잔여금액"}
              </Text>
              <Text style={{
                fontSize: 32,
                fontFamily: 'Pretendard-Bold',
                color: '#191F28',
                marginBottom: 2
              }}>
                {loading ? "..." : childInfo ? `${(childInfo.assets || 0).toLocaleString()}원` : "0원"}
              </Text>
              <Text style={{
                fontSize: 13,
                fontFamily: 'Pretendard-Regular',
                color: '#6B7684'
              }}>
                {loading ? "..." : childInfo ? `${(childInfo.expectedAssets || 0).toLocaleString()}원` : "0원"}
              </Text>
            </View>
            <View style={{ marginLeft: 16 }}>
              <Image source={require("../../assets/piggy.png")} style={{ width: 64, height: 64 }} />
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
            자녀 관리
          </Text>

          <MenuContainer>
            <MenuCard onPress={() => navigation.navigate("ParentFixedExpense")}>  
              <MenuIconContainer>
                <Image source={require("../../assets/1.png")} style={{ width: 32, height: 32 }} />
              </MenuIconContainer>
              <MenuTextContainer>
                <MenuTitle>고정 지출</MenuTitle>
                <MenuDescription>매달 정기적인 지출 관리</MenuDescription>
              </MenuTextContainer>
              <Ionicons name="chevron-forward" size={20} color="#D1D6DB" />
            </MenuCard>

            <MenuCard onPress={() => navigation.navigate("ParentExpense")}>  
              <MenuIconContainer>
                <Image source={require("../../assets/2.png")} style={{ width: 32, height: 32 }} />
              </MenuIconContainer>
              <MenuTextContainer>
                <MenuTitle>오늘의 소비</MenuTitle>
                <MenuDescription>일일 소비 내역 확인</MenuDescription>
              </MenuTextContainer>
              <Ionicons name="chevron-forward" size={20} color="#D1D6DB" />
            </MenuCard>

            <MenuCard onPress={() => navigation.navigate("ParentQuizHistory")}>  
              <MenuIconContainer>
                <Image source={require("../../assets/3.png")} style={{ width: 32, height: 32 }} />
              </MenuIconContainer>
              <MenuTextContainer>
                <MenuTitle>금융 교육</MenuTitle>
                <MenuDescription>퀴즈 학습 현황</MenuDescription>
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
            <MenuCard onPress={() => navigation.navigate("ParentDailyFeedbackList")}>
              <MenuIconContainer>
                <Image source={require("../../assets/4.png")} style={{ width: 32, height: 32 }} />
              </MenuIconContainer>
              <MenuTextContainer>
                <MenuTitle>일일 피드백</MenuTitle>
                <MenuDescription>오늘의 소비 분석</MenuDescription>
              </MenuTextContainer>
              <Ionicons name="chevron-forward" size={20} color="#D1D6DB" />
            </MenuCard>

            <MenuCard onPress={() => navigation.navigate("ParentWeeklyFeedbackList")}>
              <MenuIconContainer>
                <Image source={require("../../assets/5.png")} style={{ width: 32, height: 32 }} />
              </MenuIconContainer>
              <MenuTextContainer>
                <MenuTitle>주간 리포트</MenuTitle>
                <MenuDescription>한 주 소비 트렌드</MenuDescription>
              </MenuTextContainer>
              <Ionicons name="chevron-forward" size={20} color="#D1D6DB" />
            </MenuCard>
          </MenuContainer>
        </View>
      </ScrollView>
    </Container>
  );
} 