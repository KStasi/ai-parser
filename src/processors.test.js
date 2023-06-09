const { preprocessJSON, translatePromptToJSON } = require("./processors");

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
const timeBreak = 10000;

describe("preprocessJSON", () => {
  jest.setTimeout(200000);

  it("should return JSON for a valid command", async () => {
    const command =
      "Swap 100 USDT for ETH. Wrap 0.1 ETH. Deposit 0.1 WETH to Aave. Borrow 50 USDT from Aave";

    const result = await preprocessJSON(command);
    await sleep(timeBreak);
    console.log(result);

    const result2 = await translatePromptToJSON(result);
    console.log(result2);

    expect(result).toBeDefined();

    expect(Array.isArray(result)).toBe(true);

    result.forEach((item) => {
      expect(typeof item).toBe("object");
      expect(item).toHaveProperty("action");
      expect(item).toHaveProperty("details");
    });

    expect(result[0].action).toBe("SwapTokens");
    expect(result[0].details).toBe("Swap 100 USDT for ETH.");
  });
});
