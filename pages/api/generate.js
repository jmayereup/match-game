import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  organization: "org-9Mjw59g6bdHwlaus6QTZ3NtZ",
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message: "OpenAI API key not configured, please follow instructions in README.md",
      }
    });
    return;
  }

  const topic = req.body.topic || '';
  if (topic.trim().length === 0) {
    res.status(400).json({
      error: {
        message: "Please enter a valid topic",
      }
    });
    return;
  }

  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{role: "user", content : generatePrompt(topic)}],
      temperature: 0.7,
      max_tokens: 400
    });
    res.status(200).json({ result: completion.data.choices[0].message.content});
    console.log(result);
  } catch(error) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).json({
        error: {
          message: 'An error occurred during your request.',
        }
      });
    }
  }
}

function generatePrompt(topic) {
  const vocabTopic = topic;
  return `Please create a set of about 16 English and Thai word pairs about this topic: ${vocabTopic}.
Use this format:
spoon - ช้อน
fork - ส้อม
`;
}
