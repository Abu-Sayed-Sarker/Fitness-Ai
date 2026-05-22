import { Text, View } from "react-native";

type PlanCard = {
  actionLabel: string;
  status: string;
  statusClassName: string;
  title: string;
};

type PlanSectionProps = {
  cards: PlanCard[];
  title: string;
};

export default function PlanSection({ cards, title }: PlanSectionProps) {
  return (
    <View className="gap-[10px]">
      <Text className="text-[#F4FAFC] text-[28px] font-bold tracking-[0.2px]">
        {title}
      </Text>

      <View className="flex-row gap-2">
        {cards.map((card, index) => (
          <View
            key={index}
            className="flex-1 min-h-[108px] rounded-lg px-3 py-[10px] justify-between bg-[rgba(44,62,68,0.95)] border border-[rgba(255,255,255,0.04)]"
          >
            <Text
              className={`text-[14px] font-medium text-center ${card.statusClassName}`}
            >
              {card.status}
            </Text>

            <Text className="text-[#F4FAFC] text-[14px] font-medium text-center">
              {card.title}
            </Text>

            <View className="self-center bg-[rgba(166,181,189,0.35)] rounded-md px-[10px] py-1">
              <Text className="text-white text-[12px] font-medium">
                {card.actionLabel}
              </Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}
