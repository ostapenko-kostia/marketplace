import { ReactElement } from "react";
import Header from "../Header/Header";

interface Props {
  page: ReactElement;
}

export default function Layout({ page }: Props) {
  return (
    <>
      <Header page={page} />
      {page}
    </>
  );
}
