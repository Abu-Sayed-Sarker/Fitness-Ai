import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { SafeAreaView } from "react-native-safe-area-context";
import { FadeSlideIn } from "../../components/Animations";

type ForgotPasswordFormValues = {
  email: string;
};

const ForgotPassword = () => {
  const router = useRouter();
  const { control, handleSubmit } = useForm<ForgotPasswordFormValues>({
    defaultValues: {
      email: "",
    },
  });
  const onSubmit = (data: ForgotPasswordFormValues) => {
    console.log("Forgot password data:", data);
  };
  return (
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
          Forgot Password
        </Text>
        <Text className="text-gray-500 text-[16px] mb-10 text-center">
          Enter your email address to receive a password reset link
        </Text>
        <FadeSlideIn delay={160}>
          <View className="flex-row items-center border-b border-gray-200 pb-3 mb-5">
            <Ionicons
              name="mail-outline"
              size={18}
              color="#a0aec0"
              style={{ marginRight: 8 }}
            />
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, value } }) => (
                <TextInput
                  className="flex-1 text-gray-700 text-[15px]"
                  placeholder="Enter Your Email"
                  placeholderTextColor="#a0aec0"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={value}
                  onChangeText={onChange}
                />
              )}
            />
          </View>
        </FadeSlideIn>

        <TouchableOpacity
          onPress={handleSubmit(onSubmit)}
          className="bg-black p-4 rounded-lg"
        >
          <Text className="text-white text-[16px] font-semibold text-center">
            Send Reset Link
          </Text>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default ForgotPassword;
