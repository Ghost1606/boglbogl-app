import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface SuccessProps {
  nickname: string;
}

export default function Success({ nickname }: SuccessProps): JSX.Element {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>로그인 성공!</Text>
      <Text style={styles.subtitle}>{nickname} 님 환영합니다 🎉</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#111111",
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 18,
    color: "#45484D",
    textAlign: "center",
  },
});
