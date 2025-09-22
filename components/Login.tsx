import React, { useState } from "react";
import {
  Alert,
  Linking,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import {
  login,
  loginWithKakaoAccount,
  getProfile,
} from "@react-native-seoul/kakao-login";

const KAKAO_SCHEME = "kakaotalk://";

interface LoginProps {
  onSuccess?: (nickname: string) => void;
}

export default function LoginScreen({ onSuccess }: LoginProps): JSX.Element {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleKakaoTalkLogin = async (): Promise<void> => {
    try {
      setIsLoading(true);

      const canOpenKakao = await Linking.canOpenURL(KAKAO_SCHEME);
      const token = canOpenKakao
        ? await login()
        : await loginWithKakaoAccount();
      console.log("Kakao login success", token.accessToken);
      try {
        const profile: any = await getProfile();
        const nickname =
          profile?.nickname ||
          profile?.profile?.nickname ||
          profile?.kakaoAccount?.profile?.nickname ||
          "사용자";
        onSuccess && onSuccess(nickname);
      } catch (e) {
        console.warn("Failed to fetch Kakao profile", e);
        onSuccess && onSuccess("사용자");
      }
    } catch (error) {
      console.error("Kakao login failed", error);
      Alert.alert(
        "로그인 실패",
        "일시적인 오류가 발생했습니다. 잠시 후 다시 시도해 주세요."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>보글보글</Text>

      <Pressable
        style={({ pressed }) => [
          styles.kakaoButton,
          pressed ? styles.kakaoButtonPressed : undefined,
        ]}
        disabled={isLoading}
        onPress={handleKakaoTalkLogin}
      >
        <Text style={styles.kakaoText}>
          {isLoading ? "로그인 중..." : "카카오로 로그인"}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
    backgroundColor: "#ffffff",
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    marginBottom: 32,
  },
  kakaoButton: {
    backgroundColor: "#FEE500",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5D400",
    width: 280,
    height: 48,
    paddingHorizontal: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  kakaoButtonPressed: {
    opacity: 0.9,
  },
  kakaoText: {
    color: "#191600",
    fontSize: 16,
    fontWeight: "600",
  },
});
