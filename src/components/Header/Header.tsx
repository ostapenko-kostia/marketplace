import { ReactElement, useState } from "react";
import AuthButtons from "../AuthButtons/AuthButtons";
import Button from "../Button/Button";
import Search from "../Search/Search";
import styles from "./styles.module.scss";
import Modal from "../Modal/Modal";
import { Link } from "react-router-dom";
import Home from "../../pages/Home/Home";
import { useAuthStore } from "../../store/store";

interface Props {
  page: ReactElement;
}

function Header({ page }: Props) {
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);

  const { isAuth, user } = useAuthStore();

  return (
    <>
      <header className={styles.header}>
        <div className={styles.container}>
          <button
            className={`${styles.searchButton} shown-mobile`}
            onClick={() => setIsSearchOpen(true)}
          >
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
          {page.type == Home ? (
            <Link to="/create">
              <Button>Sell</Button>
            </Link>
          ) : (
            <Link to="/">
              <Button>
                <i className="fa-solid fa-house" />
              </Button>
            </Link>
          )}

          <Search shownMobile={false} placeholder="I am looking for..." />
          {isAuth ? (
            <div className={styles.welcomeContainer}>
              Welcome, {user.firstName}!
            </div>
          ) : (
            <AuthButtons />
          )}
        </div>

        <Modal isOpen={isSearchOpen} close={() => setIsSearchOpen(false)}>
          <Search shownMobile={true} placeholder="I am looking for..." />
        </Modal>
      </header>
    </>
  );
}

export default Header;
