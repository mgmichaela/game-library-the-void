import styled from "styled-components";
import { AnimatePresence, motion } from "framer-motion";
import { useGameDetails } from "../context/GameDetailsContext";
import { useGameScreenshots } from "../context/GameScreenshotsContext";
import Loader from "./Loader";
import { useNavigate } from "react-router-dom";

const GameDetails = () => {
  const navigate = useNavigate();

  const goBack = (e: React.MouseEvent<HTMLDivElement>) => {
    const element = e.currentTarget;

    if (element.classList.contains("shadow")) {
      document.body.style.overflow = "auto";
      document.body.style.paddingRight = "0";
      navigate("/");
    }
  };

  const { gameDetails, loadingGameDetails } = useGameDetails();
  const { gameScreenshots, loadingGameScreenshots } = useGameScreenshots();

  if (loadingGameDetails && loadingGameScreenshots) return <Loader />;

  return (
    <AnimatePresence>
      {!loadingGameDetails && !loadingGameScreenshots && (
        <CardShadow
          className="shadow"
          onClick={goBack}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <Detail
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Stats>
              <motion.div
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -100, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <h3>{gameDetails?.name}</h3>
                <p>Rating: {gameDetails?.rating}</p>
              </motion.div>
              <Info>
                <h3>Platforms</h3>
                <Platforms>
                  {gameDetails?.platforms.map((platformItem) => (
                    <motion.h3
                      key={platformItem.platform.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      transition={{ duration: 0.2 }}
                    >
                      {platformItem.platform.name}
                    </motion.h3>
                  ))}
                </Platforms>
              </Info>
            </Stats>
            <Media>
              <motion.img
                src={gameDetails?.background_image}
                alt="image"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              />
            </Media>
            <Description>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {gameDetails?.description_raw}
              </motion.p>
            </Description>
            <motion.div className="gallery">
              {gameScreenshots?.results.map((result) => (
                <motion.img
                  key={result.id}
                  src={result.image}
                  alt="game image"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.2 }}
                />
              ))}
            </motion.div>
          </Detail>
        </CardShadow>
      )}
    </AnimatePresence>
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
  z-index: 5;

  &::-webkit-scrollbar {
    width: 0.5rem;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #534c90;
  }

  &::-webkit-scrollbar-track {
    background: white;
  }
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
  }
`;

const Description = styled(motion.div)`
  margin: 5rem 0;
`;

export default GameDetails;
