import React, { useMemo, useRef, useState } from "react";
import {
  Pressable,
  StyleSheet,
  View,
  ScrollView,
  NativeSyntheticEvent,
  NativeScrollEvent,
  useWindowDimensions,
  Dimensions,
  Image,
  Animated,
} from "react-native";
import CustomText from "./CustomText";

interface OnboardingProps {
  onComplete: () => void;
}

export default function Onboarding({ onComplete }: OnboardingProps) {
  const { width } = useWindowDimensions();
  const [index, setIndex] = useState<number>(0);
  const [isPeopleSmiling, setIsPeopleSmiling] = useState<boolean>(false);
  const scrollRef = useRef<ScrollView | null>(null);
  const buttonOpacity = useRef(new Animated.Value(0.6)).current;

  const pages = useMemo(
    () => [
      {
        key: "communication",
        emoji: "📱",
        title: "의사소통",
        subtitle: "새로운 사람들과 소통",
        desc: "커뮤니티 뉴스에 대해\n채팅해보세요.",
        gradient: ["#FFE5B4", "#FFB347"],
        accent: "#FF8C00",
        peopleIcon: true,
      },
      {
        key: "kakao",
        emoji: "💛",
        title: "간편한 로그인",
        subtitle: "카카오로 빠르게",
        desc: "카카오톡이 있으면 앱으로,\n없으면 웹으로 자동 전환됩니다.",
        gradient: ["#f093fb", "#f5576c"],
        accent: "#f5576c",
      },
      {
        key: "privacy",
        emoji: "🔒",
        title: "안전한 사용",
        subtitle: "개인정보 보호",
        desc: "최소한의 권한만 요청하고\n안전하게 관리합니다.",
        gradient: ["#4facfe", "#00f2fe"],
        accent: "#4facfe",
      },
    ],
    []
  );

  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const x = e.nativeEvent.contentOffset.x;
    const i = Math.round(x / width);
    if (i !== index) {
      setIndex(i);
      // 버튼 애니메이션
      Animated.timing(buttonOpacity, {
        toValue: i === pages.length - 1 ? 1 : 0.6,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  };

  const goTo = (i: number) => {
    scrollRef.current?.scrollTo({ x: i * width, animated: true });
    setIndex(i);
    // 버튼 애니메이션
    Animated.timing(buttonOpacity, {
      toValue: i === pages.length - 1 ? 1 : 0.6,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
        scrollEventThrottle={16}
        contentContainerStyle={{ alignItems: "center" }}
      >
        {pages.map((p) => (
          <View key={p.key} style={[styles.slide, { width }]}>
            <View style={styles.gradientBackground}>
              <View style={styles.content}>
                <View style={styles.iconContainer}>
                  {p.peopleIcon ? (
                    <Pressable
                      onPress={() => setIsPeopleSmiling(!isPeopleSmiling)}
                      style={styles.peopleImageContainer}
                    >
                      <Image
                        source={
                          isPeopleSmiling
                            ? require("../assets/onboarding/people-smile.png")
                            : require("../assets/onboarding/people.png")
                        }
                        style={styles.peopleImage}
                        resizeMode="contain"
                      />
                    </Pressable>
                  ) : (
                    <CustomText style={styles.iconText}>{p.emoji}</CustomText>
                  )}
                </View>

                <View style={styles.textContainer}>
                  <CustomText style={styles.title} bold>
                    {p.title}
                  </CustomText>
                  <CustomText style={styles.subtitle}>{p.subtitle}</CustomText>
                  <CustomText style={styles.desc}>{p.desc}</CustomText>
                </View>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>

      <View style={styles.bottomContainer}>
        <View style={styles.pagination}>
          {pages.map((_, i) => (
            <Pressable
              key={i}
              onPress={() => goTo(i)}
              style={[
                styles.dot,
                index === i
                  ? [styles.dotActive, { backgroundColor: pages[index].accent }]
                  : undefined,
              ]}
            />
          ))}
        </View>

        <View style={styles.navBar}>
          <Pressable
            style={({ pressed }) => [
              styles.navButton,
              pressed ? styles.navButtonPressed : undefined,
              index === 0 ? styles.navButtonDisabled : undefined,
            ]}
            disabled={index === 0}
            onPress={() => goTo(Math.max(0, index - 1))}
          >
            <CustomText
              style={[
                styles.navIcon,
                index === 0 ? styles.navIconDisabled : undefined,
              ]}
              bold
            >
              ‹
            </CustomText>
          </Pressable>

          <Animated.View style={{ opacity: buttonOpacity }}>
            <Pressable
              style={({ pressed }) => [
                styles.startCenterButton,
                {
                  backgroundColor:
                    index === pages.length - 1
                      ? pages[index].accent
                      : "#E5E7EB",
                },
                pressed ? styles.navButtonPressed : undefined,
              ]}
              disabled={index !== pages.length - 1}
              onPress={index === pages.length - 1 ? onComplete : undefined}
            >
              <CustomText
                style={[
                  styles.startCenterText,
                  { color: index === pages.length - 1 ? "#FFFFFF" : "#9CA3AF" },
                ]}
                bold
              >
                {index === pages.length - 1 ? "시작" : "다음"}
              </CustomText>
            </Pressable>
          </Animated.View>

          {index === pages.length - 1 ? (
            <View style={[styles.navButton, styles.navButtonDisabled]} />
          ) : (
            <Pressable
              style={({ pressed }) => [
                styles.navButton,
                { backgroundColor: pages[index].accent },
                pressed ? styles.navButtonPressed : undefined,
              ]}
              onPress={() => goTo(index + 1)}
            >
              <CustomText style={styles.navIcon} bold>
                ›
              </CustomText>
            </Pressable>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  slide: {
    flex: 1,
  },
  gradientBackground: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingTop: 60,
    paddingBottom: 40,
  },
  content: {
    flex: 1,
    paddingHorizontal: 32,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 80,
  },
  iconContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 100,
  },
  iconText: {
    fontSize: 48,
  },
  textContainer: {
    alignItems: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 32,
    color: "#1F2937",
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: "#6B7280",
    textAlign: "center",
    marginBottom: 16,
  },
  desc: {
    fontSize: 15,
    lineHeight: 22,
    color: "#9CA3AF",
    textAlign: "center",
  },
  bottomContainer: {
    paddingHorizontal: 32,
    paddingBottom: 40,
    paddingTop: 20,
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 32,
    gap: 12,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#E5E7EB",
  },
  dotActive: {
    width: 24,
    height: 8,
    borderRadius: 4,
  },
  navBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  centerSpacer: {
    width: 60,
    height: 60,
  },
  navButton: {
    width: 60,
    height: 60,
    borderRadius: 12,
    backgroundColor: "#F3F4F6",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  navButtonPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.95 }],
  },
  navButtonDisabled: {
    backgroundColor: "#F9FAFB",
    opacity: 0.5,
  },
  navIcon: {
    color: "#FFFFFF",
    fontSize: 32,
    lineHeight: 32,
  },
  navIconDisabled: {
    color: "#9CA3AF",
  },
  startCenterButton: {
    minWidth: 120,
    height: 60,
    paddingHorizontal: 20,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  startCenterText: {
    color: "#FFFFFF",
    fontSize: 18,
  },
  phoneContainer: {
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  phone: {
    width: 80,
    height: 140,
    backgroundColor: "#87CEEB",
    borderRadius: 20,
    padding: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  phoneScreen: {
    flex: 1,
    backgroundColor: "#FFE55C",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  alertIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#FF4444",
    alignItems: "center",
    justifyContent: "center",
  },
  alertText: {
    color: "#FFFFFF",
    fontSize: 16,
  },
  phoneHome: {
    width: 30,
    height: 4,
    backgroundColor: "#87CEEB",
    borderRadius: 2,
    marginTop: 8,
    alignSelf: "center",
  },
  alertLines: {
    position: "absolute",
    right: -20,
    top: 20,
    flexDirection: "column",
    gap: 2,
  },
  alertLine: {
    width: 8,
    height: 2,
    backgroundColor: "#333333",
    borderRadius: 1,
  },
  peopleImageContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  peopleImage: {
    width: 400,
    height: 400,
  },
});
