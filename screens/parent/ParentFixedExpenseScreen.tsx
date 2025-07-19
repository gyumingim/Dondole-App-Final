import React, { useState, useEffect } from "react";
import { FlatList, TouchableOpacity, Text, View, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Container,
  Header,
  BackButton,
  Title,
  Subtitle,
  CalendarHeader,
  CalendarTitle,
  CalendarNavigation,
  WeekdaysContainer,
  Weekday,
  DaysContainer,
  DayButton,
  SelectedDay,
  DayText,
  SelectedDayText,
  AddButton,
  SummaryContainer,
  SummaryTitle,
  TransactionContainer,
  TransactionIconGray,
  TransactionIconBlue,
  TransactionDetails,
  TransactionTitle,
  TransactionAmount,
  DevelopedBy,
  BlankDay,
} from "../../components/Styled";
import { api } from "../../utils/api";

interface Props {
  navigation: any;
}

interface FixedExpense {
  id: number;
  content: string;
  price: number;
  isSpent: boolean;
  date: string;
}

const weekdays = ["월", "화", "수", "목", "금", "토", "일"];

const ParentFixedExpenseScreen: React.FC<Props> = ({ navigation }) => {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
  const [selectedDate, setSelectedDate] = useState(today.getDate());
  const [expenses, setExpenses] = useState<FixedExpense[]>([]);
  const [loading, setLoading] = useState(false);

  // ===== Calendar Utils =====
  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const dayCells: (number | null)[] = [];
  // Calculate offset between month 1일 요일과 월요일
  const firstWeekday = new Date(year, month, 1).getDay(); // 0(Sun)~6(Sat)
  const mondayOffset = (firstWeekday + 6) % 7; // Sun->6, Mon->0...
  for (let i = 0; i < mondayOffset; i++) dayCells.push(null);
  for (let d = 1; d <= daysInMonth; d++) dayCells.push(d);
  // trailing blanks so the grid ends on Sunday column
  const trailing = (7 - (dayCells.length % 7)) % 7;
  for (let i = 0; i < trailing; i++) dayCells.push(null);

  useEffect(() => {
    async function loadFixedExpenses() {
      try {
        setLoading(true);
        const userId = await AsyncStorage.getItem("selectedChildId");
        if (!userId) {
          console.error("[ParentFixedExpense] selectedChildId가 없습니다.");
          return;
        }
        
        // 선택된 날짜를 ISO 형식으로 변환
        const selectedDateISO = `${year}-${String(month + 1).padStart(2, "0")}-${String(selectedDate).padStart(2, "0")}`;
        
        // 날짜 파라미터를 포함하여 API 호출
        const res = await api.get<FixedExpense[]>(`/fixed/${userId}`, {
          params: { date: selectedDateISO }
        });
        console.log("[ParentFixedExpense] API 응답 데이터:", res.data);
        console.log("[ParentFixedExpense] 요청 날짜:", selectedDateISO);
        
        // API가 날짜 필터를 지원하지 않는 경우를 대비한 클라이언트 측 필터링
        if (res.data && res.data.length > 0 && res.data[0].date) {
          const filteredData = res.data.filter(expense => {
            const expenseDate = expense.date.split('T')[0];
            return expenseDate === selectedDateISO;
          });
          setExpenses(filteredData);
          console.log("[ParentFixedExpense] 클라이언트 필터링 후:", filteredData);
        } else {
          setExpenses(res.data);
        }
      } catch (err) {
        console.error("[ParentFixedExpense] 고정 지출 조회 실패", err);
      } finally {
        setLoading(false);
      }
    }

    loadFixedExpenses();
  }, [selectedDate, year, month]); // selectedDate 추가하여 날짜 변경 시 재조회

  // DERIVED VALUES FOR CURRENTLY SELECTED DATE
  const selectedDateISO = `${year}-${String(month + 1).padStart(2, "0")}-${String(selectedDate).padStart(2, "0")}`;
  
  // API에서 이미 필터링된 데이터를 사용하므로 여기서는 단순히 expenses를 사용
  const selectedDateExpenses = expenses;
  
  console.log("[ParentFixedExpense] 선택된 날짜:", selectedDateISO);
  console.log("[ParentFixedExpense] 표시할 지출 내역:", selectedDateExpenses);
  
  // 선택된 날짜의 총 고정 지출 금액 계산
  const totalDailyExpense = selectedDateExpenses.reduce((sum, expense) => sum + expense.price, 0);

  const prevMonth = () => setCurrentMonth(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentMonth(new Date(year, month + 1, 1));

  // When month changes reset selected date to 1 (or today if same month)
  useEffect(() => {
    const todayYear = today.getFullYear();
    const todayMonth = today.getMonth();
    if (year === todayYear && month === todayMonth) {
      setSelectedDate(today.getDate());
    } else {
      setSelectedDate(1);
    }
  }, [year, month]);

  return (
    <Container>
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        <Header style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginRight: 16 }}>
            <Ionicons name="chevron-back" size={24} color="#333" />
          </TouchableOpacity>
          <View style={{ flex: 1 }}>
            <Title style={{ marginBottom: 4 }}>고정 지출 내역</Title>
            <Subtitle>아이의 고정 지출을 등록/확인하세요.</Subtitle>
          </View>
        </Header>

        <CalendarHeader>
          <CalendarTitle>{`${year}년 ${month + 1}월`}</CalendarTitle>
          <CalendarNavigation>
            <TouchableOpacity onPress={prevMonth}>
              <Ionicons name="chevron-back" size={20} color="#007BFF" />
            </TouchableOpacity>
            <TouchableOpacity onPress={nextMonth}>
              <Ionicons name="chevron-forward" size={20} color="#007BFF" />
            </TouchableOpacity>
          </CalendarNavigation>
        </CalendarHeader>

        <WeekdaysContainer>
          {weekdays.map((day) => (
            <Weekday key={day}>{day}</Weekday>
          ))}
        </WeekdaysContainer>

        <DaysContainer>
          {dayCells.map((cell, idx) => {
            if (cell === null) {
              return <BlankDay key={`blank-${idx}`} />;
            }
            const dayNumber = cell;
            const isSelected = selectedDate === dayNumber;
            return isSelected ? (
              <SelectedDay key={dayNumber} onPress={() => setSelectedDate(dayNumber)}>
                <SelectedDayText>{dayNumber}</SelectedDayText>
              </SelectedDay>
            ) : (
              <DayButton
                key={dayNumber}
                onPress={() => setSelectedDate(dayNumber)}
              >
                <DayText>{dayNumber}</DayText>
              </DayButton>
            );
          })}
        </DaysContainer>

        <SummaryContainer>
          <Text style={{ fontSize: 16, fontFamily: 'Pretendard-Medium', color: '#333D4B', marginBottom: 8 }}>
              {selectedDate 
                ? `${year}년 ${month + 1}월 ${selectedDate}일 총 고정 지출: ${(totalDailyExpense || 0).toLocaleString()}원`
                : `${year}년 ${month + 1}월 고정 지출 내역`}
            </Text>
          {selectedDateExpenses.length === 0 && !loading && (
            <TransactionAmount style={{ color: "#999" }}>선택된 날짜에 고정 지출 내역이 없습니다.</TransactionAmount>
          )}
          {selectedDateExpenses.map((expense) => (
            <TransactionContainer key={expense.id}>
              <TransactionIconBlue>
                <Ionicons name="save" size={20} color="#fff" />
              </TransactionIconBlue>
              <TransactionDetails>
                <TransactionTitle>{expense.content}</TransactionTitle>
              </TransactionDetails>
              <TransactionAmount>{`${(expense.price || 0).toLocaleString()}원`}</TransactionAmount>
            </TransactionContainer>
          ))}
        </SummaryContainer>
      </ScrollView>
    </Container>
  );
};

export default ParentFixedExpenseScreen; 