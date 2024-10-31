import styles from "./popup.module.css";

export const Popup = ({ content, children, position = "right" }: Props) => {
  const translate =
    position === "left" ? "translateX(-35px)" : "translateX(35px)";
  return (
    <div className={styles.container}>
      <div className={styles.children}>{children}</div>
      <div
        className={styles.popup}
        role="dialog"
        style={{ transform: translate }}
      >
        {content}
      </div>
    </div>
  );
};

type Props = {
  content: string;
  position?: "left" | "right";
  children: React.ReactNode;
};
