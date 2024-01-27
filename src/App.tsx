import "./assets/styles/App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { AppBar } from "@mui/material";

function App() {
  return (
    <>
      <AppBar position="static" color="primary" >
        <h1>Todoist Analyzer</h1>
      </AppBar>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/app" element={<div>APP</div>} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;
