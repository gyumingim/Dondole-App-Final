import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
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

const DonationCalendarScreen: React.FC<Props> = ({ navigation }) => {
  const [selectedDate, setSelectedDate] = useState<number>(15);
  const days = Array.from({ length: 30 }, (_, i) => i + 1);
  const weekdays = ["일", "월", "화", "수", "목", "금", "토"];

  return (
    <Container>
      <Header>
        <BackButton onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="#333" />
        </BackButton>
        <Title>고정 지출</Title>
        <TouchableOpacity>
          <Ionicons name="chevron-down" size={24} color="#333" />
        </TouchableOpacity>
      </Header>

      <Subtitle>고정 지출을 등록/관리해요.</Subtitle>

      <CalendarHeader>
        <CalendarTitle>2023년 11월</CalendarTitle>
        <CalendarNavigation>
          <TouchableOpacity>
            <Ionicons name="chevron-back" size={20} color="#007BFF" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="chevron-forward" size={20} color="#007BFF" />
          </TouchableOpacity>
        </CalendarNavigation>
      </CalendarHeader>

      <WeekdaysContainer>
        {weekdays.map((day, idx) => (
          <Weekday key={idx}>{day}</Weekday>
        ))}
      </WeekdaysContainer>

      <DaysContainer>
        {days.map((day) =>
          selectedDate === day ? (
            <SelectedDay key={day} onPress={() => setSelectedDate(day)}>
              <SelectedDayText>{day}</SelectedDayText>
            </SelectedDay>
          ) : (
            <DayButton key={day} onPress={() => setSelectedDate(day)}>
              <DayText>{day}</DayText>
            </DayButton>
          )
        )}
        <AddButton onPress={() => {/* open add modal */}}>
          <Ionicons name="add" size={24} color="#007BFF" />
        </AddButton>
      </DaysContainer>

      <SummaryContainer>
        <SummaryTitle>오늘의 고정 지출: 12000원</SummaryTitle>

        <TransactionContainer>
          <TransactionIconGray>
            <Ionicons name="list" size={20} color="#999" />
          </TransactionIconGray>
          <TransactionDetails>
            <TransactionTitle>병원</TransactionTitle>
            <TransactionAmount>약 4000원</TransactionAmount>
          </TransactionDetails>
        </TransactionContainer>

        <TransactionContainer>
          <TransactionIconBlue>
            <Ionicons name="wallet" size={20} color="#fff" />
          </TransactionIconBlue>
          <TransactionDetails>
            <TransactionTitle>저금</TransactionTitle>
            <TransactionAmount>12000원</TransactionAmount>
          </TransactionDetails>
        </TransactionContainer>

        <TransactionContainer>
          <TransactionIconGray>
            <Ionicons name="fast-food" size={20} color="#999" />
          </TransactionIconGray>
          <TransactionDetails>
            <TransactionTitle>용돈이야 걱어 사먹에서 놀기</TransactionTitle>
            <TransactionAmount>약 4000원</TransactionAmount>
          </TransactionDetails>
        </TransactionContainer>

        <TransactionContainer>
          <TransactionIconBlue>
            <Ionicons name="card" size={20} color="#fff" />
          </TransactionIconBlue>
          <TransactionDetails>
            <TransactionTitle>체육대회 편지 쓰기 금액</TransactionTitle>
            <TransactionAmount>12000원</TransactionAmount>
          </TransactionDetails>
        </TransactionContainer>
      </SummaryContainer>

      <DevelopedBy>Developed by Oh yun chan</DevelopedBy>
    </Container>
  );
};

export default DonationCalendarScreen;
