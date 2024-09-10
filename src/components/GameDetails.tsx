import styled from "styled-components";
import { AnimatePresence, motion } from "framer-motion";
import { useGameDetails } from "../context/GameDetailsContext";
import { useGameScreenshots } from "../context/GameScreenshotsContext";
import Loader from "./Loader";
import { useNavigate } from "react-router-dom";
import playstation from "../images/playstation.svg";
import steam from "../images/steam.svg";
import xbox from "../images/xbox.svg";
import nintendo from "../images/nintendo.svg";
import apple from "../images/apple.svg";
import gamepad from "../images/gamepad.svg";
import starFull from "../images/star-full.png";
import starEmpty from "../images/star-empty.png";
import { FC } from "react";

enum Platform {
  playstation = "playstation",
  xbox = "xbox",
  pc = "pc",
  nintendo = "nintendo",
  ios = "apple",
}

const GameDetails: FC = () => {
  const navigate = useNavigate();
  const { gameDetails, loadingGameDetails } = useGameDetails();
  const { gameScreenshots, loadingGameScreenshots } = useGameScreenshots();

  if (loadingGameDetails && loadingGameScreenshots) return <Loader />;

  const goBack = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.currentTarget.classList.contains("shadow")) {
      document.body.style.overflow = "auto";
      document.body.style.paddingRight = "0";
      navigate("/");
    }
  };

  const platformIcons = {
    [Platform.playstation]: playstation,
    [Platform.xbox]: xbox,
    [Platform.pc]: steam,
    [Platform.nintendo]: nintendo,
    [Platform.ios]: apple,
  };

  const getPlatformIcon = (platform: string) => {
    const platformKey = Object.values(Platform).find((key) =>
      platform.toLowerCase().includes(key)
    );
    return platformKey ? platformIcons[platformKey] : gamepad;
  };

  const platforms = Array.from(
    new Set(gameDetails?.platforms.map((p) => p.platform.name.toLowerCase()))
  );

  const filterDuplicatePlatforms = (
    platforms: string[],
    platformEnum: typeof Platform
  ) =>
    platforms.filter(
      (platform, index, self) =>
        !Object.values(platformEnum).some(
          (enumValue) =>
            platform.includes(enumValue) &&
            self.findIndex((p) => p.includes(enumValue)) < index
        )
    );

  const getStars = () => {
    const rating = Math.floor(gameDetails?.rating || 0);
    return Array.from({ length: 5 }, (_, i) => (
      <img
        alt="star"
        key={i}
        src={i < rating ? starFull : starEmpty}
        style={{ margin: "0 0.1rem" }}
      />
    ));
  };

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
                {getStars()}
              </motion.div>
              <Info>
                <h4>Platforms</h4>
                <Platforms>
                  {filterDuplicatePlatforms(platforms, Platform).map(
                    (platform) => (
                      <motion.img
                        key={platform}
                        src={getPlatformIcon(platform)}
                        alt={platform}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        transition={{ duration: 0.2 }}
                      />
                    )
                  )}
                </Platforms>
              </Info>
            </Stats>
            <Media>
              <motion.img
                src={gameDetails?.background_image}
                alt="background"
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
              {gameScreenshots?.results.map((screenshot) => (
                <motion.img
                  key={screenshot.id}
                  src={screenshot.image}
                  alt="game screenshot"
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
    background: #714c9d;
  }
`;

const Detail = styled(motion.div)`
  width: 80%;
  border-radius: 1rem;
  padding: 2rem 5rem;
  background: #050102;
  box-shadow: 0 0 10px #ff00a2;
  border-left: 0.5px solid #ff00a2;
  border-right: 0.5px solid #ff00a2;
  position: absolute;
  left: 10%;
  color: #fff;

  img {
    width: 100%;
  }
`;

const Stats = styled(motion.div)`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  img {
    width: 2rem;
    height: 2rem;
  }
`;

const Info = styled(motion.div)`
  text-align: center;
  padding: 0 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Platforms = styled(motion.div)`
  img {
    margin: 0.5rem;
  }
`;

const Media = styled(motion.div)`
  margin-top: 5rem;
`;

const Description = styled(motion.div)`
  margin: 5rem 0;
`;

export default GameDetails;
