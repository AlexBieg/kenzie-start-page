import { useEffect, useRef } from 'react';

export const useInterval = (callback, delay) => {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

export const getWeekNumber = (d) => {
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay()||7));
  var yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
  var weekNo = Math.ceil(( ( (d - yearStart) / 86400000) + 1)/7);
  return weekNo;
}

export const getTimeText = (date) => {
  let minutes = date.getMinutes();

  if (minutes < 10) {
    minutes = '0' + minutes;
  }

  return `${date.getHours() % 12}:${minutes}`;
}

export const getDateText = (date) => {
  return date.toLocaleDateString('en-US', {weekday: 'long', month: 'long', day: 'numeric'}) + getDateSuffix(date);
}

export const getDateSuffix = (date) => {
  const num = date.getDate();

  if (num > 3 && num < 21) return 'th';

  switch (num % 10) {
    case 1:  return "st";
    case 2:  return "nd";
    case 3:  return "rd";
    default: return "th";
  }
}

export const getRandomBackgroundUrl = () => {
  const baseBackgroundURL = 'background/sputnik-';
  const backgroundChoice = Math.floor(Math.random() * 10 + 1);
  return `${baseBackgroundURL}${backgroundChoice}.jpg`;
}

export const getDistance = () => {
  const earthSpeed = 390;
  const kenzieBirthDate = new Date(1994, 10, 28);
  const kToM = 0.621371;

  const dif = (new Date()).getTime() - kenzieBirthDate.getTime();

  const Seconds_from_T1_to_T2 = dif / 1000;
  const secDiff = Math.abs(Seconds_from_T1_to_T2);
  return Math.round(secDiff * earthSpeed * kToM);
}