import styled from "@emotion/native";
import { Platform, StatusBar, Dimensions } from "react-native";

const { height } = Dimensions.get('window');
const hasNotch = Platform.OS === 'ios' && height > 800;

// 토스 스타일 색상 팔레트 - 더 심플하게
const colors = {
  primary: '#3182F6',
  primaryLight: '#E8F2FF',
  black: '#191F28',
  gray1: '#333D4B',
  gray2: '#4E5968',
  gray3: '#6B7684',
  gray4: '#8B95A1',
  gray5: '#B0B8C1',
  gray6: '#D1D6DB',
  gray7: '#E5E8EB',
  gray8: '#F2F4F6',
  gray9: '#F9FAFB',
  white: '#FFFFFF',
  success: '#00D672',
  error: '#FF5D5D',
  warning: '#FFB800',
};

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${colors.white};
  padding-top: ${Platform.OS === 'ios' 
    ? hasNotch ? '0px' : '0px'
    : `${StatusBar.currentHeight ? StatusBar.currentHeight : 0}px`
  };
`;

export const Header = styled.View`
  margin-top: 40px;
  padding: 20px 20px 24px;
  background-color: ${colors.white};
  font-weight: 700;
`;

export const Title = styled.Text`
  font-family: Pretendard-Bold;
  font-size: 20px;
  color: ${colors.black};
  letter-spacing: -0.5px;
`;

export const Subtitle = styled.Text`
  font-family: Pretendard-Regular;
  font-size: 15px;
  color: ${colors.gray3};
  margin-top: 4px;
  letter-spacing: -0.3px;
  line-height: 22px;
`;

export const OptionsContainer = styled.View`
  flex: 1;
  padding: 0 20px;
`;

export const OptionCard = styled.TouchableOpacity`
  background-color: ${colors.white};
  border-radius: 12px;
  padding: 20px 20px 60px 20px;
  margin-bottom: 12px;
  border: 1px solid ${colors.gray7};
`;

export const OptionContent = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  flex: 1;
`;

export const OptionTitle = styled.Text`
  font-family: Pretendard-SemiBold;
  font-size: 17px;
  color: ${colors.black};
  margin-bottom: 6px;
  letter-spacing: -0.4px;
`;

export const OptionDescription = styled.Text`
  font-family: Pretendard-Regular;
  font-size: 14px;
  color: ${colors.gray3};
  line-height: 20px;
  letter-spacing: -0.3px;
`;

export const Emoji = styled.Image`
  width: 48px;
  height: 48px;
`;

export const Button = styled.TouchableOpacity`
  background-color: ${colors.primary};
  border-radius: 8px;
  padding: 16px;
  align-items: center;
  margin: 0 20px 16px;
`;

export const ButtonText = styled.Text`
  color: ${colors.white};
  font-size: 16px;
  font-family: Pretendard-SemiBold;
  letter-spacing: -0.3px;
`;

export const Footer = styled.View`
  flex-direction: row;
  justify-content: center;
  padding: 20px;
`;

export const FooterText = styled.Text`
  color: ${colors.gray4};
  font-size: 14px;
  font-family: Pretendard-Regular;
`;

export const FooterLink = styled.Text`
  color: ${colors.primary};
  font-size: 14px;
  font-family: Pretendard-Medium;
  margin-left: 4px;
`;

export const Form = styled.View`
  padding: 0 20px;
  margin-top: 24px;
`;

export const InputContainer = styled.View`
  margin-bottom: 16px;
`;

export const Label = styled.Text`
  font-family: Pretendard-Medium;
  font-size: 13px;
  color: ${colors.gray2};
  margin-bottom: 8px;
  letter-spacing: -0.2px;
`;

export const Input = styled.TextInput`
  background-color: ${colors.gray9};
  border-radius: 8px;
  padding: 14px 16px;
  font-size: 16px;
  font-family: Pretendard-Regular;
  color: ${colors.black};
  border: 1px solid ${colors.gray7};
`;

export const PasswordContainer = styled.View`
  flex-direction: row;
  background-color: ${colors.gray9};
  border-radius: 8px;
  align-items: center;
  border: 1px solid ${colors.gray7};
`;

export const PasswordInput = styled.TextInput`
  flex: 1;
  padding: 14px 16px;
  font-size: 16px;
  font-family: Pretendard-Regular;
  color: ${colors.black};
`;

export const EyeIcon = styled.TouchableOpacity`
  padding: 14px;
`;

export const DropdownContainer = styled.TouchableOpacity`
  background-color: ${colors.gray9};
  border-radius: 8px;
  padding: 14px 16px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border: 1px solid ${colors.gray7};
`;

export const DropdownText = styled.Text`
  font-family: Pretendard-Regular;
  font-size: 16px;
  color: ${colors.gray3};
`;

export const ErrorText = styled.Text`
  color: ${colors.error};
  font-size: 13px;
  margin-top: 6px;
  font-family: Pretendard-Regular;
`;

export const HeaderCenter = styled.View`
  align-items: center;
  padding-top: 48px;
  padding-bottom: 32px;
`;

export const SubtitleSmall = styled.Text`
  font-family: Pretendard-Regular;
  font-size: 14px;
  color: ${colors.gray3};
  margin-bottom: 8px;
`;

export const TitleLarge = styled.Text`
  font-family: YClover-Bold;
  font-size: 72px;
  color: ${colors.primary};
  letter-spacing: -1px;
`;

export const FooterRow = styled.View`
  flex-direction: row;
  justify-content: center;
  margin-bottom: 20px;
`;

export const Space = styled.View`
  height: 40px;
`;

export const BalanceContainer = styled.View`
  background-color: ${colors.black};
  border-radius: 12px;
  padding: 24px;
  margin: 0 20px 24px;
`;

export const BalanceHeader = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const PiggyBank = styled.Image`
  width: 40px;
  height: 40px;
`;

export const BalanceInfo = styled.View`
  flex: 1;
  margin-left: 12px;
`;

export const BalanceTitle = styled.Text`
  font-family: Pretendard-Bold;
  font-size: 28px;
  color: ${colors.white};
  letter-spacing: -0.5px;
`;

export const BalanceAmount = styled.Text`
  font-family: Pretendard-Regular;
  font-size: 15px;
  color: ${colors.white};
  opacity: 0.7;
  margin-top: 2px;
`;

export const MenuContainer = styled.View`
  padding: 0 20px;
`;

export const MenuCard = styled.TouchableOpacity`
  background-color: ${colors.white};
  border-radius: 12px;
  padding: 18px 20px;
  margin-bottom: 8px;
  flex-direction: row;
  align-items: center;
  border: 1px solid ${colors.gray8};
`;

export const MenuIconContainer = styled.View`
  width: 52px;
  height: 52px;
  border-radius: 10px;
  background-color: ${colors.gray9};
  justify-content: center;
  align-items: center;
  margin-right: 16px;
`;

export const MenuTextContainer = styled.View`
  flex: 1;
`;

export const MenuTitle = styled.Text`
  font-family: Pretendard-Medium;
  font-size: 16px;
  color: ${colors.black};
  margin-bottom: 2px;
  letter-spacing: -0.3px;
`;

export const MenuDescription = styled.Text`
  font-family: Pretendard-Regular;
  font-size: 14px;
  color: ${colors.gray3};
  letter-spacing: -0.2px;
`;

export const QuizContainer = styled.View`
  flex: 1;
  background-color: ${colors.white};
  padding: 0 20px;
  border-radius: 12px;
`;

export const QuestionContainer = styled.View`
  margin-bottom: 32px;
`;

export const QuestionNumber = styled.Text`
  font-family: Pretendard-Bold;
  font-size: 13px;
  color: ${colors.primary};
  margin-bottom: 12px;
  letter-spacing: -0.2px;
`;

export const QuestionText = styled.Text`
  font-family: Pretendard-Medium;
  font-size: 18px;
  line-height: 28px;
  color: ${colors.black};
  letter-spacing: -0.4px;
`;

export const AnswersContainer = styled.View`
  gap: 8px;
`;

export const AnswerOption = styled.TouchableOpacity<{selected?: boolean}>`
  background-color: ${(props: {selected?: boolean}) =>
    props.selected ? colors.primaryLight : colors.white};
  border-radius: 8px;
  padding: 16px 20px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border: 1px solid ${(props: {selected?: boolean}) =>
    props.selected ? colors.primary : colors.gray7};
`;

export const AnswerText = styled.Text<{selected?: boolean}>`
  font-family: Pretendard-Regular;
  font-size: 15px;
  color: ${(props: {selected?: boolean}) =>
    props.selected ? colors.primary : colors.black};
  letter-spacing: -0.3px;
`;

export const BackButton = styled.Text`
  marginRight: 10px;
`;

// Calendar styled components
export const CalendarHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px 16px;
  background-color: ${colors.white};
`;

export const CalendarTitle = styled.Text`
  font-family: Pretendard-Bold;
  font-size: 18px;
  color: ${colors.black};
  letter-spacing: -0.4px;
`;

export const CalendarNavigation = styled.View`
  flex-direction: row;
  gap: 12px;
`;

export const WeekdaysContainer = styled.View`
  flex-direction: row;
  justify-content: space-around;
  padding: 0 20px 12px;
  background-color: ${colors.white};
`;

export const Weekday = styled.Text`
  width: 40px;
  textAlign: center;
  font-family: Pretendard-Regular;
  font-size: 13px;
  color: ${colors.gray3};
`;

export const DaysContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  padding: 0 20px 20px;
  background-color: ${colors.white};
`;

export const DayButton = styled.TouchableOpacity`
  width: 14.28%;
  height: 44px;
  justify-content: center;
  align-items: center;
`;

export const BlankDay = styled.View`
  width: 14.28%;
  height: 44px;
`;

export const SelectedDay = styled.TouchableOpacity`
  background-color: ${colors.black};
  border-radius: 8px;
  width: 36px;
  height: 36px;
  justify-content: center;
  align-items: center;
  margin: 4px;
`;

export const DayText = styled.Text`
  font-size: 15px;
  font-family: Pretendard-Regular;
  color: ${colors.black};
`;

export const SelectedDayText = styled.Text`
  color: ${colors.white};
  font-family: Pretendard-Medium;
`;

export const AddButton = styled.TouchableOpacity`
  width: 52px;
  height: 52px;
  justify-content: center;
  align-items: center;
  background-color: ${colors.black};
  border-radius: 26px;
  position: absolute;
  bottom: 24px;
  right: 20px;
`;

export const SummaryContainer = styled.View`
  margin: 0 20px 20px;
  background-color: ${colors.gray9};
  border-radius: 12px;
  padding: 20px;
`;

export const SummaryTitle = styled.Text`
  font-family: Pretendard-Medium;
  font-size: 16px;
  color: ${colors.black};
  margin-bottom: 16px;
  letter-spacing: -0.3px;
`;

export const TransactionContainer = styled.View`
  flex-direction: row;
  align-items: center;
  padding-vertical: 12px;
`;

export const TransactionIconGray = styled.View`
  width: 40px;
  height: 40px;
  border-radius: 8px;
  background-color: ${colors.gray8};
  justify-content: center;
  align-items: center;
  margin-right: 12px;
`;

export const TransactionIconBlue = styled.View`
  width: 40px;
  height: 40px;
  border-radius: 8px;
  background-color: ${colors.primary};
  justify-content: center;
  align-items: center;
  margin-right: 12px;
`;

export const TransactionDetails = styled.View`
  flex: 1;
`;

export const TransactionTitle = styled.Text`
  font-family: Pretendard-Regular;
  font-size: 15px;
  color: ${colors.black};
  margin-bottom: 2px;
  letter-spacing: -0.3px;
`;

export const TransactionAmount = styled.Text`
  font-family: Pretendard-Regular;
  font-size: 13px;
  color: ${colors.gray3};
  letter-spacing: -0.2px;
`;

export const DevelopedBy = styled.Text`
  textAlign: center;
  color: ${colors.gray5};
  font-size: 11px;
  margin-bottom: 16px;
  font-family: Pretendard-Regular;
`;

// iOS SafeArea 패딩 처리를 위한 추가 컴포넌트
export const IOSContainer = styled.View`
  flex: 1;
  ${Platform.OS === 'ios' && `
    padding-horizontal: 0px;
    padding-top: ${hasNotch ? '0px' : '0px'};
    padding-bottom: ${hasNotch ? '20px' : '10px'};
  `}
`;

// ScrollView 전용 스타일
export const IOSScrollView = styled.ScrollView`
  flex: 1;
`;
