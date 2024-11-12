const axios = require('axios');
const OpenAI = require('openai');

exports.handler = async (event) => {
  const { location } = event.queryStringParameters;
  const weatherApiKey = process.env.OPEN_WEATHER_API_KEY;
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  try {
    // Fetch latitude and longitude using Geocoding API
    const geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=${weatherApiKey}`;
    const geoResponse = await axios.get(geoUrl);
    const { lat, lon } = geoResponse.data[0];

    // Fetch 5-day weather forecast using latitude and longitude
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${weatherApiKey}`;
    const forecastResponse = await axios.get(forecastUrl);
    const forecastData = forecastResponse.data;

    // Extract relevant weather details for the current weather
    const currentWeather = forecastData.list[0];
    const temperature = Math.round(currentWeather.main.temp);
    const description = currentWeather.weather[0].description;

    // Generate AI insights
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a weather expert. Provide concise weather insights in one sentence."
        },
        {
          role: "user",
          content: `Describe the weather in ${location} with a temperature of ${temperature}°F and conditions described as ${description}.`
        }
      ],
      max_tokens: 50,
      temperature: 1,
    });

    const aiInsight = completion.choices[0].message.content;

    return {
      statusCode: 200,
      body: JSON.stringify({
        weather: currentWeather,
        forecast: forecastData.list,
        aiInsight: aiInsight
      }),
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch data', details: error.message }),
    };
  }
};
