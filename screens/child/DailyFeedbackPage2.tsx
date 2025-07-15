import React from "react";
import { ScrollView, TouchableOpacity, View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  Container,
  Header,
  Title,
  Subtitle,
  MenuContainer,
  QuizContainer,
  Button,
} from "../../components/Styled";

export default function DailyFeedbackPage2({ navigation, route }: { navigation: any; route: any }) {
  const { feedback } = route.params || {};

  const handleGoHome = () => {
    navigation.navigate('ChildDashboard');
  };

  return (
    <Container>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginRight: 16 }}>
            <Ionicons name="chevron-back" size={24} color="#333" />
          </TouchableOpacity>
          <View style={{ flex: 1 }}>
            <Title style={{ marginBottom: 4 }}>매일 피드백</Title>
            <Subtitle>나의 피드백을 확인해보세요.</Subtitle>
          </View>
        </Header>

        <MenuContainer>
          <QuizContainer style={{ padding: 40, alignItems: 'center', justifyContent: 'center', minHeight: 400 }}>
            <View style={{ 
              width: 80, 
              height: 80, 
              backgroundColor: '#f0f0f0', 
              borderRadius: 40, 
              marginBottom: 32,
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <View style={{ 
                width: 40, 
                height: 40, 
                backgroundColor: '#ddd', 
                borderRadius: 20,
                position: 'relative'
              }}>
                <View style={{ 
                  width: 12, 
                  height: 12, 
                  backgroundColor: '#ff6b6b', 
                  borderRadius: 6,
                  position: 'absolute',
                  top: -6,
                  right: -6
                }} />
                <View style={{ 
                  width: 8, 
                  height: 8, 
                  backgroundColor: '#4ecdc4', 
                  borderRadius: 4,
                  position: 'absolute',
                  bottom: -4,
                  left: -4
                }} />
              </View>
            </View>
            
            <Text style={{ 
              fontSize: 24, 
              fontWeight: '600', 
              textAlign: 'center',
              color: '#333',
              marginBottom: 24
            }}>
              조언
            </Text>
            
                         <Text style={{ 
               fontSize: 16, 
               textAlign: 'center',
               color: '#666',
               lineHeight: 24,
               paddingHorizontal: 16
             }}>
               {feedback?.advice || "조언을 불러올 수 없습니다."}
             </Text>
          </QuizContainer>
        </MenuContainer>

        <View style={{ padding: 16, paddingBottom: 40 }}>
          <Button onPress={handleGoHome}>
            <Text style={{ color: '#fff', fontSize: 16, fontWeight: '600' }}>홈으로</Text>
          </Button>
        </View>

        <View style={{ alignItems: 'center', marginBottom: 20 }}>
          <Text style={{ color: '#999', fontSize: 12 }}>Developed by Oh yun chan</Text>
        </View>
      </ScrollView>
    </Container>
  );
} 