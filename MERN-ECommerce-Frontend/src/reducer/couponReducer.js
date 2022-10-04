export function couponReducer(state = false, action) {
  switch (action.type) {
    case "APPLY_COUPON":
      return action.payload;
    default:
      return state;
  }
}
