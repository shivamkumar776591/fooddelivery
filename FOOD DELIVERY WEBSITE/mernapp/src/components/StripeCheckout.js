<StripeCheckout
  stripeKey="your_stripe_publishable_key"
  token={handleToken} // handleToken function is passed as the token prop
  amount={totalPrice * 100} // Convert the total price to cents
  currency="INR"
  description="Payment for items in cart"
/>
