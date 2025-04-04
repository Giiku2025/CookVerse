import SearchForm from "../../components/search/SearchForm/SearchForm"
import SearchBar from "../../components/search/SearchBar/SearchBar"
import styles from "./ingredientsPage.module.css"

function IngredientsPage() {
  const handleSearch = (encodedQuery: string, siteId: string) => {
    // Base64デコードして元の検索クエリを取得
    try {
      const decodedQuery = decodeURIComponent(atob(encodedQuery))
      console.log(`食材: ${decodedQuery}, サイト: ${siteId}`)

      // ここで検索処理を実装
      // 例: APIリクエストを送信するなど
    } catch (error) {
      console.error("検索クエリのデコードに失敗しました:", error)
    }
  }

  return (
    <div>
      <h1 className="page-title">具材からレシピを検索</h1>
      <p className="page-subtitle">冷蔵庫の食材でできるレシピを見つけましょう</p>

      <SearchForm>
        <p className={styles.searchInfo}>
          食材の名前を入力してチップにすると
          <br />
          その食材で作れるレシピが検索できます
        </p>

        <div className={styles.searchControls}>
          <SearchBar
            placeholder="食材名を入力"
            buttonText="食材を追加"
            onSearch={handleSearch}
            showSiteSelector={true}
          />
        </div>
      </SearchForm>
    </div>
  )
}

export default IngredientsPage

