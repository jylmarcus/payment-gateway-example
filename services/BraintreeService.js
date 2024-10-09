import braintree from "braintree";
import config from "../config";

export default class BraintreeService {
    constructor() {
        this.gateway = new braintree.BraintreeGateway({
            environment: braintree.Environment.Sandbox,
            merchantId: config.braintreeKeys.merchantId,
            publicKey: config.braintreeKeys.publicKey,
            privateKey: config.braintreeKeys.secretKey
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
                },
                options: {
                    submitForSettlement: true
                }
            });
            return await response;
        } catch (error) {
            console.error('BraintreeService:processPayment', error);
            throw new Error('Error processing payment', error);
        }

    }
}