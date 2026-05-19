import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {

  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import { FadeIn, FieldRow } from "../../components/Animations";

type ProfileFormValues = {
  fullName: string;
  gender: string;
  dob: string;
  weight: string;
  height: string;
  trainer: string;
  fitnessGoal: string;
  injuries: string;
  allergies: string;
  medicalConditions: string;
};

export default function CompleteProfileScreen() {
  const router = useRouter();

  const { control, handleSubmit, setValue, watch } = useForm<ProfileFormValues>({
    defaultValues: {
      fullName: "",
      gender: "",
      dob: "",
      weight: "",
      height: "",
      trainer: "",
      fitnessGoal: "",
      injuries: "",
      allergies: "",
      medicalConditions: "",
    },
  });




  const buttonScale = useSharedValue(1);

  const buttonStyle = useAnimatedStyle(() => ({
    transform: [{ scale: buttonScale.value }],
  }));

  const handlePressIn = () => {
    buttonScale.value = withSpring(0.96, { damping: 10, stiffness: 200 });
  };
  const handlePressOut = () => {
    buttonScale.value = withSpring(1, { damping: 10, stiffness: 200 });
  };

  const ICON_COLOR = "#374151";
  const ICON_SIZE = 18;

  const fields: {
    name: keyof ProfileFormValues;
    icon: React.ReactNode;
    placeholder: string;
    suffix?: string;
    isDropdown?: boolean;
    onPress?: () => void;
    keyboardType?: "default" | "numeric";
  }[] = [
    {
      name: "fullName" as const,
      icon: (
        <Ionicons name="person-outline" size={ICON_SIZE} color={ICON_COLOR} />
      ),
      placeholder: "Full name",
    },
    {
      name: "gender" as const,
      icon: (
        <Ionicons
          name="transgender-outline"
          size={ICON_SIZE}
          color={ICON_COLOR}
        />
      ),
      placeholder: "Gender",


    },
    {
      name: "dob" as const,
      icon: (
        <MaterialCommunityIcons
          name="calendar-month-outline"
          size={ICON_SIZE}
          color={ICON_COLOR}
        />
      ),
      placeholder: "Date of birth",
    },
    {
      name: "weight" as const,
      icon: (
        <MaterialCommunityIcons
          name="scale-bathroom"
          size={ICON_SIZE}
          color={ICON_COLOR}
        />
      ),
      placeholder: "Weight",
      suffix: "kg",
      keyboardType: "numeric" as const,
    },
    {
      name: "height" as const,
      icon: (
        <MaterialCommunityIcons
          name="human-male-height"
          size={ICON_SIZE}
          color={ICON_COLOR}
        />
      ),
      placeholder: "Height",
      suffix: "cm",
      keyboardType: "numeric" as const,
    },
    {
      name: "trainer" as const,
      icon: (
        <MaterialCommunityIcons
          name="account-supervisor-outline"
          size={ICON_SIZE}
          color={ICON_COLOR}
        />
      ),
      placeholder: "Trainer",
    },
    {
      name: "fitnessGoal" as const,
      icon: (
        <MaterialCommunityIcons
          name="run-fast"
          size={ICON_SIZE}
          color={ICON_COLOR}
        />
      ),
      placeholder: "Fitness goal",
    },
    {
      name: "injuries" as const,
      icon: (
        <MaterialCommunityIcons
          name="bandage"
          size={ICON_SIZE}
          color={ICON_COLOR}
        />
      ),
      placeholder: "Injuries discomfort",
    },
    {
      name: "allergies" as const,
      icon: (
        <MaterialCommunityIcons
          name="allergy"
          size={ICON_SIZE}
          color={ICON_COLOR}
        />
      ),
      placeholder: "Allergies",
    },
    {
      name: "medicalConditions" as const,
      icon: (
        <MaterialCommunityIcons
          name="medical-bag"
          size={ICON_SIZE}
          color={ICON_COLOR}
        />
      ),
      placeholder: "Medical conditions",
    },
  ];

  const onSubmit = (data: ProfileFormValues) => {
    console.log("Complete profile data:", data);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      <KeyboardAwareScrollView
        className="flex-1"
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        bottomOffset={16}
      >
        <ScrollView
          className="flex-1"
          contentContainerStyle={{
            paddingHorizontal: 24,
            paddingBottom: 40,
          }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* ── Back arrow ── */}
          <FadeIn delay={0}>
            <TouchableOpacity
              className="mb-5 self-start"
              onPress={() => router.back()}
            >
              <Ionicons name="arrow-back" size={22} color="#111827" />
            </TouchableOpacity>
          </FadeIn>

          {/* ── Title ── */}
          <FadeIn delay={80}>
            <Text className="text-[26px] font-bold text-black mb-8 leading-tight">
              Complete your profile
            </Text>
          </FadeIn>

          {/* ── Fields ── */}
          {fields.map((field, index) => (
            <FadeIn key={field.name} delay={160 + index * 70}>
              <Controller
                control={control}
                name={field.name}
                render={({ field: { onChange, value } }) => field.name === "gender" ? (
                  <View className="flex-row items-center border-b border-gray-200 py-[14px]">
                    <View className="mr-3">{field.icon}</View>
                    <View className="flex-1 flex-row gap-x-2">
                      {["Male", "Female", "Other"].map((option) => (
                        <TouchableOpacity
                          key={option}
                          onPress={() => onChange(option)}
                          className={`px-4 py-1.5 rounded-full border ${
                            value === option
                              ? "bg-[#1a1a2e] border-[#1a1a2e]"
                              : "bg-transparent border-gray-200"
                          }`}
                        >
                          <Text
                            className={`text-[13px] font-medium ${
                              value === option ? "text-white" : "text-gray-500"
                            }`}
                          >
                            {option}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  </View>
                ) : (
                  <FieldRow
                    icon={field.icon}
                    placeholder={field.placeholder}
                    suffix={field.suffix}
                    isDropdown={field.isDropdown}
                    value={value}
                    onChangeText={onChange}
                    onPress={field.onPress}
                    keyboardType={field.keyboardType}
                  />
                )}
              />
            </FadeIn>
          ))}

          {/* ── Next button ── */}
          <FadeIn delay={160 + fields.length * 70 + 80}>
            <View className="items-center mt-12">
              <Animated.View style={buttonStyle}>
                <TouchableOpacity
                  className="bg-[#1a1a2e] rounded-xl px-20 py-[15px] items-center justify-center"
                  activeOpacity={1}
                  onPress={handleSubmit(onSubmit)}
                  onPressIn={handlePressIn}
                  onPressOut={handlePressOut}
                >
                  <Text className="text-white text-[16px] font-semibold tracking-wide">
                    Next
                  </Text>
                </TouchableOpacity>
              </Animated.View>
            </View>
          </FadeIn>
        </ScrollView>
      </KeyboardAwareScrollView>

      
    </SafeAreaView>
  );
}
