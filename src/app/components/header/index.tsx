import { Button } from "@/app/ui/button";
import { useLocationUpdate } from "./use-location-update";
import style from "./header.module.css";
import { Popup } from "@/app/ui/popup";
import { useRouter } from "next/navigation";

export const Header = () => {
  const { onClick, isLoading } = useLocationUpdate(true);
  const router = useRouter();

  const handleOpenMap = () => {
    if (!navigator.onLine) {
      alert("インターネット接続がありません。マップを開くにはインターネット接続が必要です。\nNo internet connection. A network connection is required to open the map.");
      return;
    }
    router.push("/map");
  };

  return (
    <header className={style.container}>
      <>
        <Popup content="現在の位置情報を更新したいですか？" position="right">
          <Button
            isLoading={isLoading}
            onClick={onClick}
            imageProps={{
              width: 35,
              height: 35,
              src: "/geolocation.png",
              alt: "Update geolocation",
              priority: true,
            }}
          />
        </Popup>
      </>

      <Popup content="Open Map" position="left">
        <Button
          imageProps={{
            src: "/location-icon.png",
            width: 35,
            height: 35,
            alt: "Open Map",
            priority: true,
          }}
          onClick={handleOpenMap}
        />
      </Popup>
    </header>
  );
};
