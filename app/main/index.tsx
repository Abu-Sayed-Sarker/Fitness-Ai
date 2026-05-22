import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { Image, ImageBackground, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import HeroBanner from "../../components/main/HeroBanner";
import PlanSection from "../../components/main/plan-section";
import RecommendedPlan from "../../components/main/recommended-plan";
import WeeklyGoalCard from "../../components/main/WeeklyGoalCard";

export default function HomeScreen() {
  const mealCards = [
    {
      status: "Done",
      statusClassName: "text-[#7CF7F2]",
      title: "Breakfast",
      actionLabel: "Eat Now",
    },
    {
      status: "Done",
      statusClassName: "text-[#7CF7F2]",
      title: "Snacks",
      actionLabel: "Eat Now",
    },
    {
      status: "Upcoming",
      statusClassName: "text-[#E6EDF0]",
      title: "Lunch",
      actionLabel: "Eat Now",
    },
  ];

  const workoutCards = [
    {
      status: "Done",
      statusClassName: "text-[#BC72FF]",
      title: "Leg exercise",
      actionLabel: "Exercise",
    },
    {
      status: "Done",
      statusClassName: "text-[#BC72FF]",
      title: "Arm exercise",
      actionLabel: "Exercise",
    },
    {
      status: "Not yet",
      statusClassName: "text-[#E6EDF0]",
      title: "Leg exercise",
      actionLabel: "Exercise",
    },
  ];

  return (
    <SafeAreaView className="flex-1 bg-[#1E2D32]" edges={["top"]}>
      <StatusBar style="light" />

      <ImageBackground
        source={require("../../assets/images/main-screen/Rectangle 5900.png")}
        resizeMode="cover"
        className="flex-1"
      >
        <LinearGradient
          colors={[
            "rgba(25, 38, 42, 0.35)",
            "rgba(24, 37, 42, 0.92)",
            "#1E2D32",
          ]}
          style={{ flex: 1 }}
        >
          <ScrollView
            // contentInsetAdjustmentBehavior="automatic"
            showsVerticalScrollIndicator={false}
            contentContainerClassName="pb-32"
          >
            <View className="px-2 pt-1.5 gap-3">
              <View className="flex-row items-center justify-between px-0.5">
                <Text className="text-[#E6F0F3] text-[27px] font-medium uppercase tracking-[2.2px]">
                  Kevin Orellana
                </Text>

                <View className="w-[46px] h-[46px] rounded-full overflow-hidden border-2 border-[rgba(255,255,255,0.35)]">
                  <Image
                    source={{
                      uri: "https://randomuser.me/api/portraits/men/1.jpg",
                    }}
                    className="w-full h-full"
                  />
                </View>
              </View>

              <WeeklyGoalCard />
              <HeroBanner />
              <RecommendedPlan />
              <PlanSection title="Today's Meal Idea" cards={mealCards} />
              <PlanSection title="Today's Workout Plan" cards={workoutCards} />
            </View>
          </ScrollView>
        </LinearGradient>
      </ImageBackground>
    </SafeAreaView>
  );
}
