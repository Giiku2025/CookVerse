import { apiPost } from "../utils/apiClient"
export const getRecognize = async (image:string)  => {
    try {
        const data = await apiPost(`http://localhost:8787/api/food/recognize`
        , image)

        return data.json()
    } catch (error) {
        console.error("APIリクエストに失敗しました:", error)
    }
}
export const GetAnalyze = async (
    image: string,
) => {
    const body = new FormData()
    body.append("image", image)
    try {
        const data = await fetch(`http://localhost:8787/api/nutrition/analyze`,

            {
                method: "POST",
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                body: JSON.stringify(body),
            }
            )
        return data.json()
    } catch (error) {
        console.error("画像の分析に失敗しました:", error)
    }
}