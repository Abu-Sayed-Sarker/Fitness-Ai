import React, { useEffect } from "react";
import { Text, TextInput, TouchableOpacity, TouchableOpacityProps, View } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  withDelay,
  Easing,
} from "react-native-reanimated";

import { Feather } from "@expo/vector-icons";
// ── 1. Reusable staggered fade + slide spring wrapper ──
export function FadeSlideIn({
  delay = 0,
  translateYStart = 22,
  duration = 400,
  damping = 14,
  stiffness = 100,
  children,
  style,
}: {
  delay?: number;
  translateYStart?: number;
  duration?: number;
  damping?: number;
  stiffness?: number;
  children: React.ReactNode;
  style?: any;
}) {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(translateYStart);

  useEffect(() => {
    opacity.value = withDelay(
      delay,
      withTiming(1, { duration, easing: Easing.out(Easing.quad) }),
    );
    translateY.value = withDelay(
      delay,
      withSpring(0, { damping, stiffness }),
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  return <Animated.View style={[animatedStyle, style]}>{children}</Animated.View>;
}

// ── 2. Reusable Spring Fade In (ideal for cards/headers) ──
export function SpringFadeIn({
  delay = 0,
  translateYStart = 70,
  duration = 500,
  damping = 16,
  stiffness = 80,
  children,
  style,
}: {
  delay?: number;
  translateYStart?: number;
  duration?: number;
  damping?: number;
  stiffness?: number;
  children: React.ReactNode;
  style?: any;
}) {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(translateYStart);

  useEffect(() => {
    opacity.value = withDelay(
      delay,
      withTiming(1, { duration, easing: Easing.out(Easing.cubic) }),
    );
    translateY.value = withDelay(
      delay,
      withSpring(0, { damping, stiffness }),
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  return <Animated.View style={[animatedStyle, style]}>{children}</Animated.View>;
}

// ── 3. Custom Animated Button that shrinks on active press ──
export function AnimatedButton({
  children,
  style,
  onPress,
  activeScale = 0.95,
  ...props
}: TouchableOpacityProps & {
  activeScale?: number;
  children: React.ReactNode;
}) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    scale.value = withSpring(activeScale, { damping: 10, stiffness: 200 });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 10, stiffness: 200 });
  };

  return (
    <Animated.View style={animatedStyle}>
      <TouchableOpacity
        {...props}
        style={style}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={1}
      >
        {children}
      </TouchableOpacity>
    </Animated.View>
  );
}



export function FadeIn({
  delay = 0,
  children,
}: {
  delay?: number;
  children: React.ReactNode;
}) {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(16);

  useEffect(() => {
    opacity.value = withDelay(
      delay,
      withTiming(1, { duration: 380, easing: Easing.out(Easing.quad) }),
    );
    translateY.value = withDelay(
      delay,
      withSpring(0, { damping: 16, stiffness: 110 }),
    );
  }, []);

  const style = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  return <Animated.View style={style}>{children}</Animated.View>;
}

// ── Single input row ─────────────────────────────────────────────────────────
export function FieldRow({
  icon,
  placeholder,
  suffix,
  isDropdown,
  keyboardType = "default",
}: {
  icon: React.ReactNode;
  placeholder: string;
  suffix?: string;
  isDropdown?: boolean;
  keyboardType?: any;
}) {
  return (
    <View className="flex-row items-center border-b border-gray-200 py-[14px]">
      <View className="mr-3">{icon}</View>
      <TextInput
        className="flex-1 text-[15px] text-gray-700"
        placeholder={placeholder}
        placeholderTextColor="#9ca3af"
        keyboardType={keyboardType}
      />
      {suffix && (
        <Text className="text-gray-400 text-[14px] ml-2">{suffix}</Text>
      )}
      {isDropdown && <Feather name="chevron-down" size={16} color="#9ca3af" />}
    </View>
  );
}