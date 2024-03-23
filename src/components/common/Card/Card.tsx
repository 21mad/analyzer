import { Typography } from "@mui/material";
import "./Card.css";

export interface CardProps {
  title?: string;
  children?: React.ReactNode;
  size?: "small" | "medium" | "big";
  style?: React.CSSProperties;
  onClick?: () => void;
}

export function Card(props: CardProps) {
  const { title, onClick, size = "small" } = props;

  return (
    <div
      className={`card ${size ? `card-${size}` : ""} ${onClick ? "with-action" : ""}`}
      style={props.style}
      onClick={onClick}
    >
      {title && (
        <Typography className="card-title" variant="body1">
          {title}
        </Typography>
      )}
      {props.children}
    </div>
  );
}
