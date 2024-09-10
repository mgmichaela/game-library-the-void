import { ChangeEvent, FC, FormEvent } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import logo from "../images/logo.png";
import { useGameSearch } from "../context/SearchContext";

interface NavProps {
  setShowDefaultGames: (value: boolean) => void;
}

const Nav: FC<NavProps> = ({ setShowDefaultGames }) => {
  const { searchGames, textInput, setTextInput, setSearchedGameName } =
    useGameSearch();

  const inputHandler = (e: ChangeEvent<HTMLInputElement>) =>
    setTextInput(e.target.value);

  const submitSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (textInput.trim()) {
      searchGames(textInput);
      setSearchedGameName(textInput);
      setShowDefaultGames(false);
    }
    setTextInput("");
  };

  const clearSearched = () => setShowDefaultGames(true);

  return (
    <StyledNav>
      <Logo onClick={clearSearched}>
        <img src={logo} alt="logo" />
        <h1>The Void</h1>
      </Logo>
      <Form onSubmit={submitSearch}>
        <InputWrapper>
          <input value={textInput} onChange={inputHandler} type="text" />
        </InputWrapper>
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
    margin-top: 1rem;
    border: none;
    border-radius: 4px;
    color: #fff;
    border: 2px solid #714c9d;
    box-shadow: 0 8px 16px #2c1b46;

    &:focus {
      outline: 0.25px solid #ff00a2;
    }
  }

  button {
    font-size: 1rem;
    padding: 0.5rem 2rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    background: #714c9d;
    color: #fff;

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
    height: 2.5rem;
    width: 2.5rem;
    margin: 0 0.5rem;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const InputWrapper = styled.div`
  padding-bottom: 2rem;
`;

export default Nav;
