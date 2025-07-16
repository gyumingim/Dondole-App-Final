import React, { useState, useEffect } from "react";
import { ScrollView, TouchableOpacity, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage';
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
  const [children, setChildren] = useState<Child[]>([]);
  const [loading, setLoading] = useState(false);

  const handleChildSelect = async (child: Child) => {
    try {
      await AsyncStorage.setItem("selectedChildId", child.id.toString());
      // TODO: 선택된 자녀 정보를 저장하고 대시보드로 이동
      navigation.navigate("ParentDashboard", { selectedChild: child });
    } catch (error) {
      console.error("자녀 ID 저장 실패", error);
      Alert.alert("오류", "자녀 ID를 저장하는데 실패했습니다.");
    }
  };

  const handleAddConnection = () => {
    navigation.navigate("ParentChildConnection");
  };

  useEffect(() => {
    const fetchChildren = async () => {
      try {
        setLoading(true);
        const response = await api.get("/users/manage");
        
        // API 응답 데이터를 Child 인터페이스 형식으로 변환
        const childrenData = response.data.map((child: any) => ({
          id: child.id,
          name: child.name,
          level: child.level || "일반",
          remainingDays: child.remainingDays || 0
        }));
        
        setChildren(childrenData);
      } catch (error) {
        console.error("자녀 목록 조회 실패", error);
        // 에러 시 빈 배열로 설정
        setChildren([]);
      } finally {
        setLoading(false);
      }
    };

    // 초기 로딩
    fetchChildren();

    // 5초마다 반복 호출
    const intervalId = setInterval(fetchChildren, 5000);

    // cleanup function - 컴포넌트 언마운트 시 interval 정리
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <Container>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header>
          <Title>사용자 선택</Title>
          <Subtitle>사용자를 추가/선택하거나 내역을 확인하세요.</Subtitle>
        </Header>

        <MenuContainer>
          {loading ? (
            <MenuCard>
              <MenuTextContainer style={{ alignItems: 'center' }}>
                <MenuTitle>연결된 자녀 목록을 불러오는 중...</MenuTitle>
              </MenuTextContainer>
            </MenuCard>
          ) : children.length === 0 ? (
            <MenuCard>
              <MenuTextContainer style={{ alignItems: 'center' }}>
                <MenuTitle>연결된 자녀가 없습니다</MenuTitle>
                <MenuDescription>아래 버튼을 눌러 자녀를 연결해보세요</MenuDescription>
              </MenuTextContainer>
            </MenuCard>
          ) : (
            children.map((child) => (
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
            ))
          )}
        </MenuContainer>

        <Button onPress={handleAddConnection} style={{ marginTop: 20 }}>
          <ButtonText>추가 연결하기</ButtonText>
        </Button>
      </ScrollView>
    </Container>
  );
} 