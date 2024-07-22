import { ReactElement, useContext, useState } from "react";
import AuthButtons from "../AuthButtons/AuthButtons";
import Button from "../Button/Button";
import Search from "../Search/Search";
import styles from "./styles.module.scss";
import Modal from "../Modal/Modal";
import { Link } from "react-router-dom";
import Home from "../../pages/Home/Home";
import { Context } from "../../App";
import { observer } from "mobx-react-lite";
import axios from "axios";

interface Props {
  page: ReactElement;
}

function Header({ page }: Props) {
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);

  const { store } = useContext(Context);

  return (
    <>
      <header className={styles.header}>
        <form
          onSubmit={function (e) {
            e.preventDefault();
            const target = e.target as HTMLFormElement;
            let file: any = (target.file.files as FileList)[0];

            axios.defaults.headers.Authorization = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJvc3RhcGVua29rcGVyc29uYWxAZ21haWwuY29tIiwiaWF0IjoxNzIxNjY3NjE5LCJleHAiOjE3MjE2NjkwNTl9.wrmkQwXSZNw0WFR7_J1U8FiyMfJyI_fbvIYf9MgEKAw'

            axios.post(`${import.meta.env.VITE_API_BASE_URL}/listing/create`, {
              file,
              listing_data:
                '{\n  "name": "test",\n  "category": "other",\n  "price": 100,\n  "location": "Kyiv, Ukraine",\n  "description": "test"\n}\n',
            });
          }}
        >
          <input type="file" id="file" name="file" />
          <button type="submit">create</button>
        </form>
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
          {store.isAuth ? (
            <div className={styles.welcomeContainer}>
              Welcome, {store.user.first_name}!
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

export default observer(Header);
