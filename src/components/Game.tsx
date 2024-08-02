import { Dispatch, FC, SetStateAction, useEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useGameDetails } from "../context/GameDetailsContext";
import { useGameScreenshots } from "../context/GameScreenshotsContext";
import { useNavigate } from "react-router-dom";

interface GameProps {
  name: string;
  released: string;
  image: string;
  gameID: number;
  setIsClicked: Dispatch<SetStateAction<boolean>>;
  isClicked: boolean;
}

const Game: FC<GameProps> = ({
  name,
  released,
  image,
  gameID,
  setIsClicked,
  isClicked,
}) => {
  const { fetchGameDetails } = useGameDetails();
  const { fetchGameScreenshots } = useGameScreenshots();
  const navigate = useNavigate();

  useEffect(() => {
    if (isClicked) {
      navigate(`/game/${gameID}`);
    } else {
      navigate("/");
    }
  }, [isClicked, navigate, gameID]);

  const handleCardClick = () => {
    fetchGameDetails(gameID);
    fetchGameScreenshots(gameID);
    setIsClicked(true);
  };

  return (
    <Card onClick={handleCardClick}>
      <h3>{name}</h3>
      <p>{released}</p>
      <img src={image} alt={name} />
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
  }
`;

export default Game;
