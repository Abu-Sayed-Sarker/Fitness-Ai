import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useEffect, useRef } from "react";
import {
  Animated,
  Dimensions,
  ImageBackground,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import bgImage from "../assets/images/onboard/image (14).png";
const { width } = Dimensions.get("window");
const CIRCLE_SIZE = width * 2;

export default function SplashScreenOne() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(40)).current;
  const buttonAnim = useRef(new Animated.Value(0)).current;
  const router = useRouter();

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
      Animated.timing(buttonAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <View className="flex-1">
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />

      <ImageBackground
        source={bgImage}
        className="flex-1 w-full h-full justify-end"
        resizeMode="cover"
      >
        {/* Dark overlay */}
        <LinearGradient
          colors={["transparent", "#070A1B"]}
          className="absolute inset-0"
          start={{
            x: 0,
            y: 0,
          }}
          end={{
            x: 0,
            y: 0.9,
          }}
        />

        {/* Circle ring — uses inline style only for dynamic radius */}
        <View
          className="absolute self-center border border-white/15 rounded-full"
          style={{
            top: "10%",
            width: CIRCLE_SIZE,
            height: CIRCLE_SIZE,
            borderRadius: CIRCLE_SIZE / 2,
          }}
        />

        {/* Centered logo block */}
        <View className="absolute inset-0 items-center justify-center mt-8">
          <Animated.View
            style={{
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
              alignItems: "center",
            }}
          >
            <Text className="text-white text-[30px] text-center tracking-[4px]">
              Kevin Orellana
            </Text>
            <Text className="text-white/75 text-[11px] tracking-[4px] text-center mt-1.5 uppercase">
              Health &amp; Fitness App
            </Text>
          </Animated.View>
        </View>

        {/* Bottom section */}
        <Animated.View style={{ opacity: buttonAnim }}>
          <View className="px-6 pb-10 items-center">
            <LinearGradient
              colors={["#3c4150", "transparent"]}
              start={{
                x: 0,
                y: 0,
              }}
              end={{
                x: 1,
                y: 1,
              }}
              className="rounded-md w-full border overflow-hidden"
            >
              <TouchableOpacity
                className="w-full py-[17px] items-center justify-center"
                activeOpacity={0.85}
                onPress={() => {
                  router.replace("/(on-boarding)/SplashScreenTow");
                }}
              >
                <Text className="text-white text-xl font-medium tracking-wide">
                  Lets Start
                </Text>
              </TouchableOpacity>
            </LinearGradient>

            {/* Pagination dots */}
            <View className="flex-row mt-[18px] items-center gap-x-1.5">
              <View className="h-[5px] w-2 rounded-full bg-white" />
              <View className="h-[5px] w-5 rounded-full bg-white/40" />
            </View>
          </View>
        </Animated.View>
      </ImageBackground>
    </View>
  );
}
