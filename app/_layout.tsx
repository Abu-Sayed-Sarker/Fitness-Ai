import { Stack } from "expo-router";
import { KeyboardProvider } from "react-native-keyboard-controller";
import "../global.css";

export default function RootLayout() {
  return (
    <KeyboardProvider>
      <Stack>
        <Stack.Screen name="SplashScreenOne" options={{ headerShown: false }} />
        <Stack.Screen
          name="(on-boarding)/SplashScreenTow"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="auth/SignUpScreen"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="auth/CompleteProfileScreen"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="auth/SignInScreen"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="auth/ForgotPassword"
          options={{ headerShown: false }}
        />
        <Stack.Screen name="auth/VerifyOtp" options={{ headerShown: false }} />
        <Stack.Screen
          name="auth/ResetPasswordScreen"
          options={{ headerShown: false }}
        />

        <Stack.Screen name="main" options={{ headerShown: false }} />
      </Stack>
    </KeyboardProvider>
  );
}
