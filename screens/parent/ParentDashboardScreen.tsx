import React, { useState, useEffect } from "react";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage';
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
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header>
          <BalanceContainer>
            <BalanceHeader>
              <PiggyBank
                source={require("../../assets/piggy.png")}
              />
              <BalanceInfo>
                <BalanceTitle>
                  {loading ? "로딩 중..." : childInfo ? `${childInfo.name}님의 잔여금액` : "자녀 정보 없음"}
                </BalanceTitle>
                <BalanceAmount>
                  {loading ? "..." : childInfo ? `${childInfo.assets.toLocaleString()}원 | ${childInfo.expectedAssets.toLocaleString()}원` : "0원 | 0원"}
                </BalanceAmount>
              </BalanceInfo>
            </BalanceHeader>
          </BalanceContainer>
        </Header>

        <MenuContainer>
          <MenuCard onPress={() => navigation.navigate("ParentFixedExpense")}>  
            <MenuIconContainer>
              <FontAwesome5 name="hand-holding-heart" size={24} color="#4CAF50" />
            </MenuIconContainer>
            <MenuTextContainer>
              <MenuTitle>고정 지출 내역</MenuTitle>
              <MenuDescription>아이들의 지출 내역을 확인하세요.</MenuDescription>
            </MenuTextContainer>
          </MenuCard>

          <MenuCard onPress={() => navigation.navigate("ParentExpense")}>  
            <MenuIconContainer>
              <FontAwesome5 name="shopping-bag" size={24} color="#FF9800" />
            </MenuIconContainer>
            <MenuTextContainer>
              <MenuTitle>오늘의 소비 내역</MenuTitle>
              <MenuDescription>아이들의 소비 내역을 확인하세요.</MenuDescription>
            </MenuTextContainer>
          </MenuCard>

          <MenuCard onPress={() => navigation.navigate("ParentQuizHistory")}>  
            <MenuIconContainer>
              <MaterialCommunityIcons name="comment-question" size={24} color="#2196F3" />
            </MenuIconContainer>
            <MenuTextContainer>
              <MenuTitle>금융 퀴즈 내역</MenuTitle>
              <MenuDescription>아이들의 퀴즈 내역을 확인하세요.</MenuDescription>
            </MenuTextContainer>
          </MenuCard>
        </MenuContainer>
      </ScrollView>
    </Container>
  );
} 