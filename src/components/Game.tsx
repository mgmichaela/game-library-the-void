import { FC } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useGameDetails } from "../context/GameDetailsContext";
import { useGameScreenshots } from "../context/GameScreenshotsContext";
import { Link } from "react-router-dom";

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
    // Calculate scrollbar width and add padding to prevent layout shift
    const scrollBarWidth =
      window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = `${scrollBarWidth}px`; // Fix layout shift caused by scrollbar

    fetchGameDetails(gameID);
    fetchGameScreenshots(gameID);
  };

  return (
    <Card onClick={handleCardClick}>
      <Link to={`games/${gameID}`}>
        <h3>{name}</h3>
        <p>{released}</p>
        <img src={image} alt={name} />
      </Link>
    </Card>
  );
};

const Card = styled(motion.div)`
  height: 25rem;
  box-shadow: 0px 5px 30px rgba(0, 0, 0, 0.2);
  text-align: center;
  border-radius: 1rem;
  cursor: pointer;
  overflow: hidden;
  display: flex;
  flex-direction: column;

  h3 {
    margin: 0.5rem 0;
    font-size: 1.1rem;
  }

  p {
    font-size: 0.9rem;
    color: #888;
  }

  img {
    width: 100%;
    height: 100%;
    flex-grow: 1;
    object-fit: cover;
    border-radius: 0 0 1rem 1rem;
  }
`;

export default Game;
