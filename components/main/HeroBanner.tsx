import { ImageBackground, Text, View } from "react-native";

export default function HeroBanner() {
  return (
    <ImageBackground
      source={require("../../assets/images/main-screen/Rectangle 5835.png")}
      resizeMode="cover"
      className="w-full min-h-[130px] overflow-hidden rounded-[10px] border border-[rgba(255,255,255,0.05)]"
      imageClassName="rounded-[10px]"
    >
      <View className="w-full flex-1 justify-center items-center bg-[rgba(22,30,34,0.45)] px-[30px] py-6">
        <Text className="text-white text-[20px] text-center leading-8 font-semibold">
          Every Step is your forward counts. Continue your journey!
        </Text>
      </View>
    </ImageBackground>
  );
}
