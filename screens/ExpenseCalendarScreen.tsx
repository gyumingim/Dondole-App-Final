"use client"

import { useState } from "react"
import { View, Text, StyleSheet, TouchableOpacity } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Ionicons } from "@expo/vector-icons"

export default function ExpenseCalendarScreen({ navigation }) {
  const [selectedDate, setSelectedDate] = useState(15)

  // 달력 데이터 생성
  const days = Array.from({ length: 30 }, (_, i) => i + 1)
  const weekdays = ["일", "월", "화", "수", "목", "금", "토"]

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.title}>오늘의 소비</Text>
        <Ionicons name="chevron-down" size={24} color="#333" />
      </View>

      <Text style={styles.subtitle}>고정 지출을 등록/관리해요.</Text>

      <View style={styles.calendarHeader}>
        <Text style={styles.calendarTitle}>2023년 11월</Text>
        <View style={styles.calendarNavigation}>
          <TouchableOpacity>
            <Ionicons name="chevron-back" size={20} color="#007BFF" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="chevron-forward" size={20} color="#007BFF" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.weekdaysContainer}>
        {weekdays.map((day, index) => (
          <Text key={index} style={styles.weekday}>
            {day}
          </Text>
        ))}
      </View>

      <View style={styles.daysContainer}>
        {days.map((day) => (
          <TouchableOpacity
            key={day}
            style={[styles.dayButton, selectedDate === day && styles.selectedDay]}
            onPress={() => setSelectedDate(day)}
          >
            <Text style={[styles.dayText, selectedDate === day && styles.selectedDayText]}>{day}</Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity style={styles.addButton}>
          <Ionicons name="add" size={24} color="#007BFF" />
        </TouchableOpacity>
      </View>

      <View style={styles.summaryContainer}>
        <Text style={styles.summaryTitle}>오늘의 소비 합계: 12000원</Text>

        <View style={styles.transactionContainer}>
          <View style={styles.transactionIconGray}>
            <Ionicons name="list" size={20} color="#999" />
          </View>
          <View style={styles.transactionDetails}>
            <Text style={styles.transactionTitle}>병원</Text>
            <Text style={styles.transactionAmount}>약 4000원</Text>
          </View>
        </View>

        <View style={styles.transactionContainer}>
          <View style={styles.transactionIconBlue}>
            <Ionicons name="wallet" size={20} color="#fff" />
          </View>
          <View style={styles.transactionDetails}>
            <Text style={styles.transactionTitle}>저금</Text>
            <Text style={styles.transactionAmount}>12000원</Text>
          </View>
        </View>

        <View style={styles.transactionContainer}>
          <View style={styles.transactionIconGray}>
            <Ionicons name="fast-food" size={20} color="#999" />
          </View>
          <View style={styles.transactionDetails}>
            <Text style={styles.transactionTitle}>용돈이야 걱어 사먹에서 놀기</Text>
            <Text style={styles.transactionAmount}>약 4000원</Text>
          </View>
        </View>

        <View style={styles.transactionContainer}>
          <View style={styles.transactionIconBlue}>
            <Ionicons name="card" size={20} color="#fff" />
          </View>
          <View style={styles.transactionDetails}>
            <Text style={styles.transactionTitle}>체육대회 편지 쓰기 금액</Text>
            <Text style={styles.transactionAmount}>12000원</Text>
          </View>
        </View>
      </View>

       
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 10,
  },
  backButton: {
    marginRight: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    flex: 1,
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 20,
  },
  calendarHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  calendarTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  calendarNavigation: {
    flexDirection: "row",
    gap: 15,
  },
  weekdaysContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 10,
  },
  weekday: {
    width: 30,
    textAlign: "center",
    fontWeight: "bold",
    color: "#666",
  },
  daysContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    marginBottom: 20,
  },
  dayButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    margin: 2,
  },
  selectedDay: {
    backgroundColor: "#007BFF",
    borderRadius: 20,
  },
  dayText: {
    fontSize: 16,
  },
  selectedDayText: {
    color: "white",
  },
  addButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e0e0e0",
    borderRadius: 20,
    margin: 2,
  },
  summaryContainer: {
    marginTop: 10,
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 15,
  },
  transactionContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  transactionIconGray: {
    width: 40,
    height: 40,
    borderRadius: 5,
    backgroundColor: "#e0e0e0",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  transactionIconBlue: {
    width: 40,
    height: 40,
    borderRadius: 5,
    backgroundColor: "#007BFF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  transactionDetails: {
    flex: 1,
  },
  transactionTitle: {
    fontSize: 16,
    marginBottom: 4,
  },
  transactionAmount: {
    fontSize: 14,
    color: "#666",
  },
  developedBy: {
    textAlign: "center",
    color: "#999",
    fontSize: 12,
    marginTop: "auto",
    marginBottom: 10,
  },
})
