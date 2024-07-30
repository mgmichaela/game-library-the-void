const apiKey = process.env.REACT_APP_API_KEY;

const base_url = "https://api.rawg.io/api/";

const getCurrentMonth = () => {
  const month = new Date().getMonth() + 1;

  if (month < 10) {
    return `0${month}`;
  }
  return month;
};

const getCurrentDay = () => {
  const day = new Date().getDate();

  if (day < 10) {
    return `0${day}`;
  }
  return day;
};

const currentYear = new Date().getFullYear();
const currentMonth = getCurrentMonth();
const currentDay = getCurrentDay();

const currentDate = `${currentYear}-${currentMonth}-${currentDay}`;
const lastYearDate = `${currentYear - 1}-${currentMonth}-${currentDay}`;
const nextYearDate = `${currentYear + 1}-${currentMonth}-${currentDay}`;

export const getPopularGamesURL = () =>
  `${base_url}games?key=${apiKey}&dates=${lastYearDate},${currentDate}&ordering=-rating&page_size=10`;

export const getUpcomingGamesURL = () =>
  `${base_url}games?key=${apiKey}&dates=${currentDate},${nextYearDate}&ordering=-added&page_size=10`;

export const getNewGamesURL = () =>
  `${base_url}games?key=${apiKey}&dates=${lastYearDate},${currentDate}&ordering=-released&page_size=10`;
