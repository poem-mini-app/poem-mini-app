import { View, Text,  } from "@tarojs/components";
import "./index.scss";
import { useEffect, useState } from "react";
import Taro from "@tarojs/taro";

const Index = () => {
  const [poems, setPoems] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPoems = async () => {
      try {
        const { data } = await Taro.request({
          url: "https://poem-api.vercel.app/api/poems",
          method: "GET",
        });
        setPoems(data);
      } catch (err) {
        setError("无法加载诗词，请稍后再试。");
      } finally {
        setLoading(false);
      }
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
      {loading && <Text>加载中...</Text>}
      {error && <Text>{error}</Text>}
      {poems.map((poem) => (
        <View key={poem?.id} className="poem">
          <View onClick={() => jumpToPoemDetail(poem.id)}>
            <Text>{poem.title}</Text>
          </View>
          <Text>
            {poem.type} · {poem.author}
          </Text>
        </View>
      ))}
    </View>
  );
};

export default Index;
