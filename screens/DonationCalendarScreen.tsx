import React, { useState, useEffect } from "react";
import { FlatList, TouchableOpacity, Text, View, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
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
} from "@/components/Styled";
import { api } from "@/utils/api";

interface Props {
  navigation: any;
}

interface FixedExpense {
  id: number;
  content: string;
  price: number;
  isSpent: string;
  date: string;
}

const weekdays = ["월", "화", "수", "목", "금", "토", "일"];

const ExpenseCalendarScreen: React.FC<Props> = ({ navigation }) => {
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
        const res = await api.get<FixedExpense[]>(`/fixed`);
        console.log(res.data);
        setExpenses(res.data);
      } catch (err) {
        console.error("[DonationCalendar] 고정 지출 조회 실패", err);
      } finally {
        setLoading(false);
      }
    }

    loadFixedExpenses();
  }, [currentMonth]);

  // DERIVED VALUES FOR CURRENTLY SELECTED DATE
  const selectedDateISO = `${year}-${String(month + 1).padStart(2, "0")}-${String(selectedDate).padStart(2, "0")}`;
  
  // 선택된 날짜의 고정 지출만 필터링
  const selectedDateExpenses = expenses.filter(expense => {
    const expenseDate = expense.date.split('T')[0]; // ISO 날짜에서 날짜 부분만 추출
    return expenseDate === selectedDateISO;
  });
  
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
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header>
          <Title>고정 지출</Title>
          <Subtitle>고정 지출을 등록/확인하세요.</Subtitle>
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
              <SelectedDay key={dayNumber} onPress={() => navigation.navigate('DonationRegistration')}>
                <SelectedDayText>{dayNumber}</SelectedDayText>
              </SelectedDay>
            ) : (
              <DayButton
                key={dayNumber}
                onPress={() => {
                  navigation.navigate('DonationRegistration');
                  setSelectedDate(dayNumber);
                }}
              >
                <DayText>{dayNumber}</DayText>
              </DayButton>
            );
          })}
        </DaysContainer>

        <SummaryContainer>
          <SummaryTitle>
            {loading
              ? "고정 지출 불러오는 중..."
              : `${year}년 ${month + 1}월 ${selectedDate}일 총 고정 지출: ${totalDailyExpense.toLocaleString()}원`}
          </SummaryTitle>
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
                <TransactionAmount>{`${expense.price.toLocaleString()}원`}</TransactionAmount>
              </TransactionDetails>
            </TransactionContainer>
          ))}
        </SummaryContainer>
      </ScrollView>
    </Container>
  );
};

export default ExpenseCalendarScreen;
