import { View, Text } from "@tarojs/components";
import "./index.scss";
import { useState } from "react";
import Taro from "@tarojs/taro";
import { POEMS } from "../../fixture";

const Index = () => {
  const [poems] = useState<IPoem[]>(POEMS);

  const jumpToPoemDetail = (poemId) => {
    Taro.navigateTo({
      url: `/pages/poem-detail/index?poemId=${poemId}`,
    });
  };

  return (
    <View className="poems">
      {poems.map((poem, index) => (
        <View key={index} className="poem">
          <View onClick={() => jumpToPoemDetail(poem?.id)}>
            <Text>{poem?.title}</Text>
          </View>
          <Text>
            {poem?.type} · {poem?.author}
          </Text>
        </View>
      ))}
    </View>
  );
};

export default Index;
