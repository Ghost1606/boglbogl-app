import React from "react";
import { StyleSheet, View, Image, TouchableOpacity } from "react-native";
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
      {/* Header with notification and settings icons */}
      <View style={styles.header}>
        <View style={styles.headerLeft} />
        <View style={styles.headerRight}>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => console.log("Notification pressed")}
          >
            <CustomText style={styles.iconText}>🔔</CustomText>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => console.log("Settings pressed")}
          >
            <CustomText style={styles.iconText}>⚙️</CustomText>
          </TouchableOpacity>
        </View>
      </View>

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
      <View style={styles.greetingContainer}>
        <CustomText style={styles.greeting}>안녕하세요!</CustomText>
        <CustomText style={styles.greetingName}>{nickname}님</CustomText>
      </View>

      {/* Menu buttons */}
      <View style={styles.menuContainer}>
        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => console.log("단어 버튼 클릭")}
        >
          <CustomText style={styles.menuButtonText}>단어</CustomText>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => console.log("스피드런 버튼 클릭")}
        >
          <CustomText style={styles.menuButtonText}>스피드런</CustomText>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => console.log("도감 버튼 클릭")}
        >
          <CustomText style={styles.menuButtonText}>도감</CustomText>
        </TouchableOpacity>
      </View>
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
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 60,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 10,
    zIndex: 10,
  },
  headerLeft: {
    flex: 1,
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconButton: {
    padding: 8,
    marginLeft: 12,
  },
  iconText: {
    fontSize: 20,
  },
  greetingContainer: {
    position: "absolute",
    top: 90,
    left: 20,
    alignItems: "flex-start",
  },
  greeting: {
    fontSize: 24,
    color: "#111111",
    textAlign: "left",
    fontWeight: "bold",
  },
  greetingName: {
    fontSize: 24,
    color: "#111111",
    textAlign: "left",
    marginTop: 4,
  },
  profileImage: {
    position: "absolute",
    top: 20,
    left: 20,
  },
  menuContainer: {
    position: "absolute",
    bottom: 100,
    left: 20,
    right: 20,
    flexDirection: "column",
    justifyContent: "flex-start",
    gap: 12,
  },
  menuButton: {
    backgroundColor: "#F5F5F5",
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    width: "100%",
    alignItems: "center",
  },
  menuButtonText: {
    fontSize: 16,
    color: "#111111",
    fontWeight: "600",
  },
});
