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
  min-height: 30vh;
  box-shadow: 0px 5px 30px rgba(0, 0, 0, 0.2);
  text-align: center;
  border-radius: 1rem;
  cursor: pointer;

  img {
    width: 100%;
    min-height: 30vh;
    border-radius: 0 0 1rem 1rem;
    display: block;
    object-fit: cover;
  }
`;

export default Game;
