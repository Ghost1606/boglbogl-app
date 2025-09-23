import React, { useState } from "react";
import { useFonts } from "expo-font";
import LoginScreen from "./components/Login";
import Onboarding from "./components/Onboarding";
import Success from "./components/Success";

export default function App() {
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [nickname, setNickname] = useState<string | null>(null);
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const [fontsLoaded] = useFonts({
    "Pretendard-Bold": require("./assets/fonts/Pretendard-Bold.otf"),
    "Pretendard-Medium": require("./assets/fonts/Pretendard-Medium.otf"),
  });

  const handleOnboardingComplete = () => {
    setShowOnboarding(false);
  };

  if (!fontsLoaded) {
    return null; // 폰트가 로드될 때까지 대기
  }

  if (showOnboarding) {
    return <Onboarding onComplete={handleOnboardingComplete} />;
  }

  if (nickname) {
    return (
      <Success nickname={nickname} profileImage={profileImage || undefined} />
    );
  }

  return (
    <LoginScreen
      onSuccess={(nickname, profileImage) => {
        setNickname(nickname);
        setProfileImage(profileImage || null);
      }}
    />
  );
}
