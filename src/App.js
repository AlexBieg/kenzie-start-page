import React, { useState, useEffect } from 'react';
import './App.css';
import THINGS from './things.js';
import { getWeekNumber, useInterval, getTimeText, getDateText, getRandomBackgroundUrl, getDistance } from './utils';
import Odometer from 'react-odometerjs';


const weekNum = getWeekNumber(new Date());

function App() {
  const [date, setDate] = useState(new Date());
  const [currWeek, setCurrWeek] = useState(weekNum);
  const [placeholderUrl, setUrl] = useState(getRandomBackgroundUrl());
  const [backgroundUrl, setBackgroundUrl] = useState('');
  const [distance, setDistance] = useState(getDistance())

  useEffect(() => {
    setBackgroundUrl('');
    const img = new Image();
    img.onload = () => {
      setBackgroundUrl(placeholderUrl)
    }
    img.src = placeholderUrl;
    if (img.complete) img.onload();
  }, [placeholderUrl]);

  useInterval(() => {
    setDate(new Date());
  }, 1000);

  useInterval(() => {
    setDistance(getDistance());
  }, 2500);

  useInterval(() => {
    setUrl(getRandomBackgroundUrl())
  }, 60000);

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
        <span className="text-wrapper">
          {
            THINGS.map((thing, i) =>
              <span className={`text saying-item${i !== currWeek ? ' hidden' : ''}`}>{thing}</span>
            )
          }
        </span>
        <span className="saying-item">
          {
            currWeek < weekNum && <span className="arrow" onClick={nextWeek}>></span>
          }
        </span>
      </div>
      <div className="distance">
        <div>You have traveled</div>
        <Odometer value={distance.toLocaleString()} />
        <div>miles since you were born</div>
      </div>
    </div>
  );
}

export default App;
