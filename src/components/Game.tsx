import { Dispatch, FC, SetStateAction } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useGameDetails } from "../context/GameDetailsContext";
import { useGameScreenshots } from "../context/GameScreenshots";
import { Link } from "react-router-dom";

interface GameProps {
  name: string;
  released: string;
  image: string;
  gameID: number;
  setIsClicked: Dispatch<SetStateAction<boolean>>;
}

const Game: FC<GameProps> = ({
  name,
  released,
  image,
  gameID,
  setIsClicked,
}) => {
  const { fetchGameDetails } = useGameDetails();
  const { fetchGameScreenshots } = useGameScreenshots();

  const handleCardClick = () => {
    fetchGameDetails(gameID);
    fetchGameScreenshots(gameID);
    setIsClicked(true);
  };

  return (
    <Card onClick={handleCardClick}>
      <Link to={`/game/${gameID}`}>
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
    height: 40vh;
    object-fit: cover;
  }
`;

export default Game;
