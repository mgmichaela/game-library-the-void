# The Void - Game Library

**The Void** is a game library web app that allows users to explore a wide range of popular and upcoming games, with detailed information fetched from the largest multi-platform game database: RAWG. The app is built using **React** and **TypeScript**, with smooth animations, state management, and a responsive user interface.

## Features

- **Game Discovery**: Browse popular and upcoming games fetched from the RAWG API.
- **Game Details**: Click on any game to see detailed information including descriptions, ratings, platforms, and more.
- **Search Functionality**: Easily search for your favorite games by name.
- **Pagination**: Implemented simple pagination for better data management while browsing large datasets.
- **Loader Animation**: A stylish loading animation during data fetch, provided by [loading.io](https://loading.io/css/).
- **Responsive Design**: Fully responsive layout for a seamless experience on all devices.
- **Smooth Animations**: Transitions and interactions made with Framer Motion for an engaging experience.

## Tech Stack

- **React**
- **TypeScript**
- **Axios**
- **React DOM**
- **Context API**
- **Styled Components**
- **Framer Motion**
- **RAWG API**

## Deployment

This project is deployed via **Netlify**. You can visit the live version of the app [here](https://66e02897460c8c037bc55f3b--glittering-raindrop-99d45e.netlify.app/).

## Installation and Setup Instructions

1. Clone this repository.
2. Ensure you have **node** and **npm** installed globally on your machine.
3. Install all the dependencies:

```bash
npm install
```

4. To start the server:

```bash
npm start
```

5. Fire up your favorite browser and visit:

```bash
localhost:3000
```

-

## Additional Info

### Custom Hooks

- I'm using custom hooks to manage the global state for the games, providing data and actions throughout the app using Context API.

### API Source

- RAWG API: The app uses the RAWG Video Games Database API to fetch game data. You can find more information about the API [here](https://rawg.io/apidocs).

### Loader Animation

- The loader animation when fetching game data is sourced from [loading.io](https://loading.io/css/).

### Possible Future Improvements

- User Authentication: Implement user login for saving favorite games.
- Advanced Filters: Add filters to search by genre, release date, and rating.

## HF!
