const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")('sk_test_UNYJaFNJeiJTrwAzX2auuKtk');

//API

// - App config
const app = express();
// - Middlewares
app.use(cors({ origin: true }));
app.use(express.json());
// - API routes
app.get("/", (request, response) => response.status(200).send("hello world"));

// - Example of endpoint, Below will open when you put /rdk in url
// app.get('/rdk', (request, response) => response.status(200).send('FTW guys FTW'));
app.post("/payments/create", async (request, response) => {
  const total = request.query.total;
  console.log(
    "Payment Request Received BOOM!! BOOM!! for this amount >>> ",
    total
  );
  const paymentIntent = await stripe.paymentIntents.create({
    amount: total, //subunits of the currency
    currency: "inr",
    automatic_payment_methods: {
      enabled: true,
    },
  });
  // - 201 => OK - Created
  response.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});
// - Listen command
//app.listen(4242, () => console.log("Node server listening on port 4242!"));
exports.api = functions.https.onRequest(app);
