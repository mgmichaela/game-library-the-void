import { FC } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useGameDetails } from "../context/GameDetailsContext";
import { useGameScreenshots } from "../context/GameScreenshotsContext";
import { Link } from "react-router-dom";
import { popup } from "../animations/animation";

interface GameProps {
  name: string;
  released: string;
  image: string;
  gameID: number;
}

const Game: FC<GameProps> = ({ name, released, image, gameID }) => {
  const { fetchGameDetails } = useGameDetails();
  const { fetchGameScreenshots } = useGameScreenshots();

  const handleCardClick = () => {
    const scrollBarWidth =
      window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = `${scrollBarWidth}px`;

    fetchGameDetails(gameID);
    fetchGameScreenshots(gameID);
  };

  return (
    <StyledCard
      variants={popup}
      initial="hidden"
      animate="show"
      onClick={handleCardClick}
    >
      <Link to={`games/${gameID}`}>
        <h4>{name}</h4>
        <p>{released}</p>
        <img src={image} alt={name} />
      </Link>
    </StyledCard>
  );
};

const StyledCard = styled(motion.div)`
  height: 25rem;
  box-shadow: 0 8px 16px #2c1b46;
  border: 2px solid #714c9d;
  text-align: center;
  border-radius: 1rem;
  cursor: pointer;
  overflow: hidden;
  display: flex;
  flex-direction: column;

  h4 {
    margin: 0.5rem 0;
    font-size: 1.1rem;
  }

  p {
    font-size: 0.9rem;
    color: #696969;
  }

  img {
    width: 100%;
    height: 100%;
    flex-grow: 1;
    object-fit: cover;
    border-radius: 0 0 1rem 1rem;
  }

  @media (max-width: 768px) {
    height: 20rem;

    h4 {
      font-size: 1rem;
      margin: 0.5rem;
    }

    p {
      font-size: 0.9rem;
    }
  }

  @media (max-width: 576px) {
    height: 18rem;

    h4 {
      font-size: 0.75rem;
      margin: 0.5rem;
    }

    p {
      font-size: 0.65rem;
    }
  }
`;

export default Game;
