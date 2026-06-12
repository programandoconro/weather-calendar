import styles from "./popup.module.css";

type Props = {
  content: React.ReactNode;
  position?: "left" | "right";
  children: React.ReactNode;
};

export const Popup = ({ content, children, position = "right" }: Props) => {
  return (
    <div className={styles.container}>
      <div className={styles.children}>{children}</div>
      <div
        className={`${styles.popup} ${position === "left" ? styles.left : styles.right}`}
        role="dialog"
      >
        {content}
      </div>
    </div>
  );
};
