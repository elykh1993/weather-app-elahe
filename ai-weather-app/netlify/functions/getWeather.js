const axios = require('axios');
const OpenAI = require('openai');

exports.handler = async (event) => {
  const { location } = event.queryStringParameters;
  const weatherApiKey = process.env.OPEN_WEATHER_API_KEY;
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=${weatherApiKey}`;

  try {
    // Fetch weather data
    const weatherResponse = await axios.get(weatherUrl);
    const weatherData = weatherResponse.data;

    // Extract relevant weather details
    const { main, weather } = weatherData;
    const temperature = Math.round(main.temp);
    const description = weather[0].description;

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
        weather: weatherData,
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
