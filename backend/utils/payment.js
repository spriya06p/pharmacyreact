// placeholder for payment integration (Razorpay/Stripe)
exports.createOrder = async (amount) => {
  // integrate with Razorpay or Stripe here
  return { providerOrderId: 'test_order_' + Date.now(), amount };
};
