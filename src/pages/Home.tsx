import { useNavigate } from "react-router-dom";
import "./Home.css";
import { Typography, Button } from "@mui/material";

export function Home() {
  const navigate = useNavigate();
  return (
    <div className="home">
      <Typography variant="h2" className="title">
        Welcome to Todoist Analyzer
      </Typography>
      <Button
        variant="contained"
        color="primary"
        className="get-started"
        size="large"
        onClick={() => navigate("/app")}
      >
        Get Started
      </Button>
    </div>
  );
}
