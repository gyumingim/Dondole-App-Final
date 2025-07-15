import React, { useState, useEffect } from "react";
import { ScrollView, TouchableOpacity, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  Container,
  Header,
  Title,
  Subtitle,
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

interface Child {
  id: number;
  name: string;
  level: string;
  remainingDays: number;
}

export default function ParentChildSelectionScreen({ navigation }: { navigation: any }) {
  const [children, setChildren] = useState<Child[]>([
    { id: 1, name: "오윤찬", level: "000G", remainingDays: 19 },
    { id: 2, name: "김규민", level: "000G", remainingDays: 19 },
    { id: 3, name: "이민철", level: "000G", remainingDays: 19 },
    { id: 4, name: "신윤성", level: "000G", remainingDays: 19 },
  ]);
  const [loading, setLoading] = useState(false);

  const handleChildSelect = (child: Child) => {
    // TODO: 선택된 자녀 정보를 저장하고 대시보드로 이동
    navigation.navigate("ParentDashboard", { selectedChild: child });
  };

  const handleAddConnection = () => {
    navigation.navigate("ParentChildConnection");
  };

  // TODO: 실제 API로 연결된 자녀 목록 가져오기
  // useEffect(() => {
  //   const fetchChildren = async () => {
  //     try {
  //       setLoading(true);
  //       const response = await api.get("/parent/children");
  //       setChildren(response.data);
  //     } catch (error) {
  //       console.error("자녀 목록 조회 실패", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchChildren();
  // }, []);

  return (
    <Container>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header>
          <Title>사용자 선택</Title>
          <Subtitle>사용자를 추가/선택하거나 내역을 확인하세요.</Subtitle>
        </Header>

        <MenuContainer>
          {children.map((child) => (
            <MenuCard key={child.id} onPress={() => handleChildSelect(child)}>
              <MenuIconContainer style={{ backgroundColor: "#007BFF", marginRight: 16 }}>
                <Ionicons name="person" size={24} color="#fff" />
              </MenuIconContainer>
              <MenuTextContainer style={{ flex: 1 }}>
                <MenuTitle>{child.name}</MenuTitle>
                <MenuDescription>{child.level} 잔여: {child.remainingDays}일</MenuDescription>
              </MenuTextContainer>
              <Ionicons name="chevron-forward" size={20} color="#ccc" />
            </MenuCard>
          ))}
        </MenuContainer>

        <Button onPress={handleAddConnection} style={{ marginTop: 20 }}>
          <ButtonText>추가 연결하기</ButtonText>
        </Button>
      </ScrollView>
    </Container>
  );
} 