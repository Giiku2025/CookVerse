import type React from "react"
import { useState } from "react"
import { Upload, Check, Loader2 } from "lucide-react"
import styles from "../calculator/calculatorPage.module.css"
import { GetRecognize} from "../../api/analyze.ts";
import SearchBar from "../../components/search/SearchBar/SearchBar.tsx";
import {useSearchSite} from "../../hooks/search/useSearchSite.tsx";

function IngredientsPage() {
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisComplete, setAnalysisComplete] = useState(false)
  const {handleQueryChange ,query} = useSearchSite()

  const handleFileChange
      = (e: React.ChangeEvent<HTMLInputElement>) => {

    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0]
      setFile(selectedFile)

      const reader = new FileReader()
      reader.onload = async (event) => {
        if (event.target?.result) {
          const base64Image = (event.target.result as string).replace(/^data:image\/webp;base64,/, "")
          setPreview(event.target.result as string)
          const response = await GetRecognize(base64Image)
          console.log(response)
          handleQueryChange(response)
        }
      }
      reader.readAsDataURL(selectedFile)

      // Reset analysis states
      setAnalysisComplete(false)
    }
  }

  const analyzeImage = () => {
    if (!file) return

    setIsAnalyzing(true)

    // Simulate AI analysis with a timeout
    setTimeout(() => {
      setIsAnalyzing(false)
      setAnalysisComplete(true)
    }, 2000)
  }

  return (
      <div>
        <h1 className="page-title">具材から料理を検索</h1>
        <p className="page-subtitle">具材の写真をアップロードして料理を検索</p>

        {!analysisComplete ? (
            <div className={styles.uploadContainer}>
              <div className={styles.uploadCard}>
                <div className={styles.uploadArea}>
                  <input
                      type="file"
                      id="food-image"
                      accept="image/*"
                      onChange={handleFileChange}
                      className={styles.fileInput}
                  />

                  {!preview ? (
                      <label htmlFor="food-image" className={styles.uploadLabel}>
                        <div className={styles.uploadIcon}>
                          <Upload size={32} />
                        </div>
                        <h3>具材の写真をアップロード</h3>
                        <p>クリックまたはドラッグ&ドロップで画像を選択</p>
                      </label>
                  ) : (
                      <div className={styles.previewContainer}>
                        <img src={preview || "/placeholder.svg"} alt="画像のプレビュー" className={styles.imagePreview} />

                        {!isAnalyzing ? (
                            <button className={styles.analyzeButton} onClick={analyzeImage} disabled={isAnalyzing}>
                              <Check size={20} />
                              分析開始
                            </button>
                        ) : (
                            <div className={styles.analyzing}>
                              <Loader2 size={24} className={styles.spinner} />
                              <p>AIが画像を分析中...</p>
                            </div>
                        )}
                      </div>
                  )}
                </div>
              </div>
            </div>
        ) : (
            <>

              <SearchBar
                placeholder="具材を検索"
                buttonText="検索"
                className={styles.searchBar}
                QueryDefaultValue={query as string}
              />
              <button
      className={styles.resetButton}
      onClick={() => {
        setFile(null)
        setPreview(null)
        setAnalysisComplete(false)
      }}
  >
    別の画像で検索
   </button>
</>

        )}
      </div>
  )
}

export default IngredientsPage

