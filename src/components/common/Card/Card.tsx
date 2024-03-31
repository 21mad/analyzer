import { Skeleton, Typography } from "@mui/material";
import "./Card.css";

export interface CardProps {
  title?: string;
  children?: React.ReactNode;
  size?: "small" | "medium" | "large";
  style?: React.CSSProperties;
  onClick?: () => void;
  loading?: boolean;
}

const size_map = {
  small: 4,
  medium: 2,
  large: 2,
};

export function Card(props: CardProps) {
  const { title, onClick, size = "small", loading = false, style } = props;

  function Loader(props: any) {
    const { size, style } = props;
    const lines = size_map[size as keyof typeof size_map];
    const bgColor =
      style?.backgroundColor === "var(--pakistan-green)" ? "#fefae042" : false;

    return (
      <>
        {Array.from({ length: lines }, (_, i) => (
          <Skeleton
            variant="text"
            style={{ backgroundColor: bgColor || "" }}
            key={i}
          />
        ))}
        <div style={{ height: "10px" }}></div>
        {(size === "medium" || size === "large") && (
          <Skeleton
            variant="rounded"
            style={{ backgroundColor: bgColor || "", height: "82%" }}
          />
        )}
      </>
    );
  }

  return (
    <div
      className={`card ${size ? `card-${size}` : ""} ${
        onClick ? "with-action" : ""
      }`}
      style={props.style}
      onClick={onClick}
    >
      {title && (
        <Typography className="card-title" variant="body1">
          {title}
        </Typography>
      )}
      {loading ? <Loader size={size} style={style} /> : props.children}
    </div>
  );
}
