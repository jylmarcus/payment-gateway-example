import braintree from "braintree";

export default class BraintreeService {
    constructor() {
        this.gateway = new braintree.BraintreeGateway({
            environment: braintree.Environment.Sandbox,
            merchantId: process.env.BRAINTREE_MERCHANT_ID,
            publicKey: process.env.BRAINTREE_PUBLIC_KEY,
            privateKey: process.env.BRAINTREE_SECRET_KEY
        });
    }

    async processPayment(order, paymentDetails) {
        try {
            const response = await this.gateway.transaction.sale({
                amount: order.price,
                creditCard: {
                    number: paymentDetails.cardnumber,
                    cardholderName: paymentDetails.cardholdername,
                    expirationMonth: paymentDetails.expiryMonth,
                    expirationYear: paymentDetails.expiryYear,
                    cvv: paymentDetails.cvv
                }
            });
            return await response;
        } catch (error) {
            console.error('BraintreeService:processPayment', error);
            throw new Error('Error processing payment', error);
        }

    }
}