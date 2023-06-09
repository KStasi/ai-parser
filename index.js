const express = require("express");
const cors = require("cors");
const {
  preprocessJSON,
  translatePromptToJSON,
  reviewJSON,
} = require("./src/processors");
const { validateJSON } = require("./src/validator");
const app = express();

app.use(express.json());
app.use(cors())

app.post("/parse-prompt", async (req, res) => {
  const prompt = req.body.prompt;

  try {
    const preprocessedJSON = await preprocessJSON(prompt);
    const actionJSON = await translatePromptToJSON(preprocessedJSON);

    if (!actionJSON) {
      res.status(500).send({ error: "Failed to process the prompt" });
      return;
    }

    // const validation = validateJSON(reviewedJSON);
    // if (!validation.valid) {
    //   res.status(400).send({ error: validation.errors });
    //   return;
    // }

    res.send(actionJSON);
  } catch (err) {
    res.status(500).send({ error: "Failed to process the prompt" });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
