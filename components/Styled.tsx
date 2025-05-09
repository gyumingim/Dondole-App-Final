import styled from "styled-components/native";
import { theme } from "./theme";

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${theme.colors.background};
  padding: ${theme.spacing.xl}px;
  padding-top: ${theme.spacing.xxxl}px;
  justify-content: space-between;
`;

export const Header = styled.View`
  margin-top: ${theme.spacing.md}px;
  margin-bottom: ${theme.spacing.xl}px;
`;

export const Title = styled.Text`
  font-family: ${theme.fonts.bold};
  font-size: ${theme.fontSizes.title}px;
  margin-bottom: ${theme.spacing.xs}px;
`;

export const Subtitle = styled.Text`
  font-family: ${theme.fonts.regular};
  font-size: ${theme.fontSizes.subtitle}px;
  color: ${theme.colors.textLight};
`;

export const OptionsContainer = styled.View`
  flex: 1;
  gap: ${theme.spacing.sm}px;
`;

export const OptionCard = styled.TouchableOpacity`
  background-color: ${theme.colors.white};
  border-radius: ${theme.borderRadius.sm}px;
  padding: ${theme.spacing.md}px;
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
  font-family: ${theme.fonts.medium};
  font-size: ${theme.fontSizes.body}px;
  margin-bottom: ${theme.spacing.sm}px;
`;

export const OptionDescription = styled.Text`
  font-family: ${theme.fonts.medium};
  font-size: ${theme.fontSizes.small}px;
  color: ${theme.colors.textLight};
  line-height: 16px;
`;

export const Emoji = styled.Image`
  margin-top: auto;
  width: 80px;
  height: 80px;
`;

export const Button = styled.TouchableOpacity`
  background-color: ${theme.colors.primary};
  border-radius: ${theme.borderRadius.md}px;
  padding: ${theme.spacing.sm}px;
  align-items: center;
  margin-vertical: ${theme.spacing.sm}px;
`;

export const ButtonText = styled.Text`
  color: ${theme.colors.white};
  font-size: ${theme.fontSizes.body}px;
  font-family: ${theme.fonts.medium};
`;

export const Footer = styled.View`
  flex-direction: row;
  justify-content: center;
`;

export const FooterText = styled.Text`
  color: ${theme.colors.textLight};
  font-size: ${theme.fontSizes.small}px;
`;

export const FooterLink = styled.Text`
  color: ${theme.colors.primary};
  font-size: ${theme.fontSizes.small}px;
  font-family: ${theme.fonts.medium};
  margin-left: ${theme.spacing.xs}px;
`;

export const Form = styled.View`
  margin-bottom: ${theme.spacing.xl}px;
`;

export const InputContainer = styled.View`
  margin-bottom: ${theme.spacing.lg}px;
`;

export const Label = styled.Text`
  font-family: ${theme.fonts.medium};
  font-size: ${theme.fontSizes.subtitle}px;
  color: ${theme.colors.textDark};
  margin-bottom: ${theme.spacing.xs}px;
`;

export const Input = styled.TextInput`
  background-color: ${theme.colors.white};
  border-radius: ${theme.borderRadius.md}px;
  padding: ${theme.spacing.md}px;
  font-size: ${theme.fontSizes.subtitle}px;
`;

export const PasswordContainer = styled.View`
  flex-direction: row;
  background-color: ${theme.colors.white};
  border-radius: ${theme.borderRadius.md}px;
  align-items: center;
`;

export const PasswordInput = styled.TextInput`
  flex: 1;
  padding: ${theme.spacing.md}px;
  font-size: ${theme.fontSizes.subtitle}px;
`;

export const EyeIcon = styled.TouchableOpacity`
  padding: ${theme.spacing.sm}px;
`;

export const DropdownContainer = styled.TouchableOpacity`
  background-color: ${theme.colors.white};
  border-radius: ${theme.borderRadius.md}px;
  padding: ${theme.spacing.md}px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const DropdownText = styled.Text`
  font-family: ${theme.fonts.regular};
  font-size: ${theme.fontSizes.subtitle}px;
  color: ${theme.colors.textLight};
`;

export const ErrorText = styled.Text`
  color: red;
  font-size: ${theme.fontSizes.small}px;
  margin-top: ${theme.spacing.xs}px;
`;

export const HeaderCenter = styled.View`
  align-items: center;
  margin-top: ${theme.spacing.xl}px;
  margin-bottom: ${theme.spacing.xl}px;
`;

export const SubtitleSmall = styled.Text`
  font-family: ${theme.fonts.regular};
  font-size: ${theme.fontSizes.body}px;
  color: ${theme.colors.textLight};
  margin-bottom: ${theme.spacing.sm}px;
  margin-top: ${theme.spacing.xxl}px;
`;

export const TitleLarge = styled.Text`
  font-family: ${theme.fonts.clovar};
  font-size: 56px; /* 고정값 그대로 사용 */
  color: ${theme.colors.primary};
`;

export const FooterRow = styled.View`
  flex-direction: row;
  justify-content: center;
  margin-bottom: ${theme.spacing.lg}px;
`;

export const Space = styled.View`
  height: ${theme.spacing.xxxl}px;
`;

export const BalanceContainer = styled.View`
  border-radius: ${theme.borderRadius.md}px;
  padding: ${theme.spacing.lg}px;
`;

export const BalanceHeader = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const PiggyBank = styled.Image`
  width: 50px;
  height: 70px;
  margin-right: ${theme.spacing.md}px;
`;

export const BalanceInfo = styled.View``;

export const BalanceTitle = styled.Text`
  font-family: ${theme.fonts.bold};
  font-size: ${theme.fontSizes.title}px;
  margin-bottom: ${theme.spacing.xs}px;
`;

export const BalanceAmount = styled.Text`
  font-family: ${theme.fonts.semiBold};
  font-size: ${theme.fontSizes.amount}px;
`;

export const MenuContainer = styled.View`
  gap: ${theme.spacing.md}px;
`;

export const MenuCard = styled.TouchableOpacity`
  background-color: ${theme.colors.white};
  border-radius: ${theme.borderRadius.lg}px;
  padding: ${theme.spacing.lg}px;
  flex-direction: row;
  align-items: center;
`;

export const MenuIconContainer = styled.View`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  background-color: ${theme.colors.background};
  justify-content: center;
  align-items: center;
  margin-right: ${theme.spacing.md}px;
`;

export const MenuTextContainer = styled.View`
  flex: 1;
`;

export const MenuTitle = styled.Text`
  font-family: ${theme.fonts.medium};
  font-size: ${theme.fontSizes.body}px;
  margin-bottom: ${theme.spacing.xxs}px;
`;

export const MenuDescription = styled.Text`
  font-family: ${theme.fonts.regular};
  font-size: ${theme.fontSizes.small}px;
  color: ${theme.colors.textLight};
`;
