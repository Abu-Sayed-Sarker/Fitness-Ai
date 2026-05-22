import { Text, View } from "react-native";

export default function WeeklyGoalCard() {
  const days = [
    { date: 25, day: "Sat" },
    { date: 26, day: "Sat", active: true },
    { date: 27, day: "Sat" },
    { date: 28, day: "Sat" },
    { date: 29, day: "Sat" },
    { date: 30, day: "Sat" },
    { date: 31, day: "Sat" },
  ];

  return (
    <View className="w-full bg-[rgba(35,50,56,0.95)] rounded-[10px] px-3 py-3 border border-[rgba(255,255,255,0.04)]">
      {/* Header */}
      <View className="flex-row justify-between items-center mb-4">
        <Text className="text-white text-[17px] font-semibold">Weekly Goal</Text>

        <Text className="text-[#324146] text-[24px] font-bold">1 / 3</Text>
      </View>

      {/* Days */}
      <View className="flex-row justify-between items-center">
        {days.map((item, index) => (
          <View key={index} className="items-center">
            {/* Date Circle */}
            <View
              className={`w-[32px] h-[32px] rounded-full justify-center items-center ${
                item.active
                  ? "border border-[#7CF7F2]"
                  : "border border-transparent"
              }`}
            >
              <Text
                className={`text-[17px] font-medium ${
                  item.active ? "text-[#7CF7F2]" : "text-white"
                }`}
              >
                {item.date}
              </Text>
            </View>

            {/* Day */}
            <Text
              className={`mt-3 text-[16px] font-medium ${
                item.active ? "text-[#7CF7F2]" : "text-white"
              } leading-[17px]`}
            >
              {item.day}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}
