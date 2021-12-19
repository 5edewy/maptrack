import express from 'express'
import Stripe from 'stripe'
const app = express()
const port = 3000;
const publishableKey = "pk_test_A4NpuY8IglXSz4BGF0xQIkXE";
const SECRET_KEY = "sk_test_z4N8mZoFvnpQY1tZgxSCQGl1";

const stripe = Stripe(SECRET_KEY, { apiVersion: "2020-08-27" })
app.listen(port, () => {
});

app.post("/create-payment-intent", async (req, res) => {
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: 1099,
            currency: 'usd'

        })
        const clientsecret = paymentIntent.client_secret;
        res.json({
            clientsecret: clientsecret,

        })

    } catch (e) {
        res.json({ error: e.message });

    }
})