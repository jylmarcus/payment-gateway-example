import 'dotenv/config';

export default {
    paypalKeys: {
        apiUrl: process.env.PAYPAL_API_URL,
        clientId: process.env.PAYPAL_CLIENT_ID,
        secretKey: process.env.PAYPAL_SECRET_KEY,
    },

    braintreeKeys: {
        merchantId: process.env.BRAINTREE_MERCHANT_ID,
        publicKey: process.env.BRAINTREE_PUBLIC_KEY,
        secretKey: process.env.BRAINTREE_SECRET_KEY,
    },
}