import { ChangeEvent, FormEvent } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import logo from "../images/logo.png";
import { useGameSearch } from "../context/SearchContext";

const Nav = ({
  setShowDefaultGames,
}: {
  setShowDefaultGames: (value: boolean) => void;
}) => {
  const { searchGames, textInput, setTextInput, setSearchedGameName } =
    useGameSearch();

  const inputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTextInput(e.target.value);
  };

  const submitSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (textInput.trim()) {
      searchGames(textInput);
      setSearchedGameName(textInput);
      setShowDefaultGames(false);
    }
    setTextInput("");
  };

  const clearSearched = () => {
    setShowDefaultGames(true);
  };

  return (
    <StyledNav>
      <Logo onClick={clearSearched}>
        <img src={logo} alt="logo" />
        <h1>The Void</h1>
      </Logo>
      <Form onSubmit={submitSearch}>
        <div style={{ paddingBottom: "2rem" }}>
          <input value={textInput} onChange={inputHandler} type="text" />
        </div>
        <div>
          <button type="submit">Search</button>
        </div>
      </Form>
    </StyledNav>
  );
};

const StyledNav = styled(motion.nav)`
  padding: 3rem 5rem;
  text-align: center;
  input {
    min-width: 30%;
    font-size: 1rem;
    padding: 0.5rem;
    border: none;
    margin-top: 1rem;
    box-shadow: 0 8px 16px #2c1b46;
    border: 2px solid #714c9d;
    border-radius: 4px;
    color: #fff;

    &:focus {
      outline: 0.25px solid #ff00a2;
    }
  }
  button {
    font-size: 1rem;
    border: none;
    padding: 0.5rem 2rem;
    cursor: pointer;
    background: #714c9d;
    color: #fff;
    border-radius: 4px;

    &:hover {
      background: #2c1b46;
    }
  }

  h1 {
    color: #fff;
  }
`;

const Logo = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  cursor: pointer;
  img {
    margin: 0rem 0.5rem;
    height: 2.5rem;
    width: 2.5rem;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

export default Nav;
