import GatewaySelectorService from "../../services/GatewaySelectorService";

const gatewaySelectorService = new GatewaySelectorService();

describe('test gateway selection function', () => {
    it('should return paypal', () => {

        const testCases = [
            { cardnumber: '378282246310005', currency: 'USD', expected: 'paypal'}, //AMEX card in USD
            { cardnumber: '4012888888881881', currency: 'EUR', expected: 'paypal'}, //Visa card in EUR
            { cardnumber: '5555555555554444', currency: 'AUD', expected: 'paypal'}, //Mastercard card in AUD
        ]
        
        testCases.forEach(testCase => {
            const result = gatewaySelectorService.selectGateway(testCase.cardnumber, testCase.currency); 
            expect(result).toBe(testCase.expected);
        });
    });

    it('should return braintree', () => {

        const testCases = [
            { cardnumber: '36259600000004', currency: 'THB', expected: 'braintree'}, //Diners club card in THB
            { cardnumber: '4012888888881881', currency: 'HKD', expected: 'braintree'}, //Visa card in HKD
            { cardnumber: '5555555555554444', currency: 'SGD', expected: 'braintree'}, //Mastercard card in SGD
        ]

        testCases.forEach(testCase => {
            const result = gatewaySelectorService.selectGateway(testCase.cardnumber, testCase.currency); 
            expect(result).toBe(testCase.expected);
        });
    });

    it('should throw error for unknown card issuer', () => {

        const testCases = [
            { cardnumber: '1111111111111111', currency: 'USD', expected: 'unknown card issuer'}, //AMEX card in USD
        ]

        testCases.forEach(testCase => {
            expect(() => gatewaySelectorService.selectGateway(testCase.cardnumber, testCase.currency)).toThrow();
        });
    });

    it('should throw error for unsupported AMEX currency', () => {

        const testCases = [
            { cardnumber: '378282246310005', currency: 'THB', expected: 'AMEX only supports USD'}, //AMEX card in USD
        ]

        testCases.forEach(testCase => {
            expect(() => gatewaySelectorService.selectGateway(testCase.cardnumber, testCase.currency)).toThrow();
        });
    });
});