import Link from "next/link";
import { Location } from "../../model";
import { toast } from "react-toastify";

export const toastSuccess = ({ latitude, longitude }: Location) => {
  toast.success(
    <Link style={{ textDecoration: "none", color: "InfoText" }} href="/">
      New location set to {latitude} / {longitude}. Click here or in home icon
      to forecast the weather.
    </Link>
  );
};

export const toastError = () => {
  toast.error("There was an error setting the new location");
};
