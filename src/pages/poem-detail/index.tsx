import Taro, { useRouter } from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import "./index.scss";
import { useEffect, useState } from "react";
import { POEMS } from "../../fixture"; // 确保路径正确

const PoemDetail = () => {
  const [poem, setPoem] = useState<IPoem | undefined>(undefined);
  const { params } = useRouter();

  useEffect(() => {
    if (params?.poemId) {
      const selectedPoem = POEMS[+params.poemId - 1];
      Taro.setNavigationBarTitle({ title: selectedPoem?.title || "唐诗" });
      setPoem(selectedPoem);
    }
  }, [params]);

  return (
    <View className="poem">
      {!!poem ? (
        <>
          <Text className="title">{poem.title}</Text>
          <Text className="author">
            {poem.type} · {poem.author}
          </Text>
          <Text className="contents">{poem.contents}</Text>
        </>
      ) : (
        <Text>加载中...</Text>
      )}
    </View>
  );
};

export default PoemDetail;
