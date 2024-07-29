import { FC } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

interface GameProps {
  name: string;
  released: string;
  image: string;
}

const Game: FC<GameProps> = ({ name, released, image }) => {
  return (
    <Card>
      <h3>{name}</h3>
      <p>{released}</p>
      <img src={image} alt={name} />
    </Card>
  );
};

const Card = styled(motion.div)`
  img {
    width: 100%;
  }
`;

export default Game;
