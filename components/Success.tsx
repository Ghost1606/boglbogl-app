import React from "react";
import { StyleSheet, View, Image } from "react-native";
import CustomText from "./CustomText";

interface SuccessProps {
  nickname: string;
  profileImage?: string;
}

export default function Success({ nickname, profileImage }: SuccessProps) {
  console.log("Success profileImage URI:", profileImage);
  const { width, height } = require("react-native").useWindowDimensions();
  const base = Math.min(width, height);
  const avatarSize = Math.max(36, Math.round(base * 0.12));

  return (
    <View style={styles.container}>
      {profileImage && (
        <Image
          source={{ uri: profileImage }}
          style={[
            styles.profileImage,
            {
              width: avatarSize,
              height: avatarSize,
              borderRadius: avatarSize / 2,
            },
          ]}
          resizeMode="cover"
          onError={(e) => {
            console.warn(
              "Failed to load profile image",
              profileImage,
              e?.nativeEvent?.error
            );
          }}
        />
      )}
      <CustomText style={styles.title} bold>
        로그인 성공!
      </CustomText>
      <CustomText style={styles.subtitle}>
        {nickname} 님 환영합니다 🎉
      </CustomText>
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
    color: "#111111",
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 18,
    color: "#45484D",
    textAlign: "center",
  },
  profileImage: {
    position: "absolute",
    top: 20,
    left: 20,
  },
});
