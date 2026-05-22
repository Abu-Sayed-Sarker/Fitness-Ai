import { Feather, FontAwesome5, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function BottomNav() {
  const insets = useSafeAreaInsets();

  return (
    <View
      className="absolute left-0 right-0 px-4"
      style={{ bottom: Math.max(8, insets.bottom + 4) }}
    >
      <View className="bg-[rgba(51,67,72,0.95)] rounded-[22px] py-[9px] px-3 flex-row items-center justify-between border border-[rgba(255,255,255,0.05)]">
        <View className="w-11 h-11 rounded-2xl items-center justify-center bg-[rgba(27,43,48,0.95)]">
          <Ionicons name="home" size={18} color="#FFFFFF" />
        </View>

        <Ionicons name="heart-half" size={18} color="#F0F7FA" />
        <MaterialCommunityIcons name="dumbbell" size={18} color="#F0F7FA" />
        <Feather name="star" size={18} color="#F0F7FA" />
        <FontAwesome5 name="utensils" size={16} color="#F0F7FA" />
      </View>
    </View>
  );
}
