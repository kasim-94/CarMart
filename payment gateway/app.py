# app.py (Backend)

import os
import stripe
import requests
from flask import Flask, jsonify, request

app = Flask(__name__)

# Load API keys securely from environment variables
stripe.api_key = os.getenv('STRIPE_SECRET_KEY')
mtn_api_key = os.getenv('MTN_API_KEY')
mtn_base_url = 'https://sandbox.mtnmobilemoney.com'  # For MTN sandbox, change for production.

# Endpoint for creating a Visa Payment Intent using Stripe
@app.route('/create-visa-payment-intent', methods=['POST'])
def create_visa_payment_intent():
    try:
        data = request.json
        amount = data['amount']
        currency = data.get('currency', 'usd')

        # Create a PaymentIntent with Stripe
        intent = stripe.PaymentIntent.create(
            amount=amount,
            currency=currency,
            automatic_payment_methods={'enabled': True}
        )
        return jsonify({'clientSecret': intent['client_secret']})

    except Exception as e:
        return jsonify(error=str(e)), 403

# Endpoint for MTN Mobile Money payment request
@app.route('/mtn-payment', methods=['POST'])
def create_mtn_payment():
    try:
        data = request.json
        amount = data['amount']
        currency = 'XOF'  # MTN uses local currencies like CFA Franc
        phone_number = data['phone_number']

        # MTN Mobile Money API Request
        headers = {
            'Authorization': f'Bearer {mtn_api_key}',
            'Ocp-Apim-Subscription-Key': 'your-subscription-key',
            'X-Reference-Id': 'unique_transaction_reference',
            'Content-Type': 'application/json'
        }

        payment_request = {
            'amount': amount,
            'currency': currency,
            'externalId': 'unique_external_id',
            'payer': {
                'partyIdType': 'MSISDN',
                'partyId': phone_number,
            },
            'payerMessage': 'Payment for goods',
            'payeeNote': 'Thank you for your purchase'
        }

        response = requests.post(f'{mtn_base_url}/collection/v1_0/requesttopay', headers=headers, json=payment_request)
        if response.status_code == 202:
            return jsonify({'status': 'pending', 'message': 'Payment initiated successfully'})
        else:
            return jsonify({'status': 'failed', 'error': response.text})

    except Exception as e:
        return jsonify(error=str(e)), 403

# Webhook for Stripe payment status
@app.route('/stripe-webhook', methods=['POST'])
def stripe_webhook():
    payload = request.get_data(as_text=True)
    sig_header = request.headers.get('Stripe-Signature')
    endpoint_secret = os.getenv('STRIPE_ENDPOINT_SECRET')

    try:
        event = stripe.Webhook.construct_event(payload, sig_header, endpoint_secret)

        # Handle payment status event
        if event['type'] == 'payment_intent.succeeded':
            payment_intent = event['data']['object']
            print(f"Payment for {payment_intent['amount']} succeeded.")
            # Update database or notify user
        else:
            print(f"Unhandled event type {event['type']}")

        return jsonify(success=True)
    except stripe.error.SignatureVerificationError as e:
        return jsonify(success=False), 400

# Webhook for MTN payment status
@app.route('/mtn-webhook', methods=['POST'])
def mtn_webhook():
    # MTN webhook integration to receive payment status updates
    data = request.json
    # Process the webhook data and update payment status accordingly
    print(f"MTN Payment status update: {data}")
    return jsonify(success=True)


if __name__ == '__main__':
    app.run(debug=True)
