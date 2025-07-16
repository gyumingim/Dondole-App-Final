import React, { useEffect, useState } from "react";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";

import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { StatusBar } from "expo-status-bar"
import { SafeAreaProvider } from "react-native-safe-area-context"
import { initAuth } from "./utils/api";

// Screens
import StartScreen from "./screens/StartScreen"
import LoginScreen from "./screens/LoginScreen"
import ParentSignupScreen from "./screens/parent/ParentSignupScreen"
import ChildSignupScreen from "./screens/child/ChildSignupScreen"
import ParentDashboardScreen from "./screens/parent/ParentDashboardScreen"
import ParentChildSelectionScreen from "./screens/parent/ParentChildSelectionScreen"
import ParentChildConnectionScreen from "./screens/parent/ParentChildConnectionScreen"
import ParentQuizHistoryScreen from "./screens/parent/ParentQuizHistoryScreen"
import ParentQuizDetailScreen from "./screens/parent/ParentQuizDetailScreen"
import ParentQuizFeedbackScreen from "./screens/parent/ParentQuizFeedbackScreen"
import ParentFixedExpenseScreen from "./screens/parent/ParentFixedExpenseScreen"
import ParentExpenseScreen from "./screens/parent/ParentExpenseScreen"
import ParentDailyFeedbackScreen from "./screens/parent/ParentDailyFeedbackScreen"
import ParentWeeklyFeedbackScreen from "./screens/parent/ParentWeeklyFeedbackScreen"
import ParentFeedbackDetailScreen from "./screens/parent/ParentFeedbackDetailScreen"
import ChildDashboardScreen from "./screens/child/ChildDashboardScreen"

import TodayRegistrationScreen from "./screens/TodayRegistrationScreen"
import TodayCalendarScreen from "./screens/TodayCalendarScreen"
import FinancialQuizScreen from "./screens/FinancialQuizScreen"
import DonationRegistrationScreen from "./screens/DonationRegistrationScreen"
import DonationCalendarScreen from "./screens/DonationCalendarScreen"
import QuizFeedbackScreen from "./screens/QuizFeedbackScreen"

const Stack = createNativeStackNavigator()

export default function App() {

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    async function loadAssets() {

      await initAuth();
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
        "YClover-Regular" : require("./assets/fonts/YClover-Regular.otf"),
      });
      await SplashScreen.hideAsync();
      setLoaded(true);
    }
    loadAssets();
  }, []);

  if (!loaded) return null;

  return (
      <SafeAreaProvider>
        <NavigationContainer>
          <StatusBar style="auto" />
          <Stack.Navigator
            initialRouteName="Login"
            screenOptions={{
              headerShown: false,
              contentStyle: { backgroundColor: "#f5f5f5" },
            }}
          >
            <Stack.Screen name="Start" component={StartScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="ParentSignup" component={ParentSignupScreen} />
            <Stack.Screen name="ChildSignup" component={ChildSignupScreen} />
            <Stack.Screen name="ParentChildSelection" component={ParentChildSelectionScreen} />
            <Stack.Screen name="ParentChildConnection" component={ParentChildConnectionScreen} />
            <Stack.Screen name="ParentQuizHistory" component={ParentQuizHistoryScreen} />
            <Stack.Screen name="ParentQuizDetail" component={ParentQuizDetailScreen} />
            <Stack.Screen name="ParentQuizFeedback" component={ParentQuizFeedbackScreen} />
            <Stack.Screen name="ParentFixedExpense" component={ParentFixedExpenseScreen} />
            <Stack.Screen name="ParentExpense" component={ParentExpenseScreen} />
            <Stack.Screen name="ParentDailyFeedback" component={ParentDailyFeedbackScreen} />
            <Stack.Screen name="ParentWeeklyFeedback" component={ParentWeeklyFeedbackScreen} />
            <Stack.Screen name="ParentFeedbackDetail" component={ParentFeedbackDetailScreen} />
            <Stack.Screen name="ParentDashboard" component={ParentDashboardScreen} />
            <Stack.Screen name="ChildDashboard" component={ChildDashboardScreen} />

            <Stack.Screen name="DailyFeedbackPage1" component={require('./screens/child/DailyFeedbackPage1').default} />
            <Stack.Screen name="DailyFeedbackPage2" component={require('./screens/child/DailyFeedbackPage2').default} />
            <Stack.Screen name="WeeklyFeedbackPage1" component={require('./screens/child/WeeklyFeedbackPage1').default} />
            <Stack.Screen name="WeeklyFeedbackPage2" component={require('./screens/child/WeeklyFeedbackPage2').default} />
            <Stack.Screen name="Dashboard" component={ChildDashboardScreen} />
            <Stack.Screen name="TodayRegistration" component={TodayRegistrationScreen} />
            <Stack.Screen name="TodayCalendar" component={TodayCalendarScreen} />
            <Stack.Screen name="FinancialQuiz" component={FinancialQuizScreen} />
            <Stack.Screen name="DonationRegistration" component={DonationRegistrationScreen} />
            <Stack.Screen name="DonationCalendar" component={DonationCalendarScreen} />
            <Stack.Screen name="QuizFeedback" component={QuizFeedbackScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
  )
}
