import BraintreeService from "../../services/BraintreeService";

const braintreeService = new BraintreeService();

describe('test transaction processing', () => {
    it('should process payment', async () => {
        const order = { price: 10, currency: 'USD', name: 'test' };
        const paymentDetails = { cardholdername: 'John Doe', cardnumber: '4111111111111111', expiryMonth: '11', expiryYear: '2029', cvv: '123' };
        const response = await braintreeService.processPayment(order, paymentDetails);
        expect(response.transaction.status).toBe('submitted_for_settlement');
    })
})