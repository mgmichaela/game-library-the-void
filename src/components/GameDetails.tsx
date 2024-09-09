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

enum Platform {
  playstation = "playstation",
  xbox = "xbox",
  pc = "steam",
  nintendo = "nintendo",
  apple = "apple",
}

const GameDetails = () => {
  const navigate = useNavigate();

  const { gameDetails, loadingGameDetails } = useGameDetails();
  const { gameScreenshots, loadingGameScreenshots } = useGameScreenshots();

  if (loadingGameDetails && loadingGameScreenshots) return <Loader />;

  const goBack = (e: React.MouseEvent<HTMLDivElement>) => {
    const element = e.currentTarget;

    if (element.classList.contains("shadow")) {
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
    [Platform.apple]: apple,
  };

  const getPlatformIcon = (platform: string) => {
    const platformLowerCase = platform.toLowerCase();

    const foundPlatform = Object.values(Platform).find((key) =>
      platformLowerCase.includes(key)
    );

    return foundPlatform ? platformIcons[foundPlatform] : gamepad;
  };

  const platforms = Array.from(
    new Set(
      gameDetails?.platforms.map((platformItem) =>
        platformItem.platform.name.toLowerCase()
      )
    )
  );

  const filterDuplicatePlatforms = (
    platforms: string[],
    platformEnum: typeof Platform
  ) => {
    const enumValues = Object.values(platformEnum);

    return platforms.filter(
      (platform, index, self) =>
        !enumValues.some(
          (enumValue) =>
            platform.includes(enumValue) &&
            self.findIndex((p) => p.includes(enumValue)) < index
        )
    );
  };

  const getStars = () => {
    const stars = [];
    const rating = Math.floor(gameDetails?.rating as number);
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<img alt="star" key={i} src={starFull}></img>);
        stars.push(" ");
      } else {
        stars.push(<img alt="star" key={i} src={starEmpty}></img>);
        stars.push(" ");
      }
    }
    return stars;
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
                      ></motion.img>
                    )
                  )}
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
    background: #714c9d;
  }
`;

const Detail = styled(motion.div)`
  width: 80%;
  border-radius: 1rem;
  padding: 2rem 5rem;
  background: #050102;
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
  img {
    width: 2rem;
    height: 2rem;
    display: inline;
  }
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
