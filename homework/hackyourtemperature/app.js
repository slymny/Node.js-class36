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
      res.status(400).json({weatherText: 'Please enter a valid city name'});
      return;
    }
    const response = await fetch(apiURL);
    const dataJSON = await response.json();
    res.status(200).json({cityName: dataJSON.name, temp: dataJSON.main.temp});
  } catch (err) {
    res.status(404).json({weatherText: 'City is not found!'});
  }
});

export default app;
