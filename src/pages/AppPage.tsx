import { AppBar, Typography } from "@mui/material";
// import { Navigate, Route, Routes } from "react-router-dom";

export function AppPage() {
  return (
    <div className="app-page">
      <AppBar position="static" color="primary" >
        <Typography variant="h4" className="title" paddingLeft={2}> 
          Todoist Analyzer
        </Typography>
      </AppBar>
    </div>
  );
}