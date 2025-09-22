import React, { useState } from "react";
import LoginScreen from "./components/Login";
import Onboarding from "./components/Onboarding";
import Success from "./components/Success";

export default function App(): JSX.Element {
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [nickname, setNickname] = useState<string | null>(null);

  const handleOnboardingComplete = () => {
    setShowOnboarding(false);
  };

  if (showOnboarding) {
    return <Onboarding onComplete={handleOnboardingComplete} />;
  }

  if (nickname) {
    return <Success nickname={nickname} />;
  }

  return <LoginScreen onSuccess={setNickname} />;
}
