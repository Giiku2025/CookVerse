import { apiPost } from "../utils/apiClient"

export const getAnalyze = async () => {
    try {
        const data = await apiPost("/api/analyze")
        return data
    } catch (error) {
        console.error("APIリクエストに失敗しました:", error)
    }
}
export const PostAnalyzeImage = async (file: Blob | null,) => {
    const formData = new FormData()
    formData.append("file", file as Blob)
    try {
        const data = await apiPost("/api/analyze", formData)
        return data
    } catch (error) {
        console.error("画像の分析に失敗しました:", error)
    }
}