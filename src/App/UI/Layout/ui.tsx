import { Outlet } from "react-router-dom";
import { Header } from "../Header/ui";
import { Footer } from "../Footer/ui";

export const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};
