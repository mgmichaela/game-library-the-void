import { FC } from "react";
import styled from "styled-components";
import adultIcon from "../images/18+.png";

const NotAllowed: FC = () => {
  return (
    <div>
      <Heading>
        <img src={adultIcon} alt="icon" />
        <h2>Age-restricted Content</h2>
      </Heading>
      <h4>Not allowed.</h4>
    </div>
  );
};

export default NotAllowed;

const Heading = styled.div`
  display: flex;
  align-items: center;

  img {
    padding-right: 1rem;
  }
`;
