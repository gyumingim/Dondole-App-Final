"use client"

import { useState } from "react"
import { View, Text, StyleSheet, TouchableOpacity } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Ionicons } from "@expo/vector-icons"

export default function FinancialQuizScreen({ navigation }) {
  const [selectedAnswer, setSelectedAnswer] = useState(2)

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.title}>4월 30일 금융 퀴즈</Text>
      </View>

      <Text style={styles.subtitle}>오늘의 오윤이 금융 문제를 풀어보세요.</Text>

      <View style={styles.quizContainer}>
        <View style={styles.questionContainer}>
          <Text style={styles.questionNumber}>Q.</Text>
          <Text style={styles.questionText}>
            3000원만 남았는데 4000원인 장난감을 사고 싶어요. 어떻게 하는게 좋을까요?
          </Text>
        </View>

        <View style={styles.answersContainer}>
          <TouchableOpacity
            style={[styles.answerOption, selectedAnswer === 0 && styles.selectedAnswer]}
            onPress={() => setSelectedAnswer(0)}
          >
            <Text style={styles.answerText}>그냥 구매 한다.</Text>
            {selectedAnswer === 0 && <Ionicons name="checkmark" size={24} color="#007BFF" />}
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.answerOption, selectedAnswer === 1 && styles.selectedAnswer]}
            onPress={() => setSelectedAnswer(1)}
          >
            <Text style={styles.answerText}>내일 다시 생각해본다.</Text>
            {selectedAnswer === 1 && <Ionicons name="checkmark" size={24} color="#007BFF" />}
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.answerOption, selectedAnswer === 2 && styles.selectedAnswer]}
            onPress={() => setSelectedAnswer(2)}
          >
            <Text style={styles.answerText}>친구에게 돈을 빌린다.</Text>
            {selectedAnswer === 2 && <Ionicons name="checkmark" size={24} color="#007BFF" />}
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.answerOption, selectedAnswer === 3 && styles.selectedAnswer]}
            onPress={() => setSelectedAnswer(3)}
          >
            <Text style={styles.answerText}>엄마 몰래 구매한다.</Text>
            {selectedAnswer === 3 && <Ionicons name="checkmark" size={24} color="#007BFF" />}
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Dashboard")}>
        <Text style={styles.buttonText}>선택 완료</Text>
      </TouchableOpacity>

       
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
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 30,
  },
  quizContainer: {
    flex: 1,
  },
  questionContainer: {
    marginBottom: 30,
  },
  questionNumber: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#007BFF",
    marginBottom: 10,
  },
  questionText: {
    fontSize: 18,
    lineHeight: 26,
  },
  answersContainer: {
    gap: 15,
  },
  answerOption: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  selectedAnswer: {
    backgroundColor: "#e6f2ff",
    borderColor: "#007BFF",
    borderWidth: 1,
  },
  answerText: {
    fontSize: 16,
  },
  button: {
    backgroundColor: "#007BFF",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
    marginTop: "auto",
    marginBottom: 16,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  developedBy: {
    textAlign: "center",
    color: "#999",
    fontSize: 12,
    marginBottom: 10,
  },
})
