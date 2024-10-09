import { getCardIssuer } from "../utility/cardUtils.js";
export const validateFormInputs = (req, res, next) => {
    const { price, currency, name, cardholdername, cardnumber, expirydate, cvv } = req.body;
    const errors = [];

    //validate price
    if(!price || isNaN(Number(price)) || Number(price) < 0) {
        errors.push('Price must be a positive number or 0.');
    }

    //validate cardnumber
    if(getCardIssuer(cardnumber) === 'unknown') {
        errors.push('Please enter a valid card number. We accept Visa, MasterCard, American Express, Discover, Diners Club and JCB.');
    }

    //validate expirydate format
    if(!expirydate || !/^\d{2}\/\d{2}$/.test(expirydate)) {
        errors.push('Expiry date must be in the format MM/YY.');
    }

    //validate expirydate date
    const [expiryMonth, expiryYear] = expirydate.split('/').map(Number);
    const year = 2000 + expiryYear;
    const expiryDate = new Date(year, expiryMonth-1, 1);
    if(expiryDate < new Date()) {
        errors.push('Card has expired.');
    }

    //validate cvv 
    if(!cvv || isNaN(Number(cvv)) || Number(cvv) < 0 || cvv.length <3 || cvv.length > 4) {
        errors.push('Please enter a valid CVV.');
    }

    if(errors.length > 0) {
        return res.status(400).send(`<p>${errors.join('<br/>')}</p>`);
    }

    next();
}