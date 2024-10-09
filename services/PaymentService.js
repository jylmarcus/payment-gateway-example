import PaypalService from './PaypalService.js';
import BraintreeService from './BraintreeService.js';

export default class PaymentService {
    constructor() {
        this.paypalService = new PaypalService();
        this.braintreeService = new BraintreeService();
    }

    async processPayment(gateway, data) {
        const { price, currency, name, cardholdername, cardnumber, expirydate, cvv } = data;
        const order = { price, currency, name };
        let [expiryMonth, expiryYear] = expirydate.split('/');
        expiryYear = `20${expiryYear}`;
        const paymentDetails = { cardholdername, cardnumber, expiryMonth, expiryYear, cvv };
        
        switch (gateway) {
            case 'paypal':
                try {
                    return await this.paypalService.processPayment(order, paymentDetails);
                } catch (error) {
                    throw error;
                }
                
            case 'braintree':
                return this.braintreeService.processPayment(order, paymentDetails);
            default:
                throw new Error('unknown gateway');
        }
    }
}