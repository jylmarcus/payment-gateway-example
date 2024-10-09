import express from 'express';
import path from 'path';
import GatewaySelectorService from './services/GatewaySelectorService.js';
import PaymentService from './services/PaymentService.js';
import 'dotenv/config';
import { validateFormInputs } from './middleware/validation.js';

const app = express();

app.use(express.static('public'));
app.use(express.json());

const gatewaySelectorService = new GatewaySelectorService();
const paymentService = new PaymentService();

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/submit', validateFormInputs, async (req, res) => {
    const data = req;
//   price: '100',
//   currency: 'usd',
//   name: 'asdf',
//   cardholdername: 'asdf',
//   cardnumber: '1234',
//   expirydate: '10/25',
//   cvv: '555'
    console.log(data.body);

    //select payment gateway
    let gateway;
    try {
        gateway = gatewaySelectorService.selectGateway(data.body.cardnumber, data.body.currency);
    } catch (error) {
        res.status(500).send(`<p>${error.message}</p>`);
        return;
    }

    //process payment
    try {
        const response = await paymentService.processPayment(gateway, data.body);
        res.status(200).send(`<p>Order ID: ${response.id}</p><p>Status: ${response.status}</p><p>Gateway: ${gateway}</p>`)
    } catch (error) {
        res.status(500).send(`<p>${error.message}</p>`);
        return;
    }

});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`)}
);