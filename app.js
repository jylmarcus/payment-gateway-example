const express = require('express');
const path = require('path')

const app = express();

app.use(express.static('public'));
app.use(express.json());

const gatewaySelectorService = new GatewaySelectorService();

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/submit', (req, res) => {
    const data = req;
//   price: '100',
//   currency: 'usd',
//   name: 'asdf',
//   cardholdername: 'asdf',
//   cardnumber: '1234',
//   expirydate: '10/25',
//   cvv: '555'
    console.log(data.body);
    let gateway;
    try {
        gateway = gatewaySelectorService.selectGateway(data.body.cardnumber, data.body.currency);
    } catch (error) {
        console.error(error);
    }
    res.status(200).send(`<p>Form submitted successfully!</p>`);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`)}
);