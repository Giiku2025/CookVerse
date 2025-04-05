export const GetRecognize = async (image:string)  => {
    const body = new FormData()
    body.append("image", image)
    try {
        const data = await fetch(`http://localhost:8787/api/food/recognize`,
            {
                method: "POST",
                body: body,
            })
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
                body: body,
            })
        console.log(data.json())
        return data.json()
    } catch (error) {
        console.error("画像の分析に失敗しました:", error)
    }
}