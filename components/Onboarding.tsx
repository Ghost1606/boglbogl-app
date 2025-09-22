import React, { useMemo, useRef, useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  ScrollView,
  NativeSyntheticEvent,
  NativeScrollEvent,
  useWindowDimensions,
  Dimensions,
} from "react-native";

interface OnboardingProps {
  onComplete: () => void;
}

export default function Onboarding({
  onComplete,
}: OnboardingProps): JSX.Element {
  const { width } = useWindowDimensions();
  const [index, setIndex] = useState<number>(0);
  const scrollRef = useRef<ScrollView | null>(null);

  const pages = useMemo(
    () => [
      {
        key: "intro",
        emoji: "🫧",
        title: "보글보글",
        subtitle: "새로운 경험의 시작",
        desc: "간단하고 직관적인 인터페이스로\n모든 기능을 쉽게 이용해보세요.",
        gradient: ["#667eea", "#764ba2"],
        accent: "#667eea",
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
    if (i !== index) setIndex(i);
  };

  const goTo = (i: number) => {
    scrollRef.current?.scrollTo({ x: i * width, animated: true });
    setIndex(i);
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
            <View
              style={[
                styles.gradientBackground,
                { backgroundColor: p.gradient[0] },
              ]}
            >
              <View style={styles.content}>
                <View
                  style={[
                    styles.iconContainer,
                    { backgroundColor: p.accent + "20" },
                  ]}
                >
                  <Text style={styles.iconText}>{p.emoji}</Text>
                </View>

                <View style={styles.textContainer}>
                  <Text style={styles.title}>{p.title}</Text>
                  <Text style={styles.subtitle}>{p.subtitle}</Text>
                  <Text style={styles.desc}>{p.desc}</Text>
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
            <Text
              style={[
                styles.navIcon,
                index === 0 ? styles.navIconDisabled : undefined,
              ]}
            >
              ‹
            </Text>
          </Pressable>

          {index === pages.length - 1 ? (
            <Pressable
              style={({ pressed }) => [
                styles.startCenterButton,
                { backgroundColor: pages[index].accent },
                pressed ? styles.navButtonPressed : undefined,
              ]}
              onPress={onComplete}
            >
              <Text style={styles.startCenterText}>시작</Text>
            </Pressable>
          ) : (
            <View style={styles.centerSpacer} />
          )}

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
              <Text style={styles.navIcon}>›</Text>
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
    paddingTop: 60,
    paddingBottom: 40,
  },
  content: {
    flex: 1,
    paddingHorizontal: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 40,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 8,
  },
  iconText: {
    fontSize: 48,
  },
  textContainer: {
    alignItems: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: "800",
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 12,
    textShadowColor: "rgba(0, 0, 0, 0.1)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "rgba(255, 255, 255, 0.9)",
    textAlign: "center",
    marginBottom: 20,
  },
  desc: {
    fontSize: 16,
    lineHeight: 24,
    color: "rgba(255, 255, 255, 0.8)",
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
    borderRadius: 30,
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
    fontSize: 24,
    fontWeight: "700",
    lineHeight: 24,
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
    fontWeight: "700",
  },
});
