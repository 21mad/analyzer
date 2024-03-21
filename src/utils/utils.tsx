// get icon from https://fonts.google.com/icons
export function getIcon(name: string, filled?: boolean, style: any = {}) {
  return name ? (
    <span className={`material-symbols-outlined ${filled ? 'fontFill' : ''}`} style={style}>
      {name}
    </span>
  ) : null;
}
