import Image from "next/image";
import styles from "./open-map-button.module.css";

export const OpenMapButton = (props: {
  isOpen: boolean;
  handleToggleButton: () => void;
}) => {
  const { isOpen, handleToggleButton } = props;
  return (
    <div className={isOpen ? styles.close : styles.container}>
      <button className="button" onClick={handleToggleButton}>
        {isOpen ? (
          <div className="close-button">X</div>
        ) : (
          <Image
            src={"/location-icon.png"}
            width={35}
            height={35}
            alt="Open Map"
            priority
          />
        )}
      </button>
    </div>
  );
};
