const express = require("express");
const { Configuration, OpenAIApi } = require("openai");
const app = express();

const configuration = new Configuration({
  apiKey: "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",
});
const openai = new OpenAIApi(configuration);

app.use(express.json()); // for parsing application/json

app.post("/parse-prompt", async (req, res) => {
  const prompt = req.body.prompt;

  try {
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `Translate the English command to JSON. It must contain 'action': 'add collateral', 'remove collateral', 'open position', or 'close position'. For 'add' or 'remove collateral', include 'collateral' and 'amount'. For 'open position', include 'market', 'type' and 'amount'. For 'close position', include 'market'.`,
        },
        { role: "user", content: `${prompt}` },
      ],
    });
    const output = JSON.parse(response.data.choices[0].message.content);

    // Validate output
    const action = output.action;
    if (
      ![
        "add collateral",
        "remove collateral",
        "open position",
        "close position",
      ].includes(action)
    ) {
      res.status(400).send({ error: "Invalid action" });
      return;
    }

    // Additional validation based on action...

    res.send(output);
  } catch (err) {
    res.status(500).send({ error: "Failed to process the prompt" });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
