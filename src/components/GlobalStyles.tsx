import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    background-color: #050102;

    &::-webkit-scrollbar {
    width: 0.5rem;
  }

  &::-webkit-scrollbar-thumb {
    background: #ff00a2;
  }
}

html {
    &::-webkit-scrollbar{
        width: 0.5rem;  
    }
    &::-webkit-scrollbar-thumb{
        background-color: #a7a6a6;
    }
}
body {
    font-family: 'Montserrat';
    width: 100%;
}
h2 {
    font-size: 3rem;
    font-family: "Abril Fatface";
    font-weight: lighter;
    color: #fff;
    text-shadow: 1px 1px 1px #ff00a2, 0 0 0.5em #2c1b46, 0 0 0.1em #714c9d;
}
h3 {
    font-size: 1.3rem;
    font-weight: 500;
    color: #fff;
    padding: 1rem 0 1rem 0;
}
p {
    font-size: 1.2rem;
    font-weight: 300;
    line-height: 200%;
    color: #696969;
    padding-bottom: 1rem;
}
a {
    text-decoration: none;
    color: #333;
}
input {
    font-family: 'Montserrat';
    font-weight: 500;
}
button {
    font-family: 'Montserrat';
}

`;

export default GlobalStyles;
