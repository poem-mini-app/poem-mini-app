import { View, Text } from "@tarojs/components";
import "./index.scss";
import { useEffect, useState } from "react";
import Taro, { useRouter } from "@tarojs/taro";

const PoemDetail = () => {
  const [poem, setPoem] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const { params } = router;

    const fetchPoem = async () => {
      if (params?.poemId) {
        try {
          const { data } = await Taro.request({
            url: `https://poem-api.vercel.app/api/poems/${params.poemId}`,
            method: "GET",
          });

          if (data) {
            Taro.setNavigationBarTitle({ title: data.title });
            setPoem(data);
          }
        } catch (error) {
          console.error("Error fetching poem:", error);
        }
      }
    };

    fetchPoem();
  }, [router]);

  return (
    <View className="poem">
      {!!poem ? (
        <>
          <Text>{poem.title}</Text>
          <Text>{poem.type} · {poem.author}</Text>
          <Text>{poem.contents}</Text>
        </>
      ) : (
        <Text>加载中...</Text>
      )}
    </View>
  );
};

export default PoemDetail;
