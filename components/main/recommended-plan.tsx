import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Text, View } from "react-native";

type MetricCardProps = {
  accentClassName: string;
  accentColor: string;
  icon: React.ComponentProps<typeof MaterialCommunityIcons>["name"];
  label: string;
  value: string;
  unit: string;
};

const waveBars = [
  8, 10, 12, 20, 32, 18, 14, 30, 36, 16, 10, 28, 30, 14, 12, 16,
];

function MetricCard({
  accentClassName,
  accentColor,
  icon,
  label,
  value,
  unit,
}: MetricCardProps) {
  return (
    <View className="flex-1 bg-[rgba(44,62,68,0.95)] rounded-lg px-3 py-[10px] gap-3 border border-[rgba(255,255,255,0.04)]">
      <View className="flex-row items-center gap-1.5">
        <MaterialCommunityIcons name={icon} size={12} color={accentColor} />
        <Text className="text-[#DDE7EA] text-[12px] font-medium">{label}</Text>
      </View>

      <View className="items-end flex-row justify-end gap-1">
        <Text className="text-[#F2F6F7] text-[32px] font-bold leading-[36px] tracking-[0.2px]">
          {value}
        </Text>
        <Text className="text-[#CFDADF] text-[14px] mb-1">{unit}</Text>
      </View>

      <View className={`h-[3px] rounded-full opacity-45 ${accentClassName}`} />
    </View>
  );
}

export default function RecommendedPlan() {
  return (
    <View className="gap-3">
      <Text className="text-[#F4FAFC] text-[27px] font-bold tracking-[0.2px]">
        AI Recommended Today's plan
      </Text>

      <View className="flex-row gap-2">
        <View className="flex-1 gap-2">
          <MetricCard
            accentClassName="bg-[#7D3DA0]"
            icon="fire"
            label="Calorie need(daily)"
            value="2100"
            unit="Kcal"
            accentColor="#7D3DA0"
          />

          <MetricCard
            accentClassName="bg-[#0E847E]"
            icon="sleep"
            label="sleep"
            value="7"
            unit="h 34m"
            accentColor="#0E847E"
          />
        </View>

        <View className="flex-1 bg-[rgba(44,62,68,0.95)] rounded-lg px-3 py-[10px] border border-[rgba(255,255,255,0.04)] justify-between min-h-[170px]">
          <View className="flex-row justify-between items-center">
            <View className="flex-row gap-1.5 items-center">
              <Ionicons name="water" size={13} color="#31B4F1" />
              <Text className="text-[#DDE7EA] text-[12px] font-medium">
                Water
              </Text>
            </View>

            <View className="flex-row items-end gap-1">
              <Text className="text-[#F2F6F7] text-[35px] font-bold leading-[38px]">
                1.2
              </Text>
              <Text className="text-[#CFDADF] text-[14px] mb-1">ltr</Text>
            </View>
          </View>

          <View className="flex-row w-full justify-between items-end gap-1 pb-1.5">
            {waveBars.map((height, index) => (
              <View
                key={index}
                className="w-2 rounded-full bg-[#1FA1E8]"
                style={{
                  height,
                  opacity: index % 3 === 0 ? 1 : 0.7,
                }}
              />
            ))}
          </View>
        </View>
      </View>
    </View>
  );
}
