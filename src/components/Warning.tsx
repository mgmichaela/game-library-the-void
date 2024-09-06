import { Dispatch, FC, SetStateAction } from "react";
import styled from "styled-components";
import adultIcon from "../images/18+.png";

interface WarningProps {
  setIsAgeConfirmed: Dispatch<SetStateAction<boolean>>;
}

const Warning: FC<WarningProps> = ({ setIsAgeConfirmed }) => {
  const handleExit = () => {
    window.close();

    window.location.href = "https://www.google.com";
  };

  const handleConfirmation = () => {
    localStorage.setItem("isAgeConfirmed", "true");
    setIsAgeConfirmed(true);
  };

  return (
    <WarningWrapper>
      <Heading>
        <img src={adultIcon} alt="18+ icon" />
        <h2>Warning: Violent and Graphic Content</h2>
      </Heading>
      <h3>
        This content may potentially include violent and/or graphic material
        that is inappropriate for minors. By proceeding, you confirm that you
        are 18 years or older and agree to view this content.
      </h3>
      <ConfirmButton onClick={handleConfirmation}>
        I confirm that I am 18+
      </ConfirmButton>
      <ExitButton onClick={handleExit}>Exit</ExitButton>
    </WarningWrapper>
  );
};

export default Warning;

const ConfirmButton = styled.button`
  font-size: 1rem;
  border: none;
  padding: 0.5rem 2rem;
  cursor: pointer;
  background: #714c9d;
  color: #fff;
  border-radius: 4px;
  margin: 1rem;

  &:hover {
    background: #2c1b46;
  }
`;

const ExitButton = styled.button`
  font-size: 1rem;
  border: none;
  padding: 0.5rem 2rem;
  cursor: pointer;
  color: #ff00a2;
  border: 1px solid #ff00a2;
  border-radius: 4px;
  margin: 1rem 0 0 3rem;

  &:hover {
    color: #970060;
    border: 1px solid #970060;
  }
`;

const WarningWrapper = styled.div`
  padding: 15rem;
  h3 {
    margin: 1rem;
    padding-right: 15rem;
  }

  @media (max-width: 1200px) {
    padding: 2rem;
    h3 {
      margin: 0rem;
      padding-right: 0rem;
    }
  }

  @media (max-width: 800px) {
    padding: 2rem;
    h3 {
      margin: 0rem;
      padding-right: 0rem;
    }
  }

  @media (max-width: 576px) {
    padding: 1rem;
    h3 {
      margin: 0rem;
      padding-right: 0rem;
    }
  }
`;

const Heading = styled.div`
  display: flex;
  align-items: center;

  img {
    padding-right: 1rem;
  }
`;
