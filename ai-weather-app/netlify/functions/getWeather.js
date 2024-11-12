const axios = require('axios');

exports.handler = async (event) => {
  const { location } = event.queryStringParameters;
  const weatherApiKey = process.env.OPEN_WEATHER_API_KEY;
  const openAiApiKey = process.env.OPENAI_API_KEY;

  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=${weatherApiKey}`;
  const openAiUrl = 'https://api.openai.com/v1/your-endpoint';

  try {
    // Fetch weather data
    const weatherResponse = await axios.get(weatherUrl);
    const weatherData = weatherResponse.data;

    // Fetch AI insights (example)
    const aiResponse = await axios.post(openAiUrl, {
      headers: {
        'Authorization': `Bearer ${openAiApiKey}`,
        'Content-Type': 'application/json'
      },
      data: {
        // Your data here, possibly using weatherData
      }
    });

    return {
      statusCode: 200,
      body: JSON.stringify({
        weather: weatherData,
        aiInsight: aiResponse.data
      }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch data' }),
    };
  }
};
