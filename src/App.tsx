import { Route, Routes } from "react-router"
import { ExamplePage } from "./pages/ExamplePage"
import { HomePage } from "./pages/HomePage"

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/example" element={<ExamplePage />} />
    </Routes>
  )
}

export default App
