import { View, Text, Button } from "@tarojs/components";

import "./index.scss";
import { useEffect, useState } from "react";
import Taro, { useRouter } from "@tarojs/taro";

const PoemDetail = () => {
  const [poem, setPoem] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {}, []);

  useEffect(() => {
    const { params } = router;

    const fetchPoems = async () => {
      const { data } = await Taro.request({
        url: `https://poem-api.vercel.app/api/poems/${params?.poemId}`,
        method: "GET",
      });

      Taro.setNavigationBarTitle({
        title: data?.title,
      });

      setPoem(data);
    };
    fetchPoems();
  }, []);

  return (
    <View className="poem">
      <Text>{poem?.title}</Text>
      <Text>
        {poem?.type} · {poem?.author}
      </Text>
      <Text>
        {poem?.contents}
      </Text>
    </View>
  );
};

export default PoemDetail;
