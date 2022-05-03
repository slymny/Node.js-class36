import express from 'express';
import fetch from 'node-fetch';
import {apiKey} from './sources/key.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.json('hello from backend to frontend!');
});

app.post('/weather', async (req, res) => {
  const cityName = req.body.cityname;
  const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&APPID=${apiKey.API_KEY}&units=metric`;

  try {
    if (!cityName) {
      res.status(400).json({weatherText: 'Please provide a city name'});
      return;
    }
    const response = await fetch(apiURL);
    const dataJSON = await response.json();
    if (dataJSON.cod === '404') {
      res.status(400).json({weatherText: dataJSON.message});
      return;
    }
    res.status(200).json({weatherText: `${dataJSON.name} current temperature is 20 degrees`});
  } catch (err) {
    console.log(err);
  }
});

export default app;
