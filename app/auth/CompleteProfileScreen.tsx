import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import {
  Platform,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { FadeIn, FieldRow } from "../../components/Animations";

export default function CompleteProfileScreen() {
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

  const fields = [
    {
      icon: (
        <Ionicons name="person-outline" size={ICON_SIZE} color={ICON_COLOR} />
      ),
      placeholder: "Full name",
    },
    {
      icon: (
        <Ionicons
          name="transgender-outline"
          size={ICON_SIZE}
          color={ICON_COLOR}
        />
      ),
      placeholder: "Gender",
      isDropdown: true,
    },
    {
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
      icon: (
        <MaterialCommunityIcons
          name="scale-bathroom"
          size={ICON_SIZE}
          color={ICON_COLOR}
        />
      ),
      placeholder: "Weight",
      suffix: "kg",
    },
    {
      icon: (
        <MaterialCommunityIcons
          name="human-male-height"
          size={ICON_SIZE}
          color={ICON_COLOR}
        />
      ),
      placeholder: "Height",
      suffix: "cm",
    },
    {
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

  return (
    <View className="flex-1 bg-white">
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
            paddingTop: Platform.OS === "ios" ? 60 : 40,
          }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* ── Back arrow ── */}
          <FadeIn delay={0}>
            <TouchableOpacity className="mb-5 self-start">
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
            <FadeIn key={field.placeholder} delay={160 + index * 70}>
              <FieldRow
                icon={field.icon}
                placeholder={field.placeholder}
                suffix={field.suffix}
                isDropdown={field.isDropdown}
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
    </View>
  );
}
