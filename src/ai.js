const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config();
const apiKey = process.env.OPENAI_API_KEY;
const configuration = new Configuration({
  apiKey,
});
const openai = new OpenAIApi(configuration);

const DEFAULT_SYSTEM_PROMPT =
  "The response must always be JSON array or object. No comments! No extra text! Only JSON array or object on the output";
const generateJSONFromPrompt = async (systemPrompt, userInput) => {
  try {
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      temperature: 0.2,
      messages: [
        {
          role: "system",
          content: systemPrompt,
        },
        {
          role: "system",
          content: DEFAULT_SYSTEM_PROMPT,
        },
        {
          role: "user",
          content: userInput,
        },
      ],
      max_tokens: 200,
    });
    return JSON.parse(response.data.choices[0].message.content);
  } catch (err) {
    console.error(err);
    return null;
  }
};

module.exports = { generateJSONFromPrompt };
