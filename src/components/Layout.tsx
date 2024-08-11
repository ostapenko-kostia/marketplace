import { FC, PropsWithChildren, useState } from "react";
import Header from "../components/Header";
import Sidebar from "./Sidebar";
import Search from "./Search";

interface LayoutProps extends PropsWithChildren {
  sidebar?: boolean;
}

const Layout: FC<LayoutProps> = ({ sidebar = true, children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  return (
    <div className="flex flex-col h-screen">
      <Header setIsMenuOpen={setIsMenuOpen} />
      <Search className={`${window.screen.width < 820 ? (isMenuOpen ? "flex z-[1000]" : "hidden") : "hidden"} !h-[80px] !rounded-none !py-2 px-5 mx-auto [&>form]:w-full max-sm:[&>form>input]:w-[160px] max-xs:[&>form>input]:w-[100px] w-full`} />
      {sidebar ? (
        <div className="grid h-full max-md:flex overflow-y-hidden relative" style={{ gridTemplateColumns: "1.2fr 4fr" }}>
          <Sidebar className={`${window.screen.width < 820 ? (isMenuOpen ? "block absolute z-[1000]" : "hidden") : "block"}`} />
          <main className="bg-white overflow-y-scroll w-full" style={{ filter: window.screen.width < 820 && isMenuOpen ? "blur(2px)" : "none" }}>
            {children}
          </main>
        </div>
      ) : (
        <main className="bg-white overflow-y-scroll">{children}</main>
      )}
    </div>
  );
};

export default Layout;
