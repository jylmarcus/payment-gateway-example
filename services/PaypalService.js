export default class PaypalService {

    async processPayment(order, paymentDetails) {
        let orderId, status;
        try {
            const createdOrder = await this.createOrder(order, paymentDetails);
            orderId = createdOrder.jsonResponse.id;
            status = createdOrder.jsonResponse.status;
        } catch (error) {
            console.error(error);
            throw new Error('Error creating order', error);
        }
        // let response;
        // try {
        //     response = await this.captureOrder(orderId);
        // } catch (error) {
        //     console.error(error);
        //     throw new Error('Error capturing order', error);
        // } 
        // console.log(JSON.stringify(response));
        return {id: orderId, status};
    }

    async createOrder(order, paymentDetails) {
        const accessToken = await this.generateAccessToken();
        const payload = {
            intent: 'CAPTURE',
            purchase_units: [{
                amount: {
                    currency_code: order.currency,
                    value: order.price,
                }
            }],
            payment_source: {
                card: {
                    name: paymentDetails.cardholdername,
                    number: paymentDetails.cardnumber,
                    expiry: `${paymentDetails.expiryYear}-${paymentDetails.expiryMonth}`,
                    security_code: paymentDetails.cvv
                }
            }
        }

        const response = await fetch(`${process.env.PAYPAL_API_URL}/v2/checkout/orders`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'PayPal-Request-Id': Math.random().toPrecision(12).toString(),
                'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify(payload)
        });

        return this.handleResponse(response);
    }

    async captureOrder(orderId) {
        const accessToken = await this.generateAccessToken();
        const response = await fetch(`${process.env.PAYPAL_API_URL}/v2/checkout/orders/${orderId}/capture`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        });

        //console.log('captureOrderResponse', response);
        return this.handleResponse(response);
    }

    async generateAccessToken() {
        try {
            const auth = Buffer.from(process.env.PAYPAL_CLIENT_ID + ':' + process.env.PAYPAL_SECRET_KEY).toString('base64');
            const response = await fetch(`${process.env.PAYPAL_API_URL}/v1/oauth2/token`, {
                method: 'POST',
                headers: {
                    'Authorization': `Basic ${auth}`,
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: 'grant_type=client_credentials'
            });

            const data = await response.json();
            return data.access_token;
        } catch (error) {
            console.error(error);
            throw new Error("Failed to generate access token: ", error);
        }
    }

    async handleResponse(response) {
        try{
            const jsonResponse = await response.json();
            return {
                jsonResponse,
                httpStatusCode: response.status,
            };  
        } catch (error) {
            const errorMessage = await response.text();
            throw new Error(errorMessage);
        }
    }

}