const express = require("express");
const { translatePromptToJSON } = require("./src/ai");
const { validateJSON } = require("./src/validator");
const app = express();

app.use(express.json());

app.post("/parse-prompt", async (req, res) => {
  const prompt = req.body.prompt;

  try {
    const response = await translatePromptToJSON(prompt);
    if (!response) {
      res.status(500).send({ error: "Failed to process the prompt" });
      return;
    }

    const validation = validateJSON(response);
    if (!validation.valid) {
      res.status(400).send({ error: validation.errors });
      return;
    }

    res.send(response);
  } catch (err) {
    res.status(500).send({ error: "Failed to process the prompt" });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
