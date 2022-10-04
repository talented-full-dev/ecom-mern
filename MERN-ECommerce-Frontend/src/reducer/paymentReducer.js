export function paymentReducer(state = "online", action) {
  switch (action.type) {
    case "PAYMENT_TYPE":
      return action.payload;
    default:
      return state;
  }
}
