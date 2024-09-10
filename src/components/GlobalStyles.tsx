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

html, body {
    width: 100%;
}

html {
    &::-webkit-scrollbar {
        width: 0.5rem;
    }

    &::-webkit-scrollbar-thumb {
        background-color: #a7a6a6;
    }
}

body {
    font-family: 'Montserrat', sans-serif;
}

h2, h3 {
    color: #fff;
    text-shadow: 1px 1px 1px #ff00a2, 0 0 0.5em #2c1b46, 0 0 0.1em #714c9d;
}

h2 {
    font-size: 3rem;
    font-family: "Abril Fatface", cursive;
    font-weight: 300;
}

h3 {
    font-size: 2rem;
    font-weight: 500;
    font-family: 'Montserrat', sans-serif;
    padding-top: 1rem;
}

h4 {
    color: #fff;
    font-size: 1.3rem;
    font-weight: 500;
    padding: 1rem 0;
    font-family: 'Montserrat', sans-serif;
}

p {
    font-size: 1.2rem;
    font-weight: 300;
    line-height: 2;
    color: #696969;
    padding-bottom: 1rem;
}

a {
    text-decoration: none;
    color: #333;
}

input, button {
    font-family: 'Montserrat', sans-serif;
    font-weight: 500;
}
`;

export default GlobalStyles;
