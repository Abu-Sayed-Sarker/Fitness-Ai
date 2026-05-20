import { Ionicons } from "@expo/vector-icons";
import { useRouter, useLocalSearchParams } from "expo-router";
import React, { useRef, useState } from "react";
import {
  NativeSyntheticEvent,
  Text,
  TextInput,
  TextInputKeyPressEventData,
  TouchableOpacity,
  View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { SafeAreaView } from "react-native-safe-area-context";
import { AnimatedButton, FadeSlideIn } from "../../components/Animations";

const VerifyOtp = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const email = (params.email as string) || "yji******@gmail.com";

  // Obfuscate the email if it isn't already
  const getObfuscatedEmail = (emailStr: string) => {
    if (!emailStr.includes("@")) {
      return emailStr;
    }
    const [name, domain] = emailStr.split("@");
    if (name.length <= 3) {
      return `${name}******@${domain}`;
    }
    return `${name.slice(0, 3)}******@${domain}`;
  };

  const displayEmail = getObfuscatedEmail(email);

  const [otp, setOtp] = useState<string[]>(["", "", "", ""]);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const inputRefs = useRef<Array<TextInput | null>>([]);

  const handleChangeText = (text: string, index: number) => {
    // 1. Paste support: text length >= 3 represents a pasted code
    if (text.length >= 3) {
      const cleanedText = text.replace(/[^0-9]/g, "").slice(0, 4);
      if (cleanedText.length > 0) {
        const newOtp = [...otp];
        const startIdx = cleanedText.length === 4 ? 0 : index;
        for (let i = 0; i < cleanedText.length; i++) {
          if (startIdx + i < 4) {
            newOtp[startIdx + i] = cleanedText[i];
          }
        }
        setOtp(newOtp);
        // Focus the last populated cell
        const nextFocusIdx = Math.min(startIdx + cleanedText.length - 1, 3);
        inputRefs.current[nextFocusIdx]?.focus();
      }
      return;
    }

    // 2. Typing over an already populated cell (length === 2)
    if (text.length === 2) {
      const newChar = text[1];
      if (/[0-9]/.test(newChar)) {
        const newOtp = [...otp];
        newOtp[index] = newChar;
        setOtp(newOtp);
        if (index < 3) {
          inputRefs.current[index + 1]?.focus();
        }
      }
      return;
    }

    // 3. Normal typing or deleting (length is 0 or 1)
    const cleaned = text.replace(/[^0-9]/g, "");
    const newOtp = [...otp];
    newOtp[index] = cleaned;
    setOtp(newOtp);

    if (cleaned !== "") {
      if (index < 3) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyPress = (
    e: NativeSyntheticEvent<TextInputKeyPressEventData>,
    index: number,
  ) => {
    if (e.nativeEvent.key === "Backspace") {
      // If current cell is empty, clear the previous cell and move focus back
      if (otp[index] === "" && index > 0) {
        const newOtp = [...otp];
        newOtp[index - 1] = "";
        setOtp(newOtp);
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  const handleVerify = () => {
    const code = otp.join("");
    console.log("Verifying OTP code:", code);
    router.push({
      pathname: "/auth/ResetPasswordScreen",
      params: { email, code },
    });
  };

  const handleResend = () => {
    console.log("Resending OTP...");
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 40 }}
        className="p-4"
        bottomOffset={16}
      >
        {/* Back Button */}
        <TouchableOpacity
          onPress={() => router.back()}
          className="mt-2 self-start"
        >
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>

        {/* Heading */}
        <Text className="text-black text-[28px] font-bold mt-10 text-left">
          OTP Verification
        </Text>

        {/* Subtitle */}
        <Text className="text-gray-500 text-[15px] mt-4 mb-10 text-left leading-[22px]">
          We sent you a one time password on your email{" "}
          <Text className="font-semibold text-gray-700">{displayEmail}</Text>.
          Enter the OTP to complete verify.
        </Text>

        {/* OTP Input Fields */}
        <FadeSlideIn delay={100}>
          <View className="flex-row justify-between mb-6 px-1">
            {otp.map((value, index) => (
              <View
                key={index}
                className={`w-[70px] h-[70px] border rounded-[16px] justify-center items-center bg-white ${
                  focusedIndex === index
                    ? "border-black border-[1.5px]"
                    : "border-gray-300"
                }`}
              >
                <TextInput
                  ref={(ref) => {
                    inputRefs.current[index] = ref;
                  }}
                  className="w-full h-full text-center text-[28px] font-semibold text-gray-800"
                  keyboardType="number-pad"
                  maxLength={4} // Allow longer string for pasting
                  value={value}
                  onChangeText={(text) => handleChangeText(text, index)}
                  onKeyPress={(e) => handleKeyPress(e, index)}
                  onFocus={() => setFocusedIndex(index)}
                  onBlur={() => setFocusedIndex(null)}
                  autoFocus={index === 0}
                  selectTextOnFocus
                />
              </View>
            ))}
          </View>
        </FadeSlideIn>

        {/* Resend and Helper Row */}
        <View className="flex-row justify-between items-center mb-12 px-1">
          <Text className="text-gray-400 text-[14px]">Didn't get OTP?</Text>
          <TouchableOpacity onPress={handleResend}>
            <Text className="text-[#3fa9f5] font-semibold text-[14px]">
              Resend again
            </Text>
          </TouchableOpacity>
        </View>

        {/* Verify Button */}
        <FadeSlideIn delay={200}>
          <AnimatedButton
            onPress={handleVerify}
            className="bg-[#2e3d45] py-4 rounded-xl items-center justify-center self-center w-[180px] shadow-sm active:opacity-90"
            activeScale={0.95}
          >
            <Text className="text-white text-[16px] font-semibold">Verify</Text>
          </AnimatedButton>
        </FadeSlideIn>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default VerifyOtp;
