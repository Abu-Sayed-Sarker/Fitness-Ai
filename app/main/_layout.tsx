import { Stack } from "expo-router";
import { View } from "react-native";
import BottomNav from "../../components/main/bottom-nav";

export default function MainLayout() {
  return (
    <View className="flex-1 bg-[#1E2D32]">
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
      </Stack>
      <BottomNav />
    </View>
  );
}
