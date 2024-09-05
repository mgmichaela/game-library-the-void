import { FC, useState } from "react";
import styled from "styled-components";
import { useGameSearch } from "../context/SearchContext";

const Pagination: FC = () => {
  const { textInput, nextPage, prevPage, searchGames } = useGameSearch();

  const [currentPage, setCurrentPage] = useState<number>(1);

  const goToNextPage = () => {
    if (nextPage) {
      searchGames(textInput, currentPage + 1);
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPrevPage = () => {
    if (prevPage) {
      searchGames(textInput, currentPage - 1);
      setCurrentPage(currentPage - 1);
    }
  };
  return (
    <PaginationControls>
      <button onClick={goToPrevPage} disabled={!prevPage}>
        Previous
      </button>
      <span>page {currentPage}</span>
      <button onClick={goToNextPage} disabled={!nextPage}>
        Next
      </button>
    </PaginationControls>
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
    &:disabled {
      background-color: gray;
      cursor: not-allowed;
    }
  }
  span {
    padding: 0.5rem 1rem;
    color: #fff;
  }
`;
