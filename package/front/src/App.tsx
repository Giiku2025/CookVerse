import { Routes, Route } from "react-router-dom"
import Layout from "./components/layout/Layout/Layout.tsx"
import HomePage from "./pages/home/HomePage"
import SearchPage from "./pages/search/SearchPage"
import IngredientsPage from "./pages/ingredients/IngredientsPage"
import CalculatorPage from "./pages/calculator/CalculatorPage"
import NotFoundPage from "./pages/notFound/NotFoundPage"

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/ingredients" element={<IngredientsPage />} />
        <Route path="/calculator" element={<CalculatorPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Layout>
  )
}

export default App

