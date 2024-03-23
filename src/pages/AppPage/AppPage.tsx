import { IconButton, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./AppPage.css";
import { getIcon } from "../../utils/utils.tsx";
import { Card } from "../../components/common/Card/Card.tsx";

export function AppPage() {
  const navigate = useNavigate();
  const testCards = Array(3)
    .fill(0)
    .map((_, i) => (
      <Card
        key={i}
        title={"Card " + i}
        onClick={() => {
          navigate("#" + i);
        }}
      />
    ));
  return (
    <div className="app-page">
      <AppBar />
      <div className="app">
        <div>
          <div className="cards">
            <Card
              title="Current MRR"
              onClick={() => navigate("#mrr")}
              style={{
                color: "white",
                backgroundColor: "var(--pakistan-green)",
              }}
            >
              <Typography variant="h4">$12.4k</Typography>
            </Card>
            <Card
              title="Current Customers"
              onClick={() => navigate("#customers")}
              style={{ backgroundColor: "var(--cornsilk)" }}
            >
              <Typography variant="h4">16,601</Typography>
            </Card>
            <Card
              title="Active Customers"
              onClick={() => navigate("#active-customers")}
              style={{ backgroundColor: "var(--earth-yellow)" }}
            >
              <Typography variant="h4">33%</Typography>
            </Card>
            <Card
              title="Chrun rate"
              onClick={() => navigate("#churn-rate")}
              style={{ backgroundColor: "var(--tigers-eye)" }}
            >
              <Typography variant="h4">2%</Typography>
            </Card>
            <Card
              title="Sales"
              size="medium"
              onClick={() => navigate("#sales")}
            >
              <Typography variant="h4">One column card</Typography>
            </Card>
            <Card title="Trend" size="big" onClick={() => navigate("#trend")}>
              <Typography variant="h4">2%</Typography>
            </Card>
            <div className="cards-container-1">{testCards}</div>
            {/* {testCards} */}
          </div>
        </div>
      </div>
    </div>
  );

  function AppBar() {
    return (
      <div className="top-bar">
        <Typography
          variant="h5"
          className="app-title"
          paddingLeft={2}
          fontWeight={"bold"}
          onClick={() => navigate("/")}
        >
          Todoist Analyzer
        </Typography>
        <div className="spacer"></div>
        <IconButton onClick={() => navigate("/")}>
          {getIcon("home", false, { color: "var(--C-BLACK)" })}
        </IconButton>
      </div>
    );
  }
}
