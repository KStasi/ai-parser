const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config();
const apiKey = process.env.OPENAI_API_KEY;
const configuration = new Configuration({
  apiKey,
});
const openai = new OpenAIApi(configuration);

const systemPrompt = `Translate English commands into a JSON structure. 'action' can be 'add collateral', 'remove collateral', 'open position', or 'close position'. For 'add' or 'remove collateral', include 'collateral' (symbol) and 'amount'. For 'open position', include 'market' (symbol), 'type' (short or long), 'amount', and 'amountIn' ('base' or 'quote'). For 'close position', include 'market' (symbol). If the parameter isn't specified write null.`;
// const systemPrompt = `Transform English commands into a JSON structure. The 'action' can be 'add collateral', 'remove collateral', 'open position', or 'close position'. When 'add' or 'remove collateral' is the action, 'collateral' (symbol) and 'amount' should be defined if clear from the context. For 'open position', 'market' (symbol), 'type' (short or long), 'amount', and 'amountIn' ('base' or 'quote') should be defined if clear from the context. For 'close position', 'market' (symbol) should be defined if clear from the context.`;

const translatePromptToJSON = async (prompt) => {
  try {
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: systemPrompt,
        },
        { role: "user", content: `${prompt}` },
      ],
    });
    return JSON.parse(response.data.choices[0].message.content);
  } catch (err) {
    return null;
  }
};

module.exports = { translatePromptToJSON };
