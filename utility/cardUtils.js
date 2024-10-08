function getCardIssuer(cardNumber) {
    const testNumber = cardNumber.replace(/[\s-]/g, '');

    if (/^4\d{12}(\d{3})?$/.test(testNumber)) {
        return 'visa';
    } else if (/^5[1-5]\d{14}$/.test(testNumber) || /^2(2[2-9][1-9]|[3-6]\d{2}|7[0-1]\d|720)\d{12}$/.test(testNumber)) {
        return 'mastercard';
    } else if (/^3[47]\d{13}$/.test(testNumber)) {
        return 'amex';
    } else if (/^6(011|5\d{2}|4[4-9]\d|22[1-9]\d{2})\d{12}$/.test(testNumber) || /^622(12[6-9]|1[3-9]\d|[2-8]\d{2}|9[01]\d|92[0-5])\d{10}$/.test(testNumber)) {
        return 'discover';
    } else if (/^3(0[0-5]|[68]\d)\d{11}$/.test(testNumber)) {
        return 'dinersclub';
    } else if (/^35(2[89]|[3-8]\d)\d{12}$/.test(testNumber)) {
        return 'jcb';
    } else {
        return 'unknown';
    }
}

module.exports = getCardIssuer;