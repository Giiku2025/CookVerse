//eslint-disable-next-line
// @ts-ignore
const API_URL = import.meta.env.VITE_API_URL
export const GetRecognize = async (image: string) => {
  const body = new FormData();
  body.append("image", image);
  try {
    const data = await fetch(`${API_URL}api/food/recognize`, {
      method: "POST",
      body: body,
    });
    return data.json();
  } catch (error) {
    console.error("APIリクエストに失敗しました:", error);
  }
};
export const GetAnalyze = async (image: string) => {
  const body = new FormData();
  body.append("image", image);
  try {
    const data = await fetch(`${API_URL}api/nutrition/analyze`, {
      method: "POST",
      body: body,
    });
    return data.json();
  } catch (error) {
    console.error("画像の分析に失敗しました:", error);
  }
};
