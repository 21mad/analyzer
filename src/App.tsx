import "./assets/styles/App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home/Home";
import { AppPage } from "./pages/AppPage/AppPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/app" element={<AppPage />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
