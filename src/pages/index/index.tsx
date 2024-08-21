import { View, Text } from "@tarojs/components";

import "./index.scss";
import { useEffect, useState } from "react";
import Taro from "@tarojs/taro";

const Index = () => {
  const [poems, setPoems] = useState<any>([]);
  useEffect(() => {
    const fetchPoems = async () => {
      const { data } = await Taro.request({
        url: "https://poem-api.vercel.app/api/poems",
        method: "GET",
      });
      setPoems(data);
    };
    fetchPoems();
  }, []);

  const jumpToPoemDetail = (poemId) => {
    Taro.navigateTo({
      url: `/pages/poem-detail/index?poemId=${poemId}`,
    });
  };
  return (
    <View className="poems">
      {poems.map((poem) => (
        <View key={poem?.id} className="poem">
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
