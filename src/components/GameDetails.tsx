import styled from "styled-components";
import { motion } from "framer-motion";
import { useGameDetails } from "../context/GameDetailsContext";
import { useGameScreenshots } from "../context/GameScreenshots";

const GameDetails = () => {
  const { gameDetails } = useGameDetails();
  const { gameScreenshots } = useGameScreenshots();

  return (
    <CardShadow>
      <Detail>
        <Stats>
          <div className="rating">
            <h3>{gameDetails?.name}</h3>
            <p>Rating: {gameDetails?.rating}</p>
          </div>
          <Info>
            <h3>Platforms</h3>
            <Platforms>
              {gameDetails?.platforms.map((platformItem: any) => (
                <h3 key={platformItem.platform.id}>
                  {platformItem.platform.name}
                </h3>
              ))}
            </Platforms>
          </Info>
        </Stats>
        <Media>
          <img src={gameDetails?.background_image} alt="image" />
        </Media>
        <Description>
          <p>{gameDetails?.description_raw}</p>
        </Description>
        <div className="gallery">
          {gameScreenshots?.results.map((result: any) => (
            <img key={result.id} src={result.image} alt="game image" />
          ))}
        </div>
      </Detail>
    </CardShadow>
  );
};

const CardShadow = styled(motion.div)`
  width: 100%;
  min-height: 100vh;
  overflow-y: scroll;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
`;

const Detail = styled(motion.div)`
  width: 80%;
  border-radius: 1rem;
  padding: 2rem 5rem;
  background: #fff;
  position: absolute;
  left: 10%;
  color: #000;
  img {
    width: 100%;
  }
`;

const Stats = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Info = styled(motion.div)`
  text-align: center;
`;

const Platforms = styled(motion.div)`
  display: flex;
  justify-content: space-evenly;
  img {
    margin-left: 3rem;
  }
`;

const Media = styled(motion.div)`
  margin-top: 5rem;
  img {
    width: 100%;
    /* height: 60vh;
    object-fit: cover; */
  }
`;

const Description = styled(motion.div)`
  margin: 5rem 0;
`;

export default GameDetails;
