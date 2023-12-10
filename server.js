// server.js

const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/summarize', async (req, res) => {
  try {
    const { url } = req.body;

    // Extract transcript
    const transcript = await getYouTubeTranscript(url);

    // Summarize the transcript
    const summarizedContent = await summarizeTranscript(transcript);

    res.json({ summary: summarizedContent });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Example function to get YouTube transcript
async function getYouTubeTranscript(url) {
  // Use Axios to make a request to YouTube API
  const response = await axios.get(`https://www.youtube.com/oembed?url=${url}&format=json`);
  const videoId = response.data.thumbnail_url.match(/vi\/(.*\/default.jpg)/)[1];
  
  // Make another request to get the transcript
  const transcriptResponse = await axios.get(`https://www.youtube.com/api/timedtext?lang=en&v=${videoId}`);
  const transcript = transcriptResponse.data;

  return transcript;
}

// Example function to perform summarization
async function summarizeTranscript(transcript) {
  // Implement your summarization logic here
  // For simplicity, just return the first 100 characters as a summary in this example
  return transcript.slice(0, 100);
}

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
