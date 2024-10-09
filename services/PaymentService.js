import PaypalService from './PaypalService.js';
import BraintreeService from './BraintreeService.js';
import OrderRepository from '../repository/OrderRepository.js';

export default class PaymentService {
    constructor() {
        this.paypalService = new PaypalService();
        this.braintreeService = new BraintreeService();
        this.orderRepository = new OrderRepository();
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
                    const response = await this.paypalService.processPayment(order, paymentDetails);
                    await this.orderRepository.saveOrder(response.jsonResponse.id,order, paymentDetails, response);
                    return{id:response.jsonResponse.id, status: response.jsonResponse.status};
                } catch (error) {
                    console.error('PaymentService:processPaypalPayment', error);
                    throw error;
                }
                
            case 'braintree':
                try {
                    const response = await this.braintreeService.processPayment(order, paymentDetails);
                    await this.orderRepository.saveOrder(response.transaction.id, order, paymentDetails, response);
                    return {id: response.transaction.id, status: response.transaction.status};
                } catch (error) {
                    console.error('PaymentService:processbraintreePayment', error);
                    throw error;
                }
            default:
                throw new Error('unknown gateway');
        }
    }
}