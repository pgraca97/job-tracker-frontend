import { Route, Routes } from "react-router"
import { HomePage } from "./pages/HomePage"
import { MyApplicationsPage } from "./pages/MyApplicationsPage"

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/my-applications" element={<MyApplicationsPage />} />
    </Routes>
  )
}

export default App
