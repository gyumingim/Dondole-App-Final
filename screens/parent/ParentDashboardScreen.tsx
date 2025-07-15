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
} from "../../components/Styled";

export default function ParentDashboardScreen({ navigation }: { navigation: any }) {
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
                <BalanceTitle>오윤찬님의 잔여금액</BalanceTitle>
                <BalanceAmount>0원 | 0원</BalanceAmount>
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