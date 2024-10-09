import { getCardIssuer } from '../utility/cardUtils.js';

export default class GatewaySelectorService {
    constructor() {
        this.gateways = {
            paypal: 'paypal',
            braintree: 'braintree'
        };
    }

    selectGateway(cardnumber, currency) {
        const cardIssuer = getCardIssuer(cardnumber);
        if (cardIssuer === 'unknown') {
            throw new Error('unknown card issuer');
        }

        if (cardIssuer === 'amex' && currency !== 'USD') {
            throw new Error('amex only supports USD');
        }

        if(cardIssuer === 'amex') {
            return this.gateways.paypal;
        } else if (['usd', 'eur', 'aud'].includes(currency)) {
            return this.gateways.paypal;
        } else {
            return this.gateways.braintree;
        }
    }
}