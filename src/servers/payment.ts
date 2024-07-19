const stripe = require("stripe")(process.env.NEXT_PUBLIC_STRIPE_SCERET_KEY);

export const getStripeClientSceret = async ({ price }: { price: number }) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: price * 100,
      currency: "usd",
      description: "Payment for booking room",
    });
    return {
      success: true,
      clientSecret: paymentIntent.client_secret,
    };
  } catch (error: any) {
    console.log("error payment server", error);

    return {
      success: false,
      error: error.message,
    };
  }
};
