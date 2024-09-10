import { FC } from "react";
import { useGameSearch } from "../context/SearchContext";
import styled from "styled-components";

const Pagination: FC = () => {
  const {
    searchGames,
    nextPage,
    prevPage,
    currentPage,
    textInput,
    searchedGameName,
  } = useGameSearch();

  const handleNextPage = () => {
    if (nextPage) {
      searchGames(searchedGameName || textInput, currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (prevPage && currentPage > 1) {
      searchGames(searchedGameName || textInput, currentPage - 1);
    }
  };

  return (
    <>
      <PaginationControls>
        <button onClick={handlePrevPage} disabled={!prevPage}>
          Previous
        </button>
        <span>page {currentPage}</span>
        <button onClick={handleNextPage} disabled={!nextPage}>
          Next
        </button>
      </PaginationControls>
    </>
  );
};

export default Pagination;

const PaginationControls = styled.div`
  display: flex;
  justify-content: center;
  margin: 2rem 0;

  button {
    border-radius: 4px;
    padding: 0.5rem 1rem;
    margin: 0 1rem;
    background-color: #714c9d;
    color: #fff;
    border: none;
    cursor: pointer;

    &:hover {
      background: #2c1b46;
    }

    &:disabled {
      background-color: gray;
      cursor: default;
    }
  }

  span {
    padding: 0.5rem 1rem;
    color: #696969;
    font-family: "Montserrat", sans-serif;
  }
`;
