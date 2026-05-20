import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Modal, Text, TextInput, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import { AnimatedButton, FadeSlideIn } from "../../components/Animations";

type ResetPasswordFormValues = {
  password: string;
  confirmPassword: string;
};

const ResetPasswordScreen = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const email = (params.email as string) || "";
  const code = (params.code as string) || "";

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  // Reanimated shared values for success modal entry/exit animations
  const scale = useSharedValue(0.3);
  const opacity = useSharedValue(0);

  const { control, handleSubmit } = useForm<ResetPasswordFormValues>({
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (data: ResetPasswordFormValues) => {
    console.log("Reset password data:", { ...data, email, code });

    // Reset shared values to initial hidden states
    opacity.value = 0;
    scale.value = 0.3;

    // Show modal and start springy scale & fade animation
    setModalVisible(true);
    opacity.value = withTiming(1, { duration: 300 });
    scale.value = withSpring(1, { damping: 15, stiffness: 120 });
  };

  const handleCloseModal = () => {
    // Animate out, then navigate to login screen on completion
    opacity.value = withTiming(0, { duration: 200 });
    scale.value = withTiming(0.7, { duration: 200 }, () => {
      runOnJS(navigateToLogin)();
    });
  };

  const navigateToLogin = () => {
    setModalVisible(false);
    router.replace("/auth/SignInScreen");
  };

  const backdropStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  const cardStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  return (
    <>
      <SafeAreaView className="flex-1 bg-white">
        <KeyboardAwareScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 40 }}
          className="p-4"
          bottomOffset={16}
        >
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>

          <Text className="text-black text-[28px] font-semibold mt-20 text-center">
            Reset Password
          </Text>
          <Text className="text-gray-500 text-[16px] mb-10 text-center">
            Please enter your new password
          </Text>

          <FadeSlideIn delay={200}>
            <View className="flex-row items-center border-b border-gray-200 pb-3 mb-5">
              <MaterialCommunityIcons
                name="key-outline"
                size={18}
                color="#a0aec0"
                style={{ marginRight: 8 }}
              />
              <Controller
                control={control}
                name="password"
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    className="flex-1 text-gray-700 text-[15px]"
                    placeholder="Create Password"
                    placeholderTextColor="#a0aec0"
                    secureTextEntry={!showPassword}
                    value={value}
                    onChangeText={onChange}
                  />
                )}
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
          <FadeSlideIn delay={320}>
            <View className="flex-row items-center border-b border-gray-200 pb-3 mb-6">
              <MaterialCommunityIcons
                name="key-outline"
                size={18}
                color="#a0aec0"
                style={{ marginRight: 8 }}
              />
              <Controller
                control={control}
                name="confirmPassword"
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    className="flex-1 text-gray-700 text-[15px]"
                    placeholder="Confirm Password"
                    placeholderTextColor="#a0aec0"
                    secureTextEntry={!showConfirm}
                    value={value}
                    onChangeText={onChange}
                  />
                )}
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

          <AnimatedButton
            onPress={handleSubmit(onSubmit)}
            className="bg-black p-4 rounded-xl items-center justify-center mt-4"
            activeScale={0.97}
          >
            <Text className="text-white text-[16px] font-semibold text-center">
              Reset Password
            </Text>
          </AnimatedButton>
        </KeyboardAwareScrollView>
      </SafeAreaView>
      {/* Success Modal */}
      <Modal visible={modalVisible} transparent animationType="none">
        <Animated.View
          style={[
            {
              flex: 1,
              backgroundColor: "rgba(0, 0, 0, 0.6)",
              justifyContent: "center",
              alignItems: "center",
              //   padding: 24,
            },
            backdropStyle,
          ]}
        >
          <Animated.View
            style={[
              {
                width: "100%",
                maxWidth: 340,
                backgroundColor: "#ffffff",
                borderRadius: 24,
                paddingVertical: 36,
                paddingHorizontal: 24,
                alignItems: "center",
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 10 },
                shadowOpacity: 0.1,
                shadowRadius: 20,
                elevation: 10,
              },
              cardStyle,
            ]}
          >
            {/* Success Icon */}
            <View className="w-20 h-20 bg-green-50 rounded-full justify-center items-center mb-6 border-4 border-green-100">
              <Ionicons name="checkmark" size={40} color="#10b981" />
            </View>

            <Text className="text-black text-[22px] font-bold text-center mb-3">
              Password Changed!
            </Text>

            <Text className="text-gray-500 text-[14px] text-center mb-8 leading-[22px] px-2">
              Your password has been successfully reset. You can now log in with
              your new password.
            </Text>

            <AnimatedButton
              onPress={handleCloseModal}
              className="bg-black w-full p-4 rounded-xl items-center justify-center shadow-md active:opacity-90"
              activeScale={0.95}
            >
              <Text className="text-white text-[16px] font-semibold">
                Back to Login
              </Text>
            </AnimatedButton>
          </Animated.View>
        </Animated.View>
      </Modal>
    </>
  );
};

export default ResetPasswordScreen;
