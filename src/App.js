import React, { useState, useEffect } from 'react';
import './App.css';
import THINGS from './things.js';
import { getWeekNumber, useInterval, getTimeText, getDateText } from './utils';

const weekNum = getWeekNumber(new Date());
const baseBackgroundURL = 'background/sputnik-';
const backgroundChoice = Math.floor(Math.random() * 10 + 1);
const url = `${baseBackgroundURL}${backgroundChoice}.jpg`;


function App() {
  const [date, setDate] = useState(new Date());
  const [currWeek, setCurrWeek] = useState(weekNum);
  const [backgroundUrl, setBackgroundUrl] = useState('');

  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      setBackgroundUrl(url)
    }
    img.src = url;
    if (img.complete) img.onload();
    console.log('adf');
  }, []);

  useInterval(() => {
    setDate(new Date());
  }, 1000);

  const previousWeek = () => {
    setCurrWeek(currWeek - 1);
  }

  const nextWeek = () => {
    setCurrWeek(currWeek + 1);
  }

  return (
    <div className="App">
      <div className={`background${backgroundUrl.length ? '' : ' hidden'}`} style={{ backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ),url(${backgroundUrl})` }}/>
      <div className="date">
        <div>{ getDateText(date) }</div>
        <div>{ getTimeText(date) }</div>
      </div>
      <div className="saying">
        <span className="saying-item">
          {
            currWeek - 1 > 0 && <span className="arrow" onClick={previousWeek}>{"<"}</span>
          }
        </span>
        <span className="text saying-item">{THINGS[currWeek - 1]}</span>
        <span className="saying-item">
          {
            currWeek < weekNum && <span className="arrow" onClick={nextWeek}>></span>
          }
        </span>
      </div>
    </div>
  );
}

export default App;
