import { Route, Routes, useLocation } from "react-router-dom"
import Shell from "./components/Shell"
import Home from "./pages/Home"
import Work from "./pages/Work"
import Project from "./pages/Project"
import Archive from "./pages/Archive"
import About from "./pages/About"
import Contact from "./pages/Contact"
import NotFound from "./pages/NotFound"

export default function App() {
  const location = useLocation()
  return (
    <Shell>
      <Routes location={location}>
        <Route path="/" element={<Home />} />
        <Route path="/work" element={<Work />} />
        <Route path="/projects/:slug" element={<Project />} />
        <Route path="/archive" element={<Archive />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Shell>
  )
}
