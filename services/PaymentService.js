import PaypalService from './PaypalService.js';
import BraintreeService from './BraintreeService.js';

export default class PaymentService {
    constructor() {
        this.paypalService = new PaypalService();
        this.braintreeService = new BraintreeService();
    }

    processPayment(gateway, data) {
        const { price, currency, name, cardholdername, cardnumber, expirydate, cvv } = data;
        const order = { price, currency, name };
        const paymentDetails = { cardholdername, cardnumber, expirydate, cvv };
        
        switch (gateway) {
            case 'paypal':
                return this.paypalService.processPayment(order, paymentDetails);
            case 'braintree':
                return this.braintreeService.processPayment(order, paymentDetails);
            default:
                throw new Error('unknown gateway');
        }
    }
}