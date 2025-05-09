import React, { useEffect, useState } from "react";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";

import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { StatusBar } from "expo-status-bar"
import { SafeAreaProvider } from "react-native-safe-area-context"
import { ThemeProvider } from "styled-components/native";
import { theme } from "./components/theme";

// Screens
import StartScreen from "./screens/StartScreen"
import LoginScreen from "./screens/LoginScreen"
import SignupScreen from "./screens/SignupScreen"
import DashboardScreen from "./screens/DashboardScreen"
import ExpenseRegistrationScreen from "./screens/ExpenseRegistrationScreen"
import ExpenseCalendarScreen from "./screens/ExpenseCalendarScreen"
import FinancialQuizScreen from "./screens/FinancialQuizScreen"
import DonationRegistrationScreen from "./screens/DonationRegistrationScreen"
import DonationCalendarScreen from "./screens/DonationCalendarScreen"

const Stack = createNativeStackNavigator()

export default function App() {

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    async function loadAssets() {
      await Font.loadAsync({
        "Pretend-Regular": require("./assets/fonts/Pretendard-Regular.otf"),
        "Pretend-Medium": require("./assets/fonts/Pretendard-Medium.otf"),
        "Pretend-Bold": require("./assets/fonts/Pretendard-Bold.otf"),
        "Pretend-Black": require("./assets/fonts/Pretendard-Black.otf"),
        "Pretend-ExtraBold": require("./assets/fonts/Pretendard-ExtraBold.otf"),
        "Pretend-ExtraLight": require("./assets/fonts/Pretendard-ExtraLight.otf"),
        "Pretend-Light": require("./assets/fonts/Pretendard-Light.otf"),
        "Pretend-SemiBold": require("./assets/fonts/Pretendard-SemiBold.otf"),
        "YClover-Bold": require("./assets/fonts/YClover-Bold.otf"),
      });
      await SplashScreen.hideAsync();
      setLoaded(true);
    }
    loadAssets();
  }, []);

  if (!loaded) return null;

  return (
    <ThemeProvider theme={theme}>
      <SafeAreaProvider>
        <NavigationContainer>
          <StatusBar style="auto" />
          <Stack.Navigator
            initialRouteName="Start"
            screenOptions={{
              headerShown: false,
              contentStyle: { backgroundColor: "#f5f5f5" },
            }}
          >
            <Stack.Screen name="Start" component={StartScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Signup" component={SignupScreen} />
            <Stack.Screen name="Dashboard" component={DashboardScreen} />
            <Stack.Screen name="ExpenseRegistration" component={ExpenseRegistrationScreen} />
            <Stack.Screen name="ExpenseCalendar" component={ExpenseCalendarScreen} />
            <Stack.Screen name="FinancialQuiz" component={FinancialQuizScreen} />
            <Stack.Screen name="DonationRegistration" component={DonationRegistrationScreen} />
            <Stack.Screen name="DonationCalendar" component={DonationCalendarScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </ThemeProvider>
  )
}
