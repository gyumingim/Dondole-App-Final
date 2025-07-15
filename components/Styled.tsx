import styled from "@emotion/native";

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: #f5f5f5;
  padding: 30px;
  padding-top: 80px;
  justify-content: space-between;
`;

export const Header = styled.View`
  margin-top: 16px;
  margin-bottom: 30px;
  display: flex;
`;

export const Title = styled.Text`
  font-family: Pretend-Bold;
  font-size: 24px;
  margin-bottom: 8px;
`;

export const Subtitle = styled.Text`
  font-family: Pretend-Regular;
  font-size: 12px;
  color: #666;
`;

export const OptionsContainer = styled.View`
  flex: 1;
  gap: 12px;
`;

export const OptionCard = styled.TouchableOpacity`
  background-color: #fff;
  border-radius: 8px;
  padding: 16px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const OptionContent = styled.View`
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  flex: 1;
  height: 120px;
`;

export const OptionTitle = styled.Text`
  font-family: Pretend-Medium;
  font-size: 14px;
  margin-bottom: 12px;
`;

export const OptionDescription = styled.Text`
  font-family: Pretend-Medium;
  font-size: 10px;
  color: #666;
  line-height: 16px;
`;

export const Emoji = styled.Image`
  margin-top: auto;
  width: 80px;
  height: 80px;
`;

export const Button = styled.TouchableOpacity`
  background-color: #007BFF;
  border-radius: 12px;
  padding: 12px;
  align-items: center;
  margin-top: 12px;
  margin-bottom: 12px;
`;

export const ButtonText = styled.Text`
  color: #fff;
  font-size: 14px;
  font-family: Pretend-Medium;
`;

export const Footer = styled.View`
  flex-direction: row;
  justify-content: center;
`;

export const FooterText = styled.Text`
  color: #666;
  font-size: 10px;
`;

export const FooterLink = styled.Text`
  color: #007BFF;
  font-size: 10px;
  font-family: Pretend-Medium;
  margin-left: 8px;
`;

export const Form = styled.View`
  margin-bottom: 30px;
`;

export const InputContainer = styled.View`
  margin-bottom: 20px;
`;

export const Label = styled.Text`
  font-family: Pretend-Medium;
  font-size: 12px;
  color: #333;
  margin-bottom: 8px;
`;

export const Input = styled.TextInput`
  background-color: #fff;
  border-radius: 12px;
  padding: 16px;
  font-size: 12px;
`;

export const PasswordContainer = styled.View`
  flex-direction: row;
  background-color: #fff;
  border-radius: 12px;
  align-items: center;
`;

export const PasswordInput = styled.TextInput`
  flex: 1;
  padding: 16px;
  font-size: 12px;
`;

export const EyeIcon = styled.TouchableOpacity`
  padding: 12px;
`;

export const DropdownContainer = styled.TouchableOpacity`
  background-color: #fff;
  border-radius: 12px;
  padding: 16px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const DropdownText = styled.Text`
  font-family: Pretend-Regular;
  font-size: 12px;
  color: #666;
`;

export const ErrorText = styled.Text`
  color: red;
  font-size: 10px;
  margin-top: 8px;
`;

export const HeaderCenter = styled.View`
  align-items: center;
  margin-top: 30px;
  margin-bottom: 30px;
`;

export const SubtitleSmall = styled.Text`
  font-family: YClover-Regular;
  font-size: 12px;
  color: #666;
  margin-bottom: 4px;
  margin-top: 40px;
`;

export const TitleLarge = styled.Text`
  font-family: YClover-Bold;
  font-size: 62px; /* 고정값 그대로 사용 */
  color: #007BFF;
`;

export const FooterRow = styled.View`
  flex-direction: row;
  justify-content: center;
  margin-bottom: 20px;
`;

export const Space = styled.View`
  height: 80px;
`;

export const BalanceContainer = styled.View`
  border-radius: 12px;
  padding: 20px;
`;

export const BalanceHeader = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const PiggyBank = styled.Image`
  width: 50px;
  height: 70px;
  margin-right: 16px;
`;

export const BalanceInfo = styled.View``;

export const BalanceTitle = styled.Text`
  font-family: Pretend-Bold;
  font-size: 24px;
  margin-bottom: 4px;
`;

export const BalanceAmount = styled.Text`
  font-family: Pretend-Medium;
  font-size: 18px;
`;

export const MenuContainer = styled.View`
  gap: 16px;
`;

export const MenuCard = styled.TouchableOpacity`
  background-color: #fff;
  border-radius: 16px;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 30px;
  padding-bottom: 30px;
  flex-direction: row;
  align-items: center;
`;

export const MenuIconContainer = styled.View`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  background-color: #f5f5f5;
  justify-content: center;
  align-items: center;
  margin-right: 16px;
`;

export const MenuTextContainer = styled.View`
  flex: 1;
`;

export const MenuTitle = styled.Text`
  font-family: Pretend-Medium;
  font-size: 14px;
  margin-bottom: 4px;
`;

export const MenuDescription = styled.Text`
  font-family: Pretend-Regular;
  font-size: 10px;
  color: #666;
`;

export const QuizContainer = styled.View`
  flex: 1;
  background-color: #fff;
  padding: 20px;
  border-radius: 20px;
`;

export const QuestionContainer = styled.View`
  margin-bottom: 30px;
`;

export const QuestionNumber = styled.Text`
  font-family: Pretend-Bold;
  font-size: 14px;
  color: #007BFF;
  margin-bottom: 12px;
`;

export const QuestionText = styled.Text`
  font-family: Pretend-SemiBold;
  font-size: 14px;
  line-height: 26px;
`;

export const AnswersContainer = styled.View`
  gap: 16px;
`;

export const AnswerOption = styled.TouchableOpacity<{selected?: boolean}>`
  background-color: #f5f5f5;
  border-radius: 16px;
  padding: 16px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  ${(props: {selected?: boolean}) =>
    props.selected ? `border: 1px solid #007BFF;` : "border: 1px solid transparent;"};
`;

export const AnswerText = styled.Text`
  font-family: Pretend-Regular;
  font-size: 14px;
`;
export const BackButton = styled.Text`
  marginRight: 10,
`;
// Calendar styled components
export const CalendarHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

export const CalendarTitle = styled.Text`
  font-family: Pretend-Bold;
  font-size: 14px;
`;

export const CalendarNavigation = styled.View`
  flex-direction: row;
  gap: 12px;
`;

export const WeekdaysContainer = styled.View`
  flex-direction: row;
  justify-content: space-around;
  margin-bottom: 16px;
`;

export const Weekday = styled.Text`
  width: 30px;
  textAlign: center;
  font-family: Pretend-Bold;
  font-size: 10px;
  color: #666;
`;

export const DaysContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  margin-bottom: 20px;
`;

export const DayButton = styled.TouchableOpacity`
  width: 26px;
  height: 22px;
  justify-content: center;
  align-items: center;
  margin: 8px;
`;

export const BlankDay = styled.View`
  width: 26px;
  height: 22px;
  justify-content: center;
  align-items: center;
  margin: 8px;
`;

export const SelectedDay = styled.TouchableOpacity`
  background-color: #007BFF;
  border-radius: 22px;
  width: 42px;
  height: 36px;
  justify-content: center;
  align-items: center;
`;

export const DayText = styled.Text`
  font-size: 14px;
`;

export const SelectedDayText = styled.Text`
  color: #fff;
`;

export const AddButton = styled.TouchableOpacity`
  width: 40px;
  height: 40px;
  justify-content: center;
  align-items: center;
  background-color: #f5f5f5;
  border-radius: 20px;
  margin: 8px;
`;

export const SummaryContainer = styled.View`
  margin-top: 20px;
`;

export const SummaryTitle = styled.Text`
  font-family: Pretend-Bold;
  font-size: 14px;
  margin-bottom: 20px;
`;

export const TransactionContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 20px;
`;

export const TransactionIconGray = styled.View`
  width: 40px;
  height: 40px;
  border-radius: 8px;
  background-color: #f5f5f5;
  justify-content: center;
  align-items: center;
  margin-right: 16px;
`;

export const TransactionIconBlue = styled.View`
  width: 40px;
  height: 40px;
  border-radius: 8px;
  background-color: #007BFF;
  justify-content: center;
  align-items: center;
  margin-right: 16px;
`;

export const TransactionDetails = styled.View`
  flex: 1;
`;

export const TransactionTitle = styled.Text`
  font-family: Pretend-Medium;
  font-size: 14px;
  margin-bottom: 8px;
`;

export const TransactionAmount = styled.Text`
  font-family: Pretend-Regular;
  font-size: 10px;
  color: #666;
`;

export const DevelopedBy = styled.Text`
  textAlign: center;
  color: #666;
  font-size: 10px;
  margin-bottom: 16px;
`;
