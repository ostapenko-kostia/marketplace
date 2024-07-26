import { ReactElement } from "react";
import Header from "../Header/Header";
import { useLocation } from "react-router-dom";

interface Props {
  page: ReactElement;
}

export default function Layout({ page }: Props) {
  const location = useLocation();
  switch (location.pathname) {
    case "/":
      document.title = "Quicklist - Home";
      break;
    case "/create":
      document.title = "Quicklist - Create Listing";
      break;
    case "/log-in":
      document.title = "Quicklist - Login";
      break;
    case "/sign-up":
      document.title = "Quicklist - Sign Up";
      break;
    case "/search":
      document.title = "Quicklist - Search";
      break;
    default:
      document.title = "Quicklist - Not Found";
      break;
  }

  if (location.pathname.includes("/listing/")) document.title = "Quicklist - Listing Details";

  return (
    <>
      <Header page={page} />
      {page}
    </>
  );
}
