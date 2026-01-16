import { Route, Routes } from "react-router"
import ApplicationPage from "./pages/ApplicationPage"
import { HomePage } from "./pages/HomePage"
import { MyApplicationsPage } from "./pages/MyApplicationsPage"
import { NotFoundPage } from "./pages/NotFoundPage"

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/my-applications" element={<MyApplicationsPage />} />
      <Route path="*" element={<NotFoundPage />} />
      <Route path="/application/:id" element={<ApplicationPage />} />
    </Routes>
  )
}

export default App
