export default class OrderRepository {
    constructor() {
        this.orders=[];
    }

    saveOrder(orderId, order, paymentDetails, response) {
        const newOrder = {
            orderId,
            order,
            paymentDetails,
            paymentGatewayResponse: response,
        };
        this.orders.push(newOrder);
        return;
    }
}