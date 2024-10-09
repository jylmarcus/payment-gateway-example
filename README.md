# Payment Gateway Example

This repository showcases a robust implementation for handling credit card payments using the PayPal REST API and the Braintree SDK.

## Overview

This project demonstrates how to submit a sample order with mock credit card details from the client to the server. The server then selects the appropriate payment gateway based on predefined criteria, processes the payment, and returns the response to the client.  

The architecture is designed to facilitate the addition of new payment gateways with minimal effort and supports future enhancements for persisting order data to a database.

## Features
- **Payment gateway selection**: Dynamically routes transactions to the appropriate payment gateway (PayPal or Braintree) based on predefined rules.
- **Extensible design**: Easily add support for other payment providers with minimal changes to the codebase.
- **Mock payment processing**: Simulate credit card transactions with mock payment details to demonstrate end-to-end functionality.
- **Scalable Architecture**: Modular structure with potential for adding database integration to persist order information.


## License

[MIT](https://choosealicense.com/licenses/mit/)
