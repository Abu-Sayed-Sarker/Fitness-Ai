import {
  AntDesign,
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Dimensions,
  ImageBackground,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import bgImage from "../../assets/images/main-screen/Rectangle 5815.png";
import {
  AnimatedButton,
  FadeSlideIn,
  SpringFadeIn,
} from "../../components/Animations";

const { height } = Dimensions.get("window");

export default function SignUpScreen() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const router = useRouter();

  const onSubmit = () => {
    console.log("Data", {
      email,
      password,
      confirmPassword,
    });
    router.push("/auth/CompleteProfileScreen");
  };

  return (
    <View className="flex-1 bg-white">
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />

      <KeyboardAwareScrollView
        className="flex-1"
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        bottomOffset={16}
      >
        <ImageBackground
          source={bgImage}
          className="w-full justify-end items-center pb-10"
          style={{ height: height * 0.42 }}
          resizeMode="cover"
        >
          {/* dark overlay */}
          <View className="absolute inset-0 bg-[#2e3d45]/65" />

          <SpringFadeIn
            translateYStart={-28}
            damping={14}
            stiffness={90}
            style={{ alignItems: "center" }}
          >
            <Text
              className="text-white text-[28px] text-center tracking-[4px]"
              style={{ fontFamily: "serif", fontWeight: "400" }}
            >
              Kevin Orellana
            </Text>
            <Text className="text-white/80 text-[10px] tracking-[4px] text-center mt-1 uppercase">
              Health &amp; Fitness App
            </Text>
          </SpringFadeIn>
        </ImageBackground>

        {/* ── White card ─────────────────────────────────────────────────── */}
        <SpringFadeIn
          delay={350}
          translateYStart={70}
          damping={16}
          stiffness={80}
          style={{
            flex: 1,
            backgroundColor: "#ffffff",
            borderTopLeftRadius: 28,
            borderTopRightRadius: 28,
            marginTop: -24,
            paddingHorizontal: 28,
            paddingTop: 32,
            paddingBottom: 40,
          }}
        >
          {/* Heading */}
          <FadeSlideIn delay={500}>
            <Text className="text-gray-500 text-[15px]">Hey there,</Text>
            <Text className="text-black text-[22px] font-bold mt-0.5 mb-7">
              Create your account
            </Text>
          </FadeSlideIn>

          {/* ── Email field ── */}
          <FadeSlideIn delay={620}>
            <View className="flex-row items-center border-b border-gray-200 pb-3 mb-5">
              <Ionicons
                name="mail-outline"
                size={18}
                color="#a0aec0"
                style={{ marginRight: 8 }}
              />
              <TextInput
                className="flex-1 text-gray-700 text-[15px]"
                placeholder="Enter Your Email"
                placeholderTextColor="#a0aec0"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
              />
            </View>
          </FadeSlideIn>

          {/* ── Password field ── */}
          <FadeSlideIn delay={740}>
            <View className="flex-row items-center border-b border-gray-200 pb-3 mb-5">
              <MaterialCommunityIcons
                name="key-outline"
                size={18}
                color="#a0aec0"
                style={{ marginRight: 8 }}
              />
              <TextInput
                className="flex-1 text-gray-700 text-[15px]"
                placeholder="Create Password"
                placeholderTextColor="#a0aec0"
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={setPassword}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Ionicons
                  name={showPassword ? "eye-outline" : "eye-off-outline"}
                  size={18}
                  color="#a0aec0"
                />
              </TouchableOpacity>
            </View>
          </FadeSlideIn>

          {/* ── Confirm Password field ── */}
          <FadeSlideIn delay={860}>
            <View className="flex-row items-center border-b border-gray-200 pb-3 mb-6">
              <MaterialCommunityIcons
                name="key-outline"
                size={18}
                color="#a0aec0"
                style={{ marginRight: 8 }}
              />
              <TextInput
                className="flex-1 text-gray-700 text-[15px]"
                placeholder="Confirm Password"
                placeholderTextColor="#a0aec0"
                secureTextEntry={!showConfirm}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
              />
              <TouchableOpacity onPress={() => setShowConfirm(!showConfirm)}>
                <Ionicons
                  name={showConfirm ? "eye-outline" : "eye-off-outline"}
                  size={18}
                  color="#a0aec0"
                />
              </TouchableOpacity>
            </View>
          </FadeSlideIn>

          {/* ── Terms ── */}
          <FadeSlideIn delay={960}>
            <View className="flex-row flex-wrap mb-5">
              <Text className="text-gray-400 text-[11px]">
                By Singing up You're agree with our{" "}
              </Text>
              <TouchableOpacity>
                <Text className="text-[#4a90d9] text-[11px]">
                  Terms &amp; Condition
                </Text>
              </TouchableOpacity>
              <Text className="text-gray-400 text-[11px]"> and </Text>
              <TouchableOpacity>
                <Text className="text-[#4a90d9] text-[11px]">
                  Privacy Policy
                </Text>
              </TouchableOpacity>
            </View>
          </FadeSlideIn>

          {/* ── Sign Up button ── */}
          <FadeSlideIn delay={1060}>
            <AnimatedButton
              className="bg-[#1a1a2e] rounded-full py-[15px] items-center justify-center mb-5"
              activeScale={0.95}
              onPress={onSubmit}
            >
              <Text className="text-white text-[16px] font-semibold tracking-wide">
                Sign Up
              </Text>
            </AnimatedButton>
          </FadeSlideIn>

          {/* ── Footer ── */}
          <FadeSlideIn delay={1160}>
            <View className="items-center">
              {/* Log in link */}
              <View className="flex-row items-center justify-center mb-1">
                <Text className="text-gray-400 text-[13px]">
                  Joined us before?{" "}
                </Text>
                <TouchableOpacity>
                  <Text className="text-[#4a90d9] text-[13px] font-medium">
                    Log in
                  </Text>
                </TouchableOpacity>
              </View>

              <Text className="text-gray-400 text-[13px] my-2">Or</Text>

              {/* Social buttons */}
              <View className="flex-row items-center gap-x-4 mt-1">
                {/* Google */}
                <TouchableOpacity className="w-11 h-11 rounded-full border border-gray-200 items-center justify-center">
                  <AntDesign name="google" size={20} color="#000" />
                </TouchableOpacity>

                {/* Apple */}
                <TouchableOpacity className="w-11 h-11 rounded-full border border-gray-200 items-center justify-center">
                  <FontAwesome name="apple" size={22} color="#000" />
                </TouchableOpacity>
              </View>
            </View>
          </FadeSlideIn>
        </SpringFadeIn>
      </KeyboardAwareScrollView>
    </View>
  );
}
