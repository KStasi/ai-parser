# PromptDeFi Command Parser

This project is a simple web service that accepts user commands related to trading actions on perpetual futures markets and translates these commands into a structured JSON format. The translation is done using the OpenAI GPT model.

## Prerequisites

- Node.js (v14 or newer)
- NPM (comes with Node.js)
- Docker (for containerized deployment)

## Local Setup

1. Clone this repository:

   ```
   git clone https://github.com/KStasi/ai-parser.git
   ```

2. Move into the project directory:

   ```
   cd your-repo-name
   ```

3. Install dependencies:

   ```
   npm install
   ```

4. Copy the `.env.example` file to a new file named `.env`:

   ```
   cp .env.example .env
   ```

5. Edit the `.env` file and add your OpenAI API key:

   ```
   OPENAI_API_KEY=your_openai_api_key
   ```

6. Run the server:

   ```
   node index.js
   ```

The server is now running at `http://localhost:3000`.

## Usage

Send a POST request to the `/parse-prompt` endpoint with a JSON body containing the `prompt` field. For example:

```bash
curl -X POST -H "Content-Type: application/json" -d '{"prompt":"Swap 100 USDT to ETH. Wrap 0.1 ETH. Deposit 0.1 WETH to Aave. Borrow 50 USDT from Aave."}' http://localhost:3000/parse-prompt
```

The service will respond with a JSON representation of the action described in the prompt.

## Docker Deployment

1. Build the Docker image:

```bash
docker build -t promptdefi-parser .
```

2. Run the Docker container:

```bash
docker run -p 3000:3000 -d -e OPENAI_API_KEY=your_openai_api_key promptdefi-parser
```

The application is now accessible at http://localhost:3000.
