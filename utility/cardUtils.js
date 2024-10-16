export function getCardIssuer(cardNumber) {
    const testNumber = cardNumber.replace(/[\s-]/g, '');

    if (/^4[0-9]{12}(?:[0-9]{3})?$/.test(testNumber)) {
        return 'visa';
    } else if (/^(?:5[1-5][0-9]{2}|222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9]{12}$/.test(testNumber)) {
        return 'mastercard';
    } else if (/^3[47][0-9]{13}$/.test(testNumber)) {
        return 'amex';
    } else if (/^6(?:011|5[0-9]{2})[0-9]{12}$/.test(testNumber)) {
        return 'discover';
    } else if (/^3(?:0[0-5]|[68][0-9])[0-9]{11}$/.test(testNumber)) {
        return 'dinersclub';
    } else if (/^(?:2131|1800|35\d{3})\d{11}$/.test(testNumber)) {
        return 'jcb';
    } else {
        return 'unknown';
    }
}