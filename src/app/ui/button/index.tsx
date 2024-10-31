import Image from "next/image";
import styles from "./button.module.css";
import { Spinner } from "../spinner";

export const Button = (props: Props) => {
  const { isLoading, onClick, imageProps } = props;
  const { alt, width, height, src, priority } = imageProps;
  return (
    <div className={styles.container}>
      <button type="button" tabIndex={0} onClick={onClick}>
        {isLoading ? (
          <Spinner />
        ) : (
          <Image
            alt={alt}
            width={width}
            height={height}
            src={src}
            priority={priority}
          />
        )}
      </button>
    </div>
  );
};

type Props = {
  isLoading?: boolean;
  onClick?: () => void;
  imageProps: {
    width: number;
    height: number;
    src: string;
    alt: string;
    priority?: boolean;
  };
};
