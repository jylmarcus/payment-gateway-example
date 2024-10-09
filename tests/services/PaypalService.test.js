import PaypalService from "../../services/PaypalService";

const paypalService = new PaypalService();

describe('test access token generation' , () => {
    it('should generate access token', async () => {
        const accessToken = await paypalService.generateAccessToken();
        expect(accessToken).toBeTruthy();
    })
})

describe('test order creation and capture' , () => { 
    it('should create and capture order', async () => {
        const order = { price: 10, currency: 'USD', name: 'test' };
        const paymentDetails = { cardholdername: 'John Doe', cardnumber: '4032035717012553', expiryMonth: '11', expiryYear: '2029', cvv: '123' };
        const response = await paypalService.processPayment(order, paymentDetails);
        expect(response.jsonResponse.status).toBe('COMPLETED');
    });
});