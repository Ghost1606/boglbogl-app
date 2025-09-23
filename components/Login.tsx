import React, { useState } from "react";
import { Alert, Linking, Pressable, StyleSheet, View } from "react-native";
import CustomText from "./CustomText";
import {
  login,
  loginWithKakaoAccount,
  getProfile,
} from "@react-native-seoul/kakao-login";

const KAKAO_SCHEME = "kakaotalk://";

interface LoginProps {
  onSuccess?: (nickname: string, profileImage?: string) => void;
}

export default function LoginScreen({ onSuccess }: LoginProps) {
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
        // console.log("Kakao profile payload:", JSON.stringify(profile));

        const nickname =
          profile?.nickname ||
          profile?.profile?.nickname ||
          profile?.kakaoAccount?.profile?.nickname ||
          profile?.properties?.nickname ||
          "사용자";

        const profileImageCandidateList: Array<string | undefined> = [
          // Newer SDK field names (camelCase)
          profile?.profileImageUrl,
          profile?.thumbnailImageUrl,
          profile?.kakaoAccount?.profile?.profileImageUrl,
          profile?.kakaoAccount?.profile?.thumbnailImageUrl,
          // Snake_case variants sometimes seen in Android payloads
          profile?.profile_image,
          profile?.thumbnail_image,
          profile?.profile?.profile_image_url,
          profile?.profile?.thumbnail_image_url,
          profile?.kakaoAccount?.profile?.profile_image_url,
          profile?.kakaoAccount?.profile?.thumbnail_image_url,
          // Legacy REST API 'properties'
          profile?.properties?.profile_image,
          profile?.properties?.thumbnail_image,
        ];

        const profileImage = profileImageCandidateList.find(
          (u) => typeof u === "string" && u.length > 0
        );

        onSuccess && onSuccess(nickname, profileImage);
      } catch (e) {
        console.warn("Failed to fetch Kakao profile", e);
        onSuccess && onSuccess("사용자");
      }
    } catch (error: any) {
      console.error("Kakao login failed", error);

      // 사용자가 로그인을 취소한 경우 (웹 브라우저를 닫은 경우)
      if (
        error?.message?.includes("user cancelled") ||
        error?.message?.includes("User cancelled") ||
        error?.code === "USER_CANCELLED"
      ) {
        Alert.alert(
          "로그인 취소",
          "로그인이 취소되었습니다. 다시 시도해 주세요.",
          [
            {
              text: "확인",
              style: "default",
            },
          ]
        );
      } else {
        // 기타 오류의 경우
        Alert.alert(
          "로그인 실패",
          "일시적인 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.",
          [
            {
              text: "확인",
              style: "default",
            },
          ]
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <CustomText style={styles.title} bold>
        보글보글
      </CustomText>

      <Pressable
        style={({ pressed }) => [
          styles.kakaoButton,
          pressed ? styles.kakaoButtonPressed : undefined,
        ]}
        disabled={isLoading}
        onPress={handleKakaoTalkLogin}
      >
        <CustomText style={styles.kakaoText}>
          {isLoading ? "로그인 중..." : "카카오로 로그인"}
        </CustomText>
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
  },
});
