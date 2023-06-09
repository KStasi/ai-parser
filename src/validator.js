const allowedActions = [
  "add collateral",
  "remove collateral",
  "open position",
  "close position",
];

const allowedPositionTypes = ["long", "short"];
const allowedAmountInTypes = ["base", "quote"];

// TODO: update this checks to match the new actions
const validateJSON = (outputJSON) => {
  const action = outputJSON.action;

  const errors = [];
  if (!allowedActions.includes(action)) {
    errors.push(`Invalid action: ${outputJSON.action}`);
  }

  switch (outputJSON.action) {
    case "add collateral":
    case "remove collateral":
      if (!outputJSON.collateral) {
        errors.push("Missing collateral symbol");
      }
      if (!outputJSON.amount) {
        errors.push("Missing collateral amount");
      }
      break;
    case "open position":
      if (!outputJSON.market) {
        errors.push("Missing market symbol");
      }
      if (!allowedPositionTypes.includes(outputJSON.type)) {
        errors.push(
          `Invalid position type: ${outputJSON.type}. Must be "long" or "short"`
        );
      }
      if (!outputJSON.amount) {
        errors.push("Missing position amount");
      }
      if (!allowedAmountInTypes.includes(outputJSON.amountIn)) {
        errors.push(
          `Invalid amountIn value: ${outputJSON.amountIn}. Must be "base" or "quote"`
        );
      }
      break;
    case "close position":
      if (!outputJSON.market) {
        errors.push("Missing market symbol");
      }
      break;
  }

  return {
    valid: errors.length === 0,
    errors,
  };
};

module.exports = { validateJSON };
