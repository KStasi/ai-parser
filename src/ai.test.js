// ai.test.js

const { translatePromptToJSON } = require("./ai");

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
const timeBreak = 5000;

describe("translatePromptToJSON", () => {
  jest.setTimeout(30000);
  it("should return JSON for a valid command", async () => {
    const command = "Add 10 BTC as collateral";

    const result = await translatePromptToJSON(command);
    await sleep(timeBreak);

    expect(result).toBeDefined();
    expect(result.action).toEqual("add collateral");
    expect(result.collateral).toEqual("BTC");
    expect(result.amount).toEqual(10);
  });

  it("should throw an error for an invalid command", async () => {
    const command = "Invalid command";

    const result = await translatePromptToJSON(command);
    await sleep(timeBreak);

    expect(result).toBeNull();
  });

  it("should return null for an invalid add collateral command", async () => {
    const command = "Add collateral";

    const result = await translatePromptToJSON(command);
    await sleep(timeBreak);

    expect(result).toBeDefined();
    expect(result.action).toEqual("add collateral");
    expect(result.collateral).toBeNull();
    expect(result.amount).toBeNull();
  });

  it("should return null for an add collateral command with invalid amount", async () => {
    const command = "Add BTC as collateral";

    const result = await translatePromptToJSON(command);
    await sleep(timeBreak);

    expect(result).toBeDefined();
    expect(result.action).toEqual("add collateral");
    expect(result.collateral).toEqual("BTC");
    expect(result.amount).toBeNull();
  });

  it("should return null for an add collateral command with missing collateral", async () => {
    const command = "Add 10 as collateral";

    const result = await translatePromptToJSON(command);
    await sleep(timeBreak);

    expect(result).toBeDefined();
    expect(result.action).toEqual("add collateral");
    expect(result.collateral).toBeNull();
    expect(result.amount).toEqual("10");
  });
});
