import React, { useState } from "react";
import { FlatList, TouchableOpacity, Text, View } from "react-native";
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
} from "@/components/Styled";

interface Props {
  navigation: any;
}

const weekdays = ["일", "월", "화", "수", "목", "금", "토"];

const ExpenseCalendarScreen: React.FC<Props> = ({ navigation }) => {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
  const [selectedDate, setSelectedDate] = useState(today.getDate());

  // generate days array for current month
  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const prevMonth = () => setCurrentMonth(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentMonth(new Date(year, month + 1, 1));

  return (
    <Container>
      <Header>
        <Title>오늘의 소비</Title>
        <Subtitle>오늘의 소비를 등록/확인하세요.</Subtitle>

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
        {daysArray.map((day) =>
          selectedDate === day ? (
            <SelectedDay key={day} onPress={() => navigation.navigate('ExpenseRegistration')}>
              <SelectedDayText>{day}</SelectedDayText>
            </SelectedDay>
          ) : (
            <DayButton key={day} onPress={() => {navigation.navigate('ExpenseRegistration');setSelectedDate(day)}}>
              <DayText>{day}</DayText>
            </DayButton>
          )
        )}
      </DaysContainer>

      <SummaryContainer>
        <SummaryTitle>오늘의 고정 지출 총 12000원</SummaryTitle>
        <TransactionContainer>
          <TransactionIconGray>
            <Ionicons name="medkit" size={20} color="#999" />
          </TransactionIconGray>
          <TransactionDetails>
            <TransactionTitle>병원</TransactionTitle>
            <TransactionAmount>약 4000원</TransactionAmount>
          </TransactionDetails>
        </TransactionContainer>
        <TransactionContainer>
          <TransactionIconBlue>
            <Ionicons name="save" size={20} color="#fff" />
          </TransactionIconBlue>
          <TransactionDetails>
            <TransactionTitle>저금</TransactionTitle>
            <TransactionAmount>12000원</TransactionAmount>
          </TransactionDetails>
        </TransactionContainer>
        {/* 추가 내역 반복 렌더 */}
      </SummaryContainer>
    </Container>
  );
};

export default ExpenseCalendarScreen;
