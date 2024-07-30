import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
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
    color: #534c90;
}
h3 {
    font-size: 1.3rem;
    font-weight: 500;
    color: #333;
    padding: 0.5rem;
}
p {
    font-size: 1.2rem;
    font-weight: 300;
    padding-top: 1.2rem;
    line-height: 200%;
    color: #696969;
}
a {
    text-decoration: none;
    color: #333;
}
`;

export default GlobalStyles;
