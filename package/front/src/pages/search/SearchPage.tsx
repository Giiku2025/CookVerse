import SearchBar from "../../components/search/SearchBar/SearchBar.tsx";

export default function SearchPage() {


    return (
        <div>
            <h1 className="page-title">レシピを検索</h1>
            <p className="page-subtitle">健康的なレシピを見つけましょう</p>

                <SearchBar
                    placeholder="料理名やキーワードを入力"
                    buttonText="検索"
                />
        </div>
    )
}

