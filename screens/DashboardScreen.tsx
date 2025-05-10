import React from "react";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";
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
} from "../components/Styled";

export default function DashboardScreen({ navigation }: { navigation: any }) {
  return (
    <Container>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header>
          <BalanceContainer>
            <BalanceHeader>
              <PiggyBank
                source={require("../assets/piggy.png")}
              />
              <BalanceInfo>
                <BalanceTitle>오윤찬님의 잔여금액</BalanceTitle>
                <BalanceAmount>50,423원</BalanceAmount>
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

          <MenuCard onPress={() => navigation.navigate("ExpenseCalendar")}>  
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
      </ScrollView>
    </Container>
  );
}
